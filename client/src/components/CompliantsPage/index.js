import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import CompliantItem from "./CompliantItem";
import './style.css'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const ComplaintsPage = () => {

    const [complaintView, setComplaintView] = useState('INBOX')
    const [complaints, setComplaints] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)

    useEffect(() => {
        fetchUnReadCompliants()
    }, [])

    const handleComplaintView = (view) => {
        setComplaintView(view)
        if(view === 'INBOX') {
            fetchUnReadCompliants()
        } else {
            fetchReadCompliants()
        }
    }
    

    const fetchUnReadCompliants = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/complaints/unread`
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
                setComplaints(result)
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const fetchReadCompliants = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/complaints/read`
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
                setComplaints(result)
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const renderCompliants = () => (
        complaints.length > 0 && complaints.map(compliant => (
            <CompliantItem key={compliant.id} compliant={compliant} />
        ))
    )

    const renderLoader = () => (
        <div data-testid="loader" className="compliants-loader-container">
          <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderNoCompliants = () => (
        <div className="compliants-no-compliants">
          <h3>No Complaints</h3>
        </div>
    )

    const renderFailure = () => (
        <div className="compliants-failure">
          <h3 className="compliants-failure-heading">Failed to load complaints</h3>
          <button onClick={complaintView === 'INBOX' ? fetchUnReadCompliants : fetchReadCompliants} className="compliants-failure-button">Try Again</button>
        </div>
    )

    const renderSwitchCase = () => {
        switch (apiStatus) {
          case apiStatusConstant.inProgress:
            return renderLoader()
          case apiStatusConstant.success:
            return complaints.length > 0 ? renderCompliants() : renderNoCompliants()
          case apiStatusConstant.failure:
            return renderFailure()
          default:
            return null
        }
    }

    return (
        <div className="complaints-page-con">
            <div className="complaints-page-button-con">
                <button className={`complaints-page-button ${complaintView === 'INBOX' ? 'active-button' : ''}`} onClick={() => handleComplaintView('INBOX')}>Inbox</button>
                <button className={`complaints-page-button ${complaintView === 'PREV' ? 'active-button' : ''}`} onClick={() => handleComplaintView('PREV')}>Previous</button>
            </div>
            <hr className='compliants-line' />
            <ul className="complaints-page-list">
                { renderSwitchCase() }
            </ul>
        </div>
    )
}

export default ComplaintsPage;