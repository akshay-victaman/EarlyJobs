import { Card, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Briefcase, FileText, AlignCenter } from 'lucide-react';
import './AboutSection.css';


const AboutSection = () => {
    return (
        <section className="about-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Why EarlyJobs Chose Hyderabad
                    </h2>
                    <p className="section-description">
                        Hyderabad stands as India's technology powerhouse, home to global tech giants, innovative startups, and world-class educational institutions. Our franchise brings EarlyJobs' proven recruitment methodology to this dynamic ecosystem, connecting the city's abundant fresh talent with its thriving job market.
                    </p>
                </div>
                <div className="card-grid">
                    <Card className="card">
                        <CardHeader style={{ alignItems: 'center',textAlign:"center" }}>
                            <div className="icon-container icon-container-blue">
                                <Users className="icon icon-blue" style={{marginRight: '0px'}} />
                            </div>
                            <h3 >
                                50,000+
                            </h3>
                            <CardDescription className="card-description">
                                Students & Graduates Connected
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="card">
                        <CardHeader style={{ alignItems: 'center',textAlign:"center" }}>
                            <div className="icon-container icon-container-orange">
                                <Briefcase className="icon icon-orange" style={{marginRight: '0px'}}/>
                            </div>
                            <h3 >
                                500+
                            </h3>
                            <CardDescription className="card-description">
                                Partner Companies in Hyderabad
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="card">
                        <CardHeader style={{ alignItems: 'center',textAlign:"center" }}>
                            <div className="icon-container icon-container-green">
                                <FileText className="icon icon-green" style={{marginRight: '0px'}}/>
                            </div>
                            <h3 >
                                95%
                            </h3>
                            <CardDescription className="card-description">
                                Placement Success Rate
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default AboutSection