import React from "react";
import "./FranchiseRoadmap.css";

const FranchiseRoadmap = () => {
  const steps = [
    {
      number: "01",
      title: "Submit Your Interest",
      description: "Fill out our application form to express interest",
    },
    {
      number: "02",
      title: "Application & Call",
      description: "Review your application and discuss opportunities",
    },
    {
      number: "03",
      title: "Agreement & Deposit",
      description: "Complete documentation and secure your territory",
    },
    {
      number: "04",
      title: "Onboarding & Training",
      description: "Comprehensive training program for success",
    },
    {
      number: "05",
      title: "Franchise Launch",
      description: "Grand opening with marketing support",
    },
    {
      number: "06",
      title: "Ongoing Support & Growth",
      description: "Regular check-ins and business development",
    },
  ];

  return (
    <section className="roadmap-section">
      <div className="roadmap-container">
        <h2 className="roadmap-heading">
          From Application to Launch – We're With You
        </h2>

        <div className="roadmap-timeline">
          {/* Central connector line */}
          <div className="roadmap-connector"></div>

          <div className="roadmap-steps">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`roadmap-step ${index % 2 === 0 ? "odd" : "even"}`}
              >
                {/* Timeline dot */}
                <div className="roadmap-dot"></div>

                {/* Step content */}
                <div className="roadmap-content">
                  {/* Step number (mobile) */}
                  <div className="roadmap-number">{step.number}</div>

                  <div className="roadmap-text">
                    <span className="roadmap-step-number">
                      STEP {step.number}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseRoadmap;
