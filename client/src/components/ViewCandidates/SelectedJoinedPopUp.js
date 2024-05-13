import { useState } from "react";
import Cookies from 'js-cookie'
import { formatISO } from "date-fns";


const SelectedJoinedPopUp = ({ onShowSelectedOrJoinedPopup, selectedJoined }) => {

    const { email, candidateId, jobId, offerStatus } = selectedJoined

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const [selectedDate, setSelectedDate] = useState('')
    const [loading, setLoading] = useState(false)

    const updateCandidateStatus = async () => {
        if(selectedDate === '') {
            alert('Please select a date')
            return;
        }

        const candidateData = {
            candidateId,
            jobId,
            email,
            offerStatus,
            offeredDate: formatISO(new Date(selectedDate))
        }
        console.log(candidateData)
        // return;
        setLoading(true)
        const url = `${backendUrl}/jobs/candidate/status/update`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(candidateData)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
            } else {
                onShowSelectedOrJoinedPopup(email, candidateId, jobId, offerStatus)
            }
        } else {
            alert(data.error)
        }
        setLoading(false)
    }

    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const renderSelectedOrJoined = () => (
        <>
            <label htmlFor="interviewDate" className="homepage-label">{offerStatus === "Joined" ? "Joined" : "Selected"} Date</label>
            <input type="date" id="interviewDate" name="interviewDate" value={selectedDate}  onChange={(e) => setSelectedDate(e.target.value)} className="homepage-input" required />
            <button className="login-button" onClick={updateCandidateStatus} disabled={loading}>Select</button>
            <button className="candidate-details-close-btn" onClick={onShowSelectedOrJoinedPopup} disabled={loading}>
                &times;
            </button>
        </>
    )

    return (
        <div className="candidate-details-modal-con">
            <h1 className="candidate-details-heading">{offerStatus === "Joined" ? "Join" : "Select"} Candidate</h1>
            {renderSelectedOrJoined()}
        </div>
    );
};

export default SelectedJoinedPopUp;