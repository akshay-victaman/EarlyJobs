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

const Profile = ({onShowCandidateForm, onClickFilter}) => {

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
        const {name, hiringFor, role} = profileData
        return (
        <>
            <img src='/profile-image.png' alt="profile" className="profile-image" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-designation">{role} - {hiringFor}</p>
        </>
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
    return (
        <div className="profile-container">
            {renderSwitch()}
            {
                userRole !== 'BDE' ?
            <>
                {
                    userRole !== 'ADMIN' && <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(1)}>Add Candidate</button>
                }
                {/* <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(1)}>Add Candidate</button> */}
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(2)}>View Candidates</button>
                {
                    userRole === 'AC' && <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(3)}>My {hmType === "CLG" ? "Interns" : "HR Recruiters"}</button>
                }
                {
                    (userRole === 'HR' && offerLetterURL !== '') && <a href={offerLetterURL} style={{textDecoration: 'none', display: 'inline-flex'}} className="job-details-upload-candidate-button" >Download Joining Letter</a>
                }
                {
                    userRole !== 'ADMIN' && <a href='https://firebasestorage.googleapis.com/v0/b/early-jobs.appspot.com/o/HROfferLetters%2Fraja_Thu%20May%2002%202024%2013%3A20%3A42%20GMT%2B0530%20(India%20Standard%20Time).pdf?alt=media&token=56399609-0ec2-4461-9c6e-e6eda3c03032' style={{textDecoration: 'none', display: 'inline-flex'}} className="job-details-upload-candidate-button" >Download Manuals</a>
                }
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(0)}>Assigned Job Openings</button>
            </>
            : 
            <>
                <Link to="/bde-portal" style={{textDecoration: 'none', display: 'inline-flex'}} className="job-details-upload-candidate-button">Post New Job</Link>
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(0)}>My Job Openings</button>
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(4)}>View Hiring Requests</button>
            </>
            }
        </div>
    )
}

export default Profile