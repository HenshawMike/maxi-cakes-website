import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import CakeShowcase from "@/components/CakeShowcase";
import AboutBaker from "@/components/AboutBaker";
import HowToOrder from "@/components/HowToOrder";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import FloatingSearch from "@/components/FloatingSearch";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <CakeShowcase />
      <AboutBaker />
      <HowToOrder />
      <ContactCTA />
      <Footer />
      <FloatingSearch />
    </main>
  );
};

export default Index;
