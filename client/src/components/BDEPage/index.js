import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import {Redirect} from 'react-router-dom';
import Select from 'react-select';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import NavBar from '../NavBar';
import './style.css';
import Footer from '../Footer';
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

const BDEPage = () => {

    const [accountManagers, setAccountManagers] = useState([])

    const [skills, setSkills] = useState('');
    const [showJobForm, setShowJobForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [companyError, setCompanyError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [shiftTimingError, setShiftTimingError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [locationError, setLocationError] = useState(false)
    const [salaryError, setSalaryError] = useState(false)
    const [skillsError, setSkillsError] = useState(false)
    const [languageError, setLanguageError] = useState(false)
    const [employmentError, setEmploymentError] = useState(false)
    const [workError, setWorkError] = useState(false)
    const [commissionError, setCommissionError] = useState(false)
    const [noOfOpeningsError, setNoOfOpeningsError] = useState(false)
    const [hiringNeedError, setHiringNeedError] = useState(false)
    const [assignedToError, setAssignedToError] = useState(false)
    const [qualificationError, setQualificationError] = useState(false)
    const [experienceError, setExperienceError] = useState(false)
    const [ageError, setAgeError] = useState(false)

    const [postNewJob, setPostNewJob] = useState({
        companyName: '',
        jobTitle: '',
        category: '',
        shiftTimings: '',
        jobDescription: '',
        jobLocation: '',
        salaryMin: '',
        salaryMax: '',
        skills: [],
        language: [],
        employmentType: '',
        workType: '',
        commission: '',
        commissionType: '',
        noOfOpenings: '',
        status: 'Open',
        hiringNeed: '',
        assignedTo: [],
        qualification: '',
        minExperience: '',
        maxExperience: '',
        minAge: '',
        maxAge: ''
    })

    useEffect(() => {
        const fetchAccountManagers = async () => {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                },
            }
            const backendUrl = process.env.REACT_APP_BACKEND_API_URL
            const response = await fetch(`${backendUrl}/api/users/all/account-managers`, options)
            const data = await response.json()
            setAccountManagers(data)
            console.log(data)
        }
        fetchAccountManagers()
    }, [])


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setPostNewJob({...postNewJob, [name]: value})  
    }

    const handleEditorChange = (content) => {
        setPostNewJob({...postNewJob, jobDescription: content})
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
        setPostNewJob({ ...postNewJob, skills: [...postNewJob.skills, newSkill]})
        setSkills('')
    }

    const onRemoveSkills = (id) => {
        setPostNewJob({ ...postNewJob, skills: postNewJob.skills.filter(skill => skill.id !== id)})
    }

    const handleAddLanguage = (e) => {
        if(e.value === "") return
        const languages = postNewJob.language
        languages.push(e.value)
        setPostNewJob({ ...postNewJob, language: languages })
        languageOptions = languageOptions.filter((option) => option.value !== e.value)
    }

    const handleRemoveLanguage = (index, languageLabel) => {
        const languages = postNewJob.language
        languages.splice(index, 1)
        setPostNewJob({ ...postNewJob, language: languages })
        languageOptions.push({ value: languageLabel, label: languageLabel })
    }

    const handleAddHiringManager = (e) => {
        if(e.target.value === "") return
        if(postNewJob.assignedTo.includes(e.target.value)) return;
        const hiringManagers = postNewJob.assignedTo
        hiringManagers.push(e.target.value)
        setPostNewJob({ ...postNewJob, assignedTo: hiringManagers })
    }

    const handleRemoveHiringManager = (email) => {
        const hiringManagers = postNewJob.assignedTo.filter(item => item !== email)
        setPostNewJob({ ...postNewJob, assignedTo: hiringManagers })
    }

    const toggleJobForm = () => {
        setShowJobForm(!showJobForm)
    }

    const validate = () => {
        const errors = {
          company: postNewJob.companyName.trim().length === 0,
          title: postNewJob.jobTitle.trim().length === 0,
          category: postNewJob.category.trim().length === 0,
          shiftTimings: postNewJob.shiftTimings.trim().length === 0,
          description: postNewJob.jobDescription.split(/\s+/).length < 150,
          location: postNewJob.jobLocation.trim().length === 0,
          salary: postNewJob.salaryMin.trim().length === 0 || postNewJob.salaryMax.trim().length === 0,
          skills: postNewJob.skills.length === 0,
          language: postNewJob.language.length === 0,
          employmentType: postNewJob.employmentType.trim().length === 0,
          workType: postNewJob.workType.trim().length === 0,
          commission: postNewJob.commission.trim().length === 0 || postNewJob.commissionType.trim().length === 0,
          noOfOpenings: postNewJob.noOfOpenings.trim().length === 0,
          hiringNeed: postNewJob.hiringNeed.trim().length === 0,
          assignedTo: postNewJob.assignedTo.length === 0,
          qualification: postNewJob.qualification.trim().length === 0,
          minExperience: parseInt(postNewJob.minExperience) < 0 || postNewJob.minExperience.length === 0 || parseInt(postNewJob.minExperience) > parseInt(postNewJob.maxExperience),
          maxExperience: parseInt(postNewJob.maxExperience) < 0 || postNewJob.maxExperience.length === 0 || parseInt(postNewJob.maxExperience) < parseInt(postNewJob.minExperience),
          minAge: parseInt(postNewJob.minAge) < 18 || postNewJob.minAge.trim().length === 0 || parseInt(postNewJob.minAge) > parseInt(postNewJob.maxAge),
          maxAge: parseInt(postNewJob.maxAge) < 18 || postNewJob.maxAge.trim().length === 0 || parseInt(postNewJob.maxAge) < parseInt(postNewJob.minAge)
        };
      
        // Set errors in state
        setCompanyError(errors.company);
        setTitleError(errors.title);
        setCategoryError(errors.category);
        setShiftTimingError(errors.shiftTimings);
        setDescriptionError(errors.description);
        setLocationError(errors.location);
        setSalaryError(errors.salary);
        setSkillsError(errors.skills);
        setLanguageError(errors.language);
        setEmploymentError(errors.employmentType);
        setWorkError(errors.workType);
        setCommissionError(errors.commission);
        setNoOfOpeningsError(errors.noOfOpenings);
        setHiringNeedError(errors.hiringNeed);
        setAssignedToError(errors.assignedTo);
        setQualificationError(errors.qualification);
        setExperienceError(errors.minExperience || errors.maxExperience);
        setAgeError(errors.minAge || errors.maxAge);

        return !Object.values(errors).some(Boolean);
      };
      

    const handlePostJob = async (e) => {
        e.preventDefault();
        

        const isValid = validate();
        console.log(isValid)

        if (!isValid) {
            setError("*Please fill all the required fields");
            return;
        }

        setError("");
        console.log(postNewJob)
        setLoading(true)
        const email = Cookies.get('email')
        const newJob = {
            companyName: postNewJob.companyName,
            title: postNewJob.jobTitle,
            category: postNewJob.category,
            shiftTimings: postNewJob.shiftTimings,
            description: postNewJob.jobDescription,
            location: postNewJob.jobLocation,
            minSalary: postNewJob.salaryMin,
            maxSalary: postNewJob.salaryMax,
            skills: postNewJob.skills.map(skill => skill.value).join(', '),
            language: postNewJob.language.join(', '),
            employmentType: postNewJob.employmentType,
            workType: postNewJob.workType,
            commissionFee: postNewJob.commission,
            commissionType: postNewJob.commissionType,
            noOfOpenings: postNewJob.noOfOpenings,
            status: postNewJob.status,
            hiringNeed: postNewJob.hiringNeed,
            postedBy: email,
            assignedTo: postNewJob.assignedTo,
            qualification: postNewJob.qualification,
            minExperience: postNewJob.minExperience,
            maxExperience: postNewJob.maxExperience,
            minAge: postNewJob.minAge,
            maxAge: postNewJob.maxAge
        }
        console.log(newJob)
        // return
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(newJob)
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/jobs/add/new`, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
            } else {
                setPostNewJob({
                    companyName: '',
                    jobTitle: '',
                    category: '',
                    shiftTimings: '',
                    jobDescription: '',
                    jobLocation: '',
                    salaryMin: '',
                    salaryMax: '',
                    skills: [],
                    language: [],
                    employmentType: '',
                    workType: '',
                    commission: '',
                    commissionType: '',
                    noOfOpenings: '',
                    status: 'Open',
                    hiringNeed: '',
                    assignedTo: [],
                    qualification: '',
                    minExperience: '',
                    maxExperience: '',
                    age: ''
                })
                setShowJobForm(false)
            }
            setLoading(false)
        } else {
            alert(data.error)
            setLoading(false)
        }
    }

    const renderJobForm = () => (
        <form className='bde-job-form' onSubmit={handlePostJob}>
            <h1 className='bde-form-heading'>Post New Job</h1>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
            <label className='bde-form-label' htmlFor='company'>Comapany Name<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='company'  onChange={handleInputChange} value={postNewJob.companyName} name='companyName' type='text' placeholder='Enter Company Name' />
            {companyError && <p className='hr-error'>*Please enter company name</p>}

            <label className='bde-form-label' htmlFor='title'>Job Title<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='title' onChange={handleInputChange} value={postNewJob.jobTitle} name='jobTitle' type='text' placeholder='Enter Job Title' />
            {titleError && <p className='hr-error'>*Please enter job title</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='category'  onChange={handleInputChange} value={postNewJob.category} name='category' >
                        <option value=''>Select Category</option>
                        <option value='IT'>IT</option>
                        <option value='Non-IT'>Non-IT</option>
                        <option value='BPO'>BPO</option>
                    </select>
                    {categoryError && <p className='hr-error'>*Please select category</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='shiftTimings'>Shift Timings<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='shiftTimings'  onChange={handleInputChange} value={postNewJob.shiftTimings} name='shiftTimings'>
                        <option value=''>Select Shift Timings</option>
                        <option value='Day Shift'>Day Shift</option>
                        <option value='Night Shift'>Night Shift</option>
                    </select>
                    {shiftTimingError && <p className='hr-error'>*Please select shift timings</p>}
                </div>
            </div>

            {/* <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <textarea className='hr-textarea' id='description'  onChange={handleInputChange} value={postNewJob.jobDescription} name='jobDescription' placeholder='Minimum of 150 words' />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>} */}

            <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <EditorComponent content={postNewJob.jobDescription} handleEditorChange={handleEditorChange} />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>}

            <label className='bde-form-label' htmlFor='job-location'>Job Location<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='job-location'  onChange={handleInputChange} value={postNewJob.jobLocation} name='jobLocation' type='text' placeholder='Enter Job Location' />
            {locationError && <p className='hr-error'>*Please enter job location</p>}

            <label className='bde-form-label' htmlFor='salary'>Salary(in LPA)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={postNewJob.salaryMin} name='salaryMin' type='number' placeholder='Minimum - INR' />
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={postNewJob.salaryMax} name='salaryMax' type='number' placeholder='Maximum - INR' />
            </div>
            {salaryError && <p className='hr-error'>*Please enter minimum & maximum salary</p>}

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con salary-input">
                    <label htmlFor='skills' className='hr-label'>Skills<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            postNewJob.skills.map((skill) => (
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
                            postNewJob.language.map((language, index) => (
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
                    <select className='bde-form-input emp-work-input' id='employment-type'  onChange={handleInputChange} name='employmentType' value={postNewJob.employmentType} >
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
                    <select className='bde-form-input emp-work-input' id='work-type'  onChange={handleInputChange} value={postNewJob.workType} name='workType'>
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
                <select className='bde-form-input commission-select salary-input'  onChange={handleInputChange} value={postNewJob.commissionType} name='commissionType'>
                    <option value=''>Select Fee Type</option>
                    <option value='Fixed'>Fixed</option>
                    <option value='Percentage'>Percentage</option>
                </select>
                <div className='commission-input-con'>
                    {
                        postNewJob.commissionType === 'Fixed' && <p className='rupee'>₹</p>
                    }
                    <input className='commission-input'  id='commission' type='number' onChange={handleInputChange} value={postNewJob.commission} name='commission' placeholder={postNewJob.commissionType==="Fixed" ? "5500" : "8.33"} />
                    {
                        postNewJob.commissionType === 'Fixed' ?
                        <p className=''>Per Joining
                        </p>
                        :
                        postNewJob.commissionType === 'Percentage' ?
                        <p className=''>% of Annual CTC</p>
                        :
                        <p className=''>Select Fee Type</p>
                    }
                    
                </div>
            </div>
            {commissionError && <p className='hr-error'>*Please select commission type & enter commission</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='no-of-openings'>No of Openings<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='no-of-openings'  type='number' onChange={handleInputChange} value={postNewJob.noOfOpenings} name='noOfOpenings' placeholder='Enter No of Openings' />
                    {noOfOpeningsError && <p className='hr-error'>*Please enter no of openings</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='hiring-need'>Hiring Need<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='hiring-need'  onChange={handleInputChange} value={postNewJob.hiringNeed} name='hiringNeed'>
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
                    <select className='bde-form-input emp-work-input' id='min-qual' name='qualification' value={postNewJob.qualification} onChange={handleInputChange}>
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
                        <input className='bde-form-input emp-work-input experience-bde-input' id='experience'  type='number' onChange={handleInputChange} value={postNewJob.minExperience} name='minExperience' placeholder='Min' />
                        <input className='bde-form-input emp-work-input experience-bde-input' type='number' onChange={handleInputChange} value={postNewJob.maxExperience} name='maxExperience' placeholder='Max' />
                    </div>
                    {experienceError && <p className='hr-error'>*Please enter Minimum & Maximum Experience</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='age'>Age<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='age'  onChange={handleInputChange} value={postNewJob.minAge} name='minAge' type='number' placeholder='Minimum age' />
                <input className='bde-form-input salary-input'  onChange={handleInputChange} value={postNewJob.maxAge} name='maxAge' type='number' placeholder='Maximum age' />
            </div>
            {ageError && <p className='hr-error'>*Please enter Age &gt;= 18</p>}
                

            <label className='bde-form-label'>Assign To Account Manager<span className='hr-form-span'> *</span></label>
            <div className='hr-input-list-con'>
                {
                    postNewJob.assignedTo.map((email, index) => {
                        const hiringManagerName = accountManagers.find(item => item.email === email) 
                        return (
                            <div className='hr-input-list' key={index}>
                                <p className='hr-input-list-item'>{hiringManagerName.username}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveHiringManager(email)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        )}
                    )
                }
            </div>
            <select className='bde-form-input' name='assignedTo' value={postNewJob.assignedTo} onChange={handleAddHiringManager}>
                <option value=''>Select Account Manager</option>
                {   accountManagers.length > 0 &&
                    accountManagers.map(eachItem => <option value={eachItem.email}>{eachItem.username + ' - ' + eachItem.phone + ' - ' + eachItem.hiring_category}</option>)
                }
            </select>
            {assignedToError && <p className='hr-error'>*Please select account manager</p>}
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
                    "Post Job"
                }
            </button>
            <p className='hr-main-error'>{error}</p>
        </form>
    )

    const renderAnotherJobButton = () => (
        <div className='add-job-container'>
            <h1 className='bde-heading-another-job'>🎉 Successfully Posted the Job Details 🎉</h1>
            <button className='bde-form-btn-an' onClick={toggleJobForm}>Post Another Job</button>
        </div>
    )

    const role = Cookies.get('role')

    if(role !== 'BDE') {
        return <Redirect to='/' />
    }

    return (
        <>
            <div className='bde-container'>
                {/* <NavBar /> */}
                <div className='bde-content'>
                    <h1 className='bde-heading'>Welcome to <span className='head-span'>Business Development Executive</span> Portal</h1>
                    { showJobForm ? renderJobForm() : renderAnotherJobButton()}
                </div>

            </div>
            {/* <Footer /> */}
        </>
    )
}

export default BDEPage;