import { FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import './style.css';
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";

const Footer = ({handleShowContactForm}) => {
    return (
        <footer className="footer-container">
            <div className="footer-main-container">
                <div className="footer-address-container">
                    <Link to='/' className="footer-logo-link">
                        <img src="/footer-logo.png" alt="earlyjobs" className="footer-logo" />
                    </Link>
                    <div className="footer-sub-con">
                        <SlLocationPin className="footer-icon" />
                        <p className="footer-address">53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034</p>
                    </div>
                    <div className="footer-sub-con">
                        <HiOutlineMail className="footer-icon" />
                        <a href="mailto:info@earlyjobs.in" className="footer-address">info@earlyjobs.in</a>
                    </div>
                    <div className="footer-sub-con">
                        <HiOutlinePhone className="footer-icon" />
                        <a href="tel:+918217527926" className="footer-address">+91 8217527926</a>
                    </div>
                    {/* <h3 className="footer-heading">SOCIAL</h3> */}
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
                        <a href="https://www.goformeet.co/earlyjobs" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <img src="/goformeet_logo.png" alt="goformeet" className="footer-social-media-image" />
                        </a>
                        <a href="https://www.t.me/earlyjobsoffice/" className="footer-social-media-link" rel="noreferrer" target="_blank">
                            <FaTelegram className="footer-social-media-icon" />
                        </a>
                    </div>
                    <h3 className="footer-heading">ALSO AVAILABLE IN</h3>
                    <div className="footer-sub-con">
                        <a href="https://play.google.com/store/apps/details?id=com.victaman.earlyjobs" rel="noreferrer" target="_blank" className="footer-store-icons">
                            <img src="/google-play-badge-logo.svg" draggable={false} alt="google-play" className="footer-store-icon" />
                        </a> 
                        <a href="https://apps.apple.com/in/app/earlyjobs/id6590626019" rel="noreferrer" target="_blank" className="footer-store-icons">
                            <img src="/app-store-logo.svg" draggable={false} alt="app-store" className="footer-store-icon" />
                        </a>
                    </div>
                </div>
                <div className="footer-links-container">
                    <h3 className="footer-heading">COMPANY</h3>
                    <Link to='/about' className="footer-link">About Us</Link>
                    <Link to='/team' className="footer-link">Our Team</Link>
                    <Link to='/franchise-with-us' className="footer-link">Franchise With Us</Link>
                    <Link to='/partner-with-us' className="footer-link">Partner With Us</Link>
                    <Link to='/terms-and-conditions' className="footer-link">Terms & Conditions</Link>
                    <Link to='/privacy-policy' className="footer-link">Privacy Policy</Link> 
                    <Link to='/blogs' className="footer-link">Blogs</Link>
                    <p className="footer-link" rel="noreferrer" id="contact-link" onClick={handleShowContactForm}>Contact Us</p>
                </div>
                <div className="footer-links-container">
                    <h3 className="footer-heading">OUR SERVICES</h3>
                    <Link to='/it-recruitment' className="footer-link">IT Recruitment</Link>
                    <Link to='/finance-and-accounting-recruitment' className="footer-link">Finance & Accounting Recruitment</Link>
                    <Link to='/sales-marketing-services' className="footer-link">Sales & Marketing Recruitment</Link>
                    <Link to='/top-executive-recruitment-firm' className="footer-link">Top Executive Recruitment</Link>
                    <Link to='/hr-executive-recruitment-services' className="footer-link">HR & Executive Recruitment</Link>
                    <Link to='/recruitment-process-outsourcing' className="footer-link">Recruitment Process Outsourcing</Link>
                    <Link to='/value-staffing-service' className="footer-link">Value Staffing Services</Link>
                    <Link to='/it-staffing-services' className="footer-link">IT Staffing Services</Link>
                </div>
                <div className="footer-links-container">
                    <h3 className="footer-heading">LOCATIONS</h3>
                    <Link to='/view-openings?page=1&location=Bengaluru' className="footer-link">Jobs in Bengaluru</Link>
                    <Link to='/view-openings?page=1&location=Chennai' className="footer-link">Jobs in Chennai</Link>
                    <Link to='/view-openings?page=1&location=Pune' className="footer-link">Jobs in Pune</Link>
                    <Link to='/view-openings?page=1&location=Mumbai' className="footer-link">Jobs in Mumbai</Link>
                    <Link to='/view-openings?page=1&location=Hyderabad' className="footer-link">Jobs in Hyderabad</Link>
                    <Link to='/view-openings?page=1&location=New Delhi' className="footer-link">Jobs in New Delhi</Link>
                    <Link to='/view-openings?page=1&location=Noida' className="footer-link">Jobs in Noida</Link>
                    <Link to='/view-openings?page=1&location=Gurgaon' className="footer-link">Jobs in Gurgaon</Link>
                </div>
            </div>
            <p className="footer-address footer-rights" style={{textAlign: 'center'}}>© 2024 EarlyJobs | All rights reserved.</p>
        </footer>
    );
}

export default Footer;