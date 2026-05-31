import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import doctorIcon from '@/assets/doctor-icon.png';

interface Doctor {
  id: string;
  name_ru: string; name_kz: string; name_en: string;
  specialization_ru: string; specialization_kz: string; specialization_en: string;
  bio_ru: string; bio_kz: string; bio_en: string;
  experience_years: number; photo_url: string | null;
}

const Doctors = () => {
  const { t, language } = useLanguage();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedSpec, setSelectedSpec] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('doctors').select('*').eq('status', 'active');
      if (data && data.length > 0) setDoctors(data as Doctor[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const getName = (d: Doctor) => language === 'kz' ? d.name_kz : language === 'en' ? d.name_en : d.name_ru;
  const getSpec = (d: Doctor) => language === 'kz' ? d.specialization_kz : language === 'en' ? d.specialization_en : d.specialization_ru;
  const getBio = (d: Doctor) => language === 'kz' ? d.bio_kz : language === 'en' ? d.bio_en : d.bio_ru;

  const specs = ['all', ...new Set(doctors.map(d => d.specialization_ru).filter(Boolean))];
  const allLabel = language === 'en' ? 'All' : language === 'kz' ? 'Барлығы' : 'Все';

  const filtered = doctors.filter(d => selectedSpec === 'all' || d.specialization_ru === selectedSpec);

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">{t('doctors.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t('doctors.subtitle')}</p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {specs.map((spec) => (
              <Badge
                key={spec}
                variant={selectedSpec === spec ? 'default' : 'secondary'}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedSpec(spec)}
              >
                {spec === 'all' ? allLabel : spec}
              </Badge>
            ))}
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">{t('common.loading')}</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{language === 'en' ? 'No doctors found' : language === 'kz' ? 'Дәрігерлер табылмады' : 'Врачи не найдены'}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((doctor) => (
                <Link key={doctor.id} to={`/doctors/${doctor.id}`} className="group">
                  <Card className="overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card h-full">
                    <div className={`relative aspect-[3/4] overflow-hidden ${!doctor.photo_url ? 'bg-secondary/40 flex items-center justify-center' : ''}`}>
                      <img
                        src={doctor.photo_url || doctorIcon}
                        alt={getName(doctor)}
                        className={`${doctor.photo_url ? 'h-full w-full object-cover' : 'h-2/3 w-2/3 object-contain'} transition-transform duration-500 group-hover:scale-105`}
                        loading="lazy"
                      />
                      {doctor.photo_url && <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />}
                      {doctor.photo_url && (
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                          <Badge className="mb-2 bg-primary/90">{getSpec(doctor)}</Badge>
                          <h3 className="font-display text-xl font-semibold">{getName(doctor)}</h3>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      {!doctor.photo_url && (
                        <div className="mb-3">
                          <Badge className="mb-2 bg-primary/90">{getSpec(doctor)}</Badge>
                          <h3 className="font-display text-xl font-semibold text-foreground">{getName(doctor)}</h3>
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{getBio(doctor)}</p>
                      <span className="text-sm text-muted-foreground">{doctor.experience_years} {t('doctors.experience')}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Doctors;
