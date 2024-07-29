import { useEffect } from 'react'
import OpeningsSection from '../../components/OpeningsSection'
import './style.css'

const OpeningsPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Openings | EarlyJobs'

  }, [])

  return (
      <div className="jobs-container openings-page-container">
        <OpeningsSection />
      </div>
  )
}

export default OpeningsPage