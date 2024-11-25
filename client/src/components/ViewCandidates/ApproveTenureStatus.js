import React from 'react';
const ApproveTenureStatus = ({ candidate, onUpdate }) => {

    const handleUpdate = (e) => {
      onUpdate(candidate.applicationId, e.target.value);
    };
  
    return (
      <select className="homepage-input candidate-input-select" onChange={handleUpdate}>
          <option value=''>Select</option>
          <option value='Approved'>Approved</option>
          <option value='Rejected'>Rejected</option>
      </select>
    );
  }
  
  export default ApproveTenureStatus