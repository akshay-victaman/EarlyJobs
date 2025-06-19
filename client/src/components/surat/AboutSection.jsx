import React from 'react';

import { Card, CardContent } from '../../components/ui/card';
import { Building2, GraduationCap, Factory } from 'lucide-react';

const AboutSection = () => {
  return (
    <>
    

      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          {/* Heading - Improved responsive typography */}
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              About EarlyJobs Surat
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              India's leading hybrid recruitment platform, now serving Surat's vibrant business ecosystem
            </p>
          </div>

          {/* Content - Improved grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-start mb-8 sm:mb-12">
            {/* Text Content - Better spacing and typography */}
            <div className="space-y-4 sm:space-y-6 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold">Powering Surat's Growth</h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                EarlyJobs has established its presence in Surat to serve the city's thriving textile, 
                diamond polishing, and SME sectors. Our local franchise is committed to providing 
                real opportunities for students, colleges, and businesses in the region.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                With deep understanding of Surat's commercial landscape and educational institutions, 
                we bridge the gap between skilled youth and progressive employers.
              </p>
            </div>

            {/* Cards - Improved card styling */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Card 1 */}
               <Card className="border-l-4 border-l-accent hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Factory className="w-6 h-6 sm:w-8 sm:h-8 text-primary mt-1" />
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 mt-1">
                        Textile & Manufacturing
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Connecting talent with Surat's leading textile and manufacturing companies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 2 - Apply same styling to other cards */}
              <Card className="border-l-4 border-l-accent hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-primary mt-1" />
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 mt-1">
                        Educational Partnerships
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Collaborating with local commerce and technical institutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card 3 */}
              <Card className="border-l-4 border-l-accent hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-accent mt-1" />
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 mt-1">
                        SME Support
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Empowering small and medium enterprises with skilled workforce
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
