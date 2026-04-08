
CREATE TABLE public.legal_acts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ru TEXT NOT NULL DEFAULT '',
  title_kz TEXT NOT NULL DEFAULT '',
  title_en TEXT NOT NULL DEFAULT '',
  document_number TEXT NOT NULL DEFAULT '',
  adoption_date DATE NOT NULL DEFAULT CURRENT_DATE,
  document_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.legal_acts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active legal_acts"
ON public.legal_acts FOR SELECT TO public
USING (status = 'active');

CREATE POLICY "Admins can read all legal_acts"
ON public.legal_acts FOR SELECT TO authenticated
USING (is_admin());

CREATE POLICY "Admins can insert legal_acts"
ON public.legal_acts FOR INSERT TO authenticated
WITH CHECK (is_admin());

CREATE POLICY "Admins can update legal_acts"
ON public.legal_acts FOR UPDATE TO authenticated
USING (is_admin());

CREATE POLICY "Admins can delete legal_acts"
ON public.legal_acts FOR DELETE TO authenticated
USING (is_admin());

CREATE TRIGGER update_legal_acts_updated_at
BEFORE UPDATE ON public.legal_acts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
