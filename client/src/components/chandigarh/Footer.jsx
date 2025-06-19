import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Footer = () => {
  const businessInfo = {
    name: "EarlyJobs Chandigarh",
    phone: "+91 12345 67890",
    email: "chandigarh@earlyjobs.in",
    address: {
      streetAddress: "Sector 34",
      addressLocality: "Chandigarh",
      addressRegion: "Punjab",
      addressCountry: "IN",
      postalCode: "160022"
    },
    sameAs: [
      "https://www.facebook.com/earlyjobschandigarh",
      "https://www.instagram.com/earlyjobschandigarh"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Contact EarlyJobs Chandigarh | Career Services & Support</title>
        <meta 
          name="description" 
          content="Contact EarlyJobs Chandigarh for career opportunities and recruitment services. Find our office in Sector 34, Chandigarh. Connect with us for placements and hiring solutions."
        />
        <meta 
          name="keywords" 
          content="EarlyJobs Chandigarh contact, career services contact, recruitment office Chandigarh, placement services contact, job search help"
        />

        {/* Local Business Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": businessInfo.name,
            "image": "https://yourwebsite.com/logo.png",
            "telephone": businessInfo.phone,
            "email": businessInfo.email,
            "address": {
              "@type": "PostalAddress",
              ...businessInfo.address
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.7333",
              "longitude": "76.7794"
            },
            "url": "https://yourwebsite.com/chandigarh",
            "sameAs": businessInfo.sameAs
          })}
        </script>

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": businessInfo.name,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": businessInfo.phone,
              "contactType": "customer service",
              "areaServed": "IN-CH",
              "availableLanguage": ["en", "hi", "pa"]
            }
          })}
        </script>
      </Helmet>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">EarlyJobs</h3>
                  <p className="text-gray-400 text-sm">Chandigarh</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                India's hybrid AI + human recruiter platform, connecting Chandigarh's bright talent with leading employers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">For Students</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">For Colleges</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">For Employers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Events</a></li>
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
                      +91 12345 67890
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:chandigarh@earlyjobs.in" className="text-gray-400 hover:text-white transition-colors duration-300">
                      chandigarh@earlyjobs.in
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-gray-400">
                      Sector 34, Chandigarh<br />
                      Punjab, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
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
                  href="https://maps.google.com" 
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
              © 2024 EarlyJobs Chandigarh. All rights reserved.
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

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <Badge className="bg-blue-900 text-blue-200 hover:bg-blue-900">
              <MapPin className="w-4 h-4 mr-2" />
              Proudly Serving Chandigarh & Surrounding Areas
            </Badge>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
