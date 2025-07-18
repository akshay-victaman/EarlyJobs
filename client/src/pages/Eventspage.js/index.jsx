import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Clock,
  CheckCircle,
  Star,
  Trophy,
  Target,
  Video,
  Play,
  Mail,
  User,
  Bell,
  Phone,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
  Building,
  BookOpen,
  Shield,
  HelpCircle,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import "./index.css";

// Import images (you'll need to add these to your project)
import franchiseExpoHero from "../../assets/franchise-expo-hero.jpg";
import webinarHero from "../../assets/webinar-hero.jpg";
import officeLaunchHero from "../../assets/office-launch-hero.jpg";

// Button Component
const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  const getButtonClasses = () => {
    let classes = "btn";

    // Add variant class
    if (variant === "outline") {
      classes += " btn-outline";
    } else if (variant === "secondary") {
      classes += " btn-secondary";
    } else {
      classes += " btn-default";
    }

    // Add size class
    if (size === "sm") {
      classes += " btn-sm";
    } else if (size === "lg") {
      classes += " btn-lg";
    } else if (size === "icon") {
      classes += " btn-icon";
    }

    return classes;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Components
const Card = ({ children, className = "", ...props }) => (
  <div className={`card ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`card-content-event ${className}`} {...props}>
    {children}
  </div>
);

// Badge Component
const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const getBadgeClasses = () => {
    let classes = "badge";

    if (variant === "secondary") {
      classes += " badge-secondary";
    } else if (variant === "outline") {
      classes += " badge-outline";
    } else {
      classes += " badge-default";
    }

    return classes;
  };

  return (
    <div className={`${getBadgeClasses()} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Input Component
const Input = ({ className = "", ...props }) => (
  <input className={`input ${className}`} {...props} />
);

// Label Component
const Label = ({ children, className = "", ...props }) => (
  <label className={`label ${className}`} {...props}>
    {children}
  </label>
);

// Checkbox Component
const Checkbox = ({ checked, onCheckedChange, className = "", ...props }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange && onCheckedChange(e.target.checked)}
    className={`checkbox ${className}`}
    {...props}
  />
);

// Select Components
const Select = ({ children, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div style={{ position: "relative" }} {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isOpen,
          setIsOpen,
          selectedValue,
          handleSelect,
        })
      )}
    </div>
  );
};

const SelectTrigger = ({ children, isOpen, setIsOpen, selectedValue }) => (
  <button
    type="button"
    onClick={() => setIsOpen(!isOpen)}
    className="select-trigger"
  >
    {selectedValue || children}
    <ChevronDown
      style={{
        height: "1rem",
        width: "1rem",
        transition: "transform 0.3s ease",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      }}
    />
  </button>
);

const SelectValue = ({ placeholder }) => (
  <span style={{ color: "#9ca3af" }}>{placeholder}</span>
);

const SelectContent = ({ children, isOpen, handleSelect }) =>
  isOpen && (
    <div className="select-content">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { handleSelect })
      )}
    </div>
  );

const SelectItem = ({ children, value, handleSelect }) => (
  <div onClick={() => handleSelect(value)} className="select-item">
    {children}
  </div>
);

// Accordion Components
const Accordion = ({ children, type, collapsible, className = "" }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (value) => {
    const newOpenItems = new Set(openItems);
    if (type === "single") {
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.clear();
        newOpenItems.add(value);
      }
    } else {
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.add(value);
      }
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { openItems, toggleItem })
      )}
    </div>
  );
};

const AccordionItem = ({
  children,
  value,
  openItems,
  toggleItem,
  className = "",
}) => {
  const isOpen = openItems && openItems.has(value);

  return (
    <div className={className}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, toggleItem, value })
      )}
    </div>
  );
};

const AccordionTrigger = ({
  children,
  isOpen,
  toggleItem,
  value,
  className = "",
}) => (
  <button
    onClick={() => toggleItem(value)}
    className={`accordion-trigger ${className}`}
  >
    {children}
    <ChevronDown
      style={{
        height: "1rem",
        width: "1rem",
        transition: "transform 0.2s ease",
        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
      }}
    />
  </button>
);

const AccordionContent = ({ children, isOpen, className = "" }) => (
  <div
    className={`accordion-content ${className}`}
    style={{
      maxHeight: isOpen ? "1000px" : "0px",
      opacity: isOpen ? 1 : 0,
    }}
  >
    <div className="accordion-content-inner">{children}</div>
  </div>
);

// Separator Component
const Separator = ({ className = "", ...props }) => (
  <div className={`separator ${className}`} {...props} />
);

// Hero Section
const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: franchiseExpoHero,
      title: "Franchise India Pavilion",
      subtitle: "Lucknow - July 30-31, 2025",
      description: "Government-backed entrepreneurship expo",
    },
    {
      id: 2,
      image: webinarHero,
      title: "Weekly Franchise Webinars",
      subtitle: "Every Saturday at 11 AM",
      description: "Learn from industry experts",
    },
    {
      id: 3,
      image: officeLaunchHero,
      title: "New Office Launches",
      subtitle: "Faridabad & Hyderabad",
      description: "Grand opening ceremonies coming soon",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="hero-section">
      {/* Background Slider */}
      <div className="hero-background">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`hero-slide ${
              index === currentSlide ? "active" : "inactive"
            }`}
          >
            <img src={slide.image} alt={slide.title} />
          </div>
        ))}
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content container">
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <h1 className="hero-title font-poppins">
            Fueling Local Hiring.{" "}
            <span style={{ color: "#EB6A4D" }}>Powering New Businesses.</span>
          </h1>

          <p className="hero-subtitle font-inter">
            Discover What's Next with EarlyJobs.
          </p>

          <p className="hero-description font-inter">
            Explore our upcoming events—from franchise launches to India's
            biggest entrepreneurship expos.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <Button
              size="lg"
              style={{
                backgroundColor: "#EB6A4D",
                color: "white",
                fontWeight: "600",
                padding: "1rem 2rem",
                fontSize: "1.125rem",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
            >
              <Calendar
                style={{
                  marginRight: "0.5rem",
                  height: "1.25rem",
                  width: "1.25rem",
                }}
              />
              Register for Upcoming Webinar
            </Button>

            <Button
              size="lg"
              variant="outline"
              style={{
                border: "1px solid white",
                color: "white",
                fontWeight: "600",
                padding: "1rem 2rem",
                fontSize: "1.125rem",
                borderRadius: "0.75rem",
                transition: "all 0.3s ease",
              }}
            >
              <MapPin
                style={{
                  marginRight: "0.5rem",
                  height: "1.25rem",
                  width: "1.25rem",
                }}
              />
              Visit Us at Franchise India Lucknow
            </Button>
          </div>

          {/* Slide Info */}
          <div className="hero-info-card">
            <h3
              className="font-poppins"
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              {slides[currentSlide].title}
            </h3>
            <p
              className="font-inter"
              style={{
                fontSize: "1.125rem",
                color: "#EB6A4D",
                marginBottom: "0.25rem",
              }}
            >
              {slides[currentSlide].subtitle}
            </p>
            <p
              className="font-inter"
              style={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Navigation */}

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`hero-indicator ${
                index === currentSlide ? "active" : "inactive"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Events Calendar
const EventsCalendar = () => {
  const events = [
    {
      id: 1,
      date: "Coming Soon",
      eventType: "Franchise Webinar",
      location: "Online (Zoom)",
      time: "Coming Soon",
      status: "open",
      attendees: "Invite Only",
      ctaText: "Coming Soon",
    },
    {
      id: 2,
      date: "Coming Soon",
      eventType: "Franchise India Expo",
      location: "Lucknow",
      time: "Coming Soon",
      status: "featured",
      attendees: "Invite Only",
      ctaText: "Coming Soon",
    },
    {
      id: 3,
      date: "Coming Soon",
      eventType: "Launch Ceremony",
      location: "Faridabad",
      time: "Coming Soon",
      status: "Coming Soon",
      attendees: "Invite Only",
      ctaText: "Notify Me",
    },
    {
      id: 4,
      date: "Coming Soon",
      eventType: "Launch Ceremony",
      location: "Hyderabad",
      time: "Coming Soon",
      status: "Coming Soon",
      attendees: "Invite Only",
      ctaText: "Notify Me",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-4xl font-bold text-foreground mb-4">
            Upcoming Events Calendar
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on these exciting opportunities to grow your business
            and network with industry leaders.
          </p>
        </div>

        <div
          className="overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex space-x-6 min-w-max px-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="min-w-80 hover:shadow-card transition-all duration-300 group border-0 shadow-elegant"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge
                      variant={
                        event.status === "featured"
                          ? "default"
                          : event.status === "open"
                          ? "secondary"
                          : "outline"
                      }
                      style={{
                        backgroundColor:
                          event.status === "featured"
                            ? "#F3F4F6" // example for 'accent'
                            : event.status === "open"
                            ? "white" // example for 'primary'
                            : "transparent",
                        color:
                          event.status === "featured" || event.status === "open"
                            ? "orange"
                            : "#6B7280", // example for 'text-muted-foreground'
                        border:
                          event.status === "featured" || event.status === "open"
                            ? "1px solid orange" // example for 'outline'
                            : "none",
                      }}
                    >
                      {event.status === "featured"
                        ? "Featured"
                        : event.status === "open"
                        ? "Open"
                        : "Coming Soon"}
                    </Badge>

                    <div className="text-right">
                      <p className="font-poppins text-sm font-semibold text-primary">
                        {event.date}
                      </p>
                    </div>
                  </div>

                  <h3 className="font-poppins text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {event.eventType}
                  </h3>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-inter text-sm">
                        {event.location}
                      </span>
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-inter text-sm">{event.time}</span>
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-inter text-sm">
                        {event.attendees}
                      </span>
                    </div>
                  </div>

                  <Button
                    className={`w-full font-poppins font-semibold ${
                      event.status === "featured"
                        ? "bg-accent hover:bg-accent/90"
                        : event.status === "open"
                        ? "bg-primary hover:bg-primary/90"
                        : ""
                    }`}
                    variant={
                      event.status === "coming-soon" ? "outline" : "default"
                    }
                  >
                    {event.ctaText}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div
          className="text-center mt-8"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="outline"
            size="lg"
            className="font-poppins font-semibold"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Calendar className="mr-2 h-5 w-5" />
            View Full Calendar
          </Button>
        </div>
      </div>
    </section>
  );
};

// Featured Event
const FeaturedEvent = () => {
  const features = [
    {
      icon: <Users className="h-5 w-5" />,
      text: "Live demo of EarlyJobs platform",
    },
    {
      icon: <Star className="h-5 w-5" />,
      text: "Meet the founders and franchise leaders",
    },
    {
      icon: <Target className="h-5 w-5" />,
      text: "Explore district-wise franchise opportunities",
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      text: "Earlybird franchise offers (1st 20 cities)",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-accent text-white mb-4 text-lg px-4 py-2">
              Featured Event
            </Badge>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-4">
              Franchise India Pavilion, Lucknow
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center font-inter">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Government-Backed
              </span>
              <span className="flex items-center font-inter">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Tier 2/3 Focused
              </span>
              <span className="flex items-center font-inter">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                Franchise India x GoUP
              </span>
            </div>
          </div>

          <div className="responsive-container">
            <div className="responsive-child">
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 className="font-poppins text-2xl font-semibold text-foreground mb-4">
                  India's Most Action-Driven Entrepreneurship Event
                </h3>
                <p className="">
                  EarlyJobs is proud to showcase at this premier
                  entrepreneurship event hosted by the Government of Uttar
                  Pradesh. Join us to explore franchise opportunities and
                  connect with industry leaders shaping the future of local
                  hiring.
                </p>
              </div>
              <div>
                <img
                  src={franchiseExpoHero}
                  alt="Franchise India Expo Lucknow"
                  className="w-full rounded-2xl shadow-card hover:shadow-brand transition-all duration-500"
                />
              </div>
            </div>

            <div className="responsive-child">
              {" "}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h4 className="font-poppins text-xl font-semibold text-foreground mb-4">
                    Key Event Details
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center" style={{ gap: "1rem" }}>
                      <Calendar className="h-5 w-5 mr-3 text-primary" />
                      <span className="font-inter">
                        <strong>Dates:</strong> 30–31 July 2025
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: "1rem" }}>
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <span className="font-inter">
                        <strong>Location:</strong> Indira Gandhi Pratishthan,
                        Lucknow
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: "1rem" }}>
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <span className="font-inter">
                        <strong>Organized by:</strong> Government of Uttar
                        Pradesh
                      </span>
                    </div>
                    <div className="flex items-center" style={{ gap: "1rem" }}>
                      <Star className="h-5 w-5 mr-3 text-primary" />
                      <span className="font-inter">
                        <strong>Curated by:</strong> Franchise India
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div style={{ marginTop: "2rem" }}>
                <h4 className="font-poppins text-xl font-semibold text-foreground mb-4">
                  Why Visit Our Booth?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                        {feature.icon}
                      </div>
                      <span className="font-inter text-foreground">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-white font-poppins font-semibold px-8 py-4 text-lg shadow-accent"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Attend Franchise Expo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Franchise Launches
const FranchiseLaunches = () => {
  const launches = [
    {
      id: 1,
      city: "Faridabad",
      status: "Coming Soon",
      description:
        "Grand opening ceremony with local business leaders and franchise partners",
      features: [
        "Premium office space",
        "Local hiring focus",
        "Government partnerships",
      ],
      image: officeLaunchHero,
    },
    {
      id: 2,
      city: "Hyderabad",
      status: "20th July 2025",
      description: "Tech hub expansion with focus on IT and startup ecosystem",
      features: [
        "Tech-focused hiring",
        "Startup partnerships",
        "Innovation center",
      ],
      image: officeLaunchHero,
    },
  ];
  function parseDateOrInfinity(status) {
    // Remove 'st', 'nd', 'rd', 'th' using regex
    const cleanDate = status.replace(/(\d+)(st|nd|rd|th)/i, "$1");
    const parsed = Date.parse(cleanDate);
    return isNaN(parsed) ? Infinity : new Date(parsed).getTime();
  }

  launches.sort(
    (a, b) => parseDateOrInfinity(a.status) - parseDateOrInfinity(b.status)
  );

  return (
    <section
      className="py-20 bg-gradient-to-br from-primary/5 to-accent/5"
      style={{ paddingBottom: "0px" }}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-4">
            Franchise Launch Announcements
          </h2>
          <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
            Be part of our expansion journey as we bring EarlyJobs to new
            cities. Join us for exclusive launch ceremonies and networking
            opportunities.
          </p>
        </div>

        <div style={{ display: "flex", gap: "1rem", margin: "3rem 0" }}>
          {launches.map((launch) => (
            <Card
              key={launch.id}
              className="overflow-hidden hover:shadow-card transition-all duration-300 group border-0 shadow-elegant"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={launch.image}
                  alt={`${launch.city} Office Launch`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-accent text-white">
                  {launch.status}
                </Badge>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-poppins text-2xl font-semibold text-foreground">
                    {launch.city}
                  </h3>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="font-inter text-sm">Launch Center</span>
                  </div>
                </div>

                <p
                  className="font-inter text-muted-foreground mb-6"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={launch.description} // shows full text on hover
                >
                  {launch.description}
                </p>

                <div
                  className="text-center"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <p className="font-inter text-sm text-muted-foreground">
                    {launch.status === "Coming Soon"
                      ? "Coming Soon"
                      : "20th July 2025"}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-poppins font-semibold text-foreground">
                    Key Features:
                  </h4>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                  >
                    {launch.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        style={{
                          color: "orange",
                          border: "1px solid orange",
                          backgroundColor: "transparent",
                        }}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    style={{
                      backgroundColor: "#EB6A4D",
                      color: "white",
                      border: "0px",
                    }}
                    className="w-full font-poppins font-semibold flex items-center justify-center gap-2"
                    disabled={launch.status === "Coming Soon"}
                  >
                    Join Our Opening
                    <ArrowRight style={{ marginLeft: "0.5rem" }} size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Notification Form */}
        <Card className="max-w-2xl mx-auto mb-16 border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="font-poppins text-2xl font-semibold text-foreground mb-4">
              Get Notified About Launch Events
            </h3>
            <p className="font-inter text-muted-foreground mb-6">
              Be the first to know when we announce launch dates and event
              details.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90 font-poppins font-semibold">
                <Mail className="mr-2 h-4 w-4" />
                Notify Me
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
      </div>
    </section>
  );
};

// Weekly Webinars
const WeeklyWebinars = () => {
  const topics = [
    "How to Start a Franchise in Your City",
    "Common FAQs Answered",
    "Real Success Stories from Our Partners",
    "Market Analysis and Opportunities",
    "Investment Requirements and ROI",
    "Ongoing Support and Training",
  ];

  const upcomingSessions = [
    {
      date: "This Saturday",
      topic: "Franchise Opportunities in Tier 2 Cities",
      attendees: "150+ registered",
    },
    {
      date: "Next Saturday",
      topic: "Success Stories: From Investment to Profit",
      attendees: "Registration opens soon",
    },
  ];

  return (
    <section className="bg-background" style={{ paddingTop: "2rem" }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-primary text-white mb-4 text-lg px-4 py-2">
              Weekly Series
            </Badge>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-foreground mb-4">
              Franchise Masterclass Webinars
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-3xl mx-auto">
              Join our weekly webinar series every Saturday at 11:00 AM IST.
              Learn directly from industry experts and successful franchise
              partners.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div style={{ position: "relative" }}>
              <img
                src={webinarHero}
                alt="Weekly Webinar Series"
                className="w-full rounded-2xl shadow-card hover:shadow-accent transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
              <div
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  left: "3rem",
                  color: "white",
                }}
              >
                <Badge className="bg-accent text-white mb-2">LIVE</Badge>
                <h3 className="font-poppins text-xl font-semibold">
                  Every Saturday • 11:00 AM IST
                </h3>
              </div>
              <Button
                size="icon"
                style={{
                  position: "absolute",
                  bottom: "2rem",
                  right: "3rem",
                  color: "white",
                }}
              >
                <Play className="h-8 w-8 text-white ml-1" />
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-poppins text-2xl font-semibold text-foreground mb-4">
                  Hosted by Dipandaja Das
                </h3>
                <p className="font-inter text-muted-foreground text-lg mb-2">
                  Franchise Head, EarlyJobs
                </p>
                <p className="font-inter text-muted-foreground leading-relaxed">
                  With over 10 years of experience in franchise development and
                  business expansion, Dipandaja brings practical insights and
                  real-world solutions to aspiring entrepreneurs.
                </p>
              </div>

              <Card className="border-2 border-accent/20 bg-accent/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-poppins text-xl font-semibold text-foreground">
                      Next Session
                    </h4>
                    <Badge className="bg-accent text-white">Coming soon</Badge>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "end",
                    }}
                  >
                    <div className="space-y-3 mb-6">
                      <div
                        className="flex items-center"
                        style={{ gap: "0.5rem" }}
                      >
                        <Calendar className="h-5 w-5 mr-3 text-accent" />
                        <span className="font-inter">Coming soon</span>
                      </div>
                      <div
                        className="flex items-center"
                        style={{ gap: "0.5rem" }}
                      >
                        <Clock className="h-5 w-5 mr-3 text-accent" />
                        <span className="font-inter">11:00 AM IST</span>
                      </div>
                      <div
                        className="flex items-center"
                        style={{ gap: "0.5rem" }}
                      >
                        <Video className="h-5 w-5 mr-3 text-accent" />
                        <span className="font-inter">
                          Zoom (Link sent after registration)
                        </span>
                      </div>
                      <div
                        className="flex items-center"
                        style={{ gap: "0.5rem" }}
                      >
                        <Users className="h-5 w-5 mr-3 text-accent" />
                        <span className="font-inter">
                          150+ already registered
                        </span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-accent hover:bg-accent/90 text-white font-poppins font-semibold"
                      style={{ marginBottom: "21px", width: " auto" }}
                    >
                      <Calendar
                        className="mr-2 h-5 w-5"
                        style={{ marginRight: "0.5rem" }}
                      />
                      Reserve My Webinar Seat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Topics Covered */}
          <div className="topics-section">
            <h3 className="topics-title">Topics We Cover</h3>

            <div className="topics-grid">
              {topics.map((topic, index) => (
                <div key={index} className="topic-card">
                  <CheckCircle size={20} className="topic-icon" />
                  <span className="topic-text">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}
        </div>
      </div>
    </section>
  );
};

// Registration Form
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    eventTypes: [],
    franchiseInterest: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eventTypes = [
    {
      id: "webinar",
      label: "Weekly Webinars",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: "expo",
      label: "Franchise Expo (Lucknow)",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      id: "launches",
      label: "Office Launch Events",
      icon: <Bell className="h-4 w-4" />,
    },
  ];

  const handleEventTypeChange = (eventType, checked) => {
    setFormData((prev) => ({
      ...prev,
      eventTypes: checked
        ? [...prev.eventTypes, eventType]
        : prev.eventTypes.filter((type) => type !== eventType),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || formData.eventTypes.length === 0) {
      alert(
        "Please fill in all required fields and select at least one event type."
      );
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container mx-auto px-6">
          <Card className="max-w-2xl mx-auto border-0 shadow-card">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-poppins text-3xl font-bold text-foreground mb-4">
                Thank You!
              </h3>
              <p className="font-inter text-lg text-muted-foreground mb-6">
                You're now on the list. Watch out for our next franchise
                opportunity or event invite. You'll hear from us soon!
              </p>
              <div className="space-y-3 text-left max-w-md mx-auto">
                <h4 className="font-poppins font-semibold text-foreground">
                  What's Next:
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Email confirmation within 24 hours</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Event reminders and updates</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Exclusive franchise opportunities</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="outline"
                className="mt-8 font-poppins font-semibold"
              >
                Register for More Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-20 bg-gradient-to-br from-accent/10 to-primary/10"
      style={{ paddingBottom: "0px" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-4xl font-bold text-foreground mb-4">
              Want to Join Us at the Next Event?
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Stay updated with our latest events and franchise opportunities.
              We'll keep you informed about everything that matters to your
              business growth.
            </p>
          </div>

          <Card className="border-2 border-primary/20 shadow-elegant">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="font-poppins font-semibold text-foreground"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      Full Name *
                    </Label>
                    <div className="relative">
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="font-poppins font-semibold text-foreground"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      Email Address *
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="city"
                    className="font-poppins font-semibold text-foreground"
                  >
                    City
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, city: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="faridabad">Faridabad</SelectItem>
                      <SelectItem value="lucknow">Lucknow</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="font-poppins font-semibold text-foreground">
                    Events you're interested in: *
                  </Label>
                  <div className="grid gap-4">
                    {eventTypes.map((eventType) => (
                      <div
                        key={eventType.id}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                      >
                        <Checkbox
                          id={eventType.id}
                          checked={formData.eventTypes.includes(eventType.id)}
                          onCheckedChange={(checked) =>
                            handleEventTypeChange(eventType.id, checked)
                          }
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          {eventType.icon}
                          <Label
                            htmlFor={eventType.id}
                            className="font-inter cursor-pointer flex-1"
                          >
                            {eventType.label}
                          </Label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 rounded-lg bg-accent/5">
                  <Checkbox
                    id="franchise-interest"
                    checked={formData.franchiseInterest}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        franchiseInterest: checked,
                      }))
                    }
                  />
                  <Label
                    htmlFor="franchise-interest"
                    className="font-inter cursor-pointer text-foreground"
                  >
                    I'm actively looking to start a franchise
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-poppins font-semibold text-lg py-4"
                >
                  <Bell className="mr-2 h-5 w-5" />
                  Notify Me About Events
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By registering, you agree to receive updates about EarlyJobs
                  events and franchise opportunities. You can unsubscribe at any
                  time.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const faqs = [
    {
      id: "1",
      question: "Who can attend the EarlyJobs events?",
      answer:
        "Our events are open to entrepreneurs, business owners, aspiring franchise partners, and anyone interested in local hiring solutions. Whether you're looking to start a franchise, explore business opportunities, or learn about our platform, you're welcome to join us.",
    },
    {
      id: "2",
      question: "What's the cost to attend these events?",
      answer:
        "Our weekly webinars are completely free to attend. For expo participation and office launch events, registration is free but seats are limited. Some premium networking sessions may have nominal fees, which will be clearly mentioned during registration.",
    },
    {
      id: "3",
      question: "Do I need experience to start a franchise?",
      answer:
        "No prior franchise experience is required! We provide comprehensive training and ongoing support to all our franchise partners. Our team will guide you through every step of the process, from initial setup to day-to-day operations. We believe in empowering passionate individuals with the right mindset.",
    },
    {
      id: "4",
      question: "Can I get a meeting with the EarlyJobs team during the expo?",
      answer:
        "Absolutely! During the Franchise India Expo in Lucknow, our team including founders and franchise heads will be available for one-on-one meetings. You can schedule a meeting in advance through our registration form or visit our booth during the event for direct consultations.",
    },
    {
      id: "5",
      question: "What cities are available for franchise opportunities?",
      answer:
        "We're actively expanding across India with focus on Tier 2 and Tier 3 cities. Current expansion includes Faridabad, Hyderabad, and many other cities. We offer district-wise franchise opportunities with special early-bird offers for the first 20 cities. Contact us to check availability in your preferred location.",
    },
    {
      id: "6",
      question: "How can I stay updated about upcoming events?",
      answer:
        "The best way to stay updated is by registering through our notification form on this page. You'll receive email updates about new events, webinar schedules, and exclusive franchise opportunities. You can also follow us on our social media channels for real-time updates.",
    },
    {
      id: "7",
      question: "What support do you provide to franchise partners?",
      answer:
        "We provide end-to-end support including initial training, marketing materials, technology platform, ongoing operational guidance, and regular performance reviews. Our franchise partners also get access to exclusive webinars, peer networking opportunities, and dedicated support channels.",
    },
    {
      id: "8",
      question: "Can I attend events virtually?",
      answer:
        "Yes! Our weekly webinars are conducted online via Zoom, making them accessible from anywhere. For physical events like the Franchise India Expo and office launches, we also provide live streaming for key sessions when possible. Virtual attendees get access to recordings and follow-up materials.",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: "#EB6A4D1A" }}
            >
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-poppins text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Got questions? We've got answers. Find everything you need to know
              about our events and franchise opportunities.
            </p>
          </div>

          <Card className="shadow-card border-0">
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="border-b border-border/50"
                  >
                    <AccordionTrigger className="text-left font-poppins font-semibold text-foreground hover:text-primary transition-colors py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-inter text-muted-foreground leading-relaxed pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <p className="font-inter text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:franchise@earlyjobs.in"
                className="font-poppins text-primary hover:text-primary/80 font-semibold"
              >
                franchise@earlyjobs.in
              </a>
              <a
                href="tel:+919148196806"
                className="font-poppins text-primary hover:text-primary/80 font-semibold"
              >
                +91 9148 196806
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const quickLinks = [
    {
      name: "Franchise Opportunity",
      href: "#franchise",
      icon: <Building className="h-4 w-4" />,
    },
    { name: "Blog", href: "#blog", icon: <BookOpen className="h-4 w-4" /> },
    {
      name: "Privacy Policy",
      href: "#privacy",
      icon: <Shield className="h-4 w-4" />,
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/company/earlyjobs",
      icon: <Linkedin className="h-5 w-5" />,
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/earlyjobs",
      icon: <Instagram className="h-5 w-5" />,
      color: "hover:text-pink-600",
    },
    {
      name: "Facebook",
      href: "https://facebook.com/earlyjobs",
      icon: <Facebook className="h-5 w-5" />,
      color: "hover:text-blue-700",
    },
  ];

  return (
    <footer className="bg-brand-grey text-white">
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-poppins text-2xl font-bold mb-4">
              <span className="text-brand-orange">Early</span>Jobs
            </h3>
            <p className="font-inter text-white/80 mb-6 leading-relaxed">
              Fueling local hiring and powering new businesses across India.
              Join our franchise network and be part of the employment
              revolution.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-colors ${social.color} hover:bg-white/20`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="font-poppins text-lg font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-inter text-white/80 hover:text-brand-orange transition-colors flex items-center space-x-2"
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="font-poppins text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-orange flex-shrink-0 mt-0.5" />
                <div className="font-inter text-white/80">
                  <p>Corporate Office</p>
                  <p className="text-sm">New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-brand-orange" />
                <a
                  href="tel:+919876543210"
                  className="font-inter text-white/80 hover:text-brand-orange transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-brand-orange" />
                <a
                  href="mailto:franchise@earlyjobs.in"
                  className="font-inter text-white/80 hover:text-brand-orange transition-colors"
                >
                  franchise@earlyjobs.in
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <h4 className="font-poppins text-lg font-semibold mb-6">
              Stay Connected
            </h4>
            <p className="font-inter text-white/80 mb-4">
              Get the latest updates on events and franchise opportunities.
            </p>

            <Button
              size="lg"
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white font-poppins font-semibold mb-4"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp Us
            </Button>

            <p className="font-inter text-xs text-white/60">
              Quick responses on WhatsApp for franchise inquiries and event
              updates.
            </p>
          </div>
        </div>

        <Separator className="my-12 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <div className="font-inter text-white/60 text-sm text-center lg:text-left">
            <p>&copy; 2025 EarlyJobs. All rights reserved.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
            <a
              href="#terms"
              className="font-inter text-white/60 hover:text-brand-orange transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#privacy"
              className="font-inter text-white/60 hover:text-brand-orange transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#cookies"
              className="font-inter text-white/60 hover:text-brand-orange transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Event Banner */}
      <div className="bg-brand-orange py-3">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="font-poppins text-white font-semibold">
              🚀 Next Webinar: This Saturday at 11 AM • Franchise India Expo:
              July 30-31, Lucknow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const EarlyJobsLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <EventsCalendar />
      <FeaturedEvent />
      <FranchiseLaunches />
      <WeeklyWebinars />
      <RegistrationForm />
      <FAQ />
      {/* <Footer /> */}
    </div>
  );
};

export default EarlyJobsLanding;
