import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  content_ru: string; content_kz: string; content_en: string;
  cover_image_url: string | null;
  category: string; publish_date: string;
}

export const NewsSection = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    supabase.from('news').select('*').eq('status', 'published').order('publish_date', { ascending: false }).limit(3)
      .then(({ data }) => { if (data && data.length > 0) setNews(data as NewsItem[]); });
  }, []);

  const getTitle = (n: NewsItem) => language === 'kz' ? n.title_kz : language === 'en' ? n.title_en : n.title_ru;
  const getExcerpt = (n: NewsItem) => {
    const content = language === 'kz' ? n.content_kz : language === 'en' ? n.content_en : n.content_ru;
    return content.substring(0, 150);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'kz' ? 'kk-KZ' : 'ru-RU', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  if (news.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{t('news.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('news.subtitle')}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card">
              {item.cover_image_url && (
                <div className="relative aspect-video overflow-hidden">
                  <img src={item.cover_image_url} alt={getTitle(item)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <Badge className="absolute left-4 top-4 bg-primary/90 hover:bg-primary">{item.category}</Badge>
                </div>
              )}
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /><span>{formatDate(item.publish_date)}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{getTitle(item)}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">{getExcerpt(item)}...</p>
                <Link to="/news" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {t('news.readMore')}<ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
            <Link to="/news">{t('news.viewAll')}<ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
