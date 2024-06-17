import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {Oval} from 'react-loader-spinner'
import { toast } from "react-toastify";
import Pagination from 'rc-pagination';
import { format, parseISO } from 'date-fns'
import { IoSearchSharp } from 'react-icons/io5';
import UpdateCandidateStatus from "./UpdateCandidateStatus"
import './style.css'
import ExcelDownloadButton from "../ExcelDownloadButton";

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

const ViewCandidates = ({onShowCandidateDetails, onShowScheduleInterviewPopup, onShowSelectedOrJoinedPopup, jobsList, setShowCandidateForm}) => {
    const [candidateList, setCandidateList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [jobId, setJobId] = useState('')
    const [applicationStatus, setApplicationStatus] = useState('')
    const [selectHr, setSelectHr] = useState('')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0);
    const [hrList, setHrList] = useState([])
    const [allJobsList, setAllJobsList] = useState([])
    const [searchInput, setSearchInput] = useState('');

    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(date)
    const [toDate, setToDate] = useState(date)

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    useEffect(() => {
      getAllJobsList()
    }, [])

    useEffect(() => {
        if(jobId !== '') {
            getCandidates(selectHr, applicationStatus, page)
        } else {
            getInitialCandidates(selectHr, applicationStatus, page)
        }
    }, [jobId, applicationStatus, selectHr, page, fromDate, toDate])

    const handleJobIdChange = (event) => {
        if(jobId === '') {
          setHrList([])
        }
        setJobId(event.target.value)
        setApplicationStatus('')
        setPage(1)
    }

    const handleApplicationStatusChange = (event) => {
        setApplicationStatus(event.target.value)
        setPage(1)
    }

    const handleChangeSearchInput = (event) => {
      setSearchInput(event.target.value);
    }

    const handleSelectHrChange = (event) => {
      setSelectHr(event.target.value)
      setPage(1)
    }

    const handleFromDateChange = (event) => {
      setFromDate(event.target.value)
      setPage(1)
    }

    const handleToDateChange = (event) => {
      setToDate(event.target.value)
      setPage(1)
    }

    const onClickEnter = (event) => {
      if (event.key === 'Enter') {
        if(jobId !== '') {
          getCandidates(selectHr, applicationStatus, page)
        } else {
          getInitialCandidates(selectHr, applicationStatus, page)
        }
      }
    }

    const onClickSearch = () => {
      if(jobId !== '') {
        getCandidates(selectHr, applicationStatus, page)
      } else {
        getInitialCandidates(selectHr, applicationStatus, page)
      }
    }

    const formatDate = (date) => {
      const dbDate = parseISO(date);
      const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
      return formattedDate;
    }

    const dateValidation = (fromDate, toDate) => {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      if(from.getTime() > to.getTime()) {
        alert("FROM date should be less or equal to TO date")
        const today = new Date();
        const date = today.toISOString().split('T')[0];
        setFromDate(date)
        setToDate(date)
        return false
      }
      return true
    }


    const getInitialCandidates = async (hrEmail, status, page) => {
      if(!dateValidation(fromDate, toDate)) return;
      setApiStatus(apiStatusConstant.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      let email = Cookies.get('email')
      const role = Cookies.get('role')
      const apiUrl = `${backendUrl}/jobs/candidate/initial/${email}/?&offerStatus=${status}&fromDate=${fromDate}&toDate=${toDate}&role=${role}&search=${searchInput}&page=${page}`
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
          console.log("get candidates raw api data", data)
          const formattedData = data.candidates.map(eachItem => ({
            applicationId: eachItem.application_id,
            jobId: eachItem.job_id,
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
          const appliedByList = data.candidates.map(eachItem => eachItem.applied_by)
          const filteredHrList = data.hrList.filter(hr => {
            return appliedByList.includes(hr.email)
          })
          console.log("filtered hr list", filteredHrList)
          setTotalItems(data.count)
          setCandidateList(formattedData)
          setApiStatus(apiStatusConstant.success)
        }
      } else {
        setApiStatus(apiStatusConstant.failure)
      }
    }

    const getInitialCandidatesForExcel = async (hrEmail, status, page) => {
      if(!dateValidation(fromDate, toDate)) return;
      const jwtToken = Cookies.get('jwt_token')
      let email = Cookies.get('email')
      const role = Cookies.get('role')
      const apiUrl = `${backendUrl}/jobs/candidates/initial/excel/${email}/?&offerStatus=${status}&fromDate=${fromDate}&toDate=${toDate}&role=${role}&search=${searchInput}`
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
          toast.error(data.error)
        } else {
          console.log("get candidates raw api data", data)
          const formattedData = data.map(eachItem => ({
            applicationId: eachItem.application_id,
            jobId: eachItem.job_id,
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
          return formattedData
        }
      } else {
        toast.error(data.error)
      }
    }

    const getCandidates = async (hrEmail, status, page) => {
        if(!dateValidation(fromDate, toDate)) return;
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        let email = Cookies.get('email')
        const role = Cookies.get('role')
        if(role === 'HR') hrEmail = email
        const apiUrl = `${backendUrl}/jobs/candidate/${jobId}?email=${hrEmail}&role=${role}&offerStatus=${status}&fromDate=${fromDate}&toDate=${toDate}&search=${searchInput}&page=${page}`
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
            console.log("get candidates raw api data", data)
            const formattedData = data.candidates.map(eachItem => ({
              applicationId: eachItem.application_id,
              jobId: eachItem.job_id,
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
            setHrList(data.hrList)
            setTotalItems(data.count)
            setCandidateList(formattedData)
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          setApiStatus(apiStatusConstant.failure)
        }
    }

    const getCandidatesForExcel = async (hrEmail, status) => {
      if(!dateValidation(fromDate, toDate)) return;
      setApiStatus(apiStatusConstant.inProgress)
      const jwtToken = Cookies.get('jwt_token')
      let email = Cookies.get('email')
      const role = Cookies.get('role')
      if(role === 'HR') hrEmail = email
      const apiUrl = `${backendUrl}/jobs/candidates/excel/${jobId}?email=${hrEmail}&role=${role}&offerStatus=${status}&fromDate=${fromDate}&toDate=${toDate}&search=${searchInput}`
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
          toast.error(data.error)
        } else {
          console.log("get candidates raw api data", data)
          const formattedData = data.map(eachItem => ({
            applicationId: eachItem.application_id,
            jobId: eachItem.job_id,
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
          return formattedData
        }
      } else {
        toast.error(data.error)
      }
  }

    const getAllJobsList = async () => {
      const email = Cookies.get('email')
      const role = Cookies.get('role')
      let apiUrl = ""
      if (role === 'AC') {
        apiUrl = `${backendUrl}/jobs/account-manager/all/${email}`
      } else if (role === 'HR') {
        apiUrl = `${backendUrl}/jobs/hr/all/${email}`
      } else if (role === 'BDE') {
        apiUrl = `${backendUrl}/jobs/bde/all/${email}`
      } else {
        apiUrl = `${backendUrl}/admin/get-admin-jobs/all`
      }
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
            {'<'}
          </button>
        );
      }
  
      if (type === 'next') {
        return (
          <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
            {'>'}
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
       if(jobId === "") return "Select a job to view candidates"
        else return "no records found!"
    }

    return (
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>Candidates</span></h1>
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
                <label className="homepage-label view-candidates-label" htmlFor='resume'>Application Status</label>
                <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={applicationStatus} onChange={handleApplicationStatusChange}>
                    <option value=''>All status</option>
                    <option value='Selected'>Selected</option>
                    <option value='Attended'>Attended</option>
                    <option value='Not Attended'>Not Attended</option>
                    <option value='Rejected'>Rejected</option>
                    <option value='Ongoing'>Ongoing</option>
                    <option value='Rescheduled'>Rescheduled</option>
                    <option value='Joined'>Joined</option>
                </select>
              </div>
              {
                Cookies.get('role') !== 'HR' && (
                  <div className="job-section-select-container"> 
                    <label className="homepage-label view-candidates-label" htmlFor='resume'>Filter By Recruiter</label>
                    <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={selectHr} onChange={handleSelectHrChange}>
                        <option value=''>Select HR</option>
                        {
                          hrList.map(hr => (
                              <option key={hr.email} value={hr.email}>{hr.username}</option>
                          ))
                        }
                    </select>
                  </div>
                )
              }
              <div className="job-section-select-container"> 
                  <label className="homepage-label view-candidates-label" htmlFor='interview-date'>Filter By Interview Date (From - To)</label>
                  <div className="date-con"> 
                    <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={fromDate} onChange={handleFromDateChange} />
                    <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={toDate} onChange={handleToDateChange} />
                  </div>
              </div>
              <div className="user-view-search-con my-hr-recruiters-search-con view-candidates-search-input-con">
                  <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, phone or company" />
                  <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={onClickSearch} >
                      <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                  </div>
              </div>
              {candidateList.length > 0 && 
                <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                  <ExcelDownloadButton  getData={jobId === "" ? getInitialCandidatesForExcel : getCandidatesForExcel} /> 
                </div>
              }
              <div className="rows-count-con">
                <span className="rows-count-text">Total Results:</span>
                <span className="rows-count-number">`{totalItems}`</span>
              </div>
            </div>
            <div className='table-candidate-container'>
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
                    candidateList.length > 0 && candidateList.map(eachItem => {
                      const jobId1 = jobId==='' ? eachItem.jobId : jobId;
                    return(
                        <UpdateCandidateStatus key={eachItem.applicationId} onShowCandidateDetails={onShowCandidateDetails} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} onShowSelectedOrJoinedPopup={onShowSelectedOrJoinedPopup} candidateDetails={eachItem}  jobId={jobId1} jobsList={allJobsList} candidateList={candidateList} setCandidateList={setCandidateList} />
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

export default ViewCandidates