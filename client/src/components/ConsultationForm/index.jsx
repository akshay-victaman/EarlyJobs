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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(captchaValue === null) {
            toast.error("Please verify the captcha")
            return
        }
        console.log(formData)
        let emailContent = `
            Hi Earlyjobs Team,
            <br>
            <br>
            We have received a request for free consultation from <strong>${formData.name}</strong> with email id <strong>${formData.email}</strong> and contact number <strong>${formData.contact}</strong>. They are looking for <strong>${formData.lookingFor}</strong>.
            <br>
            <br>
            Regards,
            <br> 
            earlyjobs.in team
            <br> 
            Victaman Enterprises
        `
        const encodedContent = encodeURIComponent(emailContent)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'Earlyjobs Consultation Request',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Consultation Request from ${formData.name}`,
            recipients: `hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`
        await fetch(url, {method: "GET", mode: "no-cors"})
        toast.success("Your request has been submitted successfully")
        setFormData({
            name: "",
            email: "",
            contact: "",
            lookingFor: ""
        })
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