import { useState, useEffect, useCallback, Fragment } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, X, FileText, User, Stethoscope, Newspaper } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'service' | 'doctor' | 'news';
  title: string;
  description: string;
  url: string;
}

function getLocalizedField(item: Record<string, unknown>, field: string, lang: Language): string {
  const key = `${field}_${lang}`;
  return (item[key] as string) || (item[`${field}_ru`] as string) || '';
}

function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-primary/20 text-primary font-semibold rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

const typeConfig = {
  service: { icon: Stethoscope, label: { ru: 'Услуга', kz: 'Қызмет', en: 'Service' }, color: 'text-blue-500' },
  doctor: { icon: User, label: { ru: 'Врач', kz: 'Дәрігер', en: 'Doctor' }, color: 'text-green-500' },
  news: { icon: Newspaper, label: { ru: 'Новость', kz: 'Жаңалық', en: 'News' }, color: 'text-orange-500' },
};

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();

  const placeholders: Record<Language, string> = {
    ru: 'Поиск по сайту...',
    kz: 'Сайттан іздеу...',
    en: 'Search the site...',
  };

  const noResults: Record<Language, string> = {
    ru: 'Ничего не найдено',
    kz: 'Ештеңе табылмады',
    en: 'No results found',
  };

  const search = useCallback(
    async (q: string) => {
      if (q.trim().length < 2) {
        setResults([]);
        return;
      }
      setLoading(true);
      const lowerQ = q.toLowerCase();

      const [servicesRes, doctorsRes, newsRes] = await Promise.all([
        supabase.from('services').select('*').eq('status', 'active'),
        supabase.from('doctors').select('*').eq('status', 'active'),
        supabase.from('news').select('*').eq('status', 'published'),
      ]);

      const matched: SearchResult[] = [];

      // Filter services
      (servicesRes.data || []).forEach((s) => {
        const title = getLocalizedField(s, 'title', language);
        const desc = getLocalizedField(s, 'description', language);
        if (title.toLowerCase().includes(lowerQ) || desc.toLowerCase().includes(lowerQ)) {
          matched.push({ id: s.id, type: 'service', title, description: desc.substring(0, 120), url: '/services' });
        }
      });

      // Filter doctors
      (doctorsRes.data || []).forEach((d) => {
        const name = getLocalizedField(d, 'name', language);
        const spec = getLocalizedField(d, 'specialization', language);
        const bio = getLocalizedField(d, 'bio', language);
        if (name.toLowerCase().includes(lowerQ) || spec.toLowerCase().includes(lowerQ) || bio.toLowerCase().includes(lowerQ)) {
          matched.push({ id: d.id, type: 'doctor', title: name, description: spec, url: '/doctors' });
        }
      });

      // Filter news
      (newsRes.data || []).forEach((n) => {
        const title = getLocalizedField(n, 'title', language);
        const content = getLocalizedField(n, 'content', language);
        if (title.toLowerCase().includes(lowerQ) || content.toLowerCase().includes(lowerQ)) {
          matched.push({ id: n.id, type: 'news', title, description: content.substring(0, 120), url: '/news' });
        }
      });

      setResults(matched);
      setLoading(false);
    },
    [language]
  );

  useEffect(() => {
    const timer = setTimeout(() => search(query), 300);
    return () => clearTimeout(timer);
  }, [query, search]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setResults([]);
    }
  }, [open]);

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onOpenChange]);

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    navigate(result.url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl p-0 gap-0 overflow-hidden">
        <div className="flex items-center border-b border-border px-4">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholders[language]}
            className="h-12 border-0 bg-transparent px-3 text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}

          {!loading && query.trim().length >= 2 && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <FileText className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">{noResults[language]}</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="p-2 space-y-1">
              {results.map((result) => {
                const config = typeConfig[result.type];
                const Icon = config.icon;
                return (
                  <li key={`${result.type}-${result.id}`}>
                    <button
                      onClick={() => handleSelect(result)}
                      className={cn(
                        'w-full flex items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors',
                        'hover:bg-accent focus:bg-accent focus:outline-none'
                      )}
                    >
                      <div className={cn('mt-0.5 shrink-0', config.color)}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-foreground line-clamp-1">
                            {highlightText(result.title, query)}
                          </span>
                          <span className="shrink-0 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                            {config.label[language]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {highlightText(result.description, query)}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {!loading && query.trim().length < 2 && (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <Search className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">
                {language === 'en' ? 'Type to search...' : language === 'kz' ? 'Іздеу үшін жазыңыз...' : 'Введите запрос...'}
              </p>
              <kbd className="mt-2 inline-flex items-center gap-1 rounded border border-border bg-muted px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
