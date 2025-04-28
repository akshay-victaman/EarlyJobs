import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const PressReleasePage = () => {
  const pressReleases = [
    {
      id: 1,
      title:
        "EarlyJobs secures Rs 1.2 crore seed funding to revolutionise India's recruitment ecosystem",
      date: "April 2024 • Indian Startup News",
      content:
        "EarlyJobs, the tech-enabled recruitment platform that combines AI with a network of freelance recruiters, announced today it has raised Rs 1.2 crore in seed funding. The round was led by Power Tech Enterprises, with additional investment from Mr. N J Jacob.",
      imageUrl:
        "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/indianstartupnews/media/media_files/2025/04/28/fWDpSJUh6YN45WyndThB.png",
      link: "https://indianstartupnews.com/news/earlyjobs-secures-rs-1-2-crore-seed-funding-to-revolutionise-indias-recruitment-ecosystem-/",
    },
    {
      id: 2,
      title: "EarlyJobs Raises Rs 1.2 Cr Seed Funding to Transform Recruitment",
      date: "April 2024 • BW Disrupt",
      content:
        "EarlyJobs, a tech-enabled recruitment platform that blends artificial intelligence with a network of freelance recruiters, has secured Rs 1.2 crore in seed funding. The round was led by Power Tech Enterprises, with participation from angel investor N J Jacob.",
      imageUrl:
        "https://static.businessworld.in/1536207001_IGVVWr_rupee_rise.jpg",
      link: "https://www.bwdisrupt.com/article/earlyjobs-raises-rs-12-cr-seed-funding-555070",
    },

    {
      id: 3,
      title: "EarlyJobs Raises Rs 1.2 Crore In Seed Funding Round",
      date: "April 2024 • Viestories",
      content:
        "This funding strengthens EarlyJobs’ position as a growing player in India's fast-growing recruitment market. With operations already in 150+ cities, the company plans to use the funds to further develop its AI-based hiring platform.",
      imageUrl:
        "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/viestories/media/media_files/2025/04/28/kgejSRO2AYoPEDsYeJfi.png",
      link: "https://viestories.com/funding-alert/earlyjobs-raises-rs-12-crore-in-seed-funding-round-9010463",
    },
    {
      id: 4,
      title:
        "EarlyJobs Funding: रिक्रूटमेंट स्टार्टअप ने जुटाई ₹1.2 करोड़ की सीड फंडिंग, महिलाओं पर खास फोकस",
      date: "April 2024 • Zee Business",
      content:
        "रिक्रूटमेंट प्लेटफॉर्म EarlyJobs ने हाल ही में 1.2 करोड़ रुपये की फंडिंग उठाई है. यह पैसे सीड फंडिंग राउंड के तहत जुटाए गए हैं. इस फंडिंग राउंड का नेतृत्व Power Tech Enterprises ने किया, जिसमें एंजेल इन्वेस्टर एन जे जैकब ने भी हिस्सा लिया.",
      imageUrl:
        "https://cdn.zeebiz.com/hindi/sites/default/files/2025/04/28/221982-funding-vc.jpg?im=FitAndFill=(1200,900)",
      link: "https://www.zeebiz.com/hindi/small-business/earlyjobs-seed-funding-1-2-crore-recruitment-startup-211861/amp",
    },
    {
      id: 4,
      title: "EarlyJobs Raises Rs1.2 Crore to Disrupt Recruitment in India",
      date: "April 2024 • Startup Siliconindia",
      content:
        "EarlyJobs, a technology-driven job search platform that uses AI through a multitude of freelance recruiters, has made known their accomplishment of over Rs1.2 crore in angel funding. The leading investor in the funding was Power Tech Enterprises followed by the participation from an individual investor, Mr. N J Jacob.",
      imageUrl:
        "https://www.siliconindia.com/images/simag_images/uploaded_images/newstransfer/tbvp4.funding.jpg",

      link: "https://startup.siliconindia.com/startup-funding/earlyjobs-raises-rs12-crore-to-disrupt-recruitment-in-india-nwid-49201.html",
    },
    // Add more press releases here
  ];

  return (
    <>
      <div className="press-release-header">
        <div className="press-release-header-content">
          <h1>Press Release</h1>
          <p>
            Stay updated with the latest news and announcements from EarlyJobs
          </p>
        </div>
      </div>
      <div className="press-release-container">
        <div className="press-releases-grid">
          {pressReleases.map((press) => (
            <div key={press.id} className="press-release-card">
              {press.imageUrl && (
                <div className="press-image-container">
                  <img src={press.imageUrl} alt={press.title} />
                </div>
              )}
              <div className="press-content">
                <h2>{press.title}</h2>
                <p className="press-date">{press.date}</p>
                <p className="press-text">{press.content}</p>
                <a
                  href={press.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PressReleasePage;
