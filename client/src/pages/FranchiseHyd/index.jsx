
import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Users, Briefcase, FileText, Calendar, Mail, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from "react-toastify";

import emailjs from '@emailjs/browser';


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
      'service_janwchj',          // Your service ID
      'template_apw8avr',         // Template ID for user
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        role: formData.role,
        branch:"Hyderabad"
      },
      '2RjsnTyaAMM2p9XuO'          // Public key
    );
  
    // Second email: to internal team/franchise
    const sendToTeam = emailjs.send(
      'service_34t30rm',          // Same service ID (or different if needed)
      'template_nuf3iuz', // Template ID for team notification
      {
        from_name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        role: formData.role,
        Branch:"Hyderabad",
        message: formData.message,
        tomail:"hyderabad@earlyjobs.in"
      },
      'k0U3GoVuaDmIxqwmP'
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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
          <Badge
  className="border border-orange-500  text-orange-500 bg-transparent px-6 py-2 text-[16px]  font-semibold
    hover:bg-orange-500 hover:text-white
    transition duration-300 ease-in-out
    shadow-[0_0_20px_rgba(255,115,0,0.9)]
    hover:shadow-[0_0_10px_rgba(255,115,0,0.6)]" 
    style={{ backgroundColor: 'transparent', color: 'orange' }}
>
  🚀 Now in Hyderabad - India's Cyberabad
</Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Gateway to Career Success in{' '}
              <span className="text-orange-400">Hyderabad</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-blue-100">
              EarlyJobs connects fresh talent with verified opportunities across Hyderabad's booming tech and business landscape. From HITEC City startups to established enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-orange-500 rounded-xl hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Register for Job Support
              </Button>
              <Button size="lg" variant="outline" className="border-white rounded-xl text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold transition-all duration-300">
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why EarlyJobs Chose Hyderabad</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Hyderabad stands as India's technology powerhouse, home to global tech giants, innovative startups, and world-class educational institutions. Our franchise brings EarlyJobs' proven recruitment methodology to this dynamic ecosystem, connecting the city's abundant fresh talent with its thriving job market.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">50,000+</CardTitle>
                <CardDescription>Students & Graduates Connected</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">500+</CardTitle>
                <CardDescription>Partner Companies in Hyderabad</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">95%</CardTitle>
                <CardDescription>Placement Success Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Benefits for Everyone</h2>
            <p className="text-xl text-gray-600">Tailored solutions for students, colleges, and employers</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Students */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="bg-blue-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <Users className="w-6 h-6 mr-3" />
                  For Students
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Verified job opportunities across Hyderabad</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Walk-in interview support and guidance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>AI-powered skill assessment tests</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Resume building and interview preparation</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <p>Direct connection with HR teams</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Colleges */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="bg-orange-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <FileText className="w-6 h-6 mr-3" />
                  For Colleges
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <p>MoU partnerships for placement drives</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <p>Dedicated placement coordination</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <p>Industry connect programs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <p>Campus recruitment events</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <p>Student progress tracking</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employers */}
            <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle className="text-2xl flex items-center">
                  <Briefcase className="w-6 h-6 mr-3" />
                  For Employers
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p>Local hiring with curated candidates</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p>Pre-screened talent pool</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p>CRM tools for recruitment</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p>Reduced hiring time and costs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <p>Quality assurance on hires</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gradient-to-r from-blue-900 to-orange-600 text-white">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Upcoming Events in Hyderabad</h2>
            <p className="text-xl text-gray-600">Join our job fairs, recruitment drives, and networking events</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                  <Badge className="bg-blue-100 text-blue-800">Job Fair</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">HITEC City Tech Job Fair</h3>
                <p className="text-gray-600 mb-4">Connect with 50+ leading tech companies hiring for immediate positions</p>
                <p className="text-sm text-gray-500">Date: Coming Soon | Location: HITEC City Convention Center</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-orange-600 mr-3" />
                  <Badge className="bg-orange-100 text-orange-800">Campus Drive</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Engineering Campus Drives</h3>
                <p className="text-gray-600 mb-4">Exclusive recruitment drives across top engineering colleges</p>
                <p className="text-sm text-gray-500">Date: Monthly | Location: Partner Colleges</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-6 h-6 text-green-600 mr-3" />
                  <Badge className="bg-green-100 text-green-800">Networking</Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">Employer Connect Sessions</h3>
                <p className="text-gray-600 mb-4">Direct interaction between students and hiring managers</p>
                <p className="text-sm text-gray-500">Date: Weekly | Location: EarlyJobs Hyderabad Office</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about EarlyJobs Hyderabad</p>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Where is the EarlyJobs Hyderabad office located?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our franchise office is strategically located in HITEC City, making it easily accessible from all major areas of Hyderabad including Gachibowli, Kondapur, and Madhapur.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are the eligibility criteria for students?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We welcome final year students and recent graduates from all streams - Engineering, MBA, BCA, B.Com, and more. No minimum percentage requirement, just the willingness to work and grow.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are your support hours?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our team is available Monday to Saturday, 9:00 AM to 7:00 PM. We also provide 24/7 online support through our portal and WhatsApp helpline.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you charge any fees from students?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No, our services are completely free for students and job seekers. We earn through our partnerships with employers who pay us for successful placements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}

    </div>
  );
};

export default Index;
