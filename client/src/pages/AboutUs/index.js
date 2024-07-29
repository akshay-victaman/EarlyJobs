import React, { useEffect } from 'react'
import { FaLinkedin } from "react-icons/fa";
import './style.css'

const AboutUs = () => {

    const curlturalFit = [
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
        document.title = 'About Us | EarlyJobs'
    }, [])

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-page__background">
                <h1 className='privacy-policy-heading'>About Us</h1>
            </div>

            <div className="privacy-policy-page__content">
                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>EarlyJobs, is an innovative venture spearheaded by Victaman Services Pvt. Ltd., offers a unique platform tailored for freelance recruiters to operate from anywhere, harnessing the power of remote work. Moreover, it doubles up as a valuable resource hub catering to students enrolled in degree or MBA programs, providing them with extensive training opportunities and avenues for internships.</h3>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>EarlyJobs extends its benefits to three distinct groups:</h3>
                    <ol className='privacy-policy-list'>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>1. </span> Existing recruiters employed in companies can leverage their free time by tapping into freelance opportunities on the platform.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>2. </span> Individuals seeking remote work as recruiters can find ample opportunities to work from the comfort of their homes.</li>
                        <li className='privacy-policy-item'><span className='privacy-policy-item-span'>3. </span> Aspiring professionals eager to gain hands-on experience in recruitment can explore internship options tailored to their career aspirations on EarlyJobs.</li>
                    </ol>
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

                <div className='about-us-curtural-fit-container'>
                    <h1 className='about-us-curtural-fit-heading'>Cultural Fit Between Candidates and Organizations</h1>
                    <hr className='about-us-curtural-fit-hr' />
                    <ul className='about-us-curtural-fit-list'>
                        {curlturalFit.map((item, index) => (
                        <li key={index} className='about-us-curtural-fit-item'>
                            {item.heading1 && <h3 className='about-us-curtural-fit-subheading'>{item.heading1}</h3>}
                            {item.para1 && <p className='about-us-curtural-fit-para'>{item.para1}</p>}
                            <img src={item.img} draggable={false} alt="Cultural Fit Between Candidates and Organizations" className='about-us-curtural-fit-img' />
                            <h3 className='about-us-curtural-fit-subheading'>{item.heading2}</h3>
                            <p className='about-us-curtural-fit-para'>{item.para2}</p>
                        </li>
                        ))}
                    </ul>
                </div>

                <div className='privacy-policy-content-sub'>
                    <h3 className='privacy-policy-subheading'>The Story behind Earlyjobs</h3>
                    <div className='privacy-policy-founder'>
                        
                        <ul className='privacy-policy-list founder-content'>
                            <li className='privacy-policy-item'>For years, <span className='strong-text'>Mr. Ravi</span> had been a stalwart in the recruitment industry, running his agency with dedication and precision. Yet, amidst the hustle and bustle of corporate corridors, he couldn't shake off the persistent thought of those left behind – the countless youths scattered across the country, yearning for opportunities in the field of recruitment.</li>
                            <li className='privacy-policy-item'>Their voices echoed in his mind as he pondered over the glaring gap between talent and opportunity. Mr. Ravi witnessed the fervor in these young souls, eager to carve their paths in the world of recruitment, but lacking the avenues to do so. Simultaneously, he couldn't ignore the wave of students clamoring for internships, their hunger for real-world experience palpable.</li>
                            <li className='privacy-policy-item'>Fueled by empathy and driven by a sense of responsibility, Mr. Ravi embarked on a journey of innovation. He envisioned a solution that would not only bridge the chasm between aspiration and achievement but would also redefine the very essence of recruitment itself. Thus, <span className='strong-text'>EarlyJobs was conceived – a portal where dreams intersected with possibilities.</span></li>
                            <li className='privacy-policy-item'>With each line of code and every strategic decision, Mr. Ravi infused EarlyJobs with his unwavering commitment to empowerment. The platform became a beacon of hope for countless youths across the nation, offering them the chance to step into the realm of recruitment as freelance recruiters, irrespective of their geographical location.</li>
                            <li className='privacy-policy-item'>Simultaneously, EarlyJobs opened its doors to students hungry for knowledge and experience, providing them with internships that transcended boundaries and limitations. Remote work became the norm, and flexibility became synonymous with success.</li>
                            <li className='privacy-policy-item'>Today, as the sun rises on EarlyJobs, its impact reverberates far and wide. Over a hundred youths have found solace and opportunity within its virtual corridors, carving their paths as freelance recruiters or diving headfirst into transformative internships. And as Mr. Ravi looks upon the fruits of his labor, <span className='strong-text'>he knows that EarlyJobs isn't just a portal – it's a testament to the power of empathy, innovation, and the relentless pursuit of a better tomorrow.</span></li>
                        </ul>
                        <div className='privacy-policy-image-con'>
                            <img src="/founder-image.jpg" alt="EarlyJobs Founder Ravi" className='privacy-policy-founder-image' />
                            <p className='privacy-policy-founder-name'>Mr. Ravi Prakash Kumar</p>
                            <p className='privacy-policy-founder-title'>Founder, EarlyJobs</p>
                            <a href="https://www.linkedin.com/in/raviprakashkumar/" target="_blank" rel="noreferrer" className='privacy-policy-founder-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs