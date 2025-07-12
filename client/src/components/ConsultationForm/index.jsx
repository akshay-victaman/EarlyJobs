import React, { useEffect } from "react";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import app from "../../firebase";
import { useLocation } from "react-router-dom";
import "./style.css"; // Import the updated CSS file

const ConsultationForm = ({ isFranchise }) => {
  const db = getFirestore(app); // Initialize Firestore
  const location = useLocation();
  useEffect(() => {
    console.log("isFranchise", location);
  }, []);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    lookingFor: "",
    cityDistrict: isFranchise ? "" : undefined,
    occupation: isFranchise ? "" : undefined,
    investmentBudget: isFranchise ? "" : undefined,
    startTimeline: isFranchise ? "" : undefined,
    businessIntent: isFranchise ? "" : undefined,
    timeCommitment: isFranchise ? "" : undefined,
    referralSource: isFranchise ? "" : undefined,
    consent: isFranchise ? false : undefined,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      // Prepare form data based on isFranchise
      const newConsultForm = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        lookingFor: isFranchise ? "Franchise" : formData.lookingFor,
        ...(isFranchise && {
          cityDistrict: formData.cityDistrict,
          occupation: formData.occupation,
          investmentBudget: formData.investmentBudget,
          startTimeline: formData.startTimeline,
          businessIntent: formData.businessIntent,
          timeCommitment: formData.timeCommitment,
          referralSource: formData.referralSource,
          consent: formData.consent,
        }),
      };

      // Step 1: Add the document with the form data to Firestore
      const docRef = await addDoc(collection(db, "ConsultationRequests"), {
        ...newConsultForm,
      });
      const docId = docRef.id;
      const postDateTime = new Date();

      // Step 2: Update the document with the generated docId and postDateTime
      await setDoc(doc(db, "ConsultationRequests", docId), {
        docId,
        postDateTime,
        ...newConsultForm,
      });

      // Send an email (if required) using your email logic
      let emailContent = `
                Hi Earlyjobs Team,
                <br><br>
                We have received a request for free consultation from <strong>${formData.name}</strong> with email id <strong>${formData.email}</strong> and contact number <strong>${formData.contact}</strong>. 
                They are looking for <strong>${isFranchise ? "Franchise" : formData.lookingFor}</strong>.
                ${isFranchise
                  ? `<br><br>Additional Details:<br>
                     City & District: <strong>${formData.cityDistrict}</strong><br>
                     Occupation: <strong>${formData.occupation}</strong><br>
                     Investment Budget: <strong>${formData.investmentBudget}</strong><br>
                     Start Timeline: <strong>${formData.startTimeline}</strong><br>
                     Business Intent: <strong>${formData.businessIntent}</strong><br>
                     Time Commitment: <strong>${formData.timeCommitment}</strong><br>
                     Referral Source: <strong>${formData.referralSource}</strong><br>
                     Consent: <strong>${formData.consent ? "Yes" : "No"}</strong>`
                  : ""
                }
                <br><br>
                Regards,<br> 
                earlyjobs.in team
                <br> 
                Victaman Enterprises
            `;
      const encodedContent = encodeURIComponent(emailContent);
      const queryParameters = {
        method: "EMS_POST_CAMPAIGN",
        userid: "2000702445",
        password: "LEP9yt",
        v: "1.1",
        contentType: "text/html",
        name: "Earlyjobs Consultation Request",
        fromEmailId: "no-reply@earlyjobs.in",
        subject: `Consultation Request from ${formData.name}`,
        recipients:
          isFranchise
            ? "akanksha@earlyjobs.in"
            : formData.lookingFor === "Candidate"
            ? "asish@earlyjobs.in"
            : "akanksha@earlyjobs.in",
        content: encodedContent,
        replyToEmailID: "no-reply@earlyjobs.in",
      };
      const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`;
      await fetch(url, { method: "GET", mode: "no-cors" });

      toast.success("Your request has been submitted successfully");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        contact: "",
        lookingFor: "",
        cityDistrict: isFranchise ? "" : undefined,
        occupation: isFranchise ? "" : undefined,
        investmentBudget: isFranchise ? "" : undefined,
        startTimeline: isFranchise ? "" : undefined,
        businessIntent: isFranchise ? "" : undefined,
        timeCommitment: isFranchise ? "" : undefined,
        referralSource: isFranchise ? "" : undefined,
        consent: isFranchise ? false : undefined,
      });
    } catch (error) {
      console.error("Error submitting consultation request: ", error);
      toast.error(
        "There was an issue submitting your request. Please try again."
      );
    }
  };

  return (
    <form className="consultation-form" onSubmit={handleSubmit}>
      {location.pathname === "/franchise" ? null : (
        <>
          <h2 className="consultation-heading">
            Free Consultation by Expert
          </h2>
          <hr className="consultation-hr" />
        </>
      )}
      <div className="space-y-6">
        <input
          type="text"
          required
          placeholder="Enter Your Name"
          className="consultation-input"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          required
          placeholder="Enter Email Id"
          className="consultation-input"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="tel"
          required
          placeholder="Contact Number"
          className="consultation-input"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
        {isFranchise ? (
          <>
            <input
              type="text"
              required
              placeholder="Where do you plan to open your franchise?"
              className="consultation-input"
              name="cityDistrict"
              value={formData.cityDistrict || ""}
              onChange={handleInputChange}
            />
            <select
              required
              className="consultation-input consultation-select"
              name="occupation"
              value={formData.occupation || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                What do you currently do?
              </option>
              <option value="Working Professional">Working Professional</option>
              <option value="Business Owner">Business Owner</option>
              <option value="Consultant">Consultant</option>
              <option value="HR Recruiter">HR Recruiter</option>
              <option value="Freelancer">Freelancer</option>
              <option value="Other">Other</option>
            </select>
            <select
              required
              className="consultation-input consultation-select"
              name="investmentBudget"
              value={formData.investmentBudget || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                How much are you willing to invest in setting up the franchise?
              </option>
              <option value="₹1–2 Lakhs">₹1–2 Lakhs</option>
              <option value="₹2–3 Lakhs">₹2–3 Lakhs</option>
              <option value="₹3–5 Lakhs">₹3–5 Lakhs</option>
              <option value="₹5 Lakhs+">₹5 Lakhs+</option>
            </select>
            <select
              required
              className="consultation-input consultation-select"
              name="startTimeline"
              value={formData.startTimeline || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                When do you plan to start your franchise journey?
              </option>
              <option value="Immediately">Immediately</option>
              <option value="Within 15 Days">Within 15 Days</option>
              <option value="Within 30 Days">Within 30 Days</option>
              <option value="Just Exploring">Just Exploring</option>
            </select>
            <textarea
              required
              placeholder="Why do you want to start a recruitment franchise with EarlyJobs?"
              className="consultation-textarea"
              name="businessIntent"
              value={formData.businessIntent || ""}
              onChange={handleInputChange}
            />
            <select
              required
              className="consultation-input consultation-select"
              name="timeCommitment"
              value={formData.timeCommitment || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                How do you plan to manage your franchise?
              </option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Not Sure Yet">Not Sure Yet</option>
            </select>
            <select
              required
              className="consultation-input consultation-select"
              name="referralSource"
              value={formData.referralSource || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                How did you hear about us?
              </option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
            <div className="consultation-consent-con">
              <input
                type="checkbox"
                required
                name="consent"
                id="consent"
                className="consultation-consent"
                checked={formData.consent || false}
                onChange={handleInputChange}
              />
              <label
                htmlFor="consent"
                className="consultation-consent-label"
              >
                I consent to EarlyJobs contacting me via WhatsApp, phone, or email
                with relevant franchise information.
              </label>
            </div>
          </>
        ) : (
          <>
            <div className="consultation-radio-con">
              <input
                type="radio"
                required
                name="lookingFor"
                id="Job"
                className="consultation-radio"
                value="Job"
                onChange={handleInputChange}
              />
              <label
                htmlFor="Job"
                className="consultation-radio-label"
              >
                Looking For Job
              </label>
            </div>
            <div className="consultation-radio-con">
              <input
                type="radio"
                required
                name="lookingFor"
                id="Candidate"
                className="consultation-radio"
                value="Candidate"
                onChange={handleInputChange}
              />
              <label
                htmlFor="Candidate"
                className="consultation-radio-label"
              >
                Looking For Candidate
              </label>
            </div>
          </>
        )}
        <div className="g-recaptcha">
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="consultation-btn"
        >
          {isFranchise ? "Submit & Get Franchise Proposal" : "Send"}
        </button>
      </div>
    </form>
  );
};

export default ConsultationForm;