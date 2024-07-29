import {Link, useHistory} from 'react-router-dom'
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Cookies from 'js-cookie';
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import './style.css'

const NavBar = ({handleShowComplaintsForm}) => {

    const [menuOpen, setMenuOpen] = useState(false)
    const [servicesHover, setServicesHover] = useState(false)
    const [companyHover, setCompanyHover] = useState(false)

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

                    <li className='nav-item'>
                        <Link to='/' className='nav-link'>Home</Link>
                    </li>
                    {
                        jwtToken && 
                        <li className='nav-item'>
                            <Link to='/jobs' className='nav-link'>Jobs</Link>
                        </li>
                    }

                    { Cookies.get('jwt_token') === undefined &&
                    <>
                    <li style={{position: "relative"}} className='nav-item' onMouseOver={() => setServicesHover(true)} onMouseOut={() => setServicesHover(false)}>
                        <div className={`nav-options-con ${servicesHover ? 'active-options' : ''}`}>
                            <span className='nav-options'>Our Services</span>
                            {
                                servicesHover ? <IoIosArrowUp className='arrow-icon active-icon' /> : <IoIosArrowDown className='arrow-icon' />
                            }
                        </div>
                        {
                            servicesHover && 
                            <ul className='nav-options-list'>
                                <li className='nav-options-item'>
                                    <Link to='/it-recruitment' className='nav-options-link' onClick={() => setServicesHover(false)}>IT Recruitment</Link>
                                </li>
                                <li className='nav-options-item'>
                                    <Link to='/finance-and-accounting-recruitment' className='nav-options-link' onClick={() => setServicesHover(false)}>Finance And Accounting Recruitment</Link>
                                </li>
                                <li className='nav-options-item'>
                                    <Link to='/sales-marketing-services' className='nav-options-link' onClick={() => setServicesHover(false)}>Sales & Marketing Recruitment</Link>
                                </li>
                                <li className='nav-options-item'>
                                    <Link to='/top-executive-recruitment-firm' className='nav-options-link' onClick={() => setServicesHover(false)}>Top Executive Recruitment</Link>
                                </li>
                                <li className='nav-options-item'>
                                    <Link to='/hr-executive-recruitment-services' className='nav-options-link' onClick={() => setServicesHover(false)}>HR & Executive Recruitment</Link>
                                </li>
                            </ul>
                        }
                    </li>

                    <li style={{position: "relative"}} className='nav-item' onMouseOver={() => setCompanyHover(true)} onMouseOut={() => setCompanyHover(false)}>
                        <div className={`nav-options-con ${companyHover ? 'active-options' : ''}`}>
                            <span className="nav-options">Company</span>
                            {
                                companyHover ? <IoIosArrowUp className='arrow-icon active-icon' /> : <IoIosArrowDown className='arrow-icon' />
                            }
                        </div>
                        {
                            companyHover && 
                            <ul className='nav-options-list' style={{width: "150px"}}>
                                <li className='nav-options-item'>
                                    <Link to='/why-earlyjobs' className='nav-options-link' onClick={() => setCompanyHover(false)}>Why Earlyjobs</Link>
                                </li>
                                <li className='nav-options-item'>
                                    <Link to='/about' className='nav-options-link' onClick={() => setCompanyHover(false)}>About Us</Link>
                                </li>
                                <li className='nav-options-item'>
                                    <Link to='/team' className='nav-options-link' onClick={() => setCompanyHover(false)}>Our Team</Link>
                                </li>
                            </ul>
                        }
                    </li>
                    </>
                    }

                    {
                        !jwtToken && 
                        <>
                            <li className='nav-item'>
                                <Link to='/view-openings' className='nav-link' style={{fontWeight: 'bold'}}>View Openings</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/login' className='nav-link' style={{fontWeight: 'bold'}}>Login</Link>
                            </li>
                        </>
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
            {/* {
                menuOpen && 
                <div className='nav-overlay'>
                    <ul className='nav-list-mobile'>
                        <li className='nav-item-mobile'>
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        {
                            jwtToken && 
                            <li className='nav-item-mobile'>
                                <Link to='/jobs' className='nav-link'>Jobs</Link>
                            </li>
                        }

                        { Cookies.get('jwt_token') === undefined &&
                        <>
                        <li style={{position: "relative"}} className='nav-item' onMouseOver={() => setServicesHover(true)} onMouseOut={() => setServicesHover(false)}>
                            <div className={`nav-options-con ${servicesHover ? 'active-options' : ''}`}>
                                <span className='nav-options'>Our Services</span>
                                {
                                    servicesHover ? <IoIosArrowUp className='arrow-icon active-icon' /> : <IoIosArrowDown className='arrow-icon' />
                                }
                            </div>
                            {
                                servicesHover && 
                                <ul className='nav-options-list'>
                                    <li className='nav-options-item'>
                                        <Link to='/it-recruitment' className='nav-options-link' onClick={() => setServicesHover(false)}>IT Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/finance-and-accounting-recruitment' className='nav-options-link' onClick={() => setServicesHover(false)}>Finance And Accounting Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/sales-marketing-services' className='nav-options-link' onClick={() => setServicesHover(false)}>Sales & Marketing Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/top-executive-recruitment-firm' className='nav-options-link' onClick={() => setServicesHover(false)}>Top Executive Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/hr-executive-recruitment-services' className='nav-options-link' onClick={() => setServicesHover(false)}>HR & Executive Recruitment</Link>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li style={{position: "relative"}} className='nav-item' onMouseOver={() => setCompanyHover(true)} onMouseOut={() => setCompanyHover(false)}>
                            <div className={`nav-options-con ${companyHover ? 'active-options' : ''}`}>
                                <span className="nav-options">Company</span>
                                {
                                    companyHover ? <IoIosArrowUp className='arrow-icon active-icon' /> : <IoIosArrowDown className='arrow-icon' />
                                }
                            </div>
                            {
                                companyHover && 
                                <ul className='nav-options-list' style={{width: "150px"}}>
                                    <li className='nav-options-item'>
                                        <Link to='/why-earlyjobs' className='nav-options-link' onClick={() => setCompanyHover(false)}>Why Earlyjobs</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/about' className='nav-options-link' onClick={() => setCompanyHover(false)}>About Us</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/team' className='nav-options-link' onClick={() => setCompanyHover(false)}>Our Team</Link>
                                    </li>
                                </ul>
                            }
                        </li>
                        </>
                        }

                        {
                            !jwtToken &&
                            <>
                                <li className='nav-item-mobile'>
                                    <Link to='/view-openings' className='nav-link' style={{fontWeight: 'bold'}}>View Openings</Link>
                                </li>
                                <li className='nav-item-mobile'>
                                    <Link to='/login' className='nav-link' style={{fontWeight: 'bold'}}>Login</Link>
                                </li>
                            </>
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
            } */}
            {
                <>
                <div className={`${menuOpen ? 'nav-bg-overlay' : ""}`} onClick={handleMenuClick}></div>
                <div className={`nav-overlay ${menuOpen ? "show-nav" : ""}`}>
                    <ul className='nav-list-mobile'>
                        <li className='nav-item-mobile' onClick={handleMenuClick}>
                            <Link to='/' className='nav-link'>Home</Link>
                        </li>
                        {
                            jwtToken && 
                            <li className='nav-item-mobile' onClick={handleMenuClick}>
                                <Link to='/jobs' className='nav-link'>Jobs</Link>
                            </li>
                        }

                        { Cookies.get('jwt_token') === undefined &&
                        <>
                        <li style={{position: "relative"}} className='nav-item' onMouseOver={() => setServicesHover(true)} onMouseOut={() => setServicesHover(false)}>
                            <div className={`nav-options-con ${servicesHover ? 'active-options' : ''}`}>
                                <span className='nav-options'>Our Services</span>
                                {
                                    servicesHover ? <IoIosArrowUp className='arrow-icon active-icon' /> : <IoIosArrowDown className='arrow-icon' />
                                }
                            </div>
                            {
                                servicesHover && 
                                <ul className='nav-options-list' onClick={handleMenuClick}>
                                    <li className='nav-options-item'>
                                        <Link to='/it-recruitment' className='nav-options-link' onClick={() => setServicesHover(false)}>IT Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/finance-and-accounting-recruitment' className='nav-options-link' onClick={() => setServicesHover(false)}>Finance And Accounting Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/sales-marketing-services' className='nav-options-link' onClick={() => setServicesHover(false)}>Sales & Marketing Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/top-executive-recruitment-firm' className='nav-options-link' onClick={() => setServicesHover(false)}>Top Executive Recruitment</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/hr-executive-recruitment-services' className='nav-options-link' onClick={() => setServicesHover(false)}>HR & Executive Recruitment</Link>
                                    </li>
                                </ul>
                            }
                        </li>

                        <li style={{position: "relative"}} className='nav-item' onMouseOver={() => setCompanyHover(true)} onMouseOut={() => setCompanyHover(false)}>
                            <div className={`nav-options-con ${companyHover ? 'active-options' : ''}`}>
                                <span className="nav-options">Company</span>
                                {
                                    companyHover ? <IoIosArrowUp className='arrow-icon active-icon' /> : <IoIosArrowDown className='arrow-icon' />
                                }
                            </div>
                            {
                                companyHover && 
                                <ul className='nav-options-list' style={{width: "150px"}} onClick={handleMenuClick}>
                                    <li className='nav-options-item'>
                                        <Link to='/why-earlyjobs' className='nav-options-link' onClick={() => setCompanyHover(false)}>Why Earlyjobs</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/about' className='nav-options-link' onClick={() => setCompanyHover(false)}>About Us</Link>
                                    </li>
                                    <li className='nav-options-item'>
                                        <Link to='/team' className='nav-options-link' onClick={() => setCompanyHover(false)}>Our Team</Link>
                                    </li>
                                </ul>
                            }
                        </li>
                        </>
                        }

                        {
                            !jwtToken &&
                            <>
                                <li className='nav-item-mobile' onClick={handleMenuClick}>
                                    <Link to='/view-openings' className='nav-link' style={{fontWeight: 'bold'}}>View Openings</Link>
                                </li>
                                <li className='nav-item-mobile' onClick={handleMenuClick}>
                                    <Link to='/login' className='nav-link' style={{fontWeight: 'bold'}}>Login</Link>
                                </li>
                            </>
                        }
                        
                        <li className='nav-item-mobile' onClick={handleMenuClick}>
                            <Link to='/add-job-vacancies' className='nav-link'>
                                <button type='button' className='signup-button'>Add Job Vacancies</button>
                            </Link>
                        </li>

                        {
                            jwtToken !== undefined &&
                            <li className='nav-item-mobile' onClick={handleMenuClick}>
                                <button type='button' className='signup-button' onClick={handleShowComplaintsForm}>Complaints</button>
                            </li>
                        }

                        <li className='nav-item-mobile' onClick={handleMenuClick}>
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
                </>
            }
        </>
    )
}

export default NavBar;