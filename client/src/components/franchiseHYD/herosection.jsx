import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
const HeroSection = () => {
  const scrollToLeadForm = () => {
    document.getElementById('hyd-lead-capture')?.scrollIntoView({ behavior: 'smooth' });
  };
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-800 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8 animate-fade-in">
          <Badge
  className="border border-orange-500  text-orange-500 bg-transparent px-6 py-2 text-[16px]  font-semibold
    hover:bg-orange-500 hover:text-white
    transition duration-300 ease-in-out
    shadow-[0_0_20px_rgba(255,115,0,0.9)]
    hover:shadow-[0_0_10px_rgba(255,115,0,0.6)]" 
    style={{ backgroundColor: 'transparent', color: 'orange' }}
>
  🚀 Now in Hyderabad - India's Cyberabad
</Badge>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Gateway to Career Success in{' '}
              <span className="text-orange-400">Hyderabad</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-blue-100">
              EarlyJobs connects fresh talent with verified opportunities across Hyderabad's booming tech and business landscape. From HITEC City startups to established enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button onClick={scrollToLeadForm} size="lg" className="bg-orange-500 rounded-xl hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Register for Job Support
              </Button>
             
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
                )}
export default HeroSection 