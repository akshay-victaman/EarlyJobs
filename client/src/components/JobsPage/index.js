import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom'
import JobsSection from '../JobsSection'
import NavBar from '../NavBar'
import './style.css'
import Footer from '../Footer'

const JobsPage = () => {
  
  const role = Cookies.get('role')

  if (role === 'BDE') {
    return <Redirect to="/bde-portal" />
  }

  return (
    <>
      <NavBar isLoggedIn={true} />
      <div className="jobs-container">
        <JobsSection />
      </div>
      <Footer />
    </>
  )
}

export default JobsPage