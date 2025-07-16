import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import "./HeroSection.css";

const HeroSection = () => {
  const scrollToLeadForm = () => {
    document
      .getElementById("hyd-lead-capture")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section">
      <div className="overlay"></div>
      <div className="container">
        <div
          className="content"
          style={{ alignItems: "center", textAlign: "center" }}
        >
          <Badge
            className="badge"
            style={{
              width: "max-content",
              borderRadius: "25px",
              padding: "10px",
            }}
          >
            Now in Hyderabad - India's Cyberabad
          </Badge>
          <h1 className="title">
            Your Gateway to Career Success in{" "}
            <span className="title-highlight">Hyderabad</span>
          </h1>
          <p className="description">
            EarlyJobs connects fresh talent with verified opportunities across
            Hyderabad's booming tech and business landscape. From HITEC City
            startups to established enterprises.
          </p>
          <div className="button-container">
            <Button onClick={scrollToLeadForm} className="register-button">
              Register for Job Support
            </Button>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-icon">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
