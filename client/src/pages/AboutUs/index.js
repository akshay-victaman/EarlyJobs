import React, { useEffect } from 'react'
import { FaLinkedin } from "react-icons/fa";
import './style.css'
import { metaConstants } from '../../utils/metaConstants';

const AboutUs = () => {

    const culturalFit = [
        {
            heading1: 'Deep understanding of organizational culture:',
            para1: 'We work closely with our clients to gain a comprehensive understanding of their organizational culture. By having in-depth discussions, conducting site visits, and studying their values, mission, and work environment, we develop a clear picture of the organization’s culture.',
            img: '/about_us_imgs/img1.png',
            heading2: 'Cultural assessments and psychometric evaluations:',
            para2: 'In certain cases, we may conduct cultural assessments and psychometric evaluations to gain a deeper understanding of candidates’ personality traits, work styles, and values. This information can be compared to the organization’s cultural framework to evaluate potential alignment.', 
        },
        {
            img: '/about_us_imgs/img2.png',
            heading2: 'Position profiling and alignment:',
            para2: 'We create detailed position profiles that not only outline the required skills and qualifications but also highlight the cultural attributes that are important for success in the role. This helps us in sourcing candidates who not only possess the necessary qualifications but also align well with the organization’s cultural values.', 
        },
        {
            heading1: 'Behavioral and situational interviews:',
            para1: 'During the candidate assessment phase, we conduct behavioral and situational interviews. These interviews include questions that assess how candidates have demonstrated behaviors that align with the organization’s culture in their previous roles. By analyzing their past behavior and responses, we can gauge their potential cultural fit.',
            img: '/about_us_imgs/img3.png',
            heading2: 'Company immersion and site visits:',
            para2: 'For final-stage candidates, we may organize company immersion sessions or site visits, where they have the opportunity to experience the organization’s culture firsthand. This interaction allows candidates to assess if the organization’s culture aligns with their own values and vice versa.', 
        },
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.about.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.about.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.about.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.about.description);
        }

        return () => {
            document.title = metaConstants.title
            if (metaDescription) {
                metaDescription.setAttribute('content', metaConstants.description); // Replace with the original content if needed
            }
            if (metaKeywords) {
                metaKeywords.setAttribute('content', metaConstants.keywords);
            }
            if (metaSubject) {
                metaSubject.setAttribute('content', metaConstants.description);
            }
        };
    }, [])

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-page__background">
                <h1 className='privacy-policy-heading'>About Us</h1>
            </div>

            <div className="privacy-policy-page__content">
                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>EarlyJobs is an innovative platform designed to provide freelance and aspiring recruiters the flexibility to work from anywhere, leveraging the benefits of remote work.                    </h3>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>EarlyJobs extends its benefits to five distinct groups:</h3>
                    <ol className='privacy-policy-list'>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>1. </span> Individuals seeking remote work as recruiters can find ample scope to work from the comfort of their homes.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>2. </span> Aspiring professionals eager to gain hands-on experience in recruitment can explore internship options tailored to their career aspirations on Earlyjobs.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>3. </span> Recruiters employed in companies can leverage their spare time by tapping into freelance opportunities on this platform.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>4. </span> This platform offers opportunities to college/university for in-campus Internship in recruitment.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>5. </span> It also provides franchise opportunities to people who want to begin/set up  their recruitment agency in any part of India</li>
                    </ol>
                </div>

                {/* <div className='about-us-curtural-fit-container'>
                    <h1 className='about-us-curtural-fit-heading'>Cultural Fit Between Candidates and Organizations</h1>
                    <hr className='about-us-curtural-fit-hr' />
                    <ul className='about-us-curtural-fit-list'>
                        {culturalFit.map((item, index) => (
                        <li key={index} className='about-us-curtural-fit-item'>
                            {item.heading1 && <h3 className='about-us-curtural-fit-subheading'>{item.heading1}</h3>}
                            {item.para1 && <p className='about-us-curtural-fit-para'>{item.para1}</p>}
                            <img src={item.img} draggable={false} alt="Cultural Fit Between Candidates and Organizations" className='about-us-curtural-fit-img' />
                            <h3 className='about-us-curtural-fit-subheading'>{item.heading2}</h3>
                            <p className='about-us-curtural-fit-para'>{item.para2}</p>
                        </li>
                        ))}
                    </ul>
                </div> */}

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading' style={{marginTop: '15px'}}>The Story behind Earlyjobs</h3>
                    <div className='privacy-policy-founder'>
                        
                        <ul className='privacy-policy-list founder-content'>
                            <li className='privacy-policy-item'>For years, <span className='strong-text'>Mr. Ravi</span> had been a prominent figure in the recruitment industry, running his agency with dedication and precision. Yet, amidst the hustle and bustle of corporate corridors, he couldn't shake off the persistent thought of those left behind – the countless youths scattered across the country, yearning for opportunities in the field of recruitment.</li>
                            <li className='privacy-policy-item'>Their voices echoed in his mind as he pondered over the glaring gap between talent and opportunity. Mr. Ravi couldn't ignore the wave of students clamoring for internships as well as the potential recruiters yearning for remote work  opportunities.</li>
                            <li className='privacy-policy-item'>Fueled by empathy and driven by a sense of responsibility, Mr. Ravi embarked on a journey of innovation. He envisioned a solution that would not only bridge the chasm between aspiration and achievement but would also redefine the very essence of recruitment itself. Thus, <span className='strong-text'>Earlyjobs was conceived – a portal where dreams intersected with possibilities.</span></li>
                            <li className='privacy-policy-item'>The platform became a beacon of hope for experienced recruiters as well as countless youths across the nation, offering them the chance to step into the world of recruitment irrespective of their geographical location.</li>
                            <li className='privacy-policy-item'>In short, EarlyJobs is <span className='strong-text-gray'>revolutionizing recruitment with flexible remote work solutions and nurturing the next generation through internships.</span></li>
                            <li className='privacy-policy-item'>At Earlyjobs we empower women recruiters as well as aspiring recruiters to utilise their versatility and work from home regardless of the geographical boundaries. <span className='strong-text-gray'>Earlyjobs has a track of an impressive clientele and is already creating ripples in the Indian job sector</span> <span className='strong-text'>Earlyjobs isn't just a portal – it's a testament to the power of empathy, innovation, and the relentless pursuit of a better tomorrow.</span></li>
                        </ul>
                        <div className='privacy-policy-image-con'>
                            <img src="/founder-image.jpg" alt="EarlyJobs Founder Ravi" className='privacy-policy-founder-image' />
                            <p className='privacy-policy-founder-name'>Mr. Ravi Prakash Kumar</p>
                            <p className='privacy-policy-founder-title'>Founder, EarlyJobs</p>
                            <a href="https://www.linkedin.com/in/raviprakashkumar/" target="_blank" rel="noreferrer" className='privacy-policy-founder-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                        </div>
                    </div>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Mission</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>The mission of EarlyJobs is to empower individuals and organizations by providing a dynamic platform that bridges the gap between talent and opportunity. We aim to revolutionize the way recruitment is approached, offering flexibility for recruiters, fostering a culture of remote work, and nurturing the next generation of talent through internships.</li>
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>Vision</h3>
                    <ul className='privacy-policy-list'>
                        <li className='privacy-policy-item'>Our vision at EarlyJobs is to be the foremost global platform, seamlessly connecting talent with opportunities. We envision a future where recruitment is agile, remote work is prevalent, and talent development is prioritized. Through innovation and inclusivity, we aspire to redefine the dynamics of the professional world.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AboutUs