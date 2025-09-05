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
import "./index.css"

const Card = ({ className = "", children, ...props }) => (
  <div className={`card-rampur ${className}`} {...props}>
    {children}
  </div>
)

const Button = ({ className = "", children, ...props }) => (
  <button className={`button-rampur ${className}`} {...props}>
    {children}
  </button>
)

const Input = ({ className = "", ...props }) => (
  <input className={`input-rampur ${className}`} {...props} />
)

const Label = ({ className = "", children, ...props }) => (
  <label className={`label-rampur ${className}`} {...props}>
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
    <div className="popup-overlay-rampur">
      <Card
        className={`popup-content-rampur ${type === "success" ? "success-border-rampur border-2-rampur" : "error-border-rampur border-2-rampur"}`}
      >
        <button onClick={onClose} className="popup-close-rampur">
          <X className="w-5-rampur h-5-rampur" />
        </button>
        <div className="flex-rampur flex-col-rampur items-center-rampur p-4-rampur">
          <div
            className={`icon-container-rampur mb-4-rampur ${type === "success" ? "bg-orange-100-rampur" : "bg-red-100-rampur"}`}
          >
            {type === "success" ? (
              <CheckCircle className="w-8-rampur h-8-rampur text-orange-600-rampur" />
            ) : (
              <X className="w-8-rampur h-8-rampur text-red-600-rampur" />
            )}
          </div>
          <h3
            className={`text-xl-rampur font-bold-rampur mb-2-rampur ${type === "success" ? "text-orange-700-rampur" : "text-red-700-rampur"}`}
          >
            {type === "success" ? "Registration Successful!" : "Registration Failed"}
          </h3>
          <p className={`text-center-rampur ${type === "success" ? "text-orange-800-rampur" : "text-red-800-rampur"}`}>
            {message}
          </p>
        </div>
      </Card>
    </div>
  )
}

const Rampur = () => {
  // Registration Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    experience: "",
    skills: "",
    industry: "",
    city: "Rampur",
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
      const response = await fetch("https://sheetdb.io/api/v1/r54as5htdq8qk", {
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
            "Welcome to the EarlyJobs Rampur network! Our team will contact you within 24 hours to discuss your career goals and upcoming opportunities.",
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
        city: "Rampur",
        resume: null,
      })
    }
  }

  // Data
  const steps = [
    {
      icon: UserPlus,
      title: "Register on EarlyJobs Rampur Portal",
      description:
        "Create your profile in minutes. Upload your resume, add your skills, and tell us about your career aspirations. Our platform is designed specifically for Rampur's job market and local opportunities.",
      color: "bg-orange-500",
    },
    {
      icon: Search,
      title: "Get Matched with Local Opportunities",
      description:
        "Our smart algorithm connects you with relevant jobs, internships, and skill-building programs in Rampur. From manufacturing companies to retail chains, banking sector to educational institutions.",
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
      title: "Mega Job Fair 2024 - Rampur",
      date: "December 20, 2024",
      time: "10:00 AM - 5:00 PM",
      location: "Shyam Hari Complex, Jwala Nagar",
      companies: "20+ Companies",
      positions: "150+ Open Positions",
      description:
        "Join us for the biggest job fair in Rampur featuring top companies from Manufacturing, Banking, Retail, and Education sectors.",
      category: "Job Fair",
      featured: true,
    },
    {
      title: "Campus Recruitment Drive - Local Colleges",
      date: "December 25, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Various College Campuses",
      companies: "10+ Companies",
      positions: "60+ Positions",
      description:
        "Exclusive recruitment drive for students across Rampur colleges with focus on fresher-friendly roles and skill development.",
      category: "Campus Drive",
    },
  ]

  const studentBenefits = [
    "Verified local jobs & internship opportunities in Rampur",
    "Skill-building workshops & certification programs",
    "Regular walk-in interview drives in the city",
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
    "Access to pre-vetted local talent pool in Rampur",
    "Quick hiring process & reduced recruitment time",
    "Cost-effective recruitment solutions",
    "Campus recruitment support & coordination",
    "Skill assessment & candidate screening",
    "Local market insights & hiring trends",
  ]

  const faqs = [
    {
      question: "What services does EarlyJobs Rampur offer?",
      answer:
        "We provide comprehensive recruitment solutions including job placements, internships, skill development programs, campus recruitment drives, and career counseling specifically for the Rampur region. Our services connect local talent with opportunities across manufacturing, banking, retail, education, and emerging sectors in Rampur.",
    },
    {
      question: "Is there any registration fee to join EarlyJobs Rampur?",
      answer:
        "No, registration is completely free for job seekers and students. We believe in accessible career opportunities for everyone in Rampur. Our revenue comes from our employer partners, not from candidates.",
    },
    {
      question: "Which companies hire through EarlyJobs in Rampur?",
      answer:
        "We partner with 30+ companies ranging from manufacturing units, banks, retail chains, educational institutions, and government organizations. Our partners include both established corporates and growing businesses in the Rampur ecosystem.",
    },
    {
      question: "Do you provide training and skill development programs?",
      answer:
        "Yes! We conduct regular workshops on communication skills, technical training, interview preparation, resume building, and industry-specific certification programs. All training is designed considering the local job market requirements in Rampur.",
    },
    {
      question: "How often do you conduct walk-in interviews in Rampur?",
      answer:
        "We organize walk-in interview drives at least twice a month at various locations across Rampur including Shyam Hari Complex and other convenient venues. We also conduct special campus drives at local colleges and institutions.",
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
        return "category-job-fair-rampur"
      case "Campus Drive":
        return "category-campus-drive-rampur"
      case "Workshop":
        return "category-workshop-rampur"
      case "Walk-in":
        return "category-walk-in-rampur"
      default:
        return "bg-gray-200 text-gray-700"
    }
  }

  return (
    <div className="min-h-screen-rampur bg-white-rampur text-orange-900-rampur">
      {/* Popup */}
      {showPopup && <Popup message={showPopup.message} type={showPopup.type} onClose={closePopup} />}

      {/* Hero Section */}
      <section className="hero-rampur">
        <div className="absolute-rampur inset-0-rampur">
          <img
            src="/rampur-city-skyline-with-students-and-professional.jpg"
            alt="Rampur skyline with students and professionals"
            className="hero-bg-rampur"
          />
          <div className="hero-overlay-rampur"></div>
        </div>

        <div className="hero-content-rampur container-rampur mx-auto-rampur px-4-rampur pt-4-rampur">
          <div className="text-center-rampur">
            <div className="text-white-rampur space-y-8-rampur">
              <div className="hero-badge-rampur">
                <MapPin className="w-4-rampur h-4-rampur" />
                Rampur, Uttar Pradesh
              </div>

              <div className="space-y-4-rampur">
                <h1 className="text-4xl-rampur md:text-6xl-rampur font-bold-rampur">
                  Empowering Rampur's
                  <span className="block-rampur text-orange-200-rampur">Youth & Career Growth</span>
                </h1>
                <p className="text-xl-rampur md:text-2xl-rampur font-medium-rampur opacity-90-rampur">
                  Your Career Journey Starts Here, Right in Rampur
                </p>
              </div>

              <div className="text-center-rampur">
                <p className="text-lg-rampur md:text-xl-rampur">
                  Connecting Rampur's brightest talent with top employers across Manufacturing, Banking, Retail &
                  Education sectors. Build skills, find opportunities, and grow your{" "}
                  career with EarlyJobs Rampur.
                </p>
              </div>

              <div className="flex-rampur flex-col-rampur sm:flex-row-rampur justify-center-rampur gap-4-rampur">
                <Button
                  className="bg-orange-600-rampur hover:bg-orange-700-rampur text-white-rampur rounded-lg-rampur shadow-lg-rampur"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="hover:bg-orange-100-rampur flex-rampur justify-center-rampur">
                  <Phone className="w-5-rampur h-5-rampur mr-2-rampur" />
                  Call Us Today
                </Button>
              </div>

              <div className="flex-rampur flex-wrap gap-6-rampur pt-4-rampur justify-center-rampur text-white-rampur">
                <div className="flex-rampur items-center-rampur gap-2-rampur">
                  <Star className="w-5-rampur h-5-rampur text-yellow-400-rampur star-filled-rampur" />
                  <span className="text-sm-rampur">300+ Rampur Placements</span>
                </div>
                <div className="flex-rampur items-center-rampur gap-2-rampur">
                  <Star className="w-5-rampur h-5-rampur text-yellow-400-rampur star-filled-rampur" />
                  <span className="text-sm-rampur">30+ Partner Companies</span>
                </div>
                <div className="flex-rampur items-center-rampur gap-2-rampur">
                  <Star className="w-5-rampur h-5-rampur text-yellow-400-rampur star-filled-rampur" />
                  <span className="text-sm-rampur">10+ Local Colleges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20-rampur bg-orange-50-rampur">
        <div className="container-rampur mx-auto-rampur px-4-rampur">
          <div className="max-w-4xl-rampur mx-auto-rampur text-center-rampur mb-16-rampur">
            <h2 className="text-3xl-rampur md:text-4xl-rampur font-bold-rampur text-orange-700-rampur mb-6-rampur">
              About EarlyJobs Rampur
            </h2>
            <p className="text-lg-rampur text-orange-800-rampur leading-relaxed-rampur mb-8-rampur">
              EarlyJobs is India's leading tech-enabled recruitment franchise, and our Rampur chapter is dedicated to
              bridging the gap between local talent and exceptional career opportunities. We understand Rampur's unique
              ecosystem—from the growing manufacturing sector to established banking institutions, from prestigious
              educational institutions to emerging retail ventures.
            </p>
            <p className="text-lg-rampur text-orange-800-rampur leading-relaxed-rampur">
              Our mission is simple: <strong className="text-orange-600-rampur">Connect. Develop. Succeed.</strong>{" "}
              We're not just a job portal; we're your career partners, helping students and professionals in Rampur
              discover their potential and build meaningful careers right here in our vibrant city.
            </p>
          </div>

          <div className="grid-rampur md:grid-cols-4-rampur gap-8-rampur mb-16-rampur px-4-rampur">
            <Card className="hover:bg-orange-100-rampur transition-all-rampur">
              <Building2 className="w-12-rampur h-12-rampur text-orange-600-rampur mx-auto-rampur mb-4-rampur" />
              <div className="text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">30+</div>
              <p className="text-orange-800-rampur">Partner Companies</p>
            </Card>

            <Card className="hover:bg-orange-100-rampur transition-all-rampur">
              <Users className="w-12-rampur h-12-rampur text-orange-600-rampur mx-auto-rampur mb-4-rampur" />
              <div className="text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">300+</div>
              <p className="text-orange-800-rampur">Successful Placements</p>
            </Card>

            <Card className="hover:bg-orange-100-rampur transition-all-rampur">
              <Award className="w-12-rampur h-12-rampur text-orange-600-rampur mx-auto-rampur mb-4-rampur" />
              <div className="text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">10+</div>
              <p className="text-orange-800-rampur">College Partnerships</p>
            </Card>

            <Card className="hover:bg-orange-100-rampur transition-all-rampur">
              <MapPin className="w-12-rampur h-12-rampur text-orange-600-rampur mx-auto-rampur mb-4-rampur" />
              <div className="text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">100%</div>
              <p className="text-orange-800-rampur">Local Focus</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20-rampur bg-white-rampur">
        <div className="container-rampur mx-auto-rampur px-4-rampur">
          <div className="text-center-rampur mb-16-rampur">
            <h2 className="text-3xl-rampur md:text-4xl-rampur font-bold-rampur text-orange-700-rampur mb-6-rampur">
              Benefits for Everyone in the Rampur Ecosystem
            </h2>
            <p className="text-lg-rampur text-orange-800-rampur max-w-3xl-rampur mx-auto-rampur">
              Whether you're a student seeking opportunities, a college looking to improve placements, or a company
              searching for talent, EarlyJobs Rampur has solutions tailored for you.
            </p>
          </div>

          <div className="grid-rampur lg:grid-cols-3-rampur gap-8-rampur">
            <Card className="border-l-4-rampur border-orange-500-rampur hover:shadow-lg-rampur transition-all-rampur">
              <div className="text-center-rampur mb-6-rampur">
                <div className="icon-container-lg-rampur bg-orange-100-rampur mx-auto-rampur mb-4-rampur">
                  <GraduationCap className="w-8-rampur h-8-rampur text-orange-600-rampur" />
                </div>
                <h3 className="text-2xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">For Students</h3>
                <p className="text-orange-800-rampur">Kickstart your career journey in Rampur</p>
              </div>

              <ul className="space-y-3-rampur">
                {studentBenefits.map((benefit, index) => (
                  <li key={index} className="flex-rampur items-start gap-3-rampur">
                    <CheckCircle className="w-5-rampur h-5-rampur text-orange-600-rampur mt-0.5 flex-shrink-0-rampur" />
                    <span className="text-orange-900-rampur">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-l-4-rampur border-orange-400-rampur hover:shadow-lg-rampur transition-all-rampur">
              <div className="text-center-rampur mb-6-rampur">
                <div className="icon-container-lg-rampur bg-orange-50-rampur mx-auto-rampur mb-4-rampur">
                  <Building2 className="w-8-rampur h-8-rampur text-orange-500-rampur" />
                </div>
                <h3 className="text-2xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">For Colleges</h3>
                <p className="text-orange-800-rampur">Boost your placement success rates</p>
              </div>

              <ul className="space-y-3-rampur">
                {collegeBenefits.map((benefit, index) => (
                  <li key={index} className="flex-rampur items-start gap-3-rampur">
                    <CheckCircle className="w-5-rampur h-5-rampur text-orange-500-rampur mt-0.5 flex-shrink-0-rampur" />
                    <span className="text-orange-900-rampur">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-l-4-rampur border-orange-500-rampur hover:shadow-lg-rampur transition-all-rampur">
              <div className="text-center-rampur mb-6-rampur">
                <div className="icon-container-lg-rampur bg-orange-100-rampur mx-auto-rampur mb-4-rampur">
                  <Users className="w-8-rampur h-8-rampur text-orange-600-rampur" />
                </div>
                <h3 className="text-2xl-rampur font-bold-rampur text-orange-700-rampur mb-2-rampur">For Companies</h3>
                <p className="text-orange-800-rampur">Find the right talent quickly</p>
              </div>

              <ul className="space-y-3-rampur">
                {companyBenefits.map((benefit, index) => (
                  <li key={index} className="flex-rampur items-start gap-3-rampur">
                    <CheckCircle className="w-5-rampur h-5-rampur text-orange-600-rampur mt-0.5 flex-shrink-0-rampur" />
                    <span className="text-orange-900-rampur">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="text-center-rampur mt-16-rampur">
            <div className="bg-orange-100-rampur rounded-2xl-rampur p-8-rampur md:p-12-rampur shadow-lg-rampur">
              <h3 className="text-2xl-rampur md:text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-4-rampur">
                Ready to Transform Your Career Journey?
              </h3>
              <p className="text-lg-rampur text-orange-800-rampur mb-8-rampur max-w-2xl-rampur mx-auto-rampur">
                Join hundreds of successful professionals who started their journey with EarlyJobs Rampur. Your dream
                career is just a registration away.
              </p>
              <div className="flex-rampur flex-col-rampur sm:flex-row-rampur gap-4-rampur justify-center-rampur">
                <Button
                  className="bg-orange-600-rampur hover:bg-orange-700-rampur"
                  onClick={() => document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Register Now
                </Button>
                <Button className="bg-orange-500-rampur hover:bg-orange-600-rampur">Schedule a Callback</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20-rampur bg-orange-50-rampur">
        <div className="container-rampur mx-auto-rampur px-4-rampur">
          <div className="text-center-rampur mb-16-rampur">
            <h2 className="text-3xl-rampur md:text-4xl-rampur font-bold-rampur text-orange-700-rampur mb-6-rampur">
              How EarlyJobs Rampur Works
            </h2>
            <p className="text-lg-rampur text-orange-800-rampur max-w-3xl-rampur mx-auto-rampur">
              Getting started with your career journey in Rampur is simple. Follow these three easy steps to unlock
              opportunities in your city.
            </p>
          </div>

          <div className="max-w-5xl-rampur mx-auto-rampur">
            <div className="grid-rampur md:grid-cols-3-rampur gap-8-rampur relative-rampur">
              {steps.map((step, index) => (
                <div key={index} className="relative-rampur">
                  <Card className="hover:bg-orange-100-rampur transition-all-rampur">
                    <div className="absolute-rampur -top-4-rampur left-6-rampur">
                      <div className="w-8-rampur h-8-rampur bg-orange-500-rampur rounded-full-rampur flex-rampur items-center-rampur justify-center-rampur text-white-rampur font-bold-rampur text-sm-rampur">
                        {index + 1}
                      </div>
                    </div>

                    <div className="w-16-rampur h-16-rampur bg-orange-500-rampur rounded-xl-rampur flex-rampur items-center-rampur justify-center-rampur mb-6-rampur">
                      <step.icon className="w-8-rampur h-8-rampur text-white-rampur" />
                    </div>

                    <h3 className="text-xl-rampur font-bold-rampur text-orange-700-rampur mb-4-rampur">{step.title}</h3>
                    <p className="text-orange-800-rampur leading-relaxed-rampur">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20-rampur bg-white-rampur">
        <div className="container-rampur mx-auto-rampur px-4-rampur">
          <div className="max-w-2xl-rampur mx-auto-rampur">
            {submitted && !showPopup ? (
              <Card className="text-center-rampur">
                <div className="icon-container-rampur bg-orange-100-rampur mx-auto-rampur mb-6-rampur">
                  <CheckCircle className="w-10-rampur h-10-rampur text-orange-600-rampur" />
                </div>
                <h2 className="text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-4-rampur">
                  Registration Successful!
                </h2>
                <p className="text-lg-rampur text-orange-800-rampur mb-6-rampur">
                  Welcome to the EarlyJobs Rampur network! Our team will contact you within 24 hours to discuss your
                  career goals and upcoming opportunities.
                </p>
                <div className="bg-orange-50-rampur p-6-rampur rounded-xl-rampur">
                  <h3 className="text-xl-rampur font-semibold-rampur text-orange-700-rampur mb-3-rampur">
                    What's Next?
                  </h3>
                  <ul className="text-left-rampur space-y-2-rampur text-orange-800-rampur">
                    <li>✓ Profile verification & skills assessment</li>
                    <li>✓ Job matching based on your preferences</li>
                    <li>✓ Interview preparation support</li>
                    <li>✓ Regular updates on opportunities in Rampur</li>
                  </ul>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center-rampur mb-8-rampur">
                  <h2 className="text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-4-rampur">
                    Join EarlyJobs Rampur Network
                  </h2>
                  <p className="text-lg-rampur text-orange-800-rampur">
                    Start your career journey with Rampur's most trusted recruitment partner
                  </p>
                </div>

                {error && !showPopup && (
                  <div className="error-bg-rampur text-red-700-rampur p-4-rampur rounded-lg-rampur mb-6-rampur">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6-rampur">
                  <div className="grid-rampur md:grid-cols-2-rampur gap-6-rampur">
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

                  <div className="grid-rampur md:grid-cols-2-rampur gap-6-rampur">
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
                        className="select-rampur mt-2-rampur"
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

                  <div className="grid-rampur md:grid-cols-2-rampur gap-6-rampur">
                    <div>
                      <Label htmlFor="experience">Experience Level</Label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="select-rampur mt-2-rampur"
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
                        className="mt-2-rampur bg-orange-50-rampur"
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
                      className="select-rampur mt-2-rampur"
                    >
                      <option value="">Select preferred industry</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="banking">Banking & Finance</option>
                      <option value="retail">Retail & Consumer Goods</option>
                      <option value="education">Education & Training</option>
                      <option value="it">Information Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="government">Government & Public Sector</option>
                      <option value="agriculture">Agriculture & Allied</option>
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
                      className="textarea-rampur mt-2-rampur"
                      placeholder="List your key skills, technologies, or areas of expertise..."
                    />
                  </div>

                  <div className="file-upload-rampur">
                    <div className="text-orange-700-rampur mb-2-rampur">
                      <svg
                        className="w-8-rampur h-8-rampur mx-auto-rampur mb-2-rampur"
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
                    <p className="text-sm-rampur text-orange-600-rampur mb-2-rampur">
                      PDF, DOC, DOCX up to 5MB {formData.resume ? `- ${formData.resume.name}` : ""}
                    </p>
                    <input
                      type="file"
                      name="resume"
                      id="resume"
                      onChange={handleInputChange}
                      accept=".pdf,.doc,.docx"
                      className="file-input-rampur"
                    />
                    <Button
                      type="button"
                      className="mt-2-rampur text-orange-600-rampur border-rampur border-orange-500-rampur hover:bg-orange-100-rampur"
                      onClick={() => document.getElementById("resume")?.click()}
                    >
                      Choose File
                    </Button>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className={`w-full-rampur bg-orange-500-rampur hover:bg-orange-600-rampur text-white-rampur py-3-rampur text-lg-rampur ${loading ? "loading-rampur" : ""}`}
                  >
                    {loading ? "Registering..." : "Join EarlyJobs Rampur Network"}
                  </Button>

                  <p className="text-sm-rampur text-orange-700-rampur text-center-rampur">
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
      <section className="py-20-rampur bg-orange-50-rampur">
        <div className="container-rampur mx-auto-rampur px-4-rampur">
          <div className="text-center-rampur mb-16-rampur">
            <h2 className="text-3xl-rampur md:text-4xl-rampur font-bold-rampur text-orange-700-rampur mb-6-rampur">
              Upcoming Events in Rampur
            </h2>
            <p className="text-lg-rampur text-orange-800-rampur max-w-3xl-rampur mx-auto-rampur">
              Stay updated with the latest job fairs, campus recruitment drives, workshops, and walk-in interview
              opportunities happening in Rampur. Mark your calendar!
            </p>
          </div>

          <div className="grid-rampur lg:grid-cols-2-rampur gap-8-rampur max-w-6xl-rampur mx-auto-rampur">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl-rampur transition-all-rampur ${event.featured ? "border-2-rampur border-orange-500-rampur" : ""}`}
              >
                {event.featured && (
                  <div className="bg-orange-500-rampur text-white-rampur text-sm-rampur font-semibold-rampur px-3-rampur py-1-rampur rounded-full-rampur inline-block-rampur mb-4-rampur">
                    Featured Event
                  </div>
                )}

                <div className={`category-badge-rampur mb-4-rampur ${getCategoryColor(event.category)}`}>
                  {event.category}
                </div>

                <h3 className="text-xl-rampur font-bold-rampur text-orange-700-rampur mb-3-rampur">{event.title}</h3>

                <div className="space-y-2-rampur mb-4-rampur">
                  <div className="flex-rampur items-center-rampur gap-2-rampur text-orange-700-rampur">
                    <Calendar className="w-4-rampur h-4-rampur" />
                    <span className="text-sm-rampur">{event.date}</span>
                  </div>
                  <div className="flex-rampur items-center-rampur gap-2-rampur text-orange-700-rampur">
                    <Clock className="w-4-rampur h-4-rampur" />
                    <span className="text-sm-rampur">{event.time}</span>
                  </div>
                  <div className="flex-rampur items-center-rampur gap-2-rampur text-orange-700-rampur">
                    <MapPin className="w-4-rampur h-4-rampur" />
                    <span className="text-sm-rampur">{event.location}</span>
                  </div>
                </div>

                <div className="flex-rampur gap-4-rampur mb-4-rampur">
                  <div className="flex-rampur items-center-rampur gap-1 text-sm-rampur text-orange-700-rampur">
                    <Users className="w-4-rampur h-4-rampur text-orange-600-rampur" />
                    <span className="font-medium-rampur">{event.companies}</span>
                  </div>
                  <div className="flex-rampur items-center-rampur gap-1 text-sm-rampur text-orange-700-rampur">
                    <ChevronRight className="w-4-rampur h-4-rampur text-orange-500-rampur" />
                    <span className="font-medium-rampur">{event.positions}</span>
                  </div>
                </div>

                <p className="text-orange-800-rampur text-sm-rampur leading-relaxed-rampur mb-6-rampur">
                  {event.description}
                </p>

                <Button
                  className={`w-full-rampur ${event.featured ? "bg-orange-600-rampur hover:bg-orange-700-rampur" : "bg-orange-500-rampur hover:bg-orange-600-rampur"} text-white-rampur`}
                >
                  {event.category === "Workshop" ? "Register for Workshop" : "Register for Event"}
                </Button>
              </Card>
            ))}
          </div>

          <div className="mt-16-rampur text-center-rampur">
            <Card className="bg-orange-100-rampur shadow-lg-rampur">
              <h3 className="text-2xl-rampur md:text-3xl-rampur font-bold-rampur text-orange-700-rampur mb-4-rampur">
                Never Miss an Opportunity
              </h3>
              <p className="text-lg-rampur text-orange-800-rampur mb-8-rampur max-w-2xl-rampur mx-auto-rampur">
                Subscribe to our newsletter to get notified about upcoming events, job opportunities, and career
                development programs in Rampur.
              </p>
              <div className="flex-rampur flex-col-rampur sm:flex-row-rampur gap-4-rampur justify-center-rampur max-w-md-rampur mx-auto-rampur">
                <Input type="email" placeholder="Enter your email" className="flex-1-rampur" />
                <Button className="bg-orange-600-rampur hover:bg-orange-700-rampur">Subscribe</Button>
              </div>
              <p className="text-sm-rampur text-orange-700-rampur mt-4-rampur">
                Join 500+ professionals already subscribed to our updates
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20-rampur bg-white-rampur">
        <div className="container-rampur mx-auto-rampur px-4-rampur">
          <div className="max-w-4xl-rampur mx-auto-rampur">
            <div className="text-center-rampur mb-16-rampur">
              <h2 className="text-3xl-rampur md:text-4xl-rampur font-bold-rampur text-orange-700-rampur mb-6-rampur">
                Frequently Asked Questions
              </h2>
              <p className="text-lg-rampur text-orange-800-rampur">
                Got questions? We've got answers. Here are the most common questions about EarlyJobs Rampur.
              </p>
            </div>

            <div className="space-y-4-rampur">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:bg-orange-50-rampur transition-all-rampur">
                  <button onClick={() => toggleFAQ(index)} className="faq-button-rampur">
                    <h3 className="text-lg-rampur font-semibold-rampur text-orange-700-rampur pr-4-rampur">
                      {faq.question}
                    </h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5-rampur h-5-rampur text-orange-600-rampur flex-shrink-0-rampur" />
                    ) : (
                      <ChevronDown className="w-5-rampur h-5-rampur text-orange-600-rampur flex-shrink-0-rampur" />
                    )}
                  </button>

                  {openIndex === index && (
                    <div className="faq-content-rampur">
                      <p className="text-orange-800-rampur leading-relaxed-rampur">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <div className="mt-16-rampur bg-orange-100-rampur rounded-2xl-rampur p-8-rampur text-center-rampur shadow-lg-rampur">
              <h3 className="text-2xl-rampur font-bold-rampur text-orange-700-rampur mb-4-rampur">
                Still Have Questions?
              </h3>
              <p className="text-lg-rampur text-orange-800-rampur mb-6-rampur">
                Our team is here to help you succeed. Reach out to us anytime!
              </p>

              <div className="grid-rampur md:grid-cols-3-rampur gap-6-rampur max-w-3xl-rampur mx-auto-rampur">
                <div className="flex-rampur flex-col-rampur items-center-rampur">
                  <Phone className="w-8-rampur h-8-rampur text-orange-600-rampur mb-2-rampur" />
                  <p className="font-semibold-rampur text-orange-700-rampur">Call Us</p>
                  <p className="text-orange-800-rampur">+91 8439423438</p>
                </div>

                <div className="flex-rampur flex-col-rampur items-center-rampur">
                  <Mail className="w-8-rampur h-8-rampur text-orange-600-rampur mb-2-rampur" />
                  <p className="font-semibold-rampur text-orange-700-rampur">Email Us</p>
                  <p className="text-orange-800-rampur">harshsaxena70787@gmail.com</p>
                </div>

                <div className="flex-rampur flex-col-rampur items-center-rampur">
                  <MapPin className="w-8-rampur h-8-rampur text-orange-600-rampur mb-2-rampur" />
                  <p className="font-semibold-rampur text-orange-700-rampur">Visit Us</p>
                  <p className="text-orange-800-rampur">
                    Shyam Hari Complex, Near UP Gramin Bank, Jwala Nagar, Rampur, Uttar Pradesh, 244901
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

export default Rampur