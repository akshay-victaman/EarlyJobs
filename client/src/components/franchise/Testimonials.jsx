
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      quote: "I earned back my investment in 4 months. The EarlyJobs model works perfectly for someone without prior HR experience like me.",
      name: "Priya Sharma",
      location: "Delhi",
      avatar: "https://via.placeholder.com/100x100"
    },
    {
      quote: "EarlyJobs gave me the platform to start my own agency. The training and support has been exceptional throughout the journey.",
      name: "Rajat Verma",
      location: "Bangalore",
      avatar: "https://via.placeholder.com/100x100"
    },
    {
      quote: "I'm proud to support women in my city through hiring. Our franchise is now making ₹5L+ monthly after just 8 months.",
      name: "Shalini Patel",
      location: "Pune",
      avatar: "https://via.placeholder.com/100x100"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-heading">Our Partners Are Growing Fast</h2>
        
        <div className="testimonials-slider">
          <div className="testimonials-card">
            <div className="testimonials-card-gradient"></div>
            
            <div className="testimonials-content">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`testimonials-slide ${
                    currentSlide === index ? 'active' : 'inactive'
                  }`}
                >
                  <div className="testimonials-layout">
                    <div className="testimonials-avatar-container">
                      <div className="testimonials-avatar">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                        />
                      </div>
                      
                      <div className="testimonials-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="testimonials-star" />
                        ))}
                      </div>
                    </div>
                    
                    <div className="testimonials-quote-container">
                      <blockquote className="testimonials-quote">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="testimonials-author">
                        <p className="testimonials-name">{testimonial.name}</p>
                        <p className="testimonials-location">Franchise Owner, {testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="testimonials-controls">
              <button
                onClick={prevSlide}
                className="testimonials-button testimonials-prev-button"
              >
                <ArrowLeft className="testimonials-button-icon" />
                Previous
              </button>
              
              <div className="testimonials-indicators">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`testimonials-indicator ${
                      currentSlide === index ? 'active' : ''
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="testimonials-button testimonials-next-button"
              >
                Next
                <ArrowRight className="testimonials-button-icon" />
              </button>
            </div>
          </div>
          
          <div className="testimonials-cta">
            <button className="btn-outline">
              Watch Video Testimonials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
