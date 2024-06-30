import { useState, useEffect } from 'react';
import {Oval} from 'react-loader-spinner'
import CreatableSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
import Select from 'react-select';
import {v4 as uuidv4} from 'uuid';
import Cookies from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import EditorComponent from '../TextEditorQuill';

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

    const [companies, setCompanies] = useState([])
    const [selectedCompany, setSelectedCompany] = useState(null)
    const [showCompanyPopup, setShowCompanyPopup] = useState(false)
    const [popupError, setPopupError] = useState('')
    const [popupLoading, setPopupLoading] = useState(false)
    const [seniorHiringManagers, setSeniorHiringManagers] = useState([])
    const [keyword, setKeyword] = useState('');
    const [skills, setSkills] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [companyError, setCompanyError] = useState(false)
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
    const [commissionError, setCommissionError] = useState(false)
    const [noOfOpeningsError, setNoOfOpeningsError] = useState(false)
    const [hiringNeedError, setHiringNeedError] = useState(false)
    const [assignedToError, setAssignedToError] = useState(false)
    const [qualificationError, setQualificationError] = useState(false)
    const [experienceError, setExperienceError] = useState(false)
    const [ageError, setAgeError] = useState(false)
    const [tenureError, setTenureError] = useState(false)
    const [hmLoader, setHmLoader] = useState(false)

    const [companyDetails, setCompanyDetails] = useState({
        name: '',
        registeredAddress: '',
        address: '',
        phone: '',
        email: '',
        gstNo: '',
        spocName: '',
        spocEmail: '',
        spocPhone: ''
    })

    const [editJob, setEditJob] = useState({
        companyName: jobDetails.compname,
        companyId: jobDetails.companyId ? jobDetails.companyId : '',
        jobTitle: jobDetails.role,
        category: jobDetails.category,
        shiftTimings: jobDetails.shiftTimings,
        jobDescription: jobDetails.jobDescription,
        streetAddress: jobDetails.streetAddress,
        area: jobDetails.area,
        city: jobDetails.city,
        pincode: jobDetails.pincode,
        locationLink: jobDetails.locationLink,
        salaryMin: jobDetails.minSalary,
        salaryMax: jobDetails.maxSalary,
        skills: jobDetails.skills.split(',').map(skill => ({id: uuidv4(), value: skill})),
        language: jobDetails.language ? jobDetails.language.split(',') : [],
        employmentType: jobDetails.employmentType,
        workType: jobDetails.workType,
        commission: jobDetails.commissionFee,
        commissionType: jobDetails.commissionType,
        tenureInDays: jobDetails.tenureInDays,
        noOfOpenings: jobDetails.noOfOpenings,
        status: 'Open',
        hiringNeed: jobDetails.hiringNeed,
        assignedTo: [],
        qualification: jobDetails.qualification,
        minExperience: jobDetails.minExperience,
        maxExperience: jobDetails.maxExperience,
        minAge: jobDetails.minAge,
        maxAge: jobDetails.maxAge,
        keywords: jobDetails.keywords
    })

    useEffect(() => {
        fetchSeniorHiringManagers()
        fetchCompanies()
        fetchAssignedSeniorHiringManagers()
    }, [])

    const fetchCompanies = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
        }
        console.log(editJob)
        try {
            const backendUrl = process.env.REACT_APP_BACKEND_API_URL
            const response = await fetch(`${backendUrl}/api/companies`, options)
            const data = await response.json()
            console.log(data)
            if(response.ok) {
                const options = data.companies.map(company => ({ value: company.name, label: company.name, id: company.id}))
                setCompanies(options)
                const companyName = data.companies.filter(company => company.id === jobDetails.companyId)
                setSelectedCompany({ value: companyName[0].name, label: companyName[0].name, id: companyName[0].id})
            } else {
                alert(data.error)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSeniorHiringManagers = async () => {
        setHmLoader(true)
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/api/users/all/senior-hms`, options)
        const data = await response.json()
        setSeniorHiringManagers(data)
        console.log(data)
        setTimeout(() => {
            setHmLoader(false)
        }, 1000);
    }

    const fetchAssignedSeniorHiringManagers = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
        }
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/jobs/assigned-shm/${jobDetails.id}`, options)
        const data = await response.json()
        setEditJob({ ...editJob, assignedTo: data.map(item => item.shm_email) })
        console.log(data)
    }

    const handleCompanyChange = (newValue) => {
        if(newValue !== null) {
            if(newValue.__isNew__) {
                setCompanyDetails({...companyDetails, name: newValue.value})
                setShowCompanyPopup(true)
            } else {
                setEditJob({...editJob, companyName: newValue.value, companyId: newValue.id})
                setSelectedCompany(newValue)
            }
        } else {
            setEditJob({...editJob, companyName: '', companyId: ''})
            setSelectedCompany(null)
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setEditJob({...editJob, [name]: value})  
    }

    const handleCompanyInputChange = (e) => {
        const {name, value} = e.target
        setCompanyDetails({...companyDetails, [name]: value})
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

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const onAddKeyword = () => {
        if(editJob.keywords.length > 30) return
        if(editJob.keywords.includes(keyword)) return
        const trimmedKeyword = keyword.trim()
        if(trimmedKeyword === '') {
            return
        }
        setEditJob({ ...editJob, keywords: [...editJob.keywords, trimmedKeyword]})
        setKeyword('')
    }

    const onRemoveKeyword = (index) => {
        const keywords = editJob.keywords
        keywords.splice(index, 1)
        setEditJob({ ...editJob, keywords: keywords})
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
          commission: editJob.commission.length === 0 || editJob.commissionType.length === 0,
          tenureInDays: parseInt(editJob.tenureInDays) < 0 || editJob.tenureInDays.length === 0,
          noOfOpenings: editJob.noOfOpenings.length === 0,
          hiringNeed: editJob.hiringNeed.trim().length === 0,
          assignedTo: editJob.assignedTo.length === 0,
          qualification: editJob.qualification === '',
          minExperience: parseInt(editJob.minExperience) < 0 || editJob.minExperience.length === 0 || parseInt(editJob.minExperience) > parseInt(editJob.maxExperience),
          maxExperience: parseInt(editJob.maxExperience) < 0 || editJob.maxExperience.length === 0 || parseInt(editJob.maxExperience) < parseInt(editJob.minExperience),
          minAge: parseInt(editJob.minAge) < 18 || editJob.minAge.length === 0 || parseInt(editJob.minAge) > parseInt(editJob.maxAge),
          maxAge: parseInt(editJob.maxAge) < 18 || editJob.maxAge.length === 0 || parseInt(editJob.maxAge) < parseInt(editJob.minAge)
        };
      
        // Set errors in state
        setCompanyError(errors.company);
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
        setCommissionError(errors.commission);
        setTenureError(errors.tenureInDays);
        setNoOfOpeningsError(errors.noOfOpenings);
        setHiringNeedError(errors.hiringNeed);
        setAssignedToError(errors.assignedTo);
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
            jobId: jobDetails.id,
            companyName: editJob.companyName,
            companyId: editJob.companyId,
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
            minSalary: editJob.salaryMin,
            maxSalary: editJob.salaryMax,
            skills: editJob.skills.map(skill => skill.value).join(', '),
            language: editJob.language.join(', '),
            employmentType: editJob.employmentType,
            workType: editJob.workType,
            commissionFee: editJob.commission,
            commissionType: editJob.commissionType,
            tenureInDays: editJob.tenureInDays,
            noOfOpenings: editJob.noOfOpenings,
            status: editJob.status,
            hiringNeed: editJob.hiringNeed,
            assignedTo: editJob.assignedTo,
            qualification: editJob.qualification,
            minExperience: editJob.minExperience,
            maxExperience: editJob.maxExperience,
            minAge: editJob.minAge,
            maxAge: editJob.maxAge,
            keywords: editJob.keywords.join(', ')
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
            }
            setLoading(false)
        } else {
            alert(data.error)
            setLoading(false)
        }
    }

    const renderHiringManagerOptions = () => {
        if(editJob.assignedTo.length > 0 && seniorHiringManagers.length > 0) {
            console.log(seniorHiringManagers)
            return (editJob.assignedTo.map((email, index) => {
                const hiringManagerName = seniorHiringManagers.find(item => item.email === email)
                console.log(email)
                return (
                    <div className='hr-input-list' key={index}>
                        <p className='hr-input-list-item'>{hiringManagerName && hiringManagerName.username}</p>
                        <button type='button' className='hr-remove-item-button' onClick={() => handleRemoveHiringManager(email)}><IoIosClose className='hr-close-icon' /></button>
                    </div>
                )}
            ))
        }
    }

    const handleAddCompany = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(companyDetails.name.trim() === '') {
            setPopupError("*Please enter company name")
            return
        } else if(companyDetails.registeredAddress.trim() === '') {
            setPopupError("*Please enter registered address")
            return
        } else if(companyDetails.address.trim() === '') {
            setPopupError("*Please enter address")
            return
        } else if(companyDetails.phone.trim().length !== 10) {
            setPopupError("*Please enter valid phone number")
            return
        } else if(companyDetails.email.trim() === '' || !emailRegex.test(companyDetails.email)) {
            setPopupError("*Please enter valid email")
            return
        } else if(companyDetails.gstNo.trim() === '') {
            setPopupError("*Please enter GST No")
            return
        } else if(companyDetails.spocName.trim() === '') {
            setPopupError("*Please enter SPOC Name")
            return
        } else if(companyDetails.spocEmail.trim() === '' || !emailRegex.test(companyDetails.spocEmail)) {
            setPopupError("*Please enter valid SPOC Email")
            return
        } else if(companyDetails.spocPhone.trim().length !== 10) {
            setPopupError("*Please enter valid SPOC Phone")
            return
        }
        setPopupError("")
        console.log(companyDetails)

        const url = process.env.REACT_APP_BACKEND_API_URL + '/api/companies'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(companyDetails)
        }
        try {
            setPopupLoading(true)
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data)
            if(response.ok) {
                if(data.error) {
                    setPopupError(data.error)
                    toast.error(data.error)
                } else {
                    setCompanies([...companies, { value: companyDetails.name, label: companyDetails.name, id: data.id}])
                    setSelectedCompany({ value: companyDetails.name, label: companyDetails.name, id: data.id})
                    setEditJob({...editJob, companyName: companyDetails.name, companyId: data.id})
                    setShowCompanyPopup(false)
                    setCompanyDetails({
                        name: '',
                        registeredAddress: '',
                        address: '',
                        phone: '',
                        email: '',
                        gstNo: '',
                        spocName: '',
                        spocEmail: '',
                        spocPhone: ''
                    })
                    toast.success(data.message)
                }
            } else {
                setPopupError(data.error)
                toast.error(data.error)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
        setPopupLoading(false)
    }


    const renderAddCompanyPopup = () => (
        <div className='bde-add-company-popup'>
            <div className='bde-add-company-popup-overlay'></div>
            <div className='bde-add-company-popup-content'>
                <button className='bde-add-company-popup-close' disabled={popupLoading} onClick={() => setShowCompanyPopup(false)}>&times;</button>
                <h1 className='bde-add-company-popup-heading'>Add New Company</h1>
                <label className='bde-form-label' htmlFor='name'>Company Name<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='name'  onChange={handleCompanyInputChange} value={companyDetails.name} name='name' type='text' placeholder='Enter Company Name' />
                <label className='bde-form-label' htmlFor='registeredAddress'>Registered Address<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='registeredAddress'  onChange={handleCompanyInputChange} value={companyDetails.registeredAddress} name='registeredAddress' type='text' placeholder='Enter Registered Address' />
                <label className='bde-form-label' htmlFor='address'>Address<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='address'  onChange={handleCompanyInputChange} value={companyDetails.address} name='address' type='text' placeholder='Enter Address' />
                <label className='bde-form-label' htmlFor='phone'>Phone<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='phone'  onChange={handleCompanyInputChange} value={companyDetails.phone} name='phone' type='number' placeholder='Enter Phone' />
                <label className='bde-form-label' htmlFor='email'>Email<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='email'  onChange={handleCompanyInputChange} value={companyDetails.email} name='email' type='text' placeholder='Enter Email' />
                <label className='bde-form-label' htmlFor='gstNo'>GST No<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='gstNo'  onChange={handleCompanyInputChange} value={companyDetails.gstNo} name='gstNo' type='text' placeholder='Enter GST No' />
                <label className='bde-form-label' htmlFor='spocName'>SPOC Name<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='spocName'  onChange={handleCompanyInputChange} value={companyDetails.spocName} name='spocName' type='text' placeholder='Enter SPOC Name' />
                <label className='bde-form-label' htmlFor='spocEmail'>SPOC Email<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='spocEmail'  onChange={handleCompanyInputChange} value={companyDetails.spocEmail} name='spocEmail' type='text' placeholder='Enter SPOC Email' />
                <label className='bde-form-label' htmlFor='spocPhone'>SPOC Phone<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='spocPhone'  onChange={handleCompanyInputChange} value={companyDetails.spocPhone} name='spocPhone' type='number' placeholder='Enter SPOC Phone' />
                { popupError && <p className='hr-error'>{popupError}</p> }
                <div className='bde-add-company-popup-btn-con'>
                    <button className='bde-add-company-popup-btn' disabled={popupLoading} onClick={() => setShowCompanyPopup(false)}>Cancel</button>
                    <button className='bde-add-company-popup-btn' disabled={popupLoading} onClick={handleAddCompany}>
                    {popupLoading ? 
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
                        "Add Company"
                    }
                    </button>
                </div>
            </div>
        </div>
    )

    const renderJobForm = () => (
        <form className='bde-job-form' onSubmit={handleEditJob}>
            <h1 className='bde-form-heading'>Edit Job Details</h1>
            <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
            <label className='bde-form-label' htmlFor='company'>Comapany Name<span className='hr-form-span'> *</span></label>
            {/* <input className='bde-form-input' id='company'  onChange={handleInputChange} value={editJob.companyName} name='companyName' type='text' placeholder='Enter Company Name' /> */}
            
            <CreatableSelect
                isClearable
                onChange={handleCompanyChange}
                options={companies}
                placeholder="Select Company"
                styles={customStyles}
                value={selectedCompany}
            />
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

            <label className='bde-form-label' htmlFor='tenure'>Days Completion (Tenure)<span className='hr-form-span'> *</span></label>
            <input className='bde-form-input' id='tenure'  type='number' onChange={handleInputChange} value={editJob.tenureInDays} name='tenureInDays' placeholder='Enter Tenure in days' />
            {tenureError && <p className='hr-error'>*Please enter tenure in days</p>}

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
               

            <label className='bde-form-label'>Assign To Senior Hiring Manager<span className='hr-form-span'> *</span></label>
            <div className='hr-input-list-con'>
                {
                    renderHiringManagerOptions()
                }
            </div>
            <select className='bde-form-input' name='assignedTo' value={editJob.assignedTo} onChange={handleAddHiringManager}>
                <option value=''>Select Senior Hiring Manager</option>
                {   seniorHiringManagers.length > 0 &&
                    seniorHiringManagers.map(eachItem => <option value={eachItem.email}>{eachItem.username + ' - ' + eachItem.phone + ' - ' + eachItem.hiring_category}</option>)
                }
            </select>
            {assignedToError && <p className='hr-error'>*Please select Senior Hiring manager</p>}

            <label className='bde-form-label'>Also Search For<span className='hr-form-span'> (Max 30 keywords)</span></label>
            <div className='hr-input-list-con'>
                {
                    editJob.keywords.map((keyword, index) => (
                        <div className='hr-input-list' key={index}>
                            <p className='hr-input-list-item'>{keyword}</p>
                            <button type='button' className='hr-remove-item-button' onClick={() => onRemoveKeyword(index)}><IoIosClose className='hr-close-icon' /></button>
                        </div>
                    ))
                }
            </div>
            <div className='hr-input-con'>
                <input type='text' placeholder="Ex: Customer Support" className='hr-input-sub' value={keyword} id='keywords' name='keywords'  onChange={onChangeKeyword} />
                <button type='button' className='hr-form-btn-add' onClick={onAddKeyword}>+Add</button>
            </div>

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
                hmLoader ? 
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
            {showCompanyPopup && renderAddCompanyPopup()}
        </div>
    )
}

export default EditJobDetails;