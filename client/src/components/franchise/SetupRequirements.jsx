
import React from 'react';
import { Building, Globe, Check, Rocket } from 'lucide-react';
import './SetupRequirements.css';

const SetupRequirements = () => {
  const requirements = [
    {
      icon: <Building className="setup-icon" />,
      title: "Office Space",
      description: "200–400 sq ft (or home office in Tier 2/3)"
    },
    {
      icon: <Globe className="setup-icon" />,
      title: "Infrastructure",
      description: "Laptop, broadband, phone"
    },
    {
      icon: <Rocket className="setup-icon" />,
      title: "Branding",
      description: "EarlyJobs signage, CRM & marketing kit"
    },
    {
      icon: <Check className="setup-icon" />,
      title: "Franchise Deposit",
      description: "₹1L (limited-time 50% risk-sharing offer)"
    }
  ];

  return (
    <section id="setup" className="setup-section">
      <div className="setup-container">
        <h2 className="setup-heading">What You Need to Get Started</h2>
        
        <div className="setup-grid">
          {requirements.map((req, index) => (
            <div 
              key={index}
              className="setup-card"
            >
              <div className="setup-icon-wrapper">
                {req.icon}
              </div>
              <div>
                <h3 className="setup-card-title">{req.title}</h3>
                <p className="setup-card-description">{req.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="setup-breakdown">
          <h3 className="setup-breakdown-title">Total Investment Breakdown</h3>
          
          <div className="setup-table-container">
            <table className="setup-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost Range</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Franchise Deposit</td>
                  <td>₹1,00,000</td>
                </tr>
                <tr>
                  <td>Office Setup & Equipment</td>
                  <td>₹1,00,000 - ₹1,50,000</td>
                </tr>
                <tr>
                  <td>Branding & Signage</td>
                  <td>₹50,000</td>
                </tr>
                <tr>
                  <td>Working Capital</td>
                  <td>₹1,00,000 - ₹2,00,000</td>
                </tr>
                <tr>
                  <td>Total Setup Investment</td>
                  <td>₹3,00,000 - ₹5,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SetupRequirements;
