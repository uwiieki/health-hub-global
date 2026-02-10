import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Stethoscope } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Service {
  id: string;
  title_ru: string; title_kz: string; title_en: string;
  description_ru: string; description_kz: string; description_en: string;
  category: string; price: string; image_url: string | null;
}

const Services = () => {
  const { t, language } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('services').select('*').eq('status', 'active');
      if (data && data.length > 0) setServices(data as Service[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const getTitle = (s: Service) => language === 'kz' ? s.title_kz : language === 'en' ? s.title_en : s.title_ru;
  const getDesc = (s: Service) => language === 'kz' ? s.description_kz : language === 'en' ? s.description_en : s.description_ru;

  const categories = ['all', ...new Set(services.map(s => s.category).filter(Boolean))];
  const categoryLabels: Record<string, string> = { all: language === 'en' ? 'All' : language === 'kz' ? 'Барлығы' : 'Все' };

  const filtered = services.filter(s => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch = getTitle(s).toLowerCase().includes(searchQuery.toLowerCase()) || getDesc(s).toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">{t('services.title')}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t('services.subtitle')}</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={language === 'en' ? 'Search services...' : language === 'kz' ? 'Қызметтерді іздеу...' : 'Поиск услуг...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'secondary'}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {categoryLabels[cat] || cat}
                </Badge>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground">{t('common.loading')}</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">{language === 'en' ? 'No services found' : language === 'kz' ? 'Қызметтер табылмады' : 'Услуги не найдены'}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((service) => (
                <Card key={service.id} className="group border-border/50 bg-gradient-card transition-all duration-300 hover:shadow-card hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                      <Stethoscope className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">{getTitle(service)}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{getDesc(service)}</p>
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
