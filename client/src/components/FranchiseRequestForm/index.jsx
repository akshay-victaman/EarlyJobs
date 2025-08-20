import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

const RequestForm = ({ isFranchise }) => {
  const location = useLocation();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    district: "",
    lookingFor: "",
  });

  useEffect(() => {
    console.log("isFranchise", location);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function onChange(value) {
    setCaptchaValue(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Captcha validation
    if (!captchaValue) {
      toast.error("Please verify the captcha");
      return;
    }

    try {
      
      const sheetData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        district: formData.district,
        lookingFor: isFranchise ? "Franchise" : formData.lookingFor,
        postDateTime: new Date().toISOString(),
      };

      // Send data to SheetDB
      const sheetResponse = await fetch("https://sheetdb.io/api/v1/cw5ryaik6yrl1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [sheetData] }),
        }
      );

      if (!sheetResponse.ok) {
        throw new Error("Failed to save data to SheetDB");
      }

      
      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        contact: formData.contact,
        district: formData.district,
        looking_for: isFranchise ? "Franchise" : formData.lookingFor,
        to_email:
          formData.lookingFor === "Candidate"
            ? "franchise@earlyjobs.in"
            : "akanksha@earlyjobs.in",
        cc_email: "prajwal@earlyjobs.in",
        subject: `Consultation Request from ${formData.name}`,
        message: `
          <html>
            <body>
              <p>Hi Earlyjobs Team,</p>
              <p>We have received a request for free consultation from <strong>${formData.name}</strong> with email id <strong>${formData.email}</strong> and contact number <strong>${formData.contact}</strong>.</p>
              <p>They are looking for <strong>${isFranchise ? "Franchise" : formData.lookingFor}</strong>.</p>
              <p>District: <strong>${formData.district}</strong></p>
              <p>Regards,<br>earlyjobs.in team<br>Victaman Enterprises</p>
            </body>
          </html>
        `,
      };

      // Send email using EmailJS
      await emailjs.send(
        "service_ovaxj17",
        "template_v0jj42o",
        emailParams,
        "Qz7wBRaW9bttj7rra"
      );

      toast.success("Your request has been submitted successfully");

     
      setFormData({
        name: "",
        email: "",
        contact: "",
        district: "",
        lookingFor: "",
      });
    } catch (error) {
      console.error("Error submitting consultation request: ", error);
      toast.error("There was an issue submitting your request. Please try again.");
    }
  };

  return (
    <form className="landing-page-s7-consultation-form" onSubmit={handleSubmit}>
      {location.pathname === "/franchise" ? null : (
        <>
          <h2 className="landing-page-s7-consultation-heading">
            Free Consultation by Expert
          </h2>
          <hr className="landing-page-s7-consultation-hr" />
        </>
      )}
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
      <input
        type="text"
        required
        placeholder="District"
        className="landing-page-s7-consultation-input"
        name="district"
        value={formData.district}
        onChange={handleInputChange}
      />
      {location.pathname === "/franchise" ? null : (
        <>
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
            <label
              htmlFor="Job"
              className="landing-page-s7-consultation-radio-label"
            >
              Looking For Job
            </label>
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
            <label
              htmlFor="Candidate"
              className="landing-page-s7-consultation-radio-label"
            >
              Looking For Candidate
            </label>
          </div>
        </>
      )}
      <ReCAPTCHA
        sitekey={"6LdnwcgpAAAAAKUNM_UcDRCQcbUw0B_ICG9VIzxI"}
        onChange={onChange}
      />
      <button type="submit" className="landing-page-s7-consultation-btn">
        Send
      </button>
    </form>
  );
};

export default RequestForm;