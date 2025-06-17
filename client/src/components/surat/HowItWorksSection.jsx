import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '../../components/ui/card';
import { UserPlus, Upload, CheckCircle } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Register via Surat franchise portal with your details",
      color: "text-blue-500"
    },
    {
      icon: Upload,
      title: "Upload & Match",
      description: "Upload your resume or job requirement to get matched locally",
      color: "text-green-500"
    },
    {
      icon: CheckCircle,
      title: "Get Placed",
      description: "Get interviewed and placed with Surat talent or employers",
      color: "text-purple-500"
    }
  ];

  return (
    <>
      <Helmet>
        <title>How It Works - EarlyJobs Surat Career Platform Process</title>
        <meta 
          name="description" 
          content="Learn how EarlyJobs Surat works in 3 simple steps. Register, upload your profile, and get placed with top employers in Surat's textile and manufacturing sectors."
        />
        <meta 
          name="keywords" 
          content="how to get job in Surat, Surat job process, career guidance Surat, placement process, job application steps, recruitment process Surat"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="How EarlyJobs Surat Works - Simple 3-Step Process" />
        <meta 
          property="og:description" 
          content="Simple 3-step process to connect with job opportunities in Surat. Register, match, and get placed with leading employers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://yourwebsite.com/how-it-works" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* HowTo Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Get Placed Through EarlyJobs Surat",
            "description": "Step-by-step process to find job opportunities in Surat",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Sign Up",
                "text": "Register via Surat franchise portal with your details"
              },
              {
                "@type": "HowToStep",
                "name": "Upload & Match",
                "text": "Upload your resume or job requirement to get matched locally"
              },
              {
                "@type": "HowToStep",
                "name": "Get Placed",
                "text": "Get interviewed and placed with Surat talent or employers"
              }
            ]
          })}
        </script>
      </Helmet>

      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple 3-step process to connect with opportunities in Surat
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center p-6 h-full">
                  <CardContent className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted ${step.color}`}>
                      <step.icon className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold">
                        Step {index + 1}: {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg font-medium text-primary">
               Hire Surat Talent •  Find Surat Jobs •  Build Local Connections
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;
