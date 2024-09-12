import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import ExcelDownloadButton from "../ExcelDownloadButton";
import { format, parseISO } from "date-fns";
import { Oval } from "react-loader-spinner";

export const RecommendedCandidates = ({onShowCandidateDetails, setShowCandidateForm}) => {

    const [candidateList, setCandidateList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [claimStatus, setClaimStatus] = useState('');
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [fromDate, setFromDate] = useState(date);
    const [toDate, setToDate] = useState(date);

    useEffect(() => {
        getRecommededCandidates();
    }, [claimStatus, fromDate, toDate, page]);

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy');
        return formattedDate;
    }

    const getRecommededCandidates = async () => {
        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/recommendations/candidates`;
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
                const formatData = data.map(candidate => ({
                    name: candidate.name,
                    email: candidate.email,
                    phone: candidate.phone,
                    dob: candidate.date_of_birth ? formatDate(candidate.date_of_birth) : '--',
                }))
                setCandidateList(formatData);
                return formatData;
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

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

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            getRecommededCandidates();
            setPage(1);
        }
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
            <h1 className='bde-heading' style={{textAlign: "center", marginBottom: "20px"}}><span className='head-span'>Candidates of the Day</span></h1>

            <div className="job-section-select-filter-container">
                {/* <div className="job-section-select-container"> 
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
                </div> */}
                {candidateList.length > 0 && 
                    <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                        <ExcelDownloadButton getData={getRecommededCandidates} /> 
                    </div>
                }
            </div>


            <div className='table-candidate-container'>
                <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 ? "empty-candidates" : ""}`}>
                    <tr className="job-details-candidates-table-heading">
                        <th className="job-details-candidates-table-heading-cell">Name</th>
                        <th className="job-details-candidates-table-heading-cell">Email</th>
                        <th className="job-details-candidates-table-heading-cell">Phone</th>
                        <th className="job-details-candidates-table-heading-cell">Date of Birth</th>
                    </tr>
                    {
                        candidateList.length > 0 && candidateList.map(eachItem => {
                        return (
                            <tr key={eachItem.tenureId} className="job-details-candidates-table-row">
                                <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.id)}>
                                    {eachItem.name}
                                </td>
                                <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.dob}</td>
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
            </div>
        </div>
    )
}

