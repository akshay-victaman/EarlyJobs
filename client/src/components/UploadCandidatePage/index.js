import { useState } from "react"
import Cookies from "js-cookie"
import { Redirect } from "react-router-dom"
import { IoIosClose } from "react-icons/io";
import Select from 'react-select';
import {Oval} from 'react-loader-spinner'
import './style.css'

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

const UploadCandidatePage = ({setShowCandidateForm, jobsList}) => {
    const [error, setError] = useState('')
    const [skills, setSkills] = useState('');
    const [languages, setLanguages] = useState("")
    const [loading, setLoading] = useState(false)
    const [showForm, setShowForm] = useState(true)

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const [candidateDetails, setCandidateDetails] = useState({
        jobId: '',
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
        offerStatus: 'Ongoing',
        interviewDate: ''
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

    const handleAddLanguage = (e) => {
        if(e.value === "") return
        const languages = candidateDetails.spokenLanguages
        languages.push(e.value)
        setCandidateDetails({ ...candidateDetails, spokenLanguages: languages })
        languageOptions = languageOptions.filter((option) => option.value !== e.value)
    }

    const handleRemoveLanguage = (index, languageLabel) => {
        const languages = candidateDetails.spokenLanguages
        languages.splice(index, 1)
        setCandidateDetails({ ...candidateDetails, spokenLanguages: languages })
        languageOptions.push({ value: languageLabel, label: languageLabel })
    }

    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


    const postCandidateDetails = async (event) => {
        event.preventDefault()
        console.log(candidateDetails)

        const dob = new Date(candidateDetails.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        // Adjust the age if the birthday for this year hasn't occurred yet
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        // return
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(
            candidateDetails.jobId === '' ||
            candidateDetails.fullName.trim() === '' || 
            candidateDetails.fatherName.trim() === '' || 
            !emailRegex.test(candidateDetails.email) ||
            (candidateDetails.phone.length < 10 || candidateDetails.phone.length > 10)||
            candidateDetails.dateOfBirth === '' || age < 18 ||
            candidateDetails.gender === '' ||
            candidateDetails.highestQualification === '' || 
            candidateDetails.currentLocation.trim() === '' || 
            candidateDetails.skills.length === 0 || 
            candidateDetails.spokenLanguages.length === 0 || 
            candidateDetails.experienceInYears < 0 || 
            candidateDetails.experienceInYears === "" ||
            candidateDetails.experienceInMonths < 0 || 
            candidateDetails.experienceInMonths === "" ||
            candidateDetails.offerStatus === '' ||
            candidateDetails.jobCategory === '' ||
            candidateDetails.interviewDate === ''
        ) {
            setError("Please fill all the details")
            return
        }
        setError("")
        setLoading(true)
        const hrEmail = Cookies.get('email')
        const candidateData = {
          ...candidateDetails,
          hrEmail,
        }
        console.log(candidateData)
        // return;
        const url = `${backendUrl}/jobs/candidate/add`
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
                    offerStatus: 'Ongoing',
                    interviewDate: ''
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
            <h1 className='bde-heading-another-job'>🎉 Successfully Added Candidate Details 🎉</h1>
            <div className="upload-candidate-sub-con">
                <button className="login-button candidate-button" type="button" disabled={loading} onClick={() => setShowCandidateForm(0)}>Back</button>
                <button className='bde-form-btn-an candidate-back-btn' onClick={toggleCandidateForm}>Add Another Candidate</button>
            </div>
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
                        <option value="ITI">ITI</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Graduation (10 + 2 + 3)">Graduation (10 + 2 + 3)</option>
                        <option value="Graduation (10 + 2 + 4)">Graduation (10 + 2 + 4)</option>
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
                                    <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveLanguage(index, language)}><IoIosClose className='hr-close-icon' /></button>
                                </div>
                            ))
                        }
                    </div>
                    {/* <select className="homepage-input" id="hiringCategory" name="hiringCategory" required onChange={handleAddLanguage} >
                        <option value="">select</option>
                        {
                            languageOptions.map((category) => (
                                <option key={category.value} value={category.value}>{category.label}</option>
                            ))
                        }
                    </select> */}
                    <Select
                        options={languageOptions}
                        defaultValue={languageOptions.length !== 0 && { label: languageOptions[0].label }}
                        isSearchable={true}
                        onChange={handleAddLanguage}
                        styles={customStyles}
                    />
                </div>
                
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='experience'>Experience<span className='hr-form-span'> *</span></label>
                    <div className="homepage-input experience-con">
                        <input type="number" name='experienceInYears' className="experience-input" placeholder="Ex: 2" id='experience' onChange={handleCandidateInputChange} />
                        <label htmlFor='experienceInYears' className="experience-label">Years</label>
                        <input type="number" name='experienceInMonths' className="experience-input" placeholder="Ex: 5" id='experience' onChange={handleCandidateInputChange}/>
                        <label htmlFor='experienceInMonths' className="experience-label">Months</label>
                    </div>
                </div>
                {/* <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='offerStatus'>Offer Status<span className='hr-form-span'> *</span></label>
                    <select className="homepage-input" name='offerStatus' id='offerStatus' value={candidateDetails.offerStatus} onChange={handleCandidateInputChange}>
                        <option value=''>Select Offer Status</option>
                        <option value='Pending'>Pending</option>
                        <option value='Accepted'>Accepted</option>
                        <option value='Rejected'>Rejected</option>
                        <option value='On-hold'>On-hold</option>
                        <option value='ongoing'>Ongoing</option>
                    </select>
                </div> */}
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='resume'>Select Job<span className='hr-form-span'> *</span></label>
                    <select className="homepage-input" name='jobId' id='jobId' value={candidateDetails.jobId} onChange={handleCandidateInputChange}>
                        <option value=''>Select Job</option>
                        {
                            jobsList.map(job => (
                                <option key={job.id} value={job.id}>{job.role} - {job.compname}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="upload-candidate-input-con">
                <label className="homepage-label" htmlFor='interviewDate'>Schedule Interveiw Date<span className='hr-form-span'> *</span></label>
                <input type="date" name='interviewDate' className="homepage-input" id='interviewDate' min={dateString} onChange={handleCandidateInputChange} />
            </div>
            <div className="upload-candidate-sub-con">
                <button className="login-button candidate-button" type="button" disabled={loading} onClick={() => setShowCandidateForm(0)}>Back</button>
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
            </div>
            {error!=="" && <p className="hr-main-error">*{error}</p>}
        </form>
    )

    // const role = Cookies.get('role')
    // if(role !== 'HR') {
    //   return <Redirect to='/' />
    // }

    return (
        <div className="upload-candidate-container">
            <h1 className='bde-heading'><span className='head-span'>Add Candidate</span></h1>
            {
                showForm ? renderUploadCandidateForm() : renderSuccessMessage()
            }
        </div>
    )
}

export default UploadCandidatePage