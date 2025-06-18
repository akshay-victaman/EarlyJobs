import React from 'react';

import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
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
