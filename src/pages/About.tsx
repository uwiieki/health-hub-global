import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Award, Users, Target, Heart, Building } from 'lucide-react';

const values = [
  { icon: Heart, titleRu: 'Забота о пациентах', titleKz: 'Науқастарға қамқорлық', titleEn: 'Patient Care', descRu: 'Каждый пациент для нас уникален', descKz: 'Әр науқас біз үшін бірегей', descEn: 'Every patient is unique to us' },
  { icon: Shield, titleRu: 'Качество', titleKz: 'Сапа', titleEn: 'Quality', descRu: 'Высокие стандарты медицины', descKz: 'Жоғары медицина стандарттары', descEn: 'High medical standards' },
  { icon: Users, titleRu: 'Командная работа', titleKz: 'Командалық жұмыс', titleEn: 'Teamwork', descRu: 'Сплоченная команда профессионалов', descKz: 'Мамандардың үйлесімді командасы', descEn: 'A cohesive team of professionals' },
  { icon: Target, titleRu: 'Инновации', titleKz: 'Инновациялар', titleEn: 'Innovation', descRu: 'Современные методы лечения', descKz: 'Заманауи емдеу әдістері', descEn: 'Modern treatment methods' },
];

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
      valuesTitle: 'Наши ценности',
      achievementsTitle: 'Достижения и сертификаты',
      leadershipTitle: 'Руководство',
    },
    kz: {
      historyTitle: 'Клиника тарихы',
      historyText: 'MediCare медициналық орталығы 2009 жылы жаңа буын клиникасын құру идеясымен біріккен тәжірибелі дәрігерлер тобы құрды. 15 жыл жұмыс істеу барысында біз шағын медициналық кабинеттен 50-ден астам маманы бар заманауи көп бейінді орталыққа айналдық.',
      missionTitle: 'Біздің миссия',
      missionText: 'Озық технологияларды және әр науқасқа жеке көзқарасты қолдана отырып, сапалы, қолжетімді және заманауи медициналық көмек көрсету.',
      valuesTitle: 'Біздің құндылықтар',
      achievementsTitle: 'Жетістіктер мен сертификаттар',
      leadershipTitle: 'Басшылық',
    },
    en: {
      historyTitle: 'Our History',
      historyText: 'MediCare Medical Center was founded in 2009 by a group of experienced doctors united by the idea of creating a new generation clinic. Over 15 years of work, we have grown from a small medical office into a modern multidisciplinary center with more than 50 specialists.',
      missionTitle: 'Our Mission',
      missionText: 'To provide quality, accessible and modern medical care using advanced technologies and an individual approach to each patient.',
      valuesTitle: 'Our Values',
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

          {/* Values */}
          <div className="mb-16">
            <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
              {c.valuesTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="border-border/50 bg-card text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                      {getTitle(value)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {getDesc(value)}
                    </p>
                  </CardContent>
                </Card>
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
