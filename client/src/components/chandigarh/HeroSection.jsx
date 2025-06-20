import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { MapPin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import './HeroSection.css';

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
        
        <meta property="og:title" content="Chandigarh Career Hub - Connect Talent with Leading Employers" />
        <meta property="og:description" content="Find internships and jobs in Chandigarh. Connect talented students with top employers. 500+ students placed, 50+ partner companies, and 15+ college partnerships." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh" />
        <meta property="og:image" content="https://i.ibb.co/XfXc43ZV/New-employee-pana.png" />
        
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />
        <link rel="canonical" href="https://yourwebsite.com/chandigarh" />
      </Helmet>

      <section className="chandigarh-hero-section">
        <div className="chandigarh-hero-background"></div>
        <div className="chandigarh-hero-container">
          <div className="chandigarh-hero-grid">
            <div className="chandigarh-hero-content">
              <div className="chandigarh-hero-text">
                <Badge className="chandigarh-hero-badge">
                  <MapPin className="chandigarh-hero-badge-icon" />
                  Chandigarh Franchise
                </Badge>
                <h1 className="chandigarh-hero-title">
                  Connecting Chandigarh's{' '}
                  <span className="chandigarh-hero-title-highlight">
                    Bright Talent
                  </span>{' '}
                  with Leading Employers
                </h1>
                <p className="chandigarh-hero-subtitle">
                  Internships, jobs, and hiring solutions for Chandigarh students, colleges, and businesses — all in one place.
                </p>
              </div>

              <div className="chandigarh-hero-actions">
                <Button 
                  size="lg" 
                  className="chandigarh-hero-cta-button"
                  onClick={scrollToLeadForm}
                >
                  Get Started in Chandigarh Today
                </Button>
              </div>
              
              <div className="chandigarh-hero-stats">
                <div className="chandigarh-stat-item">
                  <div className="chandigarh-stat-number">500+</div>
                  <div className="chandigarh-stat-label">Students Placed</div>
                </div>
                <div className="chandigarh-stat-item">
                  <div className="chandigarh-stat-number">50+</div>
                  <div className="chandigarh-stat-label">Partner Companies</div>
                </div>
                <div className="chandigarh-stat-item">
                  <div className="chandigarh-stat-number">15+</div>
                  <div className="chandigarh-stat-label">College Partners</div>
                </div>
              </div>
            </div>

            <div className="chandigarh-hero-image">
              <div className="chandigarh-hero-image-container">
                <img src="https://i.ibb.co/Gvg9yJ2R/Connecting-teams-pana.png" alt="New employee" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;