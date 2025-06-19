import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const HeroSection = () => {
   const scrollToLeadForm = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <>
      <Helmet>
        <title>Chandigarh Career Hub - Connect Talent with Leading Employers</title>
        <meta name="description" content="Find internships and jobs in Chandigarh. Connect talented students with top employers. 500+ students placed, 50+ partner companies, and 15+ college partnerships." />
        <meta name="keywords" content="Chandigarh jobs, internships Chandigarh, career opportunities, student placements, job portal Chandigarh, employment services, college recruitment, corporate hiring" />
        
        {/* Open Graph / Social Media Meta Tags */}
        <meta property="og:title" content="Chandigarh Career Hub - Connect Talent with Leading Employers" />
        <meta property="og:description" content="Find internships and jobs in Chandigarh. Connect talented students with top employers. 500+ students placed, 50+ partner companies, and 15+ college partnerships." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh" />
        <meta property="og:image" content="https://i.ibb.co/XfXc43ZV/New-employee-pana.png" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />
        <link rel="canonical" href="https://yourwebsite.com/chandigarh" />
      </Helmet>

      <section className="pt-10 pb-16 relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8" style={{ marginTop: '67px' }}>
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                  <MapPin className="w-4 h-4 mr-2" />
                  Chandigarh Franchise
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Connecting Chandigarh's{' '}
                  <span className="bg-gradient-to-r from-white text-white-200 to-amber-500 bg-clip-text text-transparent">
                    Bright Talent
                  </span>{' '}
                  with Leading Employers
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Internships, jobs, and hiring solutions for Chandigarh students, colleges, and businesses — all in one place.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white px-8 py-6 text-lg"
                  onClick={scrollToLeadForm}
                >
                  Get Started in Chandigarh Today
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">500+</div>
                  <div className="text-sm text-gray-600">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15+</div>
                  <div className="text-sm text-gray-600">College Partners</div>
                </div>
              </div>
            </div>

           <div className="relative hidden md:block">
  <div className="relative z-10">
    <img src="https://i.ibb.co/XfXc43ZV/New-employee-pana.png" alt="New employee" />
  </div>
</div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;