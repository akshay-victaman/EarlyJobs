import React from 'react';
import { Button } from '../../components/ui/button';
import { MapPin, Users, Briefcase, ArrowRight, Star } from 'lucide-react';
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

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <MapPin aria-hidden="true" />
                </div>
                <div className="stat-value">Local</div>
                <div className="stat-label">Surat Based</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Users aria-hidden="true" />
                </div>
                <div className="stat-value">1,500+</div>
                <div className="stat-label">Students Placed</div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Briefcase aria-hidden="true" />
                </div>
                <div className="stat-value">55+</div>
                <div className="stat-label">Employer Partners</div>
              </div>
            </div>

            <div className="cta-container">
              <Button 
                size="lg"
                onClick={scrollToLeadForm}
                className="cta-button"
                aria-label="Get Started in Surat Today"
              >
                Get Started in Surat Today
                <ArrowRight className="arrow-icon" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="image-container">
            <img
              src="https://i.ibb.co/99B1J22v/Hiring-amico.png"
              alt="Hiring Illustration"
              className="hero-image"
              loading="lazy"
            />
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;