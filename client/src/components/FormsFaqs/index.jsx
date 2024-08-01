import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import './style.css'

function FormsFaqs({accordionData}) {

    const [activeAccordion, setActiveAccordion] = React.useState(null)
  return (
    <section className='forms-page-s5-con'>
        <h1 className="service-page-s5-heading">Frequently Asked Questions</h1>
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
    </section>
  )
}

export default FormsFaqs