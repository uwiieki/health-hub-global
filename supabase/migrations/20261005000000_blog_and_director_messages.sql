CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_ru TEXT NOT NULL DEFAULT '',
  title_kz TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  excerpt_ru TEXT NOT NULL DEFAULT '',
  excerpt_kz TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  content_ru TEXT NOT NULL DEFAULT '',
  content_kz TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT,
  publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT blog_posts_slug_format CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog_posts"
ON public.blog_posts FOR SELECT TO public
USING (status = 'published');

CREATE POLICY "Admins can read all blog_posts"
ON public.blog_posts FOR SELECT TO authenticated
USING (is_admin());

CREATE POLICY "Admins can insert blog_posts"
ON public.blog_posts FOR INSERT TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admins can update blog_posts"
ON public.blog_posts FOR UPDATE TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete blog_posts"
ON public.blog_posts FOR DELETE TO authenticated
USING (is_admin());

CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


CREATE TABLE public.director_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_hash TEXT NOT NULL DEFAULT '',
  mail_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX director_messages_ip_created_idx ON public.director_messages (ip_hash, created_at DESC);
CREATE INDEX director_messages_email_created_idx ON public.director_messages (email, created_at DESC);

ALTER TABLE public.director_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read director_messages"
ON public.director_messages FOR SELECT TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete director_messages"
ON public.director_messages FOR DELETE TO authenticated
USING (is_admin());


INSERT INTO public.blog_posts (slug, title_ru, excerpt_ru, content_ru, publish_date, status)
VALUES (
  'o-razvitii-sportivnoy-meditsiny',
  'О развитии спортивной медицины в Актюбинской области',
  'Спортивная медицина — это не только лечение, но и профилактика, диагностика и сопровождение на каждом этапе спортивного пути.',
  $txt$Уважаемые спортсмены, тренеры, специалисты и жители Актюбинской области!

Спортивная медицина — это не только лечение, но и профилактика, диагностика и сопровождение на каждом этапе спортивного пути. Наша главная задача — создать условия, при которых каждый спортсмен сможет безопасно тренироваться, развиваться и достигать высоких результатов.

В 2026 году мы продолжаем работу по обновлению медицинского оборудования, расширению спектра услуг и внедрению современных методов диагностики. Особое внимание уделяем поддержке молодых спортсменов и развитию сотрудничества с образовательными и спортивными организациями региона.

Уверен, что совместными усилиями мы сможем сделать Актюбинскую область центром здорового и спортивного поколения.$txt$,
  DATE '2026-09-30',
  'published'
);
