import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react';
import logoImg from '@/assets/logo.png';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoImg} alt="СМЦ Актюбинской области" className="h-10 w-10 rounded-lg object-contain" />
              <div>
                <h3 className="font-display text-sm font-semibold text-foreground leading-tight">Спортивный медицинский центр</h3>
                <p className="text-xs text-muted-foreground">Актюбинской области</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('hero.subtitle').slice(0, 120)}...
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {t('nav.services')}
            </h4>
            <ul className="space-y-2">
              {['Терапия', 'Кардиология', 'Неврология', 'Педиатрия', 'Стоматология'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to="/services"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {t('contact.title')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  г. Алматы, ул. Абая 150, офис 25
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a
                  href="tel:+77771234567"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +7 (777) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a
                  href="mailto:info@medicare.kz"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  info@medicare.kz
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <div className="text-sm text-muted-foreground">
                  <p>Пн-Пт: 08:00 - 20:00</p>
                  <p>Сб: 09:00 - 18:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-lg font-semibold text-foreground">
              {t('nav.about')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('nav.doctors')}
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contacts"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t('nav.contacts')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 СМЦ Актюбинской области. {t('footer.rights')}.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {t('footer.privacy')}
            </Link>
            <Link
              to="/terms"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
