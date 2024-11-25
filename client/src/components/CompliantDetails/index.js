import React from 'react';
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
import { ThreeCircles, Oval } from 'react-loader-spinner'
import './style.css'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const ComplaintDetails = () => {
    
    const [complaint, setComplaint] = useState({})
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchComplaint()
    }, [])

    const {id} = useParams()

    const fetchComplaint = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/complaint/${id}`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            if(response.ok === true) {
                setComplaint(result)
                console.log(result)
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const markAsRead = async () => {
        setLoading(true)
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/complaint/mark-as-read/${id}`
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options)
            if(response.ok === true) {
                setComplaint({...complaint, is_read: 1})
            } else {
                alert('Failed to mark as read')
            }
        } catch (error) {
            alert('Failed to mark as read')
        }
        setLoading(false)
    }

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
        return formattedDate;
    }

    const renderCompliant = () => (
        <div className="complaint-details">
            <div className="complaint-details-item">
                <h3 className='complaint-details-subhead'>Subject : </h3>
                <p className='complaint-details-text'>{complaint.subject}</p>
            </div>
            <div className="complaint-details-item">
                <h3 className='complaint-details-subhead'>Complaint By :</h3>
                <p className='complaint-details-text'>{complaint.username} - {complaint.phone} - {complaint.user_email}</p>
            </div>
            <div className="complaint-details-item">
                <h3 className='complaint-details-subhead'>Complainant Role :</h3>
                <p className='complaint-details-text'>{complaint.role} - {complaint.hiring_for}</p>
            </div>
            <div className="complaint-details-item">
                <h3 className='complaint-details-subhead'>Complaint Date :</h3>
                <p className='complaint-details-text'>{formatDate(complaint.created_at)}</p>
            </div>
            <h2 className='complaint-details-message-heading'>Message :</h2>
            <p className='complaint-details-text2'>{complaint.message}</p>

            {complaint.attachment_link !== "" && <img src={complaint.attachment_link} alt='complaint' className='complaint-details-image' />}

            {
                complaint.is_read === 0 && 
                    <button className='complaint-details-btn' onClick={markAsRead}>
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
                            'Mark as read'}
                    </button>
            }
        </div>
    )

    const renderLoader = () => (
        <div data-testid="loader" className="compliants-loader-container">
          <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderFailure = () => (
        <div className="compliants-failure">
          <h3 className="compliants-failure-heading">Failed to load complaints</h3>
          <button onClick={fetchComplaint} className="compliants-failure-button">Try Again</button>
        </div>
    )
    const renderSwitchCase = () => {
        switch (apiStatus) {
          case apiStatusConstant.inProgress:
            return renderLoader()
          case apiStatusConstant.success:
            return renderCompliant()
          case apiStatusConstant.failure:
            return renderFailure()
          default:
            return null
        }
    }

    return (
        <div className="complaint-details-con">
            <h1 className='complaint-details-heading'>Complaint Details</h1>
            {renderSwitchCase()}
        </div>
    )
}

export default ComplaintDetails