import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import Select from 'react-select';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { IoIosClose } from "react-icons/io";

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

const EditJobDetails = ({jobDetails, setIsEditJob, updateJobDetails}) => {

    const [accountManagers, setAccountManagers] = useState([])
    const [skills, setSkills] = useState('');
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

    const [editJob, setEditJob] = useState({
        companyName: jobDetails.compname,
        jobTitle: jobDetails.role,
        category: jobDetails.category,
        shiftTimings: jobDetails.shiftTimings,
        jobDescription: jobDetails.jobDescription,
        jobLocation: jobDetails.location,
        salaryMin: jobDetails.minSalary,
        salaryMax: jobDetails.maxSalary,
        skills: jobDetails.skills.split(',').map(skill => ({id: uuidv4(), value: skill})),
        language: jobDetails.language ? jobDetails.language.split(',') : [],
        employmentType: jobDetails.employmentType,
        workType: jobDetails.workType,
        commission: jobDetails.commissionFee,
        commissionType: jobDetails.commissionType,
        noOfOpenings: jobDetails.noOfOpenings,
        status: 'Open',
        hiringNeed: jobDetails.hiringNeed,
        assignedTo: []
    })

    useEffect(() => {
        fetchAccountManagers()
        fetchAssignedHiringManagers()
    }, [])

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

    const fetchAssignedHiringManagers = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/jobs/assigned-hm/${jobDetails.id}`, options)
        const data = await response.json()
        setEditJob({ ...editJob, assignedTo: data.map(item => item.hm_email) })
        console.log(data)
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setEditJob({...editJob, [name]: value})  
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

    const handleAddHiringManager = (e) => {
        if(e.target.value === "") return
        if(editJob.assignedTo.includes(e.target.value)) return;
        const hiringManagers = editJob.assignedTo
        hiringManagers.push(e.target.value)
        setEditJob({ ...editJob, assignedTo: hiringManagers })
    }

    const handleRemoveHiringManager = (email) => {
        const hiringManagers = editJob.assignedTo.filter(item => item !== email)
        setEditJob({ ...editJob, assignedTo: hiringManagers })
    }


    const validate = () => {
        const errors = {
          company: editJob.companyName.trim().length === 0,
          title: editJob.jobTitle.trim().length === 0,
          category: editJob.category.trim().length === 0,
          shiftTimings: editJob.shiftTimings.trim().length === 0,
          description: editJob.jobDescription.split(/\s+/).length < 150,
          location: editJob.jobLocation.trim().length === 0,
          salary: editJob.salaryMin.length === 0 || editJob.salaryMax.length === 0,
          skills: editJob.skills.length === 0,
          employmentType: editJob.employmentType.trim().length === 0,
          workType: editJob.workType.trim().length === 0,
          commission: editJob.commission.length === 0 || editJob.commissionType.length === 0,
          noOfOpenings: editJob.noOfOpenings.length === 0,
          hiringNeed: editJob.hiringNeed.trim().length === 0,
          assignedTo: editJob.assignedTo.length === 0,
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
        setEmploymentError(errors.employmentType);
        setWorkError(errors.workType);
        setCommissionError(errors.commission);
        setNoOfOpeningsError(errors.noOfOpenings);
        setHiringNeedError(errors.hiringNeed);
        setAssignedToError(errors.assignedTo);
      
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
        setLoading(true)
        const newJob = {
            jobId: jobDetails.id,
            companyName: editJob.companyName,
            title: editJob.jobTitle,
            category: editJob.category,
            shiftTimings: editJob.shiftTimings,
            description: editJob.jobDescription,
            location: editJob.jobLocation,
            minSalary: editJob.salaryMin,
            maxSalary: editJob.salaryMax,
            skills: editJob.skills.map(skill => skill.value).join(', '),
            language: editJob.language.join(', '),
            employmentType: editJob.employmentType,
            workType: editJob.workType,
            commissionFee: editJob.commission,
            commissionType: editJob.commissionType,
            noOfOpenings: editJob.noOfOpenings,
            status: editJob.status,
            hiringNeed: editJob.hiringNeed,
            assignedTo: editJob.assignedTo,
        }
        console.log(newJob)
        // return
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(newJob)
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/jobs/edit`, options)
        console.log(response)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
            } else {
                alert(data.success)
                setIsEditJob(false)
                updateJobDetails(newJob)
                // window.location.reload()
            }
            setLoading(false)
        } else {
            alert(data.error)
            setLoading(false)
        }
    }

    const renderHiringManagerOptions = () => {
        if(editJob.assignedTo.length > 0 && accountManagers.length > 0) {
            return (editJob.assignedTo.map((email, index) => {
                const hiringManagerName = accountManagers.find(item => item.email === email) 
                return (
                    <div className='hr-input-list' key={index}>
                        <p className='hr-input-list-item'>{hiringManagerName.username}</p>
                        <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveHiringManager(email)}><IoIosClose className='hr-close-icon' /></button>
                    </div>
                )}
            ))
        }
    }

    const renderJobForm = () => (
        <form className='bde-job-form' onSubmit={handleEditJob}>
            <h1 className='bde-form-heading'>Edit Job Details</h1>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
            <label className='bde-form-label' htmlFor='company'>Comapany Name<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='company'  onChange={handleInputChange} value={editJob.companyName} name='companyName' type='text' placeholder='Enter Company Name' />
            {companyError && <p className='hr-error'>*Please enter company name</p>}

            <label className='bde-form-label' htmlFor='title'>Job Title<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='title' onChange={handleInputChange} value={editJob.jobTitle} name='jobTitle' type='text' placeholder='Enter Job Title' />
            {titleError && <p className='hr-error'>*Please enter job title</p>}

            <div className='salary-container'>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='category'  onChange={handleInputChange} value={editJob.category} name='category' >
                        <option value=''>Select Category</option>
                        <option value='IT'>IT</option>
                        <option value='Non-IT'>Non-IT</option>
                        <option value='BPO'>BPO</option>
                    </select>
                    {categoryError && <p className='hr-error'>*Please select category</p>}
                </div>
                <div className='emp-work-sub-con'>
                    <label className='bde-form-label' htmlFor='shiftTimings'>Shift Timings<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input emp-work-input' id='shiftTimings'  onChange={handleInputChange} value={editJob.shiftTimings} name='shiftTimings'>
                        <option value=''>Select Shift Timings</option>
                        <option value='Day Shift'>Day Shift</option>
                        <option value='Night Shift'>Night Shift</option>
                    </select>
                    {shiftTimingError && <p className='hr-error'>*Please select shift timings</p>}
                </div>
            </div>

            <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <textarea className='hr-textarea' id='description'  onChange={handleInputChange} value={editJob.jobDescription} name='jobDescription' placeholder='Minimum of 150 words' />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>}

            <label className='bde-form-label' htmlFor='job-location'>Job Location<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='job-location'  onChange={handleInputChange} value={editJob.jobLocation} name='jobLocation' type='text' placeholder='Enter Job Location' />
            {locationError && <p className='hr-error'>*Please enter job location</p>}

            <label className='bde-form-label' htmlFor='salary'>Salary(in LPA)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={editJob.salaryMin} name='salaryMin' type='number' placeholder='Minimum - INR' />
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={editJob.salaryMax} name='salaryMax' type='number' placeholder='Maximum - INR' />
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
                        <input type='text' placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills'  onChange={onChangeSkills} />
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
                    <select className='bde-form-input emp-work-input' id='work-type'  onChange={handleInputChange} value={editJob.workType} name='workType'>
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
                <select className='bde-form-input commission-select salary-input'  onChange={handleInputChange} value={editJob.commissionType} name='commissionType'>
                    <option value=''>Select Fee Type</option>
                    <option value='Fixed'>Fixed</option>
                    <option value='Percentage'>Percentage</option>
                </select>
                <div className='commission-input-con'>
                    {
                        editJob.commissionType === 'Fixed' && <p className='rupee'>₹</p>
                    }
                    <input className='commission-input'  id='commission' type='number' onChange={handleInputChange} value={editJob.commission} name='commission' placeholder={editJob.commissionType==="Fixed" ? "5500" : "8.33"} />
                    {
                        editJob.commissionType === 'Fixed' ?
                        <p className=''>Per Joining
                        </p>
                        :
                        editJob.commissionType === 'Percentage' ?
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

            <label className='bde-form-label'>Assign To Account Manager<span className='hr-form-span'> *</span></label>
            <div className='hr-input-list-con'>
                {
                    // editJob.assignedTo.length > 0 && 
                    // (editJob.assignedTo.map((email, index) => {
                    //     const hiringManagerName = accountManagers.find(item => item.email === email) 
                    //     return (
                    //         <div className='hr-input-list' key={index}>
                    //             <p className='hr-input-list-item'>{hiringManagerName.username}</p>
                    //             <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveHiringManager(email)}><IoIosClose className='hr-close-icon' /></button>
                    //         </div>
                    //     )}
                    // ))
                    renderHiringManagerOptions()
                }
            </div>
            <select className='bde-form-input' name='assignedTo' value={editJob.assignedTo} onChange={handleAddHiringManager}>
                <option value=''>Select Account Manager</option>
                {   accountManagers.length > 0 &&
                    accountManagers.map(eachItem => <option value={eachItem.email}>{eachItem.username + ' - ' + eachItem.phone + ' - ' + eachItem.hiring_category}</option>)
                }
            </select>
            {assignedToError && <p className='hr-error'>*Please select account manager</p>}
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
            {renderJobForm()}
        </div>
    )
}

export default EditJobDetails;