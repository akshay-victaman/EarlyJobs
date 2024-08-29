import { useEffect, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import Select from 'react-select';
import { Oval, ThreeCircles } from 'react-loader-spinner';
import Cookies from 'js-cookie'
import { format } from 'date-fns';
import { categoryOptions, shiftTypeOptions, employmentTypeOptions } from '../../utils/constants';
import { toast } from 'react-toastify';

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

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE'
}


export const EditCandidateDetails = ({setShowEditCandidatePopup, candidate, jobsList}) => {
    const [error, setError] = useState('')
    const [skills, setSkills] = useState('');
    const [loading, setLoading] = useState(false)
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
    const [candidateDetails, setCandidateDetails] = useState({})

    useEffect(() => {
        fetchCandidateDetailsWithApplications()
    }, [])

    const formatDate = (date) => {
        return format(new Date(date), 'yyyy-MM-dd');
    }

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const fetchCandidateDetailsWithApplications = async () => {
        const url = `${backendUrl}/jobs/candidates/application/?candidateId=${candidate.candidateId}&applicationId=${candidate.applicationId}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
        }
        try {
            setApiStatus(apiStatusConstants.inProgress)
            const response = await fetch(url, options)
            const data = await response.json()
            if(response.ok === true) {
                if(data.error) {
                    setError(data.error)
                } else {
                    const formattedData = {
                        candidateId: data.candidate_id,
                        applicationId: data.application_id,
                        fullName: data.name,
                        fatherName: data.father_name,
                        email: data.email,
                        phone: data.phone,
                        dateOfBirth: formatDate(data.date_of_birth),
                        gender: data.gender,
                        aadharNumber: data.aadhar_number,
                        highestQualification: data.highest_qualification,
                        currentLocation: data.current_location,
                        jobCategory: data.job_category,
                        skills: data.skills.split(','),
                        spokenLanguages: data.spoken_languages.split(','),
                        experienceInYears: data.experience_in_years,
                        experienceInMonths: data.experience_in_months,
                        employmentType: data.employment_type,
                        shiftTimings: data.shift_timings,
                        jobId: data.job_id,
                        offerStatus: '',
                    }
                    setCandidateDetails(formattedData)
                    setApiStatus(apiStatusConstants.success)
                }
            } else {
                setError(data.error)
                setApiStatus(apiStatusConstants.failure)
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const handleCandidateInputChange = (e) => {
        const {name, value} = e.target
        setCandidateDetails({
          ...candidateDetails,
          [name]: value
        })
    }

    const handleOfferStatusChange = (e) => {
        if(e.target.checked) {
            setCandidateDetails({ ...candidateDetails, offerStatus: 'Ongoing' })
        } else {
            setCandidateDetails({ ...candidateDetails, offerStatus: '' })
        }
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

    const updateCandidateDetails = async (e) => {
        e.preventDefault()

        const dob = new Date(candidateDetails.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();

        // Adjust the age if the birthday for this year hasn't occurred yet
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        if(candidateDetails.fullName.trim() === '') {
            setError("Please enter full name")
            return
        } else if(candidateDetails.fatherName.trim() === '') {
            setError("Please enter father name")
            return
        } else if(!emailRegex.test(candidateDetails.email)) {
            setError("Please enter a valid email")
            return
        } else if(candidateDetails.phone.length < 10 || candidateDetails.phone.length > 10) {
            setError("Please enter a valid phone number")
            return
        } else if(candidateDetails.dateOfBirth === '' || age < 18) {
            setError("Please enter date of birth")
            return
        } else if(candidateDetails.gender === '') {
            setError("Please select gender")
            return
        } else if(candidateDetails.highestQualification === '') {
            setError("Please select highest qualification")
            return
        } else if(candidateDetails.currentLocation.trim() === '') {
            setError("Please enter current location")
            return
        } else if(candidateDetails.jobCategory === '') {
            setError("Please select job category")
            return
        } else if(candidateDetails.skills.length === 0) {
            setError("Please enter skills")
            return
        } else if(candidateDetails.spokenLanguages.length === 0) {
            setError("Please enter spoken languages")
            return
        } else if(candidateDetails.experienceInYears < 0 || candidateDetails.experienceInYears === "") {
            setError("Please enter experience in years")
            return
        } else if(candidateDetails.experienceInMonths < 0 || candidateDetails.experienceInMonths === "") {
            setError("Please enter experience in months")
            return
        } else if(candidateDetails.employmentType === '') {
            setError("Please select employment type")
            return
        } else if(candidateDetails.shiftTimings === '') {
            setError("Please select shift timings")
            return
        } else if(candidateDetails.jobId === '') {
            setError("Please select a job")
            return
        } 

        setError("")
        
        console.log(candidateDetails)
        try {
            const url = `${backendUrl}/jobs/candidate/update/${candidate.applicationId}`
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                },
                body: JSON.stringify(candidateDetails)
            }
            setLoading(true)
            const response = await fetch(url, options)
            const data = await response.json()
            if(response.ok === true) {
                if(data.error) {
                    setError(data.error)
                    toast.error(data.error)
                } else {
                    toast.success('Candidate details updated successfully')
                    setShowEditCandidatePopup(false)
                }
            } else {
                setError(data.error)
                toast.error(data.error)
            }
        } catch (error) {
            console.log(error)
            setError(error.message)
            toast.error(error.message)
        }
        setLoading(false)
    }

    const today = new Date();
    const validYear = today.getFullYear() - 18;
    const validMonth = String(today.getMonth() + 1).padStart(2, '0');
    const validDate = String(today.getDate()).padStart(2, '0');
    const validDateString = `${validYear}-${validMonth}-${validDate}`;

    const renderCandidateDetails = () => (
        <form className="upload-candidate-form candidate-update-form" onSubmit={updateCandidateDetails}>
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
                    <input type="date" name='dateOfBirth' max={validDateString} className="homepage-input" id='dateOfBirth' onChange={handleCandidateInputChange} value={candidateDetails.dateOfBirth} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='gender'>Gender</label>
                    <select className='homepage-input' name='gender' value={candidateDetails.gender} onChange={handleCandidateInputChange}>
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
                    <input type="number" name='aadharNumber' className="homepage-input" placeholder="Ex: 123456789012" id='aadharNum' value={candidateDetails.aadharNumber} onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='highestQualification'>Highest Qualification<span className='hr-form-span'> *</span></label>
                    <select className='homepage-input' name='highestQualification' onChange={handleCandidateInputChange} value={candidateDetails.highestQualification}>
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
                    <input type="text" name='currentLocation' className="homepage-input" placeholder="Enter location" id='location' value={candidateDetails.currentLocation} onChange={handleCandidateInputChange} />
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='category'>Job Category<span className='hr-form-span'> *</span></label>
                    <select className='bde-form-input' id='category'  onChange={handleCandidateInputChange} value={candidateDetails.jobCategory} name='jobCategory' >
                        <option value=''>Select Category</option>
                        {
                            categoryOptions.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label htmlFor='skills' className='hr-label'>Skills<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            candidateDetails.skills?.map((skill, index) => (
                                <div className='hr-input-list' key={index}>
                                    <p className='hr-input-list-item'>{skill}</p>
                                    <button type='button' className='hr-remove-item-button' onClick={() => onRemoveSkills(index)}><IoIosClose className='hr-close-icon' /></button>
                                </div>
                            ))
                        }
                    </div>
                    <div className='hr-input-con'>
                        <input type='text' list="skills-data" placeholder="Ex: MS Excel" className='hr-input-sub' value={skills} id='skills' name='skills'  onChange={onChangeSkills} />
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
                </div>
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='languages'>Spoken Languages<span className='hr-form-span'> *</span></label>
                    <div className='hr-input-list-con'>
                        {
                            candidateDetails.spokenLanguages?.map((language, index) => (
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
                </div>
                
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='experience'>Experience<span className='hr-form-span'> *</span></label>
                    <div className="homepage-input experience-con">
                        <input type="number" name='experienceInYears' className="experience-input" placeholder="Ex: 2" id='experience' value={candidateDetails.experienceInYears} onChange={handleCandidateInputChange} />
                        <label htmlFor='experienceInYears' className="experience-label">Years</label>
                        <input type="number" name='experienceInMonths' className="experience-input" placeholder="Ex: 5" id='experience' value={candidateDetails.experienceInMonths} onChange={handleCandidateInputChange}/>
                        <label htmlFor='experienceInMonths' className="experience-label">Months</label>
                    </div>
                </div>

                <div className='upload-candidate-input-con'>
                    <label className='homepage-label' htmlFor='employment-type'>Employment Type<span className='hr-form-span'> *</span></label>
                    <select className='homepage-input' id='employment-type'  onChange={handleCandidateInputChange} name='employmentType' value={candidateDetails.employmentType} >
                        <option value=''>Select Employment Type</option>
                        {
                            employmentTypeOptions.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="upload-candidate-sub-con">
                <div className="upload-candidate-input-con">
                    <label className="homepage-label" htmlFor='resume'>Select Job<span className='hr-form-span'> *</span></label>
                    <select className="homepage-input" name='jobId' id='jobId' value={candidateDetails.jobId} onChange={handleCandidateInputChange}>
                        <option value=''>Select Job</option>
                        {
                            jobsList.map(job => (
                                <option key={job.id} value={job.id}>{job.role} - {job.compname} - {job.city} - {job.area}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="upload-candidate-input-con">
                    <label className='homepage-label' htmlFor='shiftTimings'>Shift Timings<span className='hr-form-span'> *</span></label>
                    <select className='homepage-input' id='shiftTimings'  onChange={handleCandidateInputChange} value={candidateDetails.shiftTimings} name='shiftTimings'>
                        <option value=''>Select Shift Timings</option>
                        {
                            shiftTypeOptions.map((shift, index) => (
                                <option key={index} value={shift}>{shift}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="upload-candidate-input-con">
                <label className='homepage-label'>Offer Status</label>
                <div className='hr-checkbox-con'>
                    <input type='checkbox' id='offerStatus' name='offerStatus' value='Ongoing' className='offerstatus-checkbox' onChange={handleOfferStatusChange} />
                    <label className='hr-checkbox-label' htmlFor='offerStatus'>Set as Ongoing</label>
                </div>
            </div>
            

            <div className="upload-candidate-sub-con">
                <button className="login-button candidate-button" type="button" disabled={loading} onClick={() => setShowEditCandidatePopup(false)}>Cancel</button>
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
                    Update
                </button>
            </div>
            {error!=="" && <p className="hr-main-error">*{error}</p>}
        </form>
    )

    const renderFailure = () => (
        <div className="candidate-failure-con">
            <p className="candidate-failure-text">Something went wrong!</p>
            <button className="candidate-try-agian-btn" onClick={fetchCandidateDetailsWithApplications}>Try Again</button>
        </div>
    )

    const renderInProgress = () => (
        <div data-testid="loader" className="candidate-loader-container">
            <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstants.inProgress:
                return renderInProgress();
            case apiStatusConstants.success:
                return renderCandidateDetails();
            case apiStatusConstants.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={() => setShowEditCandidatePopup(false)}></div>
            <div className="candidate-details-modal-con candidate-update-con">
                <h1 className="candidate-details-heading">Update Candidate Details</h1>
                {renderSwitchCase()}
            </div>
        </div>
    )
}
