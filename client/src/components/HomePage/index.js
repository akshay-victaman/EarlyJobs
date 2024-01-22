import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../NavBar';
import './style.css'
import Footer from '../Footer';

const HomePage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");

    const history = useHistory();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitSuccess = (jwtToken, username, role) => {
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        Cookies.set('username', username, {expires: 30})
        Cookies.set('role', role, {expires: 30})
        if(role === 'ADMIN') {
            history.replace('/admin')
            return
        } else if(role === 'BDE') {
            history.replace('/bde-portal')
            return
        } else if(role === 'AC' || role === 'HR') {
            history.replace('/jobs')
            return
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if(username === '' || password === ''){
            setError("*All fields required")
            return
        }
        const credentials = {
            username,
            password
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }
        const response = await fetch('http://localhost:5000/api/users/login', options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else if(data.isBlocked === 1) {
                setError("Your account has been blocked. Please contact the admin.")
            } else {
                onSubmitSuccess(data.jwtToken, data.username, data.role)
                setError("")
            }
        } else {
            setError(data.error)
        }
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
            <NavBar isLoggedIn={false} />
            <div className="homepage-sub-con">
                <div className="homepage-card">
                    <form onSubmit={handleLogin} className="login-form">
                        <h1 className="homepage-title">Login</h1>
                        <label className="homepage-label" id='username'>USERNAME</label>
                        <input type="text" className="homepage-input" id='username' value={username} onChange={handleUsernameChange} placeholder='Enter username'/>
                        <label className="homepage-label" id='password'>PASSWORD</label>
                        <input type="password" className="homepage-input" id='password' value={password} onChange={handlePasswordChange} placeholder='Enter password'/>
                        <button type='submit' className="login-button">Login</button>
                        <p className='error-message'>{error}</p>
                    </form>
                </div>
                <img src='/homepage-bg.avif' className='homepage-img' alt='homepage-img'/>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage;