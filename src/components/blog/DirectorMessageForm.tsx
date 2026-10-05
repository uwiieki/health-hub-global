import { useRef, useState } from 'react';
import { CheckCircle2, Loader2, Mail, Send, ShieldCheck } from 'lucide-react';
import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const MAX_MESSAGE = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{5,24}$/;

type Fields = { name: string; phone: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = 'idle' | 'sending' | 'success' | 'error';

const Field = ({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-sm font-medium text-foreground">
      {label}{required && <span className="text-destructive"> *</span>}
    </label>
    {children}
    {error && <p id={`${id}-error`} role="alert" className="text-sm text-destructive">{error}</p>}
  </div>
);

export const DirectorMessageForm = () => {
  const { t } = useLanguage();
  const [values, setValues] = useState<Fields>({ name: '', phone: '', email: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorText, setErrorText] = useState('');
  const openedAt = useRef(Date.now());
  const sendingRef = useRef(false); // защита от двойной отправки

  const validate = (v: Fields): Errors => {
    const e: Errors = {};
    const name = v.name.trim();
    if (name.length < 2 || name.length > 100) e.name = t('dm.errName');
    if (!EMAIL_RE.test(v.email.trim()) || v.email.trim().length > 254) e.email = t('dm.errEmail');
    if (v.phone.trim() && !PHONE_RE.test(v.phone.trim())) e.phone = t('dm.errPhone');
    const msg = v.message.trim();
    if (msg.length < 10 || msg.length > MAX_MESSAGE) e.message = t('dm.errMessage');
    return e;
  };

  const update = (key: keyof Fields, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (sendingRef.current) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    sendingRef.current = true;
    setStatus('sending');
    setErrorText('');
    try {
      const { error } = await supabase.functions.invoke('send-director-message', {
        body: {
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: honeypot, // honeypot: у людей всегда пустое
          elapsed: Date.now() - openedAt.current,
        },
      });
      if (error) {
        let code = 0;
        if (error instanceof FunctionsHttpError) code = error.context.status;
        setErrorText(
          code === 429 ? t('dm.errorRate')
            : code === 502 ? t('dm.errorSend')
            : t('dm.errorGeneric')
        );
        setStatus('error');
        return;
      }
      setValues({ name: '', phone: '', email: '', message: '' });
      openedAt.current = Date.now();
      setStatus('success');
    } catch {
      setErrorText(t('dm.errorGeneric'));
      setStatus('error');
    } finally {
      sendingRef.current = false;
    }
  };

  const sending = status === 'sending';
  const fieldCls = (err?: string) => cn('h-11 bg-white', err && 'border-destructive focus-visible:ring-destructive');

  return (
    <section
      aria-labelledby="director-message-title"
      className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-gradient-to-br from-white/80 via-secondary/50 to-primary/10 px-5 py-8 shadow-card backdrop-blur-sm sm:px-8 sm:py-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-28 h-72 w-[28rem] -rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
        <div className="absolute -left-24 -bottom-32 h-72 w-96 rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
      </div>

      <div className="relative">
        <div className="mb-6 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
            <Mail className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <h2 id="director-message-title" className="font-display text-2xl font-bold text-foreground md:text-3xl">
              {t('dm.title')}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{t('dm.subtitle')}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-busy={sending}>
          <div className="grid gap-4 md:grid-cols-2">
            <Field id="dm-name" label={t('dm.name')} required error={errors.name}>
              <Input id="dm-name" name="name" autoComplete="name" maxLength={100} value={values.name}
                onChange={(e) => update('name', e.target.value)} disabled={sending}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? 'dm-name-error' : undefined}
                className={fieldCls(errors.name)} />
            </Field>
            <Field id="dm-phone" label={t('dm.phone')} error={errors.phone}>
              <Input id="dm-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} value={values.phone}
                onChange={(e) => update('phone', e.target.value)} disabled={sending}
                aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'dm-phone-error' : undefined}
                className={fieldCls(errors.phone)} />
            </Field>
          </div>

          <Field id="dm-email" label={t('dm.email')} required error={errors.email}>
            <Input id="dm-email" name="email" type="email" autoComplete="email" maxLength={254} value={values.email}
              onChange={(e) => update('email', e.target.value)} disabled={sending}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? 'dm-email-error' : undefined}
              className={fieldCls(errors.email)} />
          </Field>

          <Field id="dm-message" label={t('dm.message')} required error={errors.message}>
            <Textarea id="dm-message" name="message" rows={6} maxLength={MAX_MESSAGE} value={values.message}
              onChange={(e) => update('message', e.target.value)} disabled={sending}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? 'dm-message-error' : undefined}
              className={cn('bg-white', errors.message && 'border-destructive focus-visible:ring-destructive')} />
            <p className="text-right text-xs text-muted-foreground">{values.message.length} / {MAX_MESSAGE}</p>
          </Field>

          {/* Honeypot: скрыто от людей, боты его заполняют */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>Website
              <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)} />
            </label>
          </div>

          <div role="status" aria-live="polite">
            {status === 'success' && (
              <p className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />{t('dm.success')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {errorText}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-sm text-muted-foreground sm:max-w-md">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{t('dm.privacy')}
            </p>
            <Button type="submit" size="lg" disabled={sending}
              className="h-12 w-full gap-2 bg-gradient-hero text-base transition-opacity hover:opacity-90 sm:w-auto">
              {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
              {sending ? t('dm.sending') : t('dm.submit')}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};
