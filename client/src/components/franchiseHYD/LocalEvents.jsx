import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Briefcase, Calendar } from "lucide-react";
import "./LocalEvents.css";
import { Button } from "../ui/button";

const LocalEvents = () => {
  return (
    <section className="events-section">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title">Upcoming Events in Hyderabad</h2>
          <p className="section-description">
            Join our job fairs, recruitment drives, and networking events
          </p>
        </div>
        <div className="card-grid">
          <Card className="card">
            <CardContent className="card-content">
              <div className="event-header">
                <Calendar className="icon icon-blue" />
                <Badge
                  className="badge-blue"
                  style={{ padding: "6px", borderRadius: "4px" }}
                >
                  Job Fair
                </Badge>
              </div>
              <h3 className="event-title">HITEC City Tech Job Fair</h3>
              <p className="event-description">
                Connect with 50+ leading tech companies hiring for immediate
                positions
              </p>
              <Button
                variant="outline"
                className="badge-blue"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "10px 20px",
                  cursor: "default",
                  opacity: 0.7,
                  background: "linear-gradient(135deg, #f5f7fa, #e4e7eb)",
                  border: "2px solid #4a90e2",
                  borderRadius: "12px",
                  color: "#1a3c6d",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
                disabled
              >
                Coming Soon{" "}
              </Button>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="card-content">
              <div className="event-header">
                <Users className="icon icon-orange" />
                <Badge
                  className="badge-orange"
                  style={{ padding: "6px", borderRadius: "4px" }}
                >
                  Campus Drive
                </Badge>
              </div>
              <h3 className="event-title">Engineering Campus Drives</h3>
              <p className="event-description">
                Exclusive recruitment drives across top engineering colleges
              </p>
              <Button
                variant="outline"
                className="badge-blue"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "10px 20px",
                  cursor: "default",
                  opacity: 0.7,
                  background: "linear-gradient(135deg, #f5f7fa, #e4e7eb)",
                  border: "2px solid #c2410c",
                  borderRadius: "12px",
                  color: "#c2410c",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
                disabled
              >
                Coming Soon{" "}
              </Button>
            </CardContent>
          </Card>
          <Card className="card">
            <CardContent className="card-content">
              <div className="event-header">
                <Briefcase className="icon icon-green" />
                <Badge
                  className="badge-green"
                  style={{ padding: "6px", borderRadius: "4px" }}
                >
                  Networking
                </Badge>
              </div>
              <h3 className="event-title">Employer Connect Sessions</h3>
              <p className="event-description">
                Direct interaction between students and hiring managers
              </p>
              <Button
                variant="outline"
                className="badge-green"
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "10px 20px",
                  cursor: "default",
                  opacity: 0.7,
                  background: "linear-gradient(135deg, #f5f7fa, #e4e7eb)",
                  border: "2px solid #15803d",
                  borderRadius: "12px",
                  color: "#15803d",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
                disabled
              >
                Coming Soon{" "}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LocalEvents;
