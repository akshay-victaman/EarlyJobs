import Pagination from "rc-pagination";
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import ExcelDownloadButton from "../ExcelDownloadButton";
import { format, parseISO } from "date-fns";
import { Oval } from "react-loader-spinner";
import { UpdateClaimStatus } from "./UpdateClaimStatus";
import { EditTenureApprovedPopUp } from "./EditTenureApprovedPopUp";

export const TenureApprovedCandidates = ({onShowCandidateDetails, setShowCandidateForm}) => {

    const [candidateList, setCandidateList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalReceived, setTotalReceived] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [totalClaimed, setTotalClaimed] = useState(0);
    const [claimedCount, setClaimedCount] = useState(0);
    const [notClaimedCount, setNotClaimedCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [claimStatus, setClaimStatus] = useState('');
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(date);
    const [toDate, setToDate] = useState(date);
    const [showEditTenureApprovedPopUp, setShowEditTenureApprovedPopUp] = useState(false);
    const [candidateItem, setCandidateItem] = useState({});
    const [allJobsList, setAllJobsList] = useState([]);

    useEffect(() => {
        getTenureApprovedCandidates();
    }, [claimStatus, fromDate, toDate, page]);

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy');
        return formattedDate;
    }

    const getTenureApprovedCandidates = async () => {
        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidates/tenure-approved?claimStatus=${claimStatus}&fromDate=${fromDate}&toDate=${toDate}&search=${searchInput}&page=${page}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const formattedData = data.candidates.map(eachItem => ({
                    applicationId: eachItem.application_id,
                    candidateId: eachItem.candidate_id,
                    jobId: eachItem.job_id,
                    name: eachItem.name,
                    joiningDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : "--",
                    appliedBy: eachItem.applied_by,
                    companyName: eachItem.company_name,
                    area: eachItem.area,
                    city: eachItem.city,
                    tenureId: eachItem.tenure_id,
                    employeeId: eachItem.employee_id,
                    positionName: eachItem.position_name,
                    salary: eachItem.salary,
                    commissionReceived: eachItem.commission_received,
                    commissionPaid: eachItem.commission_paid,
                    isClaimed: eachItem.is_claimed,
                }));
                setCandidateList(formattedData);
                setTotalItems(data.count);
                setTotalReceived(data.total_received || 0);
                setTotalPaid(data.total_paid || 0);
                setTotalClaimed(data.total_claimed || 0);
                setClaimedCount(data.claimed_count || 0);
                setNotClaimedCount(data.not_claimed_count || 0);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const getTenureApprovedCandidatesForExcel = async () => {
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidates/tenure-approved/excel?claimStatus=${claimStatus}&fromDate=${fromDate}&toDate=${toDate}&search=${searchInput}`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                const formattedData = data.map(eachItem => ({
                    applicationId: eachItem.application_id,
                    name: eachItem.name,
                    joiningDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : "--",
                    appliedBy: eachItem.applied_by,
                    companyName: eachItem.company_name,
                    area: eachItem.area,
                    city: eachItem.city,
                    employeeId: eachItem.employee_id,
                    positionName: eachItem.position_name,
                    salary: eachItem.salary,
                    commissionReceived: eachItem.commission_received,
                    commissionPaid: eachItem.commission_paid,
                    isClaimed: eachItem.is_claimed,
                }));
                return formattedData;
            }
            
        } catch (error) {
            console.log(error);
        }
    };
    
    const updateClaimStatus = async (tenureId, claimStatus) => {
        setLoading(true);
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate/claim-status/update`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({
                tenureId,
                claimStatus
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
                    if(eachItem.tenureId === tenureId) {
                        return {
                            ...eachItem,
                            isClaimed: parseInt(claimStatus)
                        }
                    }
                    return eachItem;
                })
                setCandidateList(updatedData);
            }
        } else {
            toast.error("Failed to update claim status");
        }
        } catch (error) {
          toast.error("Failed to update claim status");
        }
        setLoading(false);
    }

    const handleFromDateChange = (event) => {
        setFromDate(event.target.value)
        setPage(1)
      }
  
      const handleToDateChange = (event) => {
        setToDate(event.target.value)
        setPage(1)
      }

    const handleClaimStatusChange = (event) => {
        setClaimStatus(event.target.value)
        setPage(1)
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            getTenureApprovedCandidates();
            setPage(1);
        }
    };

    const onOpenEditTenureApprovedPopUp = (tenureId) => {
        setShowEditTenureApprovedPopUp(true);
        const selectedCandidate = candidateList.find(candidate => candidate.tenureId === tenureId);
        setCandidateItem(selectedCandidate);
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
        if (loading) {
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
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>Tenure Approved Candidates</span></h1>

            <div className="job-section-select-filter-container">
                {/* <div className="job-section-select-container"> 
                    <label className="homepage-label view-candidates-label" htmlFor='resume'>Select Job</label>
                    <select className="homepage-input view-candidates-select" name='jobId' id='jobId' value={jobId} onChange={handleJobIdChange}>
                        <option value=''>All Jobs</option>
                        {
                            allJobsList.map(job => (
                                <option key={job.id} value={job.id}>{job.role} - {job.compname} - {job.city} - {job.area}</option>
                            ))
                        }
                    </select>
                </div> */}
                
                {/* {
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
                } */}

                
                <div className="job-section-select-container"> 
                    <label className="homepage-label view-candidates-label" htmlFor='handleClaimStatusChange'>Filter By Claim Status</label>
                    <select className="homepage-input view-candidates-select" name='handleClaimStatusChange' id='handleClaimStatusChange' value={claimStatus} onChange={handleClaimStatusChange}>
                        <option value=''>Select Claim Status</option>
                        <option value='1'>Claimed</option>
                        <option value='0'>Not Claimed</option>
                    </select>
                </div>

                
                <div className="job-section-select-container"> 
                    <label className="homepage-label view-candidates-label" htmlFor='joined-date'>Filter By Joining Date (From - To)</label>
                    <div className="date-con"> 
                        <input className="homepage-input view-candidates-select interview-date-input" type='date' id='joined-date' value={fromDate} onChange={handleFromDateChange} />
                        <input className="homepage-input view-candidates-select interview-date-input" type='date' id='joined-date' value={toDate} onChange={handleToDateChange} />
                    </div>
                </div>
                <div className="user-view-search-con my-hr-recruiters-search-con view-candidates-search-input-con">
                    <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, phone, company or employee id" />
                    <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={getTenureApprovedCandidates} >
                        <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                    </div>
                </div>
                {candidateList.length > 0 && 
                    <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                        <ExcelDownloadButton getData={getTenureApprovedCandidatesForExcel} /> 
                    </div>
                }
                <div className="rows-count-con">
                    <span className="rows-count-text">Total Results:</span>
                    <span className="rows-count-number">`{totalItems}`</span>
                </div>
                <div className="rows-count-con">
                    <span className="rows-count-text">Claimed:</span>
                    <span className="rows-count-number">`{claimedCount}`</span>
                </div>
                <div className="rows-count-con">
                    <span className="rows-count-text">Not Claimed:</span>
                    <span className="rows-count-number">`{notClaimedCount}`</span>
                </div>
                <div className="rows-count-con">
                    <span className="rows-count-text">Total Received:</span>
                    <span className="rows-count-number">`{totalReceived}`</span>
                </div>
                <div className="rows-count-con">
                    <span className="rows-count-text">Total Payable:</span>
                    <span className="rows-count-number">`{totalPaid}`</span>
                </div>
                <div className="rows-count-con">
                    <span className="rows-count-text">Total Claimed:</span>
                    <span className="rows-count-number">`{totalClaimed}`</span>
                </div>
            </div>


            <div className='table-candidate-container'>
                <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 ? "empty-candidates" : ""}`}>
                    <tr className="job-details-candidates-table-heading">
                        <th className="job-details-candidates-table-heading-cell">Name</th>
                        <th className="job-details-candidates-table-heading-cell">Employee ID</th>
                        <th className="job-details-candidates-table-heading-cell">Company Name</th>
                        <th className="job-details-candidates-table-heading-cell">Company Location</th>
                        <th className="job-details-candidates-table-heading-cell">Position</th>
                        <th className="job-details-candidates-table-heading-cell">Salary</th>
                        <th className="job-details-candidates-table-heading-cell">commn. Received</th>
                        <th className="job-details-candidates-table-heading-cell">commn. Payable</th>
                        <th className="job-details-candidates-table-heading-cell">commn. Claimed</th>
                        <th className="job-details-candidates-table-heading-cell">Joining Date</th>
                        <th className="job-details-candidates-table-heading-cell">Shortlisted By</th>
                        <th className="job-details-candidates-table-heading-cell">Is Claimed</th>
                        <th className="job-details-candidates-table-heading-cell">Update Claim Status</th>
                        <th className="job-details-candidates-table-heading-cell">Action</th>
                    </tr>
                    {
                        candidateList.length > 0 && candidateList.map(eachItem => {
                        return (
                            <tr key={eachItem.tenureId} className="job-details-candidates-table-row">
                                <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.candidateId)}>
                                    {eachItem.name}
                                </td>
                                <td className="job-details-candidates-table-cell">{eachItem.employeeId}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.companyName}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.area}, {eachItem.city}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.positionName}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.salary}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.commissionReceived}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.commissionPaid}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.isClaimed === 1 ? eachItem.commissionPaid : 0}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.joiningDate}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.appliedBy}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.isClaimed === 1 ? "Claimed" : "Not Claimed"}</td>
                                <td className="job-details-candidates-table-cell">
                                    {
                                    !loading ? 
                                    <UpdateClaimStatus candidate={eachItem} onUpdate={updateClaimStatus} />
                                    :
                                    <p className="loading-text">Please Wait...</p>
                                    }
                                </td>
                                <td className="job-details-candidates-table-cell">
                                    <button className="job-details-candidates-table-cell-button" onClick={() => onOpenEditTenureApprovedPopUp(eachItem.tenureId)}>Edit</button>
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
            { showEditTenureApprovedPopUp && <EditTenureApprovedPopUp candidateItem={candidateItem} setShowEditTenureApprovedPopUp={setShowEditTenureApprovedPopUp} candidateList={candidateList} setCandidateList={setCandidateList} /> }
        </div>
    )
}

