import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import {Oval} from 'react-loader-spinner'
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { useParams, Redirect } from 'react-router-dom'
import Popup from 'reactjs-popup';
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {ThreeCircles} from 'react-loader-spinner'
import NavBar from '../NavBar'
import './style.css'
import Footer from '../Footer';
import UpdateCandidateStatus from '../ViewCandidates/UpdateCandidateStatus';

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobDetailsPage = () => {
  const [jobDetails, setJobDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
  const [humarResources, setHumarResources] = useState([])
  const [selectedHR, setSelectedHR] = useState('')
  const [loading, setLoading] = useState(false)
  const [hrAssigned, setHrAssigned] = useState(0)
  const [candidateList, setCandidateList] = useState([])
 

  useEffect(() => {
    getJobDetails()
    fetchHumarResources()
    getCandidates()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHrAssigned(0)
    }, 5000)
    return () => clearTimeout(timer)
  }, [hrAssigned])

  const params = useParams()
  const {id} = params

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `http://localhost:5000/jobs/details/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
      } else {
        const formattedData = {
          id: data.id,
          companyLogoUrl: data.company_logo_url,
          category: data.category,
          shiftTimings: data.shift_timings,
          commissionType: data.commission_type,
          commissionFee: data.commission_fee,
          compname: data.company_name,
          minSalary: data.min_salary,
          maxSalary: data.max_salary,
          noOfOpenings: data.no_of_openings,
          employmentType: data.employment_type,
          jobDescription: data.description,
          location: data.location,
          role: data.title,
          workType: data.work_type,
          hiringNeed: data.hiring_need,
          postedBy: data.posted_by,
          skills: data.skills,
          status: data.status,
          createdAt: data.created_at,
        }
        setJobDetails(formattedData)
        setApiStatus(apiStatusConstant.success)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const getCandidates = async () => {
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `http://localhost:5000/jobs/candidate/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
      } else {
        const email = Cookies.get('email')
        const role = Cookies.get('role')
        if(role === 'HR') {
          const filteredData = data.filter(eachItem => eachItem.applied_by === email)
          const formattedData = filteredData.map(eachItem => ({
            candidateId: eachItem.candidate_id,
            candidateName: eachItem.name,
            candidateEmail: eachItem.email,
            candidatePhone: eachItem.phone,
            offerStatus: eachItem.offer_status,
            offeredDate: eachItem.offered_date,
            appliedBy: eachItem.applied_by
          }))
          setCandidateList(formattedData)
        } else {
          const formattedData = data.map(eachItem => ({
            candidateId: eachItem.candidate_id,
            candidateName: eachItem.name,
            candidateEmail: eachItem.email,
            candidatePhone: eachItem.phone,
            offerStatus: eachItem.offer_status,
            offeredDate: eachItem.offered_date,
            appliedBy: eachItem.applied_by
          }))
          setCandidateList(formattedData)
        }
        console.log(data)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const fetchHumarResources = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch('http://localhost:5000/api/users/all/hr', options)
    const data = await response.json()
    setHumarResources(data)
  }

  const handleHumanResourceChange = (e) => {
    setSelectedHR(e.target.value)
  }

  const assignJobToHR = async () => {
    if(selectedHR === '') {
      return
    }
    setLoading(true)
    const email = Cookies.get('email')
    const assingedData = {
      jobId: jobDetails.id,
      assignedTo: selectedHR,
      assignedBy: email,
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify(assingedData)
    }
    const response = await fetch('http://localhost:5000/jobs/assign', options)
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            alert(data.error)
            setHrAssigned(2)
        } else {
            setHrAssigned(1)
        }
    } else {
        setHrAssigned(2)
    }
    setLoading(false)
  }

  const handleArchieveJob = async (close) => {
    const url = `http://localhost:5000/admin/archive-job/${jobDetails.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            alert(data.error)
        } else {
            setJobDetails({
              ...jobDetails,
              status: 'ARCHIVED'
            })
            alert(data.message)
            close()
        }
    } else {
        alert(data.error)
    }
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <ThreeCircles type="ThreeDots" color="#f9a828" height="50" width="50" />
    </div>
  )

  const renderAssignToHR = () => (
    <div className='job-details-assign-con'>
      <div className='job-details-assign-sub-con'>
        <label className='job-details-assign'>Assign to HR: </label>
        <select className='job-details-select' value={selectedHR} onChange={handleHumanResourceChange}>
          <option value=''>Select HR</option>
            {   humarResources.length > 0 &&
                humarResources.map((eachItem, index) => <option key={index} value={eachItem.email}>{eachItem.username + ' - ' + eachItem.location + ' - ' + eachItem.hiring_ctc + ' LPA - ' + eachItem.hiring_category}</option>)
            }
        </select>
      </div>
      <div className='job-details-assign-sub-con'>
        <button className='job-details-assign-button' disabled={loading} onClick={assignJobToHR} >
          {loading ? 
            <Oval
                height={16}
                width={16}
                color="#ffffff"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#ffffff"
                strokeWidth={3}
                strokeWidthSecondary={3}
            />
            :
            "Assign"
          }
        </button>
        <p className='job-details-assign-status'>
          {hrAssigned === 1 && <FaCircleCheck className='check-icon' /> }
          {hrAssigned === 2 && <IoIosCloseCircle className='cross-circle-icon' /> }
          {hrAssigned === 2 && "Try Again"}
        </p>
      </div>
    </div>
  )

  const renderArchieveJob = close => (
    <div className="modal-form">
        <button className="modal-close-button" onClick={close}>
          &times;
        </button>
        <label className="homepage-label">Do you really want to archieve this job?</label>
        <div className='achieve-button-con'>
          <button className='job-details-upload-candidate-button' onClick={() => handleArchieveJob(close)}>YES</button>
          <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>NO</button>
        </div>
    </div>
  )

  const renderButtons = () => {
    const userType = Cookies.get('role');
    if(jobDetails.status === 'ARCHIVED') {
      return  <p className="job-details-posted-at">This job is archived</p> 
    } else if(userType === 'ADMIN') {
      return (
        <Popup
          trigger={<button className='job-details-upload-candidate-button'>Archieve Job</button>}
          modal
        >
          {close => (
            <div className="modal">
              {
                userType === 'ADMIN' && renderArchieveJob(close)
              }
            </div>
          )}
        </Popup>
      )
    }
    return null
  }

  const renderJobDetails = () => {
    const {
      companyLogoUrl,
      compname,
      commissionType,
      commissionFee,
      minSalary,
      maxSalary,
      noOfOpenings,
      employmentType,
      jobDescription,
      location,
      role,
      category,
      shiftTimings,
      workType,
      hiringNeed,
      postedBy,
      skills,
      status,
      createdAt,
    } = jobDetails
    const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

    const userType = Cookies.get('role')

    return (
      <div className="job-details-container">
        <div className="job-details-card">
          <div className="job-details-logo-title-con">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-logo"
            />
            <div className="job-details-title-rating-con">
              <h1 className="job-details-title">{compname}</h1>
              <h1 className="job-details-title">{role}</h1>
              <p className="job-details-rating">{category}</p>
            </div>
          </div>
          {userType === 'AC' && renderAssignToHR()}
          <div className="job-details-location-type-salary-con">
            <div className="job-details-location-type-con">
              <div className="job-details-location-type">
                <TiLocation className="job-details-location-icon" />
                <p className="job-details-location">{location}</p>
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
          <p className="job-detials-misc"><span className='misc-head'>Assigned By:</span> {postedBy}</p>
          <p className="job-detials-misc"><span className='misc-head'>Commission:</span> {commissionType === "Fixed" ? `₹ ${commissionFee} Per Joining` : `${commissionFee}% of Annual CTC` }</p>
          <p className="job-detials-misc"><span className='misc-head'>Notice Period:</span> {hiringNeed}</p>
          <p className="job-detials-misc"><span className='misc-head'>Shift Timings:</span> {shiftTimings}</p>
          <p className="job-detials-misc"><span className='misc-head'>Work Type:</span> {workType}</p>
          <p className="job-detials-misc"><span className='misc-head'>No of Openings:</span> {noOfOpenings}</p>

          <p className="job-detials-misc"><span className='misc-head'>Skills:</span> {skills}</p>

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
          <p className="job-details-desc">{jobDescription}</p>
          <p className="job-details-posted-at">Posted {formattedDate}</p>
          {renderButtons()}
        </div>
      </div>
    )
  }

  const renderCandidates = () => (
    // offeredDate: eachItem.offered_date
      <div className="job-details-candidates-container">
        <h1 className="job-details-candidates-heading">Candidates</h1>
        <div className='table-container'>
          <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 && "empty-candidates"}`}>
              <tr className="job-details-candidates-table-heading">
                <th className="job-details-candidates-table-heading-cell">
                  Name
                </th>
                <th className="job-details-candidates-table-heading-cell">
                  Email
                </th>
                <th className="job-details-candidates-table-heading-cell">
                  Phone
                </th>
                <th className="job-details-candidates-table-heading-cell">
                  Offer Status
                </th>
                {
                  Cookies.get('role') !== 'HR' &&
                  <th className="job-details-candidates-table-heading-cell">
                    Shortlisted By
                  </th>
                }
                
                {
                  Cookies.get('role') !== 'ADMIN' && (
                    <th className="job-details-candidates-table-heading-cell">
                      Update Status
                    </th>
                  )
                }
                
              </tr>

              {
                  candidateList.length > 0 && candidateList.map(eachItem => (
                  
                  <UpdateCandidateStatus key={eachItem.candidateId} candidateDetails={eachItem} jobId={id} candidateList={candidateList} setCandidateList={setCandidateList} />
                  ))                    
              }
          </table>
          {candidateList.length === 0 && 
            <p className='no-candidates-error '>
                {
                    apiStatus === apiStatusConstant.inProgress ?
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#EB6A4D"
                        strokeWidth="4"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        secondaryColor="#EB6A4D"
                        wrapperClass=""
                    />
                    :
                    "no records found!"
                }
            </p>}
        </div>
      </div>
    )

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

    const role = Cookies.get('role')
    if(role === 'BDE') {
      return <Redirect to='/bde-portal' />
    }

    return (
      <div className='job-details-main-container'>
        <NavBar isLoggedIn={true} />
        {renderSwitchCase()}
        {renderCandidates()}
        <Footer />
      </div>
    )
}

export default JobDetailsPage