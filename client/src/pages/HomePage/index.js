import { Link } from "react-router-dom"
import Cookies from 'js-cookie'
import { Redirect } from "react-router-dom"
import { IoIosArrowDown } from "react-icons/io";
import { IoFlashOutline } from "react-icons/io5";
import { PiChats } from "react-icons/pi";
import { FaSuitcase, FaRegHandshake, FaUserShield, FaUserGraduate } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import {FaCogs} from "react-icons/fa";
import { useState, useEffect } from "react";
import ClientCarousel from "../../components/ClientCarousal"
import ClientReviewCarousel from "../../components/ClientCarousal/ClientReviewCarousal";
import ConsultationForm from "../../components/ConsultationForm";
import './style.css'


const HomePage = () => {

    const logos = [
        { src: '/client_logos/flipkart.png', alt: 'Logo 1' },
        { src: '/client_logos/allsec.png', alt: 'Logo 2' },
        { src: '/client_logos/altrust.png', alt: 'Logo 3' },
        { src: '/client_logos/bb.png', alt: 'Logo 3' },
        { src: '/client_logos/cogent.png', alt: 'Logo 3' },
        { src: '/client_logos/ebixcash.png', alt: 'Logo 3' },
        { src: '/client_logos/ecpl.png', alt: 'Logo 3' },
        { src: '/client_logos/genius.png', alt: 'Logo 3' },
        { src: '/client_logos/hdfc.png', alt: 'Logo 3' },
        { src: '/client_logos/hgs.png', alt: 'Logo 3' },
        { src: '/client_logos/jindl.png', alt: 'Logo 3' },
        { src: '/client_logos/shaadi.png', alt: 'Logo 3' },
        { src: '/client_logos/starhealth.png', alt: 'Logo 3' },
        { src: '/client_logos/taurus.png', alt: 'Logo 3' },
        { src: '/client_logos/tp.png', alt: 'Logo 3' },
        { src: '/client_logos/qpoint1.png', alt: 'Logo 3' },
    ];

    const recruitmentCards = [
        { 
            title: 'Dream Companies', 
            desc: 'Choose from 100+ Companies, Unicorn startups, Top Product Companies and more…', 
            imageUrl: '/future_recruitment_imgs/dream-companies.png' 
        },
        { 
            title: 'Be an EarlyJobs Expert', 
            desc: 'Become an expert in identifying top talent and mastering recruitment strategies', 
            imageUrl: '/future_recruitment_imgs/domain-expert.png' 
        },
        { 
            title: 'Working Flexibility', 
            desc: 'You decide your work station. Spend time with your family, and get a stable work-life balance.', 
            imageUrl: '/future_recruitment_imgs/work-flexibility.png' 
        },
    ];

    const successMetrics = [
        { count: '5K+', desc: 'Successful Recruitment' },
        { count: '100+', desc: 'Clients' },
        { count: '3K+', desc: 'Open Positions' },
        { count: '7+', desc: 'Years in Business' },
        { count: '100+', desc: 'HR Recruiters' },
    ];

    const reviewCards = [
        { 
            name: 'Prabeesh', 
            role: 'HR Manager',
            companyLogo: '/testmonials_imgs/cogent.png', 
            profileImage: '/profile-image.png',
            review: "Partnering with EarlyJobs has been exceptional. They consistently provide top-tier candidates that fit our culture and needs, making our hiring process seamless. EarlyJobs is a trusted extension of our HR team.",
        },
        { 
            name: 'Pawan', 
            role: 'HR Manager',
            companyLogo: '/testmonials_imgs/tp.png', 
            profileImage: '/profile-image.png',
            review: 'EarlyJobs transformed our recruitment process. We now have a reliable stream of qualified candidates, and our time-to-hire has drastically reduced. Their team is professional, responsive, and invested in our success.',
        },
        { 
            name: 'Nikita Kushwaha', 
            role: 'HR Intern',
            companyLogo: '/testmonials_imgs/earlyjobs_logo.png', 
            profileImage: '/profile-image.png',
            review: 'Best place to gain knowledge and experience about HR recruitment with good working environment and excellent team leaders',
        },
        { 
            name: 'Vaishnavi', 
            role: 'HR Manager',
            companyLogo: '/testmonials_imgs/altrust.png', 
            profileImage: '/profile-image.png',
            review: 'Working with EarlyJobs has been outstanding. They consistently deliver high-quality candidates who align perfectly with our culture and requirements, streamlining our hiring process. We consider EarlyJobs a reliable extension of our HR team.',
        },
    ];

    const featuredServices = [
        { 
            title: 'IT Recruitment', 
            desc: 'Your IT Dream Team Awaits – We Recruit Excellence!', 
            icon: <FaCogs className="landing-page-s5-featured-services-item-icon" /> ,
            link: '/it-recruitment'
        },
        { 
            title: 'Finance & Accounting Recruitment', 
            desc: 'Talent Secured: Finance Recruitment Experts.', 
            icon: <FaSuitcase className="landing-page-s5-featured-services-item-icon" />,
            link: '/finance-and-accounting-recruitment'
        },
        { 
            title: 'Sales & Marketig Recruitment', 
            desc: 'Elevate Sales, Ignite Brands: Your Marketing Dream Team.', 
            icon: <FaRegHandshake className="landing-page-s5-featured-services-item-icon" />,
            link: '/sales-marketing-services'
        },
        { 
            title: 'Top Executive Recruitment', 
            desc: 'C-Suite Success: Elevate Leadership with Elite Recruitment.', 
            icon: <FaUserShield className="landing-page-s5-featured-services-item-icon" />,
            link: '/top-executive-recruitment-firm'
        },
        { 
            title: 'Hr & Executive Recruitment', 
            desc: 'HR Excellence, Executive Talent: Your Business, Our Priority.', 
            icon: <FaUserGraduate className="landing-page-s5-featured-services-item-icon" />,
            link: '/hr-executive-recruitment-services'
        },
    ];

    const moneyMatters = [
        { 
            title: 'We are Business Partners!', 
            desc: "Earn  commission on the Candidate's CTC for every successful job placement. The more you work, the more you earn!", 
            imageUrl: '/money_matters/bussiness-partners.png' 
        },
        { 
            title: 'Better Conversion Rate', 
            desc: 'Get Access to 100+ Earlyjobs Clients, share your candidates for multiple roles to increase conversion rate', 
            imageUrl: '/money_matters/conversion-rate.png'
        },
        { 
            title: 'High Earning Potential', 
            desc: "Our recruiters have access to substantial financial rewards. There's a wealth of opportunity waiting to be tapped!", 
            imageUrl: '/money_matters/Earning-Potential.png' 
        },
    ];

    const featuredLogos = [
        { src: '/featured_logos/dailyhunt.png', alt: 'Logo 1' },
        { src: '/featured_logos/gnews.png', alt: 'Logo 2' },
        { src: '/featured_logos/medium.png', alt: 'Logo 3' },
        { src: '/featured_logos/quara.png', alt: 'Logo 4' },
    ]

    const fastReliableTrusted = [
        { 
            icon: <IoFlashOutline className="landing-page-s9-icon" />, 
            heading: 'Fast Hiring', 
            desc: 'Get top vetted profiles <br /> within 24-48 hours' 
        },
        { 
            icon: <PiChats className="landing-page-s9-icon" />, 
            heading: 'Reliable', 
            desc: 'Dedicated Account Manager Just one email/whatsapp away' 
        },
        { 
            icon: <>
                    <GoStarFill size={18} className="landing-page-s9-icon" />
                    <GoStarFill size={18} className="landing-page-s9-icon" />
                    <GoStarFill size={18} className="landing-page-s9-icon" />
                    <GoStarFill size={18} className="landing-page-s9-icon" />
                    <GoStarFill size={18} className="landing-page-s9-icon" />
                  </>, 
            heading: 'Trusted', 
            desc: '4.9 Google'
        },
    ];

    const accordionData = [
        {
            label: 'How does EarlyJobs match candidates with job opportunities?',
            content: 'EarlyJobs uses a combination of advanced algorithms and personalized assessments to match candidates with job opportunities that align with their skills, experience, and career goals. Our team also conducts thorough interviews to ensure a good fit.'
        },
        {
            label: 'What industries does EarlyJobs specialize in?',
            content: 'EarlyJobs specializes in a wide range of industries including technology, BPO, finance, marketing, engineering, and more. Our diverse network allows us to cater to various sectors and provide specialized recruitment services.'
        },
        {
            label: 'What is the process for employers to start working with EarlyJobs?',
            content: 'Employers can start working with EarlyJobs by contacting our team through our website or directly reaching out to our sales department. We will discuss your hiring needs, provide a customized recruitment plan, and begin sourcing and screening candidates.'
        },
        {
            label: 'How does EarlyJobs ensure the quality of candidates?',
            content: 'EarlyJobs ensures the quality of candidates through a rigorous screening process that includes background checks, skills assessments, and in-depth interviews. We also consider cultural fit to ensure candidates will thrive in their new roles.'
        },
        {
            label: 'Is there a fee for candidates to use EarlyJobs services?',
            content: 'No, EarlyJobs does not charge candidates for using our recruitment services. Our fees are covered by the employers seeking to hire through our platform, allowing us to offer our services to job seekers at no cost.'
        },
    ];

    const [activeAccordion, setActiveAccordion] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = "Earlyjobs-India's No.1 Portal for remote HR recruiters | Victaman Enterprises"
    }, [])

    if(Cookies.get('jwt_token') !== undefined) {
        const role = Cookies.get('role')
        if(role === 'ADMIN') {
            return <Redirect to='/admin' />
        } else if(role === 'BDE') {
            return <Redirect to='/bde-portal' />
        } else if(role === 'AC' || role === 'HR' || role === 'SHM') {
            return <Redirect to='/jobs' />
        }
    }

    return(
        <div className="landing-page-container">
            <div className="landing-page-screen-1-container">
                <div className="landing-page-screen-1-sub-con">
                    <div className="landing-page-screen-1-content">
                        <h1 className="landing-page-s1-heading">Empowering Recruiters to Work Remotely and Independent!</h1>
                        <p className="landing-page-s1-desc">Work with Top clients like Flipkart, Bigbasket, HDFC, Shaadi.com,  Teleperformance, Cogent and more! Increase your Earnings by 3X! Flexible working for a healthy Work-Life Balance!</p>
                        <div className="landing-page-screen-1-image-con-mobile">
                            <img src="/recruitment.png" alt="landing-page-1" className="landing-page-s1-image" />
                        </div>
                        <div className="landing-page-screen-1-btn-grp">
                            <Link to="/apply-as-a-recruiter" className="landing-page-s1-link-btn">Become Freelance Recruiter</Link>
                            <Link to="/view-openings" className="landing-page-s1-link-btn-outline landing-page-s1-link-btn">Explore Jobs</Link>
                            <Link to="/free-job-posting" className="landing-page-s1-link-btn-outline landing-page-s1-link-btn">Free Job Posting</Link>
                        </div>
                    </div>
                    <div className="landing-page-screen-1-image-con">
                        <img src="/recruitment.png" alt="landing-page-1" className="landing-page-s1-image" />
                    </div>
                </div>
                <ClientCarousel logos={logos} />
            </div>
            <div className="landing-page-screen-2-container">
                <h2 className="landing-page-s2-heading">Explore the Future of Recruitment</h2>
                <p className="landing-page-s2-desc">An Intelligent Hiring platform - “Powered by Expert Freelance Recruiters”</p>
                <div className="landing-page-s2-card-con">
                    { recruitmentCards.map((card, index) => (
                        <div key={index} className="landing-page-s2-card">
                            <img src={card.imageUrl} alt="landing-page-2" className="landing-page-s2-card-image" />
                            <h3 className="landing-page-s2-card-heading">{card.title}</h3>
                            <p className="landing-page-s2-card-desc">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="landing-page-screen-3-container">
                <div className="landing-page-s3-content">
                    <h1 className="landing-page-s3-heading">OUR SUCCESS</h1>
                    <ul className="landing-page-s3-card-con">
                        { successMetrics.map((metric, index) => (
                            <li key={index} className="landing-page-s3-card">
                                <h3 className="landing-page-s3-card-heading">{metric.count}</h3>
                                <div className="landing-page-s3-card-text-con">
                                    <p className="landing-page-s3-card-text">{metric.desc}</p>
                                    <hr className="landing-page-s3-card-hr" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="landing-page-s3-image-con">
                    <p className="landing-page-s3-image-text">From startups to SMEs to established enterprises, EarlyJobs Recruitment team revolutionizes the way businesses find high-quality talent quickly & effortlessly.</p>
                    <img src="https://hirekey.in/wp-content/uploads/2023/11/Employment-services.png.webp" alt="landing-page-3" className="landing-page-s3-image" />
                </div>
            </div>
            <div className="landing-page-screen-4-container">
                <h2 className="landing-page-s4-heading">Don't Just Take Our Word</h2>
                <p className="landing-page-s4-desc">With a <span className="landing-page-s4-desc-span">Google reviews of 4.9</span>, we drive excellent customer experience and help businesses achieve their goals faster.</p>
                <ClientReviewCarousel reviewCards={reviewCards} />
            </div>
            <div className="landing-page-screen-5-container">
                <div className="landing-page-s5-content">
                    <h1 className="landing-page-s5-heading">One stop solution for companies to hire professional candidates.</h1>
                    <hr className="landing-page-s5-hr" />
                    <p className="landing-page-s5-desc">
                        EarlyJobs is your partner in unlocking your recruitment potential. With our expert guidance and strategic approach, we help businesses improve their recruitment strategies, attract top talent, and build high-performing teams.
                        <br />
                        <br />
                        We can engage in core part of your business by providing you the right talent that matches your requirement, thus helping you build a competitive, committed and a capable team.
                    </p>
                    <a href="tel:+918217527926" className="landing-page-s5-link-btn">Connect With Our Recruiters</a>
                    <img src="https://hirekey.in/wp-content/uploads/2023/11/Headhunting-services.png" alt="landing-page-5" draggable={false} className="landing-page-s5-image" />
                </div>
                <div className="landing-page-s5-featured-services-con">
                    <h2 className="landing-page-s5-featured-services-heading">Featured Services</h2>
                    <ul className="landing-page-s5-featured-services-list">
                        { featuredServices.map((service, index) => (
                            <li className="landing-page-s5-featured-services-item" key={index}>
                                <div className="landing-page-s5-featured-services-item-icon-con">
                                    {service.icon}
                                </div>
                                <div className="landing-page-s5-featured-services-item-text-con">
                                    <a href={service.link} className="landing-page-s5-featured-services-item-heading">{service.title}</a>
                                    <p className="landing-page-s5-featured-services-item-desc">{service.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="landing-page-screen-8-container">
                <h1 className="landing-page-s8-heading">The problem that job platforms cannot solve, EarlyJobs solves</h1>
                <p className="landing-page-s8-desc">No pre and post hiring hustle required, we take care of everything. Want to know more?</p>
                <a href="tel:+918217527926" className="landing-page-s8-btn">Schedule a call</a>
            </div>
            <div className="landing-page-screen-2-container">
                <h2 className="landing-page-s2-heading">MONEY MATTERS</h2>
                <div className="landing-page-s2-card-con">
                    { moneyMatters.map((card, index) => (
                        <div key={index} className="landing-page-s2-card">
                            <img src={card.imageUrl} alt="landing-page-2" className="landing-page-s2-card-image" />
                            <h3 className="landing-page-s2-card-heading">{card.title}</h3>
                            <p className="landing-page-s2-card-desc">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="landing-page-screen-6-container">
                <h2 className="landing-page-s6-heading">We Have been Featured On</h2>
                <div className="landing-page-s6-image-con">
                    { featuredLogos.map((logo, index) => (
                        <img key={index} src={logo.src} alt={logo.alt} draggable={false} className="landing-page-s6-image" />
                    ))}
                </div>
            </div>
            <div className="landing-page-screen-9-container">
                {fastReliableTrusted.map((service, index) => (
                    <div className="landing-page-s9-item" key={index} style={{borderRight: index === 2 ? 'none': '1px solid #1d243414', borderBottom: index === 2 ? 'none!important': '1px solid #1d243414!important'}}>
                        {service.icon}
                        <h3 className="landing-page-s9-heading">{service.heading}</h3>
                        <p className="landing-page-s9-desc" dangerouslySetInnerHTML={{__html: service.desc}}></p>
                    </div>
                ))}
            </div>
            <div className="landing-page-screen-7-container">
                <h1 className="landing-page-s7-heading">FAQs</h1>
                <div className="landing-page-s7-accordion-consultation-con">
                    <div className="landing-page-s7-accordion-con">
                        { accordionData.map((accordion, index) => (
                            <div className="landing-page-s7-accordion-item" key={index}>
                                <div className="landing-page-s7-accordion-item-label-icon-con" onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}>
                                    <h3 className="landing-page-s7-accordion-label">{accordion.label}</h3>
                                    <IoIosArrowDown className={`landing-page-s7-accordion-icon ${activeAccordion === index ? "active" : ""}`} />
                                </div>
                                <div className={`landing-page-s7-accordion-content ${activeAccordion === index ? "active-accordion" : ""}`}>
                                    <p className="landing-page-s7-accordion-content-text">{accordion.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="landing-page-s7-consultation-con">
                        <ConsultationForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage