import React from 'react';

import './faq.css';

const FAQSection = () => {
  const city = 'Mohali';
  const currentYear = new Date().getFullYear();

  // Enhanced meta content
  const metaContent = {
    title: `FAQ - EarlyJobs ${city} Career Platform ${currentYear} | Common Questions Answered`,
    description: `Find answers to frequently asked questions about EarlyJobs ${city}'s recruitment services, job opportunities, college partnerships, placement process, and career guidance. Top recruitment platform in ${city} for students, colleges, and employers.`,
    keywords: [
      `EarlyJobs ${city}`,
      'job placement FAQ',
      'career questions',
      'placement process',
      'internship opportunities',
      'campus recruitment',
      `${city} jobs`,
      'career guidance',
      'job seeker guide',
      'employer FAQ',
      'college placements',
      'recruitment services',
      `${currentYear} jobs`,
      'fresher jobs',
      'IT jobs in Mohali',
      'biotech jobs',
      'manufacturing jobs',
      'entry level positions',
      'job consultancy',
      'placement agency'
    ].join(', ')
  };

  const faqs = [
    {
      question: 'Is EarlyJobs a job consultancy or a college placement partner?',
      answer: `EarlyJobs is a hybrid recruitment platform that works both with students directly and through colleges. We offer verified internships, entry-level jobs, and campus drives via our local franchise in ${city}, making it easier for students and companies to connect without traditional consultancy fees.`
    },
    {
      question: 'Is there any registration fee for students or job seekers?',
      answer: 'No. Registration on EarlyJobs is 100% free for students and job seekers. We do not charge any fees for applying, attending interviews, or getting placed through our platform.'
    },
    {
      question: `I represent a college in ${city}. How can we partner for placements or campus drives?`,
      answer: 'You can submit your details through the contact form on this page or reach out directly to the local franchise. We’ll get in touch to explain how our platform and team support college-level placements and skill-building initiatives.'
    },
    {
      question: `Can businesses and startups in ${city} list their job or internship openings here?`,
      answer: `Yes. If you’re an employer or a recruiter in ${city}, you can easily submit your hiring needs through the portal. Our local franchise team will help you connect with relevant, pre-screened candidates quickly.`
    },
    {
      question: 'What makes EarlyJobs different from other job portals or freelancing recruiters?',
      answer: 'EarlyJobs combines AI-powered technology with local human support. Our city-based franchise teams organize walk-ins, offer career help, and ensure faster placements through personalized follow-ups — something no traditional portal can match.'
    }
  ];

  const [openItems, setOpenItems] = React.useState([]);

  const toggleItem = (index) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
    

      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">
              Frequently Asked <span className="highlight">Questions</span>
            </h2>
            <p className="faq-subtitle">
              Get answers to common questions about EarlyJobs {city}
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <div className="collapsible" style={{backgroundColor:"#fff", borderRadius:"16px"}}>
                  <button
                    className="collapsible-trigger"
                    onClick={() => toggleItem(index)}
                  >
                    <div className="trigger-content" style={{borderRadius:"16px"}}>
                      <h3 className="faq-question">{faq.question}</h3>
                      <span
                        className={`chevron ${openItems.includes(index) ? 'rotate' : ''}`}
                      >
                        ▼
                      </span>
                    </div>
                  </button>

                  {openItems.includes(index) && (
                    <div className="collapsible-content">
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;