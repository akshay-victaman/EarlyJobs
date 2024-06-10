import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';
import NavBar from '../NavBar';
import './style.css'
import Footer from '../Footer';

const loginTypes = {
    user: 'Recruiter',
    college: 'College',
    agency: 'Agency'
}

const HomePage = () => {

    const loginTypeFromLocalStorage = localStorage.getItem('loginType');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginType, setLoginType] = useState(loginTypeFromLocalStorage ? loginTypeFromLocalStorage : loginTypes.user);

    const history = useHistory();

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleLoginTypeChange = (type) => {
        localStorage.setItem('loginType', type)
        setLoginType(type)
    }

    const onSubmitSuccess = (jwtToken, username, role, email, userDetailsId, hiringFor, hmType) => {
        Cookies.set('jwt_token', jwtToken, {expires: 1/6})
        Cookies.set('email', email, {expires: 1/6})
        Cookies.set('username', username, {expires: 1/6})
        Cookies.set('role', role, {expires: 1/6})
        if(userDetailsId === "TBF" || userDetailsId === "AGY" || userDetailsId === "CLG") {
            Cookies.set('user_details_id', userDetailsId, {expires: 1/6})
        }
        if(role === 'HR') {
            Cookies.set('hiring_for', hiringFor, {expires: 1/6})
        }
        if(hmType === 'CLG' || hmType === 'AGY') {
            Cookies.set('hm_type', hmType, {expires: 1/6})
        }
        if(role === 'ADMIN') {
            history.replace('/admin')
            window.location.reload();
            return
        } else if(role === 'BDE') {
            history.replace('/bde-portal')
            window.location.reload();
            return
        } else if(role === 'AC' || role === 'HR') {
            history.replace('/jobs')
            window.location.reload();
            return
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if(email === '' || password === ''){
            setError("*All fields required")
            return
        }
        const credentials = {
            email,
            password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        setLoading(true)
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const response = await fetch(`${backendUrl}/api/users/login`, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else if(data.isBlocked === 1) {
                setError("Your account has been blocked. Please contact the admin.")
            } else {
                onSubmitSuccess(data.jwtToken, data.username, data.role, data.email, data.userDetailsId, data.hiringFor, data.hmType)
                setError("")
            }
        } else {
            setError(data.error)
        }
        setLoading(false)
    }

    if(Cookies.get('jwt_token') !== undefined) {
        const role = Cookies.get('role')
        if(role === 'ADMIN') {
            return <Redirect to='/admin' />
        } else if(role === 'BDE') {
            return <Redirect to='/bde-portal' />
        } else if(role === 'AC' || role === 'HR') {
            return <Redirect to='/jobs' />
        }
    }

    return (
        <div className="homepage-container">
            {/* <NavBar isLoggedIn={false} /> */}
            <div className="homepage-sub-con">
                <div className="homepage-card">
                    <div className='login-type-con'>
                        <button className={`login-type-button ${loginTypes.user === loginType ? 'active-login-btn' : ''}`} onClick={() => handleLoginTypeChange(loginTypes.user)}>Recruiter Login</button>
                        <button className={`login-type-button ${loginTypes.college === loginType ? 'active-login-btn' : ''}`} onClick={() => handleLoginTypeChange(loginTypes.college)}>College Login</button>
                        <button className={`login-type-button ${loginTypes.agency === loginType ? 'active-login-btn' : ''}`} onClick={() => handleLoginTypeChange(loginTypes.agency)} style={{borderRight: '0px'}}>Agency Login</button>
                    </div>
                    <form onSubmit={handleLogin} className="login-form">
                        <h1 className="homepage-title">{loginType} Login</h1>
                        <label className="homepage-label" id='email'>EMAIL</label>
                        <input type="email" className="homepage-input" id='email' value={email} onChange={handleEmailChange} placeholder='Enter email'/>
                        <label className="homepage-label" id='password'>PASSWORD</label>
                        <input type="password" className="homepage-input" id='password' value={password} onChange={handlePasswordChange} placeholder='Enter password'/>
                        <button type='submit' disabled={loading} className="login-button login-loader">
                        {loading ?
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
                            />
                            :
                            "Login"
                        }
                        </button>
                        <p className='error-message'>{error}</p>
                    </form>
                    <h1 className='homepage-quote'>
                        <span className='quote-span'>8000+</span> Openings | <span className='quote-span'>50+</span> Locations
                        <br />
                         <span className='quote-span'>30+</span> Companies
                        <br />
                         Across All <span className='quote-span'>Sectors</span>
                    </h1>
                </div>
                <img src='/homepage-bg.png' className='homepage-img' alt='homepage-img'/>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default HomePage;