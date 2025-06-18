import React from 'react';


import HeroSection from '../../components/surat/HeroSection';
import AboutSection from '../../components/surat/AboutSection';
import BenefitsSection from '../../components/surat/BenefitsSection';
import HowItWorksSection from '../../components/surat/HowItWorksSection';
import TestimonialsSection from '../../components/surat/TestimonialsSection';
import LeadCaptureSection from '../../components/surat/LeadCaptureSection';
import LocalEventsSection from '../../components/surat/LocalEventsSection';
import FAQSection from '../../components/surat/FAQSection';
// import Footer from '../../components/surat/Footer';

const SuratFranchise = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "name": "EarlyJobs Surat Franchise",
    "description": "Premier recruitment and placement services in Surat",
    "url": "https://earlyjobs.in/franchise/surat",
    "logo": "https://earlyjobs.in/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395007",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.1702",
      "longitude": "72.8311"
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa 09:00-18:00",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service",
      "email": "surat@earlyjobs.in",
      "areaServed": "Surat"
    },
    "sameAs": [
      "https://www.facebook.com/earlyjobssurat",
      "https://www.linkedin.com/company/earlyjobs-surat",
      "https://www.instagram.com/earlyjobssurat"
    ]
  };

  return (
    <>
    
      
      <div className="min-h-screen bg-background">
        <HeroSection />
        <AboutSection />
        <BenefitsSection />
        <HowItWorksSection />
        {/* <TestimonialsSection /> */}
        <LeadCaptureSection />
        <LocalEventsSection />
        <FAQSection />
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default SuratFranchise;