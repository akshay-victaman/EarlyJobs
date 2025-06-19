
import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import {  ArrowRight, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";
import HeroSection from '../../components/franchiseHYD/herosection';
import AboutSection from '../../components/franchiseHYD/AboutSection';
import emailjs from '@emailjs/browser';
import BenefitsSection from '../../components/franchiseHYD/BenefitsSection';
import LocalEvents from '../../components/franchiseHYD/LocalEvents';
import Faq from '../../components/franchiseHYD/faq';


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
    // Remove any non-digit characters except + for country code
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    
    // Basic validation: 
    // - Should start with optional + followed by country code
    // - Should have 10 digits for the main number
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
  
    // First email: to the user
    const sendToUser = emailjs.send(
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID,          // Your service ID
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID,         // Template ID for user
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        role: formData.role,
        branch:"Hyderabad"
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
        mobile: formData.phone,
        role: formData.role,
        Branch:"Hyderabad",
        message: formData.message,
        tomail:"hyderabad@earlyjobs.in"
      },
      process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY_2
    );
  
    Promise.all([sendToUser, sendToTeam])
      .then(() => {
        toast.success(
          'Form Submitted Successfully!'
        );
        setFormData({ name: '', email: '', phone: '', message: '', role: '' });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
     <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 3-step process to get started</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-semibold mb-4">Register</h3>
              <p className="text-gray-600">Sign up with your details and specify whether you're a student, college, or employer</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-semibold mb-4">Get Matched</h3>
              <p className="text-gray-600">Our AI algorithm matches candidates with suitable roles or employers with qualified talent</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-semibold mb-4">Interview & Start</h3>
              <p className="text-gray-600">Participate in interviews with our support and begin your career journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
     

      {/* Lead Capture Form */}
      <section id="hyd-lead-capture" className="py-20 bg-gradient-to-r from-blue-900 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">Join the EarlyJobs Hyderabad Network</h2>
            <p className="text-xl text-blue-100">Get started today and unlock opportunities in Hyderabad's thriving job market</p>
          </div>
          <Card className="bg-white text-gray-900">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                  <Label htmlFor="phone" className="text-sm font-medium">
        Phone Number *
      </Label>
      <Input
        id="phone"
        inputMode="numeric"
        pattern="[0-9]*"
        type="number"
        value={formData.phone}
        onChange={(e) => handlePhoneChange(e.target.value)}
        onBlur={(e) => handlePhoneChange(e.target.value)} // Validate on blur too
        placeholder="+91 XXXXX XXXXX"
        required
        className={`mt-1 ${phoneError ? 'border-red-500' : ''}`}
        aria-invalid={phoneError ? 'true' : 'false'}
        aria-describedby={phoneError ? 'phone-error' : undefined}
      />
      {phoneError && (
        <span
          id="phone-error"
          className="mt-1 text-sm text-red-500"
          role="alert"
        >
          {phoneError}
        </span>
      )}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="role" className="text-sm font-medium">I am a *</Label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                      <SelectTrigger className="mt-1">
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
                <div>
                  <Label htmlFor="message" className="text-sm font-medium">Tell us about your requirements (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Share your specific needs, preferred job roles, or hiring requirements..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button type="submit" size="lg" className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-semibold py-4 text-lg">
                  
                  {loading ? <Loader2 className="index-form-button-loader" /> : <div className="flex items-center gap-2"><span className="index-form-button-text">Join EarlyJobs Hyderabad</span>
                                      <ArrowRight className="index-form-button-icon" /></div> }
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Local Events */}
      <LocalEvents />
   

      {/* FAQs */}
    
        <Faq />
      {/* Footer */}

    </div>
  );
};

export default Index;
