"use client"

import { useState } from "react"
import {
  MapPin,
  Users,
  Building2,
  GraduationCap,
  CheckCircle,
  Phone,
  Calendar,
  ArrowRight,
  Target,
  ChevronDown,
  Mail,
} from "lucide-react"
import "./chennai-styles.css"

// Mock image imports (replace with actual paths in your project)
import heroImage from  "../assets/chennai-hero.jpg"

const FranchiseChennai = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "student",
    industry: "",
  })

  const [expandedFaq, setExpandedFaq] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    // SheetDB integration - Column names: Name, Email, Phone, Type, Industry
    const apiUrl = "https://sheetdb.io/api/v1/oecojg84o37sy" // Replace with your actual SheetDB API URL
    const postData = {
      data: [
        {
          Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Type: formData.type,
          Industry: formData.industry,
          Timestamp: new Date().toISOString(),
        },
      ],
    }

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        console.log("Success:", data)
        setModalMessage("Successfully registered!")
        setIsSuccess(true)
        setShowModal(true)
        // Optionally reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          type: "student",
          industry: "",
        })
      })
      .catch((error) => {
        console.error("Error:", error)
        setModalMessage("Error registering. Please try again.")
        setIsSuccess(false)
        setShowModal(true)
      })
  }

  const handleScrollToContact = () => {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
  }

  const benefits = [
    {
      icon: <GraduationCap className="w-8-chennai h-8-chennai" />,
      title: "For Students",
      description: "Verified jobs, internships, and training programs",
      points: ["Campus placements", "Industry training", "Skill development", "Career guidance"],
    },
    {
      icon: <Building2 className="w-8-chennai h-8-chennai" />,
      title: "For Colleges",
      description: "Strong placement tie-ups and industry connections",
      points: ["100% placement support", "Industry partnerships", "Faculty training", "Student mentoring"],
    },
    {
      icon: <Users className="w-8-chennai h-8-chennai" />,
      title: "For Companies",
      description: "Access to trained local talent pool",
      points: ["Pre-screened candidates", "Local expertise", "Quick hiring", "Cultural fit"],
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Register on EarlyJobs Chennai portal with your details",
    },
    {
      number: "02",
      title: "Get Matched",
      description: "Our AI matches you with perfect opportunities available in portal",
    },
    {
      number: "03",
      title: "Start Your Career",
      description: "Attend interviews and join top companies in Chennai",
    },
  ]

  const events = [
    {
      date: "Dec 15",
      title: "Chennai IT Job Fair 2024",
      location: "Chennai Trade Centre",
      companies: "50+ Companies",
    },
    {
      date: "Dec 20",
      title: "Anna University Campus Drive",
      location: "Anna University Campus",
      companies: "25+ Companies",
    },
  ]

  const faqs = [
    {
      question: "Which industries are most active in Chennai recruitment?",
      answer:
        "Chennai's major industries include IT/Software, Automobile (TVS, Hyundai), Healthcare, Banking, and Manufacturing. We have strong connections across all these sectors.",
    },
    {
      question: "Do you support Tamil language preferences?",
      answer:
        "Yes! While most corporate roles require English, we help match candidates with companies that value bilingual skills and cultural understanding.",
    },
    {
      question: "What about transportation and commute support?",
      answer:
        "We consider location preferences and provide guidance on Chennai's transport system. Many of our partner companies offer transportation facilities.",
    },
    {
      question: "Are there opportunities for freshers from local colleges?",
      answer:
        "We work closely with Anna University, SRM, VIT Chennai, and other local institutions for campus placements and internships.",
    },
  ]

  return (
    <div className="min-h-screen-chennai bg-background-chennai">
      {/* Hero Section */}
      <section className="hero-section-chennai">
        <div
          className="hero-bg-chennai"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="hero-overlay-chennai" />

        <div className="relative-chennai z-10-chennai max-w-7xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai text-center-chennai">
          <div className="max-w-4xl-chennai mx-auto-chennai">
            <h1 className="text-5xl-chennai md-text-7xl-chennai font-bold-chennai text-white-chennai mb-6-chennai">
              Shaping Careers in <span className="text-yellow-chennai">Chennai</span>
            </h1>
            <p className="text-xl-chennai md-text-2xl-chennai text-white-90-chennai mb-8-chennai leading-relaxed-chennai">
              Connect, Learn, and Grow with EarlyJobs - Chennai's trusted bridge between talent and top recruiters
            </p>
            <div className="flex-chennai flex-col-chennai sm-flex-row-chennai gap-4-chennai justify-center-chennai items-center-chennai">
              <button onClick={handleScrollToContact} className="btn-primary-chennai">
                Register Now
                <ArrowRight className="ml-2-chennai w-5-chennai h-5-chennai inline-chennai" />
              </button>
              <button className="btn-secondary-chennai">
                <Phone className="mr-2-chennai w-5-chennai h-5-chennai inline-chennai" />
                Talk to Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20-chennai bg-white-chennai">
        <div className="max-w-7xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-16-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai mb-6-chennai">
              EarlyJobs <span className="text-primary-chennai">Chennai</span>
            </h2>
            <div className="max-w-4xl-chennai mx-auto-chennai">
              <p className="text-xl-chennai text-muted-foreground-chennai leading-relaxed-chennai mb-6-chennai">
                As Chennai's premier recruitment franchise, we understand the pulse of this vibrant city. From the
                bustling IT corridors of OMR to the industrial excellence of Ambattur, we connect Chennai's brightest
                minds with opportunities that matter.
              </p>
              <p className="text-lg-chennai text-muted-foreground-chennai leading-relaxed-chennai mb-6-chennai">
                With deep roots in Tamil Nadu's educational excellence and strong partnerships with Chennai's leading
                employers, we're not just a job portal - we're your career <em>velai</em> (work) partners.
              </p>
              <div className="grid-chennai grid-cols-1-chennai md-grid-cols-3-chennai gap-8-chennai mt-12-chennai">
                <div className="stat-card-chennai">
                  <div className="stat-icon-container-chennai">
                    <Target className="w-8-chennai h-8-chennai text-primary-chennai" />
                  </div>
                  <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-2-chennai">1500+</h3>
                  <p className="text-muted-foreground-chennai">Jobs Placed</p>
                </div>
                <div className="stat-card-chennai">
                  <div className="stat-icon-container-chennai">
                    <Building2 className="w-8-chennai h-8-chennai text-primary-chennai" />
                  </div>
                  <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-2-chennai">50+</h3>
                  <p className="text-muted-foreground-chennai">Partner Companies</p>
                </div>
                <div className="stat-card-chennai">
                  <div className="stat-icon-container-chennai">
                    <GraduationCap className="w-8-chennai h-8-chennai text-primary-chennai" />
                  </div>
                  <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-2-chennai">10+</h3>
                  <p className="text-muted-foreground-chennai">College Partners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20-chennai bg-gray-100-chennai">
        <div className="max-w-7xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-16-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">
              Why Choose <span className="text-primary-chennai">EarlyJobs Chennai?</span>
            </h2>
            <p className="text-xl-chennai text-muted-foreground-chennai max-w-3xl-chennai mx-auto-chennai">
              Tailored solutions for students, colleges, and companies in Chennai's dynamic job market
            </p>
          </div>

          <div className="grid-chennai grid-cols-1-chennai lg-grid-cols-3-chennai gap-8-chennai">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-chennai group-chennai">
                <div className="icon-container-chennai group-hover-bg-orange-primary-20-chennai">{benefit.icon}</div>
                <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-4-chennai">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground-chennai mb-6-chennai">{benefit.description}</p>
                <ul className="space-y-3-chennai">
                  {benefit.points.map((point, idx) => (
                    <li key={idx} className="flex-chennai items-center-chennai text-muted-foreground-chennai">
                      <CheckCircle className="w-5-chennai h-5-chennai text-success-chennai mr-3-chennai flex-shrink-0-chennai" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20-chennai bg-card-chennai">
        <div className="max-w-7xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-16-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">
              How It <span className="text-primary-chennai">Works</span>
            </h2>
            <p className="text-xl-chennai text-muted-foreground-chennai max-w-3xl-chennai mx-auto-chennai">
              Your journey to success in Chennai's job market starts here
            </p>
          </div>

          <div className="grid-chennai grid-cols-1-chennai md-grid-cols-3-chennai gap-12-chennai">
            {steps.map((step, index) => (
              <div key={index} className="text-center-chennai group-chennai">
                <div className="relative-chennai mb-8-chennai">
                  <div className="step-indicator-chennai group-hover-scale-110-chennai">{step.number}</div>
                  {index < steps.length - 1 && (
                    <div className="hidden-chennai md-block-chennai absolute-chennai top-10-chennai left-full-chennai w-full-chennai h-0-5-chennai bg-orange-primary-20-chennai" />
                  )}
                </div>
                <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-4-chennai">
                  {step.title}
                </h3>
                <p className="text-muted-foreground-chennai leading-relaxed-chennai">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="contact" className="py-20-chennai bg-orange-primary-10-chennai">
        <div className="max-w-4xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-12-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">
              Be Part of <span className="text-primary-chennai">EarlyJobs Chennai</span>
            </h2>
            <p className="text-xl-chennai text-muted-foreground-chennai">
              Ready to transform your career journey? Join thousands of Chennai professionals who trust EarlyJobs.
            </p>
          </div>

          <div className="bg-white-chennai rounded-2xl-chennai p-8-chennai shadow-sm-chennai">
            <form onSubmit={handleSubmit} className="space-y-6-chennai">
              <div className="grid-chennai grid-cols-1-chennai md-grid-cols-2-chennai gap-6-chennai">
                <div>
                  <label className="form-label-chennai">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input-chennai"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="form-label-chennai">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input-chennai"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid-chennai grid-cols-1-chennai md-grid-cols-2-chennai gap-6-chennai">
                <div>
                  <label className="form-label-chennai">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input-chennai"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
                <div>
                  <label className="form-label-chennai">I am a</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="form-input-chennai"
                  >
                    <option value="student">Student</option>
                    <option value="college">College Representative</option>
                    <option value="company">Company/HR</option>
                  </select>
                </div>
              </div>

              <div className="grid-chennai grid-cols-1-chennai gap-6-chennai">
                <div>
                  <label className="form-label-chennai">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="form-input-chennai"
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="IT/Software">IT/Software</option>
                    <option value="Automobile">Automobile</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Banking">Banking</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full-chennai py-4-chennai bg-orange-primary-chennai text-white-chennai text-lg-chennai font-semibold-chennai rounded-lg-chennai btn-hover-chennai transition-bounce-chennai shadow-elegant-chennai"
              >
                Join EarlyJobs Chennai
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Local Events */}
      <section id="events" className="py-20-chennai bg-background-chennai">
        <div className="max-w-7xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-16-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">
              Upcoming <span className="text-primary-chennai">Chennai Events</span>
            </h2>
            <p className="text-xl-chennai text-muted-foreground-chennai max-w-3xl-chennai mx-auto-chennai">
              Don't miss these exciting opportunities to connect with top employers and advance your career
            </p>
          </div>

          <div className="grid-chennai grid-cols-1-chennai md-grid-cols-2-chennai gap-8-chennai">
            {events.map((event, index) => (
              <div key={index} className="event-card-chennai group-chennai">
                <div className="flex-chennai items-center-chennai justify-between-chennai mb-4-chennai">
                  <div className="bg-orange-primary-40-chennai rounded-lg-chennai px-3-chennai py-1-chennai">
                    <span className="text-primary-chennai font-semibold-chennai text-sm-chennai">{event.date}</span>
                  </div>
                  <Calendar className="w-5-chennai h-5-chennai text-muted-foreground-chennai" />
                </div>
                <h3 className="text-xl-chennai font-bold-chennai text-foreground-chennai mb-3-chennai group-hover-text-primary-chennai transition-smooth-chennai">
                  {event.title}
                </h3>
                <div className="space-y-2-chennai text-muted-foreground-chennai">
                  <div className="flex-chennai items-center-chennai">
                    <MapPin className="w-4-chennai h-4-chennai mr-2-chennai" />
                    <span className="text-sm-chennai">{event.location}</span>
                  </div>
                  <div className="flex-chennai items-center-chennai">
                    <Building2 className="w-4-chennai h-4-chennai mr-2-chennai" />
                    <span className="text-sm-chennai">{event.companies}</span>
                  </div>
                </div>
                <button className="mt-4-chennai w-full-chennai py-2-chennai bg-orange-primary-50-chennai text-white-chennai rounded-lg-chennai hover-bg-primary-chennai hover-text-primary-foreground-chennai transition-smooth-chennai">
                  Register Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20-chennai bg-gray-100-chennai">
        <div className="max-w-4xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-16-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">
              Frequently Asked <span className="text-primary-chennai">Questions</span>
            </h2>
            <p className="text-xl-chennai text-muted-foreground-chennai">
              Everything you need to know about careers and opportunities in Chennai
            </p>
          </div>

          <div className="space-y-4-chennai">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background-chennai rounded-lg-chennai border-chennai overflow-hidden-chennai"
              >
                <button
                  className="faq-button-chennai"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-semibold-chennai text-foreground-chennai">{faq.question}</span>
                  <ChevronDown
                    className={`w-5-chennai h-5-chennai text-muted-foreground-chennai transition-smooth-chennai ${
                      expandedFaq === index ? "rotate-180-chennai" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="faq-content-chennai">
                    <p className="text-muted-foreground-chennai leading-relaxed-chennai">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-20-chennai bg-white-chennai">
        <div className="max-w-4xl-chennai mx-auto-chennai px-4-chennai sm-px-6-chennai lg-px-8-chennai">
          <div className="text-center-chennai mb-16-chennai">
            <h2 className="text-4xl-chennai md-text-5xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">
              Contact <span className="text-primary-chennai">EarlyJobs Chennai</span>
            </h2>
            <p className="text-xl-chennai text-muted-foreground-chennai max-w-3xl-chennai mx-auto-chennai">
              Reach out to our Chennai franchise team for any queries or support. We're here to help you succeed!
            </p>
          </div>

          <div className="flex-chennai bg-orange-primary-10-chennai justify-between-chennai rounded-lg-chennai shadow-lg-chennai">
            <div className="contact-info-chennai">
              <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">Get in Touch</h3>
              <div className="space-y-4-chennai text-muted-foreground-chennai">
                <div className="flex-chennai items-center-chennai">
                  <MapPin className="w-12-chennai h-12-chennai text-primary-chennai mr-3-chennai" />
                  <p>
                    Chennai : The WorkVilla - Arcade Centre , 3rd Floor , 110/1, Mahatma Gandhi Road, Nungambakkam,
                    Chennai 600034.
                  </p>
                </div>
                <div className="flex-chennai items-center-chennai">
                  <Phone className="w-6-chennai h-6-chennai text-primary-chennai mr-3-chennai" />
                  <p>+91 8015532924</p>
                </div>
                <div className="flex-chennai items-center-chennai">
                  <Mail className="w-6-chennai h-6-chennai text-primary-chennai mr-3-chennai" />
                  <p>chennai@earlyjobs.com</p>
                </div>
              </div>
              <button
                onClick={handleScrollToContact}
                className="mt-6-chennai w-full-chennai py-3-chennai bg-orange-primary-chennai text-white-chennai text-lg-chennai font-semibold-chennai rounded-lg-chennai hover-bg-orange-600-chennai transition-smooth-chennai"
              >
                Register Now
              </button>
            </div>
            <div className="hidden-chennai md-block-chennai contact-info-chennai">
              <h3 className="text-2xl-chennai font-bold-chennai text-foreground-chennai mb-6-chennai">Office Hours</h3>
              <div className="space-y-4-chennai text-muted-foreground-chennai">
                <p>
                  <span className="font-semibold-chennai">Monday - Friday:</span> 9:00 AM - 6:00 PM
                </p>
                <p>
                  <span className="font-semibold-chennai">Saturday:</span> 10:00 AM - 4:00 PM
                </p>
                <p>
                  <span className="font-semibold-chennai">Sunday:</span> Closed
                </p>
              </div>
              <div className="mt-6-chennai">
                <p className="text-muted-foreground-chennai mb-4-chennai">
                  Have a question? Drop by our office or give us a call!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay-chennai">
          <div className="modal-content-chennai">
            <h3
              className={`text-2xl-chennai font-bold-chennai mb-4-chennai ${isSuccess ? "text-primary-chennai" : "text-red-600-chennai"}`}
            >
              {isSuccess ? "Success!" : "Error"}
            </h3>
            <p className="text-muted-foreground-chennai mb-6-chennai">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full-chennai py-3-chennai bg-orange-primary-chennai text-white-chennai text-lg-chennai font-semibold-chennai rounded-lg-chennai hover-bg-orange-600-chennai transition-smooth-chennai"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FranchiseChennai
