import { ArrowRight, Play, Shield, Calendar, ChevronLeft, ChevronRight, Stethoscope, UserCheck, FileText, Newspaper } from 'lucide-react';
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

interface CarouselSlide {
  type: 'page' | 'news';
  id: string;
  title: string;
  description: string;
  link: string;
  linkLabel: string;
  icon: React.ReactNode;
  bgGradient: string;
  imageUrl?: string | null;
  badge?: string;
  date?: string;
}

export const HeroSection = () => {
  const { t, language } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState<CarouselSlide[]>([]);

  useEffect(() => {
    supabase.from('news').select('*').eq('status', 'published').order('publish_date', { ascending: false }).limit(3)
      .then(({ data }) => { if (data) setNews(data as NewsItem[]); });
  }, []);

  const getTitle = (n: NewsItem) => language === 'kz' ? n.title_kz : language === 'en' ? n.title_en : n.title_ru;
  const getExcerpt = (n: NewsItem) => {
    const c = language === 'kz' ? n.content_kz : language === 'en' ? n.content_en : n.content_ru;
    return c?.substring(0, 150) || '';
  };
  const formatDate = (d: string) => new Date(d).toLocaleDateString(language === 'en' ? 'en-US' : language === 'kz' ? 'kk-KZ' : 'ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    const pageSlides: CarouselSlide[] = [
      {
        type: 'page', id: 'services',
        title: language === 'kz' ? 'Біздің қызметтер' : language === 'en' ? 'Our Services' : 'Наши услуги',
        description: language === 'kz' ? 'Спорттық медицина, диагностика, реабилитация және басқа да қызметтер' : language === 'en' ? 'Sports medicine, diagnostics, rehabilitation and more' : 'Спортивная медицина, диагностика, реабилитация и другие услуги',
        link: '/services', linkLabel: language === 'kz' ? 'Қызметтерге өту' : language === 'en' ? 'View Services' : 'Перейти к услугам',
        icon: <Stethoscope className="h-8 w-8" />,
        bgGradient: 'from-primary/20 via-primary/5 to-transparent',
      },
      {
        type: 'page', id: 'doctors',
        title: language === 'kz' ? 'Біздің дәрігерлер' : language === 'en' ? 'Our Doctors' : 'Наши врачи',
        description: language === 'kz' ? 'Тәжірибелі мамандар тобы сіздің денсаулығыңыз үшін' : language === 'en' ? 'Experienced specialists dedicated to your health' : 'Команда опытных специалистов для вашего здоровья',
        link: '/doctors', linkLabel: language === 'kz' ? 'Дәрігерлерді көру' : language === 'en' ? 'Meet Doctors' : 'Познакомиться с врачами',
        icon: <UserCheck className="h-8 w-8" />,
        bgGradient: 'from-mint/20 via-mint/5 to-transparent',
      },
      {
        type: 'page', id: 'legal-acts',
        title: language === 'kz' ? 'Нормативтік-құқықтық актілер' : language === 'en' ? 'Legal Acts' : 'Нормативно-правовые акты',
        description: language === 'kz' ? 'Заңнамалық құжаттар мен нормативтік актілер' : language === 'en' ? 'Legislative documents and regulatory acts' : 'Законодательные документы и нормативные акты',
        link: '/legal-acts', linkLabel: language === 'kz' ? 'НҚА қарау' : language === 'en' ? 'View Legal Acts' : 'Смотреть НПА',
        icon: <FileText className="h-8 w-8" />,
        bgGradient: 'from-coral/20 via-coral/5 to-transparent',
      },
    ];

    const newsSlides: CarouselSlide[] = news.map((item) => ({
      type: 'news' as const, id: item.id,
      title: getTitle(item),
      description: getExcerpt(item),
      link: '/news', linkLabel: language === 'kz' ? 'Толығырақ' : language === 'en' ? 'Read more' : 'Подробнее',
      icon: <Newspaper className="h-8 w-8" />,
      bgGradient: 'from-primary/10 via-transparent to-transparent',
      imageUrl: item.cover_image_url,
      badge: item.category,
      date: formatDate(item.publish_date),
    }));

    setSlides([...pageSlides, ...newsSlides]);
  }, [news, language]);

  const total = slides.length;
  const next = useCallback(() => setCurrent(i => (i + 1) % Math.max(total, 1)), [total]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + total) % Math.max(total, 1)), [total]);

  useEffect(() => {
    if (total <= 1) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [total, next]);

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
                {t('org.name')}
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

          </div>

          {/* Carousel */}
          <div className="relative animate-fade-in lg:animate-slide-in-right">
            <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-xl min-h-[400px]">
              {slides.length > 0 ? (
                <>
                  <div className="relative h-full">
                    {slides.map((slide, idx) => (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          idx === current ? 'opacity-100 translate-x-0' : idx < current ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                        }`}
                      >
                        {slide.type === 'news' && slide.imageUrl ? (
                          <div className="h-44 overflow-hidden">
                            <img src={slide.imageUrl} alt={slide.title} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <div className={`h-44 bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center`}>
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-background/80 backdrop-blur text-primary shadow-lg">
                              {slide.icon}
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-2 flex items-center gap-2 flex-wrap">
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                              {slide.type === 'news' ? slide.badge : (slide.type === 'page' ? (language === 'kz' ? 'Бет' : language === 'en' ? 'Page' : 'Раздел') : '')}
                            </span>
                            {slide.date && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />{slide.date}
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-xl font-bold text-foreground mb-2 line-clamp-2">{slide.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{slide.description}</p>
                          <Link to={slide.link} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                            {slide.linkLabel} <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Controls */}
                  {slides.length > 1 && (
                    <>
                      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors">
                        <ChevronLeft className="h-4 w-4 text-foreground" />
                      </button>
                      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur shadow hover:bg-background transition-colors">
                        <ChevronRight className="h-4 w-4 text-foreground" />
                      </button>

                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, idx) => (
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
                    <p className="text-muted-foreground">{language === 'en' ? 'Loading...' : language === 'kz' ? 'Жүктелуде...' : 'Загрузка...'}</p>
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
