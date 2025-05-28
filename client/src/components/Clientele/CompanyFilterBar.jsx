
import React from "react";
import { Filter } from "lucide-react";
import "./CompanyFilterBar.css";

const CompanyFilterBar = ({ filters, active, onChange }) => {
  const filterBarVisible = filters.slice(0, 7);
  const filterBarDropdown = filters.slice(7);

  return (
    <div className="company-filter-bar">
      {filterBarVisible.map((filter) => (
        <button
          key={filter}
          className={`company-filter-btn${filter === active ? " active" : ""}`}
          onClick={() => onChange(filter)}
        >
          {filter}
        </button>
      ))}
      {filterBarDropdown.length > 0 && (
        <div className="dropdown-container">
          <button className={`company-filter-btn dropdown-btn${filterBarDropdown.includes(active) ? " active" : ""}`}>
            Other <Filter size={18} className="filter-icon" />
            <div className="dropdown-content">
              {filterBarDropdown.map((filter) => (
                <div
                  className={`dropdown-item${filter === active ? " selected" : ""}`}
                  key={filter}
                  onClick={() => onChange(filter)}
                >
                  {filter}
                </div>
              ))}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyFilterBar;

