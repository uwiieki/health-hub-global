import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Dumbbell, RefreshCw, Search, ShieldPlus, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Stage {
  key: string;
  icon: LucideIcon;
}

const stages: Stage[] = [
  { key: 'prevention', icon: ShieldPlus },
  { key: 'diagnostics', icon: Search },
  { key: 'support', icon: Dumbbell },
  { key: 'recovery', icon: RefreshCw },
];

export const CycleSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Лёгкое появление при прокрутке до секции
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const reveal = (delay: number) => ({
    className: `transition-all duration-700 ease-out motion-reduce:transition-none ${
      visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section ref={sectionRef} className="relative pb-12 md:pb-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-[28px] border border-primary/10 bg-gradient-to-bl from-white/80 via-secondary/40 to-primary/10 px-5 py-8 shadow-card backdrop-blur-sm sm:px-8 sm:py-9 xl:px-8 xl:py-10 min-[1400px]:px-10">
          {/* Мягкие абстрактные волны на фоне */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -bottom-32 h-72 w-[28rem] -rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute -left-28 -top-24 h-64 w-96 rotate-12 rounded-[100%] bg-primary/10 blur-2xl" />
            <div className="absolute bottom-0 left-1/3 h-32 w-72 rounded-[100%] bg-white/70 blur-2xl" />
          </div>

          <div className="relative grid gap-8 xl:grid-cols-[9fr_16fr] xl:items-center xl:gap-8">
            {/* Текстовая часть */}
            <div className={`min-w-0 space-y-4 ${reveal(0).className}`} style={reveal(0).style}>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-3.5 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="min-w-0">{t('cycle.badge')}</span>
              </span>

              <h2 className="font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {t('cycle.title')}
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t('cycle.subtitle')}
              </p>

              <Button
                asChild
                size="lg"
                className="mt-2 gap-2 bg-gradient-hero text-base transition-opacity hover:opacity-90"
              >
                <Link to="/services">
                  {t('cycle.cta')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Этапы 01 → 04 */}
            <ol className="grid min-w-0 gap-6 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {stages.map(({ key, icon: Icon }, index) => {
                const isLast = index === stages.length - 1;
                const r = reveal(150 + index * 120);
                return (
                  <li key={key} className={`relative min-w-0 ${r.className}`} style={r.style}>
                    <div className="group h-full rounded-[22px] border border-primary/10 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-card lg:p-4 xl:px-3 min-[1400px]:px-4">
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span className="font-display text-4xl font-bold leading-none text-primary/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 text-primary transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </span>
                      </div>
                      <h3 className="break-words font-display text-lg font-bold leading-snug text-foreground lg:text-base xl:text-[15px] min-[1400px]:text-base">
                        {t(`cycle.${key}.title`)}
                      </h3>
                      <p className="mt-2 break-words text-[15px] leading-relaxed text-muted-foreground xl:text-sm min-[1400px]:text-[15px]">
                        {t(`cycle.${key}.desc`)}
                      </p>
                    </div>

                    {/* Связка между этапами: стрелка в ряду (lg+) */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-[1.35rem] top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-primary/10 bg-white text-primary shadow-sm lg:flex"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    )}

                    {/* Связка между этапами: вертикальная линия (mobile) */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-9 top-full h-6 w-px bg-gradient-to-b from-primary/40 to-primary/10 sm:hidden"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};
