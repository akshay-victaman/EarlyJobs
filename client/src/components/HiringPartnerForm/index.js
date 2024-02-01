import Stepper from 'react-stepper-horizontal';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from 'uuid';
import { useEffect, useState } from 'react';
import { FaArrowUp } from "react-icons/fa6";
import emailjs from '@emailjs/browser';
import NavBar from '../NavBar'
import IdentityProofForm from './IdentityProof';
import PersonalDetailsForm from './PersonalDetails';
import QualificationForm from './QualificationForm';
import AboutForm from './AboutForm';
import ReferencesForm from './ReferencesForm';
import app from '../../firebase';
import './style.css'
import Footer from '../Footer';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #EB6A4D',
        borderRadius: '5px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        borderLeft: '1px',
        boxShadow: null,
        '&:hover': {
            borderColor: '#EB6A4D',
        },
        width: '70px',
        height: '35px',
        minHeight: '35px',
        fontSize: '14px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#EB6A4D',
        '&:hover': {
            color: '#EB6A4D',
        },
        width: '15px',
        padding: '0px',
        margin: '0px',
        border: '0px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#EB6A4D' : null,
        color: state.isSelected ? 'white' : 'black',
    }),
};


const HiringPartnerForm = () => {
    const steps = [
        {
            title: 'Personal Details'
        },
        {
            title: 'Qualification/Certification'
        },
        {
            title: 'About'
        },
        {
            title: 'References'
        },
        {
            title: 'Idenetification'
        },
        {
            title: 'Submit'
        }
    ]

    const hiringDept = [
        {
            id: 1,
            value: 'BPO'
        },
        {
            id: 2,
            value: 'IT'
        },
        {
            id: 3,
            value: 'Banking'
        },
        {
            id: 4,
            value: 'Insurance'
        },
        {
            id: 5,
            value: 'Industry'
        },
        {
            id: 6,
            value: 'Other'
        }
    ]

    const [currentStep, setCurrentStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [certification, setCertification] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [languages, setLanguages] = useState("")
    const [error, setError] = useState("")
    const [selectedOption, setSelectedOption] = useState("+91");
    const [personalDetails, setPersonalDetails ] = useState({
        fullName: "",
        dob: "",
        phone: "",
        wtspNum: "",
        email: "",
        currAddress: "",
        permAddress: "",
        languages: [],
        applyFor: ""
    })

    const [qualification, setQualification] = useState({
        highestQualification: "",
        // certification: [],
        workExperience: []
    })

    const [about, setAbout] = useState({
        aboutYou: "",
        WhyJoinUs: "",
        YourContribution: "",
        hours: "",
        hiringDept: [],
        joiningDate: ""
    })

    const [references, setReferences] = useState({
        person1: {
            name: "",
            phone: "",
            email: "",
            organization: "",
            designation: "",
            know: ""
        },
        person2: {
            name: "",
            phone: "",
            email: "",
            organization: "",
            designation: "",
            know: ""
        },
        person3: {
            name: "",
            phone: "",
            email: "",
            organization: "",
            designation: "",
            know: ""
        }
    })

    const [identityProof, setIdentityProof] = useState({
        aadharNumber: "",
        aadharFront: "",
        aadharBack: "",
        panNumber: "",
        panFront: "",
        panBack: "",
        photo: "",
        emergencyNumber: "",
        familyMembers: {
            member1: {
                name: "",
                relationship: "",
                organization: "",
                age: "",
                dependentOnYou1: ""
            },
            member2: {
                name: "",
                relationship: "",
                organization: "",
                age: "",
                dependentOnYou2: ""
            },
            member3: {
                name: "",
                relationship: "",
                organization: "",
                age: "",
                dependentOnYou3: ""
            }
        }
    })

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const toggleVisibility = () => {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleCountryCodeChange = (option) => {
        setSelectedOption(option.value);
    };


    const handleCurrentStep = (step) => {
        setCurrentStep(step)
    }


    // Personal Details Events

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPersonalDetails(prevState => ({ ...prevState, [name]: value}))
    }

    const onChangeLanguage = (event) => {
        setLanguages(event.target.value)
    }

    const handleLanguageChange = (event) => {
        const trimmedLanguage = languages.trim()
        if(trimmedLanguage === "") {
            return
        }
        const language = {
            id: uuidv4(),
            value: trimmedLanguage
        }
        setPersonalDetails(prevState => ({ ...prevState, languages: [...prevState.languages, language]}))
        setLanguages("")
    }

    const handleLanguageRemove = (id) => {
        setPersonalDetails(prevState => ({ ...prevState, languages: prevState.languages.filter((language) => language.id !== id)}))
    }

    // Qualification Events

    const handleQualificationInputChange = (event) => {
        const { name, value } = event.target;
        setQualification(prevState => ({ ...prevState, [name]: value}))
    }

    const onChangeCertification = (event) => {
        setCertification(event.target.value)
    }

    const handleCertificationChange = () => {
        const trimmedCertification = certification.trim()
        if(trimmedCertification === "") {
            return
        }
        const certificationDetails = {
            id: uuidv4(),
            value: trimmedCertification
        }
        setQualification(prevState => ({ ...prevState, certification: [...prevState.certification, certificationDetails]}))
        setCertification("")
    }

    const handleCertificationRemove = (id) => {
        setQualification(prevState => ({ ...prevState, certification: prevState.certification.filter((certification) => certification.id !== id)}))
    }

    const onChangeWorkExperience = (event) => {
        setWorkExperience(event.target.value)

    }

    const handleWorkExperienceChange = () => {
        const trimmedWorkExperience = workExperience.trim()
        if(trimmedWorkExperience === "") {
            return
        }
        const experience = {
            id: uuidv4(),
            value: trimmedWorkExperience
        }
        setQualification(prevState => ({ ...prevState, workExperience: [...prevState.workExperience, experience]}))
        setWorkExperience("")
    }

    const handleWorkExperienceRemove = (id) => {
        setQualification(prevState => ({ ...prevState, workExperience: prevState.workExperience.filter((experience) => experience.id !== id)}))
    }

    // About Events

    const handleAboutInputChange = (event) => {
        const { name, value } = event.target;
        setAbout(prevState => ({ ...prevState, [name]: value}))
    }

    const handleHiringDeptChange = (event) => {
        const isExists = about.hiringDept.includes(event.target.value)
        if(isExists) {
            setAbout(prevState => ({ ...prevState, hiringDept : prevState.hiringDept.filter((dept) => dept !== event.target.value)}))
        } else {
            setAbout(prevState => ({ ...prevState, hiringDept : [...prevState.hiringDept, event.target.value]}))
        }
    }

    // Person 1, 2, 3 Events

    const handlePerson1InputChange = (event) => {
        const { name, value } = event.target;
        setReferences(prevState => ({ ...prevState, person1: {...prevState.person1, [name]: value}}))
    }

    const handlePerson2InputChange = (event) => {
        const { name, value } = event.target;
        setReferences(prevState => ({ ...prevState, person2: {...prevState.person2, [name]: value}}))
    }

    const handlePerson3InputChange = (event) => {
        const { name, value } = event.target;
        setReferences(prevState => ({ ...prevState, person3: {...prevState.person3, [name]: value}}))
    }

    // Identity Proof Events

    const handleIdentityProofInputChange = (event) => {
        const { name, value } = event.target;
        setIdentityProof(prevState => ({ ...prevState, [name]: value}))
    }

    const handleIdentityProofMember1InputChange = (event) => {
        const { name, value } = event.target;
        setIdentityProof(prevState => ({ ...prevState, familyMembers: {...prevState.familyMembers, member1: {...prevState.familyMembers.member1, [name]: value}}}))
    }

    const handleIdentityProofMember2InputChange = (event) => {
        const { name, value } = event.target;
        setIdentityProof(prevState => ({ ...prevState, familyMembers: {...prevState.familyMembers, member2: {...prevState.familyMembers.member2, [name]: value}}}))
    }

    const handleIdentityProofMember3InputChange = (event) => {
        const { name, value } = event.target;
        setIdentityProof(prevState => ({ ...prevState, familyMembers: {...prevState.familyMembers, member3: {...prevState.familyMembers.member3, [name]: value}}}))
    }

    const handleAadharFrontChange = (event) => {
        if(!event.target.files[0]) {
            return
        }
        if(event.target.files[0].size > 100000) {
            alert('File size should be less than 100KB')
            return
        } else if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('File type should be jpeg or png')
            return
        }
        setIdentityProof(prevState => ({ ...prevState, aadharFront : event.target.files[0]}))
    }

    const handleAadharBackChange = (event) => {
        if(!event.target.files[0]) {
            return
        }
        if(event.target.files[0].size > 100000) {
            alert('File size should be less than 100KB')
            return
        } else if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('File type should be jpeg or png')
            return
        }
        setIdentityProof(prevState => ({ ...prevState, aadharBack : event.target.files[0]}))
    }

    const handlePanFrontChange = (event) => {
        if(!event.target.files[0]) {
            return
        }
        if(event.target.files[0].size > 100000) {
            alert('File size should be less than 100KB')
            return
        } else if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('File type should be jpeg or png')
            return
        }
        setIdentityProof(prevState => ({ ...prevState, panFront : event.target.files[0]}))
    }

    const handlePanBackChange = (event) => {
        if(!event.target.files[0]) {
            return
        }
        if(event.target.files[0].size > 100000) {
            alert('File size should be less than 100KB')
            return
        } else if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('File type should be jpeg or png')
            return
        }
        setIdentityProof(prevState => ({ ...prevState, panBack : event.target.files[0]}))
    }

    const handlePhotoChange = (event) => {
        if(!event.target.files[0]) {
            return
        }
        if(event.target.files[0].size > 100000) {
            alert('File size should be less than 100KB')
            return
        } else if(event.target.files[0].type !== 'image/jpeg' && event.target.files[0].type !== 'image/png') {
            alert('File type should be jpeg or png')
            return
        }
        setIdentityProof(prevState => ({ ...prevState, photo : event.target.files[0]}))
    }


    // Form Submit Events

    const onSubmitPersonalDetails = (e) => {
        e.preventDefault()
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(personalDetails.fullName.trim().length === 0) {
            setError("*Please enter full name")
            return
        } else if(personalDetails.dob.trim().length === 0) {
            setError("*Please select date of birth")
            return
        } else if(personalDetails.phone.trim().length < 10 || personalDetails.phone.trim().length > 10) {
            setError("*Please enter valid phone number")
            return
        } else if(personalDetails.wtspNum.trim().length < 10 || personalDetails.wtspNum.trim().length > 10) {
            setError("*Please enter whatsapp number")
            return
        } else if(emailRegex.test(personalDetails.email) === false) {
            setError("*Please enter valid email address")
            return
        } else if(personalDetails.currAddress.trim().length === 0) {
            setError("*Please enter current address")
            return
        } else if(personalDetails.permAddress.trim().length === 0) {
            setError("*Please enter permanent address")
            return
        } else if(languages !== "" && personalDetails.languages.length === 0) {
            setError("*Please enter languages you speak")
            return
        } else if(personalDetails.applyFor.trim().length === 0) {
            setError("*Please select what you want to apply for")
            return
        }

        setError("")
        console.log(personalDetails)
        
        handleCurrentStep(1)
    }

    const onSubmitQualification = (e) => {
        e.preventDefault()
        // if(certification !== "" && qualification.certification.length === 0) {
        //     setError("*Please enter certification")
        //     return
        // } else 
        // if(workExperience !== "" && qualification.workExperience.length === 0) {
        //     setError("*Please enter work experience")
        //     return
        // }
        // setError("")
        console.log(qualification)
        handleCurrentStep(2)
    }

    const onSubmitAbout = (e) => {
        e.preventDefault()
        console.log(about)
        if(about.aboutYou.split(/\s+/).length < 150) {
            setError("*Please enter 'about yourself' in minimum of 150 words")
            return
        } else if(about.WhyJoinUs.split(/\s+/).length < 100) {
            setError("*Please enter 'why you want to join us' in minimum of 100 words")
            return
        } else if(about.YourContribution.split(/\s+/).length < 100) {
            setError("*Please enter 'how you can contribute to society' in minimum of 100 words")
            return
        } else if(about.hours.trim().length === 0) {
            setError("*Please enter how many hours you can contribute daily")
            return
        } else if(about.joiningDate.trim().length === 0) {
            setError("*Please enter how soon you can join")
            return
        } else if(about.hiringDept.length === 0) {
            setError("*Please select hiring department")
            return
        }
        setError("")
        handleCurrentStep(3)
    }

    const onSubmitReferences = (e) => {
        e.preventDefault()
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(references.person1.name.trim().length === 0) {
            setError("*Please enter person 1 name")
            return
        } else if(references.person1.phone.trim().length < 10 || references.person1.phone.trim().length > 10) {
            setError("*Please enter valid person 1 phone number")
            return
        } else if(emailRegex.test(references.person1.email) === false) {
            setError("*Please enter valid person 1 email address")
            return
        }
         else if(references.person1.organization.trim().length === 0) {
            setError("*Please enter person 1 organization")
            return
        } else if(references.person1.designation.trim().length === 0) {
            setError("*Please enter person 1 designation")
            return
        } else if(references.person1.know.trim().length === 0) {
            setError("*Please enter how person 1 know you")
            return
        } else if(references.person2.name.trim().length === 0) {
            setError("*Please enter person 2 name")
            return
        } else if(references.person2.phone.trim().length < 10 || references.person2.phone.trim().length > 10) {
            setError("*Please enter valid person 2 phone number")
            return
        } else if(emailRegex.test(references.person2.email) === false) {
            setError("*Please enter valid person 2 email address")
            return
        } else if(references.person2.organization.trim().length === 0) {
            setError("*Please enter person 2 organization")
            return
        } else if(references.person2.designation.trim().length === 0) {
            setError("*Please enter person 2 designation")
            return
        } else if(references.person2.know.trim().length === 0) {
            setError("*Please enter how person 2 know you")
            return
        } else if(references.person3.name.trim().length === 0) {
            setError("*Please enter person 3 name")
            return
        } else if(references.person3.phone.trim().length < 10 || references.person3.phone.trim().length > 10) {
            setError("*Please enter valid person 3 phone number")
            return
        } else if(emailRegex.test(references.person3.email) === false) {
            setError("*Please enter valid person 2 email address")
            return
        } else if(references.person3.organization.trim().length === 0) {
            setError("*Please enter person 3 organization")
            return
        } else if(references.person3.designation.trim().length === 0) {
            setError("*Please enter person 3 designation")
            return
        } else if(references.person3.know.trim().length === 0) {
            setError("*Please enter how person 3 know you")
            return
        }
        setError("")

        console.log(references)
        handleCurrentStep(4)
    }

    const uploadImage = async (file) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, 'HiringPartnerImages/' + file.name + uuidv4());
        const uploadTask = uploadBytesResumable(storageRef, file);
        let imageURL = "";
      
        // Create a new promise to handle the upload task
        const promise = new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
              console.log(error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              imageURL = downloadURL;
              resolve(imageURL);
            }
          );
        });
      
        // Wait for the promise to resolve, then return the result
        return await promise;
    };

    const sendEmail = (formData) => {
        const languages = formData.personalDetails.languages.map((language) => language.value).join(', ')
        // const certification = formData.qualification.certification.map((certification) => certification.value).join(', ')
        const workExperience = formData.qualification.workExperience.map((experience) => experience.value).join(', ')
        const hiringDept = formData.about.hiringDept.join(', ')
        formData.personalDetails.languages = languages
        formData.qualification.certification = certification
        formData.qualification.workExperience = workExperience
        formData.about.hiringDept = hiringDept
        emailjs.send('service_fnv4y5p', 'template_op0us5b', formData, 'KzUehMbovr5UfqKRr')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
    

    const onSubmitToFirestore = async (formData) => {
        console.log(formData)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "HiringPartnerRequests"), { formData });
        const docId = docRef.id;
        const isApproved = false;
        const AppliedDate = new Date();
        await setDoc(doc(db, "HiringPartnerRequests", docId), { formData: {...formData, isApproved, AppliedDate, docId} });

        console.log(docRef)
        if(docRef) {
            sendEmail(formData)
            handleCurrentStep(5)
        }
        setLoading(false)
    }

    const onSubmitIdentityProof = async (e) => {
        e.preventDefault()

        console.log('triggered')

        setLoading(true)

        const newIdentityProof = { ...identityProof };

        if(identityProof.aadharFront !== "") {
            const aadharFrontURL = await uploadImage(identityProof.aadharFront)
            newIdentityProof.aadharFront = aadharFrontURL;
        }
        if(identityProof.aadharBack !== "") {
            const aadharBackURL = await uploadImage(identityProof.aadharBack)
            newIdentityProof.aadharBack = aadharBackURL;
        }
        if(identityProof.panFront !== "") {
            const panFrontURL = await uploadImage(identityProof.panFront)
            newIdentityProof.panFront = panFrontURL;
        }
        if(identityProof.panBack !== "") {
            const panBackURL = await uploadImage(identityProof.panBack)
            newIdentityProof.panBack = panBackURL;
        }
        if(identityProof.photo !== "") {
            const photoURL = await uploadImage(identityProof.photo)
            newIdentityProof.photo = photoURL;
        }

        setIdentityProof(newIdentityProof); // update the state

        const formData = {
            personalDetails,
            qualification,
            about,
            references,
            newIdentityProof,
        }

        
        onSubmitToFirestore(formData)
    }


    // Render Functions

    const renderSuccess = () => (
        <div className='hr-form-container hr-success-container'>
            <h1 className='form-title'>Thank You!</h1>
            <p className='hr-form-subtitle hr-success'>Your profile has been submitted successfully. We will get back to you soon.</p>
        </div>
    )

    const renderAllSections = () => {
        switch(currentStep) {
            case 0: return <PersonalDetailsForm 
                                handleInputChange={handleInputChange}
                                languages={languages}
                                onChangeLanguage={onChangeLanguage}
                                personalDetails={personalDetails}
                                handleLanguageChange={handleLanguageChange}
                                handleLanguageRemove={handleLanguageRemove}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitPersonalDetails={onSubmitPersonalDetails}
                                error={error}
                            />;
            case 1: return <QualificationForm 
                                handleQualificationInputChange={handleQualificationInputChange}
                                certification={certification}
                                workExperience={workExperience}
                                qualification={qualification}
                                onChangeCertification={onChangeCertification}
                                onChangeWorkExperience={onChangeWorkExperience}
                                handleCertificationChange={handleCertificationChange}
                                handleCertificationRemove={handleCertificationRemove}
                                handleWorkExperienceChange={handleWorkExperienceChange}
                                handleWorkExperienceRemove={handleWorkExperienceRemove}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitQualification={onSubmitQualification}
                                error={error}
                            />;
            case 2: return <AboutForm 
                                handleAboutInputChange={handleAboutInputChange}
                                about={about}
                                hiringDept={hiringDept}
                                handleHiringDeptChange={handleHiringDeptChange}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitAbout={onSubmitAbout}
                                error={error}
                            />;
            case 3: return <ReferencesForm
                                handlePerson1InputChange={handlePerson1InputChange}
                                handlePerson2InputChange={handlePerson2InputChange}
                                handlePerson3InputChange={handlePerson3InputChange}
                                references={references}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitReferences={onSubmitReferences}
                                error={error}
                            />;
            case 4: return <IdentityProofForm 
                                handleIdentityProofInputChange={handleIdentityProofInputChange}
                                handleIdentityProofMember1InputChange={handleIdentityProofMember1InputChange}
                                handleIdentityProofMember2InputChange={handleIdentityProofMember2InputChange}
                                handleIdentityProofMember3InputChange={handleIdentityProofMember3InputChange}
                                identityProof={identityProof}
                                handleAadharFrontChange={handleAadharFrontChange}
                                handleAadharBackChange={handleAadharBackChange}
                                handlePanFrontChange={handlePanFrontChange}
                                handlePanBackChange={handlePanBackChange}
                                handlePhotoChange={handlePhotoChange}
                                handleCurrentStep={handleCurrentStep}
                                onSubmitIdentityProof={onSubmitIdentityProof}
                                loading={loading}
                            />;
            case 5: return renderSuccess();
            default: return null;
        }
    }

    return (
        <div className='homepage-container'>
            <NavBar />
            <div className='hiring-partner-container'>
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
                <Footer />
                {
                    isVisible && 
                    <div className='hiring-partner-go-to-top' onClick={scrollToTop}>
                        <FaArrowUp className='hiring-partner-go-to-top-icon' />
                    </div>
                }
            </div>
        </div>
    )
}

export { HiringPartnerForm, customStyles}