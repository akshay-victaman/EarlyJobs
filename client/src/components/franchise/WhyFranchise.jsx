
import React from 'react';
import { Briefcase, Brain, DollarSign, TrendingUp, Users } from 'lucide-react';
import './WhyFranchise.css';

const WhyFranchise = () => {
  const franchiseReasons = [
    {
      icon: <Briefcase className="reason-icon" />,
      title: "Proven Model",
      description: "Built-in success — 200+ recruiters onboarded, 50+ clients"
    },
    {
      icon: <Brain className="reason-icon" />,
      title: "No HR Experience Needed",
      description: "We train you on hiring, operations & sales"
    },
    {
      icon: <DollarSign className="reason-icon" />,
      title: "Low Setup, High ROI",
      description: "Start with just ₹1L deposit + minimal infra"
    },
    {
      icon: <TrendingUp className="reason-icon" />,
      title: "Recurring Monthly Income",
      description: "Earn from placements, assessments & partnerships"
    },
    {
      icon: <Users className="reason-icon" />,
      title: "Community Impact",
      description: "Empower job seekers & drive hiring locally"
    }
  ];

  return (
    <section id="whyFranchise" className="section why-franchise">
      <div className="container">
        <h2 className="section-heading">Why Franchise with EarlyJobs?</h2>

        <div className="reasons-grid">
          {franchiseReasons.map((reason, index) => (
            <div 
              key={index} 
              className="reason-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div>{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyFranchise;
