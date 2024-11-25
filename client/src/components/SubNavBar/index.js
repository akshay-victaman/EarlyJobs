import { Link } from 'react-router-dom'
import React from 'react';
import './style.css'

const SubNavBar = ({handleShowContactForm}) => {
    return (
        <div className="subNavBar__container">
            <Link to="/" className="subNavBar__link">Home</Link>
            <Link to="/about" className="subNavBar__link">About</Link>
            <Link to="/team" className="subNavBar__link">Team</Link>
            <Link to="/job-openings" className="subNavBar__link">Job Openings</Link>
            <a className="subNavBar__link" rel="noreferrer" id="contact-link" onClick={handleShowContactForm}>Contact</a>
        </div>
    )
}

export default SubNavBar