
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

      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-text">
                <Badge className="hero-badge">
                  <MapPin className="hero-badge-icon" />
                  Chandigarh Franchise
                </Badge>
                <h1 className="hero-title">
                  Connecting Chandigarh's{' '}
                  <span className="hero-title-highlight">
                    Bright Talent
                  </span>{' '}
                  with Leading Employers
                </h1>
                <p className="hero-subtitle">
                  Internships, jobs, and hiring solutions for Chandigarh students, colleges, and businesses — all in one place.
                </p>
              </div>

              <div className="hero-actions">
                <Button 
                  size="lg" 
                  className="hero-cta-button"
                  onClick={scrollToLeadForm}
                >
                  Get Started in Chandigarh Today
                </Button>
              </div>
              
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Students Placed</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Partner Companies</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">College Partners</div>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <div className="hero-image-container">
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
