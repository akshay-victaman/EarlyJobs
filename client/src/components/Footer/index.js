import { FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import './style.css';
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlinePhone } from "react-icons/hi";

const Footer = ({handleShowContactForm}) => {
    return (
        <footer className="footer-container">
            <div className="footer-main-container">
                <div className="footer-address-container">
                    <Link to='/' className="footer-logo-link">
                        <img src="/early-jobs-logo2.png" alt="earlyjobs" className="footer-logo" />
                    </Link>
                    <p className="footer-address">© 2024 EarlyJobs | All rights reserved.</p>
                    <h3 className="footer-heading">OUR OFFICE</h3>
                    <div className="footer-sub-con">
                        <SlLocationPin className="footer-icon" />
                        <p className="footer-address">53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034</p>
                    </div>
                    <div className="footer-sub-con">
                        <HiOutlinePhone className="footer-icon" />
                        <a href="tel:+918217527926" className="footer-address">+91 8217527926</a>
                    </div>
                </div>
                <div className="footer-links-container">
                    <h3 className="footer-heading">COMPANY</h3>
                    <Link to='/view-openings' className="footer-link">View Openings</Link>
                    <Link to='/about' className="footer-link">About Us</Link>
                    <Link to='/team' className="footer-link">Team</Link>
                    <Link to='/franchise-with-us' className="footer-link">Franchise With Us</Link>
                    <Link to='/partner-with-us' className="footer-link">Partner With Us</Link>
                    <Link to='/terms-and-conditions' className="footer-link">Terms & Conditions</Link>
                    <Link to='/privacy-policy' className="footer-link">Privacy Policy</Link>
                    <p className="footer-link" rel="noreferrer" id="contact-link" onClick={handleShowContactForm}>Contact Us</p>
                </div>
                <div className="footer-links-container">
                    <h3 className="footer-heading">HIRING TALENT FOR</h3>
                    <Link to='/view-openings' className="footer-link">Multi National Companies</Link>
                    <Link to='/view-openings' className="footer-link">Healthcare Companies</Link>
                    <Link to='/view-openings' className="footer-link">Fintech Companies</Link>
                    <Link to='/view-openings' className="footer-link">Startups</Link>
                    <Link to='/view-openings' className="footer-link">Salesforce Need</Link>
                    <Link to='/view-openings' className="footer-link">BPO Companies</Link>
                </div>
                <div className="footer-links-container">
                    <h3 className="footer-heading">SOCIAL</h3>
                    <div className="footer-social-media">
                        <a href="https://www.facebook.com/earlyjobs.in" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <FaFacebook className="footer-social-media-icon" />
                        </a>
                        <a href="https://www.instagram.com/earlyjobs/" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <AiFillInstagram className="footer-social-media-icon insta-icon" />
                        </a>
                        <a href="https://www.linkedin.com/company/earlyjobs/" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <FaLinkedin className="footer-social-media-icon" />
                        </a>
                        <a href="https://goformeet.co/" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <img src="/goformeet_logo.png" alt="goformeet" className="footer-social-media-image" />
                        </a>
                        <a href="https://www.t.me/earlyjobsoffice/" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <FaTelegram className="footer-social-media-icon" />
                        </a>
                    </div>
                    <h3 className="footer-heading">LOCATIONS</h3>
                    <Link to='/view-openings?page=1&location=Bengaluru' className="footer-link">Bengaluru</Link>
                    <Link to='/view-openings?page=1&location=Chennai' className="footer-link">Chennai</Link>
                    <Link to='/view-openings?page=1&location=Pune' className="footer-link">Pune</Link>
                    <Link to='/view-openings?page=1&location=Mumbai' className="footer-link">Mumbai</Link>
                    <Link to='/view-openings?page=1&location=Hyderabad' className="footer-link">Hyderabad</Link>
                    <Link to='/view-openings?page=1&location=New Delhi' className="footer-link">New Delhi</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;