import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const specializations = [
  { id: 'all', labelRu: 'Все', labelKz: 'Барлығы', labelEn: 'All' },
  { id: 'cardiology', labelRu: 'Кардиология', labelKz: 'Кардиология', labelEn: 'Cardiology' },
  { id: 'neurology', labelRu: 'Неврология', labelKz: 'Неврология', labelEn: 'Neurology' },
  { id: 'therapy', labelRu: 'Терапия', labelKz: 'Терапия', labelEn: 'Therapy' },
  { id: 'pediatrics', labelRu: 'Педиатрия', labelKz: 'Педиатрия', labelEn: 'Pediatrics' },
];

const doctors = [
  { nameRu: 'Асанова Айгуль Маратовна', nameKz: 'Асанова Айгүл Маратқызы', nameEn: 'Aigul Asanova', specRu: 'Кардиолог', specKz: 'Кардиолог', specEn: 'Cardiologist', specId: 'cardiology', experience: 15, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80', bioRu: 'Врач высшей категории, кандидат медицинских наук', bioKz: 'Жоғары санатты дәрігер, медицина ғылымдарының кандидаты', bioEn: 'Highest category doctor, Candidate of Medical Sciences' },
  { nameRu: 'Жумабаев Ержан Каирович', nameKz: 'Жұмабаев Ержан Қайырұлы', nameEn: 'Yerzhan Zhumabayev', specRu: 'Невролог', specKz: 'Невролог', specEn: 'Neurologist', specId: 'neurology', experience: 12, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=80', bioRu: 'Специалист по заболеваниям нервной системы', bioKz: 'Жүйке жүйесі аурулары бойынша маман', bioEn: 'Specialist in nervous system diseases' },
  { nameRu: 'Касымова Динара Сериковна', nameKz: 'Қасымова Динара Серікқызы', nameEn: 'Dinara Kassymova', specRu: 'Педиатр', specKz: 'Педиатр', specEn: 'Pediatrician', specId: 'pediatrics', experience: 10, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&auto=format&fit=crop&q=80', bioRu: 'Врач первой категории, опыт работы с детьми всех возрастов', bioKz: 'Бірінші санатты дәрігер, барлық жастағы балалармен жұмыс тәжірибесі', bioEn: 'First category doctor, experience with children of all ages' },
  { nameRu: 'Сатпаев Марат Болатович', nameKz: 'Сәтпаев Марат Болатұлы', nameEn: 'Marat Satpayev', specRu: 'Терапевт', specKz: 'Терапевт', specEn: 'Therapist', specId: 'therapy', experience: 18, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80', bioRu: 'Заслуженный врач, доктор медицинских наук', bioKz: 'Еңбек сіңірген дәрігер, медицина ғылымдарының докторы', bioEn: 'Honored doctor, Doctor of Medical Sciences' },
  { nameRu: 'Ибраева Гульнара Темировна', nameKz: 'Ибраева Гүлнар Темірқызы', nameEn: 'Gulnara Ibrayeva', specRu: 'Кардиолог', specKz: 'Кардиолог', specEn: 'Cardiologist', specId: 'cardiology', experience: 8, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80', bioRu: 'Специалист по эхокардиографии', bioKz: 'Эхокардиография маманы', bioEn: 'Echocardiography specialist' },
  { nameRu: 'Нурланов Асет Жанибекович', nameKz: 'Нұрланов Асет Жәнібекұлы', nameEn: 'Aset Nurlanov', specRu: 'Терапевт', specKz: 'Терапевт', specEn: 'Therapist', specId: 'therapy', experience: 14, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80', bioRu: 'Врач общей практики, диетолог', bioKz: 'Жалпы тәжірибелі дәрігер, диетолог', bioEn: 'General practitioner, dietitian' },
];

const Doctors = () => {
  const { t, language } = useLanguage();
  const [selectedSpec, setSelectedSpec] = useState('all');

  const getLabel = (spec: typeof specializations[0]) => {
    switch (language) {
      case 'kz': return spec.labelKz;
      case 'en': return spec.labelEn;
      default: return spec.labelRu;
    }
  };

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

  const getBio = (doctor: typeof doctors[0]) => {
    switch (language) {
      case 'kz': return doctor.bioKz;
      case 'en': return doctor.bioEn;
      default: return doctor.bioRu;
    }
  };

  const filteredDoctors = doctors.filter((doctor) => 
    selectedSpec === 'all' || doctor.specId === selectedSpec
  );

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold text-foreground md:text-5xl">
              {t('doctors.title')}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('doctors.subtitle')}
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {specializations.map((spec) => (
              <Badge
                key={spec.id}
                variant={selectedSpec === spec.id ? 'default' : 'secondary'}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedSpec(spec.id)}
              >
                {getLabel(spec)}
              </Badge>
            ))}
          </div>

          {/* Doctors Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDoctors.map((doctor, index) => (
              <Card key={index} className="group overflow-hidden border-border/50 bg-card transition-all duration-300 hover:shadow-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={getName(doctor)}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                    <Badge className="mb-2 bg-primary/90">{getSpec(doctor)}</Badge>
                    <h3 className="font-display text-xl font-semibold">
                      {getName(doctor)}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-3">{getBio(doctor)}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {doctor.experience} {t('doctors.experience')}
                    </span>
                    <span className="font-medium text-primary">{t('services.learnMore')}</span>
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

export default Doctors;
