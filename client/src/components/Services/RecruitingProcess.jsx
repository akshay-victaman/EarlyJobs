import React from 'react'

function RecruitingProcess({section3Data}) {
  return (
    <ul className='service-page-s3-list'>
        {section3Data.map((item, index) => (
            <li className='service-page-s3-item' key={index}>
                <div className='service-page-s3-item-icon-con'>
                    {item.icon}
                </div>
                <div className='service-page-s3-item-content'>
                    <h3 className='service-page-s3-item-heading'>{item.heading}</h3>
                    <p className='service-page-s3-item-text'>{item.text}</p>
                </div>
            </li>
        ))}
    </ul>
  )
}

export default RecruitingProcess