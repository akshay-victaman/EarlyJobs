import React from 'react';
import './HowItWorksSection.css';

import { Card, CardContent } from '../ui/card';
import { UserPlus, Upload, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Register via Surat franchise portal with your details",
      color: "icon-blue"
    },
    {
      icon: Upload,
      title: "Upload & Match",
      description: "Upload your resume or job requirement to get matched locally",
      color: "icon-green"
    },
    {
      icon: CheckCircle,
      title: "Get Placed",
      description: "Get interviewed and placed with Surat talent or employers",
      color: "icon-purple"
    }
  ];

  return (
    <>
      <section className="how-it-works-section">
        <div className="container">
          <div className="header">
            <h2 className="title">How It Works</h2>
            <p className="subtitle">Simple 3-step process to connect with opportunities in Surat</p>
          </div>
          
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-wrapper">
                <Card className="step-card">
                  <CardContent className="card-content">
                    <div className={`icon-container ${step.color}`}>
                      <step.icon className="icon" />
                    </div>
                    <div className="content">
                      <h3 className="step-title">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="step-description">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="connector"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="footer">
            <p className="footer-text">
              Hire Surat Talent •  Find Surat Jobs •  Build Local Connections
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;