// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Users, Building2,  Trophy } from 'lucide-react';
import HeroSection from '../../components/chandigarh/HeroSection';
import BenefitsSection from '../../components/chandigarh/BenefitsSection';
import HowItWorksSection from '../../components/chandigarh/HowItWorksSection';
import LeadCaptureForm from '../../components/chandigarh/LeadCaptureForm';
import EventsSection from '../../components/chandigarh/EventsSection';
import FAQSection from '../../components/chandigarh/FAQSection';
// import Footer from '../../components/chandigarh/Footer';
import './ChandigarhFranchise.css';

const ChandigarhFranchise = () => {
  return (
    <>
      

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
