import { useEffect, useState } from "react"
import React from 'react';
import Stepper from 'react-stepper-horizontal';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CollegeAgency from "./CollegeAgency"
import AdditionalDetails from "./AdditionalDetails";
import Cookies from "js-cookie";
import app from "../../firebase";


const CollegeAgencyForm = () => {

    const steps = [
        {
            title: 'Organisation Details'
        },
        {
            title: 'Additional Details'
        },
        {
            title: 'Submit'
        },
    ]

    const [currentStep, setCurrentStep] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [collegeAgencyDetails, setCollegeAgencyDetails ] = useState({
        orgName: "",
        officePhone: "",
        officeEmail: "",
        password: "",
        confirmPassword: "",
        officeAddress: "",
        panNum: "",
        GSTNum: ""
    })

    const [additionalDetails, setAdditionalDetails] = useState({
        person1: {
            name: "",
            phone: "",
            email: ""
        },
        person2: {
            name: "",
            phone: "",
            email: ""
        }
    })

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        getUserDetailsFromDB()
    }, []);

    const getUserDetailsFromDB = async () => {
        const email = Cookies.get('email')
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/${email}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        const response = await fetch(url, options)
        const data = await response.json();
        console.log(data)
        if(response.ok === true) {
            setCollegeAgencyDetails(prevState => ({
                 ...prevState, 
                 orgName: data[0].username, 
                 officeEmail: data[0].email, 
                 officePhone: data[0].phone,
            }))
        }
    }      

    const handleCurrentStep = (step) => {
        setCurrentStep(step)
    }

    const handleInputChange = (e) => {
        setCollegeAgencyDetails({
            ...collegeAgencyDetails,
            [e.target.name]: e.target.value
        })
    }

    const handlePerson1InputChange = (e) => {
        const { name, value } = e.target
        setAdditionalDetails(prevState => ({
            ...prevState,
            person1: {
                ...prevState.person1,
                [name]: value
            }
        }))
    }

    const handlePerson2InputChange = (e) => {
        const { name, value } = e.target
        setAdditionalDetails(prevState => ({
            ...prevState,
            person2: {
                ...prevState.person2,
                [name]: value
            }
        }))
    }

    const onSubmitOrganisationDetails = (e) => {
        e.preventDefault()
        const userDetailsId =Cookies.get('user_details_id')
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(collegeAgencyDetails.orgName.trim().length === 0) {
            setError("Please enter a valid name")
            return
        }
        if(collegeAgencyDetails.officePhone.length !== 10) {
            setError("Please enter a valid phone number")
            return
        }
        if(!emailRegex.test(collegeAgencyDetails.officeEmail)) {
            setError("Please enter a valid email address")
            return
        }
        if(collegeAgencyDetails.password.length < 6 || collegeAgencyDetails.password !== collegeAgencyDetails.confirmPassword) {
            setError("*Password should be minimum 6 characters and should match with confirm password")
            return
        }
        if(collegeAgencyDetails.officeAddress.trim().length === 0) {
            setError("Please enter a valid office address")
            return
        }
        if(collegeAgencyDetails.panNum.trim().length !== 10 && userDetailsId === "AGY") {
            setError("Please enter a valid PAN number")
            return
        }

        setError("")
        console.log(collegeAgencyDetails)
        handleCurrentStep(1)
    }

    const updateUserDetailsAndPassowrdInDB = async (email, docId, location, password) => {
        const user = {
            email,
            docId,
            location,
            password
        }
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/update`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(user)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                // sendEmail(formData)
                handleCurrentStep(2)
            }
        } else {
            setError(data.error)
        }
        setLoading(false)
    }

    const onSubmitToFirestore = async (formData) => {
        console.log(formData)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "OrganizationDetails"), { formData });
        const docId = docRef.id;
        const UpdatedDateTime = new Date();
        await setDoc(doc(db, "OrganizationDetails", docId), { formData: {...formData, UpdatedDateTime, docId} });

        console.log(docRef)
        if(docRef) {
            updateUserDetailsAndPassowrdInDB(collegeAgencyDetails.officeEmail, docId, collegeAgencyDetails.officeAddress, collegeAgencyDetails.password)
        }
    }

    const onSubmitAdditionalDetails = (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(additionalDetails.person1.name.trim().length === 0) {
            setError("Please enter a valid Person 1 name")
            return
        }
        if(additionalDetails.person1.phone.length !== 10) {
            setError("Please enter a valid Person 1 phone number")
            return
        }
        if(!emailRegex.test(additionalDetails.person1.email)) {
            setError("Please enter a valid Person 1 email address")
            return
        }
        if(additionalDetails.person2.name.trim().length === 0) {
            setError("Please enter a valid Person 2 name")
            return
        }
        if(additionalDetails.person2.phone.length !== 10) {
            setError("Please enter a valid Person 2 phone number")
            return
        }
        if(!emailRegex.test(additionalDetails.person2.email)) {
            setError("Please enter a valid Person 2 email address")
            return
        }

        setError("")
        console.log(additionalDetails)
        setLoading(true)
        const formData = {
            collegeAgencyDetails,
            additionalDetails,
        }

        
        onSubmitToFirestore(formData)
    }

    const renderSuccess = () => {
        Cookies.remove('user_details_id')
        return(
            <div className='hr-form-container hr-success-container'>
                <p className='hr-form-subtitle hr-success'>Your profile has been updated successfully.</p>
                <button className='hr-form-btn' onClick={() => window.location.reload()}>View Assigned Jobs</button>
            </div>
        )
    }

    const renderAllSections = () => {
        switch(currentStep) {
            case 0: return <CollegeAgency 
                                handleInputChange={handleInputChange}
                                collegeAgencyDetails={collegeAgencyDetails}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitOrganisationDetails={onSubmitOrganisationDetails}
                                error={error}
                            />;
            case 1: return <AdditionalDetails
                                handlePerson1InputChange={handlePerson1InputChange}
                                handlePerson2InputChange={handlePerson2InputChange}
                                additionalDetails={additionalDetails}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitAdditionalDetails={onSubmitAdditionalDetails}
                                loading={loading}
                                error={error}
                            />;
            case 2: return renderSuccess();
            default: return null;
        }
    }

    return (
        <div className='hiring-partner-container' style={{marginTop: "0px"}}>
            <div className='stepper-container'>
                <Stepper 
                    activeColor="#EB6A4D" 
                    completeColor="#EB6A4D" 
                    activeTitleColor="#EB6A4D" 
                    titleFontSize={windowWidth < 768 ? 10 : 15}
                    size={windowWidth < 768 ? 25 : 35}
                    circleFontSize={windowWidth < 768 ? 12 : 16}
                    completeBorderColor="#EB6A4D" 
                    completeBarColor="#EB6A4D"
                    steps={ steps } 
                    activeStep={ currentStep } 
                />
            </div>
            {renderAllSections()}
        </div>
    )
}

export default CollegeAgencyForm