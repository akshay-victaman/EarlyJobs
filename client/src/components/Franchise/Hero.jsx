// import React, { useEffect, useRef, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import "./Hero.css";

// const Hero = () => {
//   const videoRef = useRef(null);
//   const [playFailed, setPlayFailed] = useState(false);

//   const scrollToContact = () => {
//     const contactSection = document.getElementById("contact");
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: "smooth" });
//     }
//     // Unmute and play on button click
//     if (videoRef.current) {
//       videoRef.current.muted = false;
//       videoRef.current.play().catch((error) => {
//         console.log("Playback failed:", error);
//         setPlayFailed(true);
//       });
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;
//     if (video) {
//       // Attempt unmuted auto-play
//       video.muted = false;
//     }
//   }, []);

//   return (
//     <section className="hero">
//       <div className="hero-shape"></div>
//       <div className="container">
//         <div className="hero-grid">
//           <div className="hero-content">
//             <h1 className="hero-title">
//               Build Your Own <span>Recruitment Business</span> with EarlyJobs
//             </h1>
//             <p className="hero-description">
//               Join India's fastest-growing HRTech platform and launch a high-ROI
//               franchise in your city
//             </p>
//             <div className="hero-cta">
//               <button onClick={scrollToContact} className="btn-primary">
//                 Apply Now
//               </button>
//             </div>
//             {playFailed && (
//               <p className="play-error">
//                 Click "Apply Now" or the video to enable sound.
//               </p>
//             )}
//             <div className="hero-social">
//               <p className="social-label">AS SEEN IN</p>
//               <div className="social-logos">
//                 <img
//                   src="https://i.ibb.co/7JXD3fRn/download.jpg"
//                   alt="Business Standard"
//                   className="social-logo"
//                 />
//                 <img
//                   src="https://i.ibb.co/QvQXMT3w/india.png"
//                   alt="Franchise India"
//                   className="social-logo"
//                 />
//                 <img
//                   src="https://i.ibb.co/qYHG6R96/download.png"
//                   alt="YourStory"
//                   className="social-logo"
//                 />
//               </div>
//               <p className="trusted-label">TRUSTED BY</p>
//               <div className="trusted-logos">
//                 <img
//                   src="https://i.ibb.co/LD2ywnR3/download-1.jpg"
//                   alt="Flipkart"
//                   className="trusted-logo"
//                 />
//                 <span className="logo-divider">|</span>
//                 <img
//                   src="https://i.ibb.co/hJbMqRN1/download-2.jpg"
//                   alt="Star Health"
//                   className="trusted-logo"
//                 />
//                 <span className="logo-divider">|</span>
//                 <img
//                   src="https://i.ibb.co/99YW8pkg/download-1.png"
//                   alt="Frankfinn"
//                   className="trusted-logo"
//                 />
//                 <span className="logo-divider">|</span>
//                 <img
//                   src="https://i.ibb.co/991N1K1j/download-2.png"
//                   alt="HDFC"
//                   className="trusted-logo"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="hero-video">
//             <video
//               ref={videoRef}
//               src="https://res.cloudinary.com/djocenrah/video/upload/v1747413275/Dipanjana_mam_video_for_earlyjobs_Linked_Comp_02_2_1_ykcdbe.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               style={{
//                 height: "750px",
//                 borderRadius: "16px",
//                 objectFit: "cover",
//                 width: "100%",
//                 boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                 // paddingTop: "20px", // Added top padding
//                 marginTop: "20px", // Added top margin for extra spacing
//               }}
//               onLoadedData={(e) => {
//                 e.target
//                   .play()
//                   .catch((err) => console.log("Autoplay failed:", err));
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

// components/PopupModal.tsx

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
// Assuming this is the path to the form component
import "./Hero.css";
import ConsultationForm from "../ConsultationForm";

export const PopupModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="popup-overlay" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="popup-wrapper">
        <div className="popup-container" onClick={(e) => e.stopPropagation()}>
          <div className="popup-close">
            <button onClick={onClose} className="close-button">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="popup-content">
            {title && <h2 className="popup-title">{title}</h2>}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const Hero = () => {
  const videoRef = useRef(null);
  const [playFailed, setPlayFailed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control pop-up visibility

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleApplyNow = () => {
    togglePopup(); // Open the pop-up form
    // Unmute and play the video on button click
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch((error) => {
        console.log("Playback failed:", error);
        setPlayFailed(true);
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Attempt unmuted auto-play
      video.muted = false;
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-shape"></div>
      <div className="container">
        <div className="hero-grid" style={{ display: "flex", flexDirection: "row", alignItems: "start" , width: "100%" , justifyContent: "space-around"}}> 
          <div className="hero-content" style={{width:"39vw"}}>
            <h1 className="hero-title">
              Build Your Own <span>Recruitment Business</span> with EarlyJobs
            </h1>
            <p className="hero-description">
              Join India's fastest-growing HRTech platform and launch a high-ROI
              franchise in your city
            </p>
            <div className="hero-cta">
              <button onClick={handleApplyNow} className="btn-primary">
                Apply Now
              </button>
            </div>
            {playFailed && (
              <p className="play-error">
                Click "Apply Now" or the video to enable sound.
              </p>
            )}
            <div className="hero-social">
              <p className="social-label">AS SEEN IN</p>
              <div className="social-logos-row">
                <div className="social-logos">
                  <img
                    src="https://i.ibb.co/7JXD3fRn/download.jpg"
                    alt="Business Standard"
                    className="social-logo"
                  />
                  <img
                    src="https://i.ibb.co/QvQXMT3w/india.png"
                    alt="Franchise India"
                    className="social-logo"
                  />
                </div>
                <div className="social-logos">
                  <img
                    src="https://i.ibb.co/qYHG6R96/download.png"
                    alt="YourStory"
                    className="social-logo"
                  />
                  {/* Add more if needed */}
                </div>
              </div>
              <p className="trusted-label">TRUSTED BY</p>
              <div className="trusted-logos-row">
                <div className="trusted-logos">
                  <img
                    src="https://i.ibb.co/LD2ywnR3/download-1.jpg"
                    alt="Flipkart"
                    className="trusted-logo"
                  />
                  <span className="logo-divider">|</span>
                  <img
                    src="https://i.ibb.co/hJbMqRN1/download-2.jpg"
                    alt="Star Health"
                    className="trusted-logo"
                  />
                </div>
                <div className="trusted-logos">
                  <img
                    src="https://i.ibb.co/99YW8pkg/download-1.png"
                    alt="Frankfinn"
                    className="trusted-logo"
                  />
                  <span className="logo-divider">|</span>
                  <img
                    src="https://i.ibb.co/991N1K1j/download-2.png"
                    alt="HDFC"
                    className="trusted-logo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hero-video" style={{width:"50vw" , paddingRight:"57px"}}>
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/ddzdpsj6i/video/upload/v1750077777/IMG_1783_22_g0tifc.mp4"
              autoPlay
              loop
              unmuted
              playsInline
              style={{
                height: "529px",
                width:"59%",
                borderRadius: "16px",
                marginLeft: "37px",
                objectFit: "cover",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                marginTop: "20px",
              }}
              onLoadedData={(e) => {
                e.target
                  .play()
                  .catch((err) => console.log("Autoplay failed:", err));
              }}
            />
          </div>
        </div>
      </div>

      {/* Pop-up Overlay and Form */}
      <PopupModal
        isOpen={isPopupOpen}
        onClose={togglePopup}
        title="Apply for EarlyJobs Franchise"
      >
        <ConsultationForm isFranchise={true} />
      </PopupModal>
    </section>
  );
};

export default Hero;
