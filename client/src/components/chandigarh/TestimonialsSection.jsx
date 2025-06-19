import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Star, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Principal, Engineering College",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      content: "Placeholder for college principal testimonial. Real testimonial to be added after go-live with actual experience and results.",
      rating: 5,
      category: "College"
    },
    {
      name: "Priya Sharma",
      role: "Recent Graduate, Chandigarh University",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      content: "Placeholder for student success story. Real testimonial to be added after go-live showcasing placement success and experience.",
      rating: 5,
      category: "Student"
    },
    {
      name: "Amit Singh",
      role: "HR Manager, Tech Startup",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      content: "Placeholder for local employer testimonial. Real testimonial to be added after go-live highlighting hiring success and quality of candidates.",
      rating: 5,
      category: "Employer"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Success Stories & Testimonials | EarlyJobs Chandigarh Reviews</title>
        <meta 
          name="description" 
          content="Read success stories from Chandigarh's students, colleges, and employers who found success through EarlyJobs. Real testimonials about placements, hiring, and career growth."
        />
        <meta 
          name="keywords" 
          content="EarlyJobs reviews, Chandigarh placement success, career testimonials, student success stories, employer reviews, college placement testimonials, job success Chandigarh"
        />

        {/* Open Graph Tags */}
        <meta 
          property="og:title" 
          content="Success Stories & Testimonials - EarlyJobs Chandigarh"
        />
        <meta 
          property="og:description" 
          content="Discover how students, colleges, and employers in Chandigarh achieve their career and recruitment goals with EarlyJobs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh/testimonials" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />

        {/* Schema.org Review Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": testimonials.map((testimonial, index) => ({
              "@type": "Review",
              "position": index + 1,
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": "5"
              },
              "reviewBody": testimonial.content,
              "about": {
                "@type": "Organization",
                "name": "EarlyJobs Chandigarh",
                "sameAs": "https://yourwebsite.com/chandigarh"
              },
              "publisher": {
                "@type": "Organization",
                "name": "EarlyJobs Chandigarh"
              }
            }))
          })}
        </script>

        {/* Aggregate Rating Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AggregateRating",
            "itemReviewed": {
              "@type": "EmploymentAgency",
              "name": "EarlyJobs Chandigarh",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chandigarh",
                "addressRegion": "CH",
                "addressCountry": "IN"
              }
            },
            "ratingValue": "5",
            "bestRating": "5",
            "ratingCount": testimonials.length,
            "reviewCount": testimonials.length
          })}
        </script>
      </Helmet>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from students, colleges, and employers who have benefited from EarlyJobs Chandigarh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 relative">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {testimonial.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Quote className="w-8 h-8 text-gray-300 mb-4" />
                  <p className="text-gray-600 leading-relaxed italic">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Join Our Success Stories
              </h3>
              <p className="text-gray-600 mb-4">
                Be part of Chandigarh's growing community of successful job seekers and employers.
              </p>
              <p className="text-sm text-gray-500">
                <em>Note: Testimonials will be updated with real experiences post-launch</em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
