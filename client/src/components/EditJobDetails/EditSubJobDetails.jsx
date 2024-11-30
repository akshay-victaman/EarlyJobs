import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import { toast } from 'react-toastify';
import Select from 'react-select';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import EditorComponent from '../TextEditorQuill';
import { categoryOptions, workTypeOptions, shiftTypeOptions, employmentTypeOptions, currencyOptions } from '../../utils/constants'

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

const EditSubJobDetails = ({jobDetails, setIsEditJob, updateJobDetails}) => {

    const [skills, setSkills] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
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
    const [jobError, setJobError] = useState(false)
    const [allJobsList, setAllJobsList] = useState([])
    const [jobListLoader, setJobListLoader] = useState(false)


    const [editJob, setEditJob] = useState({
        jobId: jobDetails.jobId,
        id: jobDetails.id,
        jobTitle: jobDetails.role,
        category: jobDetails.category,
        shiftTimings: jobDetails.shiftTimings,
        jobDescription: jobDetails.jobDescription,
        streetAddress: jobDetails.streetAddress,
        area: jobDetails.area,
        city: jobDetails.city,
        pincode: jobDetails.pincode,
        locationLink: jobDetails.locationLink,
        salaryMode: jobDetails.salaryMode,
        currency: jobDetails.currency,
        salaryMin: jobDetails.minSalary,
        salaryMax: jobDetails.maxSalary,
        skills: jobDetails.skills.split(',').map(skill => ({id: uuidv4(), value: skill})),
        language: jobDetails.language ? jobDetails.language.split(',') : [],
        employmentType: jobDetails.employmentType,
        workType: jobDetails.workType,
        noOfOpenings: jobDetails.noOfOpenings,
        status: 'Open',
        hiringNeed: jobDetails.hiringNeed,
        qualification: jobDetails.qualification,
        minExperience: jobDetails.minExperience,
        maxExperience: jobDetails.maxExperience,
        minAge: jobDetails.minAge,
        maxAge: jobDetails.maxAge,
        keywords: jobDetails.keywords.join(','),
        postedBy: jobDetails.postedBy
    })

    console.log('edit job', editJob)

    useEffect(() => {
        getAllJobsList()
    }, [])

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

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
        setJobListLoader(true)
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        console.log('api data', data)
        
        if (response.ok === true) {
          if(data.error) {
            toast.error(data.error)
            setJobListLoader(false)
          } else {
            const updatedData = data.map(job => ({
              label: `${job.company_name} - ${job.title} - ${job.area} - ${job.city}`,
              value: job.id,
            }))
            setEditJob({ ...editJob, jobId: editJob.jobId })
            console.log('updated data',updatedData)
    
            setAllJobsList(updatedData)
            setJobListLoader(false)
          }
        } else {
          setJobListLoader(false)
          toast.error(data.error)
        }
    }



    const handleInputChange = (e) => {
        const {name, value} = e.target
        setEditJob({...editJob, [name]: value})  
    }

    const handleCurrencyChange = (e) => {
        const {value} = e
        setEditJob({...editJob, currency: value})
    }

    const handleEditorChange = (content) => {
        setEditJob({...editJob, jobDescription: content})
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
        setEditJob({ ...editJob, skills: [...editJob.skills, newSkill]})
        setSkills('')
    }

    const onRemoveSkills = (id) => {
        setEditJob({ ...editJob, skills: editJob.skills.filter(skill => skill.id !== id)})
    }

    const handleAddLanguage = (e) => {
        if(e.value === "") return
        const languages = editJob.language
        languages.push(e.value)
        setEditJob({ ...editJob, language: languages })
        languageOptions = languageOptions.filter((option) => option.value !== e.value)
    }

    const handleRemoveLanguage = (index, languageLabel) => {
        const languages = editJob.language
        languages.splice(index, 1)
        setEditJob({ ...editJob, language: languages })
        languageOptions.push({ value: languageLabel, label: languageLabel })
    }


    const validate = () => {
        const errors = {
          jobId: editJob.jobId.trim().length === 0,
          title: editJob.jobTitle.trim().length === 0,
          category: editJob.category.trim().length === 0,
          shiftTimings: editJob.shiftTimings.trim().length === 0,
          description: editJob.jobDescription.split(/\s+/).length < 150,
          streetAddress: editJob.streetAddress === null ? true : editJob.streetAddress.trim().length === 0,
          area: editJob.area === null ? true : editJob.area.trim().length === 0,
          city: editJob.city === null ? true : editJob.city.trim().length === 0,
          pincode: editJob.pincode === null ? true : editJob.pincode.trim().length === 0,
          locationLink: editJob.locationLink.startsWith('http') === false,
          salary: editJob.salaryMin.length === 0 || editJob.salaryMax.length === 0,
          skills: editJob.skills.length === 0,
          language: editJob.language.length === 0,
          employmentType: editJob.employmentType.trim().length === 0,
          workType: editJob.workType.trim().length === 0,
          noOfOpenings: editJob.noOfOpenings.length === 0,
          hiringNeed: editJob.hiringNeed.trim().length === 0,
          qualification: editJob.qualification === '',
          minExperience: parseInt(editJob.minExperience) < 0 || editJob.minExperience.length === 0 || parseInt(editJob.minExperience) > parseInt(editJob.maxExperience),
          maxExperience: parseInt(editJob.maxExperience) < 0 || editJob.maxExperience.length === 0 || parseInt(editJob.maxExperience) < parseInt(editJob.minExperience),
          minAge: parseInt(editJob.minAge) < 18 || editJob.minAge.length === 0 || parseInt(editJob.minAge) > parseInt(editJob.maxAge),
          maxAge: parseInt(editJob.maxAge) < 18 || editJob.maxAge.length === 0 || parseInt(editJob.maxAge) < parseInt(editJob.minAge)
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
      

    const handleEditJob = async (e) => {
        e.preventDefault();

        const isValid = validate();

        if (!isValid) {
            setError("*Please fill all the required fields");
            return;
        }

        setError("");
        const newJob = {
            id: jobDetails.id,
            jobId: editJob.jobId,
            title: editJob.jobTitle,
            category: editJob.category,
            shiftTimings: editJob.shiftTimings,
            description: editJob.jobDescription,
            streetAddress: editJob.streetAddress,
            area: editJob.area,
            city: editJob.city,
            pincode: editJob.pincode,
            location: `${editJob.streetAddress}, ${editJob.area}, ${editJob.city}, ${editJob.pincode}`,
            locationLink: editJob.locationLink,
            currency: editJob.currency,
            salaryMode: editJob.salaryMode,
            minSalary: editJob.salaryMin,
            maxSalary: editJob.salaryMax,
            skills: editJob.skills.map(skill => skill.value).join(', '),
            language: editJob.language.join(', '),
            employmentType: editJob.employmentType,
            workType: editJob.workType,
            noOfOpenings: editJob.noOfOpenings,
            status: editJob.status,
            hiringNeed: editJob.hiringNeed,
            qualification: editJob.qualification,
            minExperience: editJob.minExperience,
            maxExperience: editJob.maxExperience,
            minAge: editJob.minAge,
            maxAge: editJob.maxAge,
            keywords: editJob.keywords,
            postedBy: editJob.postedBy
        }
        console.log(newJob)
        // return
        setLoading(true)
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(newJob)
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/api/public/edit-sub-jobs`, options)
        console.log(response)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                toast.error(data.error)
            } else {
                toast.success(data.success)
                setIsEditJob(false)
                updateJobDetails(newJob)
            }
            setLoading(false)
        } else {
            toast.error(data.error)
            setLoading(false)
        }
    }

    const renderJobForm = () => (
        <form className='bde-job-form' onSubmit={handleEditJob}>
            <h1 className='bde-form-heading'>Edit Sub Job Details</h1>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
            <label className='bde-form-label' htmlFor='title'>Job Title<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='title' onChange={handleInputChange} value={editJob.jobTitle} name='jobTitle' type='text' placeholder='Enter Job Title' />
            {titleError && <p className='hr-error'>*Please enter job title</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='category'  onChange={handleInputChange} value={editJob.category} name='category' >
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
                    <select className='bde-form-input emp-work-input' id='shiftTimings'  onChange={handleInputChange} value={editJob.shiftTimings} name='shiftTimings'>
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
            <EditorComponent content={editJob.jobDescription} handleEditorChange={handleEditorChange} />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='streetAddress'>Street Address<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='streetAddress'  onChange={handleInputChange} value={editJob.streetAddress} name='streetAddress' type='text' placeholder='Enter Street Address' />
                    {streetAddressError && <p className='hr-error'>*Please enter street address</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='area'>Area<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='area'  onChange={handleInputChange} value={editJob.area} name='area' type='text' placeholder='Enter Area' />
                    {areaError && <p className='hr-error'>*Please enter area</p>}
                </div>
            </div>

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='city'>City<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='city'  onChange={handleInputChange} value={editJob.city} name='city' type='text' placeholder='Enter City' />
                    {cityError && <p className='hr-error'>*Please enter city</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='pincode'>Pincode<span className='hr-form-span'> *</span></label>
                    <input className='bde-form-input emp-work-input' id='pincode'  onChange={handleInputChange} value={editJob.pincode} name='pincode' type='text' placeholder='Enter Pincode' />
                    {pincodeError && <p className='hr-error'>*Please enter pincode</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='location-link'>Location Link<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='location-link'  onChange={handleInputChange} value={editJob.locationLink} name='locationLink' type='text' placeholder='Enter Location Link' />
            {locationLinkError && <p className='hr-error'>*Please enter location link</p>}

            <label className='bde-form-label' htmlFor='salary'>Salary<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <div className='emp-work-sub-con' style={{marginTop: '5px'}}>
                    <Select
                        options={currencyOptions}
                        defaultValue={{ value: editJob.currency, label: currencyOptions.find(option => option.value === editJob.currency)?.label }}
                        isSearchable={true}
                        onChange={handleCurrencyChange}
                        styles={customStyles}
                        name='currency'
                    />
                </div>
                <div className='emp-work-sub-con'>
                    <select className='bde-form-input emp-work-input' id='salaryMode'  onChange={handleInputChange} value={editJob.salaryMode} name='salaryMode'>
                        <option value='Monthly'>Monthly</option>
                        <option value='Yearly'>Yearly</option>
                        <option value='Hourly'>Hourly</option>
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                    </select>
                </div>
            </div>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={editJob.salaryMin} name='salaryMin' type='number' placeholder={`Minimum - ${editJob.currency?.split(',')[1]}`} />
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={editJob.salaryMax} name='salaryMax' type='number' placeholder={`Maximum - ${editJob.currency?.split(',')[1]}`} />
            </div>
            {salaryError && <p className='hr-error'>*Please enter minimum & maximum salary</p>}

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con salary-input">
                    <label htmlFor='skills' className='hr-label'>Skills<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            editJob.skills.map((skill) => (
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
                            editJob.language.map((language, index) => (
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
                    <select className='bde-form-input emp-work-input' id='employment-type'  onChange={handleInputChange} name='employmentType' value={editJob.employmentType} >
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
                    <select className='bde-form-input emp-work-input' id='work-type'  onChange={handleInputChange} value={editJob.workType} name='workType'>
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
                    <input className='bde-form-input emp-work-input' id='no-of-openings'  type='number' onChange={handleInputChange} value={editJob.noOfOpenings} name='noOfOpenings' placeholder='Enter No of Openings' />
                    {noOfOpeningsError && <p className='hr-error'>*Please enter no of openings</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='hiring-need'>Hiring Need<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='hiring-need'  onChange={handleInputChange} value={editJob.hiringNeed} name='hiringNeed'>
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
                    <select className='bde-form-input emp-work-input' id='min-qual' name='qualification' value={editJob.qualification} onChange={handleInputChange}>
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
                        <input className='bde-form-input emp-work-input experience-bde-input' id='experience'  type='number' onChange={handleInputChange} value={editJob.minExperience} name='minExperience' placeholder='Min' />
                        <input className='bde-form-input emp-work-input experience-bde-input' type='number' onChange={handleInputChange} value={editJob.maxExperience} name='maxExperience' placeholder='Max' />
                    </div>
                    {experienceError && <p className='hr-error'>*Please enter Minimum Experience</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='age'>Age<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='age'  onChange={handleInputChange} value={editJob.minAge} name='minAge' type='number' placeholder='Minimum age' />
                <input className='bde-form-input salary-input'  onChange={handleInputChange} value={editJob.maxAge} name='maxAge' type='number' placeholder='Maximum age' />
            </div>
            {ageError && <p className='hr-error'>*Please enter Age &gt;= 18</p>}
               
            <label className="homepage-label" htmlFor='languages'>Select Job<span className='hr-form-span'> *</span></label>
            <Select
                options={allJobsList}
                isSearchable={true}
                onChange={(e) => setEditJob({...editJob, jobId: e.value})}
                defaultValue={allJobsList.find(job => job.value === editJob.jobId)}
                styles={customStyles}
            />
            {jobError && <p className='hr-error'>*Please select Job</p> }

            <label className='bde-form-label'>Also Search For<span className='hr-form-span'> (Max 30 keywords)</span></label>
            {console.log(typeof editJob.keywords)}
            <textarea type='text' placeholder="Ex: Customer Support" className='hr-input-textarea' value={editJob.keywords} id='keywords' name='keywords'  onChange={handleInputChange} ></textarea>
            <p className='hr-size'>Separate each keyword with a comma</p>

            <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn' onClick={() => setIsEditJob(false)}>Cancel</button>
                    <button type='submit' className='hr-form-btn' disabled={loading}>
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
                    "Save Changes"
                }
                    </button>
            </div>
            <p className='hr-main-error'>{error}</p>
        </form>
    )


    return (
        <div className='bde-content'>
            {
                jobListLoader ? 
                <div className='hm-loader' style={{height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Oval
                        height={25}
                        width={25}
                        color="#EB6A4D"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#EB6A4D"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                </div>
                :
                renderJobForm()
            }
        </div>
    )
}

export default EditSubJobDetails;