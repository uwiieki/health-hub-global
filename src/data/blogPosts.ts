import type { BlogPost } from '@/lib/blog';

// Резервная копия первой публикации: показывается только если таблица blog_posts
// недоступна (например, миграция ещё не применена). Основной источник — Supabase.
export const fallbackBlogPosts: BlogPost[] = [
  {
    id: 'fallback-1',
    slug: 'o-razvitii-sportivnoy-meditsiny',
    title_ru: 'О развитии спортивной медицины в Актюбинской области',
    title_kz: 'Ақтөбе облысында спорт медицинасын дамыту туралы',
    title_en: 'On the Development of Sports Medicine in the Aktobe Region',
    excerpt_ru: 'Спортивная медицина — это не только лечение, но и профилактика, диагностика и сопровождение на каждом этапе спортивного пути.',
    excerpt_kz: 'Спорт медицинасы — тек емдеу ғана емес, сонымен қатар спорттық жолдың әр кезеңінде алдын алу, диагностика және алып жүру.',
    excerpt_en: "Sports medicine is not only treatment but also prevention, diagnostics and support at every stage of an athlete's career.",
    content_ru: `Уважаемые спортсмены, тренеры, специалисты и жители Актюбинской области!

Спортивная медицина — это не только лечение, но и профилактика, диагностика и сопровождение на каждом этапе спортивного пути. Наша главная задача — создать условия, при которых каждый спортсмен сможет безопасно тренироваться, развиваться и достигать высоких результатов.

В 2026 году мы продолжаем работу по обновлению медицинского оборудования, расширению спектра услуг и внедрению современных методов диагностики. Особое внимание уделяем поддержке молодых спортсменов и развитию сотрудничества с образовательными и спортивными организациями региона.

Уверен, что совместными усилиями мы сможем сделать Актюбинскую область центром здорового и спортивного поколения.`,
    content_kz: `Құрметті спортшылар, жаттықтырушылар, мамандар және Ақтөбе облысының тұрғындары!

Спорт медицинасы — тек емдеу ғана емес, сонымен қатар спорттық жолдың әр кезеңінде алдын алу, диагностика және алып жүру. Біздің басты міндетіміз — әрбір спортшы қауіпсіз жаттығып, дамып, жоғары нәтижелерге жете алатын жағдай жасау.

2026 жылы біз медициналық жабдықты жаңарту, қызмет түрлерін кеңейту және диагностиканың заманауи әдістерін енгізу жұмысын жалғастырудамыз. Жас спортшыларды қолдауға және өңірдің білім беру және спорт ұйымдарымен ынтымақтастықты дамытуға ерекше назар аударамыз.

Бірлескен күш-жігеріміз арқылы Ақтөбе облысын салауатты және спортшыл ұрпақтың орталығына айналдыра аламыз деп сенемін.`,
    content_en: `Dear athletes, coaches, specialists and residents of the Aktobe Region!

Sports medicine is not only treatment but also prevention, diagnostics and support at every stage of an athlete's career. Our main goal is to create conditions in which every athlete can train safely, develop and achieve high results.

In 2026 we are continuing to upgrade our medical equipment, expand the range of services and introduce modern diagnostic methods. We pay particular attention to supporting young athletes and developing cooperation with educational and sports organizations in the region.

I am confident that, working together, we can make the Aktobe Region a center of a healthy and sporting generation.`,
    cover_image_url: null,
    publish_date: '2026-09-30',
  },
];
