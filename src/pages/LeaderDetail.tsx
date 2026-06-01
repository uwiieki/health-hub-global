import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Briefcase, Award, User } from 'lucide-react';
import { getLeader } from '@/data/leaders';
import { getSpecialistPhoto } from '@/lib/specialistPhotos';

const LeaderDetail = () => {
  const { id } = useParams();
  const { language } = useLanguage();
  const leader = id ? getLeader(id) : undefined;

  const tr = (obj: { ru: string; kz: string; en: string }) =>
    language === 'kz' ? obj.kz : language === 'en' ? obj.en : obj.ru;

  const back = language === 'kz' ? 'Біз туралы' : language === 'en' ? 'About us' : 'О нас';

  return (
    <Layout>
      <section className="py-12 md:py-20 bg-background">
        <div className="container max-w-5xl">
          <Button asChild variant="ghost" className="mb-6 gap-2">
            <Link to="/about">
              <ArrowLeft className="h-4 w-4" />
              {back}
            </Link>
          </Button>

          {!leader ? (
            <p className="text-center text-muted-foreground py-12">
              {language === 'kz' ? 'Басшы табылмады' : language === 'en' ? 'Leader not found' : 'Руководитель не найден'}
            </p>
          ) : (
            <div className="grid gap-8 md:grid-cols-[320px_1fr]">
              <div>
                <Card className="overflow-hidden border-border/50">
                  <div className="relative aspect-square bg-secondary/40 flex items-center justify-center">
                    {leader.photoUrl ? (
                      <img src={leader.photoUrl} alt={tr(leader.name)} className="h-full w-full object-cover" />
                    ) : (
                      <img
                        src={getSpecialistPhoto(leader.id)}
                        alt={tr(leader.name)}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <div>
                  <Badge className="mb-3 bg-primary/90">{tr(leader.role)}</Badge>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">{tr(leader.name)}</h1>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{tr(leader.desc)}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-border/50">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {language === 'kz' ? 'Жұмыс тәжірибесі' : language === 'en' ? 'Experience' : 'Опыт работы'}
                        </p>
                        <p className="font-display text-xl font-semibold text-foreground">
                          {leader.experienceYears}+ {language === 'kz' ? 'жыл' : language === 'en' ? 'years' : 'лет'}
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
                          {language === 'kz' ? 'Біліктілік' : language === 'en' ? 'Qualification' : 'Квалификация'}
                        </p>
                        <p className="font-medium text-foreground">{tr(leader.qualification)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="h-6 w-6 text-primary" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        {language === 'kz' ? 'Білімі' : language === 'en' ? 'Education' : 'Образование'}
                      </h2>
                    </div>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{tr(leader.education)}</p>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="h-6 w-6 text-primary" />
                      <h2 className="font-display text-lg font-semibold text-foreground">
                        {language === 'kz' ? 'Жұмыс тәжірибесі' : language === 'en' ? 'Work experience' : 'Опыт работы'}
                      </h2>
                    </div>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{tr(leader.experience)}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default LeaderDetail;