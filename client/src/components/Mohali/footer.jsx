import React from 'react';
import { Helmet } from 'react-helmet';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
import { MapPin, Phone, Mail, Instagram, Facebook, ExternalLink } from 'lucide-react';
import './footer.css';

const Footer = () => {
  const businessInfo = {
    name: "EarlyJobs Mohali",
    phone: "+91-98765-43210",
    email: "mohali@earlyjobs.in",
    address: {
      street: "Sector 80",
      city: "Mohali",
      state: "Punjab",
      country: "India"
    },
    social: {
      facebook: "https://www.facebook.com/earlyjobsmohali",
      instagram: "https://www.instagram.com/earlyjobsmohali",
      linkedin: "https://www.linkedin.com/company/earlyjobs-mohali"
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact EarlyJobs Mohali - Your Local Career Growth Partner | Punjab</title>
        <meta 
          name="description" 
          content="Connect with EarlyJobs Mohali - Your trusted placement and career development partner. Located in Sector 80, serving Mohali, Chandigarh, and Panchkula regions with expert recruitment solutions."
        />
        <meta 
          name="keywords" 
          content="EarlyJobs Mohali, job placement Mohali, career counseling Punjab, recruitment agency tricity, IT jobs Mohali, placement services Punjab, career guidance Mohali, job consultancy Chandigarh, hiring solutions Punjab, campus placement partner"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="EarlyJobs Mohali - Premier Career Development Center" />
        <meta property="og:description" content="Your local partner for career growth and professional development in Mohali and Tricity area. Expert placement services, career guidance, and recruitment solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://earlyjobs.in/mohali" />
        <meta property="og:image" content="https://earlyjobs.in/mohali/office-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="EarlyJobs Mohali" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@EarlyJobsMohali" />
        <meta name="twitter:title" content="EarlyJobs Mohali - Career Development Center" />
        <meta name="twitter:description" content="Premier placement and career development services in Mohali and Tricity area." />
        <meta name="twitter:image" content="https://earlyjobs.in/mohali/twitter-card.jpg" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://earlyjobs.in/mohali" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="author" content="EarlyJobs Mohali" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="IN-PB" />
        <meta name="geo.placename" content="Mohali" />
        <meta name="geo.position" content="30.704649;76.717873" />
        <meta name="ICBM" content="30.704649, 76.717873" />

        {/* Organization Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": "https://earlyjobs.in/mohali",
            "name": businessInfo.name,
            "image": "https://earlyjobs.in/mohali/office-image.jpg",
            "url": "https://earlyjobs.in/mohali",
            "telephone": businessInfo.phone,
            "email": businessInfo.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": businessInfo.address.street,
              "addressLocality": businessInfo.address.city,
              "addressRegion": businessInfo.address.state,
              "addressCountry": businessInfo.address.country,
              "postalCode": "160080"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.704649",
              "longitude": "76.717873"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
              ],
              "opens": "09:00",
              "closes": "18:00"
            },
            "sameAs": [
              businessInfo.social.facebook,
              businessInfo.social.instagram,
              businessInfo.social.linkedin
            ]
          })}
        </script>
      </Helmet>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-company-info">
                <div className="footer-logo">
                  <span className="footer-logo-text">E</span>
                </div>
                <div>
                  <h3 className="footer-company-name">EarlyJobs</h3>
                  <p className="footer-company-location">Mohali</p>
                </div>
              </div>
              <p className="footer-description">
                Your trusted local partner for hiring and career growth in Mohali and the Tricity area.
              </p>
              <div className="footer-social-links">
                <a href="https://www.instagram.com/earlyjobsmohali" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <Instagram className="footer-contact-icon" />
                </a>
                <a href="https://www.facebook.com/earlyjobsmohali" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                  <Facebook className="footer-contact-icon" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-section-title">Quick Links</h4>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">Google Business Listing</a></li>
                <li><a href="#" className="footer-link">EarlyJobs Social Media</a></li>
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Use</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h4 className="footer-section-title">Contact Information</h4>
              <div className="footer-contact-info">
                <div className="footer-contact-item">
                  <Phone className="footer-contact-icon" />
                  <div>
                    <p className="footer-contact-label">Franchise Owner</p>
                    <a href="tel:+919876543210" className="footer-contact-value">
                     +91 9056283266

                    </a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <Mail className="footer-contact-icon" />
                  <div>
                    <p className="footer-contact-label">Email</p>
                    <a href="mailto:mohali@earlyjobs.in" className="footer-contact-value">
                      mohali@earlyjobs.in
                    </a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <MapPin className="footer-contact-icon" />
                  <div>
                    <p className="footer-contact-label">Office Address</p>
                    <p className="footer-contact-address">
                    5.2, Cabin, Fifth floor, E 260 BA, phase 8B industrial Area Mohali, Sector-74A, pin-160055

                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps / Directions */}
            <div className="footer-map-section">
              <h4 className="footer-section-title">Find Us</h4>
              <div className="footer-map-container">
                <div className="footer-map-placeholder">
                  <div className="footer-map-content">
                    <MapPin className="footer-map-icon" />
                    <p className="footer-map-title">Google Maps</p>
                    <p className="footer-map-subtitle">Interactive map coming soon</p>
                  </div>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-directions-link"
                >
                  <span className="footer-directions-text">Get Directions</span>
                  <ExternalLink className="footer-directions-icon" />
                </a>
              </div>
            </div>
          </div>

          <hr className="footer-separator" />

          {/* Bottom Footer */}
          <div className="footer-bottom">
            <div className="footer-copyright">
              © 2024 EarlyJobs Mohali. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">
                Terms & Conditions
              </a>
              <a href="#" className="footer-bottom-link">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Additional Badge */}
          <div className="footer-badge-container">
            <div className="footer-badge">
              <MapPin className="footer-badge-icon" />
              Proudly Serving Mohali & Tricity Area
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
