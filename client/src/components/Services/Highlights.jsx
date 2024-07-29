import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

function Highlights({section4HighlightData}) {
  return (
    <ul className="service-page-s4-list">
        {section4HighlightData.map((item, index) => (
            <li className="service-page-s4-item" key={index}>
                <FaCheckCircle className="service-page-s4-item-icon"/>
                <div className="service-page-s4-item-content">
                    <h3 className="service-page-s4-item-heading">{item.heading}</h3>
                    <p className="service-page-s4-item-text">{item.text}</p>
                </div>
            </li>
        ))}
    </ul>
  )
}

export default Highlights