import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Priya Patel",
      role: "Placement Officer, SVNIT Surat",
      content:
        "EarlyJobs has transformed our placement process. The local expertise and industry connections have helped us achieve 95% placement rates.",
      rating: 5,
      avatar: "PP"
    },
    {
      name: "Rajesh Shah",
      role: "HR Manager, Surat Textile Mills",
      content:
        "Finding skilled candidates locally was always a challenge. EarlyJobs Surat franchise delivered qualified candidates within days.",
      rating: 5,
      avatar: "RS"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Success Stories & Testimonials - EarlyJobs Surat Reviews</title>
        <meta 
          name="description" 
          content="Read success stories from Surat's leading employers and placement officers. Discover how EarlyJobs transforms careers and hiring in Surat's textile and manufacturing sectors."
        />
        <meta 
          name="keywords" 
          content="EarlyJobs reviews, Surat job testimonials, placement success stories, employer feedback Surat, career testimonials, recruitment testimonials, job seeker reviews"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Success Stories - EarlyJobs Surat Career Platform" />
        <meta 
          property="og:description" 
          content="Real testimonials from Surat's employers and placement officers about their success with EarlyJobs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://yourwebsite.com/testimonials" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Review Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "EarlyJobs Surat",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": testimonials.length.toString(),
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": testimonials.map(testimonial => ({
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating.toString(),
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": testimonial.name
              },
              "reviewBody": testimonial.content,
              "publisher": {
                "@type": "Organization",
                "name": testimonial.role.split(",")[1].trim()
              }
            }))
          })}
        </script>
      </Helmet>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          {/* Section Heading */}
          <div className="text-center mb-12 px-2">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Success Stories from Surat
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Hear from our satisfied partners and candidates
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 sm:p-8 shadow-md hover:shadow-xl transition-shadow bg-muted/10"
              >
                <CardContent className="space-y-5">
                  {/* Star Ratings */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    “{testimonial.content}”
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-2">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-base">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSection;
