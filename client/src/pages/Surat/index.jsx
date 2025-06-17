import React from 'react';
import { Helmet } from 'react-helmet';

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
      <Helmet>
        <title>Recruitment Franchise in Surat – EarlyJobs Hiring Platform</title>
        <meta 
          name="description" 
          content="Connect with Surat's premier recruitment franchise. EarlyJobs offers job placements, walk-in interviews, and hiring solutions for textile, diamond, and manufacturing sectors. 10,000+ successful placements." 
        />
        <meta 
          name="keywords" 
          content="recruitment franchise Surat, jobs in Surat, textile jobs Surat, manufacturing jobs Surat, diamond industry jobs, placement agency Surat, walk-in interviews Surat, career opportunities Gujarat" 
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Recruitment Franchise in Surat – EarlyJobs Hiring Platform" />
        <meta property="og:description" content="Leading recruitment franchise in Surat connecting talent with top employers. Join 10,000+ successful placements in textile, diamond, and manufacturing sectors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://earlyjobs.in/franchise/surat" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:image" content="https://earlyjobs.in/images/surat-franchise.jpg" />
        <meta property="og:site_name" content="EarlyJobs" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Recruitment Franchise in Surat – EarlyJobs" />
        <meta name="twitter:description" content="Leading recruitment solutions in Surat. Connect with top employers in textile, diamond, and manufacturing sectors." />
        <meta name="twitter:image" content="https://earlyjobs.in/images/surat-franchise.jpg" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://earlyjobs.in/franchise/surat" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="EarlyJobs" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Surat" />

        {/* Organization & Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
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