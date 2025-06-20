import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { ArrowRight, Loader2 } from 'lucide-react';
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
    role: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    const phoneRegex = /^\+?\d{10,15}$/;
    
    if (!phone) {
      return 'Phone number is required';
    }
    
    if (!phoneRegex.test(cleanPhone)) {
      return 'Enter a valid phone number';
    }
    
    return '';
  };

  const handlePhoneChange = (value) => {
    handleInputChange('phone', value);
    const error = validatePhone(value);
    setPhoneError(error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
  
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
  
    Promise.all([sendToUser, sendToTeam])
      .then(() => {
        toast.success('Form Submitted Successfully!');
        setFormData({ name: '', email: '', phone: '', message: '', role: '' });
        setLoading(false);
      })
      .catch((error) => {
        toast.error('Submission Failed');
        setLoading(false);
        console.error('EmailJS Error:', error);
      });
  };

  return (
    <div className="page-container">
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <section className="how-it-works-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">
              How It Works
            </h2>
            <p className="section-description">
              Simple 3-step process to get started
            </p>
          </div>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number step-number-blue">
                1
              </div>
              <h3 className="step-title">
                Register
              </h3>
              <p className="step-description">
                Sign up with your details and specify whether you're a student, college, or employer
              </p>
            </div>
            <div className="step">
              <div className="step-number step-number-orange">
                2
              </div>
              <h3 className="step-title">
                Get Matched
              </h3>
              <p className="step-description">
                Our AI algorithm matches candidates with suitable roles or employers with qualified talent
              </p>
            </div>
            <div className="step">
              <div className="step-number step-number-green">
                3
              </div>
              <h3 className="step-title">
                Interview & Start
              </h3>
              <p className="step-description">
                Participate in interviews with our support and begin your career journey
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="hyd-lead-capture" className="lead-capture-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title" style={{ color: 'white' }}>
              Join the EarlyJobs Hyderabad Network
            </h2>
            <p className="section-description" style={{ color: '#D2D2D2' }}>
              Get started today and unlock opportunities in Hyderabad's thriving job market
            </p>
          </div>
          <Card className="form-card">
            <CardContent className="form-content">
              <form onSubmit={handleSubmit} className="form">
                <div className="form-grid">
                  <div className="form-group">
                    <Label htmlFor="name" className="form-label">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="phone" className="form-label">Phone Number *</Label>
                    <Input
                      id="phone"
                      inputMode="numeric"
                      value={formData.phone}
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
                  
                        handlePhoneChange(formatted)
                      }}
                      
                      onBlur={(e) => handlePhoneChange(e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className={`form-input ${phoneError ? 'input-error' : ''}`}
                      aria-invalid={phoneError ? 'true' : 'false'}
                      aria-describedby={phoneError ? 'phone-error' : undefined}
                    />
                    {phoneError && (
                      <span id="phone-error" className="error-message" role="alert">
                        {phoneError}
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <Label htmlFor="email" className="form-label">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="role" className="form-label">I am a *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="form-select">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student/Graduate</SelectItem>
                        <SelectItem value="college">College/Institution</SelectItem>
                        <SelectItem value="employer">Employer/Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="form-group">
                  <Label htmlFor="message" className="form-label">Tell us about your requirements (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Share your specific needs, preferred job roles, or hiring requirements..."
                    className="form-textarea"
                    rows={4}
                  />
                </div>
                <Button type="submit" className="submit-button">
                  {loading ? <Loader2 className="button-loader" /> : (
                    <div className="button-content">
                      <span className="button-text" style={{ color: 'white' }}>Join EarlyJobs Hyderabad</span>
                      <ArrowRight className="button-icon" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      <LocalEvents />
      <Faq />
    </div>
  );
};

export default Index;