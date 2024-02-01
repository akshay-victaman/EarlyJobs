import { FaFacebook, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import './style.css';

const Footer = () => {
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
                {/* <a href="google.com" className="footer-social-media-link" rel="noreferrer" target="_blank">
                    <FaYoutube className="footer-social-media-icon" />
                </a> */}
            </div>
            <div className="footer-links">
                <p className="footer-link-heading">© Early Jobs</p>
                <div className="footer-link-wrapper">
                    {/* <a href="/RefundPolicy/index.html" className="footer-link">Refund Policy</a> */}
                    {/* <a href="" class="footer-link">Support</a> */}
                    <a href="/TermsPage/index.html" className="footer-link">Terms & Conditions</a>
                    <a href="/PrivacyPage/index.html" className="footer-link">Privacy Policy</a>
                    <a className="footer-link" rel="noreferrer" id="contact-link">Contact</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;