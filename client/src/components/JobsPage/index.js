import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import JobsSection from '../JobsSection'
import NavBar from '../NavBar'
import './style.css'
import Footer from '../Footer'
import { useState } from 'react'
import ViewCandidateDetails from '../ViewCandidates/ViewCandidateDetails'
import ScheduleInterview from '../ViewCandidates/ScheduleInterview'

const JobsPage = () => {
  const [viewCandidateDetails, setViewCandidateDetails] = useState(false)
  const [viewScheduleInterviewPopup, setViewScheduleInterviewPopup] = useState(false)
  const [candidateId, setCandidateId] = useState('')
  const [interviewDetails, setInterviewDetails] = useState({})

  const onShowCandidateDetails = (candidateId) => {
    setViewCandidateDetails(!viewCandidateDetails)
    setCandidateId(candidateId)
  }

  const onShowScheduleInterviewPopup = (jobId, candidateDetails, jobsList, setCandidateList, candidateList) => {
    setViewScheduleInterviewPopup(!viewScheduleInterviewPopup)
    setInterviewDetails({
      jobId,
      candidateDetails,
      setCandidateList,
      candidateList,
      jobsList
    })
  }

  return (
    <>
      {/* <NavBar isLoggedIn={true} /> */}
      <div className="jobs-container">
        <JobsSection onShowCandidateDetails={onShowCandidateDetails} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup}/>
        {
          viewCandidateDetails && 
          <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowCandidateDetails}></div>
            <ViewCandidateDetails onShowCandidateDetails={onShowCandidateDetails} candidateId={candidateId} />
          </div>
        }
        {
          viewScheduleInterviewPopup && 
          <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowScheduleInterviewPopup}></div>
            <ScheduleInterview onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} interviewDetails={interviewDetails} />
          </div>
        }
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default JobsPage