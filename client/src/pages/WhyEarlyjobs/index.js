import { FaCheckCircle } from "react-icons/fa";
import './style.css';
import ClientCarousel from "../../components/ClientCarousal";
import ConsultationForm from "../../components/ConsultationForm";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";

const WhyEarlyjobs = () => {

  const whyEarlyjobs = [
    {
      heading: 'Access to a wide network:',
      desc: 'We often have extensive networks and connections with various companies and industries. We can provide you with access to job opportunities that may not be advertised publicly. This can increase your chances of finding suitable employment.'
    },
    {
      heading: 'Expertise and guidance:',
      desc: 'We have experienced recruiters who are familiar with the job market and industry trends. We can provide valuable guidance on career planning, resume writing, interview preparation, and other aspects of the job search process. Their expertise can help you present yourself effectively to potential employers and enhance your chances of securing a job.'
    },
    {
      heading: 'Time-saving:',
      desc: 'Searching for a job can be time-consuming and overwhelming. We can save you time by conducting initial screenings, matching your skills and qualifications with suitable job openings, and arranging interviews on your behalf. We streamline the process and handle administrative tasks, allowing you to focus on preparing for interviews and other essential aspects of your job search.'
    },
    {
      heading: 'Industry insights:',
      desc: 'We often have in-depth knowledge of specific industries. They can provide you with insights into market trends, skill requirements, and salary expectations. This information can help you make informed decisions about your career path and negotiate better job offers.'
    },
    {
      heading: 'Confidentiality:',
      desc: 'If you are currently employed and seeking new opportunities, you may prefer to keep your job search confidential. We can maintain your privacy by discreetly connecting you with potential employers and ensuring that your personal information remains confidential.'
    },
    {
      heading: 'Replacement Benefits:',
      desc: 'If the candidate is being terminated by the client or If the candidate resigns from the organization voluntarily with in the guarantee period. We provide another candidate without any additional cost.'
    },
    {
      heading: 'No any upfront payment:',
      desc: 'we not take any upfront payment so increased trust and credibility, reduced financial risk, flexibility of clients.'
    },
  ];

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

  const freelanceHrAccordionData = [
    {
        label: 'What types of freelance HR projects do you offer?',
        content: 'We offer freelance opportunities for HR recruiters, including sourcing candidates, screening resumes, conducting interviews, and managing recruitment processes. Each project is focused on specific hiring needs.'
    },
    {
        label: 'How do I find and apply for freelance HR opportunities?',
        content: 'Apply through job openings on our portal.'
    },
    {
        label: 'How is payment structured for freelance HR recruiters?',
        content: 'Payment is based on the number of candidates hired through your recruitment efforts. Compensation details, including rates and payment terms, will be outlined in the agreement.'
    },
    {
        label: 'Are there any fees to access freelance HR opportunities?',
        content: 'There are no fees to browse or apply for freelance HR projects. EarlyJobs does not charge freelancers for accessing job opportunities on our platform.'
    },
    {
        label: 'How can I ensure successful and timely payment for my recruitment work?',
        content: 'To ensure timely payment, deliver high-quality recruitment services as per the agreement and submit all required documentation. Regular communication with clients and meeting recruitment targets are essential for successful compensation.'
    },
  ];

  const internHrAccordionData = [
    {
        label: 'What types of internships do you offer?',
        content: 'We offer internships in HR recruitment, focusing on talent sourcing, candidate screening, interviewing, and supporting recruitment processes.'
    },
    {
        label: 'Are internships paid or unpaid?',
        content: 'Internship is paid based on performance. Compensation is provided for meeting goals; otherwise, the internship may be unpaid.'
    },
    {
        label: 'How long do internships typically last?',
        content: 'Internships typically last for 3 months. Duration may vary depending on the specific role and project needs.'
    },
    {
        label: 'What qualifications or skills do I need to apply?',
        content: 'Strong communication, attention to detail, and interest in HR are key. Relevant coursework or experience is also beneficial.'
    },
    {
        label: 'How do I apply for an internship?',
        content: 'Apply through job openings on our portal.'
    },
  ];

  const [freelanceHrActiveAccordion, setFreelanceHrActiveAccordion] = useState(0);
  const [internHrActiveAccordion, setInternHrActiveAccordion] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Why Earlyjobs | EarlyJobs";
  }, []);

  return (
    <div className='whyearlyjobs-container'>
      <div className='whyearlyjobs-bg-img'>
        <div className='whyearlyjobs-bg-overlay'>
          <div className='whyearlyjobs-bg'>
            <h1 className='whyearlyjobs-heading'>WHY EARLYJOBS ?</h1>
            <hr className='whyearlyjobs-hr' />
            <p className='whyearlyjobs-desc'>
              EarlyJobs specializes in optimizing talent acquisition for businesses. Our proven methodologies and industry expertise ensure that you attract, assess, and hire the best candidates for your organization's needs.  
            </p>
          </div>
        </div>
      </div>
      <div className='whyearlyjobs-sec-2'>
        <div className='whyearlyjobs-sec-2-content'>
          <h3 className='whyearlyjobs-content-heading'>WHY EARLYJOBS</h3>
          <h1 className='whyearlyjobs-content-subheading'>We merely act as Catalyst for and growth</h1>
          <ul className='whyearlyjobs-content-list'>
            {whyEarlyjobs.map((item, index) => (
              <li className='whyearlyjobs-content-list-item' key={index}>
                <FaCheckCircle className='whyearlyjobs-content-list-icon' />
                <div className='whyearlyjobs-content-list-text'>
                  <h3 className='whyearlyjobs-content-list-text-heading'>{item.heading}</h3>
                  <p className='whyearlyjobs-content-list-text-desc'>{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='whyearlyjobs-consultation-form'>
          <div className='whyearlyjobs-consultation-form-con'>
            <ConsultationForm />
          </div>
        </div>
      </div>
      <div className='whyearlyjobs-sec-3'>
        <ClientCarousel logos={logos} />
      </div>
      <div className='whyearlyjobs-sec-4'>
        <div className="whyearlyjobs-page-sec-4-accordion-con">
          <h1 className="whyearlyjobs-page-sec-4-heading">Freelance Recruiter FAQs</h1>
            { freelanceHrAccordionData.map((accordion, index) => (
                <div className="landing-page-s7-accordion-item" key={index}>
                    <div className="landing-page-s7-accordion-item-label-icon-con" onClick={() => setFreelanceHrActiveAccordion(freelanceHrActiveAccordion === index ? null : index)}>
                        <h3 className="landing-page-s7-accordion-label">{accordion.label}</h3>
                        <IoIosArrowDown className={`landing-page-s7-accordion-icon ${freelanceHrActiveAccordion === index ? "active" : ""}`} />
                    </div>
                    <div className={`landing-page-s7-accordion-content ${freelanceHrActiveAccordion === index ? "active-accordion" : ""}`}>
                        <p className="landing-page-s7-accordion-content-text">{accordion.content}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="whyearlyjobs-page-sec-4-accordion-con">
          <h1 className="whyearlyjobs-page-sec-4-heading">Intern Recruiter FAQs</h1>
            { internHrAccordionData.map((accordion, index) => (
                <div className="landing-page-s7-accordion-item" key={index}>
                    <div className="landing-page-s7-accordion-item-label-icon-con" onClick={() => setInternHrActiveAccordion(internHrActiveAccordion === index ? null : index)}>
                        <h3 className="landing-page-s7-accordion-label">{accordion.label}</h3>
                        <IoIosArrowDown className={`landing-page-s7-accordion-icon ${internHrActiveAccordion === index ? "active" : ""}`} />
                    </div>
                    <div className={`landing-page-s7-accordion-content ${internHrActiveAccordion === index ? "active-accordion" : ""}`}>
                        <p className="landing-page-s7-accordion-content-text">{accordion.content}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhyEarlyjobs;