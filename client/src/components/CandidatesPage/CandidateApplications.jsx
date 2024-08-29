import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import Cookies from 'js-cookie'
import { differenceInDays, format, parseISO } from 'date-fns'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

export const CandidateApplications = ({onShowCandidateApplications, candidateId}) => {

    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const [applicationsList, setApplicationsList] = useState([])

    useEffect(() => {
        getCandidateApplications();
    }, [])

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

    const getCandidateApplications = async () => {
        try {
            setApiStatus(apiStatusConstant.inProgress);
            const backendUrl = process.env.REACT_APP_BACKEND_API_URL
            const url = `${backendUrl}/admin/get-candidate-applications/${candidateId}`;
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
                    name: eachItem.name,
                    companyName: eachItem.company_name,
                    jobTitle: eachItem.title,
                    area: eachItem.area,
                    city: eachItem.city,
                    appliedBy: eachItem.applied_by,
                    interviewDate: eachItem.interview_date ? formatDate(eachItem.interview_date) : null,
                    offerStatus: eachItem.offer_status,
                    offeredDate: eachItem.offered_date ? formatDate(eachItem.offered_date) : null,
                    dayCount: eachItem.offered_date ? calculateDayCount(eachItem.offered_date, eachItem.tenure_in_days) : null,
                    tenureStatus: eachItem.tenure_status,
                    isTenureApproved: eachItem.is_tenure_approved,
                    verificationStatus: eachItem.verification_status,
                }))
                setApplicationsList(formattedData);
                console.log(formattedData)
                setApiStatus(apiStatusConstant.success);
            } else {
                setApiStatus(apiStatusConstant.failure);
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure);
            console.log(error);
        }
    }

    const renderApplications = () => (
        <>
            <div className="user-view-table" style={{width: '100%', maxHeight: "70vh", overflowY: 'auto'}} >
                <table className="users-table">
                    <tr className="users-table-heading-row">
                        <th className="users-table-heading">Name</th>
                        <th className="users-table-heading">Company Name</th>
                        <th className="users-table-heading">Job Title</th>
                        <th className="users-table-heading">Location</th>
                        <th className="users-table-heading">Shortlisted By</th>
                        <th className="users-table-heading">Interview Date</th>
                        <th className="users-table-heading">Offer Status</th>
                        <th className="users-table-heading">Offered Date</th>
                        <th className="users-table-heading">Tenure (Days Left / Status / Approve)</th>
                        <th className="users-table-heading">Verification Status</th>
                    </tr>
                    {
                        applicationsList?.map(eachItem => (
                            <tr className="users-table-data-row">
                                <td data-cell='name' className="users-table-data">
                                {eachItem.name}
                                </td>
                                <td data-cell='company name' className="users-table-data">
                                {eachItem.companyName}
                                </td>
                                <td data-cell='job title' className="users-table-data">
                                {eachItem.jobTitle}
                                </td>
                                <td data-cell='location' className="users-table-data">
                                {eachItem.area}, {eachItem.city}
                                </td>
                                <td data-cell='applied by' className="users-table-data">
                                {eachItem.appliedBy}
                                </td>
                                <td data-cell='interview date' className="users-table-data">
                                {eachItem.interviewDate}
                                </td>
                                <td data-cell='offer status' className="users-table-data">
                                {eachItem.offerStatus}
                                </td>
                                <td data-cell='offered date' className="users-table-data">
                                {eachItem.offeredDate ? eachItem.offeredDate : "--"}
                                </td>
                                <td data-cell='Tenure(Days Left/Status/Approve)' className="users-table-data">
                                {eachItem.dayCount === null ? "--" : eachItem.dayCount > 0 ? eachItem.dayCount : "Expired"}
                                {eachItem.tenureStatus !== null && " / " + eachItem.tenureStatus}
                                {eachItem.isTenureApproved !== null && " / " + eachItem.isTenureApproved}
                                </td>
                                <td data-cell='verification status' className="users-table-data">
                                {eachItem.verificationStatus ? eachItem.verificationStatus : "--"}
                                </td>
                            </tr>
                    ))}
                </table>
                {
                    applicationsList.length === 0 && 
                    <p className='user-view-table-no-data'>No data available</p>
                }
            </div>
            <button className="candidate-details-close-btn" onClick={onShowCandidateApplications}>
                &times;
            </button>
        </>
    )

    const renderFailure = () => (
        <div className="candidate-failure-con">
            <p className="candidate-failure-text">Something went wrong!</p>
            <button className="candidate-try-agian-btn" onClick={getCandidateApplications}>Try Again</button>
            <button className="candidate-details-close-btn" onClick={onShowCandidateApplications}>
                &times;
            </button>
        </div>
    )

    const renderInProgress = () => (
        <div data-testid="loader" className="candidate-loader-container">
            <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstant.inProgress:
                return renderInProgress();
            case apiStatusConstant.success:
                return renderApplications();
            case apiStatusConstant.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowCandidateApplications}></div>
            <div className="candidate-details-modal-con" style={{width: "90%"}}>
                <h1 className="candidate-details-heading">Candidate Applications</h1>
                {renderSwitchCase()}
            </div>
        </div>
    )
}

