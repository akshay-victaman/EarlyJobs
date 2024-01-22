import { useState } from "react";
import NavBar from "../NavBar";
import './style.css'

const SignUpPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [education, setEducation] = useState('10th');
    const [photo, setPhoto] = useState(null);
    const [address, setAddress] = useState('');
    const [identitytype, setIdentitytype] = useState('aadhar');
    const [identity, setIdentity] = useState(null);
    const [error, setError] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleAgeChange = (e) => {
        setAge(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value)
    }

    const handleEducationChange = (e) => {
        setEducation(e.target.value)
    }

    const handlePhotoChange = (e) => {
        setPhoto(e.target.value)
        console.log(e.target.files[0])
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handleIdentitytypeChange = (e) => {
        setIdentitytype(e.target.value)
    }

    const handleIdentityChange = (e) => {
        setIdentity(e.target.value)
    }

    const handleSignup = (e) => {
        e.preventDefault();
        if(username === '' || password === '' || email === '' || phone === '' || age === '' || address === '' || identity === '' || photo === '' || identity === '') {
            setError(true)
            return;
        } 
        setError(false)
    }


    return(
        <div className="signup-page-container">
            <NavBar isLoggedIn={false} />
            <form onSubmit={handleSignup} className="signup-form">
                <h1 className="signup-heading">Sign up</h1>
                <label className="homepage-label" htmlFor='username'>USERNAME</label>
                <input type="text" className="homepage-input" id='username' value={username} onChange={handleUsernameChange} placeholder='Enter username'/>
                <label className="homepage-label" htmlFor='email'>EMAIL</label>
                <input type="email" className="homepage-input" id='email' value={email} onChange={handleEmailChange} placeholder='Enter email'/>
                <label className="homepage-label" htmlFor='phone'>PHONE</label>
                <input type="number" className="homepage-input" id='phone' value={phone} onChange={handlePhoneChange} placeholder='Enter phone number'/>
                <label className="homepage-label" htmlFor='age'>AGE</label>
                <input type="number" className="homepage-input" id='age' value={age} onChange={handleAgeChange} placeholder='Enter age'/>
                <label className="homepage-label" htmlFor='gender'>GENDER</label>
                <select className="homepage-input" value={gender} onChange={handleGenderChange}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='other'>Other</option>
                </select>
                <label className="homepage-label" htmlFor='education'>EDUCATION QUALIFICATION</label>
                <select className="homepage-input" id="education" value={education} onChange={handleEducationChange}>
                    <option value='10th'>10th</option>
                    <option value='12th'>12th</option>
                    <option value='graduate'>Graduate</option>
                    <option value='postgraduate'>Post Graduate</option>
                </select>
                <label className="signup-label" htmlFor='photo'>PHOTO</label>
                <input type="file" className="homepage-input" id='photo' onChange={handlePhotoChange} placeholder='Upload photo'/>
                <label className="homepage-label" htmlFor='address'>ADDRESS</label>
                <input type="text" className="homepage-input" id='address' value={address} onChange={handleAddressChange} placeholder='Enter address'/>
                <label className="homepage-label" htmlFor='identitytype'>IDENTITY PROOF TYPE</label>
                <select className="homepage-input"  value={identitytype} onChange={handleIdentitytypeChange}>
                    <option value='aadhar'>Aadhar</option>
                    <option value='pan'>Pan</option>
                    <option value='voterid'>Voter ID</option>
                    <option value='driving'>Driving License</option>
                </select>
                <label className="signup-label" htmlFor='identity'>SELECT IDENTITY PROOF PHOTO</label>
                <input type="file" className="homepage-input" id='identity' onChange={handleIdentityChange} placeholder='Upload identity proof'/>
                <label className="homepage-label" htmlFor='password'>PASSWORD</label>
                <input type="password" className="homepage-input" id='password' value={password} onChange={handlePasswordChange} placeholder='Enter password'/>

                <button type='submit' className="login-button">Signup</button>
                {error && <p className='error-message'>*Please fill all the fields</p>}
            </form>
        </div>
    )
}

export default SignUpPage