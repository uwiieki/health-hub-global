import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, GraduationCap, Briefcase, Award } from 'lucide-react';
import doctorIcon from '@/assets/doctor-icon.png';

interface Doctor {
  id: string;
  name_ru: string; name_kz: string; name_en: string;
  specialization_ru: string; specialization_kz: string; specialization_en: string;
  bio_ru: string; bio_kz: string; bio_en: string;
  education: string | null;
  experience_years: number;
  photo_url: string | null;
}

const DoctorDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase.from('doctors').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      setDoctor(data as Doctor | null);
      setLoading(false);
    });
  }, [id]);

  const tr = (ru: string, kz: string, en: string) => language === 'kz' ? kz : language === 'en' ? en : ru;
  const getName = (d: Doctor) => tr(d.name_ru, d.name_kz, d.name_en);
  const getSpec = (d: Doctor) => tr(d.specialization_ru, d.specialization_kz, d.specialization_en);
  const getBio = (d: Doctor) => tr(d.bio_ru, d.bio_kz, d.bio_en);

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-background">
        <div className="container max-w-5xl">
          <Button asChild variant="ghost" className="mb-6 gap-2">
            <Link to="/doctors">
              <ArrowLeft className="h-4 w-4" />
              {tr('К списку специалистов', 'Мамандар тізіміне', 'Back to specialists')}
            </Link>
          </Button>

          {loading ? (
            <p className="text-center text-muted-foreground py-12">{t('common.loading')}</p>
          ) : !doctor ? (
            <p className="text-center text-muted-foreground py-12">
              {tr('Специалист не найден', 'Маман табылмады', 'Specialist not found')}
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-[320px_1fr]">
              <div>
                <Card className="overflow-hidden border-border/50">
                  <div className={`relative aspect-[3/4] ${!doctor.photo_url ? 'bg-secondary/40 flex items-center justify-center' : ''}`}>
                    <img
                      src={doctor.photo_url || doctorIcon}
                      alt={getName(doctor)}
                      className={doctor.photo_url ? 'h-full w-full object-cover' : 'h-2/3 w-2/3 object-contain'}
                    />
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge className="mb-3 bg-primary/90">{getSpec(doctor)}</Badge>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{getName(doctor)}</h1>
                </div>

                {getBio(doctor) && (
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <h2 className="font-display text-lg font-semibold mb-3 text-foreground">
                        {tr('О специалисте', 'Маман туралы', 'About')}
                      </h2>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{getBio(doctor)}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-border/50">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {tr('Опыт работы', 'Жұмыс тәжірибесі', 'Experience')}
                        </p>
                        <p className="font-display text-xl font-semibold text-foreground">
                          {doctor.experience_years} {t('doctors.experience')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {tr('Квалификация', 'Біліктілік', 'Qualification')}
                        </p>
                        <p className="font-medium text-foreground">{getSpec(doctor)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {doctor.education && (
                  <Card className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap className="h-6 w-6 text-primary" />
                        <h2 className="font-display text-lg font-semibold text-foreground">
                          {tr('Образование', 'Білімі', 'Education')}
                        </h2>
                      </div>
                      <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{doctor.education}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DoctorDetail;