import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns';
import { FiBriefcase } from "react-icons/fi";
import { useParams, useHistory } from 'react-router-dom'
import {IoIosClose} from 'react-icons/io'
import Popup from 'reactjs-popup';
import {TiLocation} from 'react-icons/ti'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import {ThreeCircles} from 'react-loader-spinner'
import { getFirestore, query, collection, where, getDocs, Timestamp, doc, setDoc, addDoc, deleteDoc } from 'firebase/firestore';
import app from '../../firebase';

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const RequestJobDetailsPage = () => {
  const [jobDetails, setJobDetails] = useState({})
  const [firebaseJob, setFirebaseJob] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
  const [rejectApproveStatus, setRejectApproveStatus] = useState(false)
  const [accountManagers, setAccountManagers] = useState([])
  const [error, setError] = useState('')

  const backendUrl = process.env.REACT_APP_BACKEND_API_URL

  useEffect(() => {
    getJobDetails()
    fetchAccountManagers()
    window.scrollTo(0, 0)
  }, [])

  const fetchAccountManagers = async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
    }
    const response = await fetch(`${backendUrl}/api/users/all/account-managers`, options)
    const data = await response.json()
    setAccountManagers(data)
    console.log(data)
  }


  const params = useParams()

  const getJobDetails = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const {id} = params

    const db = getFirestore(app);
    const queryRef = query(
        collection(db, "AddJobVacancies"),
        where("docId", "==", id)
    );

    const querySnap = await getDocs(queryRef);

    if (!querySnap.empty) {
        // documents = querySnap.docs.map((doc) => doc.data());

        const documents = querySnap.docs.map((doc) => {
            const timestamp = doc.data().postDateTime;
            // Check if AppliedDate is a Timestamp object:
            if (!(timestamp instanceof Timestamp)) {
              console.error("AppliedDate is not a valid Timestamp. Skipping conversion.");
              return doc.data();
            }
          
            // Convert Timestamp to human-readable format:
            const options = { // Configure formatting options as needed
              day: '2-digit',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true, // Use appropriate time format
              timeZone: 'Asia/Kolkata' // Replace with your preferred time zone
            };
            const formattedDate = timestamp.toDate().toLocaleString('en-US', options);
            return {
              // Original document data
              ...doc.data(),
              // Add `formattedDate` property with converted string
              postDateTime: formattedDate
            };
        });

        setFirebaseJob(documents[0])
        console.log(documents[0])

        const formattedData = {
            id: documents[0].docId,
            category: documents[0].category,
            shiftTimings: documents[0].shiftTimings,
            commissionType: documents[0].commissionType,
            commissionFee: documents[0].commission,
            tenureInDays: documents[0].tenureInDays,
            compname: documents[0].companyName,
            minSalary: documents[0].salaryMax,
            maxSalary: documents[0].salaryMin,
            noOfOpenings: documents[0].noOfOpenings,
            employmentType: documents[0].employmentType,
            jobDescription: documents[0].description,
            location: documents[0].location,
            locationLink: documents[0].locationLink,
            role: documents[0].title,
            workType: documents[0].workType,
            hiringNeed: documents[0].hiringNeed,
            skills: documents[0].skills,
            language: documents[0].language,
            status: documents[0].status,
            createdAt: documents[0].postDateTime,
            qualification: documents[0].qualification,
            minExperience: documents[0].minExperience,
            maxExperience: documents[0].maxExperience,
            minAge: documents[0].minAge,
            maxAge: documents[0].maxAge,
            assignedTo: []
          }
          console.log(formattedData)
        setJobDetails(formattedData)
        setApiStatus(apiStatusConstant.success)
    } else {
        setApiStatus(apiStatusConstant.failure)
        return;
    }
  }

  const handleAddHiringManager = (e) => {
    if(e.target.value === "") return
    if(jobDetails.assignedTo.includes(e.target.value)) return;
    const hiringManagers = jobDetails.assignedTo
    hiringManagers.push(e.target.value)
    setJobDetails({ ...jobDetails, assignedTo: hiringManagers })
}

const handleRemoveHiringManager = (email) => {
    const hiringManagers = jobDetails.assignedTo.filter(item => item !== email)
    setJobDetails({ ...jobDetails, assignedTo: hiringManagers })
}


  const addToFirebase = async () => {
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "ApprovedJobVacancies"), {firebaseJob}); // add hiring partner details in ApprovedHiringPartners collection
    const docId = docRef.id;
    const approvedDate = new Date();
    await setDoc(doc(db, "ApprovedJobVacancies", docId), { ...firebaseJob, approvedDate, docId}); // update docId in ApprovedHiringPartners collection
    return docId
}

  const history = useHistory()

  const onClickApproveJob = async () => {
    if(jobDetails.assignedTo.length === 0) {
        setError("All fields are required")
        return
    }
    console.log(jobDetails)
    const email = Cookies.get('email')
    const newJob = {
        companyName : jobDetails.compname,
        title: jobDetails.role,
        category: jobDetails.category,
        shiftTimings: jobDetails.shiftTimings,
        description: jobDetails.jobDescription,
        location: jobDetails.location,
        locationLink: jobDetails.locationLink,
        minSalary: jobDetails.minSalary,
        maxSalary: jobDetails.maxSalary,
        skills: jobDetails.skills,
        language: jobDetails.language,
        employmentType: jobDetails.employmentType,
        workType: jobDetails.workType,
        commissionFee: jobDetails.commissionFee,
        commissionType: jobDetails.commissionType,
        tenureInDays: jobDetails.tenureInDays,
        noOfOpenings: jobDetails.noOfOpenings,
        status: jobDetails.status,
        hiringNeed: jobDetails.hiringNeed,
        postedBy: email,
        assignedTo: jobDetails.assignedTo,
        qualification: jobDetails.qualification,
        maxExperience: jobDetails.maxExperience,
        minExperience: jobDetails.minExperience,
        minAge: jobDetails.minAge,
        maxAge: jobDetails.maxAge
    }
    setError("");
    setRejectApproveStatus(true)
    const url = `${backendUrl}/jobs/add/new`
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('jwt_token')
        },
        body: JSON.stringify(newJob)
    }
    const response = await fetch(url, options) // post job in DB
    const data = await response.json()
    if(response.ok === true) {
        if(data.error) {
            setError(data.error)
        } else {  
            setError("");
            await addToFirebase() // if job posted successfully then add job data in to firebase in ApprovedJobVacancies collection
            const db = getFirestore(app);
            const {id} = params
            await deleteDoc(doc(db, "AddJobVacancies", id)); // then delete the job details from AddJobVacancies collection from firebase
            history.replace('/jobs') // redirect to hiring partner requests page
            setRejectApproveStatus(false)
        }
    } else {
        setError(data.error)

    }
    setRejectApproveStatus(false)
  }

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container-job-details">
      <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
    </div>
  )

const onClickReject = async () => {
    const {id} = params
    setRejectApproveStatus(true)
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "RejectedJobVacancies"), { firebaseJob });
    const docId = docRef.id;
    const RejectedDate = new Date();
    await setDoc(doc(db, "RejectedJobVacancies", docId), { ...firebaseJob, docId, RejectedDate });

    await deleteDoc(doc(db, "AddJobVacancies", id));
    history.replace('/jobs')
    setRejectApproveStatus(false)
}

const renderRejectPopup = (close) => {
  return (
      <div className="modal-form">
          <button className="modal-close-button" disabled={rejectApproveStatus} onClick={close}>
              &times;
          </button>
          <label className="homepage-label">Do you want to reject {firebaseJob.companyName}'s job posting request?</label>
          <div className='achieve-button-con'>
              <button className='job-details-upload-candidate-button' disabled={rejectApproveStatus} onClick={() => onClickReject(close)}>YES</button>
              <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={rejectApproveStatus} onClick={close}>NO</button>
          </div>
      </div>
  )
}

  const renderApprovePopup = (close) => {
        
    return (
        <div className="modal-form">
            <button className="modal-close-button" disabled={rejectApproveStatus} onClick={close}>
                &times;
            </button>
            <label className='bde-form-label'>Assign To Account Manager<span className='hr-form-span'> *</span></label>
            <div className='hr-input-list-con'>
                {
                    jobDetails.assignedTo.map((email, index) => {
                        const hiringManagerName = accountManagers.find(item => item.email === email) 
                        return (
                            <div className='hr-input-list' key={index}>
                                <p className='hr-input-list-item'>{hiringManagerName.username}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveHiringManager(email)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        )}
                    )
                }
            </div>
            <select className='bde-form-input' name='assignedTo' value={jobDetails.assignedTo} onChange={handleAddHiringManager}>
                <option value=''>Select Account Manager</option>
                {   accountManagers.length > 0 &&
                    accountManagers.map(eachItem => <option value={eachItem.email}>{eachItem.username + ' - ' + eachItem.phone + ' - ' + eachItem.hiring_category}</option>)
                }
            </select>
            <div className='achieve-button-con create-user-btn-con'>
                <button className='job-details-upload-candidate-button' disabled={rejectApproveStatus} onClick={onClickApproveJob} >APPROVE</button>
                <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={rejectApproveStatus} onClick={close}>CANCEL</button>
            </div>
            {error && <p className='hr-error' style={{marginTop: "10px"}}>{error}</p>}
        </div>
    )
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
      skills,
      status,
      createdAt,
      qualification,
      minExperience,
      maxExperience,
      minAge,
      maxAge
    } = jobDetails
    const dateArr = createdAt.split(' ')
    const dateStr = dateArr[0] + ' ' + dateArr[1] + ' ' + dateArr[2] + ' ' + dateArr[4] + ' ' + dateArr[5]
    const date = new Date(dateStr)
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    const skillStr = skills.map(skill => skill.value).join(', ')
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
          {
            (hiringFor === "Freelance HR Recruiter" || userType !== "HR") && <p className="job-detials-misc"><span className='misc-head'>Commission:</span> {commissionType === "Fixed" ? `₹ ${(commissionFee/100)*50} Per Joining` : `${(commissionFee/100)*70}% of Annual CTC` }</p>
          }
          {
            (hiringFor === "Freelance HR Recruiter" || userType !== "HR") && <p className="job-detials-misc"><span className='misc-head'>Tenure:</span> {tenureInDays} days</p>
          }
          <p className="job-detials-misc"><span className='misc-head'>Notice Period:</span> {hiringNeed}</p>
          <p className="job-detials-misc"><span className='misc-head'>Shift Timings:</span> {shiftTimings}</p>
          <p className="job-detials-misc"><span className='misc-head'>Work Type:</span> {workType}</p>
          <p className="job-detials-misc"><span className='misc-head'>No of Openings:</span> {noOfOpenings}</p>
          <p className="job-detials-misc"><span className='misc-head'>Language:</span> {jobDetails.language}</p>
          <p className="job-detials-misc"><span className='misc-head'>Skills:</span> {skillStr}</p>
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
          <hr className="line" style={{marginTop: '0px'}} />
          <div className='job-details-comapany-details-con'>
            <h1 className="job-details-company-details-heading">Company Details</h1>
              <div className='job-details-company-details-item'>
                <p className='job-details-company-details-item-heading'>Company Name: </p>
                <p className='job-details-company-details-item-value'>{compname}</p>
              </div>
              <div className='job-details-company-details-item'>
                <p className='job-details-company-details-item-heading'>HR Name: </p>
                <p className='job-details-company-details-item-value'>{firebaseJob.companyDetails.name}</p>
              </div>
              <div className='job-details-company-details-item'>
                <p className='job-details-company-details-item-heading'>HR Email: </p>
                <p className='job-details-company-details-item-value'>{firebaseJob.companyDetails.email}</p>
              </div>
              <div className='job-details-company-details-item'>
                <p className='job-details-company-details-item-heading'>HR Contact No.: </p>
                <p className='job-details-company-details-item-value'>{firebaseJob.companyDetails.contactNo}</p>
              </div>
          </div>
          <p className="job-details-posted-at">Posted {formattedDate}</p>
            <div className="hiring-partner-details-button-con">
                <Popup
                    trigger={<button className="hiring-partner-btn reject-btn">Reject</button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderRejectPopup(close)}
                    </div>
                    )}
                </Popup>

                <Popup
                    trigger={<button className="hiring-partner-btn">Approve</button>}
                    modal
                >
                    {close => (
                    <div className="modal create-user-modal">
                        
                        {renderApprovePopup(close)}
                    </div>
                    )}
                </Popup>
            </div>
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
        {renderSwitchCase()}
      </div>
    )
}

export default RequestJobDetailsPage