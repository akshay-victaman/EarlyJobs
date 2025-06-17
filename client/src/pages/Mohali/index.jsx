import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/selectMohali";
import { Badge } from "../../components/ui/badge";
import { Users, Briefcase, Laptop, MapPin, Phone, Mail, Calendar, ArrowRight, CheckCircle, Star, Building2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import FAQSection from "../../components/Mohali/faq";
import Footer from "../../components/Mohali/footer"; 
import HeroSection from "../../components/Mohali/HeroSection";
import { Helmet } from 'react-helmet';
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
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Form Submitted Successfully!",
      description: "We'll contact you within 24 hours.",
    });
    setFormData({ name: "", email: "", mobile: "", role: "" });
  };

  return (
    <>
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        
        {/* Essential Meta Tags */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="EarlyJobs Mohali" />
        <link rel="canonical" href={seoData.url} />

        {/* OpenGraph Tags */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoData.url} />
        <meta property="og:image" content={seoData.imageUrl} />
        <meta property="og:site_name" content="EarlyJobs Mohali" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        <meta name="twitter:image" content={seoData.imageUrl} />

        {/* Geo Tags */}
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Mohali" />
        <meta name="geo.position" content="30.704649;76.717873" />
        <meta name="ICBM" content="30.704649, 76.717873" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EarlyJobs Mohali",
            "url": seoData.url,
            "logo": "https://earlyjobs.in/mohali/logo.png",
            "description": seoData.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sector 80",
              "addressLocality": "Mohali",
              "addressRegion": "Punjab",
              "postalCode": "160080",
              "addressCountry": "IN"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["en", "hi", "pa"]
            },
            "sameAs": [
              "https://facebook.com/earlyjobsmohali",
              "https://instagram.com/earlyjobsmohali",
              "https://linkedin.com/company/earlyjobs-mohali"
            ]
          })}
        </script>

        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EmploymentAgency",
            "name": "EarlyJobs Mohali",
            "serviceType": ["Job Placement", "Career Guidance", "Skill Development"],
            "areaServed": {
              "@type": "City",
              "name": "Mohali"
            },
            "provider": {
              "@type": "Organization",
              "name": "EarlyJobs Mohali"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": ["Job Seekers", "Students", "Employers"]
            }
          })}
        </script>
      </Helmet>

      <div className="index-container">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <section className="index-section">
          <div className="index-content-container">
            <div className="index-section-header">
              <Badge variant="outline" className="index-badge">About EarlyJobs Mohali</Badge>
              <h2 className="index-section-title">
                AI-Powered, <span className="text-gradient">Human-Backed</span> Recruitment
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
                  <item.icon className="index-feature-icon" />
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
                  <CardDescription className="index-benefit-subtitle">Launch your career in Mohali</CardDescription>
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
                { num: "1", title: "Register", desc: "Register on the EarlyJobs Mohali portal with your details", color: "index-step-primary" },
                { num: "2", title: "Upload", desc: "Upload your job requirements or resume to our platform", color: "index-step-secondary" },
                { num: "3", title: "Get Matched", desc: "Get matched, interviewed, and placed through our AI-powered platform", color: "index-step-gradient" }
              ].map((step, i) => (
                <div key={i} className="index-step">
                  <div className={`index-step-number ${step.color}`}>
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
        <section id="lead-capture" className="index-section index-form-section">
          <div className="index-form-container">
            <Card className="index-form-card">
              <CardHeader className="index-form-header" style={{ display: "flex", flexDirection: "column",alignItems: "center",justifyContent: "center", padding: "1rem 2rem"  }}>
                <div >
                <CardTitle className="index-form-title">
                  Connect with <span className="text-gradient">EarlyJobs Mohali</span>
                </CardTitle>
                </div>
                <div>
                <CardDescription className="index-form-description">
                  Ready to start your journey? Fill out the form below and we'll get in touch with you within 24 hours.
                </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="index-form-content">
                <form onSubmit={handleSubmit} className="index-form">
                  <Input
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="index-form-input"
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="index-form-input"
                  />
                  <Input
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    required
                    className="index-form-input"
                  />
                  <Select onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger className="index-form-input">
                      <SelectValue placeholder="Choose Your Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="college">College Representative</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input value="Mohali" disabled className="index-form-input index-form-input-disabled" />
                  <Button type="submit" className="index-form-button">
                    <span className="index-form-button-text">EarlyJobs Mohali</span>
                    <ArrowRight className="index-form-button-icon" />
                  </Button>
                </form>
              </CardContent>
            </Card>
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
        <Footer />
      </div>
    </>
  );
};

export default Index;
