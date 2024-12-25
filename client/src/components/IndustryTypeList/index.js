import './style.css'
import React from 'react';

const IndustryTypeList = ({industryItem, onSelectIndustryType}) => {
  const {industryId, label} = industryItem
  return (
    <li key={industryId} className="job-filter-employment-type-con">
      <input
        type="checkbox"
        id={industryId}
        className="job-filter-input-checkbox"
        value={industryId}
        onChange={onSelectIndustryType}
      />
      <label htmlFor={industryId} className="job-filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default IndustryTypeList