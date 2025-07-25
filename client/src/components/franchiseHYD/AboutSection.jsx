import { Badge } from "../../components/ui/badge";
import {
  Users,
  Briefcase,
  Laptop,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
  CheckCircle,
  Star,
  Building2,
} from "lucide-react";
import "./AboutSection.css";
import { Card } from "../ui/card";
import "../../pages/Mohali/Index.css";
const AboutSection = () => {
  return (
    <section className="index-section">
      <div className="index-content-container">
        <div className="index-section-header">
          <Badge variant="outline" className="index-badge">
            About EarlyJobs Mohali
          </Badge>
          <h2 className="index-section-title">
            AI-Powered,{" "}
            <span className="text-gradient" style={{ color: "#FB7B0E" }}>
              Human-Backed
            </span>{" "}
            Recruitment
          </h2>
          <p className="index-section-description">
            EarlyJobs is an innovative recruitment platform that supports the
            industrial and educational strengths of Mohali, including IT,
            biotech, and manufacturing sectors. Our local franchise provides
            personalized support and deep understanding of the regional job
            market.
          </p>
        </div>

        <div className="index-features-grid">
          {[
            {
              icon: Building2,
              title: "Local Expertise",
              desc: "Deep understanding of Mohali's business ecosystem",
            },
            {
              icon: Users,
              title: "Community Focus",
              desc: "Supporting local talent and businesses",
            },
            {
              icon: CheckCircle,
              title: "Proven Results",
              desc: "500+ successful placements this year",
            },
          ].map((item, i) => (
            <Card key={i} className="index-feature-card">
              <item.icon
                className="index-feature-icon"
                style={{ color: "#FB7B0E" }}
              />
              <h3 className="index-feature-title">{item.title}</h3>
              <p className="index-feature-desc">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
