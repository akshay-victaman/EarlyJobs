import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Users, Building2, GraduationCap, CheckCircle, Star, Briefcase } from 'lucide-react';

import './BenefitsSection.css';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "For Students",
      items: [
        "Verified internships across Chandigarh",
        "Entry-level job opportunities",
        "Resume building & career guidance",
        "Walk-in interview support",
        "Skill development workshops"
      ],
      color: "blue"
    },
    {
      icon: GraduationCap,
      title: "For Colleges",
      items: [
        "Dedicated placement support",
        "Campus recruitment drives",
        "Placement officer CRM access",
        "Co-branded hiring events",
        "Industry-academia partnerships"
      ],
      color: "green"
    },
    {
      icon: Building2,
      title: "For Employers",
      items: [
        "Pre-screened candidate access",
        "Cost-effective hiring solutions",
        "Campus connect facilitation",
        "Local talent pool access",
        "Flexible recruitment packages"
      ],
      color: "purple"
    }
  ];

  return (
    <section className="chandigarh-section">
      <div className="chandigarh-container">
        <div className="chandigarh-header">
          <Badge className="chandigarh-badge">
            <Star className="chandigarh-badge-icon" />
            Why Choose Us
          </Badge>
          <h2 className="chandigarh-title">
            Tailored Solutions for Every Stakeholder
          </h2>
          <p className="chandigarh-subtitle">
            Whether you're a student seeking opportunities, a college looking for placement support, 
            or an employer searching for talent, we have the right solution for you.
          </p>
        </div>

        <div className="chandigarh-grid">
          {benefits.map((benefit, index) => (
            <Card key={index} className={`chandigarh-card chandigarh-card-${benefit.color}`} style={{padding:"10px"}}>
              <CardHeader className="chandigarh-card-header">
                <div className={`chandigarh-icon chandigarh-icon-${benefit.color}`}>
                  <benefit.icon className="chandigarh-icon-svg" />
                </div>
                <CardTitle className="chandigarh-card-title">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="chandigarh-card-content">
                <ul className="chandigarh-list">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="chandigarh-item">
                      <CheckCircle className="chandigarh-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;