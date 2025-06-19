import { Card, CardContent,  } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Briefcase, Calendar,  } from 'lucide-react';

const LocalEvents = () => {
    return (
       <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Upcoming Events in Hyderabad</h2>
                <p className="text-xl text-gray-600">Join our job fairs, recruitment drives, and networking events</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                      <Badge className="bg-blue-100 text-blue-800">Job Fair</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">HITEC City Tech Job Fair</h3>
                    <p className="text-gray-600 mb-4">Connect with 50+ leading tech companies hiring for immediate positions</p>
                    <p className="text-sm text-gray-500">Date: Coming Soon | Location: HITEC City Convention Center</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-orange-600 mr-3" />
                      <Badge className="bg-orange-100 text-orange-800">Campus Drive</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Engineering Campus Drives</h3>
                    <p className="text-gray-600 mb-4">Exclusive recruitment drives across top engineering colleges</p>
                    <p className="text-sm text-gray-500">Date: Monthly | Location: Partner Colleges</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Briefcase className="w-6 h-6 text-green-600 mr-3" />
                      <Badge className="bg-green-100 text-green-800">Networking</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Employer Connect Sessions</h3>
                    <p className="text-gray-600 mb-4">Direct interaction between students and hiring managers</p>
                    <p className="text-sm text-gray-500">Date: Weekly | Location: EarlyJobs Hyderabad Office</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
    )
}
export default LocalEvents