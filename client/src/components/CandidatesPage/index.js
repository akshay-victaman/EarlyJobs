import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { format, parseISO } from 'date-fns';
import { useEffect } from "react";
import {Redirect} from 'react-router-dom';
import CandidateItem from "../CandidateItem";


const CandidatesPage = () => {
    const [searchInput, setSearchInput] = useState('');
    const [candidateList, setCandidateList] = useState([]);

    useEffect(() => {
        getAllCandidates();
    }, [])

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
        return formattedDate;
    }

    const getAllCandidates = async () => {
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const url = `${backendUrl}/admin/get-candidates/all`;
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok === true) {
            const formattedData = data.map(eachItem => ({
                id: eachItem.id,
                email: eachItem.email,
                name: eachItem.name,
                phone: eachItem.phone,
                createdAt: formatDate(eachItem.created_at),
            }))
            setCandidateList(formattedData);
            console.log(formattedData)
        } else {
            alert(data.error);
        }
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    }

    const renderCandidates = () => {
        const filterCandidates = candidateList.filter(eachItem => 
            eachItem.name.toLowerCase().includes(searchInput.toLowerCase()) || 
            eachItem.email.toLowerCase().includes(searchInput.toLowerCase()) ||
            eachItem.phone.toLowerCase().includes(searchInput.toLowerCase())
        );
        return (
            <div className="job-details-candidates-container">
                {/* <h1 className="job-details-candidates-heading">Candidates</h1> */}
                <div style={{marginTop: '10px'}} className='table-container'>
                <table className="job-details-candidates-table" style={{width: "100%"}}>
                    <tr className="job-details-candidates-table-heading">
                        <th className="job-details-candidates-table-heading-cell">
                        Name
                        </th>
                        <th className="job-details-candidates-table-heading-cell">
                        Email
                        </th>
                        <th className="job-details-candidates-table-heading-cell">
                        Phone
                        </th>
                        <th className="job-details-candidates-table-heading-cell">
                        Created At
                        </th>
                    </tr>
                    
                    {
                        filterCandidates.length > 0 ? filterCandidates.map(eachItem => (
                            <CandidateItem key={eachItem.id} candidate={eachItem} />
                        ))
                        :
                        <p className='' style={{textAlign: 'center'}}>no records found!</p>
                    }
                </table>
                </div>
            </div>
        )
    }

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
                        <div className="user-view-search-button">
                            <IoSearchSharp className="search-icon" />
                        </div>
                        <input className="user-view-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} placeholder="Search by name, email, or phone" />
                    </div>
                    
                </div>
                {renderCandidates()}
            </div>
        </div>
    )
}

export default CandidatesPage