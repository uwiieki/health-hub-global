import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CycleSection } from '@/components/home/CycleSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { DoctorsSection } from '@/components/home/DoctorsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { ContactSection } from '@/components/home/ContactSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <CycleSection />
      <DoctorsSection />
      <ServicesSection />
      <NewsSection />
      <ContactSection />
    </Layout>
  );
};

export default Index;
