import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

const news = [
  {
    titleRu: 'Открытие нового отделения диагностики',
    titleKz: 'Жаңа диагностика бөлімшесінің ашылуы',
    titleEn: 'Opening of New Diagnostics Department',
    excerptRu: 'Мы рады сообщить об открытии современного отделения диагностики с новейшим оборудованием.',
    excerptKz: 'Жаңа заманауи жабдықтармен жабдықталған диагностика бөлімшесінің ашылғанын хабарлаймыз.',
    excerptEn: 'We are pleased to announce the opening of a modern diagnostics department with state-of-the-art equipment.',
    date: '2024-01-15',
    category: 'Новости',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80',
  },
  {
    titleRu: 'Профилактика сердечно-сосудистых заболеваний',
    titleKz: 'Жүрек-қан тамырлары ауруларының алдын алу',
    titleEn: 'Cardiovascular Disease Prevention',
    excerptRu: 'Советы от наших кардиологов по профилактике заболеваний сердца и сосудов.',
    excerptKz: 'Жүрек және қан тамырлары ауруларының алдын алу бойынша кардиологтарымыздың кеңестері.',
    excerptEn: 'Tips from our cardiologists on preventing heart and vascular diseases.',
    date: '2024-01-10',
    category: 'Статьи',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80',
  },
  {
    titleRu: 'Вакцинация от гриппа: всё, что нужно знать',
    titleKz: 'Тұмауға қарсы вакцинация: білу керек нәрселер',
    titleEn: 'Flu Vaccination: Everything You Need to Know',
    excerptRu: 'Подробная информация о сезонной вакцинации от гриппа для детей и взрослых.',
    excerptKz: 'Балалар мен ересектерге арналған маусымдық тұмауға қарсы вакцинация туралы толық ақпарат.',
    excerptEn: 'Detailed information about seasonal flu vaccination for children and adults.',
    date: '2024-01-05',
    category: 'Здоровье',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80',
  },
];

export const NewsSection = () => {
  const { t, language } = useLanguage();

  const getTitle = (item: typeof news[0]) => {
    switch (language) {
      case 'kz': return item.titleKz;
      case 'en': return item.titleEn;
      default: return item.titleRu;
    }
  };

  const getExcerpt = (item: typeof news[0]) => {
    switch (language) {
      case 'kz': return item.excerptKz;
      case 'en': return item.excerptEn;
      default: return item.excerptRu;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'kz' ? 'kk-KZ' : 'ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {t('news.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('news.subtitle')}
          </p>
        </div>

        {/* News Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={getTitle(item)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4 bg-primary/90 hover:bg-primary">
                  {item.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(item.date)}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {getTitle(item)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                  {getExcerpt(item)}
                </p>
                <Link
                  to="/news"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {t('news.readMore')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
            <Link to="/news">
              {t('news.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
