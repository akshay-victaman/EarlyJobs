import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/selectMohali";
import { Badge } from "../../components/ui/badge";
import { Users, Briefcase, Laptop, MapPin, Phone, Mail, Calendar, ArrowRight, Loader2, CheckCircle, Star, Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "react-toastify";
import FAQSection from "../../components/Mohali/faq";
import HeroSection from "../../components/Mohali/HeroSection";
import {    Shield, Clock, Award } from 'lucide-react';


import './Index.css';
import { MdWidthFull } from "react-icons/md";

const Index = () => {
  const seoData = {
    title: "EarlyJobs Mohali - Leading Job Placement & Career Development Center",
    description: "Premier recruitment agency in Mohali offering IT, biotech & manufacturing job placements. Get personalized career guidance, skill development & direct industry connections. 500+ successful placements.",
    keywords: [
      "job placement Mohali",
      "IT jobs Mohali",
      "biotech jobs Punjab",
      "manufacturing jobs Mohali",
      "career guidance Mohali",
      "recruitment agency Punjab",
      "placement services tricity",
      "fresher jobs Mohali",
      "skill development Punjab",
      "campus placement partner",
      "job consultancy Mohali",
      "IT recruitment Mohali",
      "career development center",
      "employment agency Punjab",
      "industrial jobs Mohali"
    ].join(", "),
    url: "https://earlyjobs.in/mohali",
    imageUrl: "https://earlyjobs.in/mohali/og-image.jpg"
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: ""
  });

  const [loading, setLoading] = useState(false);
  const features = [
    {
      icon: Shield,
      title: "Local Expertise",
      description: "Deep understanding of Mohali's job market and business landscape"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "24-48 hours response time for all inquiries"
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "95% placement rate with verified local employers"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
    // First email: to the user
    const sendToUser = emailjs.send(
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID,          // Your service ID
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID,         // Template ID for user
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role,
        branch:"Mohali"
      },
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY          // Public key
    );
  
    // Second email: to internal team/franchise
    const sendToTeam = emailjs.send(
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID_2,          // Same service ID (or different if needed)
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID_2, // Template ID for team notification
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        role: formData.role,
        Branch:"Mohali",
        message: "",
        tomail:"mohali@earlyjobs.in"
      },
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY_2
    );
  
    Promise.all([sendToUser, sendToTeam])
      .then(() => {
        toast.success(
          'Form Submitted Successfully!'
        );
        setFormData({ name: '', email: '', mobile: '', role: '' });
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Submission Failed'
        );
        setLoading(false);

        console.error('EmailJS Error:', error);
      });
  };

  
  

  return (
    <>
    
      <div className="index-container">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <section className="index-section">
          <div className="index-content-container">
            <div className="index-section-header">
              <Badge variant="outline" className="index-badge">About EarlyJobs Mohali</Badge>
              <h2 className="index-section-title">
                AI-Powered, <span className="text-gradient" style={{color: '#FB7B0E'}}>Human-Backed</span> Recruitment
              </h2>
              <p className="index-section-description">
                EarlyJobs is an innovative recruitment platform that supports the industrial and educational strengths of Mohali, including IT, biotech, and manufacturing sectors. Our local franchise provides personalized support and deep understanding of the regional job market.
              </p>
            </div>

            <div className="index-features-grid">
              {[
                { icon: Building2, title: "Local Expertise", desc: "Deep understanding of Mohali's business ecosystem" },
                { icon: Users, title: "Community Focus", desc: "Supporting local talent and businesses" },
                { icon: CheckCircle, title: "Proven Results", desc: "500+ successful placements this year" }
              ].map((item, i) => (
                <Card key={i} className="index-feature-card">
                  <item.icon className="index-feature-icon" style={{color: '#FB7B0E'}} />
                  <h3 className="index-feature-title">{item.title}</h3>
                  <p className="index-feature-desc">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="index-section index-benefits-section">
          <div className="index-large-container">
            <div className="index-section-header">
              <h2 className="index-section-title">
                Benefits for <span className="text-gradient">Everyone</span>
              </h2>
              <p className="index-section-subtitle">Tailored solutions for students, colleges, and employers</p>
            </div>
            
            <div className="index-benefits-grid">
              {/* Students */}
              <Card className="index-benefit-card">
                <CardHeader className="index-benefit-header index-benefit-header-primary">
                  <Users className="index-benefit-icon" />
                  <CardTitle className="index-benefit-title">For Students</CardTitle>
                  <CardDescription className="index-benefit-subtitle">Start Your Career in Mohali</CardDescription>
                </CardHeader>
                <CardContent className="index-benefit-content">
                  <ul className="index-benefit-list">
                    {[
                      "Apply for verified internships and job roles in Mohali",
                      "Resume review and career guidance",
                      "Weekly job alerts and walk-in interview updates",
                      "Free skill development workshops"
                    ].map((item, i) => (
                      <li key={i} className="index-benefit-item">
                        <CheckCircle className="index-benefit-check" />
                        <span className="index-benefit-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Colleges */}
              <Card className="index-benefit-card">
                <CardHeader className="index-benefit-header index-benefit-header-secondary">
                  <Laptop className="index-benefit-icon" />
                  <CardTitle className="index-benefit-title">For Colleges</CardTitle>
                  <CardDescription className="index-benefit-subtitle">Enhance placement outcomes</CardDescription>
                </CardHeader>
                <CardContent className="index-benefit-content">
                  <ul className="index-benefit-list">
                    {[
                      "Drive campus hiring through EarlyJobs platform",
                      "Track student placements and progress",
                      "Partner on local skill-development initiatives",
                      "Access to employer network"
                    ].map((item, i) => (
                      <li key={i} className="index-benefit-item">
                        <CheckCircle className="index-benefit-check" />
                        <span className="index-benefit-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Employers */}
              <Card className="index-benefit-card">
                <CardHeader className="index-benefit-header index-benefit-header-mixed">
                  <Briefcase className="index-benefit-icon" />
                  <CardTitle className="index-benefit-title">For Employers</CardTitle>
                  <CardDescription className="index-benefit-subtitle">Find the right talent fast</CardDescription>
                </CardHeader>
                <CardContent className="index-benefit-content">
                  <ul className="index-benefit-list">
                    {[
                      "Hire locally for roles in IT, logistics, biotech, sales",
                      "Screened candidate pool from across Mohali",
                      "Fast turnaround and zero subscription cost",
                      "Dedicated account management"
                    ].map((item, i) => (
                      <li key={i} className="index-benefit-item">
                        <CheckCircle className="index-benefit-check" />
                        <span className="index-benefit-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="index-section">
          <div className="index-content-container">
            <div className="index-section-header">
              <h2 className="index-section-title">
                How It <span className="text-gradient">Works</span>
              </h2>
              <p className="index-section-subtitle">Simple, fast, and effective</p>
            </div>
            
            <div className="index-steps-grid">
              {[
                { num: "1", title: "Register", desc: "Register on the EarlyJobs Mohali portal with your details", color: "index-step-primary",inline:"#F97415" },
                { num: "2", title: "Upload", desc: "Upload your job requirements or resume to our platform", color: "index-step-secondary",inline:"#000" },
                { num: "3", title: "Get Matched", desc: "Get matched, interviewed, and placed through our AI-powered platform", color: "index-step-gradient",inline:"#F97415" }
              ].map((step, i) => (
                <div key={i} className="index-step">
                  <div className={`index-step-number ${step.color}`} style={{backgroundColor: `${step.inline}`}}>
                    {step.num}
                  </div>
                  <h3 className="index-step-title">{step.title}</h3>
                  <p className="index-step-desc">{step.desc}</p>
                  {i < 2 && (
                    <ArrowRight className="index-step-arrow" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Capture Form */}
        <section id="lead-capture" style={{ backgroundColor: "#B03B0F" ,padding:" 2rem 1rem",
  width: "100%",
  minHeight: "100vh"}}>
      <div className="lead-capture-container">
        {/* Left Info Section */}
        <div className="features-container">
                   <h3 className="features-title">Why Choose EarlyJobs Mohali?</h3>
                   <div className="features-list">
                     {features.map((feature, index) => (
                       <div key={index} className="feature-item">
                         <div className="feature-icon-container">
                           <feature.icon className="feature-icon" />
                         </div>
                         <div>
                           <h4 className="feature-title">{feature.title}</h4>
                           <p className="feature-description">{feature.description}</p>
                         </div>
                       </div>
                     ))}
                   </div>
       
                   <div className="contact-info">
                     <h4 className="contact-title">Get in Touch</h4>
                     <div className="contact-items">
                       <div className="contact-item">
                         <Phone className="contact-icon" />
                         <span>+91 9056283266 , +91- 172-4561836</span>
                       </div>
                       <div className="contact-item">
                         <Mail className="contact-icon" />
                         <a href="mailto:mohali@earlyjobs.in" style={{ textDecoration: "none", color: "inherit" }}>mohali@earlyjobs.in</a>
                       </div>
                       <div className="contact-item">
                         <MapPin className="contact-icon" />
                         <span>Mohali, SaS Nagar, 5.2, Cabin, Fifth floor, E 260 BA, phase 8B industrial Area</span>
                       </div>
                     </div>
                   </div>
                 </div>

        {/* Right Form Section */}
        <div className="form-container">
          <h2 style={{marginBottom:"0px",}}>Get Started Today</h2>
          <p style={{margin:"0px",}}>Join thousands of successful candidates and employers</p>
          <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name *</label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
  <label htmlFor="phone" className="form-label">Phone Number *</label>
  <Input
    id="phone"
    type="tel"
    placeholder="+91 XXXX XXXXXX"
    value={formData.mobile}
    onChange={(e) => {
      const raw = e.target.value.replace(/\D/g, ""); // remove non-digits
      let formatted = "+91 ";

      if (raw.length > 2) {
        const number = raw.slice(2); // skip the '91' if user typed manually
        if (number.length <= 4) {
          formatted += number;
        } else {
          formatted += number.slice(0, 4) + " " + number.slice(4, 10);
        }
      }

      setFormData({ ...formData, mobile: formatted });
    }}
    required
    className="form-input"
  />
</div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address *</label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <Input
            id="description"
            placeholder="Tell us about your goals or requirements"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="form-label">I am a *</label>
          <Select onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger className="form-input">
              <SelectValue placeholder="Student / Job Seeker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student / Job Seeker</SelectItem>
              <SelectItem value="employer">Employer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="form-group">
          <label htmlFor="city" className="form-label">City</label>
          <Input
            id="city"
            value="Mohali"
            disabled
            className="form-input"
          />
        </div>
        <Button type="submit" className="form-button">
          {loading ? <Loader2 className="button-loader" /> : 'Join EarlyJobs Mohali'}
        </Button>
        <p className="form-note">
          By submitting this form, you agree to our<a className="form-note" href='/terms-and-conditions'>Terms of Service </a>and<a className="form-note" href='/privacy-policy'> Privacy Policy</a>

          </p>
      </form>
        </div>
      </div>
    </section>


        {/* Events Section */}
        <section className="events-section">
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-title">
            Upcoming <span className="highlight">Events & Updates</span>
          </h2>
          <p className="events-subtitle">Stay connected with the latest opportunities</p>
        </div>
        
        <div className="events-grid">
          {[
            { badge: "Job Drive", title: "Mohali IT Job Fair 2024", desc: "Join us for the biggest IT job fair in Mohali with 50+ companies hiring.", status: "Coming Soon", icon: Briefcase },
            { badge: "Partnership", title: "College Tie-up Program", desc: "Expanding our network with local engineering and management colleges.", status: "Ongoing", icon: Building2 },
            { badge: "Skill Session", title: "Resume Building Workshop", desc: "Free workshop on creating industry-ready resumes for freshers.", status: "Every Saturday", icon: Calendar }
          ].map((event, i) => (
            <div key={i} className="event-card">
              <div className="card-header">
                <div className="header-content">
                  <span className="badge">{event.badge}</span>
                  <event.icon className="icon" />
                </div>
                <h3 className="card-title">{event.title}</h3>
              </div>
              <div className="card-content">
                <p className="card-description">{event.desc}</p>
                <span className="status-badge">{event.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

        {/* FAQ Section */}
        <FAQSection/>

        {/* Footer */}
      </div>
    </>
  );
};

export default Index;
