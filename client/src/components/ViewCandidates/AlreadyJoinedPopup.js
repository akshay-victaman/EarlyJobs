import { useEffect, useState } from "react"
import React from 'react';
import { ThreeCircles } from "react-loader-spinner"
import Cookies from 'js-cookie'
import { parseISO, format } from "date-fns"

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

function AlreadyJoinedPopup({setShowPopup, candidateId}) {

    const [joinedCompanyDetails, setJoinedCompanyDetails] = useState({})
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    useEffect(() => {
        getJoinedCompanyDetails()
    }, [])

    const getJoinedCompanyDetails = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const url = `${backendUrl}/jobs/candidate/joined-company-details/${candidateId}`
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
            console.log(data)
            if(response.ok === true) {
                setJoinedCompanyDetails(data)
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
            }
        } catch(error) {
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const formatDate = (offeredDate) => {
        const date = parseISO(offeredDate);
        const formattedDate = format(date, 'MMM dd yyyy');
        return formattedDate;
    }

    const renderFailure = () => (
        <div className="candidate-failure-con">
            <p className="candidate-failure-text">Something went wrong!</p>
            <button className="candidate-try-agian-btn" onClick={getJoinedCompanyDetails}>Try Again</button>
            <button className="candidate-details-close-btn" onClick={() => setShowPopup(false)}>
                &times;
            </button>
        </div>
    )

    const renderInProgress = () => (
        <div data-testid="loader" className="candidate-loader-container">
            <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderJoinedCompanyDetails = () => (
        <>
        <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Company Name </p>
            <p className="candidate-details-sub-text">{joinedCompanyDetails.company_name}</p>
        </div>
        <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Location </p>
            <p className="candidate-details-sub-text">{joinedCompanyDetails.location}</p>
        </div>
        <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Applied By </p>
            <p className="candidate-details-sub-text">{joinedCompanyDetails.applied_by}</p>
        </div>
        <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Joined Date </p>
            <p className="candidate-details-sub-text">{joinedCompanyDetails.offered_date ? formatDate(joinedCompanyDetails.offered_date) : null}</p>
        </div>
        <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Verification Status </p>
            <p className="candidate-details-sub-text">{joinedCompanyDetails.verification_status ? joinedCompanyDetails.verification_status : "No Action"}</p>
        </div>
        <button className="candidate-details-close-btn" onClick={() => setShowPopup(false)}>
            &times;
        </button>
        </>
    )

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstant.inProgress:
                return renderInProgress();
            case apiStatusConstant.success:
                return renderJoinedCompanyDetails();
            case apiStatusConstant.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={() => setShowPopup(false)}></div>
            <div className="candidate-details-modal-con">
                <h1 className="candidate-details-heading">Candidate Joined Company Details</h1>
                {renderSwitchCase()}
            </div>
        </div>
    )
}

export default AlreadyJoinedPopup