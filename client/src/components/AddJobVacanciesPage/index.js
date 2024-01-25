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


const AddJobVacanciesPage = () => {

    const [skills, setSkills] = useState('');
    const [showJobForm, setShowJobForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [isVisible, setIsVisible] = useState(false);
    const [addJobVacancies, setAddJobVacancies] = useState({
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
        status: '',
        hiringNeed: '',
        companyDetails: {
            name: '',
            email: '',
            contactNo: ''
        },
    })

    const toggleVisibility = () => {
        if (window.scrollY > 100) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAddJobVacancies({ ...addJobVacancies, [name]: value})
    }

    const handleSpocDetailsChange = (e) => {
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
        emailjs.send('service_fnv4y5p', 'template_izuh8cm', newJob, 'KzUehMbovr5UfqKRr')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };

    
    const onSubmitToFirestore = async (newJob) => {
        console.log(newJob)
        setLoading(true)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "AddJobVacancies"), { newJob });
        const docId = docRef.id;
        await setDoc(doc(db, "AddJobVacancies", docId), { docId, ...newJob });

        if(docRef) {
            sendEmail(newJob)
            setShowJobForm(false)
            setAddJobVacancies({
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
                status: '',
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

    const handlePostJob = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(addJobVacancies.companyName.trim().length === 0) {
            setError("*Please enter company name")
            return
        } else if(addJobVacancies.jobTitle.trim().length === 0) {
            setError("*Please enter job title")
            return
        } else if(addJobVacancies.jobDescription.split(/\s+/).length < 150) {
            setError("*Please enter job description minimum of 150 words")
            return
        } else if(addJobVacancies.jobLocation.trim().length === 0) {
            setError("*Please enter job location")
            return
        } else if(addJobVacancies.skills.length === 0 && skills !== "") {
            setError("*Please enter skills")
            return
        } else if(addJobVacancies.companyDetails.name.trim().length === 0) {
            setError("*Please enter SPOC/HR name")
            return
        } else if(!emailRegex.test(addJobVacancies.companyDetails.email)) {
            setError("*Please enter valid SPOC/HR email")
            return
        } else if(addJobVacancies.companyDetails.contactNo.length !== 10) {
            setError("*Please enter valid SPOC/HR contact no")
            return
        }
        setError("")

        const newJob = {
            companyName : addJobVacancies.companyName,
            title: addJobVacancies.jobTitle,
            category: addJobVacancies.category,
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

        onSubmitToFirestore(newJob)

    }


    const renderJobForm = () => (
        <form className='bde-job-form' onSubmit={handlePostJob}>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
            {/* <h1 className='bde-form-heading'>Post New Job</h1> */}
            
            <label className='bde-form-label' htmlFor='title'>Job Title<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='title' required onChange={handleInputChange} value={addJobVacancies.jobTitle} name='jobTitle' type='text' placeholder='Enter Job Title' />
            <label className='bde-form-label' htmlFor='category'>Category<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' id='category' required onChange={handleInputChange} value={addJobVacancies.category} name='category' >
                <option value=''>Select Category</option>
                <option value='IT'>IT</option>
                <option value='Non-IT'>Non-IT</option>
            </select>
            <label className='bde-form-label' htmlFor='description'>Job Description<span className='hr-form-span'> *</span></label>
            <textarea className='hr-textarea' id='description' required onChange={handleInputChange} value={addJobVacancies.jobDescription} name='jobDescription' placeholder='Minimum of 150 words' />
            <label className='bde-form-label' htmlFor='job-location'>Job Location<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='job-location' required onChange={handleInputChange} value={addJobVacancies.jobLocation} name='jobLocation' type='text' placeholder='Enter Job Location' />
            <label className='bde-form-label' htmlFor='salary'>Salary(in LPA)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <input className='bde-form-input salary-input' id='salary' required onChange={handleInputChange} value={addJobVacancies.salaryMin} name='salaryMin' type='number' placeholder='Minimum' />
                <input className='bde-form-input salary-input' id='salary' required onChange={handleInputChange} value={addJobVacancies.salaryMax} name='salaryMax' type='number' placeholder='Maximum' />
            </div>

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
                <input type='text' placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills' required={addJobVacancies.skills.length === 0} onChange={onChangeSkills} />
                <button type='button' className='hr-form-btn-add' onClick={onAddSkills}>+Add</button>
            </div>

            <label className='bde-form-label' htmlFor='employment-type'>Employment Type<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' id='employment-type' required onChange={handleInputChange} name='employmentType' value={addJobVacancies.employmentType} >
                <option value=''>Select Employment Type</option>
                <option value='Full Time'>Full Time</option>
                <option value='Part Time'>Part Time</option>
                <option value='Internship'>Internship</option>
                <option value='Contract'>Contract</option>
                <option value='Freelance'>Freelance</option>
            </select>

            <label className='bde-form-label' htmlFor='work-type'>Work Type<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' id='work-type' required onChange={handleInputChange} value={addJobVacancies.workType} name='workType'>
                <option value=''>Select Work Type</option>
                <option value='On Site'>On Site</option>
                <option value='Remote'>Remote</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='Anywhere'>Anywhere</option>
            </select>

            <label className='bde-form-label' htmlFor='commission'>Consultancy Recruitment Fee(per candidate)<span className='hr-form-span'> *</span></label>
            <div className='salary-container'>
                <select className='bde-form-input salary-input' required onChange={handleInputChange} value={addJobVacancies.commissionType} name='commissionType'>
                    <option value=''>Select Fee Type</option>
                    <option value='Fixed'>Fixed</option>
                    <option value='Percentage'>Percentage</option>
                </select>
                <input className='bde-form-input salary-input' required id='commission' type='number' onChange={handleInputChange} value={addJobVacancies.commission} name='commission' placeholder='Ex: 10' />
            </div>

            <label className='bde-form-label' htmlFor='no-of-openings'>No of Openings<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='no-of-openings' required type='number' onChange={handleInputChange} value={addJobVacancies.noOfOpenings} name='noOfOpenings' placeholder='Enter No of Openings' />
            
            <label className='bde-form-label' htmlFor='status'>Status<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' id='status' required onChange={handleInputChange} value={addJobVacancies.status} name='status'>
                <option value=''>Select Status</option>
                <option value='Open'>Open</option>
                <option value='Closed'>Closed</option>
            </select>

            <label className='bde-form-label' htmlFor='hiring-need'>Hiring Need<span className='hr-form-span'> *</span></label>
            <select className='bde-form-input' id='hiring-need' required onChange={handleInputChange} value={addJobVacancies.hiringNeed} name='hiringNeed'>
                <option value=''>Select Hiring Need</option>
                <option value='Urgent'>Urgent</option>
                <option value='Not Urgent'>Not Urgent</option>
                <option value='Future'>Future</option>
            </select>

            <label className='bde-form-label spoc-label'>Your Company Details<span className='hr-form-span'> *</span></label>
            <label className='bde-form-label' htmlFor='company'>Comapany Name<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='company' required onChange={handleInputChange} value={addJobVacancies.companyName} name='companyName' type='text' placeholder='Enter Company Name' />
            <label className='bde-form-label' htmlFor='spoc-name'>Your Name<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='spoc-name' type='text' required onChange={handleSpocDetailsChange} value={addJobVacancies.companyDetails.name} name='name' placeholder='Enter Your Name' />
            <label className='bde-form-label' htmlFor='spoc-email'>Your Email<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='spoc-email' type='email' required onChange={handleSpocDetailsChange} value={addJobVacancies.companyDetails.email} name='email' placeholder='Enter Your Email' />
            <label className='bde-form-label' htmlFor='spoc-phone'>Your Contact No.<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='spoc-phone' type='number' required onChange={handleSpocDetailsChange} value={addJobVacancies.companyDetails.contactNo} name='contactNo' placeholder='Enter Your Contact No' />
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
            <p className='hr-error'>{error}</p>
        </form>
    )

    const renderAnotherJobButton = () => (
        <div className='add-job-container'>
            <h1 className='bde-heading-another-job'>🎉 Successfully Posted the Job Details 🎉</h1>
            <button className='bde-form-btn-an' onClick={toggleJobForm}>Add Another Job</button>
        </div>
    )

    return (
        <div className='bde-container'>
            <NavBar />
            <div className='bde-content'>
                <h1 className='bde-heading'><span className='head-span'>Add Job Vacancies</span></h1>
                { showJobForm ? renderJobForm() : renderAnotherJobButton()}
            </div>
            <Footer />
            {
                isVisible && 
                <div className='hiring-partner-go-to-top' onClick={scrollToTop}>
                    <FaArrowUp className='hiring-partner-go-to-top-icon' />
                </div>
            }
        </div>
    )
}

export default AddJobVacanciesPage