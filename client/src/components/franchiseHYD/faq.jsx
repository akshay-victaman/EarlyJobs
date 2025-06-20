import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import './Faq.css';

const Faq = () => {
    return (
        <section className="faq-section">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-title">
                        Frequently Asked Questions
                    </h2>
                    <p className="section-description">
                        Everything you need to know about EarlyJobs Hyderabad
                    </p>
                </div>
                <div className="faq-list">
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="card-title">
                                Where is the EarlyJobs Hyderabad office located?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="card-content">
                                Our franchise office is strategically located in HITEC City, making it easily accessible from all major areas of Hyderabad including Gachibowli, Kondapur, and Madhapur.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="card-title">
                                What are the eligibility criteria for students?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="card-content">
                                We welcome final year students and recent graduates from all streams - Engineering, MBA, BCA, B.Com, and more. No minimum percentage requirement, just the willingness to work and grow.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="card-title">
                                What are your support hours?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="card-content">
                                Our team is available Monday to Saturday, 9:00 AM to 7:00 PM. We also provide 24/7 online support through our portal and WhatsApp helpline.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="card">
                        <CardHeader>
                            <CardTitle className="card-title">
                                Do you charge any fees from students?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="card-content">
                                No, our services are completely free for students and job seekers. We earn through our partnerships with employers who pay us for successful placements.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

export default Faq