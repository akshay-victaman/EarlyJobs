import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Users, Building2, GraduationCap, MapPin, Phone, Mail, ArrowRight, CheckCircle, Star, Calendar, Clock, Trophy } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import HeroSection from '../../components/chandigarh/HeroSection';
import BenefitsSection from '../../components/chandigarh/BenefitsSection';
import HowItWorksSection from '../../components/chandigarh/HowItWorksSection';
import TestimonialsSection from '../../components/chandigarh/TestimonialsSection';
import LeadCaptureForm from '../../components/chandigarh/LeadCaptureForm';
import EventsSection from '../../components/chandigarh/EventsSection';
import FAQSection from '../../components/chandigarh/FAQSection';
// import Footer from '../../components/chandigarh/Footer';
import './ChandigarhFranchise.css';

const ChandigarhFranchise = () => {
  return (
    <>
      <Helmet>
        <title>EarlyJobs Chandigarh | AI-Powered Career & Recruitment Solutions</title>
        <meta 
          name="description" 
          content="Connect with top employers in Chandigarh through EarlyJobs' AI-powered recruitment platform. Find internships, jobs, and hiring solutions for students, colleges, and businesses."
        />
        <meta 
          name="keywords" 
          content="Chandigarh jobs, career opportunities, recruitment platform, internships Chandigarh, placement services, hiring solutions, college placements, AI recruitment"
        />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="EarlyJobs Chandigarh - Career & Recruitment Hub" />
        <meta 
          property="og:description" 
          content="Leading AI-powered recruitment platform in Chandigarh connecting talented students with top employers. Find your next career opportunity today."
        />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh" />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />

        {/* Schema.org Organization Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EarlyJobs Chandigarh",
            "description": "AI-powered recruitment platform connecting talent with opportunities in Chandigarh",
            "url": "https://yourwebsite.com/chandigarh",
            "logo": "https://yourwebsite.com/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chandigarh",
              "addressRegion": "CH",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://facebook.com/earlyjobschandigarh",
              "https://instagram.com/earlyjobschandigarh"
            ]
          })}
        </script>

        {/* Schema.org WebSite Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EarlyJobs Chandigarh",
            "url": "https://yourwebsite.com/chandigarh",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://yourwebsite.com/chandigarh/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
       

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <section className="chandigarh-about-section">
      <div className="chandigarh-about-container">
        <div className="chandigarh-about-content">
          <Badge className="chandigarh-about-badge">
            About EarlyJobs Chandigarh
          </Badge>
          <h2 className="chandigarh-about-title">
            India's Hybrid AI + Human Recruiter Platform
          </h2>
          <p className="chandigarh-about-description">
            EarlyJobs is revolutionizing recruitment with cutting-edge AI technology combined with human expertise, 
            delivering exceptional placement results across India.
          </p>
          
          <div className="chandigarh-about-grid">
            <div className="chandigarh-about-item">
              <div className="chandigarh-about-icon-container">
                <Trophy className="chandigarh-about-icon" />
              </div>
              <h3 className="chandigarh-about-item-title">Proven Track Record</h3>
              <p className="chandigarh-about-item-text">Strong placement success across multiple industries</p>
            </div>
            <div className="chandigarh-about-item">
              <div className="chandigarh-about-icon-container">
                <Users className="chandigarh-about-icon" />
              </div>
              <h3 className="chandigarh-about-item-title">Local Support</h3>
              <p className="chandigarh-about-item-text">Dedicated Chandigarh team with walk-in facilities</p>
            </div>
            <div className="chandigarh-about-item">
              <div className="chandigarh-about-icon-container">
                <Building2 className="chandigarh-about-icon" />
              </div>
              <h3 className="chandigarh-about-item-title">Industry Connect</h3>
              <p className="chandigarh-about-item-text">Strong network with leading employers</p>
            </div>
          </div>
        </div>
      </div>
    </section>

        {/* Benefits Section */}
        <BenefitsSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Testimonials Section */}
        {/* <TestimonialsSection /> */}

        {/* Lead Capture Form */}
        <LeadCaptureForm />

        {/* Events Section */}
        <EventsSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default ChandigarhFranchise;
