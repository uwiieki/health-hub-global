import { ClipboardList, MonitorCheck, PersonStanding, Shield, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Advantage {
  key: string;
  icon: LucideIcon;
}

const advantages: Advantage[] = [
  { key: 'equipment', icon: MonitorCheck },
  { key: 'specialists', icon: Users },
  { key: 'approach', icon: ClipboardList },
  { key: 'programs', icon: PersonStanding },
];

export const StatsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-12 md:py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-gradient-to-br from-white/80 via-secondary/50 to-primary/10 px-5 py-8 shadow-card backdrop-blur-sm sm:px-8 sm:py-10 xl:px-8 xl:py-12 min-[1400px]:px-10">
          {/* Мягкие абстрактные формы на фоне */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -bottom-32 h-72 w-96 rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute -right-24 -top-28 h-72 w-[28rem] -rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute right-1/3 top-0 h-40 w-72 rounded-[100%] bg-white/70 blur-2xl" />
          </div>

          <div className="relative grid gap-8 xl:grid-cols-[1fr_2fr] xl:items-center xl:gap-8">
            {/* Заголовок и описание */}
            <div className="min-w-0 space-y-4 animate-fade-in-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-primary">
                <Shield className="h-4 w-4" />
                {t('advantages.badge')}
              </span>

              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {t('advantages.title')}
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('advantages.subtitle')}
              </p>
            </div>

            {/* Карточки */}
            <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {advantages.map(({ key, icon: Icon }, index) => (
                <div
                  key={key}
                  className="group min-w-0 rounded-[22px] border border-primary/10 bg-white/90 p-5 lg:p-4 xl:px-3.5 min-[1400px]:px-4 2xl:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="hyphens-auto break-words font-display text-lg font-bold leading-snug text-foreground lg:text-base xl:text-[15px] min-[1400px]:text-base">
                    {t(`advantages.${key}.title`)}
                  </h3>
                  <p className="mt-2 break-words text-[15px] leading-relaxed text-muted-foreground">
                    {t(`advantages.${key}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
