import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'ru' | 'kz' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ru: {
    // Navigation
    'nav.home': 'Главная',
    'nav.services': 'Услуги',
    'nav.doctors': 'Врачи',
    'nav.news': 'Новости',
    'nav.about': 'О нас',
    'nav.contacts': 'Контакты',
    'nav.appointment': 'Записаться',
    
    // Hero
    'hero.title': 'Ваше здоровье — наша забота',
    'hero.subtitle': 'Современная медицина с заботой о каждом пациенте. Опытные специалисты и передовые технологии для вашего здоровья.',
    'hero.cta': 'Записаться на приём',
    'hero.services': 'Наши услуги',
    
    // Stats
    'stats.years': 'Лет опыта',
    'stats.specialists': 'Специалистов',
    'stats.patients': 'Довольных пациентов',
    'stats.services': 'Медицинских услуг',
    
    // Services
    'services.title': 'Наши услуги',
    'services.subtitle': 'Комплексный подход к вашему здоровью',
    'services.viewAll': 'Все услуги',
    'services.learnMore': 'Подробнее',
    
    // Doctors
    'doctors.title': 'Наши врачи',
    'doctors.subtitle': 'Опытные специалисты заботятся о вашем здоровье',
    'doctors.viewAll': 'Все врачи',
    'doctors.experience': 'лет опыта',
    
    // News
    'news.title': 'Новости и статьи',
    'news.subtitle': 'Полезная информация о здоровье',
    'news.viewAll': 'Все новости',
    'news.readMore': 'Читать далее',
    
    // Contact
    'contact.title': 'Свяжитесь с нами',
    'contact.subtitle': 'Мы всегда рады помочь вам',
    'contact.address': 'Адрес',
    'contact.phone': 'Телефон',
    'contact.email': 'Электронная почта',
    'contact.hours': 'Часы работы',
    'contact.form.name': 'Ваше имя',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Телефон',
    'contact.form.message': 'Сообщение',
    'contact.form.submit': 'Отправить',
    
    // Footer
    'footer.rights': 'Все права защищены',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.notFound': 'Страница не найдена',
  },
  kz: {
    // Navigation
    'nav.home': 'Басты бет',
    'nav.services': 'Қызметтер',
    'nav.doctors': 'Дәрігерлер',
    'nav.news': 'Жаңалықтар',
    'nav.about': 'Біз туралы',
    'nav.contacts': 'Байланыс',
    'nav.appointment': 'Жазылу',
    
    // Hero
    'hero.title': 'Сіздің денсаулығыңыз — біздің қамқорлығымыз',
    'hero.subtitle': 'Әр науқасқа қамқорлық көрсететін заманауи медицина. Тәжірибелі мамандар мен озық технологиялар.',
    'hero.cta': 'Қабылдауға жазылу',
    'hero.services': 'Біздің қызметтер',
    
    // Stats
    'stats.years': 'Жыл тәжірибе',
    'stats.specialists': 'Маман',
    'stats.patients': 'Қанағаттанған науқас',
    'stats.services': 'Медициналық қызмет',
    
    // Services
    'services.title': 'Біздің қызметтер',
    'services.subtitle': 'Денсаулығыңызға кешенді көзқарас',
    'services.viewAll': 'Барлық қызметтер',
    'services.learnMore': 'Толығырақ',
    
    // Doctors
    'doctors.title': 'Біздің дәрігерлер',
    'doctors.subtitle': 'Тәжірибелі мамандар сіздің денсаулығыңызға қамқорлық жасайды',
    'doctors.viewAll': 'Барлық дәрігерлер',
    'doctors.experience': 'жыл тәжірибе',
    
    // News
    'news.title': 'Жаңалықтар мен мақалалар',
    'news.subtitle': 'Денсаулық туралы пайдалы ақпарат',
    'news.viewAll': 'Барлық жаңалықтар',
    'news.readMore': 'Толығырақ оқу',
    
    // Contact
    'contact.title': 'Бізбен байланысыңыз',
    'contact.subtitle': 'Біз сізге көмектесуге әрқашан дайынбыз',
    'contact.address': 'Мекенжай',
    'contact.phone': 'Телефон',
    'contact.email': 'Электрондық пошта',
    'contact.hours': 'Жұмыс уақыты',
    'contact.form.name': 'Сіздің атыңыз',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Телефон',
    'contact.form.message': 'Хабарлама',
    'contact.form.submit': 'Жіберу',
    
    // Footer
    'footer.rights': 'Барлық құқықтар қорғалған',
    'footer.privacy': 'Құпиялылық саясаты',
    'footer.terms': 'Пайдалану шарттары',
    
    // Common
    'common.loading': 'Жүктелуде...',
    'common.error': 'Қате орын алды',
    'common.notFound': 'Бет табылмады',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.doctors': 'Doctors',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.contacts': 'Contacts',
    'nav.appointment': 'Book Now',
    
    // Hero
    'hero.title': 'Your Health is Our Priority',
    'hero.subtitle': 'Modern medicine with care for every patient. Experienced specialists and advanced technologies for your health.',
    'hero.cta': 'Book Appointment',
    'hero.services': 'Our Services',
    
    // Stats
    'stats.years': 'Years of Experience',
    'stats.specialists': 'Specialists',
    'stats.patients': 'Happy Patients',
    'stats.services': 'Medical Services',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive approach to your health',
    'services.viewAll': 'View All Services',
    'services.learnMore': 'Learn More',
    
    // Doctors
    'doctors.title': 'Our Doctors',
    'doctors.subtitle': 'Experienced specialists caring for your health',
    'doctors.viewAll': 'View All Doctors',
    'doctors.experience': 'years experience',
    
    // News
    'news.title': 'News & Articles',
    'news.subtitle': 'Useful health information',
    'news.viewAll': 'View All News',
    'news.readMore': 'Read More',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': "We're always happy to help",
    'contact.address': 'Address',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.hours': 'Working Hours',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Phone',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Submit',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.notFound': 'Page not found',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'ru';
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
