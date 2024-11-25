import React from 'react';

const UpdateVerificationStatus = ({ candidate, onUpdate }) => {

    const handleUpdate = (e) => {
      onUpdate(candidate.applicationId, e.target.value);
    };
  
    return (
      <select className="homepage-input candidate-input-select" onChange={handleUpdate}>
          <option value=''>Select Verification Status</option>
          <option value='Verified'>Verified</option>
          <option value='Not Verified'>Not Verified</option>
          <option value='Unknown'>Unknown</option>
      </select>
    );
  }
  
  export default UpdateVerificationStatus;