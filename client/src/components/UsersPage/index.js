import ToggleButton from '@mui/material/ToggleButton';
import React from 'react';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IoSearchSharp } from "react-icons/io5";
import { format, parseISO } from 'date-fns';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import UsersItem from '../UsersItem';
import {toast} from 'react-toastify';
import Pagination from 'rc-pagination';
import './style.css'
import RoleHistory from './RoleHistory';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [seniorHmList, setSeniorHmList] = useState([]);
    const [hmList, setHmList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [userType, setUserType] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blockStatus, setBlockStatus] = useState(false);
    const [phone, setPhone] = useState('');
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [userRole, setUserRole] = useState({
        role: '',
        hiringFor: '',
        email: '',
        hmShmEmail: '',
        startDate: date,
    });
    const [passwordDetails, setPasswordDetails] = useState({
        password: '',
        confirmPassword: ''
    });

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    useEffect(() => {
        getAllUsers();
    }, [userType, userStatus, page])

    useEffect(() => {
        getAllSeniorHm();
        getAllHm();
    }, [])

    const handleChangeUserType = (event, newUserType) => {
        setUserType(newUserType);
        setPage(1);
    }

    const handleChangeUserStatus = (event, newUserStatus) => {
        setUserStatus(newUserStatus);
        setPage(1);
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
        setPage(1);
    }

    const handleChangePasswordDetails = (event) => {
        setPasswordDetails({...passwordDetails, [event.target.name]: event.target.value});
    }

    const handleChangeUserRole = (event) => {
        setUserRole({...userRole, [event.target.name]: event.target.value});
    }

    const handleChangePhone = (event) => {
        setPhone(event.target.value);
    }

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
        return formattedDate;
    }

    const getAllUsers = async () => {
        setLoading(true);
        const url = `${backendUrl}/admin/get-users/all?role=${userType}&isBlocked=${userStatus}&search=${searchInput}&page=${page}`;
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data)
        if(response.ok === true) {
            const formattedData = data.usersList.map(eachItem => ({
                createdAt: formatDate(eachItem.created_at),
                email: eachItem.email,
                phone: eachItem.phone,
                hiringCtc: eachItem.hiring_ctc,
                hiringFor: eachItem.hiring_for,
                id: eachItem.id,
                hiringCategory: eachItem.hiring_category,
                isBlocked: eachItem.is_blocked,
                location: eachItem.location,
                role: eachItem.role,
                updatedAt: formatDate(eachItem.updated_at),
                username: eachItem.username,
                hmEmail: eachItem.hm_email,
                shmEmail: eachItem.shm_email
            }))
            setUsers(formattedData);
            setTotalItems(data.count);
        } else {
            alert(data.error);
        }
        setLoading(false);
    }

    const getAllSeniorHm = async () => {
        try {
            const url = `${backendUrl}/api/users/all/senior-hms`;
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if(response.ok === true) {
                const formattedData = data.map(eachItem => ({
                    email: eachItem.email,
                    username: eachItem.username
                }))
                setSeniorHmList(formattedData);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    const getAllHm = async () => {
        try {
            const url = `${backendUrl}/api/users/all/hms`;
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            if(response.ok === true) {
                const formattedData = data.map(eachItem => ({
                    email: eachItem.email,
                    username: eachItem.username
                }))
                setHmList(formattedData);
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error)
        }
    }

    const blockUser = async (close, email) => {
        setBlockStatus(true);
        const url = `${backendUrl}/admin/block-user/${email}`;
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok === true) {
            if(data.error) {
                alert(data.error);
            } else {
                setUsers(users.map(eachItem => {
                    if(eachItem.email === email) {
                        return {...eachItem, isBlocked: 1}
                    } else {
                        return eachItem;
                    }
                }))
                alert(data.message);
                close();
            }
        } else {
            alert(data.error);
        }
        setBlockStatus(false);
    }

    const unblockUser = async (close, email) => {
        setBlockStatus(true);
        const url = `${backendUrl}/admin/unblock-user/${email}`;
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok === true) {
            if(data.error) {
                alert(data.error);
            } else {
                setUsers(users.map(eachItem => {
                    if(eachItem.email === email) {
                        return {...eachItem, isBlocked: 0}
                    } else {
                        return eachItem;
                    }
                }))
                alert(data.message);
                close();
            }
        } else {
            alert(data.error);
        }
        setBlockStatus(false);
    }

    const changePassword = async (close, email) => {
        if(passwordDetails.password.trim().length < 6) {
            alert('Password should be atleast 6 characters long');
            return;
        } else if(passwordDetails.password !== passwordDetails.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log(email, passwordDetails.password, passwordDetails.confirmPassword)
        const url = `${backendUrl}/admin/user/change-password`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({email, password: passwordDetails.password})
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok === true) {
            if(data.error) {
                alert(data.error);
            } else {
                alert(data.message);
                setPasswordDetails({
                    password: '',
                    confirmPassword: ''
                });
                close();
            }
        } else {
            alert(data.error);
        }
    }

    const changePhone = async (close, email) => {
        if(phone.trim().length !== 10) {
            toast.error('Phone number should be 10 digits long');
            return;
        }
        const url = `${backendUrl}/admin/user/change-phone`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({email, phone})
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if(response.ok === true) {
                if(data.error) {
                    toast.error(data.error);
                } else {
                    toast.success(data.message);
                    setPhone('');
                    setUsers(users.map(eachItem => {
                        if(eachItem.email === email) {
                            return {...eachItem, phone}
                        }
                        return eachItem;
                    }))
                    close();
                }
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const changeUserRole = async (close, email) => {
        if(userRole.role === '') {
            toast.warn('Select a role');
            return;
        }
        if(userRole.role === 'AC' && userRole.hmShmEmail === '') {
            toast.warn('Select a Senior Hiring Manager');
            return;
        }
        if(userRole.role === 'HR' && userRole.hiringFor === '') {
            toast.warn('Select a Hiring For');
            return;
        }
        if(userRole.role === 'HR' && userRole.hmShmEmail === '') {
            toast.warn('Select a Hiring Manager');
            return;
        }
        if (userRole.startDate === '') {
            toast.warn('Select a start/end date');
            return;
        }
        const newUserRole = {
            ...userRole,
            email
        }
        if(userRole.role === 'SHM') {
            newUserRole.hiringFor = 'Fulltime Senior Hiring Manager';
            newUserRole.hmShmEmail = '';
        }
        if(userRole.role === 'AC') {
            newUserRole.hiringFor = 'Fulltime Hiring Manager';
        }

        const url = `${backendUrl}/admin/user/change-role`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(newUserRole)
        };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if(response.ok === true) {
                if(data.error) {
                    toast.error(data.error);
                } else {
                    toast.success(data.message);
                    setUserRole({
                        role: '',
                        hiringFor: '',
                        email: '',
                        hmShmEmail: ''
                    });
                    setUsers(users.map(eachItem => {
                        if(eachItem.email === email) {
                            return {...eachItem, role: userRole.role, hiringFor: userRole.hiringFor}
                        }
                        return eachItem;
                    }))
                    close();
                }
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
      setPage(page)
    };
  
    const itemRender = (current, type, element) => {
      if (type === 'page') {
        return (
          <button className={`pagination-button ${current === page ? "activePage" : ""}`} key={current} onClick={() => handlePageChange(current)}>
            {current}
          </button>
        );
      }
  
      if (type === 'prev') {
        return (
          <button className={`pagination-button ${page === 1 ? "endPage" : ""}`} title="Previous" key="prev" onClick={() => handlePageChange(current - 1)}>
            {'<'}
          </button>
        );
      }
  
      if (type === 'next') {
        return (
          <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
            {'>'}
          </button>
        );
      }
  
      if (type === 'jump-prev' || type === 'jump-next') {
        return <span className="pagination-dots" title='more'>...</span>;
      }
  
      return element;
    };

    const renderBlockUnblockPopup = (close, email, isBlocked) => (
        <div className="modal-form">
            <button className="modal-close-button" disabled={blockStatus} onClick={close}>&times;</button>
            <label className="homepage-label">Do you want to {isBlocked === 0 ? "Block" : "Unblock"} this user?</label>
            <div className='achieve-button-con'>
            {
                isBlocked === 0 ?
                <button className='job-details-upload-candidate-button' disabled={blockStatus} onClick={() => blockUser(close, email)}>YES</button>
                :
                <button className='job-details-upload-candidate-button' disabled={blockStatus} onClick={() => unblockUser(close, email)}>YES</button>
            }
            <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={blockStatus} onClick={close}>NO</button>
            </div>
        </div>
    )

    const renderChangePasswordPopup = (close, email) => (
        <div className="modal-form">
            <button className="modal-close-button" onClick={close}>&times;</button>
            <label className="homepage-label" style={{marginBottom: '15px'}}>Change password for {email}</label>
            <label className="homepage-label">Enter new password</label>
            <input className="homepage-input" type="password" name='password' onChange={handleChangePasswordDetails} />
            <label className="homepage-label">Confirm new password</label>
            <input className="homepage-input" type="password" name='confirmPassword' onChange={handleChangePasswordDetails}/>
            <div className='achieve-button-con' style={{marginTop: '0px'}}>
                <button className='job-details-upload-candidate-button' onClick={() => changePassword(close, email)}>Change</button>
                <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>Cancel</button>
            </div>
        </div>
    )

    const renderChangePhonePopup = (close, email) => (
        <div className="modal-form">
            <button className="modal-close-button" onClick={close}>&times;</button>
            <label className="homepage-label" style={{marginBottom: '15px'}}>Change phone number for {email}</label>
            <label className="homepage-label" htmlFor='phone'>Enter new phone number</label>
            <input className="homepage-input" type="number" id='phone' name='phone' value={phone} onChange={handleChangePhone} />
            <div className='achieve-button-con' style={{marginTop: '0px'}}>
                <button className='job-details-upload-candidate-button' onClick={() => changePhone(close, email)}>Change</button>
                <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>Cancel</button>
            </div>
        </div>
    )

    const renderRoleHistoryPopup = (close, email) => (
        <div className="modal-form" style={{minHeight: '20vh', maxHeight: '60vh', overflowY: 'auto'}}>
            <label className="homepage-label" style={{marginBottom: '15px'}}>Role History for {email}</label>
            <RoleHistory email={email} />
            <div className='achieve-button-con' style={{marginTop: '0px'}}>
                <button className='job-details-upload-candidate-button' onClick={close}>Close</button>
            </div>
        </div>
    )

    const renderChangeUserRolePopup = (close, email) => (
        <div className="modal-form">
            <button className="modal-close-button" onClick={close}>&times;</button>
            <label className="homepage-label" style={{marginBottom: '15px'}}>Change Role for {email}</label>
            <label className="homepage-label" htmlFor='role'>Select New Role</label>
            <select className="homepage-input" id='role' name='role' onChange={handleChangeUserRole}>
                <option value=''>Select Role</option>
                <option value='SHM'>Senior Hiring Manager</option>
                <option value='AC'>Hiring Manager</option>
                <option value='HR'>HR</option>
            </select>
            {
                userRole.role === 'AC' &&
                <>
                    <label className="homepage-label" htmlFor='hmShmEmail'>Assign Senior Hiring Manager</label>
                    <select className="homepage-input" id='hmShmEmail' name='hmShmEmail' onChange={handleChangeUserRole}>
                        <option value=''>Select Senior Hiring Manager</option>
                        {
                            seniorHmList.map(eachItem => (
                                <option key={eachItem.email} value={eachItem.email}>{eachItem.username} - {eachItem.email}</option>
                            ))
                        }
                    </select>
                </>
            }
            {
                userRole.role === 'HR' &&
                <>
                    <label className="homepage-label" htmlFor='hiringFor'>Hiring For</label>
                    <select className="homepage-input" id='hiringFor' name='hiringFor' onChange={handleChangeUserRole}>
                        <option value=''>Select Hiring For</option>
                        <option value='Intern HR Recruiter'>Intern HR Recruiter </option>
                        <option value='Freelance HR Recruiter'>Freelance HR Recruiter</option>
                        <option value='Fulltime HR Recruiter'>Fulltime HR Recruiter</option>
                    </select>

                    <label className="homepage-label" htmlFor='hmShmEmail'>Assign Hiring Manager</label>
                    <select className="homepage-input" id='hmShmEmail' name='hmShmEmail' onChange={handleChangeUserRole}>
                        <option value=''>Select Hiring Manager</option>
                        {
                            hmList.map(eachItem => (
                                <option key={eachItem.email} value={eachItem.email}>{eachItem.username} - {eachItem.email}</option>
                            ))
                        }
                    </select>
                </>
            }
            <label className="homepage-label" htmlFor='hmShmEmail'>Current Role End Date / New Role Start Date</label>
            <input className="homepage-input" type="date" id='startDate' name='startDate' value={userRole.startDate} onChange={handleChangeUserRole} />
            <div className='achieve-button-con' style={{marginTop: '0px'}}>
                <button className='job-details-upload-candidate-button' onClick={() => changeUserRole(close, email)}>Change</button>
                <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>Cancel</button>
            </div>
        </div>
    )

    const renderGetUsers = () => (
        <div className="user-view-table">
            <table className="users-table">
                    <tr className="users-table-heading-row">
                        <th className="users-table-heading">Username</th>
                        <th className="users-table-heading">Email</th>
                        <th className="users-table-heading">Phone</th>
                        <th className="users-table-heading">Role</th>
                        <th className="users-table-heading">Hiring For</th>
                        <th className="users-table-heading">Location</th>
                        <th className="users-table-heading">Hiring Category</th>
                        <th className="users-table-heading">Led By (Senior HM)</th>
                        <th className="users-table-heading">Led By (HM)</th>
                        <th className="users-table-heading">Created At</th>
                        <th className="users-table-heading">Change Password</th>
                        <th className="users-table-heading">Block/Unblock User</th>
                        <th className="users-table-heading">Change Role</th>
                    </tr>
                    {
                        users.map(eachItem => (
                            <UsersItem key={eachItem.id} userDetails={eachItem} renderBlockUnblockPopup={renderBlockUnblockPopup} renderChangePasswordPopup={renderChangePasswordPopup} renderRoleHistoryPopup={renderRoleHistoryPopup} renderChangePhonePopup={renderChangePhonePopup} renderChangeUserRolePopup={renderChangeUserRolePopup} />
                    ))}
            </table>
            {
                users.length === 0 && 
                <p className='user-view-table-no-data'>
                    {loading ? 
                    <Oval
                    visible={true}
                    height="20"
                    width="20"
                    color="#EB6A4D"
                    strokeWidth="4"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    secondaryColor="#fff"
                    wrapperClass=""
                    /> : 
                    'No data available'}
                </p>
            }
        </div>
    )

    const token = Cookies.get('role')
    if (token !== 'ADMIN') {
        return <Redirect to='/' />
    }

    const onClickEnter = (event) => {
        if(event.key === 'Enter') {
            setPage(1);
            getAllUsers();
        }
    }

    return (
        <div className="homepage-container">
            <div className="user-view-container">
                <h1 className='user-heading'>Users View</h1>
                <div className="user-view-search-filter-con">
                    <div className="user-view-search-con">
                        <input className="user-view-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} placeholder="Search by name, email, or phone" onKeyDown={onClickEnter} />
                        <div className="user-view-search-button" onClick={() => {setPage(1); getAllUsers()}}>
                            <IoSearchSharp className="search-icon" />
                        </div>
                    </div>
                    <ToggleButtonGroup
                        color="primary"
                        value={userType}
                        exclusive
                        onChange={handleChangeUserType}
                        aria-label="Platform"
                        sx={{
                            '& .css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': {backgroundColor: '#ee958040', color: '#EB6A4D', fontWeight: 'bold'},
                            '& .css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover': {backgroundColor: '#ee958040', color: '#EB6A4D', fontWeight: 'bold'},
                            '& .css-d9c359-MuiButtonBase-root-MuiToggleButton-root' : {border: '1px solid #EB6A4D', paddingX: '11px', height: '40px'},
                            marginRight: '15px',
                            marginBottom: '10px'
                        }}
                    >
                        <ToggleButton value="BDE">BDE</ToggleButton>
                        <ToggleButton value="AC">AC</ToggleButton>
                        <ToggleButton value="HR">HR</ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        color="primary"
                        value={userStatus}
                        exclusive
                        onChange={handleChangeUserStatus}
                        aria-label="Platform"
                        sx={{marginBottom: '10px',
                            '& .css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': {backgroundColor: '#ee958040', color: '#EB6A4D', fontWeight: 'bold'},
                            '& .css-d9c359-MuiButtonBase-root-MuiToggleButton-root.Mui-selected:hover': {backgroundColor: '#ee958040', color: '#EB6A4D', fontWeight: 'bold'},
                            '& .css-d9c359-MuiButtonBase-root-MuiToggleButton-root' : {border: '1px solid #EB6A4D', paddingX: '11px', height: '40px'}
                        }}
                    >
                        <ToggleButton value={1}>Blocked</ToggleButton>
                        <ToggleButton value={0}>unblocked</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                {renderGetUsers()}
                <Pagination
                    current={page}
                    total={totalItems}
                    pageSize={itemsPerPage}
                    onChange={handlePageChange}
                    className="pagination-class pagination-class-candidates"
                    itemRender={itemRender}
                    showSizeChanger
                    style={{margin: '10px auto'}}
                />
            </div>
        </div>
    )
}

export default UsersPage