import React from 'react';

import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink, Linkedin } from 'lucide-react';

const Footer = () => {

   const scrollToLeadForm = () => {
    document.getElementById('lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{paddingTop:"41px"}}>
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div style={{backgroundColor:"white" , borderRadius: '15px', padding: '3px'}}>
                <img src= "https://i.ibb.co/mCLDxzPp/early-jobs-logo2.png" style={{width: '70px', height: '70px'}} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">EarlyJobs</h3>
                  <p className="text-gray-400 text-sm">Surat</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's hybrid AI + human recruiter platform, connecting Surat's bright talent with leading employers.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/earlyjobs/" className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/company/earlyjobs/" className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                <li><a     onClick={scrollToLeadForm} className="text-gray-400 hover:text-white transition-colors duration-300">For Students</a></li>
                <li><a   onClick={scrollToLeadForm} className="text-gray-400 hover:text-white transition-colors duration-300">For Colleges</a></li>
                <li><a  onClick={scrollToLeadForm}  className="text-gray-400 hover:text-white transition-colors duration-300">For Employers</a></li>
                {/* <li><a  onClick={toevents}  className="text-gray-400 hover:text-white transition-colors duration-300">Events</a></li> */}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Franchise Owner</p>
                    <a href="tel:+911234567890" className="text-gray-400 hover:text-white transition-colors duration-300">
                      +91 9377337833

                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:Surat@earlyjobs.in" className="text-gray-400 hover:text-white transition-colors duration-300">
                      Surat@earlyjobs.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-gray-400">
                     228, Magnus Shopping Mall, Nr. Althan Shopping Mall, Althan, Surat-395017

                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps / Directions */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Find Us</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Google Maps</p>
                    <p className="text-gray-500 text-xs">Interactive map coming soon</p>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/YezVMmmtW9SR3ESx5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  <span className="text-sm">Get Directions</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 EarlyJobs Surat. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Additional Badge */}
          <div className="mt-8 text-center">
            <Badge className="bg-blue-900 text-blue-200 hover:bg-blue-900">
              <MapPin className="w-4 h-4 mr-2" />
              Proudly Serving Surat & Surrounding Areas
            </Badge>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
