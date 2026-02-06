import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/doctors', label: t('nav.doctors') },
    { href: '/news', label: t('nav.news') },
    { href: '/about', label: t('nav.about') },
    { href: '/contacts', label: t('nav.contacts') },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top bar */}
      <div className="hidden border-b border-border/30 bg-secondary/50 md:block">
        <div className="container flex h-10 items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-primary" />
            <span>+7 (777) 123-45-67</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-sm">
                <span>{currentLang.flag}</span>
                <span>{currentLang.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={cn(
                    'gap-2 cursor-pointer',
                    language === lang.code && 'bg-secondary'
                  )}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero md:h-12 md:w-12">
            <span className="text-xl font-bold text-primary-foreground md:text-2xl">M</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-display text-lg font-semibold text-foreground md:text-xl">
              MediCare
            </h1>
            <p className="text-xs text-muted-foreground">Medical Center</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-secondary hover:text-primary',
                location.pathname === link.href
                  ? 'text-primary bg-secondary/80'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden items-center gap-4 lg:flex">
          <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
            {t('nav.appointment')}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 px-2">
                <span>{currentLang.flag}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="gap-2 cursor-pointer"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden animate-fade-in">
          <nav className="container py-4">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 text-base font-medium transition-colors rounded-md',
                    location.pathname === link.href
                      ? 'text-primary bg-secondary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Button className="w-full bg-gradient-hero hover:opacity-90">
                  {t('nav.appointment')}
                </Button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
