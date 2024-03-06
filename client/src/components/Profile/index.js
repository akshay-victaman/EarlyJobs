import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
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

    useEffect(() => {
        getProfileData()
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
    return (
        <div className="profile-container">
            {renderSwitch()}
            {/* {userRole === 'HR' && <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(1)}>Add Candidate</button>} */}
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(1)}>Add Candidate</button>
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(2)}>View Candidates</button>
                {
                    userRole === 'AC' && <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(3)}>My HR Recruiters</button>
                }
                <button type="button" className="job-details-upload-candidate-button" onClick={() => onClickButtons(0)}>Assigned Job Openings</button>
        </div>
    )
}

export default Profile