import {TiLocation} from 'react-icons/ti'
import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import { FiBriefcase } from "react-icons/fi";
import './style.css'
import Cookies from 'js-cookie';

const JobsCard = props => {
  const {jobsItem, showCandidateForm} = props

  const hiringFor = Cookies.get('hiring_for')
  const userRole = Cookies.get('role')
  
  const {
    id,
    compname,
    companyLogoUrl,
    commissionType,
    commissionFee,
    currency,
    salaryMode,
    minSalary,
    maxSalary,
    employmentType,
    location,
    role,
    category,
    workType,
    hiringNeed,
  } = jobsItem

  let linkUrl;
  if (showCandidateForm === 4) {
    linkUrl = `job-request-details/${id}`;
  } else {
    linkUrl = `/jobs/${id}`;
  }

  return (
    <Link to={linkUrl} className="link-item">
      <li className="jobs-list-item-container">
        <div className="jobs-logo-name-con">
          { companyLogoUrl ?
            <img src={companyLogoUrl} alt="company logo" className="jobs-logo-img" />
            :
            <FiBriefcase className="jobs-logo" />
          }
          <div className="jobs-title-con">
            <h1 className="job-title">{compname}</h1>
            <h1 className="job-title">{role}</h1>
            <p className="job-rating-number">{category}</p>
          </div>
        </div>
        <div className="jobs-loc-type-salary-con">
          <div className="jobs-loc-type-con">
            <div className="jobs-location-con">
              <TiLocation className="job-location-icon" />
              <p className="job-location">{location}</p>
            </div>
            <div className="jobs-location-con">
              <BsFillBriefcaseFill className="job-type-icon" />
              <p className="job-location">{employmentType}</p>
            </div>
          </div>
          <p className="job-location" style={{fontWeight: 'bold'}}>{currency?.split(',')[0]}{minSalary} - {currency?.split(',')[0]}{maxSalary} {salaryMode}</p>
        </div>
        <hr className="jobs-line" />
        { 
          ((hiringFor === "Freelance HR Recruiter" || userRole !== "HR") && showCandidateForm !== 18 ) && <p className="job-detials">Commission: {commissionType === "Fixed" ? `₹ ${((commissionFee/100)*70).toFixed(2)} Per Joining` : `${((commissionFee/100)*50).toFixed(2)}% of Annual CTC` }</p>
        }
        
        <p className="job-detials">Notice Period: {hiringNeed}</p>
        <p className="job-detials">Work Type: {workType}</p>
      </li>
    </Link>
  )
}

export default JobsCard