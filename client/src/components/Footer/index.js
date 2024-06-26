import { FaFacebook, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import './style.css';
import { Link } from "react-router-dom";

const Footer = ({handleShowContactForm}) => {
    return (
        <footer className="footer-container">
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
            <div className="footer-links">
                <p className="footer-link-heading">© Early Jobs</p>
                <div className="footer-link-wrapper">
                    <Link to='/about' className="footer-link">About Us</Link>
                    <Link to='/team' className="footer-link">Team</Link>
                    <Link to='/franchise-with-us' className="footer-link">Franchise With Us</Link>
                    <Link to='/partner-with-us' className="footer-link">Partner With Us</Link>
                    <Link to='/terms-and-conditions' className="footer-link">Terms & Conditions</Link>
                    <Link to='/privacy-policy' className="footer-link">Privacy Policy</Link>
                    <a className="footer-link" rel="noreferrer" id="contact-link" onClick={handleShowContactForm}>Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;