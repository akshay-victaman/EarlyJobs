import React from 'react';
import { ArrowRight, Check, Award, Brain, Lightbulb, TrendingUp, Earth, Rocket, Users, File } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../hooks/use-toast';

const EarlyJobsLandingPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    profession: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessionChange = (value) => {
    setFormData(prev => ({ ...prev, profession: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      
      toast({
        title: "Application Submitted!",
        description: "Our team will contact you within 24 hours.",
      });
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        profession: ''
      });
    }, 1500);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      question: "Do I need HR experience?",
      answer: "No, prior HR experience is not required. We provide comprehensive training on recruitment, operations, and sales processes. Our step-by-step training program covers everything you need to know to run a successful EarlyJobs franchise."
    },
    {
      question: "How much can I earn?",
      answer: "Franchise earnings vary based on location and performance but typically range between ₹3-6.5 lakhs per month after 6-9 months of operation. This includes commissions from placements (70% fixed hire, 50% CTC-based), candidate assessments (70%), and new company onboarding bonuses (5%)."
    },
    {
      question: "What is the franchise fee?",
      answer: "The standard franchise deposit is ₹2 lakhs. However, under our current limited-time offer, we're offering a 50% risk-sharing model with a reduced deposit of just ₹1 lakh for the first 10 sign-ups."
    },
    {
      question: "Do I need an office?",
      answer: "A physical office space of 200-400 sq ft is preferred for Tier 1 cities to establish a professional brand presence. In Tier 2/3 cities, you can start with a home office setup and scale as your business grows."
    },
    {
      question: "What support is provided?",
      answer: "We provide comprehensive support including: technology platform access (CRM, ATS), quality job leads, extensive training modules, marketing materials and campaigns, a nationwide community of franchise owners, and dedicated success managers to help you grow."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Your Interest",
      description: "Fill out our application form to express interest"
    },
    {
      number: "02",
      title: "Application & Call",
      description: "Review your application and discuss opportunities"
    },
    {
      number: "03",
      title: "Agreement & Deposit",
      description: "Complete documentation and secure your territory"
    },
    {
      number: "04",
      title: "Onboarding & Training",
      description: "Comprehensive training program for success"
    },
    {
      number: "05",
      title: "Franchise Launch",
      description: "Grand opening with marketing support"
    },
    {
      number: "06",
      title: "Ongoing Support & Growth",
      description: "Regular check-ins and business development"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      quote: "I earned back my investment in just 4 months. The EarlyJobs platform and training made everything so much easier than I expected.",
      image: "https://via.placeholder.com/100?text=Priya"
    },
    {
      name: "Rajesh Kumar",
      location: "Pune",
      quote: "EarlyJobs gave me the platform to start my own recruitment agency. Their tech platform and support team are exceptional.",
      image: "https://via.placeholder.com/100?text=Rajesh"
    },
    {
      name: "Ananya Patel",
      location: "Bangalore",
      quote: "I'm proud to support women in my city through hiring. My franchise is not just profitable but also making a real social impact.",
      image: "https://via.placeholder.com/100?text=Ananya"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden bg-gradient-to-br from-white via-white to-ejobs-gray-light">
        {/* Orange diagonal shape in background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-ejobs-orange transform -rotate-6 translate-x-1/3 -translate-y-1/4 z-0 opacity-10"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your Own <span className="text-ejobs-orange">Recruitment Business</span> with EarlyJobs <Rocket className="inline-block h-8 w-8 text-ejobs-orange" />
              </h1>
              
              <p className="text-xl md:text-2xl text-ejobs-black-light">
                Join India's fastest-growing HRTech platform and launch a high-ROI franchise in your city
              </p>
              
              <div className="pt-4">
                <Button 
                  onClick={scrollToContact}
                  className="btn-primary text-lg group"
                >
                  Start Your Franchise Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              
              <div className="pt-8 border-t border-gray-200 mt-8">
                <p className="text-sm font-medium text-gray-500 mb-4">AS SEEN IN</p>
                <div className="flex flex-wrap items-center gap-6">
                  <img src="https://via.placeholder.com/120x40?text=BusinessStandard" alt="Business Standard" className="h-8 grayscale hover:grayscale-0 transition-all" />
                  <img src="https://via.placeholder.com/120x40?text=FranchiseIndia" alt="Franchise India" className="h-8 grayscale hover:grayscale-0 transition-all" />
                  <img src="https://via.placeholder.com/120x40?text=YourStory" alt="YourStory" className="h-8 grayscale hover:grayscale-0 transition-all" />
                </div>
                
                <p className="text-sm font-medium text-gray-500 mt-6 mb-3">TRUSTED BY</p>
                <div className="flex flex-wrap items-center gap-5">
                  <img src="https://via.placeholder.com/80x25?text=Flipkart" alt="Flipkart" className="h-6 grayscale hover:grayscale-0 transition-all" />
                  <span className="text-gray-300">|</span>
                  <img src="https://via.placeholder.com/80x25?text=StarHealth" alt="Star Health" className="h-6 grayscale hover:grayscale-0 transition-all" />
                  <span className="text-gray-300">|</span>
                  <img src="https://via.placeholder.com/80x25?text=Frankfinn" alt="Frankfinn" className="h-6 grayscale hover:grayscale-0 transition-all" />
                  <span className="text-gray-300">|</span>
                  <img src="https://via.placeholder.com/80x25?text=HDFC" alt="HDFC" className="h-6 grayscale hover:grayscale-0 transition-all" />
                </div>
              </div>
            </div>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-ejobs-orange/20 to-transparent z-10"></div>
              <img 
                src="https://via.placeholder.com/600x400?text=Franchisee+Success" 
                alt="Franchisee Success" 
                className="w-full h-auto object-cover rounded-xl" 
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white z-20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-ejobs-orange rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 12.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 1 0v7a.5.5 0 0 1-.5.5Z"/>
                      <path d="M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5Z"/>
                    </svg>
                  </div>
                  <span className="font-medium">Watch Success Story</span>
                </div>
                <h3 className="text-xl font-semibold">How Shalini built a ₹7L/month franchise in Pune</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="section bg-ejobs-gray-light">
        <div className="container">
          <h2 className="section-heading text-center">Hiring is Broken. We're Fixing It.</h2>
          
          <p className="text-lg text-center max-w-4xl mx-auto mb-12">
            Startups and enterprises struggle with costly, slow hiring. At the same time, thousands of HR professionals, especially women, want flexible work opportunities. EarlyJobs bridges this gap with a tech-powered freelance recruiter model — and now you can run your own recruitment hub under our brand.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="stat-card">
              <div className="bg-ejobs-orange/10 p-3 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-ejobs-orange" />
              </div>
              <h3 className="text-3xl font-bold text-ejobs-black mb-1">₹50,000 Cr+</h3>
              <p className="text-ejobs-black-light">Recruitment Industry</p>
            </div>
            
            <div className="stat-card">
              <div className="bg-ejobs-orange/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-ejobs-orange" />
              </div>
              <h3 className="text-3xl font-bold text-ejobs-black mb-1">1,300+</h3>
              <p className="text-ejobs-black-light">Hires Done in 12 Months</p>
            </div>
            
            <div className="stat-card">
              <div className="bg-ejobs-orange/10 p-3 rounded-full mb-4">
                <Users className="h-8 w-8 text-ejobs-orange" />
              </div>
              <h3 className="text-3xl font-bold text-ejobs-black mb-1">80%</h3>
              <p className="text-ejobs-black-light">of Recruiters are Women</p>
            </div>
            
            <div className="stat-card">
              <div className="bg-ejobs-orange/10 p-3 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-ejobs-orange" />
              </div>
              <h3 className="text-3xl font-bold text-ejobs-black mb-1">50+</h3>
              <p className="text-ejobs-black-light">Top Companies Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why EarlyJobs Franchise Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-heading text-center">Why Franchise with EarlyJobs?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="bg-ejobs-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-ejobs-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Model</h3>
              <p className="text-ejobs-black-light">Built-in success — 200+ recruiters onboarded, 50+ clients</p>
            </div>
            
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="bg-ejobs-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-ejobs-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">No HR Experience Needed</h3>
              <p className="text-ejobs-black-light">We train you on hiring, operations & sales</p>
            </div>
            
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="bg-ejobs-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-ejobs-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Low Setup, High ROI</h3>
              <p className="text-ejobs-black-light">Start with just ₹1L deposit + minimal infra</p>
            </div>
            
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="bg-ejobs-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-ejobs-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Recurring Monthly Income</h3>
              <p className="text-ejobs-black-light">Earn from placements, assessments & partnerships</p>
            </div>
            
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="bg-ejobs-orange/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Earth className="h-6 w-6 text-ejobs-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Impact</h3>
              <p className="text-ejobs-black-light">Empower job seekers & drive hiring locally</p>
            </div>
            
            <div className="card hover:scale-105 transition-transform duration-300 text-center p-8 bg-gradient-to-r from-ejobs-orange/20 to-ejobs-orange/5">
              <h3 className="text-xl font-bold mb-2">Ready to Join?</h3>
              <p className="text-ejobs-black-light mb-4">Limited territories available. Secure yours now.</p>
              <Button onClick={scrollToContact} className="btn-outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Earning Model */}
      <section id="earnings" className="section bg-ejobs-gray-light">
        <div className="container">
          <h2 className="section-heading text-center">Real Earnings. Real Opportunity.</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-12">
            <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-ejobs-orange">
              <h3 className="text-2xl font-bold mb-6">You Earn When Hires Happen</h3>
              
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium text-lg">Fixed Hiring (per hire)</p>
                    <p className="text-sm text-gray-600">Standard industry placement</p>
                  </div>
                  <span className="text-xl font-bold text-ejobs-orange">70% commission</span>
                </div>
                
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium text-lg">% of CTC Hiring</p>
                    <p className="text-sm text-gray-600">Premium placement model</p>
                  </div>
                  <span className="text-xl font-bold text-ejobs-orange">50% commission</span>
                </div>
                
                <div className="flex items-center justify-between pb-3 border-b">
                  <div>
                    <p className="font-medium text-lg">New Company Onboarding</p>
                    <p className="text-sm text-gray-600">For bringing new clients</p>
                  </div>
                  <span className="text-xl font-bold text-ejobs-orange">5% bonus</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-lg">Candidate Assessment</p>
                    <p className="text-sm text-gray-600">Pre-hiring testing</p>
                  </div>
                  <span className="text-xl font-bold text-ejobs-orange">70% (net)</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-ejobs-black p-8 rounded-lg text-white mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">Estimated Monthly Income</h3>
                  <span className="text-3xl font-bold text-ejobs-orange">₹6–6.5 Lakhs</span>
                </div>
                
                <p className="text-sm text-gray-300 mb-6">Based on average franchise activity after 6 months</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-ejobs-orange rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>10-15 placements per month</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-ejobs-orange rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>20+ assessments conducted</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-ejobs-orange rounded-full p-1 mr-3">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>5+ active client relationships</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-ejobs-orange to-ejobs-orange-dark p-6 rounded-lg text-white text-center">
                <h3 className="text-xl font-bold mb-2">Break-even in just 6–9 months ✅</h3>
                <p>Quick return on your franchise investment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Requirements */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-heading text-center">What You Need to Get Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-ejobs-orange/10 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-ejobs-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Office Space</h3>
              </div>
              <p className="text-ejobs-black-light">200–400 sq ft (or home office in Tier 2/3 cities)</p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-ejobs-orange/10 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-ejobs-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Infrastructure</h3>
              </div>
              <p className="text-ejobs-black-light">Laptop, broadband connection, phone</p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-ejobs-orange/10 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-ejobs-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Branding</h3>
              </div>
              <p className="text-ejobs-black-light">EarlyJobs signage, CRM & marketing kit</p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-ejobs-orange/10 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-ejobs-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Franchise Deposit</h3>
              </div>
              <p className="text-ejobs-black-light">₹1 lakh (limited-time 50% risk-sharing offer)</p>
            </div>
            
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="bg-ejobs-orange/10 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-ejobs-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Total Setup</h3>
              </div>
              <p className="text-ejobs-black-light">₹3–5 lakhs (including working capital)</p>
            </div>
            
            <div className="card bg-ejobs-orange/5 border border-ejobs-orange/20">
              <div className="flex items-center mb-4">
                <div className="bg-ejobs-orange/10 p-2 rounded-full mr-3">
                  <svg className="h-6 w-6 text-ejobs-orange" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Quick Setup</h3>
              </div>
              <p className="text-ejobs-black-light">We help you get started within 30 days of agreement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-ejobs-gray-light">
        <div className="container">
          <h2 className="section-heading text-center">Our Partners Are Growing Fast</h2>
          
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="w-full">
              <div>
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                      <div className="flex items-center mb-4">
                        <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                        <div>
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                      <div className="mb-3">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        ))}
                      </div>
                      <p className="text-ejobs-black-light italic flex-grow">"{testimonial.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-8 gap-2">
                <button className="relative inset-0 translate-y-0">Previous</button>
                <button className="relative inset-0 translate-y-0">Next</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limited-Time Offer Banner */}
      <section className="py-12 bg-ejobs-orange relative overflow-hidden">
        <div className="absolute -right-24 top-0 bottom-0 w-96 bg-ejobs-orange-dark/30 transform rotate-12"></div>
        
        <div className="container relative">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Launch Offer for Franchise India Expo Visitors 🎉
                </h2>
                <p className="text-white/80 mb-4">Only for first 10 sign-ups:</p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="bg-white rounded-full p-1 mr-2">
                      <Check className="h-4 w-4 text-ejobs-orange" />
                    </div>
                    <span className="text-white">50% risk sharing (₹1L deposit instead of ₹2L)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white rounded-full p-1 mr-2">
                      <Check className="h-4 w-4 text-ejobs-orange" />
                    </div>
                    <span className="text-white">Marketing & branding support from HQ</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white rounded-full p-1 mr-2">
                      <Check className="h-4 w-4 text-ejobs-orange" />
                    </div>
                    <span className="text-white">Dedicated success manager for 6 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-white rounded-full p-1 mr-2">
                      <Check className="h-4 w-4 text-ejobs-orange" />
                    </div>
                    <span className="text-white">Free access to CRM + hiring leads</span>
                  </div>
                </div>
                
                <div className="mt-6 text-white text-sm">
                  <span className="font-semibold">Act fast —</span> Offer valid till May 20, 2025 ⏳
                </div>
              </div>
              
              <Button 
                onClick={scrollToContact}
                className="bg-white text-ejobs-orange hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-md"
              >
                Apply for Franchise Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Roadmap */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-heading text-center">From Application to Launch – We're With You</h2>
          
          <div className="mt-12 relative">
            {/* Timeline connector (desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-ejobs-orange/20 -translate-x-1/2"></div>
            
            <div className="space-y-12 md:space-y-0 relative">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className={`md:grid md:grid-cols-2 gap-8 md:gap-16 relative md:mb-20 ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot (desktop) */}
                  <div className="hidden md:block absolute left-1/2 top-8 w-6 h-6 bg-ejobs-orange rounded-full -translate-x-1/2 z-10"></div>
                  
                  {/* Step content */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:col-start-1' : 'md:col-start-2'} flex md:block items-start`}>
                    {/* Step number (mobile) */}
                    <div className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-ejobs-orange text-white flex items-center justify-center font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    
                    <div>
                      <span className="hidden md:inline-block text-3xl font-bold text-ejobs-orange/30 mb-2">
                        STEP {step.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{step.title}</h3>
                      <p className="text-ejobs-black-light">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Empty cell to maintain grid structure */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1'}`}></div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button onClick={scrollToContact} className="btn-primary">Book Intro Call</Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faq" className="section bg-ejobs-gray-light">
        <div className="container">
          <h2 className="section-heading text-center">Frequently Asked Questions</h2>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button className="px-6 py-4 hover:bg-gray-50 hover:no-underline group">
                    <span className="text-left font-medium text-lg group-hover:text-ejobs-orange">{faq.question}</span>
                  </button>
                  <div className="px-6 py-4 text-ejobs-black-light">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="contact" className="section bg-gradient-to-b from-ejobs-black to-ejobs-black-light text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ready to Launch Your Franchise?</h2>
            <p className="text-xl md:text-2xl mb-12 text-center text-gray-300">Submit your details and our team will connect with you</p>
            
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-black">Full Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-black">Phone Number</Label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-black">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-black">City / District</Label>
                    <Input 
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      required
                      className="border-gray-300"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="profession" className="text-black">Current Profession</Label>
                    <Select onValueChange={handleProfessionChange} value={formData.profession}>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hr">HR Professional</SelectItem>
                        <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                        <SelectItem value="corporate">Corporate Employee</SelectItem>
                        <SelectItem value="freelancer">Freelancer</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button 
                    type="submit"
                    className="w-full bg-ejobs-orange hover:bg-ejobs-orange-dark text-white text-lg py-6 rounded-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Apply for Franchise
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="mt-4 text-center text-gray-500 text-sm">
                  Or call us directly at <a href="tel:+911234567890" className="text-ejobs-orange font-medium">+91 12345 67890</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ejobs-black text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">EarlyJobs Franchise</h3>
              <p className="text-gray-400 mb-4">Join India's fastest-growing recruitment franchise network.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white hover:underline">About EarlyJobs</a></li>
                <li><a href="#earnings" className="text-gray-400 hover:text-white hover:underline">Earning Model</a></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white hover:underline">FAQs</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white hover:underline">Apply Now</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white hover:underline">Success Stories</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-ejobs-orange mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-400">
                    EarlyJobs HQ, WeWork Galaxy,<br/>
                    Residency Rd, Bangalore 560025
                  </span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-ejobs-orange mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-400">+91 12345 67890</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-6 w-6 text-ejobs-orange mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-400">franchise@earlyjobs.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EarlyJobs. All rights reserved. <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a> | <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EarlyJobsLandingPage;