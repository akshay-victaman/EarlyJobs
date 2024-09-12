import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { ThreeCircles } from 'react-loader-spinner'
import './style.css'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const Profile = ({onShowCandidateForm, onClickFilter, showCandidateForm}) => {

    const [profileData, setProfileData] = useState({})
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [offerLetterURL, setOfferLetterURL] = useState('')

    useEffect(() => {
        getProfileData()
        if(Cookies.get('role') === 'HR') {
            getHrOfferLetter()
        }
    }, [])

    const getProfileData = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const email = Cookies.get('email')
        const apiUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/${email}`
        const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
        },
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            if(data.error) {
                setApiStatus(apiStatusConstant.failure)
                return
            } else if(data.length > 0){
                const updatedData = {
                    name: data[0].username,
                    hiringFor: data[0].hiring_for,
                    role: data[0].role,
                    gender: data[0].gender
                }
                setProfileData(updatedData)
                setApiStatus(apiStatusConstant.success)
                return
            }
            setApiStatus(apiStatusConstant.failure)
        } else {
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const getHrOfferLetter = async () => {
        const jwtToken = Cookies.get('jwt_token')
        const email = Cookies.get('email')
        const apiUrl = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/hr-offer-letter/${email}`
        const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
        },
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        console.log(data)
        if (response.ok === true) {
            if(data.error) {
                return
            } else if(data.length > 0){
                setOfferLetterURL(data[0].resume_url)
            }
        }
    }

    const renderFailure = () => (
        <div className="profile-failure-con">
            <button
                type="button"
                className="profile-failure-button"
                onClick={getProfileData}
            >
                Retry
            </button>
        </div>
    )

    const onClickButtons = (view) => {
        onShowCandidateForm(view)
        onClickFilter()
    }


    const renderProfileDetails = () => {
        const {name, hiringFor, role, gender} = profileData
        let profileURL = ''
        let prefix = ''
        if(gender === "Male") {
            profileURL = '/boy_profile.jpg';
            prefix = 'Mr.'
        } else if(gender === "Female") {
            profileURL = '/girl-profile.avif';
            prefix = 'Ms.'
        } else {
            profileURL = '/other_profile.avif';
            prefix = 'Mx.'
        }
        return (
        <div className='profile-content-con'>
            <img src={profileURL} alt="profile" className="profile-image" />
            <h1 className="profile-name">{prefix} {name}</h1>
            <p className="profile-designation">{role} - {hiringFor}</p>
        </div>
        )
    }

    const renderLoader = () => (
        <div data-testid="loader" className="loader-container-job">
            <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderSwitch = () => {
        switch (apiStatus) {
        case apiStatusConstant.inProgress:
            return renderLoader()
        case apiStatusConstant.success:
            return renderProfileDetails()
        case apiStatusConstant.failure:
            return renderFailure()
        default:
            return null
        }
    }

    const userRole = Cookies.get('role')
    const hmType = Cookies.get('hm_type')

    let manualURL = ''; 
    if(userRole === 'HR') {
        if(profileData.hiringFor === 'Intern HR Recruiter') {
            manualURL = '/intern_manual.pdf'
        } else if(profileData.hiringFor === 'Fulltime HR Recruiter') {
            manualURL = '/fulltime_manual.pdf'
        } else {
            manualURL = '/Freelance_manual.pdf'
        }
    } else if(userRole === 'AC') {
        manualURL = '/HM_manual.pdf'
    } else {
        manualURL = '/BDE_manual.pdf'
    }

    return (
        <div className="profile-container">
            {renderSwitch()}
            <hr className="line" />
            {
                userRole !== 'BDE' ?
                <div className='profile-button-con'>
                    {
                        userRole !== 'ADMIN' && <button type="button" className={`profile-button ${showCandidateForm === 1 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(1)}>Add Candidate</button>
                    }
                    <button type="button" className={`profile-button ${showCandidateForm === 2 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(2)}>View Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 5 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(5)}>Selected Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 6 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(6)}>Joined Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 7 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(7)}>Ongoing Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 8 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(8)}>Rescheduled Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 9 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(9)}>Attended Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 10 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(10)}>Not-Attended Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 11 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(11)}>Rejected Candidates</button>
                    {(userRole === 'AC' || userRole === "SHM" || profileData.hiringFor === 'Freelance HR Recruiter') && <button type="button" className={`profile-button ${showCandidateForm === 12 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(12)}>View Tenure Status</button>}
                    {
                        (userRole === 'AC' || userRole === "SHM") && 
                        <>
                            <button type="button" className={`profile-button ${showCandidateForm === 13 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(13)}>View Applications</button>
                            <button type="button" className={`profile-button ${showCandidateForm === 3 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(3)}>My {hmType === "CLG" ? "Interns" : userRole === "SHM" ? "Hiring Managers" : "HR Recruiters"}</button>
                        </>
                    }
                    {
                        (userRole === 'HR' && offerLetterURL !== '') && <a href={offerLetterURL} style={{textDecoration: 'none', display: 'inline-flex'}} className="profile-button" >Download Joining Letter</a>
                    }
                    {
                        userRole !== 'ADMIN' && <a href={manualURL} target='_blank' style={{textDecoration: 'none', display: 'inline-flex'}} className="profile-button" >Download Manuals</a>
                    }
                    <button type="button" className={`profile-button ${showCandidateForm === 0 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(0)}>Assigned Job Openings</button>
                    {
                        (userRole === 'HR' && profileData.hiringFor === 'Intern HR Recruiter') && <button type="button" className={`profile-button ${showCandidateForm === 16 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(16)}>Candidates of the Day</button>
                    }
                </div>
                : 
                <div className='profile-button-con'>
                    <Link to="/bde-portal" style={{textDecoration: 'none', display: 'inline-flex'}} className="profile-button">Post New Job</Link>
                    <button type="button" className={`profile-button ${showCandidateForm === 1 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(1)}>Add Candidate</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 0 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(0)}>My Job Openings</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 14 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(14)}>View Companies</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 4 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(4)}>View Hiring Requests</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 2 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(2)}>View Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 5 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(5)}>Selected Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 6 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(6)}>Joined Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 11 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(11)}>Rejected Candidates</button>
                    <button type="button" className={`profile-button ${showCandidateForm === 15 ? "active-profile-button" : ""}`} onClick={() => onClickButtons(15)}>Payout</button>
                </div>
            }
        </div>
    )
}

export default Profile