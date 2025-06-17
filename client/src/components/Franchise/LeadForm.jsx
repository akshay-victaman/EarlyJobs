
import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { useToast } from '@/hooks/use-toast';

const LeadForm = () => {
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

  return (
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
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
  );
};

export default LeadForm;
