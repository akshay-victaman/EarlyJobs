import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {Oval} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { format, parseISO } from 'date-fns'
import './style.css'
import UpdateCandidateStatus from "./UpdateCandidateStatus"

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

const ViewCandidates = ({onShowCandidateDetails, onShowScheduleInterviewPopup, jobsList, setShowCandidateForm}) => {
    const [candidateList, setCandidateList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [jobId, setJobId] = useState('')
    const [applicationStatus, setApplicationStatus] = useState('')
    const [selectHr, setSelectHr] = useState('')
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0);
    const [hrList, setHrList] = useState([])

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    useEffect(() => {
        if(jobId !== '') {
            getCandidates()
        } else {
            // setCandidateList([])
            getAllCandidatesForHR()
        }
    }, [jobId])

    const handleJobIdChange = (event) => {
        if(jobId === '') {
          setHrList([])
        }
        setJobId(event.target.value)
    }

    const handleApplicationStatusChange = (event) => {
        setApplicationStatus(event.target.value)
    }

    const handleSelectHrChange = (event) => {
      setSelectHr(event.target.value)
    }

    const formatDate = (date) => {
      const dbDate = parseISO(date);
      const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
      return formattedDate;
    }

    const getAllCandidatesForHR = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const email = Cookies.get('email')
        const apiUrl = `${backendUrl}/jobs/candidates/${email}`
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
            const formattedData = data.map(eachItem => ({
              candidateId: eachItem.candidate_id,
              jobId: eachItem.job_id,
              candidateName: eachItem.name,
              candidateEmail: eachItem.email,
              candidatePhone: eachItem.phone,
              offerStatus: eachItem.offer_status,
              offeredDate: eachItem.offered_date,
              appliedBy: eachItem.applied_by,
              interviewDate: formatDate(eachItem.interview_date)
            }))
            if(jobId !== "") {
              const hrList = data.map(eachItem => ({hrEmail: eachItem.applied_by, hrName: eachItem.hr_name}))
              setHrList(hrList)
              console.log(hrList)
            }
            console.log(formattedData)
            setCandidateList(formattedData)
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          setApiStatus(apiStatusConstant.failure)
        }
    }

    const getCandidates = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `${backendUrl}/jobs/candidate/${jobId}`
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
                appliedBy: eachItem.applied_by,
                interviewDate: formatDate(eachItem.interview_date)
              }))
              const hrList = data.map(eachItem => ({hrEmail: eachItem.applied_by, hrName: eachItem.hr_name}))
              // const filterHrList = data.map(eachItem => {
              //   if(hrList.find(hr => hr.hrEmail === eachItem.applied_by)) return null
              //   else return {hrEmail: eachItem.applied_by, hrName: eachItem.hr_name}
              // })
              setHrList(hrList)
              console.log(formattedData)
              setCandidateList(formattedData)
            } else {
              const formattedData = data.map(eachItem => ({
                candidateId: eachItem.candidate_id,
                candidateName: eachItem.name,
                candidateEmail: eachItem.email,
                candidatePhone: eachItem.phone,
                offerStatus: eachItem.offer_status,
                offeredDate: eachItem.offered_date,
                appliedBy: eachItem.applied_by,
                interviewDate: formatDate(eachItem.interview_date)
              }))
              // const hrList = data.map(eachItem => ({hrEmail: eachItem.applied_by, hrName: eachItem.hr_name}))
              const hrList = []
              const filterHrList = data.map(eachItem => {
                if(hrList.find(hr => hr.hrEmail === eachItem.applied_by)) return null
                else return hrList.push({hrEmail: eachItem.applied_by, hrName: eachItem.hr_name})
              })
              setHrList(hrList)
              console.log(filterHrList)
              setCandidateList(formattedData)
            }
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          setApiStatus(apiStatusConstant.failure)
        }
    }

    let filteredCandidates = []
    if(applicationStatus !== '' && selectHr !== '') {
      filteredCandidates = candidateList.filter(eachItem => eachItem.offerStatus === applicationStatus && eachItem.appliedBy === selectHr);
    } else if(applicationStatus !== '') {
      filteredCandidates = candidateList.filter(eachItem => eachItem.offerStatus === applicationStatus);
    } else if(selectHr !== '') {
      filteredCandidates = candidateList.filter(eachItem => eachItem.appliedBy === selectHr);
    } else {
      filteredCandidates = candidateList
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
                      <option value=''>Select Job</option>
                      {
                          jobsList.map(job => (
                              <option key={job.id} value={job.id}>{job.role} - {job.compname}</option>
                          ))
                      }
                  </select>
              </div>
              <div className="job-section-select-container"> 
                <label className="homepage-label view-candidates-label" htmlFor='resume'>Application Status</label>
                <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={applicationStatus} onChange={handleApplicationStatusChange}>
                    <option value=''>All status</option>
                    <option value='Accepted'>Accepted</option>
                    <option value='Rejected'>Rejected</option>
                    <option value='Ongoing'>Ongoing</option>
                    <option value='ReScheduled'>ReScheduled</option>
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
                              <option key={hr.hrEmail} value={hr.hrEmail}>{hr.hrName}</option>
                          ))
                        }
                    </select>
                  </div>
                )
              }
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
                    filteredCandidates.length > 0 && filteredCandidates.map(eachItem => {
                      const jobId1 = jobId==='' ? eachItem.jobId : jobId;
                    return(
                        <UpdateCandidateStatus key={eachItem.candidateId} onShowCandidateDetails={onShowCandidateDetails} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} candidateDetails={eachItem}  jobId={jobId1} jobsList={jobsList} candidateList={candidateList} setCandidateList={setCandidateList} />
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
                total={filteredCandidates.length}
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