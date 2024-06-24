import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './style.css'

const PublicJobsCard = ({jobsItem}) => {

  const {
    id,
    compname,
    employmentType,
    location,
    city,
    role,
    category,
    workType,
  } = jobsItem

  let encodedUrl = encodeURI(`${role}_${compname}_${city}_${id}`)
  if(encodedUrl.includes('/')) {
    const newUrl = encodedUrl.replace(/\//g, '_')
    encodedUrl = newUrl
  }
  return (
    <Link to={`/view-openings/${encodedUrl}`} className="link-item">
      <li className="jobs-list-item-container public-list-item-container">
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
      </li>
    </Link>
  )
}

export default PublicJobsCard