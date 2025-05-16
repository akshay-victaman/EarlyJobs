// import React, { useEffect } from 'react';
// import { ArrowRight } from 'lucide-react';
// import './Hero.css';
// import { use } from 'react';

// const Hero = () => {
//   const scrollToContact = () => {
//     const contactSection = document.getElementById('contact');
//     if (contactSection) {
//       contactSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

// useEffect(() => {
//   const video = document.querySelector('video');
//   if (video) {
//       video.play();
//   }
// }, []);
//   return (
//     <section className="hero">
//       {/* Orange diagonal shape in background */}
//       <div className="hero-shape"></div>
      
//       <div className="container">
//         <div className="hero-grid">
//           <div className="hero-content">
//             <h1 className="hero-title">
//               Build Your Own <span>Recruitment Business</span> with EarlyJobs
//             </h1>
            
//             <p className="hero-description">
//               Join India's fastest-growing HRTech platform and launch a high-ROI franchise in your city
//             </p>
            
//             <div className="hero-cta">
//               <button 
//                 onClick={scrollToContact}
//                 className="btn-primary"
//               >
//                 Sign Up
//               </button>
//             </div>
            
//             <div className="hero-social">
//               <p className="social-label">AS SEEN IN</p>
//               <div className="social-logos">
//                 <img src="https://i.ibb.co/7JXD3fRn/download.jpg" alt="Business Standard" className="social-logo" />
//                 <img src="https://i.ibb.co/QvQXMT3w/india.png" alt="Franchise India" className="social-logo" />
//                 <img src="https://i.ibb.co/qYHG6R96/download.png" alt="YourStory" className="social-logo" />
//               </div>
              
//               <p className="trusted-label">TRUSTED BY</p>
//               <div className="trusted-logos">
//                 <img src="https://i.ibb.co/LD2ywnR3/download-1.jpg" alt="Flipkart" className="trusted-logo" />
//                 <span className="logo-divider">|</span>
//                 <img src="https://i.ibb.co/hJbMqRN1/download-2.jpg" alt="Star Health" className="trusted-logo" />
//                 <span className="logo-divider">|</span>
//                 <img src="https://i.ibb.co/99YW8pkg/download-1.png" alt="Frankfinn" className="trusted-logo" />
//                 <span className="logo-divider">|</span>
//                 <img src="https://i.ibb.co/991N1K1j/download-2.png" alt="HDFC" className="trusted-logo" />
//               </div>
//             </div>
//           </div>
          
//           <div className="hero-video">
//     <video
//     src="/Dipanjana-mam-video-for-earlyjobs-Linked-Comp.mp4"
//     loop
//     muted={false}
//     playsInline
//     controls
//     />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const videoRef = useRef(null);
  const [playFailed, setPlayFailed] = useState(false);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    // Unmute and play on button click
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch((error) => {
        console.log('Playback failed:', error);
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
        <div className="hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">
              Build Your Own <span>Recruitment Business</span> with EarlyJobs
            </h1>
            <p className="hero-description">
              Join India's fastest-growing HRTech platform and launch a high-ROI franchise in your city
            </p>
            <div className="hero-cta">
              <button onClick={scrollToContact} className="btn-primary">
                Sign Up
              </button>
            </div>
            {playFailed && (
              <p className="play-error">
                Click "Sign Up" or the video to enable sound.
              </p>
            )}
            <div className="hero-social">
              <p className="social-label">AS SEEN IN</p>
              <div className="social-logos">
                <img src="https://i.ibb.co/7JXD3fRn/download.jpg" alt="Business Standard" className="social-logo" />
                <img src="https://i.ibb.co/QvQXMT3w/india.png" alt="Franchise India" className="social-logo" />
                <img src="https://i.ibb.co/qYHG6R96/download.png" alt="YourStory" className="social-logo" />
              </div>
              <p className="trusted-label">TRUSTED BY</p>
              <div className="trusted-logos">
                <img src="https://i.ibb.co/LD2ywnR3/download-1.jpg" alt="Flipkart" className="trusted-logo" />
                <span className="logo-divider">|</span>
                <img src="https://i.ibb.co/hJbMqRN1/download-2.jpg" alt="Star Health" className="trusted-logo" />
                <span className="logo-divider">|</span>
                <img src="https://i.ibb.co/99YW8pkg/download-1.png" alt="Frankfinn" className="trusted-logo" />
                <span className="logo-divider">|</span>
                <img src="https://i.ibb.co/991N1K1j/download-2.png" alt="HDFC" className="trusted-logo" />
              </div>
            </div>
          </div>
          <div className="hero-video">
            <video
              ref={videoRef}
              src="/Dipanjana-mam-video-for-earlyjobs-Linked-Comp.mp4"
              autoPlay
              loop
              playsInline
              controls
              style={{height:"700px"}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;