import { useState } from 'react'
import React from 'react';
import JobsSection from '../JobsSection'
import ViewCandidateDetails from '../ViewCandidates/ViewCandidateDetails'
import ScheduleInterview from '../ViewCandidates/ScheduleInterview'
import './style.css'
import SelectedJoinedPopUp from '../ViewCandidates/SelectedJoinedPopUp'

const JobsPage = () => {
  const [viewCandidateDetails, setViewCandidateDetails] = useState(false)
  const [viewScheduleInterviewPopup, setViewScheduleInterviewPopup] = useState(false)
  const [viewSelectedOrJoinedPopup, setViewSelectedOrJoinedPopup] = useState(false)
  const [candidateId, setCandidateId] = useState('')
  const [interviewDetails, setInterviewDetails] = useState({})
  const [selectedJoined, setSelectedJoined] = useState('')

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

  const onShowSelectedOrJoinedPopup = (email, candidateId, jobId, offerStatus, jobsList, candidateDetails) => {
    setViewSelectedOrJoinedPopup(!viewSelectedOrJoinedPopup)
    setSelectedJoined({
      email,
      candidateId,
      jobId,
      offerStatus,
      jobsList,
      candidateDetails
    })
  }

  return (
      <div className="jobs-container">
        <JobsSection onShowCandidateDetails={onShowCandidateDetails} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} onShowSelectedOrJoinedPopup={onShowSelectedOrJoinedPopup} />
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
        {
          viewSelectedOrJoinedPopup && 
          <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowSelectedOrJoinedPopup}></div>
            <SelectedJoinedPopUp onShowSelectedOrJoinedPopup={onShowSelectedOrJoinedPopup} selectedJoined={selectedJoined} />
          </div>
        }
      </div>
  )
}

export default JobsPage