import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Pagination from 'rc-pagination';
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { differenceInDays, format, formatISO, parse, parseISO, sub } from 'date-fns';
import ExcelDownloadButton from '../ExcelDownloadButton';
import Popup from 'reactjs-popup';
import {toast} from 'react-toastify'
import './style.css'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const Applications = ({ setShowCandidateForm }) => {
    const [searchInput, setSearchInput] = useState('');
    const [candidateList, setCandidateList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [jobId, setJobId] = useState('')
    const [allJobsList, setAllJobsList] = useState([])
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(date)
    const [toDate, setToDate] = useState(date)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [interviewDateTime, setInterviewDateTime] = useState({
      interviewDate: '',
      interviewTime: ''
    })
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);

    useEffect(() => {
        getApplications()
        getAllJobsList()
    }, [page, jobId, fromDate, toDate])

    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
      setPage(page)
    };

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const handleJobIdChange = (event) => {
      setJobId(event.target.value)
      setPage(1)
    }

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            getApplications();
            setPage(1);
        }
    };

    const handleFromDateChange = (event) => {
      setFromDate(event.target.value)
      setPage(1)
    }

    const handleToDateChange = (event) => {
      setToDate(event.target.value)
      setPage(1)
    }

    const handleInterviewDateTime = (event) => {
      const { name, value } = event.target;
      setInterviewDateTime(prevState => ({
        ...prevState,
        [name]: value
      }))
    }

    const getAllJobsList = async () => {
      const email = Cookies.get('email')
      const backendUrl = process.env.REACT_APP_BACKEND_API_URL
      let apiUrl = `${backendUrl}/jobs/account-manager/all/${email}`
      const jwtToken = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      console.log('api data', data)
      
      if (response.ok === true) {
        if(data.error) {
          alert(data.error)
        } else {
          const updatedData = data.map(eachItem => ({
            id: eachItem.id,
            compname: eachItem.company_name,
            role: eachItem.title,
            location: eachItem.location,
          }))
          console.log('updated data',updatedData)
  
          setAllJobsList(updatedData)
        }
      } else {
        alert(data.error)
      }
    }

    const getApplications = async () => {
        setApiStatus(apiStatusConstant.inProgress);
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/public/applications?search=${searchInput}&jobId=${jobId}&createdFrom=${fromDate}&createdTo=${toDate}&page=${page}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        try {
        const response = await fetch(url, options)
        const data = await response.json()
        console.log('data', data)
        if(response.ok === true) {
            if(data.error) {
                setApiStatus(apiStatusConstant.failure);
            } else {
                console.log(data.applications)

                const updatedData = data.applications.map(eachItem => ({
                  applicationId: eachItem.id,
                  jobId: eachItem.job_id,
                  fullName: eachItem.name,
                  companyName: eachItem.company_name,
                  title: eachItem.title,
                  phone: eachItem.phone,
                  createdAt: eachItem.created_at ? formatDate(eachItem.created_at) : null,
                  email: eachItem.email,
                  fatherName: eachItem.father_name,
                  offerStatus: eachItem.offer_status,
                  dateOfBirth: eachItem.date_of_birth,
                  gender: eachItem.gender,
                  aadharNumber: eachItem.aadhar_number,
                  highestQualification: eachItem.highest_qualification,
                  currentLocation: eachItem.current_location,
                  spokenLanguages: eachItem.spoken_languages,
                  experienceInYears: eachItem.experience_in_years,
                  experienceInMonths: eachItem.experience_in_months,
                  skills: eachItem.skills,
                  jobCategory: eachItem.job_category,
                  shiftTimings: eachItem.shift_timings,
                  employmentType: eachItem.employment_type,
                }))
                setCandidateList(updatedData);
                setTotalItems(data.count);
                setApiStatus(apiStatusConstant.success);
            }
        } else {
            setApiStatus(apiStatusConstant.failure);
        }
        } catch (error) {
        setApiStatus(apiStatusConstant.failure);
        }
    }

    const getApplicationsForExcel = async () => {
      const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/public/applications/excel?search=${searchInput}&jobId=${jobId}&createdFrom=${fromDate}&createdTo=${toDate}`
      const options = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt_token')}`
          }
      }
      try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log('data', data)
      if(response.ok === true) {
          if(data.error) {
              toast.error(data.error)
          } else {
              console.log(data)

              const updatedData = data.map(eachItem => ({
                applicationId: eachItem.id,
                jobId: eachItem.job_id,
                fullName: eachItem.name,
                companyName: eachItem.company_name,
                title: eachItem.title,
                phone: eachItem.phone,
                createdAt: eachItem.created_at ? formatDate(eachItem.created_at) : null,
                email: eachItem.email,
                fatherName: eachItem.father_name,
                offerStatus: eachItem.offer_status,
                dateOfBirth: eachItem.date_of_birth,
                gender: eachItem.gender,
                aadharNumber: eachItem.aadhar_number,
                highestQualification: eachItem.highest_qualification,
                currentLocation: eachItem.current_location,
                spokenLanguages: eachItem.spoken_languages,
                experienceInYears: eachItem.experience_in_years,
                experienceInMonths: eachItem.experience_in_months,
                skills: eachItem.skills,
                jobCategory: eachItem.job_category,
                shiftTimings: eachItem.shift_timings,
                employmentType: eachItem.employment_type,
              }))
              return updatedData;
          }
      } else {
          toast.error(data.error)
      }
      } catch (error) {
        toast.error(error.message)
      }
  }

    const sendEmailAck = async (candidateDetails) => {
      const username = Cookies.get('username')
      const jobName = candidateDetails.title
      const companyName = candidateDetails.companyName
      const location = candidateDetails.currentLocation
      // const interviewDateTime = new Date(`${candidateDetails.interviewDate}T${candidateDetails.interviewTime}`);
      const interviewDateTime2 = parse(`${interviewDateTime.interviewDate} ${interviewDateTime.interviewTime}`, "yyyy-M-d HH:mm", new Date());
      const formattedDateTime = format(interviewDateTime2, 'EEE MMM dd yyyy hh:mm aa');

      let emailContent = `
          Hi ${candidateDetails.fullName},
          <br>
          <br>
          Your interview for the position of ${jobName} with ${companyName} is scheduled for <b>${formattedDateTime}</b>. Please ensure you arrive on time. The interview will be held at ${location}. Best of luck!
          <br>
          <br>
          If you need any help, please coordinate with ${username} Victaman, at ${candidateDetails.hrEmail}.
          <br>
          <br>
          Regards,
          <br> 
          earlyjobs.in team
          <br> 
          Victaman Enterprises
      `
      const encodedContent = encodeURIComponent(emailContent)
      const queryParameters = {
          method: 'EMS_POST_CAMPAIGN',
          userid: '2000702445',
          password: 'LEP9yt',
          v: '1.1',
          contentType: 'text/html',
          name: 'Interview Scheduled Acknowledgement Mail',
          fromEmailId: 'no-reply@earlyjobs.in',
          subject: `Interview Scheduled by Earlyjobs Victaman`,
          recipients: `${candidateDetails.email}`,
          content: encodedContent,
          replyToEmailID: 'no-reply@earlyjobs.in'
      }
      const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`

      const response = await fetch(url, {method: "GET", mode: "no-cors"})
      // const data = await response.json()
      if(response.ok === true) {
          // console.log(data)
      }
  }

  const sendEmailDayBeforeRem = async (candidateDetails) => {
      const username = Cookies.get('username')
      const jobName = candidateDetails.title
      const companyName = candidateDetails.companyName
      const location = candidateDetails.currentLocation
      const interviewDateTime2 = new Date(`${interviewDateTime.interviewDate}T${interviewDateTime.interviewTime}`);
      const yesterday = sub(interviewDateTime2, { days: 1 });
      const yesterdayDate = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      const formattedDateTime = format(interviewDateTime2, 'EEE MMM dd yyyy hh:mm aa');
      let emailContent = `
          Hi ${candidateDetails.fullName},
          <br>
          <br>
          Just a friendly reminder that your interview for the position of ${jobName} with ${companyName} is scheduled for tomorrow, <b>${formattedDateTime}</b>. Please ensure you arrive on time. The interview will be held at ${location}. Best of luck!
          <br>
          <br>
          If you need any help, please coordinate with ${username}, Victaman at ${candidateDetails.hrEmail}.
          <br>
          <br>
          Regards,
          <br> 
          earlyjobs.in team
          <br> 
          Victaman Enterprises
      `
      const encodedContent = encodeURIComponent(emailContent)
      const queryParameters = {
          method: 'EMS_POST_CAMPAIGN',
          userid: '2000702445',
          password: 'LEP9yt',
          v: '1.1',
          contentType: 'text/html',
          name: 'EarlyJobs Signup',
          fromEmailId: 'no-reply@earlyjobs.in',
          subject: `A reminder about your interview scheduled by Earlyjobs Victaman`,
          recipients: `${candidateDetails.email}`,
          content: encodedContent,
          replyToEmailID: 'no-reply@earlyjobs.in',
          scheduledAt: encodeURIComponent(yesterdayDate + '18:00:00')
      }
      const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}&scheduled_at=${queryParameters.scheduledAt}`

      const response = await fetch(url, {method: "GET", mode: "no-cors"})
      // const data = await response.json()
      if(response.ok === true) {
          // console.log(data)
      }
  }

  const sendEmailOnDay = async (candidateDetails) => {
      const username = Cookies.get('username')
      const jobName = candidateDetails.title
      const companyName = candidateDetails.companyName
      const location = candidateDetails.currentLocation
      const interviewDateTime2 = new Date(`${interviewDateTime.interviewDate}T${interviewDateTime.interviewTime}`);

      // const interviewDateTime = parse(`${candidateDetails.interviewDate} ${candidateDetails.interviewTime}`, new Date());
      const formattedDateTime = format(interviewDateTime2, 'EEE MMM dd yyyy hh:mm aa');

      let emailContent = `
          Good morning ${candidateDetails.fullName},
          <br>
          <br>
          This is a gentle reminder that your interview for the position of ${jobName} with ${companyName} is scheduled for today, <b>${formattedDateTime}</b>. Please ensure you arrive on time. The interview will be held at ${location}. Best of luck!
          <br>
          <br>
          If you need any help, please coordinate with ${username}, Victaman at ${candidateDetails.hrEmail}.
          <br>
          <br>
          Regards,
          <br> 
          earlyjobs.in team
          <br> 
          Victaman Enterprises
      `
      const encodedContent = encodeURIComponent(emailContent)
      const queryParameters = {
          method: 'EMS_POST_CAMPAIGN',
          userid: '2000702445',
          password: 'LEP9yt',
          v: '1.1',
          contentType: 'text/html',
          name: 'EarlyJobs Signup',
          fromEmailId: 'no-reply@earlyjobs.in',
          subject: `A reminder about your interview Scheduled by Earlyjobs Victaman`,
          recipients: `${candidateDetails.email}`,
          content: encodedContent,
          replyToEmailID: 'no-reply@earlyjobs.in',
          scheduledAt: encodeURIComponent(candidateDetails.interviewDate + '07:00:00')
      }
      const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}&scheduled_at=${queryParameters.scheduledAt}`

      const response = await fetch(url, {method: "GET", mode: "no-cors"})
      // const data = await response.json()
      if(response.ok === true) {
          // console.log(data)
      }
  }

  const sendInterviewEmails = async (candidateDetails) => {
      const currentDateTime = new Date();
      const interviewDateTime2 = new Date(interviewDateTime.interviewDate);
      const currentDate = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')}`;
      const interviewDate = `${interviewDateTime2.getFullYear()}-${String(interviewDateTime2.getMonth() + 1).padStart(2, '0')}-${String(interviewDateTime2.getDate()).padStart(2, '0')}`;
      const diff = differenceInDays(parseISO(interviewDate), parseISO(currentDate));
      if(diff === 0) {
          sendEmailAck(candidateDetails)
      } else if(diff === 1) {
          sendEmailAck(candidateDetails)
          sendEmailOnDay(candidateDetails)
      } else if(diff >= 2) {
          sendEmailAck(candidateDetails)
          sendEmailDayBeforeRem(candidateDetails)
          sendEmailOnDay(candidateDetails)
      }
  }

    const rejectCandidate = async (close, id) => {
      try {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/public/applications/${id}`
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
          }
          setLoading(true)
          const response = await fetch(url, options)
          const data = await response.json()
          if(response.ok === true) {
            if(data.error) {
              toast.error(data.error)
            } else {
              close()
              getApplications()
              // toast.success('Candidate rejected successfully')
            }
          } else {
            toast.error(data.error)
          }
      } catch (error) {
        toast.error(error.message)
      }
      setLoading(false)
    }

    const handleShortlistCandidate = async (close, id) => {
      const candidateDetails = candidateList.find(candidate => candidate.applicationId === id)
      if(interviewDateTime.interviewDate === '') {
        setError("Please select interview date")
        return
      } else if(interviewDateTime.interviewTime === '') {
        setError("Please select interview time")
        return
      }
      setError("")
      const interviewDateTimeRaw = new Date(`${interviewDateTime.interviewDate}T${interviewDateTime.interviewTime}`);
      const formattedDateTime = formatISO(interviewDateTimeRaw);
      const hrEmail = Cookies.get('email')
      console.log('formattedDateTime', formattedDateTime)
      const candidateData = {
        ...candidateDetails,
        hrEmail,
        interviewDate: formattedDateTime,
        spokenLanguages: candidateDetails.spokenLanguages.split(','),
        skills: candidateDetails.skills.split(','),
        dateOfBirth: format(parseISO(candidateDetails.dateOfBirth), 'yyyy-MM-dd'),
      }
      try {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate/add`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(candidateData)
        }
        setLoading(true)
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                setError("")
                setInterviewDateTime({
                  interviewDate: '',
                  interviewTime: ''
                })
                sendInterviewEmails(candidateData)
                close()
                toast.success('Candidate shortlisted successfully')
                rejectCandidate(close, id)
            }
        } else {
            setError(data.error)
        }
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
  
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
            {'<<'}
          </button>
        );
      }
  
      if (type === 'next') {
        return (
          <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
            {'>>'}
          </button>
        );
      }
  
      if (type === 'jump-prev' || type === 'jump-next') {
        return <span className="pagination-dots" title='more'>...</span>;
      }
  
      return element;
    };

    const renderNoCandidates = () => {
        if (apiStatus === apiStatusConstant.inProgress) {
          return (
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
          )
        }
        else return "no records found!"
    }

    const formatDate = (date) => {
      const dbDate = parseISO(date);
      const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
      return formattedDate;
    }

    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const renderShortlistPopup = (close, id) => {
      return (
        <div className="modal-form shortlist-modal-form">
          <button className="modal-close-button" onClick={close}>&times;</button>
          <h2 className="shortlist-modal-heading">Shortlist Candidate</h2>
          <label className="homepage-label" htmlFor='interviewDate'>Schedule Interveiw Date time<span className='hr-form-span'> *</span></label>
          <div className="interview-input-con homepage-input">
              <input type="date" name='interviewDate' className="homepage-input interview-input" id='interviewDate' min={dateString} value={interviewDateTime.interviewDate} onChange={handleInterviewDateTime} />
              <input type="time" name='interviewTime' className="homepage-input interview-input" id='interviewDate' value={interviewDateTime.interviewTime} onChange={handleInterviewDateTime} />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className='achieve-button-con' style={{marginTop: '0px'}}>
              <button className='job-details-upload-candidate-button' onClick={() => handleShortlistCandidate(close, id)}>
              {loading ?
                  <span className='hr-oval'>
                      <Oval
                          visible={true}
                          height="20"
                          width="20"
                          color="#ffffff"
                          strokeWidth="4"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          secondaryColor="#ffffff"
                          wrapperClass=""
                          className='hr-oval'
                      />
                  </span>
                  :
                  "Shortlist"
                }
              </button>
              <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>Cancel</button>
          </div>
      </div>
      )
    }

    const renderRejectPopup = (close, name, id) => {
      return (
        <div className="modal-form shortlist-modal-form">
          <button className="modal-close-button" onClick={close}>&times;</button>
          <h2 className="shortlist-modal-heading">Reject Candidate</h2>
          <p>Are you sure you want to reject {name}'s Application?</p>
          <div className='achieve-button-con' style={{marginTop: '0px'}}>
              <button className='job-details-upload-candidate-button' onClick={() => rejectCandidate(close, id)}>
              {loading ?
                  <span className='hr-oval'>
                      <Oval
                          visible={true}
                          height="20"
                          width="20"
                          color="#ffffff"
                          strokeWidth="4"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          secondaryColor="#ffffff"
                          wrapperClass=""
                          className='hr-oval'
                      />
                  </span>
                  :
                  "YES"
                }
              </button>
              <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>NO</button>
          </div>
      </div>
      )
    }

    const renderCandidateDetails = (candidateDetails, close) => {
      const date = parseISO(candidateDetails.dateOfBirth);
      const formattedDOB = format(date, 'MMM dd yyyy');
      return (
        <div className="candidate-details-modal-con application-modal">
            <h1 className="candidate-details-heading">Applicant Details</h1>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Full Name: </p>
                <p className="candidate-details-sub-text">{candidateDetails.fullName}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Father Name: </p>
                <p className="candidate-details-sub-text">{candidateDetails.fatherName}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Email: </p>
                <p className="candidate-details-sub-text">{candidateDetails.email}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Phone: </p>
                <p className="candidate-details-sub-text">{candidateDetails.phone}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Date of birth: </p>
                <p className="candidate-details-sub-text">{formattedDOB}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Gender: </p>
                <p className="candidate-details-sub-text">{candidateDetails.gender}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Aadhaar Number: </p>
                <p className="candidate-details-sub-text">{candidateDetails.aadharNumber}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Highest Qualification: </p>
                <p className="candidate-details-sub-text">{candidateDetails.highestQualification}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Current Location: </p>
                <p className="candidate-details-sub-text">{candidateDetails.currentLocation}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Spoken Languages: </p>
                <p className="candidate-details-sub-text">{candidateDetails.spokenLanguages}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Experience: </p>
                <p className="candidate-details-sub-text">{candidateDetails.experienceInYears} Years {candidateDetails.experienceInMonths} Months</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Job Category: </p>
                <p className="candidate-details-sub-text">{candidateDetails.jobCategory}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Skills: </p>
                <p className="candidate-details-sub-text">{candidateDetails.skills}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Employment Type: </p>
                <p className="candidate-details-sub-text">{candidateDetails.employmentType}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Shift Timings: </p>
                <p className="candidate-details-sub-text">{candidateDetails.shiftTimings}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Created At: </p>
                <p className="candidate-details-sub-text">{candidateDetails.createdAt}</p>
            </div>
            <button className="candidate-details-close-btn" onClick={close}>
                &times;
            </button>
        </div>
      )
    }

    return (
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>Applications</span></h1>

            <div className="job-section-select-filter-container">
              <div className="job-section-select-container"> 
                  <label className="homepage-label view-candidates-label" htmlFor='resume'>Select Job</label>
                  <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={jobId} onChange={handleJobIdChange}>
                      <option value=''>All Jobs</option>
                      {
                          allJobsList.map(job => (
                              <option key={job.id} value={job.id}>{job.role} - {job.compname}</option>
                          ))
                      }
                  </select>
              </div>
              <div className="job-section-select-container"> 
                  <label className="homepage-label view-candidates-label" htmlFor='interview-date'>Applied Date (From - To)</label>
                  <div className="date-con"> 
                    <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={fromDate} onChange={handleFromDateChange} />
                    <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={toDate} onChange={handleToDateChange} />
                  </div>
              </div>
              <div className="user-view-search-con my-hr-recruiters-search-con view-candidates-search-input-con">
                  <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, phone or company" />
                  <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={getApplications} >
                      <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                  </div>
              </div>
              {candidateList.length > 0 && 
                <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                  <ExcelDownloadButton  getData={getApplicationsForExcel} /> 
                </div>
              }
              <div className="rows-count-con">
                <span className="rows-count-text">Total Results:</span>
                <span className="rows-count-number">`{totalItems}`</span>
              </div>
            </div>


            <div className='table-candidate-container'>
               <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 ? "empty-candidates" : ""}`}>
                  <tr className="job-details-candidates-table-heading">
                    <th className="job-details-candidates-table-heading-cell">Name</th>
                    <th className="job-details-candidates-table-heading-cell">Company Name</th>
                    <th className="job-details-candidates-table-heading-cell">Job Title</th>
                    <th className="job-details-candidates-table-heading-cell">Phone</th>
                    <th className="job-details-candidates-table-heading-cell">Email</th>
                    <th className="job-details-candidates-table-heading-cell">Applied At</th>
                    <th className="job-details-candidates-table-heading-cell">Action</th>
                  </tr>
                  {
                    candidateList.length > 0 && candidateList.map((eachItem, index) => {
                      return (
                        <tr key={eachItem.applicationId} className="job-details-candidates-table-row">
                            <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover">
                              <Popup
                                  trigger={<p className="job-details-candidates-table-cell-hover">{eachItem.fullName}</p>}
                                  modal
                              >
                                  {close => (
                                  <div className="modal">
                                      {renderCandidateDetails(eachItem, close)}
                                  </div>
                                  )}
                              </Popup>
                            </td>
                            <td className="job-details-candidates-table-cell">{eachItem.companyName}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.title}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.createdAt}</td>
                            <td className="job-details-candidates-table-cell">
                              <div className='action-dropdown'>
                                    <Popup
                                        trigger={<button className="application-action-button-2" type="button">Shortlist</button>}
                                        modal
                                    >
                                        {close => (
                                        <div className="modal">
                                            {renderShortlistPopup(close, eachItem.applicationId)}
                                        </div>
                                        )}
                                    </Popup>
                                    <Popup
                                        trigger={<button className="application-action-button-2" type="button">Reject</button>}
                                        modal
                                    >
                                        {close => (
                                        <div className="modal">
                                            {renderRejectPopup(close, eachItem.fullName, eachItem.applicationId)}
                                        </div>
                                        )}
                                    </Popup>
                                  </div>
                            </td>
                        </tr>
                    )})
                  }
                </table>
                {candidateList.length === 0 &&
                <p className='no-candidates-error'>
                    { renderNoCandidates() }
                </p>}
            </div>
            <div className="job-details-candidates-pagination-con">
              <button className="login-button candidate-button" type="button" onClick={() => setShowCandidateForm(0)}>Back</button>
              <Pagination
                current={page}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                className="pagination-class pagination-class-candidates"
                itemRender={itemRender}
                showSizeChanger
              />
            </div>
        </div>
    )
}

export default Applications;