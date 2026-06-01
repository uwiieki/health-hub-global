import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Target, Building, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { leaders } from '@/data/leaders';
import { getSpecialistPhoto } from '@/lib/specialistPhotos';

const leadership = leaders;

const achievements = [
  { titleRu: 'ISO 9001:2015', descRu: 'Сертификат качества', descKz: 'Сапа сертификаты', descEn: 'Quality Certificate' },
  { titleRu: 'JCI', descRu: 'Международная аккредитация', descKz: 'Халықаралық аккредитация', descEn: 'International Accreditation' },
  { titleRu: 'Top-100', descRu: 'Лучшие клиники Казахстана', descKz: 'Қазақстанның үздік клиникалары', descEn: 'Best Clinics in Kazakhstan' },
];

const About = () => {
  const { t, language } = useLanguage();

  const getTitle = (item: { titleRu: string; titleKz?: string; titleEn?: string }) => {
    switch (language) {
      case 'kz': return item.titleKz || item.titleRu;
      case 'en': return item.titleEn || item.titleRu;
      default: return item.titleRu;
    }
  };

  const getDesc = (item: { descRu: string; descKz: string; descEn: string }) => {
    switch (language) {
      case 'kz': return item.descKz;
      case 'en': return item.descEn;
      default: return item.descRu;
    }
  };

  const content = {
    ru: {
      historyTitle: 'История клиники',
      historyText: 'Медицинский центр MediCare был основан в 2009 году группой опытных врачей, объединенных идеей создания клиники нового поколения. За 15 лет работы мы выросли из небольшого медицинского кабинета в современный многопрофильный центр с более чем 50 специалистами.',
      missionTitle: 'Наша миссия',
      missionText: 'Предоставлять качественную, доступную и современную медицинскую помощь, используя передовые технологии и индивидуальный подход к каждому пациенту.',
      achievementsTitle: 'Достижения и сертификаты',
      leadershipTitle: 'Руководство',
    },
    kz: {
      historyTitle: 'Клиника тарихы',
      historyText: 'MediCare медициналық орталығы 2009 жылы жаңа буын клиникасын құру идеясымен біріккен тәжірибелі дәрігерлер тобы құрды. 15 жыл жұмыс істеу барысында біз шағын медициналық кабинеттен 50-ден астам маманы бар заманауи көп бейінді орталыққа айналдық.',
      missionTitle: 'Біздің миссиямыз',
      missionText: 'Озық технологияларды және әр науқасқа жеке көзқарасты қолдана отырып, сапалы, қолжетімді және заманауи медициналық көмек көрсету.',
      achievementsTitle: 'Жетістіктер мен сертификаттар',
      leadershipTitle: 'Басшылық',
    },
    en: {
      historyTitle: 'Our History',
      historyText: 'MediCare Medical Center was founded in 2009 by a group of experienced doctors united by the idea of creating a new generation clinic. Over 15 years of work, we have grown from a small medical office into a modern multidisciplinary center with more than 50 specialists.',
      missionTitle: 'Our Mission',
      missionText: 'To provide quality, accessible and modern medical care using advanced technologies and an individual approach to each patient.',
      achievementsTitle: 'Achievements and Certificates',
      leadershipTitle: 'Leadership',
    },
  };

  const c = content[language];

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {t('nav.about')}
            </h1>
          </div>

          {/* History & Mission */}
          <div className="grid gap-12 lg:grid-cols-2 mb-16">
            <Card className="border-border/50 bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <Building className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.historyTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {c.historyText}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  {c.missionTitle}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {c.missionText}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Leadership */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              {c.leadershipTitle}
            </h2>
            <div className="grid gap-8 lg:grid-cols-3">
              {leadership.map((person) => (
                <Link key={person.id} to={`/leaders/${person.id}`} className="group">
                  <Card className="border-border/50 bg-card overflow-hidden transition-all duration-300 hover:shadow-card h-full">
                    <CardContent className="p-8 text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-6">
                        <AvatarImage src={getSpecialistPhoto(person.id)} alt={person.name.ru} className="object-cover" />
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                          <User className="h-10 w-10" />
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium text-primary mb-2">
                        {language === 'kz' ? person.role.kz : language === 'en' ? person.role.en : person.role.ru}
                      </p>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:underline">
                        {language === 'kz' ? person.name.kz : language === 'en' ? person.name.en : person.name.ru}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'kz' ? person.desc.kz : language === 'en' ? person.desc.en : person.desc.ru}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-hero rounded-2xl p-8 md:p-12">
            <h2 className="font-display text-3xl font-bold text-primary-foreground text-center mb-8">
              {c.achievementsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-foreground mb-1">
                    {achievement.titleRu}
                  </h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {getDesc(achievement)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
