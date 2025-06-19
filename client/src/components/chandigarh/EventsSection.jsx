import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const EventsSection = () => {
  const events = [
    {
      title: "Resume Workshop at UIET",
      date: "Coming Soon",
      time: "10:00 AM - 2:00 PM",
      location: "UIET, Panjab University",
      type: "Workshop",
      description: "Learn to craft compelling resumes that get noticed by top employers in Chandigarh.",
      color: "blue"
    },
    {
      title: "Walk-in Interviews",
      date: "Every Saturday",
      time: "9:00 AM - 5:00 PM",
      location: "EarlyJobs Chandigarh Office",
      type: "Interview Drive",
      description: "Direct interviews with hiring managers from leading companies.",
      color: "green"
    },
    {
      title: "Campus Placement Drive",
      date: "Monthly",
      time: "Full Day Event",
      location: "Various Partner Colleges",
      type: "Placement",
      description: "On-campus recruitment drives for final year students.",
      color: "purple"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Career Events in Chandigarh | Workshops, Job Drives & Placement Events</title>
        <meta 
          name="description" 
          content="Join our career events in Chandigarh - Resume workshops, walk-in interviews, and campus placement drives. Connect with top employers and enhance your career prospects."
        />
        <meta 
          name="keywords" 
          content="Chandigarh career events, job fairs Chandigarh, placement drives, resume workshops, walk-in interviews, campus recruitment, career workshops, UIET placements"
        />

        {/* Open Graph Tags */}
        <meta 
          property="og:title" 
          content="Career Events in Chandigarh | Workshops, Job Drives & Placement Events"
        />
        <meta 
          property="og:description" 
          content="Discover upcoming career events in Chandigarh. Attend workshops, interviews, and placement drives to accelerate your career growth."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh/events" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />

        {/* Schema.org Markup for Events */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "ItemList",
            "itemListElement": events.map((event, index) => ({
              "@type": "Event",
              "position": index + 1,
              "name": event.title,
              "description": event.description,
              "location": {
                "@type": "Place",
                "name": event.location,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Chandigarh",
                  "addressRegion": "CH",
                  "addressCountry": "IN"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "Chandigarh Career Hub"
              },
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
            }))
          })}
        </script>
      </Helmet>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-100">
              <Calendar className="w-4 h-4 mr-2" />
              Upcoming Events
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Local Events & Job Drives
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with our latest events, workshops, and job drives happening in Chandigarh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card key={index} className={`hover:shadow-lg transition-all duration-300 border-l-4 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-600 text-white border-l-orange-500`}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${
                      event.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      event.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {event.type}
                    </Badge>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      event.color === 'blue' ? 'bg-blue-100' :
                      event.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {event.type === 'Workshop' ? (
                        <Users className={`w-6 h-6 ${
                          event.color === 'blue' ? 'text-blue-600' :
                          event.color === 'green' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      ) : event.type === 'Interview Drive' ? (
                        <Clock className={`w-6 h-6 ${
                          event.color === 'blue' ? 'text-blue-600' :
                          event.color === 'green' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      ) : (
                        <Calendar className={`w-6 h-6 ${
                          event.color === 'blue' ? 'text-blue-600' :
                          event.color === 'green' ? 'text-green-600' : 'text-purple-600'
                        }`} />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-xl text-white">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-100">{event.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-100">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-100">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-100">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                  </div>

                 <Button 
  className="w-full justify-center bg-amber-100 text-black hover:bg-amber-200 font-semibold text-sm md:text-base py-2 px-4 rounded-xl shadow-sm transition-all duration-200"
>
  Coming Soon
  {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
</Button>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default EventsSection;