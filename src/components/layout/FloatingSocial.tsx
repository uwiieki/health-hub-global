import { useEffect, useState } from 'react';
import { Instagram, MessageCircle, ArrowUp } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.9a8.16 8.16 0 0 0 4.77 1.52V7a4.85 4.85 0 0 1-1.84-.31z" />
  </svg>
);

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/csm.aktobe',
    icon: Instagram,
    className:
      'bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white',
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@csm.aktobe',
    icon: TikTokIcon,
    className: 'bg-black text-white',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/77000000000',
    icon: MessageCircle,
    className: 'bg-[#25D366] text-white',
  },
];

export const FloatingSocial = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 bottom-6 z-40 flex flex-col items-center gap-3">
      {socials.map(({ name, href, icon: Icon, className }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110 ${className}`}
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-110"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};