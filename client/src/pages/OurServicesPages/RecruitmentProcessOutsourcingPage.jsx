import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush, FaStopwatch, FaUserNurse } from "react-icons/fa";
import ConsultationForm from '../../components/ConsultationForm';
import ClientCarousel from "../../components/ClientCarousal";
import HeroSection from "../../components/Services/HeroSection";
import RecruitingProcess from "../../components/Services/RecruitingProcess";
import HowWeHelpSection from "../../components/Services/HowWeHelpSection";
import Highlights from "../../components/Services/Highlights";
import Faqs from "../../components/Services/Faqs";
import './style.css';
import { useEffect } from "react";
import { metaConstants } from "../../utils/metaConstants";

const heroSectionData = {
    subheading: 'ENGAGE WITH THE BEST RPO FIRM',
    heading: 'Our firm uses artificial intelligence to streamline your recruitment process outsourcing needs.',
    list: [
        {
            text: 'Experience with Top Industry Leaders Across Sectors'
        },
        {
            text: 'Trust and Accuracy in Recruitment and Workforce Solutions'
        },
        {
            text: 'Ready to Transform Your Talent Acquisition Strategy'
        },
    ]
}

const section2Data = {
    heading: 'Our RPO Experience, Turning Vision Into Reality.',
    text: 'We take a consultative approach to recruitment process outsourcing, ensuring that we build long-term partnerships that extend beyond the initial hire. We work with businesses of all sizes and across industries to provide end-to-end recruitment solutions. Partnering with us delivers numerous benefits in talent acquisition, including expertise, time-savings, access to a broader talent pool, cost efficiency, faster hiring, and expert support.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Expertise',
        text: 'We bring specialized knowledge in RPO, understanding the specific hiring requirements for various industries. This allows us to effectively manage recruitment processes, ensuring that only the best candidates are shortlisted.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'Outsourcing recruitment to us frees up your team’s time by streamlining the entire hiring process—from sourcing and screening candidates to onboarding. This allows your business to focus on its core operations.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Access to a wider pool of candidates',
        text: 'With an extensive network and candidate database, we can access a wide talent pool, including passive candidates who aren’t actively job-hunting but open to new opportunities, ensuring we find the right fit for your needs.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Reduced hiring costs',
        text: 'By outsourcing the recruitment process, we help reduce your overall hiring costs through a structured pricing model, such as fixed or percentage-based fees. This eliminates hidden costs associated with in-house recruitment.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Faster hiring process',
        text: 'Our established processes, coupled with AI-driven tools, enable us to accelerate the hiring process, from sourcing to placement, helping you onboard top talent faster and more efficiently.',
        icon: <FaStopwatch className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Expert advice and support',
        text: 'We provide strategic advice throughout the hiring journey, offering insights into market trends, salary expectations, and candidate preferences, helping you make informed recruitment decisions.',
        icon: <FaUserNurse className='service-page-s3-item-icon'/>
    },
]


const section4HighlightData = [
    {
        heading: 'E2E',
        text: 'EarlyJobs manages the entire recruitment process end-to-end, becoming your dedicated recruiting team for long-term hiring solutions.'
    },
    {
        heading: 'Focused RPO',
        text: 'With EarlyJobs, client satisfaction is key. We measure success by placements and the positive impact on your finance functions. We are dedicated to exceptional service, seamless recruitment, and meeting your specific needs.'
    },
    {
        heading: 'Limited RPO',
        text: 'EarlyJobs manages the entire recruitment process, focusing on short-term hiring goals while ensuring that your team is equipped with the right talent to drive success.'
    },
    {
        heading: 'Components',
        text: 'EarlyJobs offers dedicated recruiters and scalable resources, manages process and compliance, provides strategic reporting and analysis, and utilizes an Applicant Tracking System.'
    },
]

const servicePageAccordianData = [
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

const RecruitmentProcessOutsourcingPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.recruitmentOutsourcing.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.recruitmentOutsourcing.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.recruitmentOutsourcing.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.recruitmentOutsourcing.description);
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
        <div className="service-page-container">
            <HeroSection heroSectionData={heroSectionData} />
            <HowWeHelpSection section2Data={section2Data} />
            <section className='service-page-s3-con'>
                <RecruitingProcess section3Data={section3Data} />
            </section>
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h2 className="service-page-s4-heading">WELCOME TO OUR Recruitment Process Outsourcing</h2>
                    <p className="service-page-s4-text">
                    Earlyjobs understands the significance of onboarding a set of people as per a recruitment plan and what it takes to make it happen. A number of activities have to happen in harmony with one another, and continuous monitoring is required to ensure that the harmony is maintained, an aspect we emphasize on; being a pioneer among the staffing companies in India.
                        <br />
                        <br />
                        At Earlyjobs, we pride ourselves on being experts in managing the recruitment and placement of talent across various industries. Through our vast network of contacts and deep understanding of the qualifications, skills, and strategies required for success, we can identify and attract the best talent to meet your business needs.
                        <br />
                        <br />
                        Our RPO team focuses on your unique requirements, applying their expertise to manage the entire recruitment process efficiently, from sourcing and screening to onboarding. We ensure that the candidates we select not only meet but exceed your expectations in today’s fast-paced and competitive business landscape.
                    </p>
                    <h2 className="service-page-s4-heading">EarlyJobs HR Advantages</h2>
                    <p className="service-page-s4-text">
                        Matches your compliance requirements fully without taking any short-cuts unlike some other staffing companies in India.
                        <br />
                        <br />
                        A team of expert consultants who have the experience in designing and executing some of the largest RPO programs in India will make sure that the client has a good plan and executes it rigorously.
                        <br /> 
                        <br /> 
                        EarlyJobs HR Team follows standardization and process rigour to ensure that the outcomes are up to your satisfaction levels and that best practices are put in to ensure that. 
                        <br/> 
                        <br/> 
                        Our client’s brand gets strengthened by the experience that the EarlyJobs HR Team delivers to the applicants
                    </p>
                    <h2 className="service-page-s4-heading">Scope of Work</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h1 className="service-page-s4-subheading">Ready to Transform Your Recruitment Process?</h1>
                    <p className="service-page-s4-text">Welcome to EarlyJobs, the leading RPO firm dedicated to streamlining your recruitment process and connecting you with exceptional talent. With an unmatched track record and a strong commitment to excellence, we are here to enhance your hiring strategy and elevate your business to new heights.</p>

                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/Finance-Recruitment-Services.png" draggable={false} alt="it-recruitment-service" className="service-page-s4-image"/>
                    <div className='service-page-s4-consultancy-content'>
                        <div className='service-page-s4-consultancy-heading-con'>
                            <ConsultationForm />
                        </div>
                    </div>
                </div>
            </section>
            <Faqs servicePageAccordianData={servicePageAccordianData} />
            <section className='service-page-s6-con'>
                <ClientCarousel />
            </section>
        </div>
    )
}

export default RecruitmentProcessOutsourcingPage;