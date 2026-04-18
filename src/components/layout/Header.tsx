import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Search } from 'lucide-react';
import { SearchDialog } from '@/components/search/SearchDialog';
import logoImg from '@/assets/logo.png';
import logoAktobe from '@/assets/logo-aktobe.png';
import logoSport from '@/assets/logo-sport.png';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/services', label: t('nav.services') },
    { href: '/doctors', label: t('nav.doctors') },
    { href: '/news', label: t('nav.news') },
    { href: '/about', label: t('nav.about') },
    { href: '/contacts', label: t('nav.contacts') },
    { href: '/legal-acts', label: t('nav.legalActs') },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top banner with full-width logo */}
      <div className="border-b border-border/30 bg-secondary/50">
        <div className="container flex items-center justify-between py-2">
          <Link to="/" className="flex items-center gap-3 flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-shrink-0">
              <img src={logoAktobe} alt="Ақтөбе облысы" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
              <img src={logoSport} alt="Управление спорта и туризма" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
              <img src={logoImg} alt="ЦСМ Актюбинской области" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
            </div>
            <h1 className="font-display text-xs font-bold text-foreground leading-tight md:text-base lg:text-lg uppercase tracking-wide">
              Центр спортивной медицины Актюбинской области
            </h1>
          </Link>
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
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
      </div>

      <div className="container flex h-14 items-center justify-between">
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

        {/* CTA + Search */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="bg-gradient-hero hover:opacity-90 transition-opacity">
            {t('nav.appointment')}
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} aria-label="Search" className="h-9 w-9">
            <Search className="h-5 w-5" />
          </Button>
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

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};
