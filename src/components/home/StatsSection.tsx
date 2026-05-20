import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState, useRef } from 'react';

const stats = [
  { value: 15, suffix: '+', key: 'stats.years' },
  { value: 50, suffix: '+', key: 'stats.specialists' },
  { value: 25000, suffix: '+', key: 'stats.patients' },
  { value: 100, suffix: '+', key: 'stats.services' },
];

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
};

export const StatsSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-gradient-hero py-16 md:py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container relative" />
    </section>
  );
};

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isVisible: boolean;
}

const StatItem = ({ value, suffix, label, delay, isVisible }: StatItemProps) => {
  const count = useCountUp(value, 2000 + delay, isVisible);

  return (
    <div className="text-center">
      <div className="font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
        {count.toLocaleString()}
        <span className="text-primary-foreground/80">{suffix}</span>
      </div>
      <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{label}</p>
    </div>
  );
};
