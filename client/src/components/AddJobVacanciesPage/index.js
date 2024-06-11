import { useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import {v4 as uuidv4} from 'uuid';
import Select from 'react-select';
import emailjs from '@emailjs/browser';
import {Oval} from 'react-loader-spinner'
import './style.css';
import app from '../../firebase';
import EditorComponent from '../TextEditorQuill';

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

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #EB6A4D',
        borderRadius: '5px',
        boxShadow: null,
        '&:hover': {
            borderColor: '#EB6A4D',
        },
        marginBottom: '16px',
        width: '100%',
        height: '35px',
        minHeight: '35px',
        fontSize: '14px'
    }),
    menu: (provided, state) => ({
        ...provided,
        marginTop: '0px',
        paddingTop: '0px',
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

const AddJobVacanciesPage = () => {

    const [skills, setSkills] = useState('');
    const [keyword, setKeyword] = useState('');
    const [showJobForm, setShowJobForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [companyError, setCompanyError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [shiftTimingError, setShiftTimingError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [streetAddressError, setStreetAddressError] = useState(false)
    const [areaError, setAreaError] = useState(false)
    const [cityError, setCityError] = useState(false)
    const [pincodeError, setPincodeError] = useState(false)
    const [locationLinkError, setLocationLinkError] = useState(false)
    const [salaryError, setSalaryError] = useState(false)
    const [skillsError, setSkillsError] = useState(false)
    const [languageError, setLanguageError] = useState(false)
    const [employmentError, setEmploymentError] = useState(false)
    const [workError, setWorkError] = useState(false)
    const [commissionError, setCommissionError] = useState(false)
    const [noOfOpeningsError, setNoOfOpeningsError] = useState(false)
    const [hiringNeedError, setHiringNeedError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [contactNoError, setContactNoError] = useState(false)
    const [qualificationError, setQualificationError] = useState(false)
    const [experienceError, setExperienceError] = useState(false)
    const [ageError, setAgeError] = useState(false)
    const [tenureError, setTenureError] = useState(false)

    const [addJobVacancies, setAddJobVacancies] = useState({
        companyName: '',
        jobTitle: '',
        category: '',
        shiftTimings: '',
        jobDescription: '',
        streetAddress: '',
        area: '',
        city: '',
        pincode: '',
        locationLink: '',
        salaryMin: '',
        salaryMax: '',
        skills: [],
        language: [],
        employmentType: '',
        workType: '',
        commission: '',
        commissionType: '',
        tenureInDays: '',
        noOfOpenings: '',
        status: 'Open',
        hiringNeed: '',
        qualification: '',
        minExperience: '',
        maxExperience: '',
        minAge: '',
        maxAge: '',
        keywords: [],
        companyDetails: {
            name: '',
            email: '',
            contactNo: ''
        },
    })


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAddJobVacancies({ ...addJobVacancies, [name]: value})
    }

    const handleEditorChange = (content) => {
        setAddJobVacancies({...addJobVacancies, jobDescription: content})
    }

    const handleCompanyDetailsChange = (e) => {
        const {name, value} = e.target;
        setAddJobVacancies({ ...addJobVacancies, companyDetails: { ...addJobVacancies.companyDetails, [name]: value}})
    }

    const onChangeSkills = (e) => {
        setSkills(e.target.value)
    }

    const onAddSkills = () => {
        const trimmedSkills = skills.trim()
        if(trimmedSkills === '') {
            return
        }
        const newSkill = {
            id: uuidv4(),
            value: trimmedSkills
        }
        setAddJobVacancies({ ...addJobVacancies, skills: [...addJobVacancies.skills, newSkill]})
        setSkills('')
    }

    const onRemoveSkills = (id) => {
        setAddJobVacancies({ ...addJobVacancies, skills: addJobVacancies.skills.filter(skill => skill.id !== id)})
    }

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const onAddKeyword = () => {
        if(addJobVacancies.keywords.length > 30) return
        if(addJobVacancies.keywords.includes(keyword)) return
        const trimmedKeyword = keyword.trim()
        if(trimmedKeyword === '') {
            return
        }
        setAddJobVacancies({ ...addJobVacancies, keywords: [...addJobVacancies.keywords, trimmedKeyword]})
        setKeyword('')
    }

    const onRemoveKeyword = (index) => {
        const keywords = addJobVacancies.keywords
        keywords.splice(index, 1)
        setAddJobVacancies({ ...addJobVacancies, keywords: keywords})
    }

    const handleAddLanguage = (e) => {
        if(e.value === "") return
        const languages = addJobVacancies.language
        languages.push(e.value)
        setAddJobVacancies({ ...addJobVacancies, language: languages })
        languageOptions = languageOptions.filter((option) => option.value !== e.value)
    }

    const handleRemoveLanguage = (index, languageLabel) => {
        const languages = addJobVacancies.language
        languages.splice(index, 1)
        setAddJobVacancies({ ...addJobVacancies, language: languages })
        languageOptions.push({ value: languageLabel, label: languageLabel })
    }

    const toggleJobForm = () => {
        setShowJobForm(!showJobForm)
    }

    const sendEmail = (newJob) => {
        const skills = newJob.skills.map(skill => skill.value).join(', ')
        newJob.skills = skills
        emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID_2, newJob, process.env.REACT_APP_EMAILJS_USER_ID)
        .then((result) => {
            console.log(result.text);
            sendEmail2()
        }, (error) => {
            console.log(error.text);
        });
    };

    const sendEmail2 = async () => {
        const content = `
            Hi ${addJobVacancies.companyDetails.name},<br><br> 
            Your application was successfully sent to us. We will get back to you soon.<br><br> 
            Here is what you have submitted:<br><br> <b>Job Title:</b> ${addJobVacancies.jobTitle}<br> 
            <b>Category:</b> ${addJobVacancies.category}<br> 
            <b>Shift Timings:</b> ${addJobVacancies.shiftTimings}<br> 
            <b>Job Description:</b> ${addJobVacancies.jobDescription}<br> 
            <b>Job Location:</b> ${addJobVacancies.jobLocation}<br> 
            <b>Salary:</b> ${addJobVacancies.salaryMin} - ${addJobVacancies.salaryMax} LPA<br> 
            <b>Skills:</b> ${addJobVacancies.skills.map(skill => skill.value).join(', ')}<br> 
            <b>Employment Type:</b> ${addJobVacancies.employmentType}<br> 
            <b>Work Type:</b> ${addJobVacancies.workType}<br> 
            <b>Commission:</b> ${addJobVacancies.commission} ${addJobVacancies.commissionType}<br> 
            <b>Tenure:</b> ${addJobVacancies.tenureInDays} days<br>
            <b>No of Openings:</b> ${addJobVacancies.noOfOpenings}<br> 
            <b>Status:</b> ${addJobVacancies.status}<br> 
            <b>Hiring Need:</b> ${addJobVacancies.hiringNeed}<br> 
            <b style="border-left: 2px solid green; padding-left: 15px">Company Details:</b><br> 
            <b>Company Name:</b> ${addJobVacancies.companyName}<br> 
            <b>HR Name:</b> ${addJobVacancies.companyDetails.name}<br> 
            <b>HR Email:</b> ${addJobVacancies.companyDetails.email}<br> 
            <b>HR Contact No:</b> ${addJobVacancies.companyDetails.contactNo}<br><br> 
            Thank you,<br> Regards,<br> earlyjobs.in team
        `
        const encodedContent = encodeURIComponent(content)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'EarlyJobs Job Application Received',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Successfully posted job vacancy for ${addJobVacancies.companyName}`,
            recipients: `${addJobVacancies.companyDetails.email},hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`
        const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
        // const data = await response.json()
        if(response.ok === true) {
            // console.log(data)
        }
    }

    
    const onSubmitToFirestore = async (newJob) => {
        console.log(newJob)
        setLoading(true)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "AddJobVacancies"), { newJob });
        const docId = docRef.id;
        const postDateTime = new Date();
        await setDoc(doc(db, "AddJobVacancies", docId), { docId, postDateTime, ...newJob });

        if(docRef) {
            sendEmail(newJob)
            setShowJobForm(false)
            setAddJobVacancies({
                companyName: '',
                jobTitle: '',
                shiftTimings: '',
                category: '',
                jobDescription: '',
                streetAddress: '',
                area: '',
                city: '',
                pincode: '',
                locationLink: '',
                salaryMin: '',
                salaryMax: '',
                skills: [],
                language: [],
                employmentType: '',
                workType: '',
                commission: '',
                commissionType: '',
                tenureInDays: '',
                noOfOpenings: '',
                status: 'Open',
                hiringNeed: '',
                qualification: '',
                minExperience: '',
                maxExperience: '',
                minAge: '',
                maxAge: '',
                keywords: [],
                companyDetails: {
                    name: '',
                    email: '',
                    contactNo: ''
                },
            })
        }
        setLoading(false)
    }


    const validate = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const errors = {
          company: addJobVacancies.companyName.trim().length === 0,
          title: addJobVacancies.jobTitle.trim().length === 0,
          category: addJobVacancies.category.trim().length === 0,
          shiftTimings: addJobVacancies.shiftTimings.trim().length === 0,
          description: addJobVacancies.jobDescription.split(/\s+/).length < 150,
          streetAddress: addJobVacancies.streetAddress.trim().length === 0,
          area: addJobVacancies.area.trim().length === 0,
          city: addJobVacancies.city.trim().length === 0,
          pincode: addJobVacancies.pincode.trim().length === 0,
          locationLink: addJobVacancies.locationLink.trim().length === 0,
          salary: addJobVacancies.salaryMin.trim().length === 0 || addJobVacancies.salaryMax.trim().length === 0,
          skills: addJobVacancies.skills.length === 0,
          language: addJobVacancies.language.length === 0,
          employmentType: addJobVacancies.employmentType.trim().length === 0,
          workType: addJobVacancies.workType.trim().length === 0,
          commission: addJobVacancies.commission.trim().length === 0 || addJobVacancies.commissionType.trim().length === 0,
          tenureInDays: parseInt(addJobVacancies.tenureInDays) < 0 || addJobVacancies.tenureInDays.trim().length === 0,
          noOfOpenings: addJobVacancies.noOfOpenings.trim().length === 0,
          hiringNeed: addJobVacancies.hiringNeed.trim().length === 0,
          name: addJobVacancies.companyDetails.name.trim().length === 0,
          email: !emailRegex.test(addJobVacancies.companyDetails.email),
          contactNo: addJobVacancies.companyDetails.contactNo.length !== 10,
          qualification: addJobVacancies.qualification.trim().length === 0,
          minExperience: parseInt(addJobVacancies.minExperience) < 0 || addJobVacancies.minExperience.length === 0 || parseInt(addJobVacancies.minExperience) > parseInt(addJobVacancies.maxExperience),
          maxExperience: parseInt(addJobVacancies.maxExperience) < 0 || addJobVacancies.maxExperience.length === 0 || parseInt(addJobVacancies.maxExperience) < parseInt(addJobVacancies.minExperience),
          minAge: parseInt(addJobVacancies.minAge) < 18 || addJobVacancies.minAge.trim().length === 0 || parseInt(addJobVacancies.minAge) > parseInt(addJobVacancies.maxAge),
          maxAge: parseInt(addJobVacancies.maxAge) < 18 || addJobVacancies.maxAge.trim().length === 0 || parseInt(addJobVacancies.maxAge) < parseInt(addJobVacancies.minAge)
        
        };
      
        // Set errors in state
        setCompanyError(errors.company);
        setTitleError(errors.title);
        setCategoryError(errors.category);
        setShiftTimingError(errors.shiftTimings);
        setDescriptionError(errors.description);
        setStreetAddressError(errors.streetAddress);
        setAreaError(errors.area);
        setCityError(errors.city);
        setPincodeError(errors.pincode);
        setLocationLinkError(errors.locationLink);
        setSalaryError(errors.salary);
        setSkillsError(errors.skills);
        setLanguageError(errors.language);
        setEmploymentError(errors.employmentType);
        setWorkError(errors.workType);
        setCommissionError(errors.commission);
        setTenureError(errors.tenureInDays);
        setNoOfOpeningsError(errors.noOfOpenings);
        setHiringNeedError(errors.hiringNeed);
        setNameError(errors.name);
        setEmailError(errors.email);
        setContactNoError(errors.contactNo);
        setQualificationError(errors.qualification);
        setExperienceError(errors.minExperience || errors.maxExperience);
        setAgeError(errors.minAge || errors.maxAge);
      
        return !Object.values(errors).some(Boolean);
    };

    const handlePostJob = (e) => {
        e.preventDefault();

        const isValid = validate();
        console.log(isValid)

        if (!isValid) {
            setError("*Please fill all the required fields");
            return;
        }

        setError("");

        const newJob = {
            companyName : addJobVacancies.companyName,
            title: addJobVacancies.jobTitle,
            category: addJobVacancies.category,
            shiftTimings: addJobVacancies.shiftTimings,
            description: addJobVacancies.jobDescription,
            streetAddress: addJobVacancies.streetAddress,
            area: addJobVacancies.area,
            city: addJobVacancies.city,
            pincode: addJobVacancies.pincode,
            location: `${addJobVacancies.streetAddress}, ${addJobVacancies.area}, ${addJobVacancies.city}, ${addJobVacancies.pincode}`,
            locationLink: addJobVacancies.locationLink,
            salaryMin: addJobVacancies.salaryMin,
            salaryMax: addJobVacancies.salaryMax,
            skills: addJobVacancies.skills,
            language: addJobVacancies.language.join(', '),
            employmentType: addJobVacancies.employmentType,
            workType: addJobVacancies.workType,
            commission: addJobVacancies.commission,
            commissionType: addJobVacancies.commissionType,
            tenureInDays: addJobVacancies.tenureInDays,
            noOfOpenings: addJobVacancies.noOfOpenings,
            status: addJobVacancies.status,
            hiringNeed: addJobVacancies.hiringNeed,
            companyDetails: addJobVacancies.companyDetails,
            qualification: addJobVacancies.qualification,
            minExperience: addJobVacancies.minExperience,
            maxExperience: addJobVacancies.maxExperience,
            minAge: addJobVacancies.minAge,
            maxAge: addJobVacancies.maxAge,
            keywords: addJobVacancies.keywords.join(', ')
        }

        console.log(newJob)
        // return
        onSubmitToFirestore(newJob)
    }

    const renderJobForm = () => (
        <form className='bde-job-form' onSubmit={handlePostJob}>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
            
            <label className='bde-form-label' htmlFor='title'>Job Title<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='title' onChange={handleInputChange} value={addJobVacancies.jobTitle} name='jobTitle' type='text' placeholder='Enter Job Title' />
            {titleError && <p className='hr-error'>*Please enter job title</p>}
            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='category'  onChange={handleInputChange} value={addJobVacancies.category} name='category' >
                        <option value=''>Select Category</option>
                        <option value='IT'>IT</option>
                        <option value='Non-IT'>Non-IT</option>
                        <option value='BPO'>BPO</option>
                    </select>
                    {categoryError && <p className='hr-error'>*Please select category</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='shiftTimings'>Shift Timings<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='shiftTimings'  onChange={handleInputChange} value={addJobVacancies.shiftTimings} name='shiftTimings'>
                        <option value=''>Select Shift Timings</option>
                        <option value='Day Shift'>Day Shift</option>
                        <option value='Night Shift'>Night Shift</option>
                    </select>
                    {shiftTimingError && <p className='hr-error'>*Please select shift timings</p>}
                </div>
            </div>
            
            <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <EditorComponent content={addJobVacancies.jobDescription} handleEditorChange={handleEditorChange} />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='streetAddress'>Street Address<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='streetAddress'  onChange={handleInputChange} value={addJobVacancies.streetAddress} name='streetAddress' type='text' placeholder='Enter Street Address' />
                    {streetAddressError && <p className='hr-error'>*Please enter street address</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='area'>Area<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='area'  onChange={handleInputChange} value={addJobVacancies.area} name='area' type='text' placeholder='Enter Area' />
                    {areaError && <p className='hr-error'>*Please enter area</p>}
                </div>
            </div>

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='city'>City<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='city'  onChange={handleInputChange} value={addJobVacancies.city} name='city' type='text' placeholder='Enter City' />
                    {cityError && <p className='hr-error'>*Please enter city</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='pincode'>Pincode<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='pincode'  onChange={handleInputChange} value={addJobVacancies.pincode} name='pincode' type='text' placeholder='Enter Pincode' />
                    {pincodeError && <p className='hr-error'>*Please enter pincode</p>}
                </div>
            </div>
            
            <label className='bde-form-label' htmlFor='location-link'>Location Link<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='location-link'  onChange={handleInputChange} value={addJobVacancies.locationLink} name='locationLink' type='text' placeholder='Enter Location Link' />
            {locationLinkError && <p className='hr-error'>*Please enter location link</p>}

            <label className='bde-form-label' htmlFor='salary'>Salary(in LPA)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={addJobVacancies.salaryMin} name='salaryMin' type='number' placeholder='Minimum - INR' />
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={addJobVacancies.salaryMax} name='salaryMax' type='number' placeholder='Maximum - INR' />
            </div>
            {salaryError && <p className='hr-error'>*Please enter minimum & maximum salary</p>}

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con salary-input">
                    <label htmlFor='skills' className='hr-label'>Skills<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            addJobVacancies.skills.map((skill) => (
                                <div className='hr-input-list' key={skill.id}>
                                    <p className='hr-input-list-item'>{skill.value}</p>
                                    <button type='button' className='hr-remove-item-button' onClick={() => onRemoveSkills(skill.id)}><IoIosClose className='hr-close-icon' /></button>
                                </div>
                            ))
                        }
                    </div>
                    <div className='hr-input-con'>
                        <input type='text' list='skills-data' placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills'  onChange={onChangeSkills} />
                        <datalist id="skills-data">
                            <option value="Basic Computer Knowledge">Basic Computer Knowledge</option>
                            <option value="MS Office">MS Office</option>
                            <option value="Data Entry">Data Entry</option>
                            <option value="Tally">Tally</option>
                            <option value="Accounting">Accounting</option>
                            <option value="Customer Support">Customer Support</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Social Media Marketing">Social Media Marketing</option>
                            <option value="Content Writing">Content Writing</option>
                            <option value="SEO">SEO</option>
                            <option value="Graphic Designing">Graphic Designing</option>
                            <option value="Communication">Communication</option>
                        </datalist>
                        <button type='button' className='hr-form-btn-add' onClick={onAddSkills}>+Add</button>
                    </div>
                    <p className='hr-size'>Type a Skill and click 'Add' button to add it to the list</p>
                    {skillsError && <p className='hr-error'>*Please enter skills</p>}
                </div>

                <div className="upload-candidate-input-con salary-input">
                    <label className="homepage-label" htmlFor='languages'>Spoken Languages<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            addJobVacancies.language.map((language, index) => (
                                <div className='hr-input-list' key={index}>
                                    <p className='hr-input-list-item'>{language}</p>
                                    <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveLanguage(index, language)}><IoIosClose className='hr-close-icon' /></button>
                                </div>
                            ))
                        }
                    </div>
                    <Select
                        options={languageOptions}
                        defaultValue={languageOptions.length !== 0 && { label: languageOptions[0].label }}
                        isSearchable={true}
                        onChange={handleAddLanguage}
                        styles={customStyles}
                    />
                    {languageError && <p className='hr-error'>*Please select language</p> }
                </div>
            </div>

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='employment-type'>Employment Type<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='employment-type'  onChange={handleInputChange} name='employmentType' value={addJobVacancies.employmentType} >
                        <option value=''>Select Employment Type</option>
                        <option value='Full Time'>Full Time</option>
                        <option value='Part Time'>Part Time</option>
                        <option value='Internship'>Internship</option>
                        <option value='Contract'>Contract</option>
                        <option value='Freelance'>Freelance</option>
                    </select>
                    {employmentError && <p className='hr-error'>*Please select employment type</p> }
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='work-type'>Work Type<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='work-type'  onChange={handleInputChange} value={addJobVacancies.workType} name='workType'>
                        <option value=''>Select Work Type</option>
                        <option value='On Site'>On Site</option>
                        <option value='Remote'>Remote</option>
                        <option value='Hybrid'>Hybrid</option>
                    </select>
                    {workError && <p className='hr-error'>*Please select work type</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='commission'>Consultancy Recruitment Fee(per candidate)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <select className='bde-form-input commission-select salary-input'  onChange={handleInputChange} value={addJobVacancies.commissionType} name='commissionType'>
                    <option value=''>Select Fee Type</option>
                    <option value='Fixed'>Fixed</option>
                    <option value='Percentage'>Percentage</option>
                </select>
                <div className='commission-input-con'>
                    {
                        addJobVacancies.commissionType === 'Fixed' && <p className='rupee'>₹</p>
                    }
                    <input className='commission-input'  id='commission' type='number' onChange={handleInputChange} value={addJobVacancies.commission} name='commission' placeholder={addJobVacancies.commissionType==="Fixed" ? "5500" : "8.33"} />
                    {
                        addJobVacancies.commissionType === 'Fixed' ?
                        <p className=''>Per Joining
                        </p>
                        :
                        addJobVacancies.commissionType === 'Percentage' ?
                        <p className=''>% of Annual CTC</p>
                        :
                        <p className=''>Select Fee Type</p>
                    }
                    
                </div>
            </div>
            {commissionError && <p className='hr-error'>*Please select commission type & enter commission</p>}

            <label className='bde-form-label' htmlFor='tenure'>Days Completion (Tenure)<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='tenure'  type='number' onChange={handleInputChange} value={addJobVacancies.tenureInDays} name='tenureInDays' placeholder='Enter Tenure in days' />
            {tenureError && <p className='hr-error'>*Please enter tenure in days</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='no-of-openings'>No of Openings<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='no-of-openings'  type='number' onChange={handleInputChange} value={addJobVacancies.noOfOpenings} name='noOfOpenings' placeholder='Enter No of Openings' />
                    {noOfOpeningsError && <p className='hr-error'>*Please enter no of openings</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='hiring-need'>Hiring Need<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='hiring-need'  onChange={handleInputChange} value={addJobVacancies.hiringNeed} name='hiringNeed'>
                        <option value=''>Select Hiring Need</option>
                        <option value='Immediate'>Immediate</option>
                        <option value='Future'>Future</option>
                    </select>
                    {hiringNeedError && <p className='hr-error'>*Please select hiring need</p>}
                </div>
            </div>

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='min-qual'>Minimum Qualification<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='min-qual' name='qualification' value={addJobVacancies.qualification} onChange={handleInputChange}>
                        <option value=''>Select Qualification</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="ITI">ITI</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Graduation (10 + 2 + 3)">Graduation (10 + 2 + 3)</option>
                        <option value="Graduation (10 + 2 + 4)">Graduation (10 + 2 + 4)</option>
                        <option value="Post Graduation">Post Graduation</option>
                        <option value="PhD">PhD</option>
                    </select>
                    {qualificationError && <p className='hr-error'>*Please enter Minimum Qualification</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='experience'>Total Experience (In years)<span className='hr-form-span'> *</span></label>
                    <div className='experience-sub-con'>
                        <input className='bde-form-input emp-work-input experience-bde-input' id='experience'  type='number' onChange={handleInputChange} value={addJobVacancies.minExperience} name='minExperience' placeholder='Min' />
                        <input className='bde-form-input emp-work-input experience-bde-input' type='number' onChange={handleInputChange} value={addJobVacancies.maxExperience} name='maxExperience' placeholder='Max' />
                    </div>
                    {experienceError && <p className='hr-error'>*Please enter Minimum Experience</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='age'>Age<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='age'  onChange={handleInputChange} value={addJobVacancies.minAge} name='minAge' type='number' placeholder='Minimum age' />
                <input className='bde-form-input salary-input'  onChange={handleInputChange} value={addJobVacancies.maxAge} name='maxAge' type='number' placeholder='Maximum age' />
            </div>
            {ageError && <p className='hr-error'>*Please enter Age &gt;= 18</p>}
            
            <label className='bde-form-label'>Also Search For<span className='hr-form-span'> (Max 30 keywords)</span></label>
            <div className='hr-input-list-con'>
                {
                    addJobVacancies.keywords.map((keyword, index) => (
                        <div className='hr-input-list' key={index}>
                            <p className='hr-input-list-item'>{keyword}</p>
                            <button type='button' className='hr-remove-item-button' onClick={() => onRemoveKeyword(index)}><IoIosClose className='hr-close-icon' /></button>
                        </div>
                    ))
                }
            </div>
            <div className='hr-input-con'>
                <input type='text' placeholder="Ex: Customer Support" className='hr-input-sub' value={keyword} id='keywords' name='keywords'  onChange={onChangeKeyword} />
                <button type='button' className='hr-form-btn-add' onClick={onAddKeyword}>+Add</button>
            </div>

            <label className='bde-form-label spoc-label'>Your Company Details<span className='hr-form-span'> *</span></label>
            <label className='bde-form-label' htmlFor='company'>Comapany Name<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='company'  onChange={handleInputChange} value={addJobVacancies.companyName} name='companyName' type='text' placeholder='Enter Company Name' />
            {companyError && <p className='hr-error'>*Please enter company name</p>}
            <label className='bde-form-label' htmlFor='name'>HR Name<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='name' type='text'  onChange={handleCompanyDetailsChange} value={addJobVacancies.companyDetails.name} name='name' placeholder='Enter HR Name' />
            {nameError && <p className='hr-error'>*Please enter HR name</p>}
            <label className='bde-form-label' htmlFor='email'>HR Email<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='email' type='email'  onChange={handleCompanyDetailsChange} value={addJobVacancies.companyDetails.email} name='email' placeholder='Enter HR Email' />
            {emailError && <p className='hr-error'>*Please enter HR valid email</p>}
            <label className='bde-form-label' htmlFor='phone'>HR Contact No.<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='phone' type='number'  onChange={handleCompanyDetailsChange} value={addJobVacancies.companyDetails.contactNo} name='contactNo' placeholder='Enter HR Contact No' />
            {contactNoError && <p className='hr-error'>*Please enter HR contact no</p>}
            <button className='bde-form-btn' type='submit' disabled={loading} > 
                {loading ? 
                    <Oval
                        height={20}
                        width={20}
                        color="#ffffff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#ffffff"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                    :
                    "Add Job"
                }
            </button>
            <p className='hr-main-error'>{error}</p>
        </form>
    )

    const renderAnotherJobButton = () => (
        <div className='add-job-container'>
            <h1 className='bde-heading-another-job'>🎉 Successfully Posted the Job Details 🎉</h1>
            <button className='bde-form-btn-an' onClick={toggleJobForm}>Add Another Job</button>
        </div>
    )

    return (
        <>
        <div className='bde-container'>
            <div className='bde-content'>
                <h1 className='bde-heading'><span className='head-span'>Add Job Vacancies</span></h1>
                { showJobForm ? renderJobForm() : renderAnotherJobButton()}
            </div>
        </div>
        </>
    )
}

export default AddJobVacanciesPage