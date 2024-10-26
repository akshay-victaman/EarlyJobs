import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush, FaStar } from "react-icons/fa";
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
    subheading: 'STRENGTHENING YOUR LEADERSHIP PIPELINE',
    heading: 'We serves as a networking bridge between job searchers and hiring organizations in numerous industries',
    list: [
        {
            text: 'Proven track record of C-level professionals hirings'
        },
        {
            text: '300+ leading businesses trust us for getting the top executives hirings'
        },
        {
            text: 'Tailored to the specific needs of each client and the seniority of the role'
        },
    ]
}

const section2Data = {
    heading: 'Hire the Top Executive Recruitment’ talent that propels your organization to new heights',
    text: 'Earlyjobs specializes in top executive hiring for a wide range of industries. While their expertise extends to multiple industries, they may have varying degrees of specialization and experience in different sectors. Some of the industries that Earlyjobs commonly works with for top executive roles like CEO, COO, CFO, CTO, and CMO include:',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Technology and IT',
        text: 'Earlyjobs has extensive experience in recruiting top executives for technology companies, including Chief Technology Officers (CTOs) and Chief Information Officers (CIOs).',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Finance and Banking',
        text: 'They have expertise in sourcing and placing top-level executives, such as Chief Financial Officers (CFOs), within the finance and banking sectors.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Healthcare and Life Sciences',
        text: 'Earlyjobs has a strong track record of recruiting executives for healthcare organizations, including CEOs, COOs, and other senior-level roles within the healthcare and life sciences industry.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Retail and Consumer Goods',
        text: 'They excel in sourcing top executives for retail and consumer goods companies, including Chief Marketing Officers (CMOs) who can drive the marketing and brand strategies for these organizations.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Manufacturing and Industrial',
        text: 'Earlyjobs has experience in executive recruitment within the manufacturing and industrial sectors, including roles like CEOs, COOs, and CFOs specializing in these industries.',
        icon: <FaStar className='service-page-s3-item-icon'/>
    },
]

const section4Highlight1Data = [
    {
        heading: 'Leadership and experience',
        text: 'Top executives often come with years of industry experience and have a proven leadership track record. Their expertise can help guide the company towards its goals and make sound decisions.'
    },
    {
        heading: 'Strategic vision',
        text: "Executives at the top level are responsible for setting the company's strategic direction. They can bring fresh perspectives and ideas, which can lead to innovation and growth."
    },
    {
        heading: 'Strong networks and industry connections',
        text: 'Experienced executives often have extensive professional networks and connections within the industry. These networks can open doors to new opportunities, partnerships, and collaborations for the company.'
    },
    {
        heading: 'Improved performance and efficiency',
        text: 'Top executives with a successful track record can drive improved performance and efficiency within the organization. They have the skills to analyze and optimize business processes, identify areas for improvement, and implement effective strategies.'
    },
    {
        heading: 'Risk management and crisis handling',
        text: 'Executives at the highest levels are equipped to handle crises and mitigate risks effectively. Their experience and strategic thinking enable them to make tough decisions and navigate challenging situations.'
    }
]

const section4Highlight2Data = [
    {
        heading: 'Client consultation',
        text: 'Earlyjobs initiates the process by having in-depth discussions with the client to understand their executive hiring needs, organizational culture, and specific requirements for the role.'
    },
    {
        heading: 'Position definition',
        text: "Based on the client consultation, Earlyjobs works closely with the client to establish a detailed position profile. This includes outlining the responsibilities, qualifications, desired attributes, and goals for the executive role."
    },
    {
        heading: 'Candidate search and sourcing',
        text: 'Earlyjobs utilizes their extensive network, industry connections, and targeted searches to identify and source potential executive candidates. They may employ various approaches, such as direct contact, networking, and referrals.'
    },
    {
        heading: 'Candidate assessment',
        text: 'Once potential candidates are identified, Earlyjobs conducts thorough assessments to evaluate their qualifications, experience, leadership abilities, cultural fit, and potential for success in the executive role. These assessments may include interviews, psychometric evaluations, reference checks, and sometimes even executive-level simulations or assessments.'
    },
    {
        heading: 'Presentation of candidate shortlist',
        text: 'Earlyjobs presents a shortlist of well-qualified candidates to the client, providing comprehensive profiles and evaluations for each candidate. They facilitate discussions and assist in the interview process.'
    },
    {
        heading: 'Evaluation and selection',
        text: 'After the client conducts interviews and evaluates the shortlisted candidates, Earlyjobs supports the client in making an informed selection. They provide guidance, address any concerns, and facilitate the decision-making process.'
    },
    {
        heading: 'Offer and negotiation',
        text: 'Earlyjobs assists in extending an offer to the selected candidate and supports the negotiation process, ensuring a mutually beneficial agreement.'
    },
    {
        heading: 'Onboarding and integration',
        text: 'Following the successful acceptance of an offer, Earlyjobs can provide support and guidance to the selected executive during the onboarding and integration process, ensuring a smooth transition into the new role and organization.'
    }
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

const TopExecutiveServicePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.topExecutiveRecruitment.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.topExecutiveRecruitment.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.topExecutiveRecruitment.keywords);
        }

        return () => {
            document.title = metaConstants.title
            if (metaDescription) {
                metaDescription.setAttribute('content', metaConstants.description); // Replace with the original content if needed
            }
            if (metaKeywords) {
                metaKeywords.setAttribute('content', metaConstants.keywords);
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
                    <h1 className="service-page-s4-subheading">Top Executive Recruitment Experts</h1>
                    <p className="service-page-s4-text">
                        Welcome to Earlyjobs, the leading executive recruitment firm specializing in connecting exceptional talent with organizations dignified for greatness. With an unparalleled track record and an strong commitment to excellence, we, the best placement consultancy are here to transform your executive hiring process and elevate your business to new heights.
                        <br />
                        <br />
                        Are you searching for best Placement consultancy services to lead your business towards success? Look no further! Our placement consultancy and services specializes in sourcing and placing highly skilled C-suite executives, including Chief Financial Officers (CFOs), Chief Executive Officers (CEOs), Chief Operating Officers (COOs), and Chief Information Officers (CIOs).
                    </p>
                    <h2 className="service-page-s4-heading">BENEFITS OF PARTNERING WITH OUR TOP EXECUTIVE RECRUITMENT FIRM</h2>
                    <p className="service-page-s4-text">With our expertise and extensive network, we can help you find the perfect executive candidates to drive your business to new heights. You can explore us to know the benefits of partnering with our top executive recruitment firm, Why do you choose us, What process we follow and more.</p>
                    <Highlights section4HighlightData={section4Highlight1Data} />
                    <p className="service-page-s4-text">As for the benefits offered by Earlyjobs specifically, it would be best to directly contact for information regarding our unique value proposition and how they can help meet your specific hiring needs.</p>
                    <h2 className="service-page-s4-heading">PROCESS FOR EXECUTIVE HIRING</h2>
                    <p className="service-page-s4-text">The process for executive hiring at Earlyjobs typically involves the following steps:</p>
                    <Highlights section4HighlightData={section4Highlight2Data} />
                    <p className="service-page-s4-text">It’s important to note that the executive hiring process may be tailored to the specific needs of each client and the seniority of the role. Earlyjobs strives to provide a customized and comprehensive approach to executive hiring that aligns with each client’s requirements.</p>
                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/top-executive-recruitment-firm.webp" draggable={false} alt="it-recruitment-service" className="service-page-s4-image"/>
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

export default TopExecutiveServicePage;