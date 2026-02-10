import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface NewsItem {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  content_ru: string; content_kz: string; content_en: string;
  cover_image_url: string | null;
  category: string; publish_date: string;
}

const News = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('news').select('*').eq('status', 'published').order('publish_date', { ascending: false });
      if (data && data.length > 0) setNews(data as NewsItem[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const getTitle = (n: NewsItem) => language === 'kz' ? n.title_kz : language === 'en' ? n.title_en : n.title_ru;
  const getContent = (n: NewsItem) => language === 'kz' ? n.content_kz : language === 'en' ? n.content_en : n.content_ru;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'kz' ? 'kk-KZ' : 'ru-RU', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">{t('news.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t('news.subtitle')}</p>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">{t('common.loading')}</p>
          ) : news.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{language === 'en' ? 'No news yet' : language === 'kz' ? 'Жаңалықтар жоқ' : 'Новостей пока нет'}</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card">
                  {item.cover_image_url && (
                    <div className="relative aspect-video overflow-hidden">
                      <img src={item.cover_image_url} alt={getTitle(item)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <Badge className="absolute left-4 top-4 bg-primary/90">{item.category}</Badge>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(item.publish_date)}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">{getTitle(item)}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{getContent(item).substring(0, 150)}...</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default News;
