import { ImUsers } from "react-icons/im";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUsers, FaUserPlus, FaFileCircleQuestion } from "react-icons/fa6";
import Popup from 'reactjs-popup';
import Cookie from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import {v4 as uuid} from 'uuid'
import Cookies from "js-cookie";
import NavBar from '../NavBar'
import './style.css'
import { Link, Redirect } from "react-router-dom";
import Footer from "../Footer";
import { useState } from "react";

let hiringCategoryOptions = [
    { value: 'BPO', label: 'BPO' },
    { value: 'IT', label: 'IT' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Industry', label: 'Industry' },
    { value: 'Others', label: 'Others' }
];

const AdminPage = () => {
    const [createStatus, setCreateStatus] = useState(false)
    const [error, setError] = useState('')
    // const [signUpDetails, setSignUpDetails] = useState({
    //     email: '',
    //     password: '',
    //     hiringCategory: []
    // })
    const [signUpDetails, setSignUpDetails] = useState({
        docId: "TBF",
        username: "",
        email: "",
        phone: "",
        password: uuid().slice(0, 8),
        role: 'AC',
        hiringFor: 'Fulltime Account Manager',
        location: 'TBF',
        hiringCategory: [],
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignUpDetails({ ...signUpDetails, [name]: value })
    }

    const handleAddCategory = (e) => {
        if(e.target.value === "") return
        const category = signUpDetails.hiringCategory
        category.push(e.target.value)
        setSignUpDetails({ ...signUpDetails, hiringCategory: category })
        hiringCategoryOptions = hiringCategoryOptions.filter((option) => option.value !== e.target.value)
    }

    const handleCategoryRemove = (index, categoryLabel) => {
        const category = signUpDetails.hiringCategory
        category.splice(index, 1)
        setSignUpDetails({ ...signUpDetails, hiringCategory: category })
        hiringCategoryOptions.push({ value: categoryLabel, label: categoryLabel })
    }


    const onClickCreate = async (close) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(signUpDetails.username.trim() === "") {
            setError('*Username is required')
            return
        }
        if(regex.test(signUpDetails.email) === false) {
            setError('*Valid Email is required')
            return
        }
        if(signUpDetails.phone.length < 10 || signUpDetails.phone.length > 10) {
            setError('*Valid Phone Number is required')
            return
        }
        if(signUpDetails.hiringCategory.length === 0) {
            setError('*Select atleast one hiring category')
            return
        }
        setError('')
        console.log(signUpDetails)

        setCreateStatus(true)
        console.log(signUpDetails)
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const url = `${backendUrl}/api/users/register`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.get('jwt_token')
            },
            body: JSON.stringify(signUpDetails)
        }
        const response = await fetch(url, options) // create account in DB
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                alert(data.success)
                setSignUpDetails({
                    docId: "TBF",
                    username: "",
                    email: "",
                    phone: "",
                    password: uuid().slice(0, 8),
                    role: 'AC',
                    hiringFor: 'Fulltime Account Manager',
                    location: 'TBF',
                    hiringCategory: [],
                })
                close()
            }
        }
        setCreateStatus(false)
    }

    const renderCreateUserPopup = (close) => {
        
        return (
            <div className="modal-form">
                <button className="modal-close-button" disabled={createStatus} onClick={close}>
                    &times;
                </button>
                <label className="homepage-label">Create new account for Account Manager</label>
                <label className="homepage-label">Credentials will be sent to {signUpDetails.email}</label>
                <label className="homepage-label">Username</label>
                <input className="homepage-input" type="text" required name="username" value={signUpDetails.username} onChange={handleInputChange} />
                <label className="homepage-label">Login Email</label>
                <input className="homepage-input" type="text" name="email" value={signUpDetails.email} onChange={handleInputChange} />
                <label className="homepage-label">Phone</label>
                <input className="homepage-input" type="number" required name="phone" value={signUpDetails.phone} onChange={handleInputChange} />
                <label className="homepage-label">Login Password</label>
                <input className="homepage-input" type="text" disabled value={signUpDetails.password} />

                {/* <label className="homepage-label" htmlFor="location">Location</label>
                <input className="homepage-input" type="text" id="location" required name="location" value={signUpDetails.location} onChange={handleInputChange} />
                <label className="homepage-label" htmlFor="hiringCTC">Hiring CTC</label>
                <input className="homepage-input" type="number" id="hiringCTC" required name="hiringCTC" value={signUpDetails.hiringCTC} onChange={handleInputChange} /> */}
                
                {/* <label className="homepage-label" htmlFor="hiringFor">Hiring For</label>
                <select className="homepage-input" id="hiringFor" name="hiringFor" required value={signUpDetails.hiringFor} onChange={handleInputChange} >
                    <option value="">select</option>
                    <option value="Freelance HR Recruiter">Freelance HR Recruiter</option>
                    <option value="Intern HR Recruiter">Intern HR Recruiter</option> 
                    <option value="Fulltime HR Recruiter">Fulltime HR Recruiter</option> 
                </select> */}
                <label className="homepage-label" htmlFor="hiringCategory">Hiring Category</label>
                <div className='hr-input-list-con'>
                    {
                        signUpDetails.hiringCategory.map((category, index) => (
                            <div className='hr-input-list' key={index}>
                                <p className='hr-input-list-item'>{category}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleCategoryRemove(index, category)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <select className="homepage-input" id="hiringCategory" name="hiringCategory" required onChange={handleAddCategory} >
                    <option value="">select</option>
                    {
                        hiringCategoryOptions.map((category) => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))
                    }
                </select>
                {error && <p className="error-message">{error}</p>}
                <div className='achieve-button-con create-user-btn-con'>
                    <button className='job-details-upload-candidate-button' disabled={createStatus} onClick={() => onClickCreate(close)}>CREATE</button>
                    <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={createStatus} onClick={close}>CANCEL</button>
                </div>
            </div>
        )
    }

    const token = Cookies.get('role')
    if (token !== 'ADMIN') {
        return <Redirect to='/' />
    }

    return (
        <div className='homepage-container'>
            <NavBar />
            <div className='admin-sub-con'>
                <div className='admin-page-content-con'>
                    <h1 className='bde-heading'>Welcome to <span className='head-span'>Admin</span> Portal</h1>
                    <div className='admin-page-content'>
                        <button className='admin-btn'>
                            <Link to='/admin/users' className="admin-link">
                                <ImUsers className='admin-icon' />
                                <p className="button-text"> View All Users </p>
                            </Link>
                        </button>

                        <button className='admin-btn'>
                            <Link to='/jobs' className="admin-link">                          
                                <BsBriefcaseFill className='admin-icon' />
                                <p className="button-text"> View All Jobs </p>
                            </Link>
                        </button>
                        
                        <button className='admin-btn'>
                            <Link to='/admin/candidates' className="admin-link">
                                <FaUsers className='admin-icon' />
                                <p className="button-text"> View All Candidates </p>
                            </Link>
                        </button>

                        <button className='admin-btn'>
                            <Link to='/admin/hiring-partner-requests' className="admin-link">
                                <FaFileCircleQuestion className='admin-icon' />
                                <p className="button-text"> Hiring Partner Requests </p>
                            </Link>
                        </button>

                        {/* <button className='admin-btn'>
                            <div className="admin-link">
                                <FaUserPlus className='admin-icon' />
                                <p className="button-text"> Signup New User </p>
                            </div>
                        </button> */}

                        <Popup
                            trigger={
                            <button className='admin-btn'>
                                <div className="admin-link">
                                    <FaUserPlus className='admin-icon' />
                                    <p className="button-text"> Signup New User </p>
                                </div>
                            </button>
                            }
                            modal
                        >
                            {close => (
                            <div className="modal create-user-modal">
                                
                                {renderCreateUserPopup(close)}
                            </div>
                            )}
                        </Popup>
                    </div>
                </div>
                <div className='admin-page-image-bg'>
                    <img src='/admin-bg.jpg' alt='admin vector' className='admin-image' />
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default AdminPage