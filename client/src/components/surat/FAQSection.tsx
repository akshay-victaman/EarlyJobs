import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

const FAQSection = () => {
  const city = 'Surat';

  const faqs = [
    {
      question: 'Is EarlyJobs a job consultancy or a college placement partner?',
      answer: `EarlyJobs is a hybrid recruitment platform that works both with students directly and through colleges. We offer verified internships, entry-level jobs, and campus drives via our local franchise in ${city}, making it easier for students and companies to connect without traditional consultancy fees.`
    },
    {
      question: 'Is there any registration fee for students or job seekers?',
      answer: 'No. Registration on EarlyJobs is 100% free for students and job seekers. We do not charge any fees for applying, attending interviews, or getting placed through our platform.'
    },
    {
      question: `I represent a college in ${city}. How can we partner for placements or campus drives?`,
      answer: 'You can submit your details through the contact form on this page or reach out directly to the local franchise. We’ll get in touch to explain how our platform and team support college-level placements and skill-building initiatives.'
    },
    {
      question: `Can businesses and startups in ${city} list their job or internship openings here?`,
      answer: `Yes. If you’re an employer or a recruiter in ${city}, you can easily submit your hiring needs through the portal. Our local franchise team will help you connect with relevant, pre-screened candidates quickly.`
    },
    {
      question: 'What makes EarlyJobs different from other job portals or freelancing recruiters?',
      answer: 'EarlyJobs combines AI-powered technology with local human support. Our city-based franchise teams organize walk-ins, offer career help, and ensure faster placements through personalized follow-ups — something no traditional portal can match.'
    }
  ];

  const [openItems, setOpenItems] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <Helmet>
        <title>FAQ - EarlyJobs Surat Career Platform | Common Questions</title>
        <meta 
          name="description" 
          content="Find answers to frequently asked questions about EarlyJobs Surat's recruitment services, job opportunities, college partnerships, and placement process."
        />
        <meta 
          name="keywords" 
          content="EarlyJobs FAQ, Surat jobs FAQ, career questions, placement process, internship queries, campus recruitment FAQ, job seeker guide Surat, employer FAQ"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="FAQ - EarlyJobs Surat Career Platform" />
        <meta 
          property="og:description" 
          content="Get answers to common questions about jobs, internships, and recruitment services at EarlyJobs Surat."
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />

        {/* Additional SEO Tags */}
        <link rel="canonical" href="https://yourwebsite.com/faq" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="EarlyJobs Surat" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Structured Data for FAQ Page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      </Helmet>

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header - Improved responsive typography */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Get answers to common questions about EarlyJobs {city}
            </p>
          </div>

          {/* FAQ Cards - Improved spacing and typography */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border shadow-sm hover:shadow-md transition-shadow">
                <Collapsible>
                  <CollapsibleTrigger
                    className="w-full"
                    onClick={() => toggleItem(index)}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between text-left gap-4">
                        <h3 className="font-medium text-base sm:text-lg leading-tight sm:leading-normal">
                          {faq.question}
                        </h3>
                        <ChevronDown
                          className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-200 ${
                            openItems.includes(index) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-4 sm:pb-6 px-4 sm:px-6">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
