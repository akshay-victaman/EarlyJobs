import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Briefcase, Calendar } from 'lucide-react';
import './LocalEvents.css';

const LocalEvents = () => {
    return (
        <section className="events-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Upcoming Events in Hyderabad
                    </h2>
                    <p className="section-description">
                        Join our job fairs, recruitment drives, and networking events
                    </p>
                </div>
                <div className="card-grid">
                    <Card className="card">
                        <CardContent className="card-content">
                            <div className="event-header">
                                <Calendar className="icon icon-blue" />
                                <Badge className="badge-blue" style={{ padding:"6px",borderRadius: '4px' }}>
                                    Job Fair
                                </Badge>
                            </div>
                            <h3 className="event-title">
                                HITEC City Tech Job Fair
                            </h3>
                            <p className="event-description">
                                Connect with 50+ leading tech companies hiring for immediate positions
                            </p>
                            <p className="event-details">
                                Date: Coming Soon | Location: HITEC City Convention Center
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardContent className="card-content">
                            <div className="event-header">
                                <Users className="icon icon-orange" />
                                <Badge className="badge-orange" style={{ padding:"6px",borderRadius: '4px' }}>
                                    Campus Drive
                                </Badge>
                            </div>
                            <h3 className="event-title">
                                Engineering Campus Drives
                            </h3>
                            <p className="event-description">
                                Exclusive recruitment drives across top engineering colleges
                            </p>
                            <p className="event-details">
                                Date: Monthly | Location: Partner Colleges
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardContent className="card-content">
                            <div className="event-header">
                                <Briefcase className="icon icon-green" />
                                <Badge className="badge-green" style={{ padding:"6px",borderRadius: '4px' }}>
                                    Networking
                                </Badge>
                            </div>
                            <h3 className="event-title">
                                Employer Connect Sessions
                            </h3>
                            <p className="event-description">
                                Direct interaction between students and hiring managers
                            </p>
                            <p className="event-details">
                                Date: Weekly | Location: EarlyJobs Hyderabad Office
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default LocalEvents