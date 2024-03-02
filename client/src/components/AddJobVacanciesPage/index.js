import { useState, useEffect } from 'react';
import { IoIosClose } from "react-icons/io";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import {v4 as uuidv4} from 'uuid';
import { FaArrowUp } from "react-icons/fa6";
import emailjs from '@emailjs/browser';
import {Oval} from 'react-loader-spinner'
import NavBar from '../NavBar';
import './style.css';
import Footer from '../Footer';
import app from '../../firebase';
import ScrollUp from '../ScrollUp';


const AddJobVacanciesPage = () => {

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
    const [employmentError, setEmploymentError] = useState(false)
    const [workError, setWorkError] = useState(false)
    const [commissionError, setCommissionError] = useState(false)
    const [noOfOpeningsError, setNoOfOpeningsError] = useState(false)
    const [hiringNeedError, setHiringNeedError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [contactNoError, setContactNoError] = useState(false)

    const [addJobVacancies, setAddJobVacancies] = useState({
        companyName: '',
        jobTitle: '',
        category: '',
        shiftTimings: '',
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
            recipients: `${addJobVacancies.companyDetails.email},akshay@victaman.com`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`
        const response = await fetch(url)
        const data = await response.json()
        if(response.ok === true) {
            console.log(data)
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
          location: addJobVacancies.jobLocation.trim().length === 0,
          salary: addJobVacancies.salaryMin.trim().length === 0 || addJobVacancies.salaryMax.trim().length === 0,
          skills: addJobVacancies.skills.length === 0,
          employmentType: addJobVacancies.employmentType.trim().length === 0,
          workType: addJobVacancies.workType.trim().length === 0,
          commission: addJobVacancies.commission.trim().length === 0 || addJobVacancies.commissionType.trim().length === 0,
          noOfOpenings: addJobVacancies.noOfOpenings.trim().length === 0,
          hiringNeed: addJobVacancies.hiringNeed.trim().length === 0,
          name: addJobVacancies.companyDetails.name.trim().length === 0,
          email: !emailRegex.test(addJobVacancies.companyDetails.email),
          contactNo: addJobVacancies.companyDetails.contactNo.length !== 10,

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
        setNameError(errors.name);
        setEmailError(errors.email);
        setContactNoError(errors.contactNo);
      
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
            location: addJobVacancies.jobLocation,
            salaryMin: addJobVacancies.salaryMin,
            salaryMax: addJobVacancies.salaryMax,
            skills: addJobVacancies.skills,
            employmentType: addJobVacancies.employmentType,
            workType: addJobVacancies.workType,
            commission: addJobVacancies.commission,
            commissionType: addJobVacancies.commissionType,
            noOfOpenings: addJobVacancies.noOfOpenings,
            status: addJobVacancies.status,
            hiringNeed: addJobVacancies.hiringNeed,
            companyDetails: addJobVacancies.companyDetails,
        }

        console.log(newJob)
        console.log('triggered')
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
            <textarea className='hr-textarea' id='description'  onChange={handleInputChange} value={addJobVacancies.jobDescription} name='jobDescription' placeholder='Minimum of 150 words' />
            {descriptionError && <p className='hr-error'>*Please enter job description minimum of 150 words</p>}
            <label className='bde-form-label' htmlFor='job-location'>Job Location<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='job-location'  onChange={handleInputChange} value={addJobVacancies.jobLocation} name='jobLocation' type='text' placeholder='Enter Job Location' />
            {locationError && <p className='hr-error'>*Please enter job location</p>}
            <label className='bde-form-label' htmlFor='salary'>Salary(in LPA)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={addJobVacancies.salaryMin} name='salaryMin' type='number' placeholder='Minimum - INR' />
                <input className='bde-form-input salary-input' id='salary'  onChange={handleInputChange} value={addJobVacancies.salaryMax} name='salaryMax' type='number' placeholder='Maximum - INR' />
            </div>
            {salaryError && <p className='hr-error'>*Please enter minimum & maximum salary</p>}

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
                <input type='text' placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills'  onChange={onChangeSkills} />
                <button type='button' className='hr-form-btn-add' onClick={onAddSkills}>+Add</button>
            </div>
            <p className='hr-size'>Type a Skill and click 'Add' button to add it to the list</p>
            {skillsError && <p className='hr-error'>*Please enter skills</p>}

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
            <NavBar />
            <div className='bde-content'>
                <h1 className='bde-heading'><span className='head-span'>Add Job Vacancies</span></h1>
                { showJobForm ? renderJobForm() : renderAnotherJobButton()}
            </div>
            {/* <Footer /> */}
            <ScrollUp />
        </div>
        <Footer />
        </>
    )
}

export default AddJobVacanciesPage