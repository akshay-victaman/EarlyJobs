import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import {Redirect} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import NavBar from '../NavBar';
import './style.css';
import Footer from '../Footer';


const BDEPage = () => {

    const [accountManagers, setAccountManagers] = useState([])

    const [skills, setSkills] = useState('');
    const [showJobForm, setShowJobForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [companyError, setCompanyError] = useState(false)
    const [titleError, setTitleError] = useState(false)
    const [categoryError, setCategoryError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [locationError, setLocationError] = useState(false)
    const [salaryError, setSalaryError] = useState(false)
    const [skillsError, setSkillsError] = useState(false)
    const [employmentError, setEmploymentError] = useState(false)
    const [workError, setWorkError] = useState(false)
    const [commissionError, setCommissionError] = useState(false)
    const [noOfOpeningsError, setNoOfOpeningsError] = useState(false)
    const [hiringNeedError, setHiringNeedError] = useState(false)
    const [assignedToError, setAssignedToError] = useState(false)

    const [postNewJob, setPostNewJob] = useState({
        companyName: '',
        jobTitle: '',
        category: '',
        jobDescription: '',
        jobLocation: '',
        salaryMin: '',
        salaryMax: '',
        skills: [],
        employmentType: '',
        workType: '',
        commission: '',
        commissionType: '',
        noOfOpenings: '',
        status: 'Open',
        hiringNeed: '',
        assignedTo: '',
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
            const response = await fetch('http://localhost:5000/api/users/all/account-managers', options)
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

    const toggleJobForm = () => {
        setShowJobForm(!showJobForm)
    }

    const validate = () => {
        const errors = {
          company: postNewJob.companyName.trim().length === 0,
          title: postNewJob.jobTitle.trim().length === 0,
          category: postNewJob.category.trim().length === 0,
          description: postNewJob.jobDescription.split(/\s+/).length < 150,
          location: postNewJob.jobLocation.trim().length === 0,
          salary: postNewJob.salaryMin.trim().length === 0 || postNewJob.salaryMax.trim().length === 0,
          skills: postNewJob.skills.length === 0,
          employmentType: postNewJob.employmentType.trim().length === 0,
          workType: postNewJob.workType.trim().length === 0,
          commission: postNewJob.commission.trim().length === 0 || postNewJob.commissionType.trim().length === 0,
          noOfOpenings: postNewJob.noOfOpenings.trim().length === 0,
          hiringNeed: postNewJob.hiringNeed.trim().length === 0,
          assignedTo: postNewJob.assignedTo.trim().length === 0,
        };
      
        // Set errors in state
        setCompanyError(errors.company);
        setTitleError(errors.title);
        setCategoryError(errors.category);
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
      

    const handlePostJob = async (e) => {
        e.preventDefault();

        const isValid = validate();
        console.log(isValid)

        if (!isValid) {
            setError("*Please fill all the required fields");
            return;
        }

        setError("");

        
        setLoading(true)
        const email = Cookies.get('email')
        const newJob = {
            companyName: postNewJob.companyName,
            title: postNewJob.jobTitle,
            category: postNewJob.category,
            description: postNewJob.jobDescription,
            location: postNewJob.jobLocation,
            minSalary: postNewJob.salaryMin,
            maxSalary: postNewJob.salaryMax,
            skills: postNewJob.skills.map(skill => skill.value).join(', '),
            employmentType: postNewJob.employmentType,
            workType: postNewJob.workType,
            commissionFee: postNewJob.commission,
            commissionType: postNewJob.commissionType,
            noOfOpenings: postNewJob.noOfOpenings,
            status: postNewJob.status,
            hiringNeed: postNewJob.hiringNeed,
            postedBy: email,
            assignedTo: postNewJob.assignedTo,
        }
        console.log(newJob)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(newJob)
        }
        const response = await fetch('http://localhost:5000/jobs/add/new', options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
            } else {
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

            <label className='bde-form-label' htmlFor='category'>Category<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' id='category'  onChange={handleInputChange} value={postNewJob.category} name='category' >
                <option value=''>Select Category</option>
                <option value='IT'>IT</option>
                <option value='Non-IT'>Non-IT</option>
            </select>
            {categoryError && <p className='hr-error'>*Please select category</p>}

            <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <textarea className='hr-textarea' id='description'  onChange={handleInputChange} value={postNewJob.jobDescription} name='jobDescription' placeholder='Minimum of 150 words' />
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
                <input type='text' placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills'  onChange={onChangeSkills} />
                <button type='button' className='hr-form-btn-add' onClick={onAddSkills}>+Add</button>
            </div>
            {skillsError && <p className='hr-error'>*Please enter skills</p>}

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

            <label className='bde-form-label'>Assign To Account Manager<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' name='assignedTo' onChange={handleInputChange}>
                <option value=''>Select Account Manager</option>
                {   accountManagers.length > 0 &&
                    accountManagers.map(eachItem => <option value={eachItem.email}>{eachItem.username + ' - ' + eachItem.location + ' - ' + eachItem.hiring_ctc + ' LPA - ' + eachItem.industry}</option>)
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
                <NavBar />
                <div className='bde-content'>
                    <h1 className='bde-heading'>Welcome to <span className='head-span'>Business Development Executive</span> Portal</h1>
                    { showJobForm ? renderJobForm() : renderAnotherJobButton()}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BDEPage;