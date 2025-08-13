import { useState } from 'react';
import { 
  MapPin, 
  Users, 
  Building2, 
  GraduationCap, 
  CheckCircle, 
  Phone, 
  Calendar,
  ArrowRight,
  Target,
  ChevronDown,
  Mail
} from 'lucide-react';
import chennaiHero from '../assets/chennai-hero.jpg';


const FranchiseChennai= () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'student',
    industry: ''
  });

  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // SheetDB integration - Column names: Name, Email, Phone, Type, Industry
    const apiUrl = 'https://sheetdb.io/api/v1/oecojg84o37sy'; // Replace with your actual SheetDB API URL
    const postData = {
      data: [{
        Name: formData.name,
        Email: formData.email,
        Phone: formData.phone,
        Type: formData.type,
        Industry: formData.industry,
        Timestamp:new Date().toISOString()
      }]
    };

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      setModalMessage('Successfully registered!');
      setIsSuccess(true);
      setShowModal(true);
      // Optionally reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        type: 'student',
        industry: ''
      });
    })
    .catch(error => {
      console.error('Error:', error);
      setModalMessage('Error registering. Please try again.');
      setIsSuccess(false);
      setShowModal(true);
    });
  };

  const handleScrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "For Students",
      description: "Verified jobs, internships, and training programs",
      points: ["Campus placements", "Industry training", "Skill development", "Career guidance"]
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "For Colleges", 
      description: "Strong placement tie-ups and industry connections",
      points: ["100% placement support", "Industry partnerships", "Faculty training", "Student mentoring"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "For Companies",
      description: "Access to trained local talent pool",
      points: ["Pre-screened candidates", "Local expertise", "Quick hiring", "Cultural fit"]
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Register on EarlyJobs Chennai portal with your details"
    },
    {
      number: "02", 
      title: "Get Matched",
      description: "Our AI matches you with perfect opportunities available in portal"
    },
    {
      number: "03",
      title: "Start Your Career",
      description: "Attend interviews and join top companies in Chennai"
    }
  ];

  const events = [
    {
      date: "Dec 15",
      title: "Chennai IT Job Fair 2024",
      location: "Chennai Trade Centre",
      companies: "50+ Companies"
    },
    {
      date: "Dec 20",
      title: "Anna University Campus Drive",
      location: "Anna University Campus",
      companies: "25+ Companies"
    },
  ];

  const faqs = [
    {
      question: "Which industries are most active in Chennai recruitment?",
      answer: "Chennai's major industries include IT/Software, Automobile (TVS, Hyundai), Healthcare, Banking, and Manufacturing. We have strong connections across all these sectors."
    },
    {
      question: "Do you support Tamil language preferences?",
      answer: "Yes! While most corporate roles require English, we help match candidates with companies that value bilingual skills and cultural understanding."
    },
    {
      question: "What about transportation and commute support?",
      answer: "We consider location preferences and provide guidance on Chennai's transport system. Many of our partner companies offer transportation facilities."
    },
    {
      question: "Are there opportunities for freshers from local colleges?",
      answer: "Absolutely! We work closely with Anna University, SRM, VIT Chennai, and other local institutions for campus placements and internships."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${chennaiHero})` }}
        />
        <div className="absolute inset-0 bg-blue-800/70" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 ">
              Shaping Careers in <span className="text-[#E6C637]">Chennai</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Connect, Learn, and Grow with EarlyJobs - Chennai's trusted bridge between talent and top recruiters
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={handleScrollToContact}
                className="px-8 py-4 bg-[#F97316] text-white text-lg font-semibold rounded-lg shadow-sm hover:bg-orange-600"
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
              <button className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 text-lg font-semibold rounded-lg btn-hover transition-bounce backdrop-blur-sm">
                <Phone className="mr-2 w-5 h-5 inline" />
                Talk to Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              EarlyJobs <span className="text-[#F97316]">Chennai</span>
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                As Chennai's premier recruitment franchise, we understand the pulse of this vibrant city. From the bustling IT corridors of OMR to the industrial excellence of Ambattur, we connect Chennai's brightest minds with opportunities that matter.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                With deep roots in Tamil Nadu's educational excellence and strong partnerships with Chennai's leading employers, we're not just a job portal - we're your career <em>velai</em> (work) partners.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center shadow-lg rounded-lg bg-[#F97316]/10 p-4">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">1500+</h3>
                  <p className="text-muted-foreground">Jobs Placed</p>
                </div>
                <div className="text-center shadow-lg rounded-lg bg-[#F97316]/10 p-4">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">50+</h3>
                  <p className="text-muted-foreground">Partner Companies</p>
                </div>
                <div className="text-center shadow-lg rounded-lg bg-[#F97316]/10 p-4">
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">10+</h3>
                  <p className="text-muted-foreground">College Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Why Choose <span className="text-primary">EarlyJobs Chennai?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored solutions for students, colleges, and companies in Chennai's dynamic job market
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border-l-4 border-orange-600 ">
                <div className="w-16 h-16 bg-[#F97316]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#F97316]/20 transition-smooth text-primary">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{benefit.title}</h3>
                <p className="text-muted-foreground mb-6">{benefit.description}</p>
                <ul className="space-y-3">
                  {benefit.points.map((point, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-success mr-3 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your journey to success in Chennai's job market starts here
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-[#F97316] rounded-full flex items-center justify-center mx-auto text-primary-foreground text-2xl font-bold shadow-elegant group-hover:scale-110 transition-bounce">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-primary/20" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="contact" className="py-20 bg-[#F97316]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Be Part of <span className="text-primary">EarlyJobs Chennai</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to transform your career journey? Join thousands of Chennai professionals who trust EarlyJobs.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <div >
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition-smooth"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition-smooth"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition-smooth"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">I am a</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition-smooth"
                  >
                    <option value="student">Student</option>
                    <option value="college">College Representative</option>
                    <option value="company">Company/HR</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] transition-smooth"
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="IT/Software">IT/Software</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Banking">Banking</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#F97316] text-white text-lg font-semibold rounded-lg btn-hover transition-bounce shadow-elegant"
              >
                Join EarlyJobs Chennai
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Local Events */}
      <section id="events" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Upcoming <span className="text-primary">Chennai Events</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Don't miss these exciting opportunities to connect with top employers and advance your career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <div key={index} className="bg-[#F97316]/20 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-smooth group">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#F97316]/40 rounded-lg px-3 py-1">
                    <span className="text-primary font-semibold text-sm">{event.date}</span>
                  </div>
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth">
                  {event.title}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.companies}</span>
                  </div>
                </div>
                <button className="mt-4 w-full py-2 bg-[#F97316]/50 text-white rounded-lg hover:bg-primary hover:text-primary-foreground transition-smooth">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked <span className="text-[#F97316]">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about careers and opportunities in Chennai
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-background rounded-lg border border-border overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#F97316]/10 transition"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold text-foreground">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground transition-smooth ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4 bg-[#F97316]/10">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Contact <span className="text-[#F97316]">EarlyJobs Chennai</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Reach out to our Chennai franchise team for any queries or support. We're here to help you succeed!
            </p>
          </div>

          <div className="flex bg-[#F97316]/10  justify-between rounded-lg shadow-lg">
            <div className="bg-[#F97316]/10  p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="w-12 h-12 text-[#F97316] mr-3" />
                  <p>Chennai : The WorkVilla - Arcade Centre ,  3rd Floor , 110/1, Mahatma Gandhi Road, Nungambakkam, Chennai 600034.</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-[#F97316] mr-3" />
                  <p>+91 8015532924</p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-[#F97316] mr-3" />
                  <p>chennai@earlyjobs.com</p>
                </div>
              </div>
              <button 
                onClick={handleScrollToContact}
                className="mt-6 w-full py-3 bg-[#F97316] text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition-smooth"
              >
                Register Now
              </button>
            </div>
            <div className="hidden md:block bg-[#F97316]/10  p-8 ">
              <h3 className="text-2xl font-bold text-foreground mb-6">Office Hours</h3>
              <div className="space-y-4 text-muted-foreground">
                <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
                <p><span className="font-semibold">Sunday:</span> Closed</p>
              </div>
              <div className="mt-6">
                <p className="text-muted-foreground mb-4">
                  Have a question? Drop by our office or give us a call!
                </p>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl">
            <h3 className={`text-2xl font-bold mb-4 ${isSuccess ? 'text-[#F97316]' : 'text-red-600'}`}>
              {isSuccess ? 'Success!' : 'Error'}
            </h3>
            <p className="text-muted-foreground mb-6">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-3 bg-[#F97316] text-white text-lg font-semibold rounded-lg hover:bg-orange-600 transition-smooth"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FranchiseChennai;