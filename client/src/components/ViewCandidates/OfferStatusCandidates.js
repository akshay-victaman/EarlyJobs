import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Pagination from 'rc-pagination';
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { format, parseISO, differenceInDays } from 'date-fns';
import { MdOutlineEditCalendar } from 'react-icons/md';
import ExcelDownloadButton from '../ExcelDownloadButton';
import UpdateTenureStatus from './UpdateTenureStatus';
import UpdateVerificationStatus from './UpdateVerificationStatus';

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const OfferStatusCandidates = ({ showCandidateForm, setShowCandidateForm, onShowCandidateDetails, jobsList, onShowScheduleInterviewPopup }) => {
    let offerStatus = '';
    if(showCandidateForm === 5) offerStatus = 'Selected';
    else if(showCandidateForm === 6 || showCandidateForm === 12) offerStatus = 'Joined';
    else if(showCandidateForm === 7) offerStatus = 'Ongoing';
    else if(showCandidateForm === 8) offerStatus = 'Rescheduled';
    else if(showCandidateForm === 9) offerStatus = 'Attended';
    else if(showCandidateForm === 10) offerStatus = 'Not Attended';
    else if(showCandidateForm === 11) offerStatus = 'Rejected';
    const [searchInput, setSearchInput] = useState('');
    const [candidateList, setCandidateList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [jobId, setJobId] = useState('')
    const [allJobsList, setAllJobsList] = useState([])
    const [hrList, setHrList] = useState([])
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(date)
    const [toDate, setToDate] = useState(date)
    const [selectHr, setSelectHr] = useState('')
    const [loading, setLoading] = useState(false);
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const [verificationStatus, setVerificationStatus] = useState('')
    const [verificationCount, setVerificationCount] = useState({})

    useEffect(() => {
        if(Cookies.get('role') === 'BDE') {
          getOfferStatusCandidatesForBDE()
        } else {
          getOfferStatusCandidates()
        }
        getAllJobsList()
    }, [page, offerStatus, jobId, selectHr, fromDate, toDate, verificationStatus])

    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
      setPage(page)
    };

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const handleJobIdChange = (event) => {
      if(jobId === '') {
        setHrList([])
      }
      setJobId(event.target.value)
      setPage(1)
    }

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            if (Cookies.get('role') === 'BDE') {
              getOfferStatusCandidatesForBDE()
            } else {
              getOfferStatusCandidates();
            }
            setPage(1);
        }
    };

    const handleSelectHrChange = (event) => {
      setSelectHr(event.target.value)
      setPage(1)
    }

    const handleVerificationStatusChange = (event) => {
      setVerificationStatus(event.target.value)
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

    const getAllJobsList = async () => {
      const role = Cookies.get('role')
      const backendUrl = process.env.REACT_APP_BACKEND_API_URL
      let apiUrl = ""
      if (role === 'SHM') {
        apiUrl = `${backendUrl}/jobs/senior-hm/all/`
      } else if (role === 'AC') {
        apiUrl = `${backendUrl}/jobs/hm/all/`
      } else if (role === 'HR') {
        apiUrl = `${backendUrl}/jobs/hr/all/`
      } else if (role === 'BDE') {
        apiUrl = `${backendUrl}/jobs/bde/all/`
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
            city: eachItem.city,
            area: eachItem.area,
          }))
          console.log('updated data',updatedData)
  
          setAllJobsList(updatedData)
        }
      } else {
        alert(data.error)
      }
    }

    const calculateDayCount = (date, tenure) => {
        const givenDate = parseISO(date);
        const currentDate = new Date();
        const diffInDays = differenceInDays(givenDate, currentDate);
        return tenure - Math.abs(diffInDays);
    }


    const getOfferStatusCandidates = async () => {
        if(!dateValidation(fromDate, toDate)) return;
        setApiStatus(apiStatusConstant.inProgress);
        const role = Cookies.get('role');
        let email = Cookies.get('email');
        if(selectHr !== '') {
          email = selectHr
        }
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate?email=${email}&search=${searchInput}&fromDate=${fromDate}&toDate=${toDate}&jobId=${jobId}&role=${role}&offerStatus=${offerStatus}&page=${page}`
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
                console.log(data.candidates)
                const updatedData = data.candidates.map(eachItem => ({
                  applicationId: eachItem.application_id,
                  candidateId: eachItem.candidate_id,
                  name: eachItem.name,
                  companyName: eachItem.company_name,
                  area: eachItem.area,
                  city: eachItem.city,
                  phone: eachItem.phone,
                  appliedBy: eachItem.applied_by,
                  interviewDate: eachItem.interview_date ? formatDate(eachItem.interview_date) : null,
                  offeredDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : null,
                  jobId: eachItem.job_id,
                  hrName: eachItem.hr_name,
                  dayCount: eachItem.offered_date ? calculateDayCount(eachItem.offered_date, eachItem.tenure_in_days) : null,
                  tenureStatus: eachItem.tenure_status,
                  verificationStatus: eachItem.verification_status,
                }))
                setCandidateList(updatedData);
                setHrList(data.hrEmails)
                setTotalItems(data.count);
                setVerificationCount(data.verificationCount)
                setApiStatus(apiStatusConstant.success);
            }
        } else {
            setApiStatus(apiStatusConstant.failure);
        }
        } catch (error) {
        setApiStatus(apiStatusConstant.failure);
        }
    }

    const getOfferStatusCandidatesForExcel = async () => {
        if(!dateValidation(fromDate, toDate)) return;
        const role = Cookies.get('role');
        let email = Cookies.get('email');
        if(selectHr !== '') {
          email = selectHr
        }
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidates/excel?email=${email}&fromDate=${fromDate}&toDate=${toDate}&search=${searchInput}&jobId=${jobId}&role=${role}&offerStatus=${offerStatus}`
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
                toast.error(data.error);
            } else {
                console.log(data)
                const updatedData = data.map(eachItem => ({
                  applicationId: eachItem.application_id,
                  candidateId: eachItem.candidate_id,
                  name: eachItem.name,
                  companyName: eachItem.company_name,
                  area: eachItem.area,
                  city: eachItem.city,
                  phone: eachItem.phone,
                  appliedBy: eachItem.applied_by,
                  interviewDate: eachItem.interview_date ? formatDate(eachItem.interview_date) : null,
                  offeredDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : null,
                  jobId: eachItem.job_id,
                  hrName: eachItem.hr_name,
                  verificationStatus: eachItem.verification_status,
                }))
                return updatedData;
            }
        } else {
            toast.error("Failed to download excel");
        }
        } catch (error) {
          toast.error("Failed to download excel");
        }
    }

    const getOfferStatusCandidatesForBDE = async () => {
      if(!dateValidation(fromDate, toDate)) return;
      setApiStatus(apiStatusConstant.inProgress);
      let email = null;
      if(selectHr !== '') {
        email = selectHr
      }
      const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/bde/candidate?email=${email}&search=${searchInput}&fromDate=${fromDate}&toDate=${toDate}&jobId=${jobId}&offerStatus=${offerStatus}&verificationStatus=${verificationStatus}&page=${page}`
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
              const updatedData = data.candidates.map(eachItem => ({
                applicationId: eachItem.application_id,
                candidateId: eachItem.candidate_id,
                name: eachItem.name,
                companyName: eachItem.company_name,
                area: eachItem.area,
                city: eachItem.city,
                phone: eachItem.phone,
                appliedBy: eachItem.applied_by,
                interviewDate: eachItem.interview_date ? formatDate(eachItem.interview_date) : null,
                offeredDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : null,
                jobId: eachItem.job_id,
                hrName: eachItem.hr_name,
                dayCount: eachItem.offered_date ? calculateDayCount(eachItem.offered_date, eachItem.tenure_in_days) : null,
                tenureStatus: eachItem.tenure_status,
                verificationStatus: eachItem.verification_status,
              }))
              setCandidateList(updatedData);
              setHrList(data.hrEmails)
              setTotalItems(data.count);
              setVerificationCount(data.verificationCount)
              setApiStatus(apiStatusConstant.success);
          }
      } else {
          setApiStatus(apiStatusConstant.failure);
      }
      } catch (error) {
      setApiStatus(apiStatusConstant.failure);
      }
    }

    const getOfferStatusCandidatesForBDEExcel = async () => {
      if(!dateValidation(fromDate, toDate)) return;
      let email = null;
      if(selectHr !== '') {
        email = selectHr
      }
      const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/bde/candidates/excel?email=${email}&fromDate=${fromDate}&toDate=${toDate}&search=${searchInput}&jobId=${jobId}&offerStatus=${offerStatus}&verificationStatus=${verificationStatus}`
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
              toast.error(data.error);
          } else {
              console.log(data)
              const updatedData = data.map(eachItem => ({
                applicationId: eachItem.application_id,
                candidateId: eachItem.candidate_id,
                name: eachItem.name,
                companyName: eachItem.company_name,
                area: eachItem.area,
                city: eachItem.city,
                phone: eachItem.phone,
                appliedBy: eachItem.applied_by,
                interviewDate: eachItem.interview_date ? formatDate(eachItem.interview_date) : null,
                offeredDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : null,
                jobId: eachItem.job_id,
                hrName: eachItem.hr_name,
                verificationStatus: eachItem.verification_status,
              }))
              return updatedData;
          }
      } else {
          toast.error("Failed to download excel");
      }
      } catch (error) {
        toast.error("Failed to download excel");
      }
  }    

    const updateTenureStatus = async (applicationId, tenureStatus) => {
        setLoading(true);
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate/tenure-status/update`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({
                applicationId,
                tenureStatus
            })
        }
        try {
        const response = await fetch(url, options)
        const data = await response.json()
        console.log('data', data)
        if(response.ok === true) {
            if(data.error) {
                toast.error(data.error);
            } else {
                toast.success(data.success);
                const updatedData = candidateList.map(eachItem => {
                    if(eachItem.applicationId === applicationId) {
                        return {
                            ...eachItem,
                            tenureStatus
                        }
                    }
                    return eachItem;
                })
                setCandidateList(updatedData);
            }
        } else {
            toast.error("Failed to update tenure status");
        }
        } catch (error) {
        toast.error("Failed to update tenure status");
        }
        setLoading(false);
    }

    const updateVerificationStatus = async (applicationId, verificationStatus) => {
      setLoading(true);
      const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate/verification-status/update`
      const options = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt_token')}`
          },
          body: JSON.stringify({
              applicationId,
              verificationStatus
          })
      }
      try {
      const response = await fetch(url, options)
      const data = await response.json()
      console.log('data', data)
      if(response.ok === true) {
          if(data.error) {
              toast.error(data.error);
          } else {
              toast.success(data.success);
              const updatedData = candidateList.map(eachItem => {
                  if(eachItem.applicationId === applicationId) {
                      return {
                          ...eachItem,
                          verificationStatus
                      }
                  }
                  return eachItem;
              })
              setCandidateList(updatedData);
          }
      } else {
          toast.error("Failed to update verification status");
      }
      } catch (error) {
      toast.error("Failed to update verification status");
      }
      setLoading(false);
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

    return (
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>{showCandidateForm === 12 ? "Tenure Status" : `${offerStatus} Candidates`}</span></h1>

            <div className="job-section-select-filter-container">
              <div className="job-section-select-container"> 
                  <label className="homepage-label view-candidates-label" htmlFor='resume'>Select Job</label>
                  <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={jobId} onChange={handleJobIdChange}>
                      <option value=''>All Jobs</option>
                      {
                          allJobsList.map(job => (
                              <option key={job.id} value={job.id}>{job.role} - {job.compname} - {job.city} - {job.area}</option>
                          ))
                      }
                  </select>
              </div>
              {
                (Cookies.get('role') === 'BDE' && showCandidateForm === 6) && (
                  <div className="job-section-select-container"> 
                    <label className="homepage-label view-candidates-label" htmlFor='handleVerificationStatusChange'>Filter By Verification Status</label>
                    <select className="homepage-input view-candidates-select" name='handleVerificationStatusChange' id='handleVerificationStatusChange' value={verificationStatus} onChange={handleVerificationStatusChange}>
                        <option value=''>Select Verification Status</option>
                        <option value='Verified'>Verified</option>
                        <option value='Not Verified'>Not Verified</option>
                        <option value='Unknown'>Unknown</option>
                        <option value='null'>No Action</option>
                    </select>
                  </div>
                )
              }
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
                  <label className="homepage-label view-candidates-label" htmlFor='interview-date'>Filter By {showCandidateForm === 5 ? "Selection Date" : showCandidateForm === 6 ? "Joining Date" : "Interview Date"} (From - To)</label>
                  <div className="date-con"> 
                    <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={fromDate} onChange={handleFromDateChange} />
                    <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={toDate} onChange={handleToDateChange} />
                  </div>
              </div>
              <div className="user-view-search-con my-hr-recruiters-search-con view-candidates-search-input-con">
                  <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, phone or company" />
                  <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={Cookies.get('role') === 'BDE' ? getOfferStatusCandidatesForBDE : getOfferStatusCandidates} >
                      <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                  </div>
              </div>
              {candidateList.length > 0 && 
                <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                    <ExcelDownloadButton getData={Cookies.get('role') === 'BDE' ? getOfferStatusCandidatesForBDEExcel: getOfferStatusCandidatesForExcel} /> 
                </div>
              }
              <div className="rows-count-con">
                <span className="rows-count-text">Total Results:</span>
                <span className="rows-count-number">`{totalItems}`</span>
              </div>
              {showCandidateForm === 6 &&
                <>
                  <div className="rows-count-con">
                    <span className="rows-count-text">Verified:</span>
                    <span className="rows-count-number">`{verificationCount.verified_count ? verificationCount.verified_count : 0}`</span>
                  </div>
                  <div className="rows-count-con">
                    <span className="rows-count-text">Not Verified:</span>
                    <span className="rows-count-number">`{verificationCount.not_verified_count ? verificationCount.not_verified_count : 0}`</span>
                  </div>
                  <div className="rows-count-con">
                    <span className="rows-count-text">Unknown:</span>
                    <span className="rows-count-number">`{verificationCount.unknown_count ? verificationCount.unknown_count : 0}`</span>
                  </div>
                  <div className="rows-count-con">
                    <span className="rows-count-text">No Action:</span>
                    <span className="rows-count-number">`{verificationCount.null_count ? verificationCount.null_count : 0}`</span>
                  </div>
                </>
              }
            </div>


            <div className='table-candidate-container'>
               <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 ? "empty-candidates" : ""}`}>
                  <tr className="job-details-candidates-table-heading">
                    <th className="job-details-candidates-table-heading-cell">Name</th>
                    <th className="job-details-candidates-table-heading-cell">Company Name</th>
                    <th className="job-details-candidates-table-heading-cell">Location</th>
                    <th className="job-details-candidates-table-heading-cell">Phone</th>
                    <th className="job-details-candidates-table-heading-cell">Shortlisted By</th>
                    { (showCandidateForm !== 7) && <th className="job-details-candidates-table-heading-cell">{showCandidateForm === 10 ? "Was Planned On" : `${offerStatus} Date`}</th>}
                    {showCandidateForm === 12 && <th className="job-details-candidates-table-heading-cell">Days Left / Status</th>}
                    {(showCandidateForm === 5 || showCandidateForm === 6) && <th className="job-details-candidates-table-heading-cell">Verification Status</th>}
                    {(showCandidateForm === 12 || ((showCandidateForm === 5 || showCandidateForm === 6) && Cookies.get('role') === 'BDE')) && <th className="job-details-candidates-table-heading-cell">Update Status</th>}
                  </tr>
                  {
                    candidateList.length > 0 && candidateList.map(eachItem => {
                      const jobId1 = jobId==='' ? eachItem.jobId : jobId;
                      return (
                        <tr key={eachItem.email} className="job-details-candidates-table-row">
                            <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.candidateId)}>
                                {eachItem.name}
                            </td>
                            <td className="job-details-candidates-table-cell">{eachItem.companyName}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.area}, {eachItem.city}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.appliedBy}</td>
                            {(showCandidateForm !== 7) && 
                              <td className="job-details-candidates-table-cell">
                                {(showCandidateForm === 8 || showCandidateForm === 9 || showCandidateForm === 10 || showCandidateForm === 11) ? eachItem.interviewDate : eachItem.offeredDate !== null ? eachItem.offeredDate.slice(0, -8) : "Null"}
                                {showCandidateForm === 11 &&
                                  <button type="button" className="shedule-interview-button" onClick={() => onShowScheduleInterviewPopup(jobId1, {...eachItem, candidateName: eachItem.name}, allJobsList, setCandidateList, candidateList)} >
                                      <MdOutlineEditCalendar className="shedule-icon" />
                                  </button>
                                }
                              </td>
                            }
                            {showCandidateForm === 12 && 
                              <td className="job-details-candidates-table-cell">
                                {eachItem.dayCount > 0 ? eachItem.dayCount : "Expired"}
                                {eachItem.tenureStatus !== null && " / " + eachItem.tenureStatus}
                              </td>
                            }
                            {(showCandidateForm === 5 || showCandidateForm === 6)  && 
                              <td className="job-details-candidates-table-cell">
                                {eachItem.verificationStatus !== null ? eachItem.verificationStatus : "--"}
                              </td>
                            }
                            {(showCandidateForm === 12 || ((showCandidateForm === 5 || showCandidateForm === 6) && Cookies.get('role') === 'BDE')) && 
                              <td className="job-details-candidates-table-cell">
                                  {
                                      !loading ? 
                                      (   Cookies.get('role') === 'BDE' ?
                                          <UpdateVerificationStatus candidate={eachItem} onUpdate={updateVerificationStatus} />
                                          :
                                          <UpdateTenureStatus candidate={eachItem} onUpdate={updateTenureStatus} />
                                      )
                                      :
                                      <p className="loading-text">Please Wait...</p>
                                  }
                              </td>
                            }
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

export default OfferStatusCandidates;