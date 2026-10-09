import { usePageMeta } from '@/hooks/usePageMeta';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Building } from 'lucide-react';
import { ManagementSection } from '@/components/about/ManagementSection';

const About = () => {
  usePageMeta({ title: 'О нас — Центр спортивной медицины Актюбинской области', description: 'О Центре спортивной медицины Актюбинской области: история, миссия и руководство.' });
  const { t, language } = useLanguage();

  const content = {
    ru: {
      historyTitle: 'История клиники',
      historyText: 'Центр спортивной медицины Актюбинской области открылся в 2026 году как новая современная клиника, объединившая большую команду специалистов разных направлений. С первых дней работы центр делает акцент на реабилитации: у нас собрано оборудование и специалисты для восстановления после травм, операций и интенсивных нагрузок, а также для сопровождения спортсменов на всех этапах — от диагностики до полного возвращения к тренировкам.',
      missionTitle: 'Наша миссия',
      missionText: 'Предоставлять качественную, доступную и современную медицинскую помощь, используя передовые технологии и индивидуальный подход к каждому пациенту.',
    },
    kz: {
      historyTitle: 'Клиника тарихы',
      historyText: 'Ақтөбе облысының спорттық медицина орталығы 2026 жылы әртүрлі бағыттағы мамандардың үлкен тобын біріктірген жаңа заманауи клиника ретінде ашылды. Жұмысының алғашқы күндерінен бастап орталық оңалтуға баса назар аударады: жарақаттардан, операциялардан және қарқынды жүктемелерден кейін қалпына келтіруге арналған жабдық пен мамандар жиналған, сондай-ақ спортшыларды диагностикадан бастап жаттығуларға толық қайта оралғанға дейінгі барлық кезеңдерде сүйемелдейміз.',
      missionTitle: 'Біздің миссиямыз',
      missionText: 'Озық технологияларды және әр науқасқа жеке көзқарасты қолдана отырып, сапалы, қолжетімді және заманауи медициналық көмек көрсету.',
    },
    en: {
      historyTitle: 'Our History',
      historyText: 'The Aktobe Region Sports Medicine Center opened in 2026 as a new, modern clinic bringing together a large team of specialists across many fields. From its first days, the center has focused on rehabilitation: we have the equipment and specialists needed for recovery after injuries, surgeries, and intense physical loads, and we support athletes at every stage — from diagnosis to a full return to training.',
      missionTitle: 'Our Mission',
      missionText: 'To provide quality, accessible and modern medical care using advanced technologies and an individual approach to each patient.',
    },
  };

  const c = content[language];

  return (
    <Layout>
      <section className="py-16 md:py-24">
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

          <ManagementSection />
        </div>
      </section>
    </Layout>
  );
};

export default About;
