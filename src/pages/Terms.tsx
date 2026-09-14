import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const sections = [
  'section1',
  'section2',
  'section3',
  'section4',
  'section5',
  'section6',
] as const;

const Terms = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {t('terms.title')}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('terms.lastUpdated')}
            </p>
          </div>

          <Card className="mx-auto max-w-3xl border-border/50 bg-card">
            <CardContent className="space-y-8 p-8 md:p-12">
              {sections.map((section) => (
                <div key={section}>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-3">
                    {t(`terms.${section}.title`)}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`terms.${section}.text`)}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
