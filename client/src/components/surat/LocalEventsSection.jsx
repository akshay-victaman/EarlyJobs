import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const LocalEventsSection = () => {
  const events = [
    {
      title: "Weekly Walk-in Drive",
      date: "Every Saturday",
      time: "10:00 AM - 4:00 PM",
      location: "EarlyJobs Surat Office, Athwa Lines",
      type: "Recurring",
      description: "Open interviews for students and fresh graduates"
    },
    {
      title: "Textile Industry Job Fair",
      date: "December 15, 2024",
      time: "9:00 AM - 5:00 PM",
      location: "Surat International Exhibition Centre",
      type: "Special Event",
      description: "Major textile companies recruiting for various positions"
    },
    {
      title: "College Partnership Meet",
      date: "December 20, 2024",
      time: "2:00 PM - 6:00 PM",
      location: "SVNIT Surat Campus",
      type: "Partnership",
      description: "Connecting with local colleges for placement drives"
    }
  ];

  return (
    <section id = "toevents">
      <Helmet>
        <title>Career Events in Surat - EarlyJobs Job Fairs & Recruitment Drives</title>
        <meta 
          name="description" 
          content="Join EarlyJobs Surat's recruitment events, job fairs, and walk-in interviews. Regular hiring events for textile, manufacturing, and fresh graduate positions."
        />
        <meta 
          name="keywords" 
          content="job fairs Surat, recruitment events, walk-in interviews Surat, career events, placement drives, textile job fair, college recruitment"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Career Events in Surat - EarlyJobs Recruitment Calendar" />
        <meta 
          property="og:description" 
          content="Upcoming job fairs and recruitment events in Surat. Weekly walk-in interviews and industry-specific hiring drives."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://yourwebsite.com/events" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Event Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EventSeries",
            "name": "EarlyJobs Surat Career Events",
            "description": "Regular recruitment events and job fairs in Surat",
            "location": {
              "@type": "Place",
              "name": "EarlyJobs Surat Office",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Athwa Lines",
                "addressRegion": "Surat",
                "addressCountry": "India"
              }
            },
            "subEvents": events.map(event => ({
              "@type": "CareerEvent",
              "name": event.title,
              "startDate": event.date,
              "location": {
                "@type": "Place",
                "name": event.location,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Surat",
                  "addressRegion": "Gujarat",
                  "addressCountry": "India"
                }
              },
              "description": event.description,
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled"
            }))
          })}
        </script>
      </Helmet>

      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Events in Surat
            </h2>
            <p className="text-lg text-muted-foreground">
              Join our local events, job fairs, and networking sessions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={event.type === 'Special Event' ? 'default' : 'secondary'}>
                      {event.type}
                    </Badge>
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  
                 <Button
  size="sm"
  className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg py-2 px-4 text-sm font-medium transition-all duration-300"
  variant="outline"
>
  <Users className="w-4 h-4" />
  Coming Soon
</Button>

                </CardContent>
              </Card>
            ))}
          </div>
          
         
        </div>
      </section>
    </section>
  );
};

export default LocalEventsSection;
