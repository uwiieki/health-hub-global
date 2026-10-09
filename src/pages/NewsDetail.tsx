import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { formatNewsDate } from '@/lib/formatDate';

interface NewsItem {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  content_ru: string; content_kz: string; content_en: string;
  cover_image_url: string | null;
  category: string; publish_date: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [others, setOthers] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const tr = (ru: string, kz: string, en: string) => language === 'kz' ? kz : language === 'en' ? en : ru;
  const getTitle = (n: NewsItem) => tr(n.title_ru, n.title_kz || n.title_ru, n.title_en || n.title_ru);
  const getContent = (n: NewsItem) => tr(n.content_ru, n.content_kz || n.content_ru, n.content_en || n.content_ru) || '';

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    supabase.from('news').select('*').eq('id', id).eq('status', 'published').maybeSingle().then(({ data }) => {
      setItem(data as NewsItem | null);
      setLoading(false);
    });
    supabase.from('news').select('*').eq('status', 'published').neq('id', id)
      .order('publish_date', { ascending: false }).limit(3)
      .then(({ data }) => setOthers((data as NewsItem[]) || []));
  }, [id]);

  const content = item ? getContent(item) : '';
  const paragraphs = content.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  usePageMeta({
    title: item
      ? `${getTitle(item)} — ${tr('Центр спортивной медицины Актюбинской области', 'Ақтөбе облысы спорт медицинасы орталығы', 'Aktobe Regional Sports Medicine Center')}`
      : tr('Новость — Центр спортивной медицины Актюбинской области', 'Жаңалық — Ақтөбе облысы спорт медицинасы орталығы', 'News — Aktobe Regional Sports Medicine Center'),
    description: content ? content.replace(/\s+/g, ' ').slice(0, 160) : undefined,
    image: item?.cover_image_url,
    type: 'article',
  });

  const backLabel = tr('К списку новостей', 'Жаңалықтар тізіміне', 'Back to news');

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-4xl">
          <Button asChild variant="ghost" className="mb-6 gap-2">
            <Link to="/news">
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </Button>

          {loading ? (
            <p className="py-12 text-center text-muted-foreground">{t('common.loading')}</p>
          ) : !item ? (
            <p className="py-12 text-center text-muted-foreground">
              {tr('Новость не найдена', 'Жаңалық табылмады', 'News not found')}
            </p>
          ) : (
            <article>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge className="bg-primary/90">{item.category}</Badge>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatNewsDate(item.publish_date, language)}
                </span>
              </div>
              <h1 className="mb-8 break-words font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {getTitle(item)}
              </h1>

              {item.cover_image_url && (
                <div className="mb-8 overflow-hidden rounded-[22px] border border-primary/10 shadow-sm">
                  <img src={item.cover_image_url} alt={getTitle(item)} className="h-auto max-h-[480px] w-full object-cover" />
                </div>
              )}

              <Card className="border-border/50">
                <CardContent className="space-y-4 p-6 md:p-8">
                  {paragraphs.map((p, i) => (
                    <p key={i} className="whitespace-pre-line break-words leading-relaxed text-foreground/80">{p}</p>
                  ))}
                </CardContent>
              </Card>
            </article>
          )}

          {!loading && item && others.length > 0 && (
            <div className="mt-14">
              <h2 className="mb-5 font-display text-2xl font-bold text-foreground">
                {tr('Другие новости', 'Басқа жаңалықтар', 'More news')}
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {others.map((o) => (
                  <Link
                    key={o.id}
                    to={`/news/${o.id}`}
                    className="group flex flex-col gap-2 rounded-[22px] border border-primary/10 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                  >
                    <span className="text-xs text-muted-foreground">{formatNewsDate(o.publish_date, language)}</span>
                    <h3 className="line-clamp-3 break-words font-display text-base font-bold leading-snug text-foreground group-hover:text-primary">
                      {getTitle(o)}
                    </h3>
                    <ArrowRight className="mt-auto h-4 w-4 self-end text-primary transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default NewsDetail;
