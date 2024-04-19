import Cookies from "js-cookie"
import { useState } from "react"
import { MdOutlineEditCalendar } from "react-icons/md";


const UpdateCandidateStatus = ({onShowCandidateDetails, onShowScheduleInterviewPopup, candidateDetails, jobId, jobsList, candidateList, setCandidateList}) => {
    const [updateOfferStatus, setUpdateOfferStatus] = useState('');
    const [loading, setLoading] = useState(false)
    const {candidateName,candidateEmail, candidatePhone, candidateId, offerStatus, appliedBy, interviewDate, companyName} = candidateDetails
    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const handleCandidateStatusChange = event => {
        if(event.target.value === '') return;
        setUpdateOfferStatus(event.target.value)
        const updateOfferStatus = event.target.value;
        updateCandidateStatus(candidateId, jobId, updateOfferStatus)
    }

    const updateCandidateStatus = async (candidateId, jobId, updateOfferStatus) => {
        const email = Cookies.get('email')
        const candidateData = {
          candidateId,
          jobId,
          email: appliedBy,
          offerStatus: updateOfferStatus
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
                setCandidateList(candidateList.map(eachItem => {
                  if(eachItem.candidateId === candidateId) {
                    return {
                      ...eachItem,
                      offerStatus: updateOfferStatus
                    }
                  }
                  return eachItem
                }))
            }
        } else {
            alert(data.error)
        }
        setLoading(false)
    }

    return (
        <tr className="job-details-candidates-table-row">
            <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(candidateId)}>
                {candidateName}
            </td>
            <td className="job-details-candidates-table-cell">
            {companyName}
            </td>
            <td className="job-details-candidates-table-cell">
            {candidatePhone}
            </td>
            <td className="job-details-candidates-table-cell">
            {offerStatus}
            </td>
            {
                Cookies.get('role') !== 'HR' &&
                <td className="job-details-candidates-table-cell">
                {appliedBy}
                </td>
            }
            <td className="job-details-candidates-table-cell" style={{display: "flex"}} >
                {interviewDate}
                {Cookies.get('role') !== 'ADMIN' &&
                    <button type="button" className="shedule-interview-button" onClick={() => onShowScheduleInterviewPopup(jobId, candidateDetails, jobsList, setCandidateList, candidateList)} >
                        <MdOutlineEditCalendar className="shedule-icon" />
                    </button>
                }
            </td>
            {
                Cookies.get('role') !== 'ADMIN' && (
                <td className="job-details-candidates-table-cell">
                    {
                        !loading ? 
                        (
                            <select className="homepage-input candidate-input-select" id='offerStatus' disabled={offerStatus === 'Accepted' || offerStatus === 'Rejected'} value={updateOfferStatus} onChange={handleCandidateStatusChange}>
                                <option value=''>Select Offer Status</option>
                                <option value='Selected'>Selected</option>
                                <option value='Attended'>Attended</option>
                                <option value='Not Attended'>Not Attended</option>
                                <option value='Rejected'>Rejected</option>
                                <option value='Ongoing'>Ongoing</option>
                                <option value='Rescheduled'>Rescheduled</option>
                                <option value='Joined'>Joined</option>
                            </select>
                        )
                        :
                        <p className="loading-text">Please Wait...</p>
                    }
                </td>
            )}
        </tr>
    )
}

export default UpdateCandidateStatus