// components/Clientele/CompanyCard.js
import React from "react";

const CompanyCard = ({ company, location }) => {
  return (
    <div className="company-card">
      {company.logo_url ? (
        <img
          src={company.logo_url}
          alt={`${company.name} logo`}
          className="company-card__logo"
        />
      ) : (
        <div className="company-card__no-logo">No Logo</div>
      )}
      <h3 className="company-card__name">{company.name || "Unknown Company"}</h3>
      <p className="company-category">{company.category|| "Services"}</p>
    </div>
  );
};

export default CompanyCard;