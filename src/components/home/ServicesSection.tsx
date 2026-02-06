import { Link } from 'react-router-dom';
import { Heart, Brain, Stethoscope, Baby, Bone, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const services = [
  {
    icon: Stethoscope,
    titleRu: 'Терапия',
    titleKz: 'Терапия',
    titleEn: 'Therapy',
    descRu: 'Комплексная диагностика и лечение внутренних органов',
    descKz: 'Ішкі ағзаларды кешенді диагностикалау және емдеу',
    descEn: 'Comprehensive diagnostics and treatment of internal organs',
    price: 'от 5 000 ₸',
  },
  {
    icon: Heart,
    titleRu: 'Кардиология',
    titleKz: 'Кардиология',
    titleEn: 'Cardiology',
    descRu: 'Диагностика и лечение заболеваний сердца',
    descKz: 'Жүрек ауруларын диагностикалау және емдеу',
    descEn: 'Diagnosis and treatment of heart diseases',
    price: 'от 8 000 ₸',
  },
  {
    icon: Brain,
    titleRu: 'Неврология',
    titleKz: 'Неврология',
    titleEn: 'Neurology',
    descRu: 'Лечение заболеваний нервной системы',
    descKz: 'Жүйке жүйесі ауруларын емдеу',
    descEn: 'Treatment of nervous system diseases',
    price: 'от 7 000 ₸',
  },
  {
    icon: Baby,
    titleRu: 'Педиатрия',
    titleKz: 'Педиатрия',
    titleEn: 'Pediatrics',
    descRu: 'Забота о здоровье детей всех возрастов',
    descKz: 'Барлық жастағы балалардың денсаулығына қамқорлық',
    descEn: 'Caring for children of all ages',
    price: 'от 4 000 ₸',
  },
  {
    icon: Bone,
    titleRu: 'Ортопедия',
    titleKz: 'Ортопедия',
    titleEn: 'Orthopedics',
    descRu: 'Лечение заболеваний опорно-двигательного аппарата',
    descKz: 'Тірек-қимыл аппараты ауруларын емдеу',
    descEn: 'Treatment of musculoskeletal disorders',
    price: 'от 6 000 ₸',
  },
  {
    icon: Eye,
    titleRu: 'Офтальмология',
    titleKz: 'Офтальмология',
    titleEn: 'Ophthalmology',
    descRu: 'Диагностика и лечение заболеваний глаз',
    descKz: 'Көз ауруларын диагностикалау және емдеу',
    descEn: 'Eye disease diagnosis and treatment',
    price: 'от 5 500 ₸',
  },
];

export const ServicesSection = () => {
  const { t, language } = useLanguage();

  const getTitle = (service: typeof services[0]) => {
    switch (language) {
      case 'kz': return service.titleKz;
      case 'en': return service.titleEn;
      default: return service.titleRu;
    }
  };

  const getDesc = (service: typeof services[0]) => {
    switch (language) {
      case 'kz': return service.descKz;
      case 'en': return service.descEn;
      default: return service.descRu;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {t('services.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border/50 bg-gradient-card transition-all duration-300 hover:shadow-card hover:border-primary/30"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {getTitle(service)}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {getDesc(service)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{service.price}</span>
                  <Link
                    to="/services"
                    className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    {t('services.learnMore')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
            <Link to="/services">
              {t('services.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
