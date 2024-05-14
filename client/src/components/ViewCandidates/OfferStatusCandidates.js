import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Pagination from 'rc-pagination';
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { format, parseISO } from 'date-fns';

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const OfferStatusCandidates = ({showCandidateForm, setShowCandidateForm, onShowCandidateDetails }) => {
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
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);

    useEffect(() => {
        getOfferStatusCandidates()
    }, [page, offerStatus])

    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
      setPage(page)
    };

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            getOfferStatusCandidates();
            setPage(1);
        }
    };

    const getOfferStatusCandidates = async () => {
        setApiStatus(apiStatusConstant.inProgress);
        const role = Cookies.get('role');
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate?search=${searchInput}&role=${role}&offerStatus=${offerStatus}&page=${page}`
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
        if(response.ok === true) {
            if(data.error) {
                setApiStatus(apiStatusConstant.failure);
            } else {
                console.log(data.candidates)
                setCandidateList(data.candidates);
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
            <div className="job-section-select-filter-container my-hr-recruiters-filter-con selected-candidate-con">
              <div className="user-view-search-con my-hr-recruiters-search-con">
                  <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, or phone" />
                  <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={getOfferStatusCandidates}>
                      <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                  </div>
              </div>
              <div className="rows-count-con">
                  <span className="rows-count-text">Total Results:</span>
                  <span className="rows-count-number">`{totalItems}`</span>
              </div>
            </div>
            <div className='table-candidate-container'>
               <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 && "empty-candidates"}`}>
                  <tr className="job-details-candidates-table-heading">
                    <th className="job-details-candidates-table-heading-cell">Name</th>
                    <th className="job-details-candidates-table-heading-cell">Company Name</th>
                    <th className="job-details-candidates-table-heading-cell">Phone</th>
                    <th className="job-details-candidates-table-heading-cell">Shortlisted By</th>
                    { (showCandidateForm === 5 || showCandidateForm === 6) && <th className="job-details-candidates-table-heading-cell">{offerStatus} Date</th>}
                  </tr>
                  {
                    candidateList.length > 0 && candidateList.map(eachItem => (
                        <tr key={eachItem.email} className="job-details-candidates-table-row">
                            <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.candidate_id)}>
                                {eachItem.name}
                            </td>
                            <td className="job-details-candidates-table-cell">{eachItem.company_name}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.applied_by}</td>
                            { (showCandidateForm === 5 || showCandidateForm === 6) && <td className="job-details-candidates-table-cell">{eachItem.offered_date ? formatDate(eachItem.offered_date) : "Null"}</td>}
                        </tr>
                    ))
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