
import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What makes EarlyJobs Chandigarh different from other recruitment agencies?",
      answer: "We specialize in Chandigarh's key industries - textile, diamond, and manufacturing. Our local expertise, AI-powered matching system, and 95% success rate set us apart. We provide end-to-end career support, not just job placement."
    },
    {
      question: "Is there any fee for job seekers?",
      answer: "No, our services are completely free for job seekers. We are paid by employers when we successfully place candidates. You get access to premium career services at no cost."
    },
    {
      question: "How long does the placement process typically take?",
      answer: "Our streamlined process typically takes 7-14 days from registration to job offer. However, this can vary based on your experience level, industry requirements, and specific job preferences."
    },
    {
      question: "Do you help with interview preparation?",
      answer: "Absolutely! We provide comprehensive interview coaching, including mock interviews, industry-specific guidance, resume optimization, and salary negotiation tips to ensure you're fully prepared."
    },
    {
      question: "What types of positions do you fill?",
      answer: "We cover all levels from entry-level to senior management across textile, diamond, manufacturing, IT, finance, sales, and other key sectors in Chandigarh. Both permanent and contract positions are available."
    },
    {
      question: "Can I register if I'm currently employed?",
      answer: "Yes, we maintain strict confidentiality for all candidates. Many of our successful placements are working professionals looking for better opportunities. Your current employer will never know about your job search."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" style={{marginBottom: '71px'}}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Frequently Asked Questions
          </h2>
          <p className="section-subtitle">
            Get answers to common questions about our recruitment process
          </p>
        </div>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
