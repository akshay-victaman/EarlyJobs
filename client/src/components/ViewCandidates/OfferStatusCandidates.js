import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Pagination from 'rc-pagination';
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns';
import { MdOutlineEditCalendar } from 'react-icons/md';

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const OfferStatusCandidates = ({ showCandidateForm, setShowCandidateForm, onShowCandidateDetails, jobsList, onShowScheduleInterviewPopup }) => {
    let offerStatus = '';
    if(showCandidateForm === 5) offerStatus = 'Selected';
    else if(showCandidateForm === 6) offerStatus = 'Joined';
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
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);

    useEffect(() => {
        getOfferStatusCandidates()
        getAllJobsList()
    }, [page, offerStatus, jobId, selectHr])

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
            getOfferStatusCandidates();
            setPage(1);
        }
    };

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

    const getAllJobsList = async () => {
      const email = Cookies.get('email')
      const role = Cookies.get('role')
      const backendUrl = process.env.REACT_APP_BACKEND_API_URL
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

    const getOfferStatusCandidates = async () => {
        setApiStatus(apiStatusConstant.inProgress);
        const role = Cookies.get('role');
        let email = Cookies.get('email');
        if(selectHr !== '') {
          email = selectHr
        }
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate?email=${email}&search=${searchInput}&jobId=${jobId}&role=${role}&offerStatus=${offerStatus}&page=${page}`
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
                setCandidateList(data.candidates);
                setHrList(data.hrEmails)
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
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>{offerStatus} Candidates</span></h1>

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
                  <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={getOfferStatusCandidates} >
                      <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                  </div>
              </div>
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
                    <th className="job-details-candidates-table-heading-cell">Phone</th>
                    <th className="job-details-candidates-table-heading-cell">Shortlisted By</th>
                    { (showCandidateForm !== 7) && <th className="job-details-candidates-table-heading-cell">{showCandidateForm === 10 ? "Was Planned On" : `${offerStatus} Date`}</th>}
                  </tr>
                  {
                    candidateList.length > 0 && candidateList.map(eachItem => {
                      const jobId1 = jobId==='' ? eachItem.job_id : jobId;
                      // const {candidateId, jobId, interviewDate, hrEmail, offerStatus} = candidate;

                      // application_id
                      // applied_by
                      // candidate_id
                      // company_name
                      // hr_name
                      // interview_date
                      // job_id
                      // name
                      // offered_date
                      // phone
                      const candidateDetails = {
                        applicationId: eachItem.application_id,
                        candidateId: eachItem.candidate_id,
                        name: eachItem.name,
                        companyName: eachItem.company_name,
                        phone: eachItem.phone,
                        appliedBy: eachItem.applied_by,
                        interviewDate: eachItem.interview_date,
                        offeredDate: eachItem.offered_date,
                        jobId: eachItem.job_id,
                        hrName: eachItem.hr_name,
                      }
                      return (
                        <tr key={eachItem.email} className="job-details-candidates-table-row">
                            <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.candidate_id)}>
                                {eachItem.name}
                            </td>
                            <td className="job-details-candidates-table-cell">{eachItem.company_name}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.applied_by}</td>
                            {(showCandidateForm !== 7) && 
                              <td className="job-details-candidates-table-cell">
                                {(showCandidateForm === 8 || showCandidateForm === 9 || showCandidateForm === 10 || showCandidateForm === 11) ? formatDate(eachItem.interview_date) : eachItem.offered_date ? formatDate(eachItem.offered_date) : "Null"}
                                {showCandidateForm === 11 &&
                                  <button type="button" className="shedule-interview-button" onClick={() => onShowScheduleInterviewPopup(jobId1, candidateDetails, allJobsList, setCandidateList, candidateList)} >
                                      <MdOutlineEditCalendar className="shedule-icon" />
                                  </button>
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