import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import {Redirect} from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../NavBar';
import './style.css';


const BDEPage = () => {

    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [category, setCategory] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [skills, setSkills] = useState('');
    const [employmentType, setEmploymentType] = useState('Full Time');
    const [workType, setWorkType] = useState('On Site');
    const [commission, setCommission] = useState('');
    const [noOfOpenings, setNoOfOpenings] = useState('');
    const [status, setStatus] = useState('Open');
    const [hiringNeed, setHiringNeed] = useState('Urgent');
    const [assignedTo, setAssignedTo] = useState('');
    const [accountManagers, setAccountManagers] = useState([])
    const [showJobForm, setShowJobForm] = useState(true)
    const [loading, setLoading] = useState(false)

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

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value)
    }

    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleJobDescriptionChange = (e) => {
        setJobDescription(e.target.value)
    }

    const handleJobLocationChange = (e) => {
        setJobLocation(e.target.value)
    }

    const handleSalaryChange = (e) => {
        setSalary(e.target.value)
    }

    const handleSkillsChange = (e) => {
        setSkills(e.target.value)
    }

    const handleEmploymentTypeChange = (e) => {
        setEmploymentType(e.target.value)
    }

    const handleWorkTypeChange = (e) => {
        setWorkType(e.target.value)
    }

    const handleCommissionChange = (e) => {
        setCommission(e.target.value)
    }

    const handleNoOfOpeningsChange = (e) => {
        setNoOfOpenings(e.target.value)
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value)
    }

    const handleHiringNeedChange = (e) => {
        setHiringNeed(e.target.value)
    }

    const handleAssignedToChange = (e) => {
        setAssignedTo(e.target.value)
    }

    const toggleJobForm = () => {
        setShowJobForm(!showJobForm)
    }

    const handlePostJob = async (e) => {
        e.preventDefault();
        if(companyName === '' || jobTitle === '' || category === '' || jobDescription === '' || jobLocation === '' || salary === '' || skills === '' || employmentType === '' || workType === '' || commission === '' || noOfOpenings === '' || status === '' || hiringNeed === '' || assignedTo === '') {
            alert('All fields are required')
            return
        }

        setLoading(true)
        const username = Cookies.get('username')
        const newJob = {
            companyName,
            title: jobTitle,
            category,
            description: jobDescription,
            location: jobLocation,
            ctc: salary,
            skills,
            employmentType,
            workType,
            commission,
            noOfOpenings,
            status,
            hiringNeed,
            assignedTo,
            postedBy: username
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
            <label className='bde-form-label'>Comapany Name</label>
            <input className='bde-form-input' onChange={handleCompanyNameChange} type='text' placeholder='Enter Company Name' />
            <label className='bde-form-label'>Job Title</label>
            <input className='bde-form-input' onChange={handleJobTitleChange}  type='text' placeholder='Enter Job Title' />
            <label className='bde-form-label'>Category</label>
            <select className='bde-form-input' onChange={handleCategoryChange} >
                <option value=''>Select Category</option>
                <option value='IT'>IT</option>
                <option value='Non-IT'>Non-IT</option>
            </select>
            <label className='bde-form-label'>Job Description</label>
            <textarea className='bde-form-input' onChange={handleJobDescriptionChange}  placeholder='Enter Job Description' />
            <label className='bde-form-label'>Job Location</label>
            <input className='bde-form-input' onChange={handleJobLocationChange}  type='text' placeholder='Enter Job Location' />
            <label className='bde-form-label'>Salary(in LPA)</label>
            <input className='bde-form-input' onChange={handleSalaryChange}  type='text' placeholder='Enter Salary' />
            <label className='bde-form-label'>Skills</label>
            <input className='bde-form-input' onChange={handleSkillsChange}  type='text' placeholder='Enter Skills' />
            <label className='bde-form-label'>Employment Type</label>
            <select className='bde-form-input' onChange={handleEmploymentTypeChange} >
                <option value='Full Time'>Full Time</option>
                <option value='Part Time'>Part Time</option>
                <option value='Internship'>Internship</option>
                <option value='Contract'>Contract</option>
                <option value='Temporary'>Freelance</option>
            </select>
            <label className='bde-form-label'>Work Type</label>
            <select className='bde-form-input' onChange={handleWorkTypeChange}>
                <option value='On Site'>On Site</option>
                <option value='Remote'>Remote</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Anywhere'>Anywhere</option>
            </select>
            <label className='bde-form-label'>Commission</label>
            <input className='bde-form-input' type='text' onChange={handleCommissionChange} placeholder='Enter Commission(fixed or percentage)' />
            <label className='bde-form-label'>No of Openings</label>
            <input className='bde-form-input' type='text' onChange={handleNoOfOpeningsChange} placeholder='Enter No of Openings' />
            <label className='bde-form-label'>Status</label>
            <select className='bde-form-input' onChange={handleStatusChange}>
                <option value='Active'>Open</option>
                <option value='Inactive'>Closed</option>
            </select>
            <label className='bde-form-label'>Hiring Need</label>
            <select className='bde-form-input' onChange={handleHiringNeedChange}>
                <option value='Urgent'>Urgent</option>
                <option value='Not Urgent'>Not Urgent</option>
                <option value='Future'>Future</option>
            </select>
            <label className='bde-form-label'>Assign To Account Manager</label>
            <select className='bde-form-input' onChange={handleAssignedToChange}>
                <option value=''>Select Account Manager</option>
                {   accountManagers.length > 0 &&
                    accountManagers.map(eachItem => <option value={eachItem.username}>{eachItem.username + ' - ' + eachItem.location + ' - ' + eachItem.hiring_ctc + ' LPA - ' + eachItem.industry}</option>)
                }
            </select>
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
        <div className='bde-container'>
            <NavBar />
            <div className='bde-content'>
                <h1 className='bde-heading'>Welcome to <span className='head-span'>Business Development Executive</span> Portal</h1>
                { showJobForm ? renderJobForm() : renderAnotherJobButton()}
            </div>
        </div>
    )
}

export default BDEPage;