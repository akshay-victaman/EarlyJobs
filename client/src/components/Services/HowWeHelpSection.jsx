import React from 'react'

function HowWeHelpSection({section2Data}) {
  return (
    <section className='service-page-s2-con'>
        <div className='service-page-s2-content'>
            <h3 className="service-page-s2-heading">{section2Data.heading}</h3>
            <p className="service-page-s2-text">{section2Data.text}</p>
        </div>
        <div className='service-page-s2-image-con'>
            <img src={section2Data.image} draggable={false} alt="it-recruitment-service" className="service-page-s2-image"/>
        </div>
    </section>
  )
}

export default HowWeHelpSection