import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Star, Quote } from 'lucide-react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      college: "UIET, Chandigarh",
      content: "EarlyJobs helped me land my first internship at a great startup in Chandigarh. The process was smooth and the support team was incredibly helpful.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b9e8c002?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Placement Officer",
      college: "Punjab Engineering College",
      content: "Working with EarlyJobs has significantly improved our placement rates. Their local team understands our students' needs perfectly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Sunita Verma",
      role: "HR Manager",
      college: "TechStartup Chandigarh",
      content: "We found exceptional talent through EarlyJobs. The candidates were well-screened and perfectly matched our requirements.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <Badge className="testimonials-badge">
            <Star className="testimonials-badge-icon" />
            Success Stories
          </Badge>
          <h2 className="testimonials-title">
            What Our Chandigarh Community Says
          </h2>
          <p className="testimonials-subtitle">
            Real stories from students, colleges, and employers who have found success through our platform.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card">
              <CardContent className="testimonial-content">
                <div className="testimonial-quote">
                  <Quote className="quote-icon" />
                </div>
                
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="rating-star" />
                  ))}
                </div>
                
                <p className="testimonial-text">
                  "{testimonial.content}"
                </p>
                
                <div className="testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="author-image"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <p className="author-college">{testimonial.college}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;