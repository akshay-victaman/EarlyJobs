import React from 'react';
import './styles.css';

const AssessmentsPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close-btn" onClick={onClose}>
          <svg className="popup-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <p className="popup-message">
          Access to this feature is not available at the moment.
        </p>
        <button className="popup-gotit-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default AssessmentsPopup;