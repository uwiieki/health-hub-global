export interface Leader {
  id: string;
  role: { ru: string; kz: string; en: string };
  name: { ru: string; kz: string; en: string };
  desc: { ru: string; kz: string; en: string };
  education: { ru: string; kz: string; en: string };
  qualification: { ru: string; kz: string; en: string };
  experience: { ru: string; kz: string; en: string };
  experienceYears: number;
  photoUrl?: string | null;
}

export const leaders: Leader[] = [
  {
    id: 'nurmatov',
    role: { ru: 'Директор', kz: 'Директор', en: 'Director' },
    name: {
      ru: 'Нурматов Азамат Басимбекович',
      kz: 'Нұрматов Азамат Басімбекұлы',
      en: 'Azamat B. Nurmatov',
    },
    desc: {
      ru: 'Руководитель центра спортивной медицины Актюбинской области.',
      kz: 'Ақтөбе облысының спорттық медицина орталығының басшысы.',
      en: 'Head of the Aktobe Region Sports Medicine Center.',
    },
    education: {
      ru: 'Западно-Казахстанский государственный медицинский университет им. М. Оспанова, специальность «Лечебное дело».',
      kz: 'М. Оспанов атындағы Батыс Қазақстан мемлекеттік медицина университеті, «Емдеу ісі» мамандығы.',
      en: 'West Kazakhstan Marat Ospanov Medical University, General Medicine.',
    },
    qualification: {
      ru: 'Высшая категория. Специалист в области спортивной медицины и реабилитации.',
      kz: 'Жоғары санат. Спорттық медицина және оңалту саласының маманы.',
      en: 'Highest category. Specialist in sports medicine and rehabilitation.',
    },
    experience: {
      ru: 'Более 15 лет работы в системе здравоохранения и спортивной медицины Казахстана.',
      kz: 'Қазақстанның денсаулық сақтау және спорттық медицина саласында 15 жылдан астам жұмыс өтілі.',
      en: 'Over 15 years of experience in healthcare and sports medicine in Kazakhstan.',
    },
    experienceYears: 15,
  },
  {
    id: 'aidarbek',
    role: { ru: 'Заместитель директора', kz: 'Директордың орынбасары', en: 'Deputy Director' },
    name: {
      ru: 'Айдарбек Нурбек Жуманулы',
      kz: 'Айдарбек Нұрбек Жұманұлы',
      en: 'Nurbek Zh. Aidarbek',
    },
    desc: {
      ru: 'Заместитель директора центра по медицинской части.',
      kz: 'Орталық директорының медициналық бөлім жөніндегі орынбасары.',
      en: 'Deputy Director of the Center for medical affairs.',
    },
    education: {
      ru: 'Западно-Казахстанский государственный медицинский университет им. М. Оспанова.',
      kz: 'М. Оспанов атындағы Батыс Қазақстан мемлекеттік медицина университеті.',
      en: 'West Kazakhstan Marat Ospanov Medical University.',
    },
    qualification: {
      ru: 'Врач спортивной медицины, организатор здравоохранения.',
      kz: 'Спорттық медицина дәрігері, денсаулық сақтау ұйымдастырушысы.',
      en: 'Sports medicine physician, healthcare administrator.',
    },
    experience: {
      ru: 'Более 10 лет работы в спортивной медицине и управлении медицинскими учреждениями.',
      kz: 'Спорттық медицина және медициналық мекемелерді басқару саласында 10 жылдан астам тәжірибе.',
      en: 'Over 10 years of experience in sports medicine and healthcare management.',
    },
    experienceYears: 10,
  },
  {
    id: 'deputy-2',
    role: { ru: 'Заместитель директора', kz: 'Директордың орынбасары', en: 'Deputy Director' },
    name: {
      ru: 'Айдарбек Нурбек Жуманулы',
      kz: 'Айдарбек Нұрбек Жұманұлы',
      en: 'Nurbek Zh. Aidarbek',
    },
    desc: {
      ru: 'Заместитель директора центра по общим вопросам.',
      kz: 'Орталық директорының жалпы мәселелер жөніндегі орынбасары.',
      en: 'Deputy Director of the Center for general affairs.',
    },
    education: {
      ru: 'Высшее медицинское образование.',
      kz: 'Жоғары медициналық білім.',
      en: 'Higher medical education.',
    },
    qualification: {
      ru: 'Организатор здравоохранения.',
      kz: 'Денсаулық сақтау ұйымдастырушысы.',
      en: 'Healthcare administrator.',
    },
    experience: {
      ru: 'Многолетний опыт работы в управлении медицинскими учреждениями.',
      kz: 'Медициналық мекемелерді басқарудағы көп жылдық тәжірибе.',
      en: 'Many years of experience in healthcare management.',
    },
    experienceYears: 10,
  },
];

export const getLeader = (id: string) => leaders.find((l) => l.id === id);