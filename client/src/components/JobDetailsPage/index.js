import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { formatDistanceToNow, parseISO, format } from 'date-fns';
import {Oval} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { FaCircleCheck } from "react-icons/fa6";
import { FiBriefcase, FiEdit } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";
import { useParams } from 'react-router-dom'
import {IoIosClose} from 'react-icons/io'
import Popup from 'reactjs-popup';
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {ThreeCircles} from 'react-loader-spinner'
import './style.css'
import UpdateCandidateStatus from '../ViewCandidates/UpdateCandidateStatus';
import ViewCandidateDetails from '../ViewCandidates/ViewCandidateDetails';
import EditJobDetails from '../EditJobDetails';
import ScheduleInterview from '../ViewCandidates/ScheduleInterview';

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobDetailsPage = () => {
  const [jobDetails, setJobDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
  const [hmOrHrList, setShmOrHrList] = useState([])
  const [selectedHR, setSelectedHR] = useState([])
  const [loading, setLoading] = useState(false)
  const [hrOrHmAssigned, setHrOrHmAssigned] = useState(0)
  const [candidateList, setCandidateList] = useState([])
  const [viewCandidateDetails, setViewCandidateDetails] = useState(false)
  const [viewScheduleInterviewPopup, setViewScheduleInterviewPopup] = useState(false)
  const [interviewDetails, setInterviewDetails] = useState({})
  const [candidateId, setCandidateId] = useState('')
  const [isEditJob, setIsEditJob] = useState(false)
  const [page, setPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0);
  const [hrLoader, setHrLoader] = useState(false)


  const onShowCandidateDetails = (candidateId) => {
    setViewCandidateDetails(!viewCandidateDetails)
    setCandidateId(candidateId)
  }

  const onShowScheduleInterviewPopup = (jobId, candidateDetails, jobDetails, setCandidateList, candidateList) => {
    setViewScheduleInterviewPopup(!viewScheduleInterviewPopup)
    setInterviewDetails({
      jobId,
      candidateDetails,
      setCandidateList,
      candidateList,
      jobsList: jobDetails
    })
  }

  const backendUrl = process.env.REACT_APP_BACKEND_API_URL

  useEffect(() => {
    getJobDetails()
    window.scrollTo(0, 0)
    const role = Cookies.get('role')
    if(role === 'AC') {
      fetchHumanResources()
      getHRsForJob()
    }
    if(role === 'SHM') {
      fetchHiringManagers()
      getHMsForJob()
    }
  }, [])

  useEffect(() => {
    if(Cookies.get('role') !== 'BDE') {
      getCandidates(page)
    }
  }, [page])

  useEffect(() => {
    const timer = setTimeout(() => {
      setHrOrHmAssigned(0)
    }, 5000)
    return () => clearTimeout(timer)
  }, [hrOrHmAssigned])

  const params = useParams()
  const {id} = params

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `${backendUrl}/jobs/details/${id}`
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
          category: data.category,
          shiftTimings: data.shift_timings,
          commissionType: data.commission_type,
          commissionFee: data.commission_fee,
          tenureInDays: data.tenure_in_days,
          compname: data.company_name,
          companyId: data.company_id,
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
          keywords: data.keywords ? data.keywords.split(',') : []
        }
        console.log(data)
        console.log(formattedData)
        setJobDetails(formattedData)
        setApiStatus(apiStatusConstant.success)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const formatDate = (date) => {
    const dbDate = parseISO(date);
    const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
    return formattedDate;
  }

  const getCandidates = async (page) => {
    // setApiStatus(apiStatusConstant.inProgress)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    let email = ""
    const role = Cookies.get('role')
    if(role === 'HR') email = Cookies.get('email')
    const apiUrl = `${backendUrl}/jobs/candidate/${id}?email=${email}&offerStatus=&page=${page}`
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
        // setApiStatus(apiStatusConstant.failure)
      } else {
        console.log("get candidates raw api data", data)
        const formattedData = data.candidates.map(eachItem => ({
          applicationId: eachItem.application_id,
          candidateId: eachItem.candidate_id,
          candidateName: eachItem.name,
          candidateEmail: eachItem.email,
          candidatePhone: eachItem.phone,
          hrName: eachItem.hr_name,
          offerStatus: eachItem.offer_status,
          offeredDate: eachItem.offered_date,
          appliedBy: eachItem.applied_by,
          interviewDate: formatDate(eachItem.interview_date),
          companyName: eachItem.company_name
        }))
        console.log(formattedData)
        // setHrList(data.hrList)
        setTotalItems(data.count)
        setCandidateList(formattedData)
        // setApiStatus(apiStatusConstant.success)
      }
    } else {
      // setApiStatus(apiStatusConstant.failure)
    }
  }

  const fetchHiringManagers = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch(`${backendUrl}/api/users/all/hiring-managers`, options)
    const data = await response.json()
    console.log(data)
    setShmOrHrList(data)
  }

  const fetchHumanResources = async () => {
    const email = Cookies.get('email')
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch(`${backendUrl}/api/users/all/hr/${email}`, options)
    const data = await response.json()
    console.log(data)
    setShmOrHrList(data)
  }

  const getHMsForJob = async () => {
    setHrLoader(true)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `${backendUrl}/jobs/assigned-hm/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      console.log(data)
      if (response.ok === true) {
        if(data.error) {
          alert(data.error)
        } else {
          const hmEmails = data.map(item => item.assigned_to)
          setSelectedHR(hmEmails)
        }
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert(error)
    }
    setTimeout(() => {
      setHrLoader(false)
    }, 2000);
  }

  const getHRsForJob = async () => {
    setHrLoader(true)
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const email = Cookies.get('email')
    const apiUrl = `${backendUrl}/jobs/assigned-hr/${id}/${email}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        if(data.error) {
          alert(data.error)
        } else {
          const hrEmails = data.map(item => item.assigned_to)
          setSelectedHR(hrEmails)
        }
      } else {
        alert(data.error)
      }
    } catch (error) {
      alert(error)
    }
    setTimeout(() => {
      setHrLoader(false)
    }, 2000);
  }

  const handleAddHR = (e) => {
    if(e.target.value === "") return
    if(selectedHR.includes(e.target.value)) return;
    const hrRecruiter = [...selectedHR]
    hrRecruiter.push(e.target.value)
    setSelectedHR(hrRecruiter)
  }

  const handleRemoveHR = (email) => {
    const hrRecruiter = selectedHR.filter(item => item !== email)
    setSelectedHR(hrRecruiter)
  }

  const updateJobDetails = (updatedData) => {
    const {jobId,
            companyName,
            companyId,
            title,
            category,
            shiftTimings,
            description,
            location,
            locationLink,
            minSalary,
            maxSalary,
            skills,
            language,
            employmentType,
            workType,
            commissionFee,
            commissionType,
            tenureInDays,
            noOfOpenings,
            status,
            hiringNeed,
            qualification,
            minExperience,
            maxExperience,
            minAge,
            maxAge,
            keywords
            } = updatedData
    setJobDetails({
      ...jobDetails, 
        id: jobId,
        category: category,
        shiftTimings: shiftTimings,
        commissionType: commissionType,
        commissionFee: commissionFee,
        tenureInDays: tenureInDays,
        compname: companyName,
        companyId: companyId,
        minSalary: minSalary,
        maxSalary: maxSalary,
        noOfOpenings: noOfOpenings,
        employmentType: employmentType,
        jobDescription: description,
        location: location,
        locationLink: locationLink,
        role: title,
        workType: workType,
        hiringNeed: hiringNeed,
        postedBy: jobDetails.postedBy,
        skills: skills,
        language: language,
        status: status,
        createdAt: jobDetails.createdAt,
        qualification: qualification,
        minExperience: minExperience,
        maxExperience: maxExperience,
        minAge: minAge,
        maxAge: maxAge,
        keywords: keywords.split(',')
      }
    )
  }

  const assignJobToHM = async () => {
    setLoading(true)
    const email = Cookies.get('email')
    const assignedData = {
      jobId: jobDetails.id,
      assignedTo: selectedHR,
      assignedBy: email,
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify(assignedData)
    }
    try {
      const response = await fetch(`${backendUrl}/jobs/assigned-hm/update`, options)
      const data = await response.json()
      if(response.ok === true) {
        if(data.error) {
            const hrEmails = data.hrEmails.map(item => {
              const hrName = hmOrHrList.find(hr => hr.email === item)
              return hrName.username
            })
            alert(`Job already assigned to ${hrEmails.join(', ')} HMs. Please remove them and try again.`)
            setHrOrHmAssigned(2)
        } else {
          setHrOrHmAssigned(1)
        }
      } else {
        setHrOrHmAssigned(2)
      }
    } catch (error) {
      alert(error)
    }
    setLoading(false)
  }

  const assignJobToHR = async () => {
    setLoading(true)
    const email = Cookies.get('email')
    const assignedData = {
      jobId: jobDetails.id,
      assignedTo: selectedHR,
      assignedBy: email,
    }
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify(assignedData)
    }
    try {
    const response = await fetch(`${backendUrl}/jobs/assigned-hr/update`, options)
    const data = await response.json()
    
    if(response.ok === true) {
        if(data.error) {
            const hrEmails = data.hrEmails.map(item => {
              const hrName = hmOrHrList.find(hr => hr.email === item)
              return hrName.username
            })
            alert(`Job already assigned to ${hrEmails.join(', ')} HRs. Please remove them and try again.`)
            setHrOrHmAssigned(2)
        } else {
          setHrOrHmAssigned(1)
        }
    } else {
        setHrOrHmAssigned(2)
    }
  } catch (error) {
    alert(error)
  }
    setLoading(false)
  }

  const handleArchieveJob = async (close) => {
    const url = `${backendUrl}/admin/archive-job/${jobDetails.id}`
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

  const itemsPerPage = 10; 

  const handlePageChange = (page) => {
    setPage(page)
  };

  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return (
        <button className={`pagination-button ${current === page ? "activePage" : ""}`} key={current} onClick={() => handlePageChange(current)}>
          {current}
        </button>
      );
    }

    if (type === 'prev') {
      return (
        <button className={`pagination-button ${page === 1 ? "endPage" : ""}`} title="Previous" key="prev" onClick={() => handlePageChange(current - 1)}>
          {'< Prev'}
        </button>
      );
    }

    if (type === 'next') {
      return (
        <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
          {'Next >'}
        </button>
      );
    }

    if (type === 'jump-prev' || type === 'jump-next') {
      return <span className="pagination-dots" title='more'>...</span>;
    }

    return element;
  };

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
    </div>
  )

  const renderAssignToHmOrHr = () => (
    hrLoader ? 
    <Oval
        height={16}
        width={16}
        color="#EB6A4D"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="#EB6A4D"
        strokeWidth={3}
        strokeWidthSecondary={3}
    />
    :
    <>
      <div className='job-details-assign-con'>
        <div className='job-details-assign-sub-con'>
          <label className='job-details-assign'>Assign to {Cookies.get('role') === 'AC' ? "HR" : "HM"}: </label>
          <select className='job-details-select' value={selectedHR} onChange={handleAddHR}>
            <option value=''>Select {Cookies.get('role') === 'AC' ? "HR" : "HM"}</option>
              {   hmOrHrList.length > 0 &&
                  hmOrHrList.map(eachItem => <option key={eachItem.email} value={eachItem.email}>{eachItem.username + ' - ' + eachItem.hiring_category}</option>)
              }
          </select>
        </div>
        <div className='job-details-assign-sub-con'>
          <button className='job-details-assign-button' disabled={loading} onClick={Cookies.get('role') === 'AC' ? assignJobToHR : assignJobToHM} >
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
            {hrOrHmAssigned === 1 && <FaCircleCheck className='check-icon' /> }
            {hrOrHmAssigned === 2 && <IoIosCloseCircle className='cross-circle-icon' /> }
            {hrOrHmAssigned === 2 && "Try Again"}
          </p>
        </div>
      </div>
      <div style={{marginTop: '12px'}} className='hr-input-list-con'>
            { selectedHR.length > 0 && 
              selectedHR.map((email, index) => {
                    const hrName = hmOrHrList.find(item => item.email === email) 
                    return (
                        <div className='hr-input-list' key={index}>
                            <p className='hr-input-list-item'>{hrName && hrName.username}</p>
                            <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveHR(email)}><IoIosClose className='hr-close-icon' /></button>
                        </div>
                    )}
                )
            }
      </div>
    </>
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
      tenureInDays,
      minSalary,
      maxSalary,
      noOfOpenings,
      employmentType,
      jobDescription,
      location,
      locationLink,
      role,
      category,
      shiftTimings,
      workType,
      hiringNeed,
      postedBy,
      skills,
      status,
      createdAt,
      qualification,
      minExperience,
      maxExperience,
      minAge,
      maxAge
    } = jobDetails
    const formattedDate = formatDistanceToNow(createdAt, { addSuffix: true });

    const userType = Cookies.get('role')
    const hiringFor = Cookies.get('hiring_for')

    return (
      <div className="job-details-container">
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
            {
              (userType === 'ADMIN' || userType === 'BDE') && 
            
              <button className='edit-job-button' onClick={() => setIsEditJob(true)}>
                <FiEdit className='edit-icon' /> Edit
              </button>
            }
          </div>
          {(userType === 'AC' || userType === 'SHM') && renderAssignToHmOrHr()}
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
          <p className="job-detials-misc"><span className='misc-head'>Assigned By:</span> {postedBy}</p>
          {
            (hiringFor === "Freelance HR Recruiter" || userType !== "HR") && <p className="job-detials-misc"><span className='misc-head'>Commission:</span> {commissionType === "Fixed" ? `₹ ${((commissionFee/100)*70).toFixed(2)} Per Joining` : `${((commissionFee/100)*50).toFixed(2)}% of Annual CTC` }</p>
          }
          {
            (hiringFor === "Freelance HR Recruiter" || userType !== "HR") && <p className="job-detials-misc"><span className='misc-head'>Tenure:</span> {tenureInDays} days</p>
          }
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
                  Company Name
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

                  <th className="job-details-candidates-table-heading-cell">
                    Interveiw Date
                  </th>
                
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
                  
                  <UpdateCandidateStatus key={eachItem.applicationId} onShowCandidateDetails={onShowCandidateDetails} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} candidateDetails={eachItem} jobId={id} jobsList={[jobDetails]} candidateList={candidateList} setCandidateList={setCandidateList} />
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
        <Pagination
          current={page}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          className="pagination-class pagination-class-candidates"
          style={{marginTop: '20px'}}
          itemRender={itemRender}
          showSizeChanger
        />
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

    return (
      <div className='job-details-main-container'>
        {/* <NavBar isLoggedIn={true} /> */}
        {
          isEditJob ? 
          <EditJobDetails updateJobDetails={updateJobDetails} jobDetails={jobDetails} setIsEditJob={setIsEditJob} />
          : renderSwitchCase()
        }

        {role !== 'BDE' && renderCandidates()}
        {
          viewCandidateDetails && 
          <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowCandidateDetails}></div>
            <ViewCandidateDetails onShowCandidateDetails={onShowCandidateDetails} candidateId={candidateId} />
          </div>
        }

        {
          viewScheduleInterviewPopup && 
          <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowScheduleInterviewPopup}></div>
            <ScheduleInterview onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} interviewDetails={interviewDetails} />
          </div>
        }
        {/* <Footer /> */}
      </div>
    )
}

export default JobDetailsPage