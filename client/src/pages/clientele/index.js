import React, { useEffect, useState } from "react";
import CompanyCard from "../../components/Clientele/CompanyCard";
import ClienteleCTA from "../../components/Clientele/ClienteleCTA";
import emailjs from "@emailjs/browser";
import "./client-styles.css";

const Clientele = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    spocname: "",
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/api/companies/companies`);
        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched companies:", data); // Debug: Log the response
        setCompanies(Array.isArray(data.companies) ? data.companies : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionStatus("error");
      setIsSubmitting(false);
      return;
    }

    emailjs
      .send(
        "service_ktesz0d",
        "template_8rhggt6",
        {
          from_name: formData.name,
          spoc: formData.spocname,
          email: formData.email,
          company: formData.company,
          message: formData.message || "No message provided",
          mobile: formData.mobile,
        },
        "kQToKIaSy6vQPRti5"
      )
      .then(
        () => {
          setSubmissionStatus("success");
          setIsSubmitting(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            message: "",
            spocname: "",
            mobile: "",
          });
          setTimeout(() => {
            setIsPopupOpen(false);
            setSubmissionStatus(null);
          }, 2000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setSubmissionStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="clientele-page">
      <section className="clientele-section-title">
        <h1 className="clientele-title">Our Clientele</h1>
        <div className="clientele-title-bar" />
        <p className="clientele-desc">
          EarlyJobs AI powers hiring for India's best brands.
        </p>
      </section>

      <main className="clientele-main">
        {loading ? (
          <div className="clientele-loading">Loading companies...</div>
        ) : error ? (
          <div className="clientele-error">Error: {error}</div>
        ) : companies.length > 0 ? (
          <div className="clientele-grid">
            {companies.map((company) => (
              <CompanyCard
                company={company}
                key={company.id}
                location={company.address || "No location provided"}
              />
            ))}
          </div>
        ) : (
          <div className="clientele-empty">No companies found.</div>
        )}
      </main>

      <ClienteleCTA setIsPopupOpen={setIsPopupOpen} />
      {isPopupOpen && (
        <div className="clientele-cta__popup-overlay">
          <div className="clientele-cta__popup">
            <button
              className="clientele-cta__popup-close"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
            <h3 className="clientele-cta__popup-heading">Work With Us</h3>
            <form onSubmit={handleSubmit} className="clientele-cta__form">
              <div className="clientele-cta__form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="clientele-cta__form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="clientele-cta__form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="clientele-cta__form-group">
                <label htmlFor="spocname">SPOC (Contact Person)</label>
                <input
                  type="text"
                  id="spocname"
                  name="spocname"
                  value={formData.spocname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="clientele-cta__form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>
              <div className="clientele-cta__form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="clientele-cta__form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              {submissionStatus === "success" && (
                <p className="clientele-cta__form-success">
                  Thank you! We'll get back to you soon.
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="clientele-cta__form-error">
                  Error submitting the form. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientele;