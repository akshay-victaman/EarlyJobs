import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Briefcase, FileText } from 'lucide-react';
import './BenefitsSection.css';

const BenefitsSection = () => {
    return (
        <section className="benefits-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Benefits for Everyone
                    </h2>
                    <p className="section-description">
                        Tailored solutions for students, colleges, and employers
                    </p>
                </div>
                <div className="card-grid">
                    {/* Students */}
                    <Card className="card">
                        <CardHeader className="card-header card-header-blue">
                            <CardTitle className="card-title">
                                <Users className="icon" />
                                For Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="card-content2">
                            <div className="benefit-list">
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p>Verified job opportunities across Hyderabad</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p>Walk-in interview support and guidance</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p>AI-powered skill assessment tests</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p>Resume building and interview preparation</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p>Direct connection with HR teams</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Colleges */}
                    <Card className="card">
                        <CardHeader className="card-header card-header-orange">
                            <CardTitle className="card-title">
                                <FileText className="icon" />
                                For Colleges
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="card-content2">
                            <div className="benefit-list">
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p>MoU partnerships for placement drives</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p>Dedicated placement coordination</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p>Industry connect programs</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p>Campus recruitment events</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p>Student progress tracking</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Employers */}
                    <Card className="card">
                        <CardHeader className="card-header card-header-green">
                            <CardTitle className="card-title">
                                <Briefcase className="icon" />
                                For Employers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="card-content2">
                            <div className="benefit-list">
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p>Local hiring with curated candidates</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p>Pre-screened talent pool</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p>CRM tools for recruitment</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p>Reduced hiring time and costs</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p>Quality assurance on hires</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default BenefitsSection