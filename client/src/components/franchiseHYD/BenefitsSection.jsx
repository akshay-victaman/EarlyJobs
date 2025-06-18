import { Card, CardContent,  CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Briefcase, FileText, } from 'lucide-react';

const BenefitsSection = () =>{
return(
    <section className="py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Benefits for Everyone</h2>
        <p className="text-xl text-gray-600">Tailored solutions for students, colleges, and employers</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Students */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-2xl flex items-center">
              <Users className="w-6 h-6 mr-3" />
              For Students
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p>Verified job opportunities across Hyderabad</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p>Walk-in interview support and guidance</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p>AI-powered skill assessment tests</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p>Resume building and interview preparation</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <p>Direct connection with HR teams</p>
              </div>
            </div>
          </CardContent>
        </Card>
    
        {/* Colleges */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader className="bg-orange-600 text-white">
            <CardTitle className="text-2xl flex items-center">
              <FileText className="w-6 h-6 mr-3" />
              For Colleges
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p>MoU partnerships for placement drives</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p>Dedicated placement coordination</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p>Industry connect programs</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p>Campus recruitment events</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <p>Student progress tracking</p>
              </div>
            </div>
          </CardContent>
        </Card>
    
        {/* Employers */}
        <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl flex items-center">
              <Briefcase className="w-6 h-6 mr-3" />
              For Employers
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p>Local hiring with curated candidates</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p>Pre-screened talent pool</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p>CRM tools for recruitment</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p>Reduced hiring time and costs</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <p>Quality assurance on hires</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </section>
)
}
export default BenefitsSection