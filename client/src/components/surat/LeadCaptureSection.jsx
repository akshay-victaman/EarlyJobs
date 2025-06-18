import React, { useState, useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
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
    city: 'Surat'
  });

  const { toast } = useToast();

  useEffect(() => {
    emailjs.init('Kma5s8neZCz3p5D_M');
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
      await emailjs.send('service_j199ycr', 'template_n2wafca', adminTemplateParams);
      await emailjs.send('service_j199ycr', 'template_od85g0k', userTemplateParams);

      toast({
        title: "Your form is submitted successfully",
        description: "We'll contact you within 24 hours to discuss opportunities in Surat."
      });
      alert("Your form is submitted successfully! We'll contact you within 24 hours.");

      setFormData({
        name: '',
        phone: '',
        email: '',
        description: '',
        type: 'student',
        city: 'Surat'
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
      description: "Deep understanding of Surat's job market and business landscape"
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
    <>
   

      <section id="lead-capture" className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 bg-gradient-to-r from-orange-500 to-orange-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 sm:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
              Join the EarlyJobs Surat Network
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto px-2">
              Take the first step towards your career goals or hiring needs with Surat's most trusted recruitment partner
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center lg:text-left">
                Why Choose EarlyJobs Surat?
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 group p-2 sm:p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base sm:text-lg mb-1">{feature.title}</h4>
                      <p className="text-white/80 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-white/20">
                <h4 className="font-semibold text-white mb-3 sm:mb-4 text-base sm:text-lg">Get in Touch</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-sm sm:text-base">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>+91 9377337833</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-sm sm:text-base">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>surat@earlyjobs.in</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-white/90 text-sm sm:text-base">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>228, Magnus Shopping Mall, Nr. Althan Shopping Mall, Althan, Surat-395017</span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-lg sm:shadow-2xl">
              <CardHeader className="text-center pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-xl font-bold">Get Started Today</CardTitle>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  Join thousands of successful candidates and employers
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                      className="h-10 sm:h-12 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 XXXXX XXXXX"
                      required
                      className="h-10 sm:h-12 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                      className="h-10 sm:h-12 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Tell us about your goals or requirements"
                      required
                      className="h-20 sm:h-24 border-gray-200 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">I am a: *</Label>
                    <RadioGroup
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                      className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2 sm:gap-3"
                    >
                      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student" className="font-medium text-sm">
                          Student / Job Seeker
                        </Label>
                      </div>
                      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto">
                        <RadioGroupItem value="college" id="college" />
                        <Label htmlFor="college" className="font-medium text-sm">
                          College Representative
                        </Label>
                      </div>
                      <div className="flex items-center gap-2 border rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors w-full sm:w-auto">
                        <RadioGroupItem value="employer" id="employer" />
                        <Label htmlFor="employer" className="font-medium text-sm">
                          Employer / HR
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-medium">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      readOnly
                      className="h-10 sm:h-12 bg-gray-50 border-gray-200"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-2 sm:py-3 text-sm sm:text-base font-semibold  rounded-lg mt-4" style={{backgroundColor: "#FF6F00", color: "#FFFFFF"}}
                  >
                    Join EarlyJobs Surat
                  </Button>

                  <p className="text-[10px] sm:text-xs text-center text-muted-foreground mt-2">
                    By submitting this form, you agree to our Terms of Service and Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadCaptureSection;