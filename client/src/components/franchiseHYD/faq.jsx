import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const Faq =()=>{
    return(
        <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about EarlyJobs Hyderabad</p>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Where is the EarlyJobs Hyderabad office located?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our franchise office is strategically located in HITEC City, making it easily accessible from all major areas of Hyderabad including Gachibowli, Kondapur, and Madhapur.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are the eligibility criteria for students?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">We welcome final year students and recent graduates from all streams - Engineering, MBA, BCA, B.Com, and more. No minimum percentage requirement, just the willingness to work and grow.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are your support hours?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Our team is available Monday to Saturday, 9:00 AM to 7:00 PM. We also provide 24/7 online support through our portal and WhatsApp helpline.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you charge any fees from students?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">No, our services are completely free for students and job seekers. We earn through our partnerships with employers who pay us for successful placements.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
}
export default Faq