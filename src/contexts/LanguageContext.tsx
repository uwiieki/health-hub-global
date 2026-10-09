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
    'nav.blog': 'Блог руководителя',
    'blog.title': 'Блог руководителя',
    'blog.subtitle': 'Обращения и мысли руководителя о развитии спортивной медицины в регионе.',
    'blog.empty': 'Публикаций пока нет.',
    'blog.readMore': 'Читать',
    'blog.home': 'Главная',
    'blog.all': 'Все публикации',
    'blog.prev': 'Предыдущая запись',
    'blog.next': 'Следующая запись',
    'blog.notFound': 'Публикация не найдена',
    'blog.loadError': 'Не удалось загрузить публикации. Попробуйте позже.',
    'blog.signature': 'С уважением,',
    'blog.directorOf': 'Центра спортивной медицины Актюбинской области',
    'dm.title': 'Обращение к руководителю',
    'dm.subtitle': 'Вы можете направить свое обращение, вопрос или предложение. Сообщение будет отправлено напрямую на рабочую почту руководителя.',
    'dm.name': 'Ваше имя',
    'dm.phone': 'Контактный телефон',
    'dm.email': 'E-mail',
    'dm.message': 'Сообщение',
    'dm.submit': 'Отправить обращение',
    'dm.sending': 'Отправка…',
    'dm.privacy': 'Ваши данные используются только для обработки обращения и не передаются третьим лицам.',
    'dm.errName': 'Укажите имя (от 2 символов)',
    'dm.errEmail': 'Укажите корректный e-mail',
    'dm.errPhone': 'Некорректный номер телефона',
    'dm.errMessage': 'Сообщение должно содержать от 10 символов',
    'dm.success': 'Спасибо! Ваше обращение отправлено руководителю.',
    'dm.errorGeneric': 'Не удалось отправить обращение. Пожалуйста, попробуйте позже.',
    'dm.errorRate': 'Слишком много обращений. Попробуйте повторить позже.',
    'dm.errorSend': 'Не удалось доставить письмо. Попробуйте ещё раз немного позже.',
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
    'advantages.badge': 'Наши преимущества',
    'advantages.title': 'Современный центр спортивной медицины',
    'advantages.subtitle': 'Создаём комфортные условия для диагностики, профилактики и восстановления спортсменов с использованием современных технологий.',
    'advantages.equipment.title': 'Современное оборудование',
    'advantages.equipment.desc': 'Для диагностики и контроля состояния спортсменов',
    'advantages.specialists.title': 'Квалифицированные специалисты',
    'advantages.specialists.desc': 'Врачи различных медицинских направлений',
    'advantages.approach.title': 'Комплексный подход',
    'advantages.approach.desc': 'Обследование, лечение и восстановление в одном центре',
    'advantages.programs.title': 'Индивидуальные программы',
    'advantages.programs.desc': 'С учётом вида спорта, возраста и уровня нагрузки',
    'cycle.badge': 'Всё необходимое для здоровья спортсмена',
    'cycle.title': 'Полный цикл спортивной медицины',
    'cycle.subtitle': 'От профилактики и диагностики до сопровождения тренировочного процесса и восстановления после нагрузок.',
    'cycle.cta': 'Узнать подробнее',
    'cycle.prevention.title': 'Профилактика',
    'cycle.prevention.desc': 'Регулярный контроль состояния здоровья и предупреждение травм.',
    'cycle.diagnostics.title': 'Диагностика',
    'cycle.diagnostics.desc': 'Современные методы обследования и оценки функционального состояния.',
    'cycle.support.title': 'Сопровождение',
    'cycle.support.desc': 'Медицинское сопровождение тренировочного и соревновательного процесса.',
    'cycle.recovery.title': 'Восстановление',
    'cycle.recovery.desc': 'Помощь в восстановлении после нагрузок и травм.',
    
    // Services
    'services.title': 'Наши услуги',
    'services.subtitle': 'Комплексный подход к вашему здоровью',
    'services.homeSubtitle': 'Комплексные медицинские услуги для спортсменов, любителей спорта и всех, кто заботится о своём здоровье.',
    'services.viewAll': 'Все услуги',
    'services.learnMore': 'Подробнее',
    
    // Doctors
    'doctors.title': 'Наши специалисты',
    'doctors.subtitle': 'Опытные специалисты заботятся о вашем здоровье',
    'doctors.viewAll': 'Все специалисты',
    'doctors.experience': 'лет опыта',
    
    // News
    'news.title': 'Новости',
    'news.subtitle': 'Полезная информация о здоровье',
    'news.homeTitle': 'Новости',
    'news.homeSubtitle': 'Полезная информация о здоровье, спортивной медицине и жизни центра.',
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
    'contact.address.value': 'г. Актобе, ул. Бейбітшілік 45',
    'contact.hours.value': 'Пн-Пт: 09:00-18:00',
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
    'privacy.section6.text': 'По вопросам обработки персональных данных обращайтесь по адресу: г. Актобе, ул. Бейбітшілік 45, или по электронной почте csm.aktobe@yandex.kz.',

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
    'terms.section6.text': 'По всем вопросам обращайтесь по адресу: г. Актобе, ул. Бейбітшілік 45, или по электронной почте csm.aktobe@yandex.kz.',
    
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
    'nav.blog': 'Басшы блогы',
    'blog.title': 'Басшы блогы',
    'blog.subtitle': 'Өңірдегі спорт медицинасын дамыту туралы басшының үндеулері мен ойлары.',
    'blog.empty': 'Әзірге жарияланымдар жоқ.',
    'blog.readMore': 'Оқу',
    'blog.home': 'Басты бет',
    'blog.all': 'Барлық жарияланымдар',
    'blog.prev': 'Алдыңғы жазба',
    'blog.next': 'Келесі жазба',
    'blog.notFound': 'Жарияланым табылмады',
    'blog.loadError': 'Жарияланымдарды жүктеу мүмкін болмады. Кейінірек қайталап көріңіз.',
    'blog.signature': 'Құрметпен,',
    'blog.directorOf': 'Ақтөбе облысының спорт медицинасы орталығы',
    'dm.title': 'Басшыға өтініш',
    'dm.subtitle': 'Өтінішіңізді, сұрағыңызды немесе ұсынысыңызды жібере аласыз. Хабарлама басшының жұмыс поштасына тікелей жіберіледі.',
    'dm.name': 'Атыңыз',
    'dm.phone': 'Байланыс телефоны',
    'dm.email': 'E-mail',
    'dm.message': 'Хабарлама',
    'dm.submit': 'Өтінішті жіберу',
    'dm.sending': 'Жіберілуде…',
    'dm.privacy': 'Деректеріңіз тек өтінішті өңдеу үшін пайдаланылады және үшінші тұлғаларға берілмейді.',
    'dm.errName': 'Атыңызды көрсетіңіз (кемінде 2 таңба)',
    'dm.errEmail': 'Дұрыс e-mail көрсетіңіз',
    'dm.errPhone': 'Телефон нөмірі дұрыс емес',
    'dm.errMessage': 'Хабарлама кемінде 10 таңбадан тұруы керек',
    'dm.success': 'Рахмет! Өтінішіңіз басшыға жіберілді.',
    'dm.errorGeneric': 'Өтінішті жіберу мүмкін болмады. Кейінірек қайталап көріңіз.',
    'dm.errorRate': 'Өтініштер тым көп. Кейінірек қайталап көріңіз.',
    'dm.errorSend': 'Хатты жеткізу мүмкін болмады. Сәлден кейін қайталап көріңіз.',
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
    'advantages.badge': 'Біздің артықшылықтарымыз',
    'advantages.title': 'Заманауи спорттық медицина орталығы',
    'advantages.subtitle': 'Заманауи технологияларды қолдана отырып, спортшыларды диагностикалау, алдын алу және қалпына келтіру үшін қолайлы жағдай жасаймыз.',
    'advantages.equipment.title': 'Заманауи жабдық',
    'advantages.equipment.desc': 'Спортшылардың жағдайын диагностикалау және бақылау үшін',
    'advantages.specialists.title': 'Білікті мамандар',
    'advantages.specialists.desc': 'Әртүрлі медициналық бағыттағы дәрігерлер',
    'advantages.approach.title': 'Кешенді тәсіл',
    'advantages.approach.desc': 'Тексеру, емдеу және қалпына келтіру бір орталықта',
    'advantages.programs.title': 'Жеке бағдарламалар',
    'advantages.programs.desc': 'Спорт түрін, жасын және жүктеме деңгейін ескере отырып',
    'cycle.badge': 'Спортшының денсаулығына қажетті барлық нәрсе',
    'cycle.title': 'Спорттық медицинаның толық циклі',
    'cycle.subtitle': 'Алдын алу мен диагностикадан бастап жаттығу процесін сүйемелдеуге және жүктемеден кейін қалпына келтіруге дейін.',
    'cycle.cta': 'Толығырақ білу',
    'cycle.prevention.title': 'Алдын алу',
    'cycle.prevention.desc': 'Денсаулық жағдайын тұрақты бақылау және жарақаттардың алдын алу.',
    'cycle.diagnostics.title': 'Диагностика',
    'cycle.diagnostics.desc': 'Тексерудің және функционалдық жағдайды бағалаудың заманауи әдістері.',
    'cycle.support.title': 'Сүйемелдеу',
    'cycle.support.desc': 'Жаттығу және жарыс процесін медициналық сүйемелдеу.',
    'cycle.recovery.title': 'Қалпына келтіру',
    'cycle.recovery.desc': 'Жүктемеден және жарақаттан кейін қалпына келуге көмек.',
    
    // Services
    'services.title': 'Біздің қызметтер',
    'services.subtitle': 'Денсаулығыңызға кешенді көзқарас',
    'services.homeSubtitle': 'Спортшыларға, спортты сүйетіндерге және өз денсаулығына алаңдайтын барлық адамдарға арналған кешенді медициналық қызметтер.',
    'services.viewAll': 'Барлық қызметтер',
    'services.learnMore': 'Толығырақ',
    
    // Doctors
    'doctors.title': 'Біздің мамандарымыз',
    'doctors.subtitle': 'Тәжірибелі мамандар сіздің денсаулығыңызға қамқорлық жасайды',
    'doctors.viewAll': 'Барлық мамандар',
    'doctors.experience': 'жыл тәжірибе',
    
    // News
    'news.title': 'Жаңалықтар',
    'news.subtitle': 'Денсаулық туралы пайдалы ақпарат',
    'news.homeTitle': 'Жаңалықтар',
    'news.homeSubtitle': 'Денсаулық, спорттық медицина және орталық өмірі туралы пайдалы ақпарат.',
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
    'contact.address.value': 'Ақтөбе қ., Бейбітшілік к-сі 45',
    'contact.hours.value': 'Дс-Жм: 09:00-18:00',
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
    'privacy.section6.text': 'Жеке деректерді өңдеу мәселелері бойынша Ақтөбе қ., Бейбітшілік к-сі 45 мекенжайы бойынша немесе csm.aktobe@yandex.kz электрондық поштасына хабарласыңыз.',

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
    'terms.section6.text': 'Барлық сұрақтар бойынша Ақтөбе қ., Бейбітшілік к-сі 45 мекенжайы бойынша немесе csm.aktobe@yandex.kz электрондық поштасына хабарласыңыз.',
    
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
    'nav.blog': "Director's Blog",
    'blog.title': "Director's Blog",
    'blog.subtitle': 'Addresses and thoughts of the director on the development of sports medicine in the region.',
    'blog.empty': 'No posts yet.',
    'blog.readMore': 'Read',
    'blog.home': 'Home',
    'blog.all': 'All posts',
    'blog.prev': 'Previous post',
    'blog.next': 'Next post',
    'blog.notFound': 'Post not found',
    'blog.loadError': 'Could not load posts. Please try again later.',
    'blog.signature': 'Sincerely,',
    'blog.directorOf': 'of the Aktobe Regional Sports Medicine Center',
    'dm.title': 'Contact the Director',
    'dm.subtitle': "You can send your appeal, question or suggestion. The message will be sent directly to the director's work email.",
    'dm.name': 'Your name',
    'dm.phone': 'Phone number',
    'dm.email': 'E-mail',
    'dm.message': 'Message',
    'dm.submit': 'Send message',
    'dm.sending': 'Sending…',
    'dm.privacy': 'Your data is used only to process your request and is not shared with third parties.',
    'dm.errName': 'Enter your name (at least 2 characters)',
    'dm.errEmail': 'Enter a valid e-mail',
    'dm.errPhone': 'Invalid phone number',
    'dm.errMessage': 'Message must be at least 10 characters',
    'dm.success': 'Thank you! Your message has been sent to the director.',
    'dm.errorGeneric': 'Could not send your message. Please try again later.',
    'dm.errorRate': 'Too many requests. Please try again later.',
    'dm.errorSend': 'Could not deliver the email. Please try again shortly.',
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
    'advantages.badge': 'Our Advantages',
    'advantages.title': 'A Modern Sports Medicine Center',
    'advantages.subtitle': 'We create comfortable conditions for diagnostics, prevention and recovery of athletes using modern technologies.',
    'advantages.equipment.title': 'Modern equipment',
    'advantages.equipment.desc': "For diagnostics and monitoring of athletes' condition",
    'advantages.specialists.title': 'Qualified specialists',
    'advantages.specialists.desc': 'Doctors from various medical fields',
    'advantages.approach.title': 'Comprehensive approach',
    'advantages.approach.desc': 'Examination, treatment and recovery in one center',
    'advantages.programs.title': 'Individual programs',
    'advantages.programs.desc': 'Tailored to the sport, age and training load',
    'cycle.badge': "Everything for an athlete's health",
    'cycle.title': 'The Full Cycle of Sports Medicine',
    'cycle.subtitle': 'From prevention and diagnostics to support of the training process and recovery after workloads.',
    'cycle.cta': 'Learn more',
    'cycle.prevention.title': 'Prevention',
    'cycle.prevention.desc': 'Regular health monitoring and injury prevention.',
    'cycle.diagnostics.title': 'Diagnostics',
    'cycle.diagnostics.desc': 'Modern methods of examination and functional state assessment.',
    'cycle.support.title': 'Support',
    'cycle.support.desc': 'Medical support of the training and competition process.',
    'cycle.recovery.title': 'Recovery',
    'cycle.recovery.desc': 'Help with recovery after workloads and injuries.',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive approach to your health',
    'services.homeSubtitle': 'Comprehensive medical services for athletes, sports enthusiasts and everyone who cares about their health.',
    'services.viewAll': 'View All Services',
    'services.learnMore': 'Learn More',
    
    // Doctors
    'doctors.title': 'Our Specialists',
    'doctors.subtitle': 'Experienced specialists caring for your health',
    'doctors.viewAll': 'View All Specialists',
    'doctors.experience': 'years experience',
    
    // News
    'news.title': 'News',
    'news.subtitle': 'Useful health information',
    'news.homeTitle': 'News',
    'news.homeSubtitle': 'Useful information about health, sports medicine and the life of the center.',
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
    'contact.address.value': 'Aktobe, Beibitshilik St. 45',
    'contact.hours.value': 'Mon-Fri: 09:00-18:00',
    'hero.emergency': 'Emergency care',
    'hero.specialists': 'Specialists',
    'hero.years': 'years',
    'hero.market': 'On the market',

    // Footer
    'footer.rights': 'All rights reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',

    // Privacy
    'privacy.title': 'Privacy Policy',
    'privacy.lastUpdated': 'Last updated: September 14, 2026',
    'privacy.section1.title': '1. General Provisions',
    'privacy.section1.text': 'This Privacy Policy governs the processing of personal data of users of the Aktobe Region Sports Medicine Center website.',
    'privacy.section2.title': '2. Data We Collect',
    'privacy.section2.text': 'We may collect your name, contact phone number, email address, and other information necessary for appointment scheduling and medical services.',
    'privacy.section3.title': '3. How We Use Data',
    'privacy.section3.text': 'Personal data is used solely to provide medical services, schedule appointments, respond to inquiries, and improve service quality.',
    'privacy.section4.title': '4. Data Protection',
    'privacy.section4.text': 'We take reasonable measures to protect personal data from unauthorized access, alteration, disclosure, or destruction.',
    'privacy.section5.title': '5. Cookies',
    'privacy.section5.text': 'The website may use cookies to improve functionality and analyze traffic. By continuing to use the site, you agree to the use of cookies.',
    'privacy.section6.title': '6. Contact Information',
    'privacy.section6.text': 'For questions about personal data processing, contact us at: Aktobe, Beibitshilik St. 45, or by email at csm.aktobe@yandex.kz.',

    // Terms
    'terms.title': 'Terms of Service',
    'terms.lastUpdated': 'Last updated: September 14, 2026',
    'terms.section1.title': '1. General Provisions',
    'terms.section1.text': 'By using the Aktobe Region Sports Medicine Center website, you agree to these Terms of Service.',
    'terms.section2.title': '2. Medical Services',
    'terms.section2.text': 'Information on the website is for reference only and does not replace an in-person doctor consultation. Medical services are provided only after examination by a specialist.',
    'terms.section3.title': '3. User Obligations',
    'terms.section3.text': 'The user agrees to provide accurate information when scheduling an appointment and not to use the website for unlawful purposes.',
    'terms.section4.title': '4. Limitation of Liability',
    'terms.section4.text': 'The Center is not liable for any damages resulting from the use of information posted on the website without consulting a specialist.',
    'terms.section5.title': '5. Changes to Terms',
    'terms.section5.text': 'The website administration reserves the right to amend these Terms of Service at any time without prior notice.',
    'terms.section6.title': '6. Contact Information',
    'terms.section6.text': 'For any questions, contact us at: Aktobe, Beibitshilik St. 45, or by email at csm.aktobe@yandex.kz.',
    
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
