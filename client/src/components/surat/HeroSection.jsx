// src/components/HeroSection.jsx
import React from 'react';
// import { Helmet } from 'react-helmet-async';

import { Button } from '../../components/ui/button';
import { MapPin, Users, Briefcase, ArrowRight, Star } from 'lucide-react';

const HeroSection = () => {
  const scrollToLeadForm = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      

      <section className="relative min-h-[90vh] md:min-h-screen bg-gradient-to-br from-orange-600 via-orange-700 to-indigo-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center" style={{marginTop:"47px"}}>
            {/* Left Column - Content */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 transition-transform hover:scale-105">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="text-sm font-medium">Trusted by 1,500+ Students</span>
              </div>

              {/* Heading */}
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                  Unlock Career & Hiring Opportunities in{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Surat
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Bridging Surat's skilled youth with top employers – job-ready talent, verified openings, local impact.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6">
                <div className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" aria-hidden="true" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">Local</div>
                  <div className="text-xs sm:text-sm text-white/80">Surat Based</div>
                </div>
                <div className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" aria-hidden="true" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">1,500+</div>
                  <div className="text-xs sm:text-sm text-white/80">Students Placed</div>
                </div>
                <div className="text-center group">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" aria-hidden="true" />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold">55+</div>
                  <div className="text-xs sm:text-sm text-white/80">Employer Partners</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
  <Button
    size="lg"
    onClick={scrollToLeadForm}
    className="group bg-white text-orange-600 hover:bg-orange-50 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-5 h-auto font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out flex items-center"
    aria-label="Get Started in Surat Today"
    style={{marginLeft:"7px"}}
  >
    Get Started in Surat Today
    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" aria-hidden="true" />
  </Button>
</div>

            </div>

            {/* Right Column - Image */}
            <div className="hidden md:block relative">
              <img
                src="https://i.ibb.co/99B1J22v/Hiring-amico.png"
                alt="Hiring Illustration"
                className="w-full h-auto max-w-md mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;