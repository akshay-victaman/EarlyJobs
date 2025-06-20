import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Briefcase, FileText } from 'lucide-react';
import './BenefitsSection.css';

const BenefitsSection = () => {
    return (
        <section className="benefits-section" style={{backgroundColor:"#fff",background:"#fff",padding:"0px"}}>
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
                            <CardTitle className="card-title" style={{color:"#fff"}}>
                                <Users className="icon" style={{color:"#fff"}}/>
                                For Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="card-content2">
                            <div className="benefit-list">
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p style={{color:"#000"}}>Verified job opportunities across Hyderabad</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p style={{color:"#000"}}>Walk-in interview support and guidance</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p style={{color:"#000"}}>AI-powered skill assessment tests</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p style={{color:"#000"}}>Resume building and interview preparation</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-blue"></div>
                                    <p style={{color:"#000"}}>Direct connection with HR teams</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Colleges */}
                    <Card className="card">
                        <CardHeader className="card-header card-header-orange">
                            <CardTitle  className="card-title" style={{color:"#fff"}}>
                                <FileText className="icon" style={{color:"#fff"}}/>
                                For Colleges
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="card-content2">
                            <div className="benefit-list">
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p style={{color:"#000"}}>MoU partnerships for placement drives</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p style={{color:"#000"}}>Dedicated placement coordination</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p style={{color:"#000"}}>Industry connect programs</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p style={{color:"#000"}}>Campus recruitment events</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-orange"></div>
                                    <p style={{color:"#000"}}>Student progress tracking</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    {/* Employers */}
                    <Card className="card">
                        <CardHeader className="card-header card-header-green">
                            <CardTitle className="card-title" style={{color:"#fff"}}>
                                <Briefcase className="icon" style={{color:"#fff"}}/>
                                For Employers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="card-content2">
                            <div className="benefit-list">
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p style={{color:"#000"}}>Local hiring with curated candidates</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p style={{color:"#000"}}>Pre-screened talent pool</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p style={{color:"#000"}}>CRM tools for recruitment</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p style={{color:"#000"}}>Reduced hiring time and costs</p>
                                </div>
                                <div className="benefit-item">
                                    <div className="bullet bullet-green"></div>
                                    <p style={{color:"#000"}}>Quality assurance on hires</p>
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