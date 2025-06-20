import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { UserPlus, FileText, Users, ArrowRight } from 'lucide-react';
import './HowItWorksSection.css';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      step: "01",
      title: "Sign Up",
      description: "Register through our Chandigarh franchise portal with your details and preferences.",
      color: "blue"
    },
    {
      icon: FileText,
      step: "02", 
      title: "Submit Profile",
      description: "Upload your resume or post your job requirements with detailed specifications.",
      color: "green"
    },
    {
      icon: Users,
      step: "03",
      title: "Get Matched",
      description: "Our AI matches you with the best opportunities, followed by interviews and placements.",
      color: "purple"
    }
  ];

  return (
    <section className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <Badge className="how-it-works-badge">
            How It Works
          </Badge>
          <h2 className="how-it-works-title">
            Localized 3-Step Process
          </h2>
          <p className="how-it-works-subtitle">
            Our streamlined process ensures quick and effective connections between talent and opportunities in Chandigarh.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-container">
              <Card className={`step-card step-card-${step.color}`}>
                <CardHeader className="step-card-header">
                  <div className={`step-icon step-icon-${step.color}`}>
                    <step.icon className="step-icon-svg" />
                  </div>
                  <div className={`step-number step-number-${step.color}`}>
                    Step {step.step}
                  </div>
                  <CardTitle className="step-card-title">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="step-card-content">
                  <p className="step-description">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="step-arrow">
                  <ArrowRight className="step-arrow-icon" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;