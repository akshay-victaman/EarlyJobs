import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Where is the EarlyJobs Hyderabad office located?",
      answer:
        "Our franchise office is strategically located in Near Metro Pillar No: C1197, Cabin No.1, 1-84, 9, W Marredpally Rd, Regimental Bazaar, East Marredpally, Secunderabad, Telangana 500026, making it easily accessible from all major areas of Hyderabad including Gachibowli, Kondapur, and Madhapur.",
    },
    {
      question: "What are the eligibility criteria for students?",
      answer:
        "We welcome final year students and recent graduates from all streams - Engineering, MBA, BCA, B.Com, and more. No minimum percentage requirement, just the willingness to work and grow.",
    },
    {
      question: "What are your support hours?",
      answer:
        "Our team is available Monday to Saturday, 9:00 AM to 7:00 PM. We also provide 24/7 online support through our portal and WhatsApp helpline.",
    },
    {
      question: "Do you charge any fees from students?",
      answer:
        "No, our services are completely free for students and job seekers. We earn through our partnerships with employers who pay us for successful placements.",
    },
  ];

  return (
    <section
      style={{
        padding: "60px 20px",
        background: "linear-gradient(180deg, #f8fafc, #e2e8f0)",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#EB6A4D",
              marginBottom: "16px",
              letterSpacing: "0.5px",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontSize: "18px",
              color: "#4b5e7a",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6",
            }}
          >
            Everything you need to know about EarlyJobs Hyderabad
          </p>
        </div>
        <div>
          {faqData.map((faq, index) => (
            <Card
              key={index}
              style={{
                marginBottom: "16px",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <CardHeader
                onClick={() => toggleAccordion(index)}
                style={{
                  padding: "20px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  background: openIndex === index ? "#f1f5f9" : "#ffffff",
                }}
              >
                <CardTitle
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#EB6A4D",
                    margin: 0,
                  }}
                >
                  {faq.question}
                </CardTitle>
                <span
                  style={{
                    fontSize: "24px",
                    color: "#EB6A4D",
                    transform:
                      openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  ▼
                </span>
              </CardHeader>
              <div
                style={{
                  maxHeight: openIndex === index ? "200px" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.3s ease",
                }}
              >
                <CardContent
                  style={{
                    padding: "20px",
                    fontSize: "16px",
                    color: "#4b5e7a",
                    lineHeight: "1.6",
                    background: "#f8fafc",
                  }}
                >
                  {faq.answer}
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
