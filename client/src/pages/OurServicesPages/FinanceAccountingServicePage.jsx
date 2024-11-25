import { FaRocket, FaUserClock, FaGripLinesVertical, FaPaintBrush, FaStopwatch, FaUserNurse } from "react-icons/fa";
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
    subheading: 'ENGAGE WITH THE BEST JOB CONSULTANCY FIRM',
    heading: 'Our firm uses artificial intelligence to ease your accounting & finance hiring problems.',
    list: [
        {
            text: 'Experience with Top 10 Accounting Companies Hirings'
        },
        {
            text: 'Trust and Accuracy in Accounts & Finanace Hirings'
        },
        {
            text: 'Ready to Transform Your Accounts and Finance Department'
        },
    ]
}

const section2Data = {
    heading: 'Our Hiring Experience, Turning Vision Into Reality.',
    text: 'We take a consultative approach to hiring, meaning that we place value on long-term relationships that last far beyond the first placement. We work with businesses of all sizes, across industries to find their next great Finance & Accounting hire. partnering with us can bring numerous benefits in hiring accounts and finance openings, including expertise, time-savings, access to a wider candidate pool, cost savings, faster hiring, and expert support.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Expertise',
        text: 'We have specialized knowledge and expertise in hiring for specific industries, such as finance and accounting. They understand the qualifications, skills, and experience needed for these roles and can effectively screen and shortlist candidates accordingly.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-saving',
        text: 'Hiring for accounts and finance positions can be a time-consuming process, involving screening resumes, conducting interviews, and performing reference checks. By outsourcing this task to a recruitment consultancy, you can save time and focus on other important business activities.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Access to a wider pool of candidates',
        text: 'We have an extensive network and database of qualified candidates. They can tap into this pool to find suitable candidates for your accounts and finance openings, including those who may not be actively looking for a job but are open to new opportunities.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Reduced hiring costs',
        text: 'In-house recruitment can be costly, with expenses such as advertising job vacancies, conducting background checks, and onboarding new hires. Earlyjobs often have a fixed fee or a percentage-based fee structure, which can help in reducing overall hiring costs.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Faster hiring process',
        text: 'We have established processes and resources in place to accelerate the hiring process. They can help streamline the recruitment process, from sourcing candidates to conducting interviews, resulting in faster and more efficient hires.',
        icon: <FaStopwatch className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Expert advice and support',
        text: 'We can provide valuable advice and guidance throughout the hiring process. They can offer insights on market trends, salary benchmarks, and candidate expectations, helping you make informed decisions and attract top talent.',
        icon: <FaUserNurse className='service-page-s3-item-icon'/>
    },
]

const section4HighlightData = [
    {
        heading: 'Expertise in Accounts & Finance',
        text: 'Experts in recruiting accounting and finance professionals. Extensive industry knowledge, compliance with financial regulations, and ability to find skilled candidates for diverse roles.'
    },
    {
        heading: 'Industry Insights',
        text: 'We provide informed insights on accounting and finance industry trends, regulations, and advancements, guiding your recruitment process with expertise in emerging areas and industry-specific challenges.'
    },
    {
        heading: 'Client Satisfaction',
        text: 'Client satisfaction is key. Success measured by placements and positive impact on finance functions. Dedicated to exceptional service, seamless recruitment, and meeting needs.'
    },
    {
        heading: 'Ongoing Support',
        text: 'We provide continuous support for successful integration. Assistance available for any post-placement concerns, ensuring a smooth transition for hired professional'
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

const FinanceAccountingServicePage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.financeRecruitment.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.financeRecruitment.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.financeRecruitment.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.financeRecruitment.description);
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
                    <h2 className="service-page-s4-heading">WELCOME TO OUR ACCOUNTS & FINANCE RECRUITMENT SERVICES</h2>
                    <p className="service-page-s4-text">
                        At Earlyjobs, we understand the critical role that skilled accounting and finance professionals play in driving financial success. Our recruitment services are designed to help you find the perfect candidates who will strengthen your financial team and contribute to your business growth.
                        <br />
                        <br />
                        At our company, we pride ourselves on being experts in the recruitment and placement of talented accounting and finance professionals. Through our extensive network of industry contacts and our deep understanding of the qualifications and skill sets required for success in the financial world, we are able to identify and attract the absolute best candidates for your business needs.
                        <br />
                        <br />
                        Our team of recruitment specialists focuses on your unique requirements and applies their expertise to find the candidates who possess the technical expertise, analytical skills, and financial acumen necessary to not just meet, but exceed your expectations in today’s fast-paced and highly competitive business landscape.
                    </p>
                    <h2 className="service-page-s4-heading">YOUR PATH TO BUILDING A HIGH-PERFORMING FINANCE TEAM</h2>
                    <p className="service-page-s4-text">
                        Is your organization struggling to find skilled accounting and finance professionals who can meet your financial objectives? Our recruitment services provide a strategic solution to bridge the talent gap, ensuring your team is equipped to drive financial excellence and profitability.
                        <br />
                        <br />
                        Through our comprehensive screening process and rigorous evaluations, we identify candidates who possess not only the required technical skills but also the ability to adapt to dynamic financial environments. We connect you with professionals who align with your goals, understand industry trends, and can provide valuable insights to support informed financial decision-making.
                    </p>
                    <h2 className="service-page-s4-heading">WHY CHOOSE OUR ACCOUNTS & FINANCE RECRUITMENT SERVICES</h2>
                    <Highlights section4HighlightData={section4HighlightData} />
                    <h1 className="service-page-s4-subheading">Ready to Transform Your Accounts and Finance Department?</h1>
                    <p className="service-page-s4-text">Welcome to Earlyjobs, the leading executive recruitment firm specializing in connecting exceptional talent with organizations dignified for greatness. With an unparalleled track record and an strong commitment to excellence, we, the best placement consultancy are here to transform your executive hiring process and elevate your business to new heights.</p>
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

export default FinanceAccountingServicePage;