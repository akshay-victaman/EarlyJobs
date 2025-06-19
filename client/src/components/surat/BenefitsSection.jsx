import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { CheckCircle, Users, Building, Target, ArrowRight } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Users,
      title: "Start Your Career",
      badge: "For Students",
      color: "from-primary to-accent",
      features: [
        "Verified jobs and internships in Surat",
        "Weekly walk-in interview drives",
        "Skill and resume-building guidance",
        "Local industry connections"
      ]
    },
    {
      icon: Building,
      title: "Enhance Placements",
      badge: "For Colleges",
      color: "from-primary to-accent",
      features: [
        "Direct access to industry for placements",
        "Campus drive coordination",
        "Student CRM access",
        "Placement analytics and reporting"
      ]
    },
    {
      icon: Target,
      title: "Find Right Talent",
      badge: "For Employers",
      color: "from-primary to-accent",
      features: [
        "Ready pool of local, job-seeking talent",
        "Affordable and fast hiring support",
        "Pre-screened candidates",
        "Local market expertise"
      ]
    }
  ];

  return (
    <>

      <section className="pb-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          {/* Heading */}
          <div className="text-center mb-16 px-2">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-lg font-medium" style={{fontWeight: '900'}}>

              Key Benefits
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Tailored Solutions for Every Stakeholder
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive support designed specifically for Surat's dynamic job market
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover-lift border-0 shadow-lg hover:shadow-2xl bg-white relative overflow-hidden transition-all">
                {/* Top Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r`} />

                {/* Card Header */}
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg`}>
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {benefit.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl font-bold">{benefit.title}</CardTitle>
                </CardHeader>

                {/* Card Content */}
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {benefit.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-primary font-medium group cursor-pointer">
                      {/* <span>Learn More</span> */}
                      {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;
