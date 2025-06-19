import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>EarlyJobs - India's Leading Career Platform | Jobs & Internships</title>
        <meta 
          name="description" 
          content="EarlyJobs connects talent with opportunities across India. Find jobs, internships, and career growth opportunities with leading employers nationwide."
        />
        <meta 
          name="keywords" 
          content="EarlyJobs India, job portal, career opportunities, internships, placement services, job search India, career platform, employment"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="EarlyJobs - Connect with Career Opportunities" />
        <meta 
          property="og:description" 
          content="India's premier career platform connecting talent with opportunities. Find your next career move with EarlyJobs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:url" content="https://yourwebsite.com" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://yourwebsite.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Organization Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EarlyJobs",
            "url": "https://yourwebsite.com",
            "logo": "https://yourwebsite.com/logo.png",
            "description": "India's leading career platform connecting talent with opportunities",
            "sameAs": [
              "https://www.facebook.com/earlyjobs",
              "https://www.linkedin.com/company/earlyjobs",
              "https://www.instagram.com/earlyjobs"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXX-XXXXX",
              "contactType": "customer service",
              "email": "contact@earlyjobs.in",
              "areaServed": "IN"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            EarlyJobs
          </h1>
          <p className="text-xl text-muted-foreground">
            Connecting talent with opportunities across India
          </p>
          
          <div className="space-y-4">
            <Link to="/earlyjobs/franchise/surat">
              <Button size="lg" className="w-full md:w-auto">
                Visit Surat Franchise
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
