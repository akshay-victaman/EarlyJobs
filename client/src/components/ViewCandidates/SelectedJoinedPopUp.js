import { useState } from "react";
import Cookies from 'js-cookie'
import { formatISO } from "date-fns";
import {toast} from 'react-toastify'


const SelectedJoinedPopUp = ({ onShowSelectedOrJoinedPopup, selectedJoined }) => {

    const { email, candidateId, jobId, offerStatus, jobsList, candidateDetails } = selectedJoined

    const {candidateName, candidateEmail, appliedBy, companyName} = candidateDetails

    console.log("selectedJoined", selectedJoined)
    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const [selectedDate, setSelectedDate] = useState('')
    const [loading, setLoading] = useState(false)

    const sendSelectedEmail = async () => {
        const username = Cookies.get('username')
        const jobName = jobsList.find(job => job.id === jobId).role
        const location = jobsList.find(job => job.id === jobId).location

        let emailContent = `
            Hi ${candidateName},
            <br>
            <br>
            Congratulations! You have been ${offerStatus === "Selected" ? "selected" : "joined"} for the position of ${jobName} with ${companyName} on ${selectedDate} at ${location}.
            <br>
            <br>
            If you need any help, please coordinate with ${username} Victaman, at ${appliedBy} or Earlyjobs call/wtsp: 8217527926.
            <br>
            <br>
            Regards,
            <br> 
            earlyjobs.in team
            <br> 
            Victaman Enterprises
        `
        const encodedContent = encodeURIComponent(emailContent)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: `EarlyJobs - Candidate ${offerStatus === "Selected" ? "Selection" : "Joining"}`,
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Congratulations! You have been ${offerStatus === "Selected" ? "selected" : "joined"}`,
            recipients: `${candidateEmail}`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`

        await fetch(url, {method: "GET", mode: "no-cors"})
    }

    const updateCandidateStatus = async () => {
        if(selectedDate === '') {
            toast.warn('Please select a date')
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
                toast.error(data.error)
            } else {
                onShowSelectedOrJoinedPopup(email, candidateId, jobId, offerStatus, jobsList, candidateDetails)
                sendSelectedEmail()
                toast.success('Candidate status updated successfully')
            }
        } else {
            toast.error(data.error)
        }
        setLoading(false)
    }

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