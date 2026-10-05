import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MapPin, Phone, Quote, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { usePageMeta } from '@/hooks/usePageMeta';
import { BlogBreadcrumb } from '@/components/blog/BlogBreadcrumb';
import { deputyManagers, director, type Leader } from '@/data/leaders';
import { cn } from '@/lib/utils';

const ORG_NAME = 'Центр спортивной медицины Актюбинской области';

const texts = {
  ru: {
    title: 'Руководство',
    subtitle: 'Руководящий состав Центра спортивной медицины Актюбинской области, обеспечивающий развитие и эффективную работу учреждения.',
    deputies: 'Заместитель руководителя',
    deputiesMany: 'Заместители руководителя',
    directorRole: 'Директор',
    directorPosition: 'Руководитель Центра спортивной медицины Актюбинской области',
    bio: 'Биография',
    metaTitle: 'Руководство — Центр спортивной медицины Актюбинской области',
    metaDesc: 'Руководство Центра спортивной медицины Актюбинской области: директор и заместитель руководителя.',
  },
  kz: {
    title: 'Басшылық',
    subtitle: 'Мекеменің дамуы мен тиімді жұмысын қамтамасыз ететін Ақтөбе облысының спорт медицинасы орталығының басшы құрамы.',
    deputies: 'Басшының орынбасары',
    deputiesMany: 'Басшының орынбасарлары',
    directorRole: 'Директор',
    directorPosition: 'Ақтөбе облысының спорт медицинасы орталығының басшысы',
    bio: 'Өмірбаяны',
    metaTitle: 'Басшылық — Ақтөбе облысының спорт медицинасы орталығы',
    metaDesc: 'Ақтөбе облысының спорт медицинасы орталығының басшылығы: директор және басшының орынбасары.',
  },
  en: {
    title: 'Leadership',
    subtitle: 'The management team of the Aktobe Region Sports Medicine Center, ensuring the development and effective work of the institution.',
    deputies: 'Deputy Director',
    deputiesMany: 'Deputy Directors',
    directorRole: 'Director',
    directorPosition: 'Head of the Aktobe Region Sports Medicine Center',
    bio: 'Biography',
    metaTitle: 'Leadership — Aktobe Region Sports Medicine Center',
    metaDesc: 'Leadership of the Aktobe Region Sports Medicine Center: the director and deputy director.',
  },
};

const Photo = ({ src, alt, className, iconClass }: { src?: string | null; alt: string; className?: string; iconClass?: string }) => (
  <div className={cn('overflow-hidden bg-gradient-to-br from-primary/15 via-primary/5 to-white', className)}>
    {src ? (
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-top" />
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <User className={cn('text-primary/30', iconClass)} strokeWidth={1.25} />
      </div>
    )}
  </div>
);

const ContactItem = ({ icon: Icon, children, href }: { icon: LucideIcon; children: React.ReactNode; href?: string }) => {
  const inner = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 text-sm text-foreground/80">{children}</span>
    </>
  );
  const cls = 'flex items-center gap-3';
  return href ? <a href={href} className={cn(cls, 'transition-colors hover:text-primary')}>{inner}</a> : <div className={cls}>{inner}</div>;
};

const Management = () => {
  const { t, language } = useLanguage();
  const c = texts[language];
  const tr = (o: Leader['name']) => o[language];

  usePageMeta({ title: c.metaTitle || `${c.title} — ${ORG_NAME}`, description: c.metaDesc });

  const count = deputyManagers.length;
  const gridCls = count <= 1 ? 'max-w-xl' : count === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3';

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl">
          <BlogBreadcrumb items={[
            { label: t('blog.home'), href: '/' },
            { label: t('nav.about'), href: '/about' },
            { label: c.title },
          ]} />

          <header className="mb-10 max-w-2xl">
            <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">{c.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{c.subtitle}</p>
          </header>

          {/* Директор */}
          <article className="animate-fade-in-up overflow-hidden rounded-[28px] border border-primary/10 bg-white/90 shadow-card md:grid md:grid-cols-[2fr_3fr]">
            <Photo src={director.photoUrl} alt={tr(director.name)} className="aspect-[4/3] md:aspect-auto md:min-h-[22rem]" iconClass="h-24 w-24" />
            <div className="flex min-w-0 flex-col gap-4 p-6 md:p-8">
              <div>
                <span className="inline-block rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{c.directorRole}</span>
                <h2 className="mt-3 break-words font-display text-2xl font-bold text-foreground md:text-3xl">{tr(director.name)}</h2>
                <p className="mt-2 text-muted-foreground">{c.directorPosition}</p>
              </div>

              {director.quote && (
                <blockquote className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Quote className="h-5 w-5 fill-current" />
                  </span>
                  <p className="text-base italic leading-relaxed text-foreground/80">{director.quote[language]}</p>
                </blockquote>
              )}

              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 border-t border-primary/10 pt-4">
                {director.phone && <ContactItem icon={Phone} href={`tel:${director.phone.replace(/[^\d+]/g, '')}`}>{director.phone}</ContactItem>}
                {director.email && <ContactItem icon={Mail} href={`mailto:${director.email}`}>{director.email}</ContactItem>}
                <ContactItem icon={MapPin}>{t('contact.address.value')}</ContactItem>
              </div>

              <Link to={`/leaders/${director.id}`} className="group inline-flex items-center gap-2 text-sm font-semibold text-primary">
                {c.bio}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </article>

          {/* Заместители: список рендерится из массива deputyManagers */}
          {count > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">{count > 1 ? c.deputiesMany : c.deputies}</h2>
              <div aria-hidden="true" className="mb-6 mt-3 h-1 w-14 rounded-full bg-primary" />
              <ul className={cn('grid gap-6', gridCls)}>
                {deputyManagers.map((d) => (
                  <li key={d.id}>
                    <article className="flex h-full flex-col gap-5 rounded-[22px] border border-primary/10 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:flex-row">
                      <Photo src={d.photoUrl} alt={tr(d.name)} className="aspect-[4/3] rounded-2xl sm:aspect-[3/4] sm:w-36 sm:shrink-0" iconClass="h-14 w-14" />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <span className="w-fit max-w-full rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium leading-snug text-primary">{tr(d.role)}</span>
                        <h3 className="break-words font-display text-xl font-bold leading-snug text-foreground">{tr(d.name)}</h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">{tr(d.desc)}</p>
                        {(d.phone || d.email) && (
                          <div className="mt-auto grid gap-2 pt-3">
                            {d.phone && <ContactItem icon={Phone} href={`tel:${d.phone.replace(/[^\d+]/g, '')}`}>{d.phone}</ContactItem>}
                            {d.email && <ContactItem icon={Mail} href={`mailto:${d.email}`}>{d.email}</ContactItem>}
                          </div>
                        )}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Management;
