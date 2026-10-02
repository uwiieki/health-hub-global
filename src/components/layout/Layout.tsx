import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingSocial } from './FloatingSocial';
import heroBg from '@/assets/hero-bg.webp';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative isolate flex min-h-screen flex-col">
      {/* Фон на всех страницах: закреплён и не прокручивается вместе с контентом */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 bg-background bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingSocial />
    </div>
  );
};
