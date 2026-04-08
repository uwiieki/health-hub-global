import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, ExternalLink } from 'lucide-react';

const legalActs = [
  {
    title: {
      ru: 'Закон Республики Казахстан «О физической культуре и спорте»',
      kz: 'Қазақстан Республикасының «Дене шынықтыру және спорт туралы» Заңы',
      en: 'Law of the Republic of Kazakhstan "On Physical Culture and Sports"',
    },
    date: '2014-07-03',
    number: '№ 228-V ЗРК',
  },
  {
    title: {
      ru: 'Закон Республики Казахстан «Об охране здоровья граждан»',
      kz: 'Қазақстан Республикасының «Халық денсаулығы және денсаулық сақтау жүйесі туралы» Заңы',
      en: 'Law of the Republic of Kazakhstan "On Public Health and Healthcare System"',
    },
    date: '2020-07-07',
    number: '№ 360-VI ЗРК',
  },
  {
    title: {
      ru: 'Приказ Министерства здравоохранения РК «Об утверждении стандартов спортивной медицины»',
      kz: 'ҚР Денсаулық сақтау министрлігінің «Спорттық медицина стандарттарын бекіту туралы» бұйрығы',
      en: 'Order of the Ministry of Health of RK "On Approval of Sports Medicine Standards"',
    },
    date: '2021-03-15',
    number: '№ ҚР ДСМ-24',
  },
  {
    title: {
      ru: 'Постановление Правительства РК «О медицинском обеспечении спортсменов»',
      kz: 'ҚР Үкіметінің «Спортшыларды медициналық қамтамасыз ету туралы» қаулысы',
      en: 'Government Resolution of RK "On Medical Support for Athletes"',
    },
    date: '2019-09-20',
    number: '№ 698',
  },
  {
    title: {
      ru: 'Санитарные правила и нормы для спортивных медицинских учреждений',
      kz: 'Спорттық медициналық мекемелерге арналған санитарлық ережелер мен нормалар',
      en: 'Sanitary Rules and Standards for Sports Medical Institutions',
    },
    date: '2022-01-10',
    number: '№ 45',
  },
];

const content = {
  ru: {
    title: 'Нормативно-правовые акты',
    subtitle: 'Основные законодательные и нормативные документы, регулирующие деятельность центра',
    dateLabel: 'Дата принятия',
    numberLabel: 'Номер документа',
  },
  kz: {
    title: 'Нормативтік-құқықтық актілер',
    subtitle: 'Орталық қызметін реттейтін негізгі заңнамалық және нормативтік құжаттар',
    dateLabel: 'Қабылданған күні',
    numberLabel: 'Құжат нөмірі',
  },
  en: {
    title: 'Legal Acts',
    subtitle: 'Key legislative and regulatory documents governing the center\'s activities',
    dateLabel: 'Date of adoption',
    numberLabel: 'Document number',
  },
};

const LegalActs = () => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {c.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {c.subtitle}
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {legalActs.map((act, index) => (
              <Card key={index} className="border-border/50 bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-base font-semibold text-foreground mb-2 leading-snug">
                        {act.title[language]}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>
                          <span className="font-medium text-foreground/70">{c.dateLabel}:</span>{' '}
                          {new Date(act.date).toLocaleDateString(language === 'kz' ? 'kk-KZ' : language === 'en' ? 'en-US' : 'ru-RU')}
                        </span>
                        <span>
                          <span className="font-medium text-foreground/70">{c.numberLabel}:</span>{' '}
                          {act.number}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalActs;
