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
    'nav.doctors': 'Специалисты',
    'nav.news': 'Новости',
    'nav.about': 'О нас',
    'nav.contacts': 'Контакты',
    'nav.legalActs': 'Нормативно-правовые акты',
    'nav.appointment': 'Записаться',
    'org.name': 'Центр спортивной медицины Актюбинской области',
    'org.short': 'Центр спортивной медицины',
    'org.region': 'Актюбинской области',
    
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
    'doctors.title': 'Наши специалисты',
    'doctors.subtitle': 'Опытные специалисты заботятся о вашем здоровье',
    'doctors.viewAll': 'Все специалисты',
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
    'contact.toast.title': 'Сообщение отправлено',
    'contact.toast.desc': 'Мы свяжемся с вами в ближайшее время.',
    'contact.address.value': 'г. Актобе, ул. Спортивная 1',
    'contact.hours.value': 'Пн-Пт: 08:00-17:00',
    'hero.emergency': 'Экстренная помощь',
    'hero.specialists': 'Специалистов',
    'hero.years': 'лет',
    'hero.market': 'На рынке',

    // Footer
    'footer.rights': 'Все права защищены',
    'footer.privacy': 'Политика конфиденциальности',
    'footer.terms': 'Условия использования',

    // Privacy
    'privacy.title': 'Политика конфиденциальности',
    'privacy.lastUpdated': 'Последнее обновление: 14 сентября 2026 г.',
    'privacy.section1.title': '1. Общие положения',
    'privacy.section1.text': 'Настоящая Политика конфиденциальности регулирует порядок обработки персональных данных пользователей сайта Центра спортивной медицины Актюбинской области.',
    'privacy.section2.title': '2. Какие данные мы собираем',
    'privacy.section2.text': 'Мы можем собирать имя, контактный телефон, адрес электронной почты и другие данные, необходимые для записи на приём и оказания медицинских услуг.',
    'privacy.section3.title': '3. Как мы используем данные',
    'privacy.section3.text': 'Персональные данные используются исключительно для предоставления медицинских услуг, записи на приём, обратной связи и улучшения качества обслуживания.',
    'privacy.section4.title': '4. Защита данных',
    'privacy.section4.text': 'Мы принимаем разумные меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.',
    'privacy.section5.title': '5. Файлы cookie',
    'privacy.section5.text': 'Сайт может использовать файлы cookie для улучшения работы и анализа посещаемости. Продолжая использовать сайт, вы соглашаетесь с использованием cookie.',
    'privacy.section6.title': '6. Контактная информация',
    'privacy.section6.text': 'По вопросам обработки персональных данных обращайтесь по адресу: г. Актобе, ул. Спортивная 1, или по электронной почте csm.aktobe@yandex.kz.',

    // Terms
    'terms.title': 'Условия использования',
    'terms.lastUpdated': 'Последнее обновление: 14 сентября 2026 г.',
    'terms.section1.title': '1. Общие положения',
    'terms.section1.text': 'Используя сайт Центра спортивной медицины Актюбинской области, вы соглашаетесь с настоящими Условиями использования.',
    'terms.section2.title': '2. Медицинские услуги',
    'terms.section2.text': 'Информация на сайте носит справочный характер и не заменяет очную консультацию врача. Медицинские услуги оказываются только после осмотра специалиста.',
    'terms.section3.title': '3. Обязательства пользователя',
    'terms.section3.text': 'Пользователь обязуется предоставлять достоверные данные при записи на приём и не использовать сайт в противоправных целях.',
    'terms.section4.title': '4. Ограничение ответственности',
    'terms.section4.text': 'Центр не несёт ответственности за возможные убытки, возникшие в результате использования информации, размещённой на сайте, без консультации специалиста.',
    'terms.section5.title': '5. Изменения условий',
    'terms.section5.text': 'Администрация сайта оставляет за собой право вносить изменения в настоящие Условия использования в любое время без предварительного уведомления.',
    'terms.section6.title': '6. Контактная информация',
    'terms.section6.text': 'По всем вопросам обращайтесь по адресу: г. Актобе, ул. Спортивная 1, или по электронной почте csm.aktobe@yandex.kz.',
    
    // Common
    'common.loading': 'Загрузка...',
    'common.error': 'Произошла ошибка',
    'common.notFound': 'Страница не найдена',
  },
  kz: {
    // Navigation
    'nav.home': 'Басты бет',
    'nav.services': 'Қызметтер',
    'nav.doctors': 'Мамандар',
    'nav.news': 'Жаңалықтар',
    'nav.about': 'Біз туралы',
    'nav.contacts': 'Байланыс',
    'nav.legalActs': 'Нормативтік-құқықтық актілер',
    'nav.appointment': 'Жазылу',
    'org.name': 'Ақтөбе облысының спорттық медицина орталығы',
    'org.short': 'Спорттық медицина орталығы',
    'org.region': 'Ақтөбе облысының',
    
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
    'doctors.title': 'Біздің мамандарымыз',
    'doctors.subtitle': 'Тәжірибелі мамандар сіздің денсаулығыңызға қамқорлық жасайды',
    'doctors.viewAll': 'Барлық мамандар',
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
    'contact.toast.title': 'Хабарлама жіберілді',
    'contact.toast.desc': 'Біз сізбен жақын арада байланысамыз.',
    'contact.address.value': 'Ақтөбе қ., Спорттық к-сі 1',
    'contact.hours.value': 'Дс-Жм: 08:00-17:00',
    'hero.emergency': 'Жедел көмек',
    'hero.specialists': 'Маман',
    'hero.years': 'жыл',
    'hero.market': 'Нарықта',

    // Footer
    'footer.rights': 'Барлық құқықтар қорғалған',
    'footer.privacy': 'Құпиялылық саясаты',
    'footer.terms': 'Пайдалану шарттары',

    // Privacy
    'privacy.title': 'Құпиялылық саясаты',
    'privacy.lastUpdated': 'Соңғы жаңарту: 2026 жылғы 14 қыркүйек',
    'privacy.section1.title': '1. Жалпы ережелер',
    'privacy.section1.text': 'Қазіргі Құпиялылық саясаты Ақтөбе облысының спорттық медицина орталығының сайты пайдаланушыларының жеке деректерін өңдеу тәртібін реттейді.',
    'privacy.section2.title': '2. Қандай деректерді жинаймыз',
    'privacy.section2.text': 'Біз қабылдауға жазылу және медициналық қызметтер көрсету үшін қажетті аты-жөн, байланыс телефоны, электрондық пошта мекенжайы және басқа деректерді жинай аламыз.',
    'privacy.section3.title': '3. Деректерді қалай пайдаланамыз',
    'privacy.section3.text': 'Жеке деректер медициналық қызметтер көрсету, қабылдауға жазу, кері байланыс және қызмет сапасын жақсарту мақсатында ғана пайдаланылады.',
    'privacy.section4.title': '4. Деректерді қорғау',
    'privacy.section4.text': 'Біз жеке деректерге рұқсатсыз қол жеткізуден, өзгертуден, ашудан немесе жоюдан қорғау үшін разумды шаралар қолданамыз.',
    'privacy.section5.title': '5. Cookie файлдары',
    'privacy.section5.text': 'Сайт жұмысын жақсарту және келушілерді талдау үшін cookie файлдарын пайдалануы мүмкін. Сайтты пайдалана отырып, cookie пайдалануға келісесіз.',
    'privacy.section6.title': '6. Байланыс ақпараты',
    'privacy.section6.text': 'Жеке деректерді өңдеу мәселелері бойынша Ақтөбе қ., Спорттық к-сі 1 мекенжайы бойынша немесе csm.aktobe@yandex.kz электрондық поштасына хабарласыңыз.',

    // Terms
    'terms.title': 'Пайдалану шарттары',
    'terms.lastUpdated': 'Соңғы жаңарту: 2026 жылғы 14 қыркүйек',
    'terms.section1.title': '1. Жалпы ережелер',
    'terms.section1.text': 'Ақтөбе облысының спорттық медицина орталығының сайтын пайдалана отырып, сіз осы Пайдалану шарттарымен келісесіз.',
    'terms.section2.title': '2. Медициналық қызметтер',
    'terms.section2.text': 'Сайттағы ақпарат анықтамалық сипатта болады және дәрігердің жеке консультациясын алмастыра алмайды. Медициналық қызметтер маман тексергеннен кейін ғана көрсетіледі.',
    'terms.section3.title': '3. Пайдаланушының міндеттемелері',
    'terms.section3.text': 'Пайдаланушы қабылдауға жазылу кезінде шынайы деректерді ұсынуға және сайтты заңсыз мақсаттарда пайдаланбауға міндетті.',
    'terms.section4.title': '4. Жауапкершілікті шектеу',
    'terms.section4.text': 'Орталық маманмен кеңеспестен сайтта орналастырылған ақпаратты пайдалану нәтижесінде туындайтын мүмкін зиянға жауап бермейді.',
    'terms.section5.title': '5. Шарттарды өзгерту',
    'terms.section5.text': 'Сайт әкімшілігі осы Пайдалану шарттарына алдын ала ескертусіз кез келген уақытта өзгерістер енгізу құқығын өзінде қалдырады.',
    'terms.section6.title': '6. Байланыс ақпараты',
    'terms.section6.text': 'Барлық сұрақтар бойынша Ақтөбе қ., Спорттық к-сі 1 мекенжайы бойынша немесе csm.aktobe@yandex.kz электрондық поштасына хабарласыңыз.',
    
    // Common
    'common.loading': 'Жүктелуде...',
    'common.error': 'Қате орын алды',
    'common.notFound': 'Бет табылмады',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.doctors': 'Specialists',
    'nav.news': 'News',
    'nav.about': 'About',
    'nav.contacts': 'Contacts',
    'nav.legalActs': 'Legal Acts',
    'nav.appointment': 'Book Now',
    'org.name': 'Aktobe Region Sports Medicine Center',
    'org.short': 'Sports Medicine Center',
    'org.region': 'Aktobe Region',
    
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
    'doctors.title': 'Our Specialists',
    'doctors.subtitle': 'Experienced specialists caring for your health',
    'doctors.viewAll': 'View All Specialists',
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
    'contact.toast.title': 'Message sent',
    'contact.toast.desc': 'We will contact you shortly.',
    'contact.address.value': 'Aktobe, Sportivnaya St. 1',
    'contact.hours.value': 'Mon-Fri: 08:00-17:00',
    'hero.emergency': 'Emergency care',
    'hero.specialists': 'Specialists',
    'hero.years': 'years',
    'hero.market': 'On the market',

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
