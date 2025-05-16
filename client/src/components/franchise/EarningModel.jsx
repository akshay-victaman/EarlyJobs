
import React from 'react';
import { Check } from 'lucide-react';
import './EarningModel.css';

const EarningModel = () => {
  return (
    <section id="earnings" className="earnings-section">
      <div className="earnings-container">
        <h2 className="earnings-heading">Real Earnings. Real Opportunity.</h2>

        <div className="earnings-grid">
          <div className="earnings-card">
            <h3 className="earnings-card-title">You Earn When Hires Happen</h3>
            
            <div className="earnings-item-container">
              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">Fixed Hiring (per hire)</p>
                  <p className="earnings-item-sublabel">Standard industry placement</p>
                </div>
                <span className="earnings-item-value">70% commission</span>
              </div>
              
              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">% of CTC Hiring</p>
                  <p className="earnings-item-sublabel">Premium placement model</p>
                </div>
                <span className="earnings-item-value">50% commission</span>
              </div>
              
              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">New Company Onboarding</p>
                  <p className="earnings-item-sublabel">For bringing new clients</p>
                </div>
                <span className="earnings-item-value">5% bonus</span>
              </div>
              
              <div className="earnings-item">
                <div>
                  <p className="earnings-item-label">Candidate Assessment</p>
                  <p className="earnings-item-sublabel">Pre-hiring testing</p>
                </div>
                <span className="earnings-item-value">70% (net)</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="earnings-dark-card">
              <div className="earnings-dark-header">
                <h3 className="earnings-dark-title">Estimated Monthly Income</h3>
                <span className="earnings-dark-value">₹6–6.5 Lakhs</span>
              </div>
              
              <p className="earnings-dark-subtitle">Based on average franchise activity after 6 months</p>
              
              <div className="earnings-feature-list">
                <div className="earnings-feature-item">
                  <div className="earnings-feature-icon-wrapper">
                    <Check className="earnings-feature-icon" />
                  </div>
                  <span>10-15 placements per month</span>
                </div>
                <div className="earnings-feature-item">
                  <div className="earnings-feature-icon-wrapper">
                    <Check className="earnings-feature-icon" />
                  </div>
                  <span>20+ assessments conducted</span>
                </div>
                <div className="earnings-feature-item">
                  <div className="earnings-feature-icon-wrapper">
                    <Check className="earnings-feature-icon" />
                  </div>
                  <span>5+ active client relationships</span>
                </div>
              </div>
            </div>
            
            <div className="earnings-gradient-card">
              <h3 className="earnings-gradient-title">Break-even in just 6–9 months ✅</h3>
              <p>Quick return on your franchise investment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EarningModel;
