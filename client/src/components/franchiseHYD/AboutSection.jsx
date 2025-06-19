import { Card,  CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Briefcase, FileText } from 'lucide-react';

const AboutSection = () => {
    return(
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Why EarlyJobs Chose Hyderabad</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Hyderabad stands as India's technology powerhouse, home to global tech giants, innovative startups, and world-class educational institutions. Our franchise brings EarlyJobs' proven recruitment methodology to this dynamic ecosystem, connecting the city's abundant fresh talent with its thriving job market.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">50,000+</CardTitle>
                <CardDescription>Students & Graduates Connected</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">500+</CardTitle>
                <CardDescription>Partner Companies in Hyderabad</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">95%</CardTitle>
                <CardDescription>Placement Success Rate</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    )
}

export default AboutSection