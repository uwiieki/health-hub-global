import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { formatNewsDate } from '@/lib/formatDate';

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
    return (content || '').substring(0, 160);
  };

  const formatDate = (dateStr: string) => formatNewsDate(dateStr, language);

  if (news.length === 0) return null;

  const [main, ...rest] = news;

  const Meta = ({ item }: { item: NewsItem }) => (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{item.category}</span>
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="h-3.5 w-3.5" />
        {formatDate(item.publish_date)}
      </span>
    </div>
  );

  const Arrow = () => (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary/10">
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );

  const Placeholder = () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-white">
      <Newspaper className="h-10 w-10 text-primary/40" strokeWidth={1.5} />
    </div>
  );

  return (
    <section className="relative py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-gradient-to-br from-white/80 via-secondary/50 to-primary/10 px-5 py-8 shadow-card backdrop-blur-sm sm:px-8 sm:py-10 xl:px-8 xl:py-12 min-[1400px]:px-10">
          {/* Мягкие абстрактные формы на фоне */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -bottom-32 h-72 w-96 rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute -right-24 -top-28 h-72 w-[28rem] -rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute left-1/3 bottom-0 h-32 w-72 rounded-[100%] bg-white/70 blur-2xl" />
          </div>

          <div className="relative grid gap-8 xl:grid-cols-[1fr_2fr] xl:items-center xl:gap-8">
            {/* Левая часть */}
            <div className="min-w-0 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-primary">
                <Calendar className="h-4 w-4" />
                {t('news.homeTitle')}
              </span>

              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {t('news.homeTitle')}
              </h2>

              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('news.homeSubtitle')}
              </p>

              <Button asChild size="lg" className="mt-2 gap-2 bg-gradient-hero text-base transition-opacity hover:opacity-90">
                <Link to="/news">
                  {t('news.viewAll')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Правая часть: главная новость + две меньшие */}
            <div className={`grid min-w-0 gap-4 ${rest.length > 0 ? 'xl:grid-cols-[11fr_9fr]' : ''}`}>
              {/* Главная новость */}
              <Link
                to={`/news/${main.id}`}
                className={`group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-primary/10 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card md:flex-row ${rest.length > 0 ? 'xl:flex-col' : ''}`}
              >
                <div className={`aspect-[16/9] overflow-hidden md:aspect-auto md:w-1/2 md:shrink-0 ${rest.length > 0 ? 'xl:aspect-[16/9] xl:w-auto' : ''}`}>
                  {main.cover_image_url ? (
                    <img
                      src={main.cover_image_url}
                      alt={getTitle(main)}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <Placeholder />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <Meta item={main} />
                  <h3 className="break-words font-display text-xl font-bold leading-snug text-foreground md:text-2xl">
                    {getTitle(main)}
                  </h3>
                  <p className="line-clamp-3 break-words text-[15px] leading-relaxed text-muted-foreground">
                    {getExcerpt(main)}
                  </p>
                  <div className="mt-auto flex justify-end pt-1">
                    <Arrow />
                  </div>
                </div>
              </Link>

              {/* Две дополнительные новости */}
              {rest.length > 0 && (
                <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  {rest.map((item) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.id}`}
                      className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-primary/10 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card xl:flex-row"
                    >
                      <div className="aspect-[16/9] shrink-0 overflow-hidden md:aspect-[2/1] xl:aspect-auto xl:w-2/5">
                        {item.cover_image_url ? (
                          <img
                            src={item.cover_image_url}
                            alt={getTitle(item)}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Placeholder />
                        )}
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col gap-2 p-4">
                        <Meta item={item} />
                        <h3 className="line-clamp-2 break-words font-display text-base font-bold leading-snug text-foreground">
                          {getTitle(item)}
                        </h3>
                        <p className="line-clamp-2 break-words text-sm leading-relaxed text-muted-foreground">
                          {getExcerpt(item)}
                        </p>
                        <div className="mt-auto flex justify-end pt-1">
                          <Arrow />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
