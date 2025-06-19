import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { UserPlus, FileText, Users, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>How It Works - Chandigarh Career Hub Process | 3 Simple Steps</title>
        <meta 
          name="description" 
          content="Learn our simple 3-step process for connecting with opportunities in Chandigarh. Sign up, submit your profile, and get matched with leading employers. Quick and effective career connections." 
        />
        <meta 
          name="keywords" 
          content="career process Chandigarh, job application steps, how to find jobs Chandigarh, recruitment process, career guidance, job matching, employment process, Chandigarh jobs" 
        />

        {/* Open Graph Tags */}
        <meta 
          property="og:title" 
          content="How It Works - Chandigarh Career Hub Process | 3 Simple Steps" 
        />
        <meta 
          property="og:description" 
          content="Discover our streamlined 3-step process for connecting talent with opportunities in Chandigarh. Sign up, submit profile, get matched with top employers." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh/how-it-works" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />
        
        {/* Schema.org Markup for Process Steps */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "HowTo",
            "name": "How to Find Career Opportunities in Chandigarh",
            "description": "A simple 3-step process to connect with career opportunities in Chandigarh",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Sign Up",
                "text": "Register through our Chandigarh franchise portal with your details and preferences."
              },
              {
                "@type": "HowToStep",
                "name": "Submit Profile",
                "text": "Upload your resume or post your job requirements with detailed specifications."
              },
              {
                "@type": "HowToStep",
                "name": "Get Matched",
                "text": "Our AI matches you with the best opportunities, followed by interviews and placements."
              }
            ]
          })}
        </script>
      </Helmet>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Localized 3-Step Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process ensures quick and effective connections between talent and opportunities in Chandigarh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className={`hover:shadow-lg transition-all duration-300 border-t-4 ${
                  step.color === 'blue' ? 'border-t-blue-500' :
                  step.color === 'green' ? 'border-t-green-500' : 'border-t-purple-500'
                }`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      step.color === 'blue' ? 'bg-blue-100' :
                      step.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      <step.icon className={`w-10 h-10 ${
                        step.color === 'blue' ? 'text-blue-600' :
                        step.color === 'green' ? 'text-green-600' : 'text-purple-600'
                      }`} />
                    </div>
                    <div className={`text-sm font-bold px-3 py-1 rounded-full inline-block ${
                      step.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                      step.color === 'green' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      Step {step.step}
                    </div>
                    <CardTitle className="text-xl text-gray-900 mt-4">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

         
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;
