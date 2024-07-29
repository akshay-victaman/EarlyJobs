import { FaCheckDouble } from 'react-icons/fa6'
import ConsultationForm from '../ConsultationForm'

function HeroSection({heroSectionData}) {
  return (
    <section className='service-page-hero'>
        <div className='service-page-hero-content'>
            <h3 className="service-page-hero-subheading">{heroSectionData.subheading}</h3>
            <h1 className="service-page-hero-heading">{heroSectionData.heading}</h1>
            <ul className="service-page-hero-list">
                {heroSectionData.list.map((item, index) => (
                    <li className="service-page-hero-item" key={index}>
                        <FaCheckDouble size={20} className="service-page-hero-item-icon"/>
                        <p className="service-page-hero-item-text">{item.text}</p>
                    </li>
                ))}
            </ul>
            <a href="tel:918217527926" className="service-page-hero-cta">Connect With Our Agents</a>
        </div>
        <div className='service-page-hero-consultation-con'>
            <ConsultationForm />
        </div>
    </section>
  )
}

export default HeroSection