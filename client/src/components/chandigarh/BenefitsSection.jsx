import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Users, GraduationCap, Building2, Briefcase, TrendingUp, MapPin, Award, Clock, Target } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const BenefitsSection = () => {
  const benefits = {
    students: [
      {
        icon: Briefcase,
        title: "Internships & Fresher Jobs",
        description: "Access to verified opportunities across Chandigarh's top companies"
      },
      {
        icon: TrendingUp,
        title: "Career Guidance",
        description: "Expert resume building and interview preparation support"
      },
      {
        icon: MapPin,
        title: "Walk-in Support",
        description: "On-ground assistance for interviews and job placements"
      }
    ],
    colleges: [
      {
        icon: Award,
        title: "Placement Support",
        description: "Comprehensive campus drives and recruitment events"
      },
      {
        icon: Target,
        title: "CRM Access",
        description: "Dedicated platform for placement officers to track progress"
      },
      {
        icon: Users,
        title: "Co-branded Events",
        description: "Joint hiring events to boost your college's placement record"
      }
    ],
    employers: [
      {
        icon: Clock,
        title: "Pre-screened Candidates",
        description: "Access to verified, job-ready talent pool"
      },
      {
        icon: TrendingUp,
        title: "Affordable Hiring",
        description: "Cost-effective recruitment solutions for SMBs & startups"
      },
      {
        icon: GraduationCap,
        title: "Campus Connect",
        description: "Direct access to top colleges and fresh talent"
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Benefits & Solutions - Chandigarh Career Hub | Students, Colleges & Employers</title>
        <meta 
          name="description" 
          content="Discover tailored career solutions in Chandigarh for students (internships & jobs), colleges (placement support), and employers (recruitment). Find the perfect match for your needs."
        />
        <meta 
          name="keywords" 
          content="career benefits Chandigarh, student internships, college placements, employer recruitment, job opportunities, campus placement, hiring solutions, Chandigarh jobs, career guidance"
        />

        {/* Open Graph Tags */}
        <meta 
          property="og:title" 
          content="Benefits & Solutions - Chandigarh Career Hub | Students, Colleges & Employers"
        />
        <meta 
          property="og:description" 
          content="Comprehensive career solutions in Chandigarh - internships for students, placement support for colleges, and recruitment solutions for employers."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/chandigarh/benefits" />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="geo.region" content="IN-CH" />
        <meta name="geo.placename" content="Chandigarh" />

        {/* Schema.org Markup for Services */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Service",
            "name": "Chandigarh Career Hub Benefits",
            "provider": {
              "@type": "Organization",
              "name": "Chandigarh Career Hub"
            },
            "serviceType": "Career Services",
            "areaServed": {
              "@type": "City",
              "name": "Chandigarh"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Career Solutions",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Student Services",
                    "description": "Internships, fresher jobs, and career guidance for students"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "College Services",
                    "description": "Placement support and campus recruitment solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Employer Services",
                    "description": "Pre-screened candidates and affordable hiring solutions"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-purple-100">
              Benefits by Audience
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tailored Solutions for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a student, college, or employer, we have the right solution to meet your needs in Chandigarh.
            </p>
          </div>

          <div className="space-y-16">
            {/* Students Section */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.students.map((benefit, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-4">
                        <benefit.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Colleges Section */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                  <GraduationCap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Colleges</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.colleges.map((benefit, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-4">
                        <benefit.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Employers Section */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                  <Building2 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Employers</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.employers.map((benefit, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
                    <CardHeader>
                      <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-4">
                        <benefit.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-900">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BenefitsSection;
