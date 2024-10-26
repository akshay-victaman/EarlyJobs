import Stepper from 'react-stepper-horizontal';
import { Redirect } from 'react-router-dom';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from 'uuid';
import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import IdentityProofForm from './IdentityProof';
import PersonalDetailsForm from './PersonalDetails';
import QualificationForm from './QualificationForm';
import AboutForm from './AboutForm';
import ReferencesForm from './ReferencesForm';
import app from '../../firebase';
import './style.css'
import Cookies from 'js-cookie';
import FormsFaqs from '../FormsFaqs';
import { metaConstants } from '../../utils/metaConstants';

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

let languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Tamil', label: 'Tamil' },
    { value: 'Kannada', label: 'Kannada' },
    { value: 'Malayalam', label: 'Malayalam' },
    { value: 'Telugu', label: 'Telugu' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'Gujarati', label: 'Gujarati' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Punjabi', label: 'Punjabi' },
    { value: 'Odia', label: 'Odia' }
];

const servicePageAccordianData = [
    {
        label: 'How does EarlyJobs match candidates with job opportunities?',
        content: 'EarlyJobs uses a combination of advanced algorithms and personalized assessments to match candidates with job opportunities that align with their skills, experience, and career goals. Our team also conducts thorough interviews to ensure a good fit.'
    },
    {
        label: 'What industries does EarlyJobs specialize in?',
        content: 'EarlyJobs specializes in a wide range of industries including technology, BPO, finance, marketing, engineering, and more. Our diverse network allows us to cater to various sectors and provide specialized recruitment services.'
    },
    {
        label: 'What is the process for employers to start working with EarlyJobs?',
        content: 'Employers can start working with EarlyJobs by contacting our team through our website or directly reaching out to our sales department. We will discuss your hiring needs, provide a customized recruitment plan, and begin sourcing and screening candidates.'
    },
    {
        label: 'How does EarlyJobs ensure the quality of candidates?',
        content: 'EarlyJobs ensures the quality of candidates through a rigorous screening process that includes background checks, skills assessments, and in-depth interviews. We also consider cultural fit to ensure candidates will thrive in their new roles.'
    },
    {
        label: 'Is there a fee for candidates to use EarlyJobs services?',
        content: 'No, EarlyJobs does not charge candidates for using our recruitment services. Our fees are covered by the employers seeking to hire through our platform, allowing us to offer our services to job seekers at no cost.'
    },
];


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
            value: 'Information Technology'
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
            value: 'Aviation'
        },
        {
            id: 6,
            value: 'Oil And Gas'
        },
        {
            id: 7,
            value: 'Retail'
        },
        {
            id: 8,
            value: 'Education'
        },
        {
            id: 9,
            value: 'Manufacturing'
        },
        {
            id: 10,
            value: 'Consumer Goods'
        },
        {
            id: 11,
            value: 'Health Care'
        },
        {
            id: 12,
            value: 'ITES'
        },
        {
            id: 13,
            value: 'Entertainment'
        },
        {
            id: 14,
            value: 'Finance'
        },
        {
            id: 15,
            value: 'Textile'
        },
        {
            id: 16,
            value: 'Media and news'
        },
        {
            id: 17,
            value: 'Food processing'
        },
        {
            id: 18,
            value: 'Hospitality'
        },
        {
            id: 19,
            value: 'Construction'
        },
        {
            id: 20,
            value: 'Law'
        },
        {
            id: 21,
            value: 'Advertising'
        },
        {
            id: 22,
            value: 'E-commerce'
        },
        {
            id: 23,
            value: 'Other'
        }
    ]

    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)
    const [certification, setCertification] = useState("")
    const [workExperience, setWorkExperience] = useState("")
    const [error, setError] = useState("")
    const [selectedOption, setSelectedOption] = useState("+91");
    const [personalDetails, setPersonalDetails ] = useState({
        fullName: "",
        dob: "",
        gender: "Male",
        phone: "",
        wtspNum: "",
        email: "",
        currBuildingNo: "",
        currStreet: "",
        currArea: "",
        currCity: "",
        currState: "",
        currPin: "",
        permBuildingNo: "",
        permStreet: "",
        permArea: "",
        permCity: "",
        permState: "",
        permPin: "",
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

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.applyAsARecruiter.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.applyAsARecruiter.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.applyAsARecruiter.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.applyAsARecruiter.description);
        }

        return () => {
            document.title = metaConstants.title
            if (metaDescription) {
                metaDescription.setAttribute('content', metaConstants.description); // Replace with the original content if needed
            }
            if (metaKeywords) {
                metaKeywords.setAttribute('content', metaConstants.keywords);
            }
            if (metaSubject) {
                metaSubject.setAttribute('content', metaConstants.description);
            }
        };
    }, [])

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

    const onChangeLanguage = (e) => {
        if(e.value === "") return
        const languages = personalDetails.languages
        languages.push(e.value)
        setPersonalDetails({ ...personalDetails, languages })
        languageOptions = languageOptions.filter((option) => option.value !== e.value)
    }

    const handleLanguageRemove = (index, languageLabel) => {
        const languages = personalDetails.languages
        languages.splice(index, 1)
        setPersonalDetails({ ...personalDetails, languages })
        languageOptions.push({ value: languageLabel, label: languageLabel })
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

    const checkIsUserExists = async (email, phone) => {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/v1/${email}/${phone}`
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok === true) {
            if(data.length > 0) {
                return true
            } else {
                return false
            }
        }
    }

    const onSubmitPersonalDetails = async (e) => {
        e.preventDefault()
        const dob = new Date(personalDetails.dob);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        // Adjust the age if the birthday for this year hasn't occurred yet
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(personalDetails.fullName.trim().length === 0) {
            setError("*Please enter full name")
            return
        } else if(personalDetails.dob.trim().length === 0 || age < 18) {
            setError("*Please select date of birth and age should be greater than or equal to 18 years")
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
        } else if(personalDetails.currBuildingNo.trim().length === 0) {
            setError("*Please enter current building number")
            return
        } else if(personalDetails.currStreet.trim().length === 0) {
            setError("*Please enter current street")
            return
        } else if(personalDetails.currArea.trim().length === 0) {
            setError("*Please enter current area")
            return
        } else if(personalDetails.currCity.trim().length === 0) {
            setError("*Please enter current city")
            return
        } else if(personalDetails.currState.trim().length === 0) {
            setError("*Please enter current state")
            return
        } else if(personalDetails.currPin.trim().length === 0) {
            setError("*Please enter current pincode")
            return
        } else if(personalDetails.permBuildingNo.trim().length === 0) {
            setError("*Please enter permanent building number")
            return
        } else if(personalDetails.permStreet.trim().length === 0) {
            setError("*Please enter permanent street")
            return
        } else if(personalDetails.permArea.trim().length === 0) {
            setError("*Please enter permanent area")
            return
        } else if(personalDetails.permCity.trim().length === 0) {
            setError("*Please enter permanent city")
            return
        } else if(personalDetails.permState.trim().length === 0) {
            setError("*Please enter permanent state")
            return
        } else if(personalDetails.permPin.trim().length === 0) {
            setError("*Please enter permanent pincode")
            return
        } else if(personalDetails.languages.length === 0) {
            setError("*Please enter languages you speak")
            return
        } else if(personalDetails.applyFor.trim().length === 0) {
            setError("*Please select what you want to apply for")
            return
        }

        const isUserExists = await checkIsUserExists(personalDetails.email, personalDetails.phone)
        if(isUserExists) {
            setError("*User already exists with this email or phone number")
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
        if(about.aboutYou.split(/\s+/).length < 100) {
            setError("*Please enter 'about yourself' in minimum of 100 words")
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
        } else if(references.person1.phone === references.person2.phone || references.person1.phone === references.person3.phone || references.person2.phone === references.person3.phone) {
            setError("*Phone numbers should be unique")
            return
        } else if(references.person1.email === references.person2.email || references.person1.email === references.person3.email || references.person2.email === references.person3.email) {
            setError("*Emails should be unique")
            return
        } else if(references.person1.phone === personalDetails.phone || references.person2.phone === personalDetails.phone || references.person3.phone === personalDetails.phone) {
            setError("*Reference phone numbers should not be same as your phone number")
            return
        } else if(references.person1.email === personalDetails.email || references.person2.email === personalDetails.email || references.person3.email === personalDetails.email) {
            setError("*Reference emails should not be same as your email")
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
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, formData, process.env.REACT_APP_EMAILJS_USER_ID)
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

        if(identityProof.aadharNumber.trim().length !== 12) {
            setError("*Please enter valid aadhar number")
            return
        } else if(identityProof.panNumber.trim().length !== 10) {
            setError("*Please enter valid pan number")
            return
        } else if(identityProof.emergencyNumber.trim().length !== 10) {
            setError("*Please enter valid emergency number")
            return
        } else if(identityProof.familyMembers.member1.name.trim().length === 0) {
            setError("*Please enter family member 1 name")
            return
        } else if(identityProof.familyMembers.member1.relationship.trim().length === 0) {
            setError("*Please enter family member 1 relationship")
            return
        } else if(identityProof.familyMembers.member1.organization.trim().length === 0) {
            setError("*Please enter family member 1 organization")
            return
        } else if(identityProof.familyMembers.member1.age.trim().length === 0) {
            setError("*Please enter family member 1 age")
            return
        } else if(identityProof.familyMembers.member1.dependentOnYou1.trim().length === 0) {
            setError("*Please enter family member 1 dependent on you")
            return
        } else if(identityProof.familyMembers.member2.name.trim().length === 0) {
            setError("*Please enter family member 2 name")
            return
        } else if(identityProof.familyMembers.member2.relationship.trim().length === 0) {
            setError("*Please enter family member 2 relationship")
            return
        } else if(identityProof.familyMembers.member2.organization.trim().length === 0) {
            setError("*Please enter family member 2 organization")
            return
        } else if(identityProof.familyMembers.member2.age.trim().length === 0) {
            setError("*Please enter family member 2 age")
            return
        } else if(identityProof.familyMembers.member2.dependentOnYou2.trim().length === 0) {
            setError("*Please enter family member 2 dependent on you")
            return
        } else if(identityProof.familyMembers.member3.name.trim().length === 0) {
            setError("*Please enter family member 3 name")
            return
        } else if(identityProof.familyMembers.member3.relationship.trim().length === 0) {
            setError("*Please enter family member 3 relationship")
            return
        } else if(identityProof.familyMembers.member3.organization.trim().length === 0) {
            setError("*Please enter family member 3 organization")
            return
        } else if(identityProof.familyMembers.member3.age.trim().length === 0) {
            setError("*Please enter family member 3 age")
            return
        } else if(identityProof.familyMembers.member3.dependentOnYou3.trim().length === 0) {
            setError("*Please enter family member 3 dependent on you")
            return
        }
        setError("")
        console.log(identityProof)
        // return
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
                                onChangeLanguage={onChangeLanguage}
                                personalDetails={personalDetails}
                                handleLanguageRemove={handleLanguageRemove}
                                onSubmitPersonalDetails={onSubmitPersonalDetails}
                                languageOptions={languageOptions}
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
                                error={error}
                            />;
            case 5: return renderSuccess();
            default: return null;
        }
    }

    if(Cookies.get('jwt_token')) {
        return <Redirect to='/' />
    }

    return (
        <div className='homepage-container'>
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
                <div className='bde-sub-container'>
                    <div className='bde-content-con'>
                        <h2 className='bde-sub-heading'>Fill the form to Apply as a Recruiter</h2>
                        <p className='bde-sub-text'>Please fill all the required fields</p>
                        <FormsFaqs accordionData={servicePageAccordianData} />
                    </div>
                    <div className='bde-form-con'>
                        {renderAllSections()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { HiringPartnerForm, customStyles}