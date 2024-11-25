import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush } from "react-icons/fa";
import React from 'react';
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
    subheading: 'YOUR PATH TO EXCEPTIONAL TALENT',
    heading: 'We stands as a trusted partner in navigating the intricacies of hiring within the dynamic sales and marketing industry.',
    list: [
        {
            text: '10K+ Readily Available Candidates for Sales & Marketing jobs'
        },
        {
            text: 'Massive Network Structure to find candidates'
        },
        {
            text: 'It Makes Your Hire Smack.'
        },
    ]
}

const section2Data = {
    heading: 'Things Go Better With Sales & Marketing Recruitment',
    text: 'Are you looking to bolster your sales and marketing teams with top-tier talent that can drive your business to new heights? Our Sales and Marketing Recruitment Services are tailored to help you find the perfect candidates who can deliver results and exceed your expectations.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Sales Roles',
        text: 'Whether you need sales representatives, account managers, or sales directors, we have the expertise to find candidates who can meet and exceed your sales targets.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Marketing Positions',
        text: 'From digital marketing specialists to marketing managers, we have a track record of placing marketing professionals who can drive brand awareness and revenue growth.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Executive Search',
        text: "If you're looking for top-level sales and marketing executives to lead your team, we have a dedicated executive search service to identify and recruit C-suite talent.",
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Temporary Staffing',
        text: 'For short-term projects or seasonal demands, we can provide temporary sales and marketing staff to ensure your business operates seamlessly.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
]

const section4HighlightData = [
    {
        heading: 'Unparalleled Industry Expertise',
        text: "At the heart of Earlyjobs success lies their profound understanding of the sales and marketing domain. They recognize that sales and marketing roles are multifaceted, requiring a unique blend of skills, industry knowledge, and adaptability. The consultancy's dedicated team of recruiters possesses this expertise, staying attuned to the latest trends, market shifts, and emerging technologies that impact the field. This deep industry knowledge enables them to identify candidates who not only meet job requirements but also bring a strategic edge to your organization."
    },
    {
        heading: 'Strategic Talent Sourcing',
        text: "Earlyjobs leverages an extensive network and multifaceted approach to talent sourcing. Their recruiters employ a combination of traditional and innovative methods, including their vast professional network, online job boards, social media, and proactive candidate searches. This comprehensive approach ensures that they have access to a diverse pool of candidates, both those actively seeking new opportunities and hidden gems who are open to the right offer."
    },
    {
        heading: 'Customized Recruitment Strategies',
        text: "Recognizing that each business is unique, Earlyjobs takes a highly personalized approach to recruitment. They invest time in understanding your company culture, values, and specific job requirements. This crucial step ensures that their recruitment strategy is tailored to your organization's ethos, leading to the identification of candidates who not only possess the requisite skills but also seamlessly integrate into your team."
    },
    {
        heading: 'Rigorous Screening and Assessment',
        text: "One of Earlyjobs hallmark features is its commitment to delivering only the highest-quality candidates. Their recruitment process includes rigorous screening and assessment, encompassing evaluations of skills, experience, and cultural fit. This meticulous vetting process guarantees that candidates presented to you are not only competent but also align with your organizational values and work environment."
    },
    {
        heading: 'Time and Cost Efficiency',
        text: "Earlyjobs understands the urgency and cost implications of the recruitment process. Their services are designed to save you time and money by delivering high-caliber candidates efficiently. Their streamlined approach minimizes downtime in your hiring process, ensuring that you can swiftly secure the talent you need to meet your business objectives."
    },
    {
        heading: 'Access to Passive Candidates',
        text: "Earlyjobs excels at reaching out to passive candidates—those who may not be actively searching for new opportunities. This approach extends your talent search beyond conventional job postings, broadening your access to candidates who might not be discoverable through typical recruitment channels."
    },
    {
        heading: 'Executive Search Excellence',
        text: "For organizations seeking top-tier executives in sales and marketing, Earlyjobs offers a specialized executive search service. They identify and recruit C-suite talent capable of providing strategic leadership and driving innovation within your organization."
    },
    {
        heading: 'Temporary Staffing Solutions',
        text: "In addition to permanent placements, Earlyjobs provides temporary staffing solutions. Whether you have short-term projects or seasonal demands, their temporary staff can seamlessly integrate into your organization, ensuring continuity and productivity."
    },
    {
        heading: 'Cost-Effective Solutions',
        text: "While recruitment can be expensive, Earlyjobs aims to provide cost-effective solutions. Their expertise in candidate selection and placement reduces turnover rates, ultimately delivering a strong return on investment for your organization."
    },
    {
        heading: 'Ongoing Support',
        text: "Earlyjobs commitment doesn't end with placement. They provide ongoing support to ensure the success of the candidates they've placed. This includes monitoring progress, addressing any challenges that may arise, and fostering long-term relationships between clients and candidates."
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

const SalesMarketingServicePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.salesRecruitment.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.salesRecruitment.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.salesRecruitment.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.salesRecruitment.description);
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
                <h1 className='service-page-s3-heading'>Our Sales and Marketing Recruitment Services Include:</h1>
                <RecruitingProcess section3Data={section3Data} />
            </section>
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h1 className="service-page-s4-subheading">Recruitment Always The Right Choice</h1>
                    <p className="service-page-s4-text">
                        Earlyjobs plays a crucial role in sales and marketing recruitment services by acting as a strategic partner for organizations seeking to build high-performing sales and marketing teams.
                        <br />
                        <br />
                        Don’t leave your sales and marketing recruitment to chance. Partner with us to access a wealth of industry knowledge, a vast candidate network, and a commitment to finding the best talent for your organization. Contact us today to discuss your recruitment needs and take the first step toward building a high-performing sales and marketing team that drives success for your business.
                    </p>
                    <h2 className="service-page-s4-heading">SALES AND MARKETING RECRUITMENT BY EARLYJOBS: YOUR PATH TO EXCEPTIONAL TALENT</h2>
                    <p className="service-page-s4-text">In today’s competitive business landscape, finding and retaining top-tier talent in sales and marketing is paramount to success. Earlyjobs understands this need and specializes in delivering exceptional sales and marketing recruitment services. With a proven track record of connecting businesses with the right professionals,  Earlyjobs stands as a trusted partner in navigating the intricacies of hiring within the dynamic sales and marketing industry.</p>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <p className="service-page-s4-text">In conclusion, Earlyjobs sales and marketing recruitment services offer a comprehensive and strategic approach to talent acquisition in a highly competitive field. Their industry expertise, tailored strategies, and commitment to excellence make them a go-to partner for organizations seeking exceptional sales and marketing professionals. Whether you’re a startup looking to build your initial team or an established company aiming to strengthen your sales and marketing force, Earlyjobs is your path to securing the talent that will drive your business to new heights.</p>
                </div>
                <div className='service-page-s4-consultancy-con'>
                    <img src="/services_imgs/senior-and-middle-level-hiring-services.webp" draggable={false} alt="it-recruitment-service" className="service-page-s4-image"/>
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

export default SalesMarketingServicePage;