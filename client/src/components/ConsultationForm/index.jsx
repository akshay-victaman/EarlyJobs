import { useState } from "react"
import ReCAPTCHA from "react-google-recaptcha";
import {toast} from 'react-toastify';


const ConsultationForm = () => {

    const [captchaValue, setCaptchaValue] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        lookingFor: ""
    })

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function onChange(value) {
        setCaptchaValue(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(captchaValue === null) {
            toast.error("Please verify the captcha")
            return
        }
        console.log(formData)
    }

    return (
        <form className="landing-page-s7-consultation-form" onSubmit={handleSubmit}>
            <h2 className="landing-page-s7-consultation-heading">Free Consultation by Expert</h2>
            <hr className="landing-page-s7-consultation-hr" />
            <input type="text" required placeholder="Enter Your Name" className="landing-page-s7-consultation-input" name="name" value={formData.name} onChange={handleInputChange} />
            <input type="email" required placeholder="Enter Email Id" className="landing-page-s7-consultation-input" name="email" value={formData.email} onChange={handleInputChange} />
            <input type="tel" required placeholder="Contact Number" className="landing-page-s7-consultation-input" name="contact" value={formData.contact} onChange={handleInputChange} />
            <div className="landing-page-s7-consultation-textarea-con">
                <input type="radio" required name="lookingFor" id="Job" className="landing-page-s7-consultation-radio" value="Job" onChange={handleInputChange} />
                <label htmlFor="Job" className="landing-page-s7-consultation-radio-label">Looking For Job</label>
            </div>
            <div className="landing-page-s7-consultation-textarea-con">
                <input type="radio" required name="lookingFor" id="Candidate" className="landing-page-s7-consultation-radio" value="Candidate" onChange={handleInputChange} />
                <label htmlFor="Candidate" className="landing-page-s7-consultation-radio-label">Looking For Candidate</label>
            </div>
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={onChange}
            />
            <button type="submit" className="landing-page-s7-consultation-btn">Send</button>
        </form>
    );
}

export default ConsultationForm;