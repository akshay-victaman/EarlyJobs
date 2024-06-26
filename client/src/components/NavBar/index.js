import {Link, useHistory} from 'react-router-dom'
import { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import './style.css'

const NavBar = ({handleShowComplaintsForm, handleShowGenderForm}) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    const history = useHistory();

    const onClickLogout = () => {
        Cookies.remove('jwt_token');
        Cookies.remove('role');
        Cookies.remove('username')
        Cookies.remove('email')
        Cookies.remove('user_details_id')
        Cookies.remove('hiring_for')
        Cookies.remove('hm_type')
        history.replace('/');
        window.location.reload();
    }

    const jwtToken = Cookies.get('jwt_token');
    const role = Cookies.get('role');

    return (
        <>
            <nav className="navbar">
                <Link to='/'>
                    <img src="/early-jobs-logo2.png" alt="website logo" className='nav-logo'/>
                </Link>
                <ul className='nav-list'>

                    {
                        jwtToken && 
                        <>
                            <li className='nav-item'>
                                <Link to='/' className='nav-link'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/jobs' className='nav-link'>Jobs</Link>
                            </li>
                        </>
                    }

                    {
                        (jwtToken !== undefined && role !== 'ADMIN') &&
                        <li className='nav-item'>
                            <Puff
                                visible={true}
                                height="20"
                                width="20"
                                color="#000"
                                ariaLabel="puff-loading"
                                wrapperStyle={{position: 'absolute', top: '-11px', left: '4px', backgroundColor: "#f1f1f1"}}
                                wrapperClass=""
                                
                            />
                            <button type='button' className='signup-button gender-btn' onClick={handleShowGenderForm}>Gender</button>
                        </li>
                    }

                    {
                        role !== 'BDE' &&
                        <li className='nav-item'>
                            <Link to='/add-job-vacancies' className='nav-link'>
                                <button type='button' className='signup-button'>Add Job Vacancies</button>
                            </Link>
                        </li>
                    }

                    {
                        (jwtToken !== undefined && role !== 'ADMIN') &&
                        <li className='nav-item'>
                            <button type='button' className='signup-button' onClick={handleShowComplaintsForm}>Complaints</button>
                        </li>
                    }

                    {
                        jwtToken !== undefined ?
                        <li className='nav-item'>
                            <button type='button' className='signup-button' onClick={onClickLogout}>Logout</button>
                        </li>
                        :
                        <li className='nav-item'>
                            <Link to='/apply-as-a-recruiter' className='nav-link'>
                                <button type='button' className='signup-button'>Apply as a Recruiter</button>
                            </Link>
                        </li>
                    }
                </ul>
                <button type='button' className='hamburger-menu'>
                    {
                        menuOpen ? 
                        <RxCross1 className='menu-icon' onClick={handleMenuClick} /> 
                        : 
                        <RxHamburgerMenu className='menu-icon' onClick={handleMenuClick} />
                    }
                </button>
            </nav>
            {
                menuOpen && 
                <div className='nav-overlay'>
                    <ul className='nav-list-mobile'>
                        {
                            jwtToken && 
                            <>
                                <li className='nav-item-mobile'>
                                    <Link to='/' className='nav-link'>Home</Link>
                                </li>
                                <li className='nav-item-mobile'>
                                    <Link to='/jobs' className='nav-link'>Jobs</Link>
                                </li>
                            </>
                        }

{
                        (jwtToken !== undefined && role !== 'ADMIN') &&
                            <li className='nav-item-mobile'>
                                <Puff
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#000"
                                    ariaLabel="puff-loading"
                                    wrapperStyle={{position: 'absolute', top: '-5px', left: '4px', backgroundColor: "#f1f1f1"}}
                                    wrapperClass=""
                                    
                                />
                                <button type='button' className='signup-button gender-btn' onClick={handleShowGenderForm}>Gender</button>
                            </li>
                        }
                        
                        <li className='nav-item-mobile'>
                            <Link to='/add-job-vacancies' className='nav-link'>
                                <button type='button' className='signup-button'>Add Job Vacancies</button>
                            </Link>
                        </li>

                        {
                            jwtToken !== undefined &&
                            <li className='nav-item-mobile'>
                                <button type='button' className='signup-button' onClick={handleShowComplaintsForm}>Complaints</button>
                            </li>
                        }

                        <li className='nav-item-mobile'>
                            {
                                jwtToken !== undefined ?
                                <button type='button' className='signup-button' onClick={onClickLogout}>Logout</button>
                                :
                                <Link to='/apply-as-a-recruiter' className='nav-link'>
                                    <button type='button' className='signup-button'>Apply as a Recruiter</button>
                                </Link>
                            }
                        </li>
                    </ul>
                </div>
            }
        </>
    )
}

export default NavBar;