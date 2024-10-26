import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush } from "react-icons/fa";
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
    subheading: 'HIRE THE TOP GLOBAL IT TALENT',
    heading: 'Success begins with our strategic IT consulting, We bring innovation to your doorsteps',
    list: [
        {
            text: 'IT Consultants Are Specialized'
        },
        {
            text: 'Cost-Effectiveness of Technology Consulting'
        },
        {
            text: 'You No Longer Have to Manage Your IT Department Hiring Directly'
        },
    ]
}

const section2Data = {
    heading: 'IT Talents Recruitment Made Easier',
    text: 'Through our IT placement consultancy, we provide exceptional hiring solutions encompassing a wide range of services. With over several years of hiring experience, our recruitment consultants are well-equipped to connect you with the most suitable candidates. Count on Earlyjobs staffing solutions and rigorous screening procedures to acquire invaluable assets that will significantly contribute to your organization’s success.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Domain Specific Talent',
        text: 'We specialize in impactful IT recruitment, matching businesses with candidates who create lasting results across diverse industries.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'Recruitment agencies save time and find ideal candidates, making "time is money" more relevant than ever for businesses.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Employee Stability',
        text: 'Our IT recruitment services align candidates precisely with business requirements, resulting in longer tenures compared to traditional hiring.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Replacement Commitment',
        text: 'Being the foremost IT recruitment agency, our unwavering commitment is to provide our clients with highly skilled IT professionals candidates with replacement guarantee.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
]

const section4HighlightData = [
    {
        heading: 'Access to specialized expertise and guidance',
        text: 'IT job consultancies have a deep understanding of the IT industry and the specific skills and qualifications required for different IT roles. They can provide valuable insights and expertise in identifying and assessing suitable candidates for IT positions. They can provide insights into the current job market, salary benchmarks, and trends in the IT industry. They also help companies in creating effective job descriptions, conducting salary negotiations, and making informed hiring decisions.'
    },
    {
        heading: 'Time and cost savings',
        text: 'Hiring for IT positions can be a time-consuming and costly process. Job consultancies can help streamline the hiring process by sourcing and shortlisting qualified candidates, conducting initial assessments, and handling administrative tasks. This saves companies time and resources in the hiring process.'
    },
    {
        heading: 'Extensive network and database',
        text: 'IT job consultancies have access to a wide network of qualified IT professionals. They have a database of potential candidates and can tap into their network to find suitable candidates for specific IT roles. This saves companies the effort of searching for qualified candidates on their own.'
    },
    {
        heading: 'Reduced risk of hiring mistakes',
        text: "IT job consultancies have expertise in assessing candidates skills, qualifications, and experience in IT profiles. They conduct thorough screening and interviews to ensure that only the most suitable candidates are shortlisted for job openings. This reduces the risk of hiring mistakes and increases the chances of finding the right candidate for the role."
    },
    {
        heading: 'Support during the on-boarding process',
        text: 'IT job consultancies provide support during the onboarding process, ensuring a smooth transition for the selected candidate. They assist with paperwork, background checks, and coordination with HR departments, ensuring that the new IT professional can seamlessly integrate into the company. This helps companies in minimizing disruptions and maximizing productivity.'
    },
    {
        heading: "Understanding the company's needs and requirements",
        text: 'A job consultancy specializes in understanding the specific needs and requirements of IT companies when it comes to hiring IT professionals. They work closely with companies to identify the skills and qualifications necessary for different IT roles within the organization.'
    },
    {
        heading: 'Sourcing the right candidates',
        text: 'Job consultancies have extensive networks and databases of qualified IT professionals. They use their resources to source the right candidates for IT positions in companies. This includes reaching out to their network, advertising job openings, and conducting thorough screening and interviews to shortlist the most suitable candidates.'
    },
    {
        heading: 'Assessing candidates skills and qualifications',
        text: "IT job consultancies have expertise in assessing candidates' skills, qualifications, and experience in IT recruitment services. They conduct technical assessments, review resumes and portfolios, and conduct interviews to evaluate candidates' abilities and match them with suitable job openings."
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

const ITRecruitmentServicePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.itRecruitment.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.itRecruitment.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.itRecruitment.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.itRecruitment.description);
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
                    <h2 className="service-page-s4-heading">WELCOME TO EARLYJOBS CONSULTANCY - YOUR IT RECRUITMENT PARTNER</h2>
                    <p className="service-page-s4-text">Are you searching for top talent in the world of Information Technology? Look no further than Earlyjobs, your trusted partner for IT recruitment solutions.</p>
                    <h1 className="service-page-s4-subheading">Our Expertise</h1>
                    <p className="service-page-s4-text">At Earlyjobs, we specialize in identifying and connecting your business with the best IT professionals available. With years of experience in the IT recruitment industry, our team of experts possesses a deep understanding of the evolving tech landscape. We are well-equipped to find the right candidates for your organization, whether you’re seeking developers, engineers, project managers, or IT support staff.</p>
                    <h1 className="service-page-s4-subheading">Tailored IT Recruitment Solutions</h1>
                    <p className="service-page-s4-text">We understand that every organization is unique, and your IT recruitment services needs are no exception. That’s why we offer tailored recruitment solutions to match your company’s culture, values, and objectives. Our consultants work closely with you to create customized recruitment strategies that ensure a perfect fit between your business and the candidates we present.</p>
                    <h2 className="service-page-s4-heading">KEY HIGHLIGHTS OF CHOOSE OUR IT RECRUITMENT SERVICES.</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h1 className="service-page-s4-subheading">Let's Work Together</h1>
                    <p className="service-page-s4-text">Partner with EarlyJobs for your IT recruitment services needs, and let us help you build a dynamic and high-performing IT team that drives your business forward. Contact us today to discuss your requirements and take the first step towards a brighter IT future.</p>
                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/it-recruitment-services.webp" draggable={false} alt="it-recruitment-service" className="service-page-s4-image"/>
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

export default ITRecruitmentServicePage;