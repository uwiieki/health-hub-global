import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  description_ru: string; description_kz: string; description_en: string;
  price: string;
}

export const ServicesSection = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    supabase.from('services').select('*').eq('status', 'active').limit(6)
      .then(({ data }) => { if (data && data.length > 0) setServices(data as Service[]); });
  }, []);

  const getTitle = (s: Service) => language === 'kz' ? s.title_kz : language === 'en' ? s.title_en : s.title_ru;
  const getDesc = (s: Service) => language === 'kz' ? s.description_kz : language === 'en' ? s.description_en : s.description_ru;

  if (services.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{t('services.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('services.subtitle')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id} className="group relative overflow-hidden border-border/50 bg-gradient-card transition-all duration-300 hover:shadow-card hover:border-primary/30">
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Stethoscope className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{getTitle(service)}</h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{getDesc(service)}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{service.price}</span>
                  <Link to="/services" className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    {t('services.learnMore')}<ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
            <Link to="/services">{t('services.viewAll')}<ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
