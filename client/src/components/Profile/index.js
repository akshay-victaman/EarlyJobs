import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { ThreeCircles } from 'react-loader-spinner'
import './style.css'
import { render } from '@testing-library/react'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const jobsListDummy = {
    profileImageUrl: '/profile-image.png',
    name: 'Ravi Teja',
    shortBio: 'Software Developer at Victaman',
}

const Profile = ({onShowCandidateForm, onClickFilter}) => {

    const [profileData, setProfileData] = useState(jobsListDummy)
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)

    // useEffect(() => {
    //     getProfileData()
    // }, [])

    // const getProfileData = async () => {
    //     setApiStatus(apiStatusConstant.inProgress)
    //     const jwtToken = Cookies.get('jwt_token')
    //     const apiUrl = 'https://apis.ccbp.in/profile'
    //     const options = {
    //     method: 'GET',
    //     headers: {
    //         Authorization: `Bearer ${jwtToken}`,
    //     },
    //     }
    //     const response = await fetch(apiUrl, options)
    //     const data = await response.json()
    //     if (response.ok === true) {
    //     const updatedData = {
    //         name: data.profile_details.name,
    //         profileImageUrl: data.profile_details.profile_image_url,
    //         shortBio: data.profile_details.short_bio,
    //     }
    //     setProfileData(updatedData)
    //     setApiStatus(apiStatusConstant.success)
    //     } else {
    //     setApiStatus(apiStatusConstant.failure)
    //     }
    // }

    // const renderFailure = () => (
    //     <div className="profile-failure-con">
    //     <button
    //         type="button"
    //         className="profile-failure-button"
    //         onClick={getProfileData}
    //     >
    //         Retry
    //     </button>
    //     </div>
    // )

    const onClickButtons = (view) => {
        onShowCandidateForm(view)
        onClickFilter()
    }

    const renderProfileDetails = () => {
        const role = Cookies.get('role')
        const {name, profileImageUrl, shortBio} = profileData
        return (
        <div className="profile-container">
            <img src={profileImageUrl} alt="profile" className="profile-image" />
            <h1 className="profile-name">{name}</h1>
            <p className="profile-designation">{shortBio}</p>
            {role === 'HR' && <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(1)}>Add Candidate</button>}
            <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(2)}>View Candidates</button>
            <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(0)}>Assigned Job Openings</button>
        </div>
        )
    }

    const renderLoader = () => (
        <div data-testid="loader" className="loader-container-job">
        <ThreeCircles type="ThreeDots" color="#f9a828" height="50" width="50" />
        </div>
    )

 
    // switch (apiStatus) {
    //   case apiStatusConstant.inProgress:
    //     return renderLoader()
    //   case apiStatusConstant.success:
    //     return renderProfileDetails()
    //   case apiStatusConstant.failure:
    //     return renderFailure()
    //   default:
    //     return null
    // }
    return renderProfileDetails()
}

export default Profile