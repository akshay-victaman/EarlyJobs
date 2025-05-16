
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    // <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
    //   <nav className="navbar-container container">
    //     <div className="logo">
    //       <span className="logo-text">
    //         Early<span>Jobs</span>
    //       </span>
    //     </div>

    //     {/* Desktop Menu */}
    //     <div className="desktop-menu">
    //       <button onClick={() => scrollToSection('whyFranchise')} className="nav-link">Why Franchise</button>
    //       <button onClick={() => scrollToSection('earnings')} className="nav-link">Earnings</button>
    //       <button onClick={() => scrollToSection('setup')} className="nav-link">Setup</button>
    //       <button onClick={() => scrollToSection('testimonials')} className="nav-link">Testimonials</button>
    //       <button onClick={() => scrollToSection('faq')} className="nav-link">FAQs</button>
    //       <button 
    //         onClick={() => scrollToSection('contact')}
    //         className="btn-primary"
    //       >
    //         Apply Now
    //       </button>
    //     </div>

    //     {/* Mobile Menu Button */}
    //     <button 
    //       className="mobile-menu-button"
    //       onClick={() => setIsMenuOpen(!isMenuOpen)}
    //     >
    //       {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    //     </button>
    //   </nav>

    //   {/* Mobile Menu Dropdown */}
    //   {isMenuOpen && (
    //     <div className="mobile-menu animate-fade-in">
    //       <div className="mobile-menu-container container">
    //         <button onClick={() => scrollToSection('whyFranchise')} className="mobile-nav-link">Why Franchise</button>
    //         <button onClick={() => scrollToSection('earnings')} className="mobile-nav-link">Earnings</button>
    //         <button onClick={() => scrollToSection('setup')} className="mobile-nav-link">Setup</button>
    //         <button onClick={() => scrollToSection('testimonials')} className="mobile-nav-link">Testimonials</button>
    //         <button onClick={() => scrollToSection('faq')} className="mobile-nav-link">FAQs</button>
    //         <button 
    //           onClick={() => scrollToSection('contact')}
    //           className="btn-primary"
    //         >
    //           Apply Now
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </header>
    <h1> jfkd </h1>
  );
};

export default Navbar;
