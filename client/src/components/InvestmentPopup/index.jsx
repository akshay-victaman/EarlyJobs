import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const InvestmentPopup = ({ onClose }) => {
  return (
    <div className="investment-popup-overlay">
      <div className="investment-popup">
        <button className="popup-close-btn" onClick={onClose}>×</button>
        <div className="popup-content">
          <h2>🎉 Exciting News!</h2>
          <h3>We've Secured ₹12 Million in Investment</h3>
          <p>We're thrilled to announce this milestone that will help us enhance our services and create more opportunities for job seekers and employers.</p>
          <Link to="/press-release" className="popup-read-more-btn" onClick={onClose}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestmentPopup;