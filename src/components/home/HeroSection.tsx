import { ArrowRight, Play, Shield, Clock, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';

interface NewsItem {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  content_ru: string; content_kz: string; content_en: string;
  cover_image_url: string | null;
  category: string; publish_date: string;
}

export const HeroSection = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    supabase.from('news').select('*').eq('status', 'published').order('publish_date', { ascending: false }).limit(5)
      .then(({ data }) => { if (data && data.length > 0) setNews(data as NewsItem[]); });
  }, []);

  const next = useCallback(() => setCurrent(i => (i + 1) % Math.max(news.length, 1)), [news.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + news.length) % Math.max(news.length, 1)), [news.length]);

  useEffect(() => {
    if (news.length <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [news.length, next]);

  const getTitle = (n: NewsItem) => language === 'kz' ? n.title_kz : language === 'en' ? n.title_en : n.title_ru;
  const getExcerpt = (n: NewsItem) => {
    const c = language === 'kz' ? n.content_kz : language === 'en' ? n.content_en : n.content_ru;
    return c?.substring(0, 200) || '';
  };
  const formatDate = (d: string) => new Date(d).toLocaleDateString(language === 'en' ? 'en-US' : language === 'kz' ? 'kk-KZ' : 'ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-background to-mint-light">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-mint/5 blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Центр спортивной медицины Актюбинской области
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity gap-2 text-base">
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-base border-primary/30 hover:bg-primary/5">
                <Play className="h-5 w-5" />
                {t('hero.services')}
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">Экстренная помощь</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">50+</p>
                  <p className="text-xs text-muted-foreground">Специалистов</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">15 лет</p>
                  <p className="text-xs text-muted-foreground">На рынке</p>
                </div>
              </div>
            </div>
          </div>

          {/* News Carousel */}
          <div className="relative animate-fade-in lg:animate-slide-in-right">
            <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-xl min-h-[380px]">
              {news.length > 0 ? (
                <>
                  <div className="relative h-full">
                    {news.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          idx === current ? 'opacity-100 translate-x-0' : idx < current ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                        }`}
                      >
                        {item.cover_image_url && (
                          <div className="h-48 overflow-hidden">
                            <img src={item.cover_image_url} alt={getTitle(item)} className="h-full w-full object-cover" />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{item.category}</span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />{formatDate(item.publish_date)}
                            </span>
                          </div>
                          <h3 className="font-display text-xl font-bold text-foreground mb-2 line-clamp-2">{getTitle(item)}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{getExcerpt(item)}...</p>
                          <Link to="/news" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                            {t('news.readMore')} <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Controls */}
                  {news.length > 1 && (
                    <>
                      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors">
                        <ChevronLeft className="h-4 w-4 text-foreground" />
                      </button>
                      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors">
                        <ChevronRight className="h-4 w-4 text-foreground" />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {news.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-2 rounded-full transition-all ${idx === current ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="flex h-full items-center justify-center p-12">
                  <div className="text-center">
                    <Shield className="mx-auto h-12 w-12 text-primary/30 mb-4" />
                    <p className="text-muted-foreground">{language === 'en' ? 'No news yet' : language === 'kz' ? 'Жаңалықтар жоқ' : 'Новостей пока нет'}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-coral/20 blur-2xl" />
            <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
