import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Building2, GraduationCap, Factory } from 'lucide-react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <>
      <section className="about-section">
        <div className="container">
          <div className="heading-container">
            <h2 className="heading">About EarlyJobs Surat</h2>
            <p className="subheading">
              India's leading hybrid recruitment platform, now serving Surat's vibrant business ecosystem
            </p>
          </div>

          <div className="content-grid">
            <div className="text-content">
              <h3 className="text-title">Powering Surat's Growth</h3>
              <p className="text-description">
                EarlyJobs has established its presence in Surat to serve the city's thriving textile, 
                diamond polishing, and SME sectors. Our local franchise is committed to providing 
                real opportunities for students, colleges, and businesses in the region.
              </p>
              <p className="text-description">
                With deep understanding of Surat's commercial landscape and educational institutions, 
                we bridge the gap between skilled youth and progressive employers.
              </p>
            </div>

            <div className="cards-container">
              <Card className="feature-card">
                <CardContent className="card-content">
                  <div className="card-inner">
                    <Factory className="icon" />
                    <div>
                      <h4 className="card-title">Textile & Manufacturing</h4>
                      <p className="card-description">
                        Connecting talent with Surat's leading textile and manufacturing companies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="card-content">
                  <div className="card-inner">
                    <GraduationCap className="icon" />
                    <div>
                      <h4 className="card-title">Educational Partnerships</h4>
                      <p className="card-description">
                        Collaborating with local commerce and technical institutes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="feature-card">
                <CardContent className="card-content">
                  <div className="card-inner">
                    <Building2 className="icon" />
                    <div>
                      <h4 className="card-title">SME Support</h4>
                      <p className="card-description">
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