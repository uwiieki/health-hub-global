import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const doctors = [
  {
    nameRu: 'Асанова Айгуль',
    nameKz: 'Асанова Айгүл',
    nameEn: 'Aigul Asanova',
    specRu: 'Кардиолог',
    specKz: 'Кардиолог',
    specEn: 'Cardiologist',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
  },
  {
    nameRu: 'Жумабаев Ержан',
    nameKz: 'Жұмабаев Ержан',
    nameEn: 'Yerzhan Zhumabayev',
    specRu: 'Невролог',
    specKz: 'Невролог',
    specEn: 'Neurologist',
    experience: 12,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80',
  },
  {
    nameRu: 'Касымова Динара',
    nameKz: 'Қасымова Динара',
    nameEn: 'Dinara Kassymova',
    specRu: 'Педиатр',
    specKz: 'Педиатр',
    specEn: 'Pediatrician',
    experience: 10,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=80',
  },
  {
    nameRu: 'Сатпаев Марат',
    nameKz: 'Сәтпаев Марат',
    nameEn: 'Marat Satpayev',
    specRu: 'Терапевт',
    specKz: 'Терапевт',
    specEn: 'Therapist',
    experience: 18,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
  },
];

export const DoctorsSection = () => {
  const { t, language } = useLanguage();

  const getName = (doctor: typeof doctors[0]) => {
    switch (language) {
      case 'kz': return doctor.nameKz;
      case 'en': return doctor.nameEn;
      default: return doctor.nameRu;
    }
  };

  const getSpec = (doctor: typeof doctors[0]) => {
    switch (language) {
      case 'kz': return doctor.specKz;
      case 'en': return doctor.specEn;
      default: return doctor.specRu;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            {t('doctors.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={doctor.image}
                  alt={getName(doctor)}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground">
                  <h3 className="font-display text-lg font-semibold">
                    {getName(doctor)}
                  </h3>
                  <p className="text-sm opacity-90">{getSpec(doctor)}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {doctor.experience} {t('doctors.experience')}
                  </span>
                  <Link
                    to="/doctors"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {t('services.learnMore')}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg" className="gap-2 border-primary/30 hover:bg-primary/5">
            <Link to="/doctors">
              {t('doctors.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
