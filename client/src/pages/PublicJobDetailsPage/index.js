import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { FiBriefcase } from "react-icons/fi";
import { IoMdPaperPlane } from "react-icons/io";
import { useParams } from 'react-router-dom'
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {ThreeCircles} from 'react-loader-spinner'
import './style.css'
import PublicApplicationForm from '../PublicApplicationForm';
import ShareButton from '../../components/ShareButton';

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const PublicJobDetailsPage = () => {
  const [jobDetails, setJobDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
  const [apply, setApply] = useState(false)


  const backendUrl = process.env.REACT_APP_BACKEND_API_URL

  useEffect(() => {
    getJobDetails()
    window.scrollTo(0, 0)
  }, [])


  const params = useParams()

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const {id} = params
    const jobId = id.split('_')[id.split('_').length - 1]
    const apiUrl = `${backendUrl}/api/public/jobs/${jobId}`

    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
      } else {
        const formattedData = {
          id: data.id,
          category: data.category,
          shiftTimings: data.shift_timings,
          commissionType: data.commission_type,
          commissionFee: data.commission_fee,
          tenureInDays: data.tenure_in_days,
          compname: data.company_name,
          minSalary: data.min_salary,
          maxSalary: data.max_salary,
          noOfOpenings: data.no_of_openings,
          employmentType: data.employment_type,
          jobDescription: data.description,
          area: data.area,
          streetAddress: data.street,
          city: data.city,
          pincode: data.pincode,
          location: data.location,
          locationLink: data.location_link,
          role: data.title,
          workType: data.work_type,
          hiringNeed: data.hiring_need,
          postedBy: data.posted_by,
          skills: data.skills,
          language: data.language,
          status: data.status,
          createdAt: data.created_at,
          qualification: data.qualification,
          minExperience: data.min_experience,
          maxExperience: data.max_experience,
          minAge: data.min_age,
          maxAge: data.max_age,
          keywords: data.keywords ? data.keywords.split(', ') : [],
        }
        console.log(data)
        console.log(formattedData)
        setJobDetails(formattedData)
        setApiStatus(apiStatusConstant.success)
        const title = `${formattedData.role} - ${formattedData.compname} - Earlyjobs`
        document.title = title
        document.querySelector('meta[name="description"]').setAttribute('content', title)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
    </div>
  )

  const renderJobDetails = () => {
    const {
      id,
      companyLogoUrl,
      compname,
      minSalary,
      maxSalary,
      noOfOpenings,
      employmentType,
      jobDescription,
      location,
      city,
      locationLink,
      role,
      category,
      shiftTimings,
      workType,
      hiringNeed,
      skills,
      status,
      createdAt,
      qualification,
      minExperience,
      maxExperience,
      minAge,
      maxAge,
      keywords
    } = jobDetails
    const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

    return (
      <div className="job-details-container public-job-details-con">
        <div className="job-details-card">
          <div className="job-details-logo-title-con">
            <div className='job-details-logo-title-con-2'>
              <FiBriefcase className="job-details-logo" />
              <div className="job-details-title-rating-con">
                <h1 className="job-details-title">{compname}</h1>
                <h1 className="job-details-title">{role}</h1>
                <p className="job-details-rating">{category}</p>
              </div>
            </div>
            <div className='job-details-apply-con'>
              <div className='job-details-share-con'>
                <ShareButton 
                  title={role} 
                  text={role} 
                  url={`https://earlyjobs.in/view-openings/${role}_${compname}_${city}_${id}`} 
                />
              </div>
              <button className='public-job-apply-btn mobile-apply-btn-top' onClick={() => setApply(true)}>
                  <IoMdPaperPlane className='apply-icon' /> Apply
              </button>
            </div>
          </div>
          <div className="job-details-location-type-salary-con">
            <div className="job-details-location-type-con">
              <div className="job-details-location-type">
                <TiLocation className="job-details-location-icon" />
                <p className="job-details-location">{location}</p>
                <a href={locationLink} target="_blank" rel="noreferrer" className="job-details-location-link">View Location</a>
              </div>
              <div className="job-details-location-type">
                <BsFillBriefcaseFill className="job-details-location-icon" />
                <p className="job-details-location">{employmentType}</p>
              </div>
            </div>
            <p className="job-details-salary">{minSalary} - {maxSalary} LPA</p>
          </div>
          <hr className="line" />
          <p className="job-detials-misc"><span className='misc-head'>Status:</span> {status}</p>
          <p className="job-detials-misc"><span className='misc-head'>Notice Period:</span> {hiringNeed}</p>
          <p className="job-detials-misc"><span className='misc-head'>Shift Timings:</span> {shiftTimings}</p>
          <p className="job-detials-misc"><span className='misc-head'>Work Type:</span> {workType}</p>
          <p className="job-detials-misc"><span className='misc-head'>No of Openings:</span> {noOfOpenings}</p>
          <p className="job-detials-misc"><span className='misc-head'>Language:</span> {jobDetails.language}</p>
          <p className="job-detials-misc"><span className='misc-head'>Skills:</span> {skills}</p>
          <p className="job-detials-misc"><span className='misc-head'>Experience:</span> {minExperience} - {maxExperience} years</p>
          <p className="job-detials-misc"><span className='misc-head'>Qualification:</span> {qualification}</p>
          <p className="job-detials-misc"><span className='misc-head'>Age:</span> {minAge} - {maxAge} years</p>
          <div className="job-details-desc-visit-con">
            <h1 className="job-details-desc-heading">Description</h1>
            <a
              href={companyLogoUrl}
              className="job-details-visit-con"
              target="_blank"
              rel="noreferrer"
            >
              <p className="job-details-visit">Visit</p>
              <HiOutlineExternalLink />
            </a>
          </div>
          <p className="job-details-desc" dangerouslySetInnerHTML={{__html: jobDescription}}></p> 
          <h1 className="job-details-desc-heading">Keywords</h1>
          <div className="job-details-keywords-con">
            {
              jobDetails.keywords.map((eachItem, index) => (
                <p key={index} className="job-details-keywords">{eachItem}</p>
              ))
            }
          </div>
          <div className="job-details-apply-con">
            <button className='public-job-apply-btn mobile-apply-btn' onClick={() => setApply(true)}>
                <IoMdPaperPlane className='apply-icon' /> Apply
            </button>
          </div>
          <p className="job-details-posted-at">Posted {formattedDate}</p>
        </div>
      </div>
    )
  }

  const renderJobDetailsFailure = () => (
    <div className="jobs-details-failure-container">
      <img
        src="/failure-img.avif"
        alt="failure view"
        className="jobs-details-failure-image"
      />
      <h1 className="jobs-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="jobs-details-failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-details-failure-retry-button"
        onClick={getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  const renderSwitchCase = () => {
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return renderLoader()
      case apiStatusConstant.success:
        return renderJobDetails()
      case apiStatusConstant.failure:
        return renderJobDetailsFailure()
      default:
        return null
    }
  }


    return (
      <div className='job-details-main-container'>
        {
          apply 
          ? <PublicApplicationForm jobDetails={jobDetails} setApply={setApply} /> 
          : renderSwitchCase()
        }
      </div>
    )
}

export default PublicJobDetailsPage