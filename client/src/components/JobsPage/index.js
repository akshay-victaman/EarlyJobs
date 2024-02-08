import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import JobsSection from '../JobsSection'
import NavBar from '../NavBar'
import './style.css'
import Footer from '../Footer'
import { useState } from 'react'
import ViewCandidateDetails from '../ViewCandidates/ViewCandidateDetails'

const JobsPage = () => {
  const [viewCandidateDetails, setViewCandidateDetails] = useState(false)
  const [candidateId, setCandidateId] = useState('')

  const onShowCandidateDetails = (candidateId) => {
    setViewCandidateDetails(!viewCandidateDetails)
    setCandidateId(candidateId)
  }

  const role = Cookies.get('role')

  if (role === 'BDE') {
    return <Redirect to="/bde-portal" />
  }

  return (
    <>
      <NavBar isLoggedIn={true} />
      <div className="jobs-container">
        <JobsSection onShowCandidateDetails={onShowCandidateDetails} />
        {
          viewCandidateDetails && 
          <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={onShowCandidateDetails}></div>
            <ViewCandidateDetails onShowCandidateDetails={onShowCandidateDetails} candidateId={candidateId} />
          </div>
        }
      </div>
      <Footer />
    </>
  )
}

export default JobsPage