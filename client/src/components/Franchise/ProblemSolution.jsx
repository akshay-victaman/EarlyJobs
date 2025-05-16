
import React from 'react';
import { Users, DollarSign, Building, Briefcase } from 'lucide-react';
import './ProblemSolution.css';

const ProblemSolution = () => {
  return (
    <section className="section problem-section" id="problem">
      <div className="container">
        <h2 className="section-heading">Hiring is Broken. We're Fixing It.</h2>
        
        <div className="problem-description">
          <p className="problem-text">
            Startups and enterprises struggle with costly, slow hiring. At the same time, thousands of HR professionals, especially women, want flexible work opportunities. EarlyJobs bridges this gap with a tech-powered freelance recruiter model — and now you can run your own recruitment hub under our brand.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <DollarSign className="stat-icon" />
            <h3 className="stat-number">₹50,000 Cr+</h3>
            <p className="stat-label">Recruitment Industry</p>
          </div>
          
          <div className="stat-card" style={{ animationDelay: "100ms" }}>
            <Building className="stat-icon" />
            <h3 className="stat-number">1,300+</h3>
            <p className="stat-label">Hires Done in 12 Months</p>
          </div>
          
          <div className="stat-card" style={{ animationDelay: "200ms" }}>
            <Users className="stat-icon" />
            <h3 className="stat-number">80%</h3>
            <p className="stat-label">of Recruiters are Women</p>
          </div>
          
          <div className="stat-card" style={{ animationDelay: "300ms" }}>
            <Briefcase className="stat-icon" />
            <h3 className="stat-number">50+</h3>
            <p className="stat-label">Top Companies Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
