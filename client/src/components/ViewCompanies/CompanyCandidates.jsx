import { differenceInDays, format, parseISO } from "date-fns";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Cookies from "js-cookie";
import { IoSearchSharp } from "react-icons/io5";
import ExcelDownloadButton from "../ExcelDownloadButton";
import { toast } from "react-toastify";
import ApproveTenureStatus from "../ViewCandidates/ApproveTenureStatus";
import UpdateVerificationStatus from "../ViewCandidates/UpdateVerificationStatus";

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

export const CompanyCandidates = ({companyId, handleHideCompanyJobs, companyName, onShowCandidateDetails}) => {
    const [candidatesList, setCandidatesList] = useState([]);
    const [companyJobList, setCompanyJobList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(date)
    const [toDate, setToDate] = useState(date)
    const [searchInput, setSearchInput] = useState('');
    const [jobId, setJobId] = useState('');
    const [offerStatus, setOfferStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
       getCompanyCandidates();
    }, [page, fromDate, toDate, jobId, offerStatus])

    const handleFromDateChange = (event) => {
      setFromDate(event.target.value)
      setPage(1)
    }

    const handleToDateChange = (event) => {
      setToDate(event.target.value)
      setPage(1)
    }

    const handleChangeSearchInput = (event) => {
      setSearchInput(event.target.value);
    };

    const handleJobIdChange = (event) => {
      setJobId(event.target.value)
      setPage(1)
    }

    const handleOfferStatusChange = (event) => {
      setOfferStatus(event.target.value)
      setPage(1)
    }

    const onClickEnter = (event) => {
      if (event.key === 'Enter') {
        getCompanyCandidates();
        setPage(1);
      }
  };

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
        return formattedDate;
    }

    const calculateDayCount = (date, tenure) => {
      const givenDate = parseISO(date);
      const currentDate = new Date();
      const diffInDays = differenceInDays(givenDate, currentDate);
      return tenure - Math.abs(diffInDays);
  }

    const getCompanyCandidates = async () => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_API_URL
            const url = `${backendUrl}/api/companies/${companyId}/candidates/?toDate=${toDate}&fromDate=${fromDate}&search=${searchInput}&jobId=${jobId}&offerStatus=${offerStatus}&page=${page}`;
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            };
            setApiStatus(apiStatusConstant.inProgress)
            const response = await fetch(url, options);
            const data = await response.json();
            if(response.ok === true) {
                console.log(data)
                const formattedData = data.candidatesList.map(eachItem => ({
                    applicationId: eachItem.application_id,
                    candidateId: eachItem.candidate_id,
                    name: eachItem.name,
                    fatherName: eachItem.father_name,
                    email: eachItem.email,
                    phone: eachItem.phone,
                    candiateLocation: eachItem.current_location,
                    jobArea: eachItem.job_area,
                    jobCity: eachItem.job_city,
                    interviewDate: formatDate(eachItem.interview_date),
                    offerStatus: eachItem.offer_status,
                    offered_date: formatDate(eachItem.offered_date).substring(0, 11),
                    dayCount: eachItem.offered_date ? calculateDayCount(eachItem.offered_date, eachItem.tenure_in_days) : null,
                    verificationStatus: eachItem.verification_status,
                    isTenureApproved: eachItem.is_tenure_approved,
                    tenureStatus: eachItem.tenure_status,
                }))
                console.log(formattedData)
                const formattedJobData = data.companyJobList.map(eachItem => ({
                    id: eachItem.id,
                    title: eachItem.title,
                    city: eachItem.city,
                    area: eachItem.area,
                }))
                setCompanyJobList(formattedJobData);
                setCandidatesList(formattedData);
                setTotalItems(data.count);
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
                alert(data.error);
            }
        } catch (error) {
            console.error(error)
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const getCompanyCandidatesExcel = async () => {
      try {
          const backendUrl = process.env.REACT_APP_BACKEND_API_URL
          const url = `${backendUrl}/api/companies/${companyId}/candidates/excel/?toDate=${toDate}&fromDate=${fromDate}&search=${searchInput}&jobId=${jobId}&offerStatus=${offerStatus}`;
          const options = {
              method: 'GET',
              headers: { 
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Cookies.get('jwt_token')}`
              }
          };
          setApiStatus(apiStatusConstant.inProgress)
          const response = await fetch(url, options);
          const data = await response.json();
          if(response.ok === true) {
              const formattedData = data.map(eachItem => ({
                  name: eachItem.name,
                  fatherName: eachItem.father_name,
                  email: eachItem.email,
                  phone: eachItem.phone,
                  dateOfBirth: formatDate(eachItem.date_of_birth),
                  jobLocation: eachItem.job_area + ', ' + eachItem.job_city,
                  interviewDate: formatDate(eachItem.interview_date),
                  offerStatus: eachItem.offer_status,
                  offered_date: formatDate(eachItem.offered_date).substring(0, 11),
                  verificationStatus: eachItem.verification_status,
              }))
              console.log(formattedData)
              return formattedData
          } else {
              toast.error("Failed to download excel");
          }
      } catch (error) {
          console.error(error)
          toast.error("Failed to download excel");
      }
  }

  const updateTenureApprovalStatus = async (applicationId, approvalStatus) => {
    setLoading(true);
    console.log(applicationId, approvalStatus)
    const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate/tenure-approval-status/update`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`
        },
        body: JSON.stringify({
            applicationId,
            approvalStatus
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
            const updatedData = candidatesList.map(eachItem => {
                if(eachItem.applicationId === applicationId) {
                    return {
                        ...eachItem,
                        isTenureApproved: approvalStatus
                    }
                }
                return eachItem;
            })
            setCandidatesList(updatedData);
        }
    } else {
        toast.error("Failed to update approval status");
    }
    } catch (error) {
      console.error(error)
      toast.error("Failed to update approval status");
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
          const updatedData = candidatesList.map(eachItem => {
              if(eachItem.applicationId === applicationId) {
                  return {
                      ...eachItem,
                      verificationStatus
                  }
              }
              return eachItem;
          })
          setCandidatesList(updatedData);
      }
  } else {
      toast.error("Failed to update verification status");
  }
  } catch (error) {
  toast.error("Failed to update verification status");
  }
  setLoading(false);
}

    const handlePageChange = (page) => {
      setPage(page)
    };

    const itemsPerPage = 10; 

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

    return (
        <>
        <h1 className="company-jobs-heading" style={{alignSelf: 'flex-start'}}>{companyName}</h1>
        <div className="job-section-select-filter-container">
          <div className="job-section-select-container"> 
              <label className="homepage-label view-candidates-label" htmlFor='jobId'>Select Job</label>
              <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={jobId} onChange={handleJobIdChange}>
                  <option value=''>All Jobs</option>
                  {
                      companyJobList.map(job => (
                          <option key={job.id} value={job.id}>{job.title} - {job.area} - {job.city}</option>
                      ))
                  }
              </select>
          </div>
          <div className="job-section-select-container"> 
              <label className="homepage-label view-candidates-label" htmlFor='offerstatus'>Offer Status</label>
              <select className="homepage-input view-candidates-select" name='offerstatus' id='offerstatus' value={offerStatus} onChange={handleOfferStatusChange}>
                  <option value=''>Select Offerstatus</option>
                  <option value='Selected'>Selected</option>
                  <option value='Joined'>Joined</option>
              </select>
          </div>
          <div className="job-section-select-container"> 
              <label className="homepage-label view-candidates-label" htmlFor='interview-date'>Filter By Joining / Selection Date (From - To)</label>
              <div className="date-con"> 
                <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={fromDate} onChange={handleFromDateChange} />
                <input className="homepage-input view-candidates-select interview-date-input" type='date' id='interview-date' value={toDate} onChange={handleToDateChange} />
              </div>
          </div>
          <div className="user-view-search-con my-hr-recruiters-search-con view-candidates-search-input-con">
              <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, phone or company" />
              <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={getCompanyCandidates} >
                  <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
              </div>
          </div>
          {candidatesList.length > 0 && 
            <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                <ExcelDownloadButton getData={getCompanyCandidatesExcel} /> 
            </div>
          }
          <div className="rows-count-con">
            <span className="rows-count-text">Total Results:</span>
            <span className="rows-count-number">`{totalItems}`</span>
          </div>
        </div>
        <div className='table-candidate-container'>
        <table className={`job-details-candidates-table candidate-table-job-section ${candidatesList.length === 0 ? "empty-candidates" : ""}`}>
            <tr className="job-details-candidates-table-heading">
                <th className="job-details-candidates-table-heading-cell">Name</th>
                <th className="job-details-candidates-table-heading-cell">Father Name</th>
                <th className="job-details-candidates-table-heading-cell">Email</th>
                <th className="job-details-candidates-table-heading-cell">Phone</th>
                <th className="job-details-candidates-table-heading-cell">Company Location</th>
                <th className="job-details-candidates-table-heading-cell">Interview Date</th>
                <th className="job-details-candidates-table-heading-cell">Offer Status</th>
                <th className="job-details-candidates-table-heading-cell">Joined/Selected Date</th>
                <th className="job-details-candidates-table-heading-cell">Tenure (Days Left / Status / Approve)</th>
                <th className="job-details-candidates-table-heading-cell">Approve Tenure Status</th>
                <th className="job-details-candidates-table-heading-cell">Verification Status</th>
                <th className="job-details-candidates-table-heading-cell">Update Status</th>
            </tr>
            {
                candidatesList.length > 0 && candidatesList.map(eachItem => {
                return (
                    <tr key={eachItem.applicationId} className="job-details-candidates-table-row">
                        <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.candidateId)} >
                            {eachItem.name}
                        </td>
                        <td className="job-details-candidates-table-cell">{eachItem.fatherName}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.jobArea}, {eachItem.jobCity}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.interviewDate}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.offerStatus}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.offered_date}</td>
                        <td className="job-details-candidates-table-cell">
                          {eachItem.dayCount > 0 ? eachItem.dayCount : "Expired"}
                          {eachItem.tenureStatus !== null && " / " + eachItem.tenureStatus}
                          {eachItem.isTenureApproved !== null && " / " + eachItem.isTenureApproved}
                        </td>
                        <td className="job-details-candidates-table-cell">
                          {
                            !loading ? 
                              (eachItem.tenureStatus === 'Eligible' || eachItem.tenureStatus === null) ?
                              <ApproveTenureStatus candidate={eachItem} onUpdate={updateTenureApprovalStatus} />
                              : "--"
                            :
                            <p className="loading-text">Please Wait...</p>
                          }
                        </td>
                        <td className="job-details-candidates-table-cell">{eachItem.verificationStatus ? eachItem.verificationStatus : '--'}</td>
                        <td className="job-details-candidates-table-cell">
                            {
                                !loading ? 
                                    <UpdateVerificationStatus candidate={eachItem} onUpdate={updateVerificationStatus} />
                                :
                                <p className="loading-text">Please Wait...</p>
                            }
                        </td>
                    </tr>
                )})
            }
            </table>
            {candidatesList.length === 0 &&
            <p className='no-candidates-error'>
                { renderNoCandidates() }
            </p>}
        </div>
        <div className="job-details-candidates-pagination-con">
          <button className="login-button candidate-button" type="button" onClick={handleHideCompanyJobs}>Back</button>
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
        </>
    )
}