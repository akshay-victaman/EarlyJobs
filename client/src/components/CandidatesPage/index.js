import React from 'react';
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { format, parseISO } from 'date-fns';
import { useEffect } from "react";
import {Redirect} from 'react-router-dom';
import Pagination from 'rc-pagination';
import CandidateItem from "../CandidateItem";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import ViewCandidateDetails from "../ViewCandidates/ViewCandidateDetails";
import { CandidateApplications } from "./CandidateApplications";


const CandidatesPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [candidateList, setCandidateList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [loading, setLoading] = useState(false);
    const [viewCandidateDetails, setViewCandidateDetails] = useState(false);
    const [candidateId, setCandidateId] = useState('');
    const [showApplications, setShowApplications] = useState(false);

    useEffect(() => {
        getAllCandidates();
    }, [page])

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
        return formattedDate;
    }

    const getAllCandidates = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const url = `${backendUrl}/admin/get-candidates/all?search=${searchInput}&page=${page}`;
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        };
        setLoading(true);
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data.candidatesList)
        if(response.ok === true) {
            const formattedData = data.candidatesList.map(eachItem => ({
                id: eachItem.id,
                email: eachItem.email,
                name: eachItem.name,
                fatherName: eachItem.father_name,
                phone: eachItem.phone,
                createdAt: formatDate(eachItem.created_at),
                isJoined: eachItem.is_joined
            }))
            setCandidateList(formattedData);
            setTotalItems(data.count);
            console.log(formattedData)
        } else {
            alert(data.error);
        }
        setLoading(false);
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    }

    const onShowCandidateDetails = (candidateId) => {
        setViewCandidateDetails(!viewCandidateDetails)
        setCandidateId(candidateId)
    }

    const onShowCandidateApplications = (candidateId) => {
        setShowApplications(!showApplications)
        setCandidateId(candidateId)
    }

    const updateCandidateIsJoined = async (candidateId, isJoined) => {
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_API_URL
            const url = `${backendUrl}/admin/candidate-is-joined/${candidateId}`;
            const options = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                },
                body: JSON.stringify({isJoined})
            };
            setLoading(true);
            const response = await fetch(url, options);
            const data = await response.json();
            if(response.ok === true) {
                toast.success(data.message);
                setCandidateList(candidateList.map(eachItem => {
                    if(eachItem.id === candidateId) {
                        return {
                            ...eachItem,
                            isJoined: isJoined
                        }
                    }
                    return eachItem;
                }))
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
      setPage(page)
    };

    const onClickEnter = (event) => {
        if(event.key === 'Enter') {
            setPage(1);
            getAllCandidates();
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

    const renderCandidates = () => (
        <div className="user-view-table">
            <table className="users-table">
                <tr className="users-table-heading-row">
                    <th className="users-table-heading">Name</th>
                    <th className="users-table-heading">Father Name</th>
                    <th className="users-table-heading">Email</th>
                    <th className="users-table-heading">Phone</th>
                    <th className="users-table-heading">Created At</th>
                    <th className="users-table-heading">Is Joined</th>
                    <th className="users-table-heading">Applications</th>
                    {/* <th className="users-table-heading">Actions</th> */}
                </tr>
                {
                    candidateList?.map(eachItem => (
                        <CandidateItem key={eachItem.id} candidate={eachItem} onShowCandidateApplications={onShowCandidateApplications} onShowCandidateDetails={onShowCandidateDetails} updateCandidateIsJoined={updateCandidateIsJoined} />
                ))}
            </table>
            {
                candidateList.length === 0 && 
                <p className='user-view-table-no-data'>
                    {loading ? 
                    <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="#EB6A4D"
                    strokeWidth="4"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    secondaryColor="#fff"
                    wrapperClass=""
                    /> : 
                    'No data available'}
                </p>
            }
        </div>
    )

    const token = Cookies.get('role')
    if (token !== 'ADMIN') {
        return <Redirect to='/' />
    }

    return (
        <div className="homepage-container">
            <div className="user-view-container">
                <h1 className='user-heading'>Candidates View</h1>
                <div className="user-view-search-filter-con">
                    <div className="user-view-search-con">
                        <input className="user-view-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} placeholder="Search by name, email, or phone" onKeyDown={onClickEnter} />
                        <div className="user-view-search-button" onClick={() => {setPage(1); getAllCandidates()}}>
                            <IoSearchSharp className="search-icon" />
                        </div>
                    </div>
                    
                </div>
                {renderCandidates()}
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
            {viewCandidateDetails && 
                <div className="view-candidate-details-modal">
                    <div className='view-candidate-details-modal-overlay' onClick={onShowCandidateDetails}></div>
                    <ViewCandidateDetails onShowCandidateDetails={onShowCandidateDetails} candidateId={candidateId} />
                </div>
            }
            {
                showApplications && 
                <CandidateApplications onShowCandidateApplications={onShowCandidateApplications} candidateId={candidateId} />
            }
        </div>
    )
}

export default CandidatesPage