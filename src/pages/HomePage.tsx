import HeroSection from '../components/home/HeroSection';
import FeaturedSection from '../components/home/FeaturedSection';
import CategoriesSection from '../components/home/CategoriesSection';
import HowToBuySection from '../components/home/HowToBuySection';
import BenefitsSection from '../components/home/BenefitsSection';
import TrustSection from '../components/home/TrustSection';
import FAQSection from '../components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <HowToBuySection />
      <BenefitsSection />
      <TrustSection />
      <FAQSection />
    </>
  );
}
