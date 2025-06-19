
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowRight, MapPin, Users } from 'lucide-react';

import './HeroSection.css';

const HeroSection = () => {
  const seoData = {
    title: "EarlyJobs Mohali - Premier Recruitment & Career Development Partner",
    description: "Connect with Mohali's leading placement agency for IT, biotech, and manufacturing sectors. 500+ successful placements, personalized career guidance, and direct industry connections.",
    keywords: [
      "Mohali jobs",
      "IT placement agency Mohali",
      "career development Punjab",
      "recruitment services Mohali",
      "biotech jobs Punjab",
      "manufacturing jobs Mohali",
      "fresher jobs Mohali",
      "placement agency tricity",
      "job consultancy Mohali",
      "career guidance Punjab"
    ].join(", ")
  };

  const scrollToLeadForm = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
     

      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-text">
                <Badge className="hero-badge">
                  <MapPin className="hero-badge-icon" />
                  Mohali's Trusted Recruitment Partner
                </Badge>
                <h1 className="hero-title">
                  EarlyJobs 
                  <span className="hero-title-gradient" style={{paddingLeft: '1rem'}}>
                           Mohali
                  </span>
                </h1>
                <p className="hero-subtitle">
                  Your Local Partner in Hiring and Career Growth
                </p>
                <p className="hero-description">
                  Connecting Mohali's job-ready talent with the region's fastest-growing industries and employers across IT, biotech, and manufacturing sectors.
                </p>
              </div>
              
              <div className="hero-buttons">
                <Button 
                  size="lg" 
                  onClick={scrollToLeadForm}
                  className="hero-cta-button"
                >
                  Start with EarlyJobs Mohali
                  <ArrowRight className="hero-cta-icon" />
                </Button>
              </div>

              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-avatars">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="hero-avatar">
                        <Users className="hero-avatar-icon" />
                      </div>
                    ))}
                  </div>
                  <div className="hero-stat-text">
                    <p className="hero-stat-number">
                      500+ Students Placed
                    </p>
                    <p className="hero-stat-period">This Year</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="hero-image-container">
              <div className="hero-image-glow"></div>
              <img 
                src="https://i.ibb.co/N2xbPqKn/Resume-folder-pana.png" 
                alt="Mohali professionals"
                className="hero-image"
                loading="lazy"
              />
              <div className="hero-image-overlay"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
