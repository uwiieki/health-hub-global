
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create services table
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ru TEXT NOT NULL DEFAULT '',
    title_kz TEXT NOT NULL DEFAULT '',
    title_en TEXT NOT NULL DEFAULT '',
    description_ru TEXT NOT NULL DEFAULT '',
    description_kz TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    category TEXT NOT NULL DEFAULT '',
    price TEXT NOT NULL DEFAULT '',
    image_url TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create doctors table
CREATE TABLE public.doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_ru TEXT NOT NULL DEFAULT '',
    name_kz TEXT NOT NULL DEFAULT '',
    name_en TEXT NOT NULL DEFAULT '',
    photo_url TEXT,
    specialization_ru TEXT NOT NULL DEFAULT '',
    specialization_kz TEXT NOT NULL DEFAULT '',
    specialization_en TEXT NOT NULL DEFAULT '',
    bio_ru TEXT NOT NULL DEFAULT '',
    bio_kz TEXT NOT NULL DEFAULT '',
    bio_en TEXT NOT NULL DEFAULT '',
    education TEXT,
    experience_years INTEGER NOT NULL DEFAULT 0,
    schedule JSONB,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

-- Create news table
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title_ru TEXT NOT NULL DEFAULT '',
    title_kz TEXT NOT NULL DEFAULT '',
    title_en TEXT NOT NULL DEFAULT '',
    content_ru TEXT NOT NULL DEFAULT '',
    content_kz TEXT NOT NULL DEFAULT '',
    content_en TEXT NOT NULL DEFAULT '',
    cover_image_url TEXT,
    category TEXT NOT NULL DEFAULT '',
    publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT NOT NULL DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Security definer function to check admin role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Shorthand for current user admin check
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON public.news FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for services
CREATE POLICY "Public can read active services" ON public.services FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can read all services" ON public.services FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE TO authenticated USING (public.is_admin());

-- RLS Policies for doctors
CREATE POLICY "Public can read active doctors" ON public.doctors FOR SELECT USING (status = 'active');
CREATE POLICY "Admins can read all doctors" ON public.doctors FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert doctors" ON public.doctors FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update doctors" ON public.doctors FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete doctors" ON public.doctors FOR DELETE TO authenticated USING (public.is_admin());

-- RLS Policies for news
CREATE POLICY "Public can read published news" ON public.news FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can read all news" ON public.news FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert news" ON public.news FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update news" ON public.news FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete news" ON public.news FOR DELETE TO authenticated USING (public.is_admin());

-- RLS Policies for user_roles
CREATE POLICY "Admins can read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.is_admin());

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

CREATE POLICY "Anyone can read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.is_admin());
