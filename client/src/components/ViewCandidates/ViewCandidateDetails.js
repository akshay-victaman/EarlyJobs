import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import { parseISO, format } from 'date-fns';
import { ThreeCircles } from 'react-loader-spinner'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const ViewCandidateDetails = (props) => {
    const { onShowCandidateDetails, candidateId } = props;
    const [candidateDetails, setCandidateDetails] = useState({})
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const backendUrl = process.env.REACT_APP_BACKEND_API_URL
    useEffect(() => {
        if(candidateId !== '') {
            getCandidateDetails();
        }
    }, [candidateId])

    const getCandidateDetails = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const url = `${backendUrl}/jobs/candidate/details/${candidateId}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
                console.log(data.error)
                setApiStatus(apiStatusConstant.failure)
            } else {
                const formattedData = {
                    candidateId: data.id,
                    aadharNumber: data.aadhar_number,
                    createdAt: data.created_at,
                    currentLocation: data.current_location,
                    dateOfBirth: data.date_of_birth,
                    email: data.email,
                    experienceInMonths: data.experience_in_months,
                    experienceInYears: data.experience_in_years,
                    fatherName: data.father_name,
                    gender: data.gender,
                    highestQualification: data.highest_qualification,
                    jobCategory: data.job_category,
                    name: data.name,
                    phone: data.phone,
                    skills: data.skills,
                    spokenLanguages: data.spoken_languages,
                }
                setCandidateDetails(formattedData)
                setApiStatus(apiStatusConstant.success)
            }
        } else {
            alert(data.error)
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const { aadharNumber, createdAt, currentLocation, dateOfBirth, email, experienceInMonths, experienceInYears,
        fatherName, gender, highestQualification, jobCategory, name, phone, skills, spokenLanguages } = candidateDetails;

    let formattedDOB = null;
    let formattedCreatedAt = null;
    if(dateOfBirth !== undefined && createdAt !== undefined) {
        const date = parseISO(dateOfBirth);
        formattedDOB = format(date, 'MMM dd yyyy');
        const date2 = parseISO(createdAt);
        formattedCreatedAt = format(date2, 'MMM dd yyyy - hh:mm:ss a');
    }

    const renderCandidateDetails = () => (
        <>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Full Name: </p>
                <p className="candidate-details-sub-text">{name}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Father Name: </p>
                <p className="candidate-details-sub-text">{fatherName}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Email: </p>
                <p className="candidate-details-sub-text">{email}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Phone: </p>
                <p className="candidate-details-sub-text">{phone}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Date of birth: </p>
                <p className="candidate-details-sub-text">{formattedDOB}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Gender: </p>
                <p className="candidate-details-sub-text">{gender}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Aadhaar Number: </p>
                <p className="candidate-details-sub-text">{aadharNumber}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Highest Qualification: </p>
                <p className="candidate-details-sub-text">{highestQualification}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Current Location: </p>
                <p className="candidate-details-sub-text">{currentLocation}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Spoken Languages: </p>
                <p className="candidate-details-sub-text">{spokenLanguages}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Experience: </p>
                <p className="candidate-details-sub-text">{experienceInYears} Years {experienceInMonths} Months</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Job Category: </p>
                <p className="candidate-details-sub-text">{jobCategory}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Skills: </p>
                <p className="candidate-details-sub-text">{skills}</p>
            </div>
            <div className="candidate-details-sub-con">
                <p className="candidate-details-sub-heading">Created At: </p>
                <p className="candidate-details-sub-text">{formattedCreatedAt}</p>
            </div>
            <button className="candidate-details-close-btn" onClick={onShowCandidateDetails}>
                &times;
            </button>
        </>
    )

    const renderFailure = () => (
        <div className="candidate-failure-con">
            <p className="candidate-failure-text">Something went wrong!</p>
            <button className="candidate-try-agian-btn" onClick={getCandidateDetails}>Try Again</button>
            <button className="candidate-details-close-btn" onClick={onShowCandidateDetails}>
                &times;
            </button>
        </div>
    )

    const renderInProgress = () => (
        <div data-testid="loader" className="candidate-loader-container">
            <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstant.inProgress:
                return renderInProgress();
            case apiStatusConstant.success:
                return renderCandidateDetails();
            case apiStatusConstant.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="candidate-details-modal-con">
            <h1 className="candidate-details-heading">Candidate Details</h1>
            {renderSwitchCase()}
        </div>
    );
}

export default ViewCandidateDetails;