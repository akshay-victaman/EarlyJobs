import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore"; 
import app from '../../firebase';

const ConsultationForm = () => {
    const db = getFirestore(app); // Initialize Firestore

    const [captchaValue, setCaptchaValue] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contact: "",
        lookingFor: ""
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function onChange(value) {
        setCaptchaValue(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Captcha validation
        if (captchaValue === null) {
            toast.error("Please verify the captcha");
            return;
        }

        try {
            // Add the new document and get the document reference
            const newConsultForm = {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                lookingFor: formData.lookingFor
            };

            // Step 1: Add the document with the form data to Firestore
            const docRef = await addDoc(collection(db, "ConsultationRequests"), { ...newConsultForm });
            const docId = docRef.id;
            const postDateTime = new Date();

            // Step 2: Update the document with the generated docId and postDateTime
            await setDoc(doc(db, "ConsultationRequests", docId), { docId, postDateTime, ...newConsultForm });

            // Send an email (if required) using your email logic
            let emailContent = `
                Hi Earlyjobs Team,
                <br><br>
                We have received a request for free consultation from <strong>${formData.name}</strong> with email id <strong>${formData.email}</strong> and contact number <strong>${formData.contact}</strong>. 
                They are looking for <strong>${formData.lookingFor}</strong>.
                <br><br>
                Regards,<br> 
                earlyjobs.in team
                <br> 
                Victaman Enterprises
            `;
            const encodedContent = encodeURIComponent(emailContent);
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
            };
            const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`;
            await fetch(url, { method: "GET", mode: "no-cors" });

            toast.success("Your request has been submitted successfully");

            // Reset form data
            setFormData({
                name: "",
                email: "",
                contact: "",
                lookingFor: ""
            });

        } catch (error) {
            console.error("Error submitting consultation request: ", error);
            toast.error("There was an issue submitting your request. Please try again.");
        }
    };

    return (
        <form className="landing-page-s7-consultation-form" onSubmit={handleSubmit}>
            <h2 className="landing-page-s7-consultation-heading">Free Consultation by Expert</h2>
            <hr className="landing-page-s7-consultation-hr" />
            <input
                type="text"
                required
                placeholder="Enter Your Name"
                className="landing-page-s7-consultation-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <input
                type="email"
                required
                placeholder="Enter Email Id"
                className="landing-page-s7-consultation-input"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                type="tel"
                required
                placeholder="Contact Number"
                className="landing-page-s7-consultation-input"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
            />
            <div className="landing-page-s7-consultation-textarea-con">
                <input
                    type="radio"
                    required
                    name="lookingFor"
                    id="Job"
                    className="landing-page-s7-consultation-radio"
                    value="Job"
                    onChange={handleInputChange}
                />
                <label htmlFor="Job" className="landing-page-s7-consultation-radio-label">Looking For Job</label>
            </div>
            <div className="landing-page-s7-consultation-textarea-con">
                <input
                    type="radio"
                    required
                    name="lookingFor"
                    id="Candidate"
                    className="landing-page-s7-consultation-radio"
                    value="Candidate"
                    onChange={handleInputChange}
                />
                <label htmlFor="Candidate" className="landing-page-s7-consultation-radio-label">Looking For Candidate</label>
            </div>
            <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                onChange={onChange}
            />
            <button type="submit" className="landing-page-s7-consultation-btn">Send</button>
        </form>
    );
};

export default ConsultationForm;
