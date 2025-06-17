
import React, { useState } from 'react';
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Users, Briefcase, FileText, Calendar, Mail, Phone } from 'lucide-react';
import { useToast } from "../../hooks/use-toast";

const Index = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Application Submitted!",
      description: "We'll get back to you within 24 hours. Welcome to EarlyJobs Hyderabad!",
    });
    setFormData({ name: '', phone: '', email: '', role: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 text-lg font-semibold">
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
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Register for Job Support
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold transition-all duration-300">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Success Stories from Hyderabad</h2>
            <p className="text-xl text-gray-600">Real impact on careers and hiring</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">"EarlyJobs helped me land my first job at a leading tech company in HITEC City within 2 weeks of graduation. Their interview preparation was invaluable!"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    P
                  </div>
                  <div>
                    <p className="font-semibold">Priya Sharma</p>
                    <p className="text-sm text-gray-500">Software Developer, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">"We've hired 50+ quality candidates through EarlyJobs. Their pre-screening process saves us tremendous time and ensures we get the right fit."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    R
                  </div>
                  <div>
                    <p className="font-semibold">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">HR Director, InnovateTech</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4 italic">"Our college placement rate improved by 40% after partnering with EarlyJobs. They understand the local job market perfectly."</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    D
                  </div>
                  <div>
                    <p className="font-semibold">Dr. Meera Reddy</p>
                    <p className="text-sm text-gray-500">Placement Officer, Engineering College</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="mt-1"
                    />
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
                <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-semibold py-4 text-lg">
                  Join EarlyJobs Hyderabad
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
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-400">EarlyJobs Hyderabad</h3>
              <p className="text-gray-300 mb-4">Connecting fresh talent with verified opportunities in Hyderabad's dynamic job market.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297L6.391 14.426c.687.687 1.587 1.091 2.646 1.091 2.201 0 4.071-1.616 4.071-4.071S11.238 7.375 9.037 7.375c-1.059 0-1.959.404-2.646 1.091L5.125 7.201c.876-.807 2.027-1.297 3.324-1.297 3.059 0 5.529 2.469 5.529 5.529S11.508 16.988 8.449 16.988z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Job Placement</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Campus Recruitment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Employer Solutions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Skill Assessment</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-orange-400" />
                  <span>hyderabad@earlyjobs.in</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-orange-400" />
                  <span>+91 9876 543 210</span>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-1 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>HITEC City, Hyderabad, Telangana 500081</span>
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 EarlyJobs Hyderabad. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
