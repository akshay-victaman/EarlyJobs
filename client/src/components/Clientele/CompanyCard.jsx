import React from "react";
import "./CompanyCard.css";

const sectorColors = {
  FinTech: "sector-fintech",
  EdTech: "sector-edtech",
  HealthTech: "sector-healthtech",
  SaaS: "sector-saas",
  "E-commerce": "sector-ecommerce",
  Logistics: "sector-logistics",
  Agritech: "sector-agritech",
  "AI/ML": "sector-aiml",
  HRTech: "sector-hrtech",
  Gaming: "sector-gaming",
  Cybersecurity: "sector-cybersecurity",
  InsurTech: "sector-insurtech",
  Cleantech: "sector-cleantech",
  Retail: "sector-retail",
  "Real Estate": "sector-realestate",
  "IT/SaaS": "sector-itsaas",
  Services: "sector-services",
  Automotive: "sector-automotive",
};

const CompanyCard = ({ company, location }) => {
  console.log("CompanyCard component rendered with company:", company);
  return (
    <div className="company-card" tabIndex={0} aria-label={company.name}>
      <div className="company-card__logo-wrap">
        <img
          src={company.logo_url}
          alt={`${company.name} logo`}
          className="company-card__logo"
        />
      </div>
      <div className="company-card__name">{company.name}</div>
      {/* <div className="company-card__brand">{location}</div> */}
      <div
        className={`company-card__sector ${
          sectorColors[company.sector] || "sector-default"
        }`}
      >
        {company.sector}
      </div>
    </div>
  );
};

export default CompanyCard;
