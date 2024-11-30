import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import {Redirect} from 'react-router-dom';
import Select from 'react-select';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import { toast } from 'react-toastify';
import EditorComponent from '../TextEditorQuill';
import { categoryOptions, workTypeOptions, shiftTypeOptions, employmentTypeOptions, currencyOptions } from '../../utils/constants'
import './style.css';

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

const CreateSubJob = ({setShowCandidateForm}) => {

    const [skills, setSkills] = useState('');
    const [showJobForm, setShowJobForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [jobError, setJobError] = useState(false)
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
    const [noOfOpeningsError, setNoOfOpeningsError] = useState(false)
    const [hiringNeedError, setHiringNeedError] = useState(false)
    const [qualificationError, setQualificationError] = useState(false)
    const [experienceError, setExperienceError] = useState(false)
    const [ageError, setAgeError] = useState(false)
    const [allJobsList, setAllJobsList] = useState([])

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    const [postNewJob, setPostNewJob] = useState({
        jobId: '',
        jobTitle: '',
        category: '',
        shiftTimings: '',
        jobDescription: '',
        streetAddress: '',
        area: '',
        city: '',
        pincode: '',
        locationLink: '',
        salaryMode: 'Monthly',
        currency: '₹,INR',
        salaryMin: '',
        salaryMax: '',
        skills: [],
        language: [],
        employmentType: '',
        workType: '',
        noOfOpenings: '',
        status: 'Open',
        hiringNeed: '',
        qualification: '',
        minExperience: '',
        maxExperience: '',
        minAge: '',
        maxAge: '',
        keywords: ''
    })

    useEffect(() => {
        getAllJobsList()
    }, [])

    const getAllJobsList = async () => {
        const role = Cookies.get('role')
        let apiUrl = ""
        if (role === 'SHM') {
          apiUrl = `${backendUrl}/jobs/senior-hm/all`
        } else if (role === 'AC') {
          apiUrl = `${backendUrl}/jobs/hm/all`
        } else if (role === 'HR') {
          apiUrl = `${backendUrl}/jobs/hr/all/`
        } else if (role === 'FBDE') {
          apiUrl = `${backendUrl}/jobs/bde/all/`
        } else if (role === 'BDE') {
          apiUrl = `${backendUrl}/jobs/master-bde/all/`
        } else {
          apiUrl = `${backendUrl}/admin/get-admin-jobs/all`
        }
        const jwtToken = Cookies.get('jwt_token')
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        console.log('api data', data)
        
        if (response.ok === true) {
          if(data.error) {
            toast.error(data.error)
          } else {
            const updatedData = data.map(job => ({
              label: `${job.company_name} - ${job.title} - ${job.area} - ${job.city}`,
              value: job.id,
            }))
            
            console.log('updated data',updatedData)
    
            setAllJobsList(updatedData)
          }
        } else {
          toast.error(data.error)
        }
      }


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setPostNewJob({...postNewJob, [name]: value})  
    }

    const handleCurrencyChange = (e) => {
        const {value} = e
        setPostNewJob({...postNewJob, currency: value})
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


    const toggleJobForm = () => {
        setShowJobForm(!showJobForm)
    }

    const validate = () => {
        const errors = {
          jobId: postNewJob.jobId.trim().length === 0,
          title: postNewJob.jobTitle.trim().length === 0,
          category: postNewJob.category.trim().length === 0,
          shiftTimings: postNewJob.shiftTimings.trim().length === 0,
          description: postNewJob.jobDescription.split(/\s+/).length < 150,
          streetAddress: postNewJob.streetAddress.trim().length === 0,
          area: postNewJob.area.trim().length === 0,
          city: postNewJob.city.trim().length === 0,
          pincode: postNewJob.pincode.trim().length === 0,
          locationLink: postNewJob.locationLink.trim().length === 0 || (!postNewJob.locationLink.startsWith('http://') && !postNewJob.locationLink.startsWith('https://')),
          salary: postNewJob.salaryMin.trim().length === 0 || postNewJob.salaryMax.trim().length === 0 || parseInt(postNewJob.salaryMin) < 0 || parseInt(postNewJob.salaryMax) < 0 || parseInt(postNewJob.salaryMin) > parseInt(postNewJob.salaryMax),
          skills: postNewJob.skills.length === 0,
          language: postNewJob.language.length === 0,
          employmentType: postNewJob.employmentType.trim().length === 0,
          workType: postNewJob.workType.trim().length === 0,
          noOfOpenings: postNewJob.noOfOpenings.trim().length === 0 || parseInt(postNewJob.noOfOpenings) <= 0,
          hiringNeed: postNewJob.hiringNeed.trim().length === 0,
          qualification: postNewJob.qualification.trim().length === 0,
          minExperience: parseInt(postNewJob.minExperience) < 0 || postNewJob.minExperience.length === 0 || (parseInt(postNewJob.minExperience) > parseInt(postNewJob.maxExperience)),
          maxExperience: parseInt(postNewJob.maxExperience) < 0 || postNewJob.maxExperience.length === 0 || (parseInt(postNewJob.maxExperience) < parseInt(postNewJob.minExperience)),
          minAge: parseInt(postNewJob.minAge) < 18 || postNewJob.minAge.trim().length === 0 || parseInt(postNewJob.minAge) > parseInt(postNewJob.maxAge),
          maxAge: parseInt(postNewJob.maxAge) < 18 || postNewJob.maxAge.trim().length === 0 || parseInt(postNewJob.maxAge) < parseInt(postNewJob.minAge)
        };
      
        // Set errors in state
        setJobError(errors.jobId);
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
        setNoOfOpeningsError(errors.noOfOpenings);
        setHiringNeedError(errors.hiringNeed);
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
        const email = Cookies.get('email')
        const newJob = {
            jobId: postNewJob.jobId,
            title: postNewJob.jobTitle,
            category: postNewJob.category,
            shiftTimings: postNewJob.shiftTimings,
            description: postNewJob.jobDescription,
            streetAddress: postNewJob.streetAddress,
            area: postNewJob.area,
            city: postNewJob.city,
            pincode: postNewJob.pincode,
            locationLink: postNewJob.locationLink,
            currency: postNewJob.currency,
            salaryMode: postNewJob.salaryMode,
            minSalary: postNewJob.salaryMin,
            maxSalary: postNewJob.salaryMax,
            skills: postNewJob.skills.map(skill => skill.value).join(', '),
            language: postNewJob.language.join(', '),
            employmentType: postNewJob.employmentType,
            workType: postNewJob.workType,
            noOfOpenings: postNewJob.noOfOpenings,
            status: postNewJob.status,
            hiringNeed: postNewJob.hiringNeed,
            postedBy: email,
            qualification: postNewJob.qualification,
            minExperience: postNewJob.minExperience,
            maxExperience: postNewJob.maxExperience,
            minAge: postNewJob.minAge,
            maxAge: postNewJob.maxAge,
            keywords: postNewJob.keywords
        }
        console.log(newJob)
        // return
        setLoading(true)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(newJob)
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/api/public/create-sub-jobs`, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.message)
                setPostNewJob({
                    jobId: '',
                    jobTitle: '',
                    category: '',
                    shiftTimings: '',
                    jobDescription: '',
                    streetAddress: '',
                    area: '',
                    city: '',
                    pincode: '',
                    locationLink: '',
                    currency: '₹,INR',
                    salaryMode: 'Monthly',
                    salaryMin: '',
                    salaryMax: '',
                    skills: [],
                    language: [],
                    employmentType: '',
                    workType: '',
                    noOfOpenings: '',
                    status: 'Open',
                    hiringNeed: '',
                    qualification: '',
                    minExperience: '',
                    maxExperience: '',
                    minAge: '',
                    maxAge: '',
                    keywords: ''
                })

                setShowJobForm(false)
            }
            setLoading(false)
        } else {
            toast.error(data.error)
            setLoading(false)
        }
    }


    const defaultSelectedValue = currencyOptions[0].value;

    const renderJobForm = () => (
        <form className='sub-job-form' onSubmit={handlePostJob}>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

            <label className='bde-form-label' htmlFor='title'>Job Title<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='title' onChange={handleInputChange} value={postNewJob.jobTitle} name='jobTitle' type='text' placeholder='Enter Job Title' />
            {titleError && <p className='hr-error'>*Please enter job title</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='category'  onChange={handleInputChange} value={postNewJob.category} name='category' >
                        <option value=''>Select Category</option>
                        {
                            categoryOptions.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        }
                    </select>
                    {categoryError && <p className='hr-error'>*Please select category</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='shiftTimings'>Shift Timings<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='shiftTimings'  onChange={handleInputChange} value={postNewJob.shiftTimings} name='shiftTimings'>
                        <option value=''>Select Shift Timings</option>
                        {
                            shiftTypeOptions.map((shift, index) => (
                                <option key={index} value={shift}>{shift}</option>
                            ))
                        }
                    </select>
                    {shiftTimingError && <p className='hr-error'>*Please select shift timings</p>}
                </div>
            </div>
            
            <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <EditorComponent content={postNewJob.jobDescription} handleEditorChange={handleEditorChange} />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='streetAddress'>Street Address<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='streetAddress'  onChange={handleInputChange} value={postNewJob.streetAddress} name='streetAddress' type='text' placeholder='Enter Street Address' />
                    {streetAddressError && <p className='hr-error'>*Please enter street address</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='area'>Area<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='area'  onChange={handleInputChange} value={postNewJob.area} name='area' type='text' placeholder='Enter Area' />
                    {areaError && <p className='hr-error'>*Please enter area</p>}
                </div>
            </div>

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='city'>City<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='city'  onChange={handleInputChange} value={postNewJob.city} name='city' type='text' placeholder='Enter City' />
                    {cityError && <p className='hr-error'>*Please enter city</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='pincode'>Pincode<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='pincode'  onChange={handleInputChange} value={postNewJob.pincode} name='pincode' type='text' placeholder='Enter Pincode' />
                    {pincodeError && <p className='hr-error'>*Please enter pincode</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='location-link'>Location Link<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='location-link'  onChange={handleInputChange} value={postNewJob.locationLink} name='locationLink' type='text' placeholder='Enter Location Link' />
            {locationLinkError && <p className='hr-error'>*Please enter location link, must starts with http:// or https://</p>}

            <label className='bde-form-label' htmlFor='salary'>Salary<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <div className='emp-work-sub-con' style={{marginTop: '5px'}}>
                    <Select
                        options={currencyOptions}
                        defaultValue={{ value: defaultSelectedValue, label: currencyOptions[0].label }}
                        isSearchable={true}
                        onChange={handleCurrencyChange}
                        styles={customStyles}
                        name='currency'
                    />
                </div>
                <div className='emp-work-sub-con'>
                    <select className='bde-form-input emp-work-input' id='salaryMode'  onChange={handleInputChange} value={postNewJob.salaryMode} name='salaryMode'>
                        <option value='Monthly'>Monthly</option>
                        <option value='Yearly'>Yearly</option>
                        <option value='Hourly'>Hourly</option>
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                    </select>
                </div>
            </div>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary' style={{width: "10%"}} onChange={handleInputChange} value={postNewJob.salaryMin} name='salaryMin' type='number' placeholder={`Minimum - ${postNewJob.currency.split(',')[1]}`} />
                <input className='bde-form-input salary-input' id='salary' style={{width: "40%"}} onChange={handleInputChange} value={postNewJob.salaryMax} name='salaryMax' type='number' placeholder={`Maximum - ${postNewJob.currency.split(',')[1]}`} />
            </div>
            {salaryError && <p className='hr-error'>*Please enter minimum & maximum salary, min &lt;= max</p>}

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
                        {
                            employmentTypeOptions.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    {employmentError && <p className='hr-error'>*Please select employment type</p> }
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='work-type'>Work Type<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='work-type'  onChange={handleInputChange} value={postNewJob.workType} name='workType'>
                        <option value=''>Select Work Type</option>
                        {
                            workTypeOptions.map((type, index) => (
                                <option key={index} value={type.value}>{type.label}</option>
                            ))
                        }
                    </select>
                    {workError && <p className='hr-error'>*Please select work type</p>}
                </div>
            </div>

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='no-of-openings'>No of Openings<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='no-of-openings'  type='number' onChange={handleInputChange} value={postNewJob.noOfOpenings} name='noOfOpenings' placeholder='Enter No of Openings' />
                    {noOfOpeningsError && <p className='hr-error'>*Please enter no of openings &gt; 0</p>}
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
                    {experienceError && <p className='hr-error'>*Please enter Minimum & Maximum Experience, Min &lt; Max</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='age'>Age<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='age'  onChange={handleInputChange} value={postNewJob.minAge} name='minAge' type='number' placeholder='Minimum age' />
                <input className='bde-form-input salary-input'  onChange={handleInputChange} value={postNewJob.maxAge} name='maxAge' type='number' placeholder='Maximum age' />
            </div>
            {ageError && <p className='hr-error'>*Please enter Age &gt;= 18, Min &lt; Max</p>}

            <label className="homepage-label" htmlFor='languages'>Select Job<span className='hr-form-span'> *</span></label>
            <Select
                options={allJobsList}
                isSearchable={true}
                onChange={(e) => setPostNewJob({...postNewJob, jobId: e.value})}
                styles={customStyles}
            />
            {jobError && <p className='hr-error'>*Please select Job</p> }
                
            <label className='bde-form-label'>Also Search For<span className='hr-form-span'> (Max 30 keywords)</span></label>
            <textarea type='text' placeholder="Ex: Customer Support" className='hr-input-textarea' value={postNewJob.keywords} id='keywords' name='keywords'  onChange={handleInputChange} ></textarea>
            <p className='hr-size'>Separate each keyword with a comma</p>

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

    if(role === 'BDE' || role === 'FBDE' || role === 'ADMIN') {
        return <Redirect to='/' />
    }

    return (
        <>
            <div className='sub-job-container'>
                <div className='sub-job-content'>
                    <h1 className='bde-heading'>Create Sub Job</h1>
                    { showJobForm ? renderJobForm() : renderAnotherJobButton()}
                </div>
            </div>
        </>
    )
}

export default CreateSubJob;