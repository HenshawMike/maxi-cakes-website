import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import CakeShowcase from "@/components/CakeShowcase";
import HowToOrder from "@/components/HowToOrder";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import FloatingOrder from "@/components/FloatingOrder";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "MAXI CAKES 'N' PASTERIES",
    "image": "https://maxis-cakes.netlify.app/og-image.jpg",
    "@id": "https://maxis-cakes.netlify.app",
    "url": "https://maxis-cakes.netlify.app",
    "telephone": "+2348036774032",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "",
      "addressRegion": "",
      "postalCode": "",
      "addressCountry": "NG"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
