import Stepper from 'react-stepper-horizontal';
import React from 'react';
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import Cookie from 'js-cookie';
import IdentityProofForm from '../HiringPartnerForm/IdentityProof';
import PersonalDetailsForm from '../HiringPartnerForm/PersonalDetails';
import QualificationForm from '../HiringPartnerForm/QualificationForm';
import AboutForm from '../HiringPartnerForm/AboutForm';
import ReferencesForm from '../HiringPartnerForm/ReferencesForm';
import Victaman_intern_offer_letter from "../../assets/Joining_Letter_for_Internship.pdf"
import Victaman_Freelance_Contract from "../../assets/Freelance_Recruiter_Contract.pdf"

import app from '../../firebase';
import RenderSuccess from '../HiringPartnerForm/RenderSuccess';

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

const HiringManagerDetailsForm = () => {
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
        password: "",
        confirmPassword: "",
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
        hiringDept: []
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

    useEffect(() => {
        getUserDetailsFromDB()
    }, []);
    
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
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
            setPersonalDetails(prevState => ({
                 ...prevState, 
                 fullName: data[0].username, 
                 email: data[0].email, 
                 phone: data[0].phone,
                 applyFor: data[0].hiring_for
            }))
            setAbout(prevState => ({
                ...prevState,
                hiringDept: data[0].hiring_category.split(',')
            }))
        }
    }      

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
        } else if(personalDetails.password.length < 6 || personalDetails.password !== personalDetails.confirmPassword) {
            setError("*Password should be minimum 6 characters and should match with confirm password")
            return
        }  else if(personalDetails.currBuildingNo.trim().length === 0) {
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
        }

        setError("")
        console.log(personalDetails)
        
        handleCurrentStep(1)
    }

    const onSubmitQualification = (e) => {
        e.preventDefault()
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
        const storageRef = ref(storage, 'HiringManagerImages/' + file.name + uuidv4());
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

    const getOfferLetterCount = async () => {
        const date = format(new Date(), 'yyyy-MM-dd')
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/offer-letter-count/${date}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + Cookie.get('jwt_token')
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        console.log(Object.keys(data).length === 0)
        let count = 0;
        if(response.ok === true) {
            if(Object.keys(data).length === 0) {
                count = 0
            } else {
                count = data.count.count
            }
            return count
        } else {
            setError(data.error)
            return false
        }
    }

    const updateOfferLetterCount = async () => {
        const date = format(new Date(), 'yyyy-MM-dd')
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/offer-letter-count/update/${date}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + Cookie.get('jwt_token')
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
                return false
            } else {
                setError("")
                console.log(data.message)
                return true
            }
        } else {
            setError(data.error)
            return false
        }
    }

    const uploadPdf = async (pdfFile) => {
        const result = await updateOfferLetterCount();
        if(!result) return;
        const storage = getStorage(app);
        const storageRef = ref(storage, `HROfferLetters/${personalDetails.fullName}_${Date()}.pdf`);
        const uploadTask = uploadBytesResumable(storageRef, pdfFile);
        let pdfURL = '';
      
        // Create a new promise to handle the upload task
        const promise = new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
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
              pdfURL = downloadURL;
              resolve(pdfURL);
            }
          );
        });
      
        return promise;
    }; 

    const generatePDF = async () => {
        const count = await getOfferLetterCount();
        if(count === false) return;
        try {
            // Load the existing PDF
            let pdfDoc;
            if(personalDetails.applyFor === "Intern HR Recruiter") {
                const response = await fetch(Victaman_intern_offer_letter); // Load the PDF bytes using your preferred method
                const arrayBuffer = await response.arrayBuffer();
                const existingPdfBytes = new Uint8Array(arrayBuffer);
        
                // Load the PDF document
                pdfDoc = await PDFDocument.load(existingPdfBytes);
            } else {
                const response = await fetch(Victaman_Freelance_Contract); // Load the PDF bytes using your preferred method
                const arrayBuffer = await response.arrayBuffer();
                const existingPdfBytes = new Uint8Array(arrayBuffer);
        
                // Load the PDF document
                pdfDoc = await PDFDocument.load(existingPdfBytes);
            }
      
            // Modify the PDF content as needed
            // Example: Add text to the first page
            const currDate = new Date();
            const day = currDate.getDate();
            const month = currDate.getMonth() + 1;
            const year = currDate.getFullYear();
            const currDateStr = `${day < 10 ? "0"+day : day}- ${month < 10 ? "0"+month : month}- ${year}`;
            const dateRefCount = `- Vic/${format(currDate, 'yy/MMM/dd')}/${(count+1).toString()}`;
            const dateAfter3Days = addDays(currDate, 3);
            const lastJoiningDate = format(dateAfter3Days, 'MMMM dd, yyyy');
            const currAddress = personalDetails.currAddress ? personalDetails.currAddress : `${personalDetails.currBuildingNo}, ${personalDetails.currStreet}, ${personalDetails.currArea}, ${personalDetails.currCity}, ${personalDetails.currState}, ${personalDetails.currPin}`;

            if(personalDetails.applyFor === "Intern HR Recruiter") {
                const pdfDate = pdfDoc.getPages()[0];
                pdfDate.drawText(currDateStr, {
                    x: 79, 
                    y: 729,
                    size: 10,
                });
                const pdfRef = pdfDoc.getPages()[0];
                pdfRef.drawText(dateRefCount, {
                    x: 470, 
                    y: 729,
                    size: 10.5,
                });
                const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
                const pdfName = pdfDoc.getPages()[0];
                pdfName.drawText(personalDetails.fullName, { 
                    x: 84,
                    y: 706,
                    size: 12,
                    font: timesRomanFont,
                });
                const pdfAddress = pdfDoc.getPages()[0];
                pdfAddress.drawText(currAddress, { 
                    x: 95, 
                    y: 692,
                    size: 12,
                    font: timesRomanFont,
                });
                const pdfJoiningDate = pdfDoc.getPages()[0];
                pdfJoiningDate.drawText(`${lastJoiningDate}`, { 
                    x: 499, 
                    y: 618.5,
                    size: 10,
                });
            } else if (personalDetails.applyFor === "Freelance HR Recruiter") {
                const pdfDate = pdfDoc.getPages()[0];
                pdfDate.drawText(currDateStr, {
                    x: 345, 
                    y: 681,
                    size: 12,
                });
                const pdfRef = pdfDoc.getPages()[0];
                pdfRef.drawText("Ref: " +dateRefCount, {
                    x: 440, 
                    y: 716,
                    size: 11,
                });
                const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
                const pdfName = pdfDoc.getPages()[0];
                pdfName.drawText(personalDetails.fullName, { 
                    x: 44,
                    y: 632,
                    size: 14,
                    font: timesRomanFont,
                });
                const pdfAddress = pdfDoc.getPages()[0];
                pdfAddress.drawText(personalDetails.currAddress, { 
                    x: 275, 
                    y: 632,
                    size: 14,
                    font: timesRomanFont,
                });
            }
      
            // Save the modified PDF
            const modifiedPdfBytes = await pdfDoc.save();
      
            // Perform further actions (e.g., send the modified PDF to the server, download, etc.)
            console.log('PDF Modified:', modifiedPdfBytes);
            
            try {
                const pdfURL = await uploadPdf(modifiedPdfBytes);
                // setSignUpDetails({ ...signUpDetails, resumeUrl: pdfURL })
                // return modifiedPdfBytes;
                return pdfURL;
            } catch (error) {
                console.error('Error uploading PDF:', error);
            }

          } catch (error) {
            console.error('Error modifying PDF:', error);
          }
    }

    const updateUserDetailsAndPassowrdInDB = async (email, docId, location, password, gender) => {
        const user = {
            email,
            docId,
            location,
            password,
            gender
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
                // handleCurrentStep(5)
            }
        } else {
            setError(data.error)
        }
    }
    
    const postOfferLetterToDB = async (pdfURL) => {
        const offerLetter = {
            offerLetterUrl: pdfURL,
        }
        const email = Cookies.get('email')
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/hr-resumes/${email}`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + Cookie.get('jwt_token')
            },
            body: JSON.stringify(offerLetter)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                return true;
            }
        } else {
            setError(data.error)
        }
    }

    const onSubmitToFirestore = async (formData) => {
        console.log(formData)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "HiringManagerDetails"), { formData });
        const docId = docRef.id;
        const UpdatedDateTime = new Date();
        await setDoc(doc(db, "HiringManagerDetails", docId), { formData: {...formData, UpdatedDateTime, docId} });

        console.log(docRef)
        if(docRef) {
            const currAddress = personalDetails.currAddress ? personalDetails.currAddress : `${personalDetails.currBuildingNo}, ${personalDetails.currStreet}, ${personalDetails.currArea}, ${personalDetails.currCity}, ${personalDetails.currState}, ${personalDetails.currPin}`;
            await updateUserDetailsAndPassowrdInDB(personalDetails.email, docId, currAddress, personalDetails.password, personalDetails.gender)
            const role = Cookies.get('role')
            if(role === "HR") {
                const pdfURL = await generatePDF()
                await postOfferLetterToDB(pdfURL);
            }
        }
        setLoading(false)
        handleCurrentStep(5)
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

        await onSubmitToFirestore(formData)
    }


    // Render Functions

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
            case 5: return <RenderSuccess />;
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

export { HiringManagerDetailsForm, customStyles}