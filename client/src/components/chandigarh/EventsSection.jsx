import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar } from 'lucide-react';
import './EventsSection.css';

const EventsSection = () => {
  const events = [
    {
      title: "Resume Building Workshop",
      date: "March 15, 2024",
      time: "2:00 PM - 4:00 PM",
      location: "UIET, Panjab University",
      attendees: "50+ Students",
      type: "Workshop",
      description: "Learn to create professional resumes that get noticed by top employers in Chandigarh.",
      status: "upcoming"
    },
    {
      title: "Tech Jobs Walk-in Drive", 
      date: "March 22, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Rajiv Gandhi Technology Park",
      attendees: "100+ Candidates",
      type: "Job Drive",
      description: "Direct interviews with leading IT companies for freshers and experienced professionals.",
      status: "upcoming"
    },
    {
      title: "College Partnership Meet",
      date: "March 8, 2024",
      time: "11:00 AM - 1:00 PM", 
      location: "EarlyJobs Chandigarh Office",
      attendees: "15+ Colleges",
      type: "Partnership",
      description: "Explore collaboration opportunities with engineering and management colleges.",
      status: "upcoming"
    }
  ];

  return (
    <section className="events-section">
      <div className="events-container">
        <div className="events-header">
          <Badge className="events-badge">
            <Calendar className="events-badge-icon" />
            <span>Local Events</span>
          </Badge>
          <h2 className="events-title">
            Upcoming Events & Job Drives
          </h2>
          <p className="events-subtitle">
            Join our local events in Chandigarh to network, learn, and discover new career opportunities.
          </p>
        </div>

        <div className="events-grid">
          {events.map((event, index) => (
            <Card key={index} className={`event-card ${event.status === 'completed' ? 'event-card-completed' : 'event-card-upcoming'}`}>
              <CardHeader className="event-card-header">
                <div className="event-meta">
                  <Badge className={`event-type-badge event-type-${event.type.toLowerCase().replace(' ', '-')}`}>
                    {event.type}
                  </Badge>
                  <Badge className={`event-status-badge event-status-${event.status}`}>
                    {event.status === 'upcoming' ? 'Coming Soon' : 'Completed'}
                  </Badge>
                </div>
                <CardTitle className="event-card-title">{event.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="event-card-content">
                <p className="event-description">{event.description}</p>
                <div className="event-details">
                  {/* <div className="event-detail">
                    <Calendar className="event-detail-icon" />
                    <span>{event.date}</span>
                  </div> */}
                  {/* <div className="event-detail">
                    <Clock className="event-detail-icon" />
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <MapPin className="event-detail-icon" />
                    <span>{event.location}</span>
                  </div>
                  <div className="event-detail">
                    <Users className="event-detail-icon" />
                    <span>{event.attendees}</span>
                  </div> */}
                </div>

                {event.status === 'upcoming' && (
                  <div className="event-action">
                    <Button className="event-register-button">
                      Coming Soon
                      {/* <ArrowRight className="event-register-icon" /> */}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;