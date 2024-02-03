import { useState } from "react"
import Cookies from "js-cookie"
import { useParams, Redirect } from "react-router-dom"
import { IoIosClose } from "react-icons/io";
import {Oval} from 'react-loader-spinner'
import Footer from "../Footer"
import NavBar from "../NavBar"
import './style.css'


const UploadCandidatePage = () => {
    const [error, setError] = useState('')
    const [skills, setSkills] = useState('');
    const [languages, setLanguages] = useState("")
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(true)

    const [candidateDetails, setCandidateDetails] = useState({
        fullName: '',
        fatherName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',
        aadharNumber: '',
        highestQualification: '',
        currentLocation: '',
        spokenLanguages: [],
        experienceInYears: '',
        experienceInMonths: '',
        skills: [],
        jobCategory: '',
        offerStatus: '',
      })


    const handleCandidateInputChange = (e) => {
        const {name, value} = e.target
        setCandidateDetails({
          ...candidateDetails,
          [name]: value
        })
    }

    const onChangeSkills = (e) => {
        setSkills(e.target.value)
    }

    const onAddSkills = () => {
        const trimmedSkills = skills.trim()
        if(trimmedSkills === '') {
            return
        }
        setCandidateDetails({ ...candidateDetails, skills: [...candidateDetails.skills, trimmedSkills]})
        setSkills('')
    }

    const onRemoveSkills = (id) => {
        setCandidateDetails({ ...candidateDetails, skills: candidateDetails.skills.filter((skill, index) => index !== id)})
    }

    const onChangeLanguage = (event) => {
        setLanguages(event.target.value)
    }

    const handleLanguageChange = () => {
        const trimmedLanguage = languages.trim()
        if(trimmedLanguage === "") {
            return
        }
        setCandidateDetails(prevState => ({ ...prevState, spokenLanguages: [...prevState.spokenLanguages, trimmedLanguage]}))
        setLanguages("")
    }

    const handleLanguageRemove = (id) => {
        setCandidateDetails(prevState => ({ ...prevState, spokenLanguages: prevState.spokenLanguages.filter((language, index) => index !== id)}))
    }
    
    const {id} = useParams();

    const postCandidateDetails = async (event) => {
        event.preventDefault()
        
        if(
            candidateDetails.fullName === '' || 
            candidateDetails.fatherName === '' || 
            candidateDetails.email === '' || 
            candidateDetails.phone === '' || 
            candidateDetails.dateOfBirth === '' || 
            candidateDetails.gender === '' ||
            candidateDetails.highestQualification === '' || 
            candidateDetails.currentLocation === '' || 
            candidateDetails.skills.length === 0 || 
            candidateDetails.spokenLanguages.length === 0 || 
            candidateDetails.experienceInYears === '' || 
            candidateDetails.experienceInMonths === '' || 
            candidateDetails.offerStatus === '' ||
            candidateDetails.jobCategory === ''
        ) {
            setError("Please fill all the details")
            return
        }
        setError("")
        setLoading(true)
        const hrEmail = Cookies.get('email')
        const candidateData = {
          ...candidateDetails,
          jobId: id,
          hrEmail,
        }
        console.log(candidateData)
        // return;
        const url = 'http://localhost:5000/jobs/candidate/add'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(candidateData)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                setError("")
                setCandidateDetails({
                    fullName: '',
                    fatherName: '',
                    email: '',
                    phone: '',
                    dateOfBirth: '',
                    gender: '',
                    aadharNumber: '',
                    highestQualification: '',
                    currentLocation: '',
                    spokenLanguages: [],
                    experienceInYears: '',
                    experienceInMonths: '',
                    skills: [],
                    jobCategory: '',
                    offerStatus: '',
                })
                setShowForm(false)
            }
        } else {
            setError(data.error)
        }
        setLoading(false)
    }

    const toggleCandidateForm = () => {
        setShowForm(!showForm)
    }

    const renderSuccessMessage = () => (
        <div className='add-job-container'>
            <h1 className='bde-heading-another-job'>🎉 Successfully Uploaded Candidate Details 🎉</h1>
            <button className='bde-form-btn-an' onClick={toggleCandidateForm}>Upload Another Candidate</button>
        </div>
    )

    const renderUploadCandidateForm = () => (
        <form className="upload-candidate-form" onSubmit={postCandidateDetails}>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='candidateName'>Full Name<span className='hr-form-span'> *</span></label>
                    <input type="text" name='fullName' className="homepage-input" placeholder="Ex: John Doe" id='candidateName' value={candidateDetails.fullName} onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='fatherName'>Father Name<span className='hr-form-span'> *</span></label>
                    <input type="text" name='fatherName' className="homepage-input" placeholder="Ex: John Doe" id='fatherName' value={candidateDetails.fatherName} onChange={handleCandidateInputChange}/>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='candidateEmail'>Email ID<span className='hr-form-span'> *</span></label>
                    <input type="text" name='email' className="homepage-input" placeholder="Ex: example@email.com" id='candidateEmail' value={candidateDetails.email} onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='candidatePhone'>Phone Number<span className='hr-form-span'> *</span></label>
                    <input type="number" name='phone' className="homepage-input"  placeholder="Ex: 9876543210" id='candidatePhone' value={candidateDetails.phone} onChange={handleCandidateInputChange} />
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='dateOfBirth'>Date of Birth<span className='hr-form-span'> *</span></label>
                    <input type="date" name='dateOfBirth' className="homepage-input" id='dateOfBirth' onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='gender'>Gender</label>
                    <select className='homepage-input' name='gender' onChange={handleCandidateInputChange}>
                        <option value=''>Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='aadharNum'>Aadhar Number</label>
                    <input type="number" name='aadharNumber' className="homepage-input" placeholder="Ex: 123456789012" id='aadharNum' onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='highestQualification'>Highest Qualification<span className='hr-form-span'> *</span></label>
                    <select className='homepage-input' name='highestQualification' onChange={handleCandidateInputChange}>
                        <option value=''>Select Highest Qualification</option>
                        <option value="10th">10th</option>
                        <option value="12th">12th</option>
                        <option value="Graduation">Graduation</option>
                        <option value="Post Graduation">Post Graduation</option>
                        <option value="PhD">PhD</option>
                    </select>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='location'>Current Location<span className='hr-form-span'> *</span></label>
                    <input type="text" name='currentLocation' className="homepage-input" placeholder="Enter location" id='location' onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input' id='category'  onChange={handleCandidateInputChange} value={candidateDetails.jobCategory} name='jobCategory' >
                        <option value=''>Select Category</option>
                        <option value='IT'>IT</option>
                        <option value='Non-IT'>Non-IT</option>
                    </select>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label htmlFor='skills' className='hr-label'>Skills<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            candidateDetails.skills.map((skill, index) => (
                                <div className='hr-input-list' key={index}>
                                    <p className='hr-input-list-item'>{skill}</p>
                                    <button type='button' className='hr-remove-item-button' onClick={() => onRemoveSkills(index)}><IoIosClose className='hr-close-icon' /></button>
                                </div>
                            ))
                        }
                    </div>
                    <div className='hr-input-con'>
                        <input type='text' placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills'  onChange={onChangeSkills} />
                        <button type='button' className='hr-form-btn-add' onClick={onAddSkills}>+Add</button>
                    </div>
                    <p className='hr-size'>Type a Skill and click 'Add' button to add it to the list</p>
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='languages'>Spoken Languages<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            candidateDetails.spokenLanguages.map((language, index) => (
                                <div className='hr-input-list' key={index}>
                                    <p className='hr-input-list-item'>{language}</p>
                                    <button type='button' className='hr-remove-item-button' onClick={() => handleLanguageRemove(index)}><IoIosClose className='hr-close-icon' /></button>
                                </div>
                            ))
                        }
                    </div>
                    <div className='hr-input-con'>
                        <input type='text' placeholder="Ex: English" className='hr-input-sub' id='languages' name='languages' required={candidateDetails.spokenLanguages.length === 0} value={languages} onChange={onChangeLanguage} />
                        <button type='button' className='hr-form-btn-add' onClick={handleLanguageChange}>+Add</button>
                    </div>
                    <p className='hr-size'>Type a language and click 'Add' button to add it to the list</p>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='experience'>Experience<span className='hr-form-span'> *</span></label>
                    <div className="homepage-input experience-con">
                        <input type="number" name='experienceInYears' className="experience-input" placeholder="Ex: 2" id='experience' onChange={handleCandidateInputChange} />
                        <label htmlFor='experienceInYears'>Years</label>
                        <input type="number" name='experienceInMonths' className="experience-input" placeholder="Ex: 5" id='experience' onChange={handleCandidateInputChange}/>
                        <label htmlFor='experienceInMonths'>Months</label>
                    </div>
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='offerStatus'>Offer Status<span className='hr-form-span'> *</span></label>
                    <select className="homepage-input" name='offerStatus' id='offerStatus' value={candidateDetails.offerStatus} onChange={handleCandidateInputChange}>
                        <option value=''>Select Offer Status</option>
                        <option value='Pending'>Pending</option>
                        <option value='Accepted'>Accepted</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='On-hold'>On-hold</option>
                        <option value='ongoing'>Ongoing</option>
                    </select>
                </div>
            </div>
            <button className="login-button candidate-button" type="submit" disabled={loading}>
                {loading &&
                    <span className='hr-oval'>
                        <Oval
                            visible={true}
                            height="20"
                            width="20"
                            color="#ffffff"
                            strokeWidth="4"
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            secondaryColor="#ffffff"
                            wrapperClass=""
                            className='hr-oval'
                        />
                    </span>
                }
                Submit
            </button>
            {error!=="" && <p className="hr-main-error">*{error}</p>}
        </form>
    )

    const role = Cookies.get('role')
    if(role !== 'HR') {
      return <Redirect to='/' />
    }

    return (
        <div className="home-container">
            <NavBar />
            <div className="upload-candidate-container">
                <h1 className='bde-heading'><span className='head-span'>Upload Candidate</span></h1>
                {
                    showForm ? renderUploadCandidateForm() : renderSuccessMessage()
                }
            </div>
            
            <Footer />
        </div>
    )
}

export default UploadCandidatePage