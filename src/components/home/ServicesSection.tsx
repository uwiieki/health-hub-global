import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, FlaskConical, HeartPulse, PersonStanding, Stethoscope, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  description_ru: string; description_kz: string; description_en: string;
  category: string; price: string; image_url: string | null;
}

// Иконка подбирается по названию/категории услуги; по умолчанию — стетоскоп
const pickIcon = (s: Service): LucideIcon => {
  const text = `${s.title_ru} ${s.category}`.toLowerCase();
  if (/осмотр/.test(text)) return ClipboardList;
  if (/диагност|функциональн|экг|узи|кардио/.test(text)) return HeartPulse;
  if (/реабилит|восстанов|массаж|физио|лфк/.test(text)) return PersonStanding;
  if (/консульт|приём|прием/.test(text)) return Users;
  if (/лаборат|анализ/.test(text)) return FlaskConical;
  return Stethoscope;
};

export const ServicesSection = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    supabase.from('services').select('*').eq('status', 'active').limit(12)
      .then(({ data }) => { if (data && data.length > 0) setServices(data as Service[]); });
  }, []);

  // Индикаторы pagination синхронизируются с каруселью
  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on('select', update);
    api.on('reInit', update);
    return () => {
      api.off('select', update);
      api.off('reInit', update);
    };
  }, [api, services.length]);

  const getTitle = (s: Service) => language === 'kz' ? s.title_kz : language === 'en' ? s.title_en : s.title_ru;
  const getDesc = (s: Service) => language === 'kz' ? s.description_kz : language === 'en' ? s.description_en : s.description_ru;

  if (services.length === 0) return null;

  return (
    <section className="relative py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-gradient-to-br from-white/80 via-secondary/50 to-primary/10 px-5 py-8 shadow-card backdrop-blur-sm sm:px-8 sm:py-10 xl:px-8 xl:py-12 min-[1400px]:px-10">
          {/* Мягкие абстрактные формы на фоне */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-28 h-72 w-[28rem] rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute -right-24 -bottom-32 h-72 w-96 -rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute right-1/4 top-0 h-32 w-72 rounded-[100%] bg-white/70 blur-2xl" />
          </div>

          <div className="relative grid gap-8 xl:grid-cols-[1fr_3fr] xl:items-center xl:gap-10">
            {/* Левая часть */}
            <div className="min-w-0 space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-primary">
                <Stethoscope className="h-4 w-4" />
                {t('services.title')}
              </span>

              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {t('services.title')}
              </h2>

              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('services.homeSubtitle')}
              </p>

              <Button asChild size="lg" className="mt-2 gap-2 bg-gradient-hero text-base transition-opacity hover:opacity-90">
                <Link to="/services">
                  {t('services.viewAll')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Карусель услуг */}
            <div className="min-w-0">
              <Carousel
                setApi={setApi}
                opts={{ align: 'start', slidesToScroll: 'auto', containScroll: 'trimSnaps' }}
                className="min-w-0 sm:px-5"
              >
                <CarouselContent className="-ml-4 py-2">
                  {services.map((service) => {
                    const Icon = pickIcon(service);
                    return (
                      <CarouselItem
                        key={service.id}
                        className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <Link
                          to="/services"
                          className="group flex h-full flex-col rounded-[22px] border border-primary/10 bg-white/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
                        >
                          {/* Изображение + иконка поверх нижней части */}
                          <div className="relative">
                            <div className="aspect-[16/10] overflow-hidden rounded-t-[22px] xl:aspect-[4/3]">
                              {service.image_url ? (
                                <img
                                  src={service.image_url}
                                  alt={getTitle(service)}
                                  loading="lazy"
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-primary/5 to-white">
                                  <Icon className="h-12 w-12 text-primary/30" strokeWidth={1.5} />
                                </div>
                              )}
                            </div>
                            <span className="absolute -bottom-6 left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/10 bg-white text-primary shadow-md transition-transform duration-300 group-hover:scale-110">
                              <Icon className="h-6 w-6" strokeWidth={1.75} />
                            </span>
                          </div>

                          <div className="flex flex-1 flex-col px-4 pb-4 pt-9">
                            <h3 className="line-clamp-2 break-words font-display text-lg font-bold leading-snug text-foreground">
                              {getTitle(service)}
                            </h3>
                            <p className="mt-2 line-clamp-4 break-words text-sm leading-relaxed text-muted-foreground">
                              {getDesc(service)}
                            </p>
                            <div className="mt-auto flex justify-end pt-3">
                              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-primary/10">
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>

                {/* Стрелки (на телефоне скрыты — там свайп) */}
                <CarouselPrevious className="left-0 hidden h-10 w-10 border-primary/10 bg-white text-foreground shadow-md hover:bg-white hover:text-primary sm:inline-flex" />
                <CarouselNext className="right-0 hidden h-10 w-10 border-primary/10 bg-white text-foreground shadow-md hover:bg-white hover:text-primary sm:inline-flex" />
              </Carousel>

              {/* Pagination */}
              {snaps.length > 1 && (
                <div className="mt-4 flex justify-center gap-2">
                  {snaps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => api?.scrollTo(i)}
                      aria-label={`${i + 1} / ${snaps.length}`}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        i === selected ? 'w-6 bg-primary' : 'w-2 bg-primary/25 hover:bg-primary/40'
                      )}
                    />
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
