import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { DoctorsSection } from '@/components/home/DoctorsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ContactSection } from '@/components/home/ContactSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <DoctorsSection />
      <NewsSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
