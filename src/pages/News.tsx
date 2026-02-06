import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const news = [
  { titleRu: 'Открытие нового отделения диагностики', titleKz: 'Жаңа диагностика бөлімшесінің ашылуы', titleEn: 'Opening of New Diagnostics Department', excerptRu: 'Мы рады сообщить об открытии современного отделения диагностики с новейшим оборудованием. Теперь наши пациенты могут пройти полное обследование в одном месте.', excerptKz: 'Жаңа заманауи жабдықтармен жабдықталған диагностика бөлімшесінің ашылғанын хабарлаймыз. Енді біздің науқастар бір жерде толық тексеруден өте алады.', excerptEn: 'We are pleased to announce the opening of a modern diagnostics department with state-of-the-art equipment. Now our patients can undergo a complete examination in one place.', date: '2024-01-15', category: 'Новости', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600&auto=format&fit=crop&q=80', featured: true },
  { titleRu: 'Профилактика сердечно-сосудистых заболеваний', titleKz: 'Жүрек-қан тамырлары ауруларының алдын алу', titleEn: 'Cardiovascular Disease Prevention', excerptRu: 'Советы от наших кардиологов по профилактике заболеваний сердца и сосудов.', excerptKz: 'Жүрек және қан тамырлары ауруларының алдын алу бойынша кардиологтарымыздың кеңестері.', excerptEn: 'Tips from our cardiologists on preventing heart and vascular diseases.', date: '2024-01-10', category: 'Статьи', image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&auto=format&fit=crop&q=80', featured: false },
  { titleRu: 'Вакцинация от гриппа: всё, что нужно знать', titleKz: 'Тұмауға қарсы вакцинация: білу керек нәрселер', titleEn: 'Flu Vaccination: Everything You Need to Know', excerptRu: 'Подробная информация о сезонной вакцинации от гриппа для детей и взрослых.', excerptKz: 'Балалар мен ересектерге арналған маусымдық тұмауға қарсы вакцинация туралы толық ақпарат.', excerptEn: 'Detailed information about seasonal flu vaccination for children and adults.', date: '2024-01-05', category: 'Здоровье', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&auto=format&fit=crop&q=80', featured: false },
  { titleRu: 'Как подготовиться к анализам крови', titleKz: 'Қан талдауына қалай дайындалу керек', titleEn: 'How to Prepare for Blood Tests', excerptRu: 'Рекомендации по подготовке к сдаче анализов для получения точных результатов.', excerptKz: 'Нақты нәтиже алу үшін талдау тапсыруға дайындалу бойынша ұсыныстар.', excerptEn: 'Recommendations for preparing for tests to get accurate results.', date: '2024-01-02', category: 'Советы', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&auto=format&fit=crop&q=80', featured: false },
  { titleRu: 'Новые технологии в кардиологии', titleKz: 'Кардиологиядағы жаңа технологиялар', titleEn: 'New Technologies in Cardiology', excerptRu: 'Обзор современных методов диагностики и лечения сердечных заболеваний.', excerptKz: 'Жүрек ауруларын диагностикалау және емдеудің заманауи әдістеріне шолу.', excerptEn: 'Overview of modern methods of diagnosis and treatment of heart diseases.', date: '2023-12-28', category: 'Технологии', image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600&auto=format&fit=crop&q=80', featured: false },
];

const News = () => {
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

  const featuredPost = news.find((n) => n.featured);
  const regularPosts = news.filter((n) => !n.featured);

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {t('news.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('news.subtitle')}
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Card className="mb-12 overflow-hidden border-border/50 bg-card">
              <div className="grid md:grid-cols-2">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={getTitle(featuredPost)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col justify-center p-8">
                  <Badge className="mb-4 w-fit">{featuredPost.category}</Badge>
                  <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4 md:text-3xl">
                    {getTitle(featuredPost)}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {getExcerpt(featuredPost)}
                  </p>
                  <Link
                    to={`/news/${featuredPost.date}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    {t('news.readMore')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </div>
            </Card>
          )}

          {/* Regular Posts Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((item, index) => (
              <Card key={index} className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card">
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={getTitle(item)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge className="absolute left-4 top-4 bg-primary/90">
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
                    to={`/news/${item.date}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    {t('news.readMore')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default News;
