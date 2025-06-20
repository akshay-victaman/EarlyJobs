import React, { useState, useEffect } from 'react';
import './LeadCaptureForm.css';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useToast } from '../../hooks/use-toast';
import { MapPin, Phone, Mail, Shield, Clock, Award } from 'lucide-react';
import emailjs from '@emailjs/browser';

const LeadCaptureSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
    type: 'student',
    city: 'Chandigarh'
  });

  const { toast } = useToast();

  useEffect(() => {
    console.log('EmailJS initialized with account key:', process.env.REACT_APP_FRANCHISE_Chandigarh_EMAILJS_ACCOUNT_KEY);
    emailjs.init(`${process.env.REACT_APP_FRANCHISE_CHANDIGHAR_EMAILJS_ACCOUNT_KEY}`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.description) {
      toast({
        title: "Please fill all required fields",
        variant: "destructive"
      });
      alert("Please fill all required fields.");
      return;
    }

    const adminTemplateParams = {
      from_name: formData.name,
      mobile: formData.phone,
      email: formData.email,
      description: formData.description,
      type: formData.type,
      city: formData.city
    };

    const userTemplateParams = {
      email: formData.email,
      from_name: formData.name,
      type: formData.type,
      city: formData.city
    };

    try {
      await emailjs.send(
        `${process.env.REACT_APP_FRANCHISE_CHANDIGHAR_EMAILJS_SERVICE_ID}`,
        `${process.env.REACT_APP_FRANCHISE_CHANDIGHAR_EMAILJS_TEMPLATE_ID}`,
        adminTemplateParams
      );
      await emailjs.send(
        `${process.env.REACT_APP_FRANCHISE_CHANDIGHAR_EMAILJS_SERVICE_ID}`,
        `${process.env.REACT_APP_FRANCHISE_CHANDIGHAR_EMAILJS_TEMPLATE_ID_2}`,
        userTemplateParams
      );

      toast({
        title: "Your form is submitted successfully",
        description: "We'll contact you within 24 hours to discuss opportunities in Chandigarh."
      });
      alert("Your form is submitted successfully! We'll contact you within 24 hours.");

      setFormData({
        name: '',
        phone: '',
        email: '',
        description: '',
        type: 'student',
        city: 'Chandigarh'
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive"
      });
      alert("Submission failed. Please try again.");
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Local Expertise",
      description: "Deep understanding of Chandigarh's job market and business landscape"
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
    <section id="lead-capture" className="lead-capture-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Join the EarlyJobs Chandigarh Network</h2>
          <p className="section-subtitle">
            Take the first step towards your career goals or hiring needs with Chandigarh's most trusted recruitment partner
          </p>
        </div>

        <div className="grid-container">
          <div className="features-container">
            <h3 className="features-title">Why Choose EarlyJobs Chandigarh?</h3>
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
                  <span>+91 9872874150
</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>Chandigarh@earlyjobs.in</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span> Cabin 411, SCO 107/08/09, Sector 34A, Chandigarh.

</span>
                </div>
              </div>
            </div>
          </div>

          <Card className="form-card">
            <CardHeader className="form-header">
              <CardTitle className="form-title">Get Started Today</CardTitle>
              <p className="form-subtitle">Join thousands of successful candidates and employers</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                  <Label htmlFor="name" className="form-label">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="phone" className="form-label">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
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
                
                        setFormData({ ...formData, phone: formatted })
                      
                    }}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="email" className="form-label">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="description" className="form-label">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Tell us about your goals or requirements"
                    required
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="type" className="form-label">I am a: *</Label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                    className="form-select"
                  >
                    <option value="student">Student / Job Seeker</option>
                    <option value="college">College Representative</option>
                    <option value="employer">Employer / HR</option>
                  </select>
                </div>

                <div className="form-group">
                  <Label htmlFor="city" className="form-label">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    readOnly
                    className="form-input readonly"
                  />
                </div>

                <Button type="submit" className="submit-button" style={{ border: '0px' }}>
                  Join EarlyJobs Chandigarh
                </Button>

                <p className="form-footer">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;