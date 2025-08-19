import React, { useState, useRef } from 'react';
import './faq.css';

const FAQ = () => {
  const faqs = [
    {
      question: "Do I need HR experience?",
      answer:
        "No, prior HR experience is not required. We provide comprehensive training on recruitment, operations, and sales processes. Our step-by-step training program covers everything you need to know to run a successful EarlyJobs franchise.",
    },
    {
      question: "How much can I earn?",
      answer:
        "Franchise earnings vary based on location and performance but typically range between ₹3-6.5 lakhs per month after 6-9 months of operation...",
    },
    {
      question: "What is the franchise fee?",
      answer:
        "The standard franchise fee is ₹2 lakhs + GST. However, under our current limited-time offer, we're offering a 50% off with a reduced fee of just ₹1 lakh for the first 20 sign-ups.",
    },
    {
      question: "Do I need an office?",
      answer:
        "A physical office space of 200-400 sq ft is preferred for Tier 1 cities to establish a professional brand presence. In Tier 2/3 cities, you can start with a home office setup and scale as your business grows.",
    },
    {
      question: "What support is provided?",
      answer:
        "We provide comprehensive support including technology platform access, job leads, training modules, marketing materials, and more.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const refs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section id="faq" className="section bg-white">
      <div className="container">
        <h2 className="section-heading text-center">Frequently Asked Questions</h2>
        <div className="faq-wrapper">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${isOpen ? 'open' : ''}`}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`chevron ${isOpen ? 'rotate' : ''}`}>▼</span>
                </button>
                <div
                  ref={(el) => (refs.current[index] = el)}
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? `${refs.current[index]?.scrollHeight}px` : '0px',
                  }}
                >
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
