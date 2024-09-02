import React from 'react'

export const UpdateClaimStatus = ({ candidate, onUpdate }) => {

    const handleUpdate = (e) => {
        onUpdate(candidate.tenureId, e.target.value);
    };

    
    return (
        <select className="homepage-input candidate-input-select" disabled={candidate.dayCount >= 0} onChange={handleUpdate}>
            <option value=''>Select Claim Status</option>
            <option value='1'>Claimed</option>
            <option value='0'>Not Claimed</option>
        </select>
    );
}