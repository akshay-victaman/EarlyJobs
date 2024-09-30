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

const heroSectionData = {
    subheading: 'ENGAGE WITH THE BEST VALUE STAFFING SERVICE',
    heading: 'EarlyJobs: Your Partner in Streamlining Workforce Solutions for Optimal Performance.',
    list: [
        {
            text: 'Expertise in Tailored Staffing Solutions Across Industries'
        },
        {
            text: 'Commitment to Quality and Efficiency in Talent Acquisition'
        },
        {
            text: 'Ready to Elevate Your Workforce with Scalable Solutions'
        },
    ]
}

const section2Data = { 
    heading: 'Our Value Staffing Service: Transforming Your Workforce',
    text: 'At EarlyJobs, we specialize in providing tailored Value Staffing Services that align with your unique business needs. Our consultative approach ensures we build lasting partnerships, enabling us to understand your organization’s culture and requirements. By leveraging our extensive network and industry expertise, we deliver end-to-end staffing solutions that not only meet your immediate hiring needs but also support long-term growth and success.',
    image: '/services_imgs/features-summary.svg'
}

const section3Data = [
    {
        heading: 'Value Staffing Expertise',
        text: 'Our dedicated team possesses specialized knowledge in various industries, allowing us to effectively identify and attract candidates with the right skills and experience. We manage the entire staffing process, ensuring that only the most qualified candidates are presented to you.',
        icon: <FaRocket className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Time-Saving Staffing Solutions',
        text: 'By outsourcing your staffing needs to EarlyJobs, you can focus on your core business operations while we handle the entire recruitment process—from sourcing and screening candidates to onboarding. Our efficient processes save you valuable time and resources.',
        icon: <FaUserClock className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Wider Access to Talent',
        text: 'With our vast network and candidate database, we can tap into a diverse pool of talent, including passive candidates who may not be actively seeking new opportunities. This ensures that we find the perfect fit for your organization’s staffing needs.',
        icon: <FaGripLinesVertical className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Cost-Effective Value Staffing',
        text: 'Our Value Staffing Service is designed to be cost-effective, reducing your overall hiring expenses. We offer a transparent pricing model that eliminates hidden costs associated with in-house recruitment, allowing you to allocate resources more efficiently.',
        icon: <FaPaintBrush className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Accelerated Hiring Process',
        text: 'Leveraging our streamlined processes and advanced technology, we accelerate the hiring timeline, helping you bring top talent into your organization more quickly and effectively.',
        icon: <FaStopwatch className='service-page-s3-item-icon'/>
    },
    {
        heading: 'Ongoing Support and Insights',
        text: 'We provide continuous support throughout the staffing process and beyond. Our expert team offers strategic insights into market trends and candidate preferences, helping you make informed decisions that enhance your workforce.',
        icon: <FaUserNurse className='service-page-s3-item-icon'/>
    },
];

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

const ValueStaffingServicesPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "Recruitment Process Outsourcing | EarlyJobs";
    }, []);

    return (
        <div className="service-page-container">
            <HeroSection heroSectionData={heroSectionData} />
            <HowWeHelpSection section2Data={section2Data} />
            <section className='service-page-s3-con'>
                <RecruitingProcess section3Data={section3Data} />
            </section>
            <section className='service-page-s4-con'>
                <div className='service-page-s4-content'>
                    <h2 className="service-page-s4-heading">WELCOME TO OUR Value Staffing Services</h2>
                    <p className="service-page-s4-text">
                    EarlyJobs provides Value Staffing with varied skill sets on its payroll across multiple locations. We call them our Deputies (Value Staffing). They work at our client organizations for a specified period of time across different functions and levels. We handle end-to-end employee life cycle management with the option for them to be hired onto the client payroll, offering complete flexibility. Our technology-enabled transparent work process brings proven efficiency in deputee engagement and significantly reduces employee query resolution time.
                        <br />      
                    </p> 
                    <h2 className="service-page-s4-heading">Value Staffing Services Process</h2>
                    <p className="service-page-s4-text">EarlyJobs is sensitive to the fact that in addition to Value Staffing, organizations also need value added services not just limited to employee engagement, performance management, talent pipeline management etc. In such cases, we bring in a dedicated team for them; they operate out of the customer’s office/ location and do everything for that client – for the line managers, HR team, finance team, legal team and all the temp staff of EarlyJobs working there; they bring in higher efficiency in staffing and a significant increase in productivity.</p>
                    <h2 className="service-page-s4-heading">EarlyJobs HR Advantages</h2>
                    <p className="service-page-s4-text">
                    Rigorous management of compliance and risks :
                    <br/>
                   <li> Domain experts carry out payroll and all compliance matters to ensure that there are no errors and all risks are managed appropriately.</li> 
            
                   <li>Our client focus ensures that we align with the specific requirements of each client around their internal processes.</li>   
                        Enhanced Employee Productivity :
                        <br/>
                        <li>Right selection of candidates using our expertise and unique matching algorithm</li>
                        <li>Transparent work processes using technology that lead to a huge reduction in queries from employees and line managers.</li> 
                        <li>Quick resolution of queries, if any, and thus, preventing the wastage of your precious time.</li>
                    </p>
                    <h1 className="service-page-s4-subheading">Ready to Transform Your Workforce with Value Staffing?</h1>
                    <p className="service-page-s4-text">Welcome to EarlyJobs, your premier partner in Value Staffing Services dedicated to optimizing your workforce and connecting you with top talent. With an unparalleled track record and a steadfast commitment to quality, we are here to enhance your staffing strategy and propel your business to new heights.</p>
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

export default ValueStaffingServicesPage;