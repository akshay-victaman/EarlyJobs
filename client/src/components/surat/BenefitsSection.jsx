
import React from 'react';
import './BenefitsSection.css';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: '🎯',
      title: 'Targeted Job Matching',
      description: 'AI-powered matching system connects you with roles that fit your skills and career goals perfectly.'
    },
    {
      icon: '🚀',
      title: 'Fast Track Placement',
      description: 'Our streamlined process gets you placed 3x faster than traditional recruitment methods.'
    },
    {
      icon: '💼',
      title: 'Industry Expertise',
      description: 'Deep knowledge of Surat\'s textile, diamond, and manufacturing sectors ensures perfect fit.'
    },
    {
      icon: '📈',
      title: 'Career Growth Support',
      description: 'Ongoing career guidance and skill development opportunities for long-term success.'
    },
    {
      icon: '🤝',
      title: 'Trusted Network',
      description: 'Access to exclusive job opportunities from our network of 500+ verified employers.'
    },
    {
      icon: '⭐',
      title: 'Premium Service',
      description: 'White-glove treatment with dedicated relationship managers for personalized attention.'
    }
  ];

  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Why Professionals Choose EarlyJobs Surat
          </h2>
          <p className="section-subtitle">
            Experience the difference of working with Surat's most trusted recruitment partner
          </p>
        </div>
        
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">
                {benefit.icon}
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
