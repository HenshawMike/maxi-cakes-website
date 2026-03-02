import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import CakeShowcase from "@/components/CakeShowcase";
import HowToOrder from "@/components/HowToOrder";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import FloatingOrder from "@/components/FloatingOrder";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <StickyHeader />
      <HeroSection />
      <CakeShowcase />
      {/* <AboutBaker /> */}
      <HowToOrder />
      <ContactCTA />
      <Footer />
      <FloatingOrder />
    </main>
  );
};

export default Index;
