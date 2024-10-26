import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './style.css'
import { FiBriefcase } from 'react-icons/fi'

const PublicJobsCard = ({jobsItem}) => {

  const {
    id,
    compname,
    companyLogoUrl,
    employmentType,
    location,
    city,
    role,
    category,
    workType,
    keywords
  } = jobsItem

  let encodedUrl = encodeURI(`${role}_${compname}_${city}_${id}`)
  if(encodedUrl.includes('/')) {
    const newUrl = encodedUrl.replace(/\//g, '_')
    encodedUrl = newUrl
  }

  const keywordsArray = keywords ? keywords.split(',').slice(0, 4) : []
  
  return (
    <Link to={`/job-openings/${encodedUrl}`} className="link-item">
      <li className="jobs-list-item-container public-list-item-container">
        { companyLogoUrl ?
          <img src={companyLogoUrl} alt="company logo" className="public-jobs-logo-img" />
          :
          <FiBriefcase className="public-job-logo" />
        }
        <div>
        <div className="jobs-logo-name-con">
            <h1 className="public-job-title">{role} - {compname} - {category}</h1>
        </div>
        <div className="public-jobs-loc-type-salary-con">
          <div className="public-jobs-loc-type-con">
            <div className="public-jobs-location-con">
              <BsFillBriefcaseFill className="public-job-type-icon" />
              <p className="public-job-location">{employmentType} <span className="public-job-dot">•</span> {workType}</p>
            </div>
            <span className="public-job-dot job-dot-mobile">•</span>
            <div className="public-jobs-location-con">
              <TiLocation className="public-job-location-icon" />
              <p className="public-job-location">{location}</p>
            </div>
          </div>
          {/* <p className="job-salary">{minSalary} - {maxSalary} LPA</p> */}
        </div>
        <div className="job-details-keywords-con openings-keyword-con">
            {
              keywordsArray.map((eachItem, index) => (
                <p key={index} className="job-details-keywords job-section-keywords">{eachItem}</p>
              ))
            }
        </div>
        </div>
      </li>
    </Link>
  )
}

export default PublicJobsCard