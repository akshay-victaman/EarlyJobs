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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
                About EarlyJobs Chandigarh
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                India's Hybrid AI + Human Recruiter Platform
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                EarlyJobs is revolutionizing recruitment with cutting-edge AI technology combined with human expertise, 
                delivering exceptional placement results across India.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                  <p className="text-gray-600">Strong placement success across multiple industries</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Support</h3>
                  <p className="text-gray-600">Dedicated Chandigarh team with walk-in facilities</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Connect</h3>
                  <p className="text-gray-600">Strong network with leading employers</p>
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
