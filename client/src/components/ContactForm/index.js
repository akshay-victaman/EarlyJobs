import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from 'react-toastify';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import app from '../../firebase';

const ContactForm = ({ handleShowContactForm }) => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const { name, email, subject, message, phone } = formState;
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);

    // Initialize Firebase Firestore
    const db = getFirestore(app);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    function onChange(value) {
        setCaptchaValue(value);
    }

    const sendEmail = async () => {
        let emailContent = `
            Hi Earlyjobs Team,
            <br>
            <br>
            You have a new message from ${name}:
            <br>
            <br>
            <strong>Subject:</strong> ${subject}
            <br>
            <br>
            <strong>Message:</strong> ${message}
            <br>
            <br>
            <strong>Email:</strong> ${email}
            <br>
            <strong>Phone:</strong> ${phone}
            <br>
            <br>
            Regards,
            <br> 
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
            name: 'Contact Support Request',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `You have a new message from ${name} - ${subject}`,
            recipients: `hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        };
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`;

        await fetch(url, { method: "GET", mode: "no-cors" });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (name.trim() === '') {
            setErrorMessage('Name is required');
            return;
        } else if (emailRegx.test(email) === false) {
            setErrorMessage('Enter a valid email address');
            return;
        } else if (phone.length !== 10) {
            setErrorMessage('Enter a valid 10 digit phone number');
            return;
        } else if (subject.trim() === '') {
            setErrorMessage('Subject is required');
            return;
        } else if (message.trim() === '') {
            setErrorMessage('Message is required');
            return;
        } else if (!captchaValue) {
            setErrorMessage('Please verify the captcha');
            return;
        } else {
            setErrorMessage('');
        }

        try {
            // Step 1: Add the form data to Firebase Firestore
            const contactForm = {
                name,
                email,
                phone,
                subject,
                message
            };

            // Add to the collection and get document reference
            const docRef = await addDoc(collection(db, "ContactForms"), contactForm);
            const docId = docRef.id;
            const postDateTime = new Date();

            // Set the document with additional data
            await setDoc(doc(db, "ContactForms", docId), { docId, postDateTime, ...contactForm });

            // Step 2: Send email logic
            await sendEmail();

            // Success message and reset form
            setSuccessMessage('Message sent successfully!');
            toast.success('Message sent successfully!');
            setFormState({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
            setCaptchaValue(null);
            handleShowContactForm(); // Close the contact form after submission
        } catch (error) {
            console.error("Error submitting form: ", error);
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <div className='contact-popup-overlay' onClick={handleShowContactForm}></div>
            <section className='contact-popup'>
                <button className='close-contact-popup' onClick={handleShowContactForm}>&times;</button>
                <h1 className='contact-heading'>Contact Us</h1>
                <form id="contact-form" onSubmit={handleFormSubmit}>
                    <label htmlFor="name" className='contact-label'>Name:</label>
                    <input type="text" id='name' name="name" value={name} onChange={handleChange} className='contact-input' placeholder='Name' />

                    <label htmlFor="email" className='contact-label'>Email address:</label>
                    <input type="email" id='email' name="email" value={email} onChange={handleChange} className='contact-input' placeholder='Email' />

                    <label htmlFor="phone" className='contact-label'>Phone:</label>
                    <input type="tel" id='phone' name="phone" value={phone} onChange={handleChange} className='contact-input' placeholder='Phone Number' />

                    <label htmlFor="subject" className='contact-label'>Subject:</label>
                    <input type="text" id='subject' name="subject" value={subject} onChange={handleChange} className='contact-input' placeholder='Subject' />

                    <label htmlFor="message" className='contact-label'>Message:</label>
                    <textarea name="message" id='message' value={message} onChange={handleChange} className='contact-input contact-textarea' placeholder='Your Message' />

                    {errorMessage && (
                        <div>
                            <p className="error-text">*{errorMessage}</p>
                        </div>
                    )}

                    {successMessage && (
                        <div>
                            <p className="success-text">{successMessage}</p>
                        </div>
                    )}

                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                        onChange={onChange}
                    />
                    <button type="submit" className='login-button'>Submit</button>
                </form>
            </section>
        </>
    );
};

export default ContactForm;
