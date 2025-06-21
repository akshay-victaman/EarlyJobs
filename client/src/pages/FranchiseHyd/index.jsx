import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { ArrowRight, Loader2, Shield, Clock, Award, MapPin, Phone, Mail } from 'lucide-react';
import { toast } from "react-toastify";
import HeroSection from '../../components/franchiseHYD/herosection';
import AboutSection from '../../components/franchiseHYD/AboutSection';
import emailjs from '@emailjs/browser';
import BenefitsSection from '../../components/franchiseHYD/BenefitsSection';
import LocalEvents from '../../components/franchiseHYD/LocalEvents';
import Faq from '../../components/franchiseHYD/faq';
import './Index.css';

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'student',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePhone = (phone) => {
    console.log("phone", phone);
    const cleanPhone = phone.replace(/[^\d+]/g, '').replace('+91', '');
    console.log("cleanPhone", cleanPhone);

    const phoneRegex = /^\+?\d{10,15}$/;
    
    if (!phone) {
      return 'Phone number is required';
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      return 'Enter a valid phone number with 10-digits';
    }
    
    return '';
  };

  const handlePhoneChange = (value) => {
    const raw = value.replace(/\D/g, "");
    console.log("raw", raw);
    let formatted = "+91 ";
    
    if (raw.length > 2) {
      const number = raw.slice(2);
      console.log("number", number);
      if (number.length <= 4) {
        formatted += number;
      } else {
        formatted += number.slice(0, 4) + " " + number.slice(4, 10);
      }
    }
    
    handleInputChange('phone', formatted);
    const error = validatePhone(formatted);
    setPhoneError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

console.log(formData)
    setLoading(true);

    try {
      const sendToUser = emailjs.send(
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          role: formData.role,
          branch: "Hyderabad"
        },
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY
      );

      const sendToTeam = emailjs.send(
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID_2,
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID_2,
        {
          from_name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          role: formData.role,
          Branch: "Hyderabad",
          message: formData.message,
          tomail: "hyderabad@earlyjobs.in"
        },
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY_2
      );

      await Promise.all([sendToUser, sendToTeam]);
      toast.success('Form Submitted Successfully!');
      setFormData({ name: '', email: '', phone: '', message: '', role: 'student' });
    } catch (error) {
      toast.error('Submission Failed');
      console.error('EmailJS Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Local Expertise",
      description: "Deep understanding of Hyderabad's job market and business landscape"
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

  return (
    <div className="page-container">
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <section className="how-it-works-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">Simple 3-step process to get started</p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number step-number-blue">1</div>
              <h3 className="step-title">Register</h3>
              <p className="step-description">
                Sign up with your details and specify whether you're a student, college, or employer
              </p>
            </div>
            <div className="step">
              <div className="step-number step-number-orange">2</div>
              <h3 className="step-title">Get Matched</h3>
              <p className="step-description">
                Our AI algorithm matches candidates with suitable roles or employers with qualified talent
              </p>
            </div>
            <div className="step">
              <div className="step-number step-number-green">3</div>
              <h3 className="step-title">Interview & Start</h3>
              <p className="step-description">
                Participate in interviews with our support and begin your career journey
              </p>
            </div>
          </div>
        </div>
      </section>
      <section 
        id="lead-capture" 
        style={{ 
          backgroundColor: "#B03B0F",
          padding: "2rem 1rem",
          width: "100%",
          minHeight: "100vh"
        }}
      >
        <div className="lead-capture-container">
          <div className="features-container">
            <h3 className="features-title">Join the EarlyJobs Hyderabad Network</h3>
            <p style={{ color: "#fff" }}>
              Get started today and unlock opportunities in Hyderabad's thriving job market
            </p>
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
                  <span>Comming Soon</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <a href="mailto:hyderabad@earlyjobs.in" style={{ textDecoration: "none", color: "inherit" }}>
                    hyderabad@earlyjobs.in
                  </a>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>Comming Soon</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-container">
            <h2 style={{ marginBottom: "0px" }}>Get Started Today</h2>
            <p style={{ margin: "0px" }}>Join thousands of successful candidates and employers</p>
            <form onSubmit={handleSubmit} className="form" Validate>
              <div className="form-group">
                <Label htmlFor="name" className="form-label">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className="form-input"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="phone" className="form-label">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXX XXXXXX"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  required
                  className="form-input"
                  aria-required="true"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError && (
                  <p id="phone-error" className="error-message" style={{ color: 'red', fontSize: '0.8rem' }}>
                    {phoneError}
                  </p>
                )}
              </div>
              <div className="form-group">
                <Label htmlFor="email" className="form-label">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="form-input"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="message" className="form-label">Description *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your goals or requirements"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  className="form-input"
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <Label htmlFor="role" className="form-label">I am a *</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => handleInputChange('role', value)}
                >
                  <SelectTrigger className="form-input">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student / Job Seeker">Student / Job Seeker</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="College / Placements">College / Placements</SelectItem>

                  </SelectContent>
                </Select>
              </div>
              <div className="form-group">
                <Label htmlFor="city" className="form-label">City</Label>
                <Input
                  id="city"
                  value="Hyderabad"
                  disabled
                  className="form-input"
                  aria-disabled="true"
                />
              </div>
              <Button 
                type="submit" 
                className="form-button" 
                disabled={loading || !!phoneError}
                aria-label={loading ? "Submitting form" : "Join EarlyJobs Hyderabad"}
              >
                {loading ? <Loader2 className="button-loader" /> : 'Join EarlyJobs Hyderabad'}
              </Button>
              <p className="form-note">
                By submitting this form, you agree to our{' '}
                <a className="form-note" href='/terms-and-conditions'>Terms of Service</a> and{' '}
                <a className="form-note" href='/privacy-policy'>Privacy Policy</a>
              </p>
            </form>
          </div>
        </div>
      </section>
      <LocalEvents />
      <Faq />
    </div>
  );
};

export default Index;