import React from 'react';
import { Button } from '../ui/button';
import { Star, ArrowRight } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const scrollToLeadForm = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="background-pattern">
        <div className="pattern-overlay" />
      </div>

      <div className="container">
        <div className="content-grid">
          <div className="content-left">
            <div className="trust-badge">
              <Star className="star-icon" aria-hidden="true" />
              <span>Trusted by 1,500+ Students</span>
            </div>

            <div className="heading-group">
              <h1 className="main-heading">
                Unlock Career & Hiring Opportunities in{' '}
                <span className="highlight">Surat</span>
              </h1>
              <p className="sub-heading">
                Bridging Surat's skilled youth with top employers – job-ready talent, verified openings, local impact.
              </p>
            </div>
               
               <div className="surat-hero-actions">
              <Button 
                size="lg" 
                className="surat-hero-cta-button"
                onClick={scrollToLeadForm}
              >
                Get Started in Surat Today
              </Button>
            </div>

           </div>

          {/* <div className="image-container"> */}
            <img
              src="https://i.ibb.co/99B1J22v/Hiring-amico.png"
              alt="Hiring Illustration"
              className="hero-image"
              loading="lazy"
            />
          {/* </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;