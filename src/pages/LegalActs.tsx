import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LegalAct {
  id: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  document_number: string;
  adoption_date: string;
  document_url: string | null;
}

const content = {
  ru: {
    title: 'Нормативно-правовые акты',
    subtitle: 'Основные законодательные и нормативные документы, регулирующие деятельность центра',
    dateLabel: 'Дата принятия',
    numberLabel: 'Номер документа',
    empty: 'Нет документов',
  },
  kz: {
    title: 'Нормативтік-құқықтық актілер',
    subtitle: 'Орталық қызметін реттейтін негізгі заңнамалық және нормативтік құжаттар',
    dateLabel: 'Қабылданған күні',
    numberLabel: 'Құжат нөмірі',
    empty: 'Құжаттар жоқ',
  },
  en: {
    title: 'Legal Acts',
    subtitle: 'Key legislative and regulatory documents governing the center\'s activities',
    dateLabel: 'Date of adoption',
    numberLabel: 'Document number',
    empty: 'No documents',
  },
};

const LegalActs = () => {
  const { language } = useLanguage();
  const c = content[language];
  const [acts, setActs] = useState<LegalAct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActs = async () => {
      const { data } = await supabase
        .from('legal_acts')
        .select('*')
        .eq('status', 'active')
        .order('adoption_date', { ascending: false });
      if (data) setActs(data);
      setLoading(false);
    };
    fetchActs();
  }, []);

  const getTitle = (act: LegalAct) => {
    switch (language) {
      case 'kz': return act.title_kz || act.title_ru;
      case 'en': return act.title_en || act.title_ru;
      default: return act.title_ru;
    }
  };

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
            {loading ? (
              <p className="text-center text-muted-foreground py-8">{language === 'ru' ? 'Загрузка...' : language === 'kz' ? 'Жүктелуде...' : 'Loading...'}</p>
            ) : acts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">{c.empty}</p>
            ) : (
              acts.map((act) => (
                <Card key={act.id} className="border-border/50 bg-card hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-base font-semibold text-foreground mb-2 leading-snug">
                          {act.document_url ? (
                            <a href={act.document_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                              {getTitle(act)}
                            </a>
                          ) : (
                            getTitle(act)
                          )}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>
                            <span className="font-medium text-foreground/70">{c.dateLabel}:</span>{' '}
                            {new Date(act.adoption_date).toLocaleDateString(language === 'kz' ? 'kk-KZ' : language === 'en' ? 'en-US' : 'ru-RU')}
                          </span>
                          <span>
                            <span className="font-medium text-foreground/70">{c.numberLabel}:</span>{' '}
                            {act.document_number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LegalActs;
