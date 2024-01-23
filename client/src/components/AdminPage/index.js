import { ImUsers } from "react-icons/im";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUsers, FaFileCircleQuestion } from "react-icons/fa6";
import Cookies from "js-cookie";
import NavBar from '../NavBar'
import './style.css'
import { Link, Redirect } from "react-router-dom";

const AdminPage = () => {

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
                    </div>
                </div>
                <div className='admin-page-image-bg'>
                    <img src='/admin-bg.jpg' alt='admin vector' className='admin-image' />
                </div>
            </div>
        </div>
    )
}

export default AdminPage