"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  MapPin,
  Star,
  Building2,
  Users,
  Award,
  UserPlus,
  Search,
  Briefcase,
  Calendar,
  Clock,
  ChevronRight,
  GraduationCap,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  X,
} from "lucide-react"
import "./vizag-styles.css"


import heroImage from "../assets/vizag-hero.jpg"
import successIcon from "../assets/success-icon.png"

// Component definitions
const Card = ({ className = "", children, ...props }) => (
  <div className={`card-vizag ${className}`} {...props}>
    {children}
  </div>
)

const Button = ({ className = "", children, ...props }) => (
  <button className={`button-vizag ${className}`} {...props}>
    {children}
  </button>
)

const Input = ({ className = "", ...props }) => <input className={`input-vizag ${className}`} {...props} />

const Label = ({ className = "", children, ...props }) => (
  <label className={`label-vizag ${className}`} {...props}>
    {children}
  </label>
)

// Popup Component for success/error messages
const Popup = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="popup-overlay-vizag">
      <Card
        className={`popup-content-vizag ${type === "success" ? "success-border-vizag border-2-vizag" : "error-border-vizag border-2-vizag"}`}
      >
        <button onClick={onClose} className="popup-close-vizag">
          <X className="w-5-vizag h-5-vizag" />
        </button>
        <div className="flex-vizag flex-col-vizag items-center-vizag p-4-vizag">
          <div
            className={`icon-container-vizag mb-4-vizag ${type === "success" ? "bg-orange-100-vizag" : "bg-red-100-vizag"}`}
          >
            {type === "success" ? (
              <img src={successIcon || "/placeholder.svg"} alt="Success" className="w-8-vizag h-8-vizag" />
            ) : (
              <X className="w-8-vizag h-8-vizag text-red-600-vizag" />
            )}
          </div>
          <h3
            className={`text-xl-vizag font-bold-vizag mb-2-vizag ${type === "success" ? "text-orange-700-vizag" : "text-red-700-vizag"}`}
          >
            {type === "success" ? "Registration Successful!" : "Registration Failed"}
          </h3>
          <p className={`text-center-vizag ${type === "success" ? "text-orange-800-vizag" : "text-red-800-vizag"}`}>
            {message}
          </p>
        </div>
      </Card>
    </div>
  )
}

const Index = () => {
  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
    industry: "",
    city: "Visakhapatnam",
    resume: null,
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showPopup, setShowPopup] = useState(null)

  // FAQ State
  const [openIndex, setOpenIndex] = useState(0)

  // Event Handlers
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://sheetdb.io/api/v1/5pmlt0qjp7zhz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            Timestamp: new Date().toISOString(),
            Name: formData.name,
            Email: formData.email,
            Phone: formData.phone,
            Role: formData.role,
            Experience: formData.experience,
            Skills: formData.skills,
            Industry: formData.industry,
            City: formData.city,
            Resume: formData.resume ? "Yes" : "No",
          },
        ]),
      })

      const result = await response.json()
      if (response.ok && result.created === 1) {
        setSubmitted(true)
        setShowPopup({
          type: "success",
          message:
            "Welcome to the EarlyJobs Visakhapatnam network! Our team will contact you within 24 hours to discuss your career goals and upcoming opportunities.",
        })
      } else {
        setError("Failed to submit form. Please try again.")
        setShowPopup({
          type: "error",
          message: "Failed to submit form. Please try again.",
        })
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      setShowPopup({
        type: "error",
        message: "An error occurred. Please try again later.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    })
  }

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const closePopup = () => {
    setShowPopup(null)
    if (!error) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        experience: "",
        skills: "",
        industry: "",
        city: "Visakhapatnam",
        resume: null,
      })
    }
  }

  // Data
  const steps = [
    {
      icon: UserPlus,
      title: "Register on EarlyJobs Vizag Portal",
      description:
        "Create your profile in minutes. Upload your resume, add your skills, and tell us about your career aspirations. Our platform is designed specifically for Visakhapatnam's job market.",
      color: "bg-orange-500",
    },
    {
      icon: Search,
      title: "Get Matched with Local Opportunities",
      description:
        "Our smart algorithm connects you with relevant jobs, internships, and skill-building programs in Vizag. From IT companies in HITEC City to opportunities at the port and hospitality sector.",
      color: "bg-orange-400",
    },
    {
      icon: Briefcase,
      title: "Attend Interviews & Get Placed",
      description:
        "Participate in our regular interview drives, walk-in sessions, and campus recruitment programs. We provide interview preparation, skill assessment, and continued support until you land your dream job.",
      color: "bg-orange-500",
    },
  ]

  const upcomingEvents = [
    {
      title: "Mega Job Fair 2024 - Vizag",
      date: "December 15, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "VUDA Convention Center, MVP Colony",
      companies: "25+ Companies",
      positions: "200+ Open Positions",
      description:
        "Join us for the biggest job fair in Visakhapatnam featuring top companies from IT, Maritime, and Hospitality sectors.",
      category: "Job Fair",
      featured: true,
    },
    {
      title: "Campus Recruitment Drive - GITAM",
      date: "December 18, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "GITAM University Campus",
      companies: "12+ Companies",
      positions: "80+ Positions",
      description:
        "Exclusive recruitment drive for GITAM students across all streams with focus on fresher-friendly roles.",
      category: "Campus Drive",
    },
  ]

  const studentBenefits = [
    "Verified local jobs & internship opportunities",
    "Skill-building workshops & certification programs",
    "Regular walk-in interview drives in Vizag",
    "Career guidance & resume building support",
    "Direct connection with hiring managers",
    "Industry-specific training programs",
  ]

  const collegeBenefits = [
    "Enhanced placement statistics & outcomes",
    "Industry partnerships & guest lecture programs",
    "Customized recruitment drives for your students",
    "Faculty development & industry connect programs",
    "Alumni network building & engagement",
    "Campus-to-corporate transition support",
  ]

  const companyBenefits = [
    "Access to pre-vetted local talent pool",
    "Quick hiring process & reduced recruitment time",
    "Cost-effective recruitment solutions",
    "Campus recruitment support & coordination",
    "Skill assessment & candidate screening",
    "Local market insights & hiring trends",
  ]

  const faqs = [
    {
      question: "What services does EarlyJobs Visakhapatnam offer?",
      answer:
        "We provide comprehensive recruitment solutions including job placements, internships, skill development programs, campus recruitment drives, and career counseling specifically for the Visakhapatnam region. Our services connect local talent with opportunities across IT-SEZ, maritime, hospitality, and education sectors.",
    },
    {
      question: "Is there any registration fee to join EarlyJobs Vizag?",
      answer:
        "No, registration is completely free for job seekers and students. We believe in accessible career opportunities for everyone in Visakhapatnam. Our revenue comes from our employer partners, not from candidates.",
    },
    {
      question: "Which companies hire through EarlyJobs in Vizag?",
      answer:
        "We partner with 50+ companies ranging from IT firms in HITEC City, port and logistics companies, hotels and resorts, banks, retail chains, and educational institutions. Our partners include both established corporates and growing startups in the Vizag ecosystem.",
    },
    {
      question: "Do you provide training and skill development programs?",
      answer:
        "Yes! We conduct regular workshops on communication skills, technical training, interview preparation, resume building, and industry-specific certification programs. All training is designed considering the local job market requirements in Visakhapatnam.",
    },
    {
      question: "How often do you conduct walk-in interviews in Vizag?",
      answer:
        "We organize walk-in interview drives at least twice a month at various locations across Visakhapatnam including MVP Colony, Dwaraka Nagar, and Gajuwaka. We also conduct special campus drives at colleges like GITAM, Andhra University, and other institutions.",
    },
    {
      question: "Can final year students register for placements?",
      answer:
        "We encourage final year students to register early. This gives us time to understand your career goals, provide relevant training, and connect you with suitable opportunities before graduation. Early registration often leads to pre-placement offers.",
    },
  ]

  const getCategoryColor = (category) => {
    switch (category) {
      case "Job Fair":
        return "category-job-fair-vizag"
      case "Campus Drive":
        return "category-campus-drive-vizag"
      case "Workshop":
        return "category-workshop-vizag"
      case "Walk-in":
        return "category-walk-in-vizag"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen-vizag bg-white-vizag text-orange-900-vizag">
      {/* Popup */}
      {showPopup && <Popup message={showPopup.message} type={showPopup.type} onClose={closePopup} />}

      {/* Hero Section */}
      <section className="hero-vizag">
        <div className="absolute-vizag inset-0-vizag">
          <img
            src={heroImage }
            alt="Visakhapatnam skyline with students and professionals"
            className="hero-bg-vizag"
          />
          <div className="hero-overlay-vizag"></div>
        </div>

        <div className="hero-content-vizag container-vizag mx-auto-vizag px-4-vizag pt-4-vizag">
          <div className="text-center-vizag">
            <div className="text-white-vizag space-y-8-vizag">
              <div className="hero-badge-vizag">
                <MapPin className="w-4-vizag h-4-vizag" />
                Visakhapatnam, Andhra Pradesh
              </div>

              <div className="space-y-4-vizag">
                <h1 className="text-4xl-vizag md:text-6xl-vizag font-bold-vizag">
                  Empowering Visakhapatnam's
                  <span className="block-vizag text-orange-200-vizag">Youth & Vidya</span>
                </h1>
                <p className="text-xl-vizag md:text-2xl-vizag font-medium-vizag opacity-90-vizag">
                  Your Career Journey Starts Here, Right in Vizag
                </p>
              </div>

              <div className="text-center-vizag">
                <p className="text-lg-vizag md:text-xl-vizag">
                  Connecting Vizag's brightest talent with top employers across IT-SEZ, Port Industries, Hospitality &
                  Education sectors. Build skills, find opportunities, and grow your{" "}
                  <em className="text-orange-200-vizag">udyogam</em> (career) with EarlyJobs Visakhapatnam.
                </p>
              </div>

              <div className="flex-vizag flex-col-vizag sm:flex-row-vizag justify-center-vizag gap-4-vizag">
                <Button
                  className="bg-orange-600-vizag hover:bg-orange-700-vizag text-white-vizag rounded-lg-vizag shadow-lg-vizag"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="hover:bg-orange-100-vizag flex-vizag justify-center-vizag">
                  <Phone className="w-5-vizag h-5-vizag mr-2-vizag" />
                  Call Us Today
                </Button>
              </div>

              <div className="flex-vizag flex-wrap gap-6-vizag pt-4-vizag justify-center-vizag text-white-vizag">
                <div className="flex-vizag items-center-vizag gap-2-vizag">
                  <Star className="w-5-vizag h-5-vizag text-yellow-400-vizag star-filled-vizag" />
                  <span className="text-sm-vizag">500+ Vizag Placements</span>
                </div>
                <div className="flex-vizag items-center-vizag gap-2-vizag">
                  <Star className="w-5-vizag h-5-vizag text-yellow-400-vizag star-filled-vizag" />
                  <span className="text-sm-vizag">50+ Partner Companies</span>
                </div>
                <div className="flex-vizag items-center-vizag gap-2-vizag">
                  <Star className="w-5-vizag h-5-vizag text-yellow-400-vizag star-filled-vizag" />
                  <span className="text-sm-vizag">15+ Local Colleges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20-vizag bg-orange-50-vizag">
        <div className="container-vizag mx-auto-vizag px-4-vizag">
          <div className="max-w-4xl-vizag mx-auto-vizag text-center-vizag mb-16-vizag">
            <h2 className="text-3xl-vizag md:text-4xl-vizag font-bold-vizag text-orange-700-vizag mb-6-vizag">
              About EarlyJobs Visakhapatnam
            </h2>
            <p className="text-lg-vizag text-orange-800-vizag leading-relaxed-vizag mb-8-vizag">
              EarlyJobs is India's leading tech-enabled recruitment franchise, and our Visakhapatnam chapter is
              dedicated to bridging the gap between local talent and exceptional career opportunities. We understand
              Vizag's unique ecosystem—from the bustling IT-SEZ corridors to the maritime industries at the port, from
              prestigious educational institutions to emerging hospitality ventures.
            </p>
            <p className="text-lg-vizag text-orange-800-vizag leading-relaxed-vizag">
              Our mission is simple: <strong className="text-orange-600-vizag">Connect. Develop. Succeed.</strong> We're
              not just a job portal; we're your career partners, helping students and professionals in Visakhapatnam
              discover their potential and build meaningful careers right here in our beautiful coastal city.
            </p>
          </div>

          <div className="grid-vizag md:grid-cols-4-vizag gap-8-vizag mb-16-vizag px-4-vizag">
            <Card className="hover:bg-orange-100-vizag transition-all-vizag">
              <Building2 className="w-12-vizag h-12-vizag text-orange-600-vizag mx-auto-vizag mb-4-vizag" />
              <div className="text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">50+</div>
              <p className="text-orange-800-vizag">Partner Companies</p>
            </Card>

            <Card className="hover:bg-orange-100-vizag transition-all-vizag">
              <Users className="w-12-vizag h-12-vizag text-orange-600-vizag mx-auto-vizag mb-4-vizag" />
              <div className="text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">500+</div>
              <p className="text-orange-800-vizag">Successful Placements</p>
            </Card>

            <Card className="hover:bg-orange-100-vizag transition-all-vizag">
              <Award className="w-12-vizag h-12-vizag text-orange-600-vizag mx-auto-vizag mb-4-vizag" />
              <div className="text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">15+</div>
              <p className="text-orange-800-vizag">College Partnerships</p>
            </Card>

            <Card className="hover:bg-orange-100-vizag transition-all-vizag">
              <MapPin className="w-12-vizag h-12-vizag text-orange-600-vizag mx-auto-vizag mb-4-vizag" />
              <div className="text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">100%</div>
              <p className="text-orange-800-vizag">Local Focus</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20-vizag bg-white-vizag">
        <div className="container-vizag mx-auto-vizag px-4-vizag">
          <div className="text-center-vizag mb-16-vizag">
            <h2 className="text-3xl-vizag md:text-4xl-vizag font-bold-vizag text-orange-700-vizag mb-6-vizag">
              Benefits for Everyone in the Vizag Ecosystem
            </h2>
            <p className="text-lg-vizag text-orange-800-vizag max-w-3xl-vizag mx-auto-vizag">
              Whether you're a student seeking opportunities, a college looking to improve placements, or a company
              searching for talent, EarlyJobs Visakhapatnam has solutions tailored for you.
            </p>
          </div>

          <div className="grid-vizag lg:grid-cols-3-vizag gap-8-vizag">
            <Card className="border-l-4-vizag border-orange-500-vizag hover:shadow-lg-vizag transition-all-vizag">
              <div className="text-center-vizag mb-6-vizag">
                <div className="icon-container-lg-vizag bg-orange-100-vizag mx-auto-vizag mb-4-vizag">
                  <GraduationCap className="w-8-vizag h-8-vizag text-orange-600-vizag" />
                </div>
                <h3 className="text-2xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">For Students</h3>
                <p className="text-orange-800-vizag">Kickstart your career journey in Vizag</p>
              </div>

              <ul className="space-y-3-vizag">
                {studentBenefits.map((benefit, index) => (
                  <li key={index} className="flex-vizag items-start gap-3-vizag">
                    <CheckCircle className="w-5-vizag h-5-vizag text-orange-600-vizag mt-0.5 flex-shrink-0-vizag" />
                    <span className="text-orange-900-vizag">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-l-4-vizag border-orange-400-vizag hover:shadow-lg-vizag transition-all-vizag">
              <div className="text-center-vizag mb-6-vizag">
                <div className="icon-container-lg-vizag bg-orange-50-vizag mx-auto-vizag mb-4-vizag">
                  <Building2 className="w-8-vizag h-8-vizag text-orange-500-vizag" />
                </div>
                <h3 className="text-2xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">For Colleges</h3>
                <p className="text-orange-800-vizag">Boost your placement success rates</p>
              </div>

              <ul className="space-y-3-vizag">
                {collegeBenefits.map((benefit, index) => (
                  <li key={index} className="flex-vizag items-start gap-3-vizag">
                    <CheckCircle className="w-5-vizag h-5-vizag text-orange-500-vizag mt-0.5 flex-shrink-0-vizag" />
                    <span className="text-orange-900-vizag">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-l-4-vizag border-orange-500-vizag hover:shadow-lg-vizag transition-all-vizag">
              <div className="text-center-vizag mb-6-vizag">
                <div className="icon-container-lg-vizag bg-orange-100-vizag mx-auto-vizag mb-4-vizag">
                  <Users className="w-8-vizag h-8-vizag text-orange-600-vizag" />
                </div>
                <h3 className="text-2xl-vizag font-bold-vizag text-orange-700-vizag mb-2-vizag">For Companies</h3>
                <p className="text-orange-800-vizag">Find the right talent quickly</p>
              </div>

              <ul className="space-y-3-vizag">
                {companyBenefits.map((benefit, index) => (
                  <li key={index} className="flex-vizag items-start gap-3-vizag">
                    <CheckCircle className="w-5-vizag h-5-vizag text-orange-600-vizag mt-0.5 flex-shrink-0-vizag" />
                    <span className="text-orange-900-vizag">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center-vizag mt-16-vizag">
            <div className="bg-orange-100-vizag rounded-2xl-vizag p-8-vizag md:p-12-vizag shadow-lg-vizag">
              <h3 className="text-2xl-vizag md:text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-4-vizag">
                Ready to Transform Your Career Journey?
              </h3>
              <p className="text-lg-vizag text-orange-800-vizag mb-8-vizag max-w-2xl-vizag mx-auto-vizag">
                Join hundreds of successful professionals who started their journey with EarlyJobs Visakhapatnam. Your
                dream career is just a registration away.
              </p>
              <div className="flex-vizag flex-col-vizag sm:flex-row-vizag gap-4-vizag justify-center-vizag">
                <Button
                  className="bg-orange-600-vizag hover:bg-orange-700-vizag"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="bg-orange-500-vizag hover:bg-orange-600-vizag">Schedule a Callback</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20-vizag bg-orange-50-vizag">
        <div className="container-vizag mx-auto-vizag px-4-vizag">
          <div className="text-center-vizag mb-16-vizag">
            <h2 className="text-3xl-vizag md:text-4xl-vizag font-bold-vizag text-orange-700-vizag mb-6-vizag">
              How EarlyJobs Vizag Works
            </h2>
            <p className="text-lg-vizag text-orange-800-vizag max-w-3xl-vizag mx-auto-vizag">
              Getting started with your career journey in Visakhapatnam is simple. Follow these three easy steps to
              unlock opportunities in your city.
            </p>
          </div>

          <div className="max-w-5xl-vizag mx-auto-vizag">
            <div className="grid-vizag md:grid-cols-3-vizag gap-8-vizag relative-vizag">
              {steps.map((step, index) => (
                <div key={index} className="relative-vizag">
                  <Card className="hover:bg-orange-100-vizag transition-all-vizag">
                    <div className="absolute-vizag -top-4-vizag left-6-vizag">
                      <div className="w-8-vizag h-8-vizag bg-orange-500-vizag rounded-full-vizag flex-vizag items-center-vizag justify-center-vizag text-white-vizag font-bold-vizag text-sm-vizag">
                        {index + 1}
                      </div>
                    </div>

                    <div
                      className={`w-16-vizag h-16-vizag  rounded-xl-vizag flex-vizag items-center-vizag justify-center-vizag mb-6-vizag`}
                    >
                      <step.icon className="w-8-vizag h-8-vizag text-white-vizag text-orange-700-vizag"/>
                    </div>

                    <h3 className="text-xl-vizag font-bold-vizag text-orange-700-vizag mb-4-vizag">{step.title}</h3>
                    <p className="text-orange-800-vizag leading-relaxed-vizag">{step.description}</p>
                  </Card>

                  {/* {index < steps.length - 1 && (
                    <div className="hidden-vizag md:block-vizag absolute-vizag top-1\/2-vizag -right-4-vizag transform-vizag -translate-y-1\/2-vizag z-10-vizag">
                      <ArrowRight className="w-8-vizag h-8-vizag text-orange-500-vizag" />
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20-vizag bg-white-vizag">
        <div className="container-vizag mx-auto-vizag px-4-vizag">
          <div className="max-w-2xl-vizag mx-auto-vizag">
            {submitted && !showPopup ? (
              <Card className="text-center-vizag">
                <div className="icon-container-vizag bg-orange-100-vizag mx-auto-vizag mb-6-vizag">
                  <img src={successIcon || "/placeholder.svg"} alt="Success" className="w-10-vizag h-10-vizag" />
                </div>
                <h2 className="text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-4-vizag">
                  Registration Successful!
                </h2>
                <p className="text-lg-vizag text-orange-800-vizag mb-6-vizag">
                  Welcome to the EarlyJobs Visakhapatnam network! Our team will contact you within 24 hours to discuss
                  your career goals and upcoming opportunities.
                </p>
                <div className="bg-orange-50-vizag p-6-vizag rounded-xl-vizag">
                  <h3 className="text-xl-vizag font-semibold-vizag text-orange-700-vizag mb-3-vizag">What's Next?</h3>
                  <ul className="text-left-vizag space-y-2-vizag text-orange-800-vizag">
                    <li>✓ Profile verification & skills assessment</li>
                    <li>✓ Job matching based on your preferences</li>
                    <li>✓ Interview preparation support</li>
                    <li>✓ Regular updates on opportunities in Vizag</li>
                  </ul>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center-vizag mb-8-vizag">
                  <h2 className="text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-4-vizag">
                    Join EarlyJobs Visakhapatnam Network
                  </h2>
                  <p className="text-lg-vizag text-orange-800-vizag">
                    Start your career journey with Vizag's most trusted recruitment partner
                  </p>
                </div>

                {error && !showPopup && (
                  <div className="error-bg-vizag text-red-700-vizag p-4-vizag rounded-lg-vizag mb-6-vizag">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6-vizag">
                  <div className="grid-vizag md:grid-cols-2-vizag gap-6-vizag">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid-vizag md:grid-cols-2-vizag gap-6-vizag">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role">I am a... *</Label>
                      <select
                        id="role"
                        name="role"
                        required
                        value={formData.role}
                        onChange={handleInputChange}
                        className="select-vizag mt-2-vizag"
                      >
                        <option value="">Select your role</option>
                        <option value="student">Current Student</option>
                        <option value="graduate">Recent Graduate</option>
                        <option value="jobseeker">Job Seeker</option>
                        <option value="employer">Employer/HR</option>
                        <option value="college">College Representative</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid-vizag md:grid-cols-2-vizag gap-6-vizag">
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="select-vizag mt-2-vizag"
                      >
                        <option value="">Select experience</option>
                        <option value="fresher">Fresher (0 years)</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        readOnly
                        className="mt-2-vizag bg-orange-50-vizag"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="industry">Preferred Industry</Label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="select-vizag mt-2-vizag"
                    >
                      <option value="">Select preferred industry</option>
                      <option value="it">Information Technology</option>
                      <option value="maritime">Maritime & Shipping</option>
                      <option value="hospitality">Hospitality & Tourism</option>
                      <option value="education">Education & Training</option>
                      <option value="banking">Banking & Finance</option>
                      <option value="retail">Retail & Consumer Goods</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="skills">Key Skills (Optional)</Label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={3}
                      className="textarea-vizag mt-2-vizag"
                      placeholder="List your key skills, technologies, or areas of expertise..."
                    />
                  </div>

                  <div className="file-upload-vizag">
                    <div className="text-orange-700-vizag mb-2-vizag">
                      <svg
                        className="w-8-vizag h-8-vizag mx-auto-vizag mb-2-vizag"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      Upload Resume (Optional)
                    </div>
                    <p className="text-sm-vizag text-orange-600-vizag mb-2-vizag">
                      PDF, DOC, DOCX up to 5MB {formData.resume ? `- ${formData.resume.name}` : ""}
                    </p>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      onChange={handleInputChange}
                      accept=".pdf,.doc,.docx"
                      className="file-input-vizag"
                    />
                    <Button
                      type="button"
                      className="mt-2-vizag text-orange-600-vizag border-vizag border-orange-500-vizag hover:bg-orange-100-vizag"
                      onClick={() => document.getElementById("resume")?.click()}
                    >
                      Choose File
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full-vizag bg-orange-500-vizag hover:bg-orange-600-vizag text-white-vizag py-3-vizag text-lg-vizag ${loading ? "loading-vizag" : ""}`}
                  >
                    {loading ? "Registering..." : "Join EarlyJobs Vizag Network"}
                  </Button>

                  <p className="text-sm-vizag text-orange-700-vizag text-center-vizag">
                    By registering, you agree to our Terms of Service and Privacy Policy. We're committed to protecting
                    your privacy and helping you find the right opportunities.
                  </p>
                </form>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20-vizag bg-orange-50-vizag">
        <div className="container-vizag mx-auto-vizag px-4-vizag">
          <div className="text-center-vizag mb-16-vizag">
            <h2 className="text-3xl-vizag md:text-4xl-vizag font-bold-vizag text-orange-700-vizag mb-6-vizag">
              Upcoming Events in Visakhapatnam
            </h2>
            <p className="text-lg-vizag text-orange-800-vizag max-w-3xl-vizag mx-auto-vizag">
              Stay updated with the latest job fairs, campus recruitment drives, workshops, and walk-in interview
              opportunities happening in Vizag. Mark your calendar!
            </p>
          </div>

          <div className="grid-vizag lg:grid-cols-2-vizag gap-8-vizag max-w-6xl-vizag mx-auto-vizag">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl-vizag transition-all-vizag ${event.featured ? "border-2-vizag border-orange-500-vizag" : ""}`}
              >
                {event.featured && (
                  <div className="bg-orange-500-vizag text-white-vizag text-sm-vizag font-semibold-vizag px-3-vizag py-1-vizag rounded-full-vizag inline-block-vizag mb-4-vizag">
                    Featured Event
                  </div>
                )}

                <div className={`category-badge-vizag mb-4-vizag ${getCategoryColor(event.category)}`}>
                  {event.category}
                </div>

                <h3 className="text-xl-vizag font-bold-vizag text-orange-700-vizag mb-3-vizag">{event.title}</h3>

                <div className="space-y-2-vizag mb-4-vizag">
                  <div className="flex-vizag items-center-vizag gap-2-vizag text-orange-700-vizag">
                    <Calendar className="w-4-vizag h-4-vizag" />
                    <span className="text-sm-vizag">{event.date}</span>
                  </div>
                  <div className="flex-vizag items-center-vizag gap-2-vizag text-orange-700-vizag">
                    <Clock className="w-4-vizag h-4-vizag" />
                    <span className="text-sm-vizag">{event.time}</span>
                  </div>
                  <div className="flex-vizag items-center-vizag gap-2-vizag text-orange-700-vizag">
                    <MapPin className="w-4-vizag h-4-vizag" />
                    <span className="text-sm-vizag">{event.location}</span>
                  </div>
                </div>

                <div className="flex-vizag gap-4-vizag mb-4-vizag">
                  <div className="flex-vizag items-center-vizag gap-1 text-sm-vizag text-orange-700-vizag">
                    <Users className="w-4-vizag h-4-vizag text-orange-600-vizag" />
                    <span className="font-medium-vizag">{event.companies}</span>
                  </div>
                  <div className="flex-vizag items-center-vizag gap-1 text-sm-vizag text-orange-700-vizag">
                    <ChevronRight className="w-4-vizag h-4-vizag text-orange-500-vizag" />
                    <span className="font-medium-vizag">{event.positions}</span>
                  </div>
                </div>

                <p className="text-orange-800-vizag text-sm-vizag leading-relaxed-vizag mb-6-vizag">
                  {event.description}
                </p>

                <Button
                  className={`w-full-vizag ${event.featured ? "bg-orange-600-vizag hover:bg-orange-700-vizag" : "bg-orange-500-vizag hover:bg-orange-600-vizag"} text-white-vizag`}
                >
                  {event.category === "Workshop" ? "Register for Workshop" : "Register for Event"}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-16-vizag text-center-vizag">
            <Card className="bg-orange-100-vizag shadow-lg-vizag">
              <h3 className="text-2xl-vizag md:text-3xl-vizag font-bold-vizag text-orange-700-vizag mb-4-vizag">
                Never Miss an Opportunity
              </h3>
              <p className="text-lg-vizag text-orange-800-vizag mb-8-vizag max-w-2xl-vizag mx-auto-vizag">
                Subscribe to our newsletter to get notified about upcoming events, job opportunities, and career
                development programs in Visakhapatnam.
              </p>
              <div className="flex-vizag flex-col-vizag sm:flex-row-vizag gap-4-vizag justify-center-vizag max-w-md-vizag mx-auto-vizag">
                <Input type="email" placeholder="Enter your email" className="flex-1-vizag" />
                <Button className="bg-orange-600-vizag hover:bg-orange-700-vizag">Subscribe</Button>
              </div>
              <p className="text-sm-vizag text-orange-700-vizag mt-4-vizag">
                Join 1000+ professionals already subscribed to our updates
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20-vizag bg-white-vizag">
        <div className="container-vizag mx-auto-vizag px-4-vizag">
          <div className="max-w-4xl-vizag mx-auto-vizag">
            <div className="text-center-vizag mb-16-vizag">
              <h2 className="text-3xl-vizag md:text-4xl-vizag font-bold-vizag text-orange-700-vizag mb-6-vizag">
                Frequently Asked Questions
              </h2>
              <p className="text-lg-vizag text-orange-800-vizag">
                Got questions? We've got answers. Here are the most common questions about EarlyJobs Visakhapatnam.
              </p>
            </div>

            <div className="space-y-4-vizag">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:bg-orange-50-vizag transition-all-vizag">
                  <button onClick={() => toggleFAQ(index)} className="faq-button-vizag">
                    <h3 className="text-lg-vizag font-semibold-vizag text-orange-700-vizag pr-4-vizag">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5-vizag h-5-vizag text-orange-600-vizag flex-shrink-0-vizag" />
                    ) : (
                      <ChevronDown className="w-5-vizag h-5-vizag text-orange-600-vizag flex-shrink-0-vizag" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="faq-content-vizag">
                      <p className="text-orange-800-vizag leading-relaxed-vizag">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="mt-16-vizag bg-orange-100-vizag rounded-2xl-vizag p-8-vizag text-center-vizag shadow-lg-vizag">
              <h3 className="text-2xl-vizag font-bold-vizag text-orange-700-vizag mb-4-vizag">Still Have Questions?</h3>
              <p className="text-lg-vizag text-orange-800-vizag mb-6-vizag">
                Our team is here to help you succeed. Reach out to us anytime!
              </p>

              <div className="grid-vizag md:grid-cols-3-vizag gap-6-vizag max-w-3xl-vizag mx-auto-vizag">
                <div className="flex-vizag flex-col-vizag items-center-vizag">
                  <Phone className="w-8-vizag h-8-vizag text-orange-600-vizag mb-2-vizag" />
                  <p className="font-semibold-vizag text-orange-700-vizag">Call Us</p>
                  <p className="text-orange-800-vizag">+91 83284 61662</p>
                </div>

                <div className="flex-vizag flex-col-vizag items-center-vizag">
                  <Mail className="w-8-vizag h-8-vizag text-orange-600-vizag mb-2-vizag" />
                  <p className="font-semibold-vizag text-orange-700-vizag">Email Us</p>
                  <p className="text-orange-800-vizag">visakhapatnam@earlyjobs.in</p>
                </div>

                <div className="flex-vizag flex-col-vizag items-center-vizag">
                  <MapPin className="w-8-vizag h-8-vizag text-orange-600-vizag mb-2-vizag" />
                  <p className="font-semibold-vizag text-orange-700-vizag">Visit Us</p>
                  <p className="text-orange-800-vizag">
                    3RD FLOOR, Building No./Flat No.: 30-15-35, Main Road, Saraswati Park, Daba Gardens, Visakhapatnam,
                    Andhra Pradesh, 530020
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index
