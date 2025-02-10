import React, { useEffect } from 'react'
import { metaConstants } from '../../utils/metaConstants';
import './style.css'

const ManagementPage = () => {

    const managementList = [
        {
            name: 'Asish Chakraborty',
            designation: 'Co-Founder & CEO',
            desc: 'Asish Chakraborty is the Co-Founder & CEO of Earlyjobs, a company dedicated to transforming the recruitment process by fostering meaningful connections that fuel growth for both employers and jobseekers. He holds an MBA from the Sikkim Manipal Institute of Technology and brings with him 20 years of extensive experience in the pharmaceutical industry. Asish is passionate about introducing changes to the employment sector by promoting freelancers and empowering women to work from home. His expertise and leadership skills serve as a guiding force in propelling Earlyjobs to greater heights.',
            img: '/about_us_imgs/Asish-Chakraborty.jpg'
        },
        {
            name: 'Ravi Kumar',
            designation: 'Founder & Director',
            desc: "Ravi Kumar originating from Gaya in Bihar, the Founder & Director of Earlyjobs has been a stalwart in the recruitment industry running his agency with dedication and precision. He as an overall experience of 10+ years of experience in various domains. With over a decade of experience across various domains, he has been instrumental in overseeing all operational aspects of Victaman, ensuring efficiency, growth, and strategic alignment. Ravi Prakash Kumar's leadership has been pivotal in driving the success and growth of both Earlyjobs and VictaMan Services Pvt. Ltd., contributing significantly to the recruitment industry.",
            img: '/about_us_imgs/Ravi-Prakash.jpg'
        },
        {
            name: 'Saurav Kumar',
            designation: 'Co-Founder & Strategic Adviser ',
            desc: "Saurav Kumar is a dynamic business strategist and entrepreneur with over 10 years of experience in driving business growth, innovation, and operational excellence. He holds a Master’s degree from SRM University, Chennai, and has founded multiple successful ventures, including Victaman Services Pvt Ltd, Goformeet, English Wizard, and Meet XO. <br/> <br/> Currently, Saurav plays a key role in planning, strategic advice at Earlyjobs, leveraging his expertise in IT solutions, business development, and strategic leadership. He envisions revolutionizing the job market in the country by providing employment opportunities to the masses, reflecting his commitment to impactful and scalable solutions.",
            img: '/about_us_imgs/Saurav-Kumar.jpg'
        },
        {
            name: 'Surbhi Rani',
            designation: 'Co-Founder & Director',
            desc: "Surbhi Rani, a graduate of Magadh University, is a dynamic leader specializing in building diverse, high-performing teams and crafting impactful recruitment strategies. As the Director of Earlyjobs, she plays a pivotal role in full-cycle recruitment, client relationship management, and ensuring a seamless candidate experience. With a deep understanding of talent acquisition, Surbhi is committed to connecting top talent with the right opportunities, driving growth for both candidates and organizations.",
            img: '/about_us_imgs/Surbhi-Rani.jpg'
        },
        {
            name: 'Akanksha Bharati',
            designation: 'Head of operations',
            desc: "Akanksha Bharati is a Senior Hiring Manager at Earlyjobs, bringing over a year of experience in recruitment and leadership. A graduate of the University of Calcutta, she is passionate about hiring new talent for organizations. In her role, Akansha is responsible for developing and implementing effective recruitment strategies, sourcing and attracting qualified candidates, and collaborating with hiring managers to understand their staffing needs. Her dedication to talent acquisition and her leadership skills contribute significantly to the growth and success of Earlyjobs.",
            img: '/about_us_imgs/Akanksha.jpg'
        },
    ]

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.management.title

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
                <h1 className='privacy-policy-heading'>Management Team</h1>
            </div>

            <div className="management-page__content">
                <div className="management-page__content__team">
                    <h2 className="management-page__content__team__heading" >Management Team</h2>
                    <p className="management-page__content__team__para">Our management team is responsible for the day-to-day operations of our company. They are committed to providing the highest level of service to our customers and ensuring that our business operates efficiently and effectively.</p>
                </div>
                <img src="/about_us_imgs/management-img.webp" alt="management team" className="management-page__content__image" />
            </div>

            { managementList.map((item, index) => (
                <div className='management-team-con'>
                    {index%2 === 0 && <img src={item.img} alt="management team" className="management-team-img" /> }
                    <div className='management-team-detail'>
                        <h1 className='management-team-name'>{item.name}</h1>
                        <p className='management-team-designation'>{item.designation}</p>
                        <p className='management-team-desc'>{item.desc}</p>
                    </div>
                    {index%2 !== 0 && <img src={item.img} alt="management team" className="management-team-img" /> }
                </div>
            ))}
        </div>
    )
}

export default ManagementPage
