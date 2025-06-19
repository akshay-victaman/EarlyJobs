
import React from 'react';
import './LocalEventsSection.css';

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
    <section id="toevents" className="local-events-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Upcoming Events in Surat
          </h2>
          <p className="section-subtitle">
            Join our local events, job fairs, and networking sessions
          </p>
        </div>
        
        <div className="events-grid">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <div className="event-header">
                <div className={`event-badge ${event.type === 'Special Event' ? 'special' : 'regular'}`}>
                  {event.type}
                </div>
                <div className="calendar-icon">📅</div>
              </div>
              
              <h3 className="event-title">{event.title}</h3>
              
              <div className="event-details">
                <div className="event-detail">
                  <span className="detail-icon">📅</span>
                  <span>{event.date}</span>
                </div>
                
                <div className="event-detail">
                  <span className="detail-icon">🕒</span>
                  <span>{event.time}</span>
                </div>
                
                <div className="event-detail">
                  <span className="detail-icon">📍</span>
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="event-description">
                {event.description}
              </p>
              
              <button className="event-button">
                <span className="button-icon">👥</span>
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocalEventsSection;
