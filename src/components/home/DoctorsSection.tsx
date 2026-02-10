import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Doctor {
  id: string;
  name_ru: string; name_kz: string; name_en: string;
  specialization_ru: string; specialization_kz: string; specialization_en: string;
  experience_years: number; photo_url: string | null;
}

export const DoctorsSection = () => {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    supabase.from('doctors').select('*').eq('status', 'active').limit(4)
      .then(({ data }) => { if (data && data.length > 0) setDoctors(data as Doctor[]); });
  }, []);

  const getName = (d: Doctor) => language === 'kz' ? d.name_kz : language === 'en' ? d.name_en : d.name_ru;
  const getSpec = (d: Doctor) => language === 'kz' ? d.specialization_kz : language === 'en' ? d.specialization_en : d.specialization_ru;

  if (doctors.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">{t('doctors.title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('doctors.subtitle')}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img src={doctor.photo_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80'} alt={getName(doctor)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <h3 className="font-display text-lg font-semibold">{getName(doctor)}</h3>
                  <p className="text-sm opacity-90">{getSpec(doctor)}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{doctor.experience_years} {t('doctors.experience')}</span>
                  <Link to="/doctors" className="text-sm font-medium text-primary hover:underline">{t('services.learnMore')}</Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
            <Link to="/doctors">{t('doctors.viewAll')}<ArrowRight className="h-5 w-5" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
