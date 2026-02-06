import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Brain, Stethoscope, Baby, Bone, Eye, Microscope, Pill, Activity, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const categories = [
  { id: 'all', labelRu: 'Все', labelKz: 'Барлығы', labelEn: 'All' },
  { id: 'therapy', labelRu: 'Терапия', labelKz: 'Терапия', labelEn: 'Therapy' },
  { id: 'cardiology', labelRu: 'Кардиология', labelKz: 'Кардиология', labelEn: 'Cardiology' },
  { id: 'neurology', labelRu: 'Неврология', labelKz: 'Неврология', labelEn: 'Neurology' },
  { id: 'pediatrics', labelRu: 'Педиатрия', labelKz: 'Педиатрия', labelEn: 'Pediatrics' },
  { id: 'diagnostics', labelRu: 'Диагностика', labelKz: 'Диагностика', labelEn: 'Diagnostics' },
];

const services = [
  { icon: Stethoscope, titleRu: 'Консультация терапевта', titleKz: 'Терапевт кеңесі', titleEn: 'Therapist Consultation', descRu: 'Комплексное обследование и лечение', descKz: 'Кешенді тексеру және емдеу', descEn: 'Comprehensive examination and treatment', price: '5 000 ₸', category: 'therapy' },
  { icon: Heart, titleRu: 'ЭКГ', titleKz: 'ЭКГ', titleEn: 'ECG', descRu: 'Электрокардиография сердца', descKz: 'Жүрек электрокардиографиясы', descEn: 'Electrocardiography', price: '3 000 ₸', category: 'cardiology' },
  { icon: Heart, titleRu: 'УЗИ сердца', titleKz: 'Жүрек УДЗ', titleEn: 'Heart Ultrasound', descRu: 'Эхокардиография', descKz: 'Эхокардиография', descEn: 'Echocardiography', price: '8 000 ₸', category: 'cardiology' },
  { icon: Brain, titleRu: 'Консультация невролога', titleKz: 'Невролог кеңесі', titleEn: 'Neurologist Consultation', descRu: 'Диагностика нервной системы', descKz: 'Жүйке жүйесін диагностикалау', descEn: 'Nervous system diagnostics', price: '7 000 ₸', category: 'neurology' },
  { icon: Baby, titleRu: 'Осмотр педиатра', titleKz: 'Педиатр тексеруі', titleEn: 'Pediatric Examination', descRu: 'Профилактический осмотр детей', descKz: 'Балаларды профилактикалық тексеру', descEn: 'Preventive examination of children', price: '4 000 ₸', category: 'pediatrics' },
  { icon: Microscope, titleRu: 'Анализ крови', titleKz: 'Қан талдауы', titleEn: 'Blood Test', descRu: 'Общий и биохимический анализ', descKz: 'Жалпы және биохимиялық талдау', descEn: 'General and biochemical analysis', price: '2 500 ₸', category: 'diagnostics' },
  { icon: Eye, titleRu: 'Консультация офтальмолога', titleKz: 'Офтальмолог кеңесі', titleEn: 'Ophthalmologist Consultation', descRu: 'Проверка зрения', descKz: 'Көруді тексеру', descEn: 'Vision check', price: '5 500 ₸', category: 'therapy' },
  { icon: Bone, titleRu: 'Рентген', titleKz: 'Рентген', titleEn: 'X-Ray', descRu: 'Рентгенография', descKz: 'Рентгенография', descEn: 'Radiography', price: '4 000 ₸', category: 'diagnostics' },
  { icon: Activity, titleRu: 'Холтер мониторинг', titleKz: 'Холтер мониторингі', titleEn: 'Holter Monitoring', descRu: 'Суточный мониторинг ЭКГ', descKz: 'Тәуліктік ЭКГ мониторингі', descEn: '24-hour ECG monitoring', price: '12 000 ₸', category: 'cardiology' },
  { icon: Pill, titleRu: 'Вакцинация', titleKz: 'Вакцинация', titleEn: 'Vaccination', descRu: 'Прививки для детей и взрослых', descKz: 'Балалар мен ересектерге егу', descEn: 'Vaccinations for children and adults', price: '3 500 ₸', category: 'pediatrics' },
];

const Services = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getLabel = (cat: typeof categories[0]) => {
    switch (language) {
      case 'kz': return cat.labelKz;
      case 'en': return cat.labelEn;
      default: return cat.labelRu;
    }
  };

  const getTitle = (service: typeof services[0]) => {
    switch (language) {
      case 'kz': return service.titleKz;
      case 'en': return service.titleEn;
      default: return service.titleRu;
    }
  };

  const getDesc = (service: typeof services[0]) => {
    switch (language) {
      case 'kz': return service.descKz;
      case 'en': return service.descEn;
      default: return service.descRu;
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = getTitle(service).toLowerCase().includes(searchQuery.toLowerCase()) ||
                          getDesc(service).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {t('services.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'en' ? 'Search services...' : language === 'kz' ? 'Қызметтерді іздеу...' : 'Поиск услуг...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? 'default' : 'secondary'}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {getLabel(cat)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service, index) => (
              <Card key={index} className="group border-border/50 bg-gradient-card transition-all duration-300 hover:shadow-card hover:border-primary/30">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {getTitle(service)}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {getDesc(service)}
                  </p>
                  <span className="text-lg font-semibold text-primary">{service.price}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
