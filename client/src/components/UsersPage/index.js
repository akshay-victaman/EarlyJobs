import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { IoSearchSharp } from "react-icons/io5";
import { format, parseISO } from 'date-fns';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import NavBar from "../NavBar"
import './style.css'
import { useState, useEffect } from 'react';
import UsersItem from '../UsersItem';
import Footer from '../Footer';


const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [userType, setUserType] = useState(null);
    const [userStatus, setUserStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [blockStatus, setBlockStatus] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    useEffect(() => {
        getAllUsers();
    }, [userType, userStatus])

    const handleChangeUserType = (event, newUserType) => {
        setUserType(newUserType);
    }

    const handleChangeUserStatus = (event, newUserStatus) => {
        setUserStatus(newUserStatus);
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    }

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
        return formattedDate;
    }

    const getAllUsers = async () => {
        setLoading(true);
        const url = `${backendUrl}/admin/get-users/all?role=${userType}&isBlocked=${userStatus}`;
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
                createdAt: formatDate(eachItem.created_at),
                email: eachItem.email,
                hiringCtc: eachItem.hiring_ctc,
                id: eachItem.id,
                industry: eachItem.industry,
                isBlocked: eachItem.is_blocked,
                location: eachItem.location,
                role: eachItem.role,
                updatedAt: formatDate(eachItem.updated_at),
                username: eachItem.username
            }))
            setUsers(formattedData);
        } else {
            alert(data.error);
        }
        setLoading(false);
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

    const renderBlockUnblockPopup = (close, email, isBlocked) => (
        <div className="modal-form">
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

    const renderGetUsers = () => { 
        const filteredUsers = users.filter(eachItem => eachItem.username.toLowerCase().includes(searchInput.toLowerCase()));
        return (
            <div className="user-view-table">
                <table className="users-table">
                        <tr className="users-table-heading-row">
                            <th className="users-table-heading">Username</th>
                            <th className="users-table-heading">Email</th>
                            <th className="users-table-heading">Role</th>
                            <th className="users-table-heading">Location</th>
                            <th className="users-table-heading">Hiring CTC</th>
                            <th className="users-table-heading">Industry</th>
                            <th className="users-table-heading">Created At</th>
                            <th className="users-table-heading">Block/Unblock User</th>
                        </tr>
                        {
                            filteredUsers.map(eachItem => (
                                <UsersItem key={eachItem.id} blockStatus={blockStatus} userDetails={eachItem} renderBlockUnblockPopup={renderBlockUnblockPopup} />
                        ))}
                </table>
                {
                    filteredUsers.length === 0 && 
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
    }

    const token = Cookies.get('role')
    if (token !== 'ADMIN') {
        return <Redirect to='/' />
    }

    return (
        <div className="homepage-container">
            <NavBar />
            <div className="user-view-container">
                <h1 className='user-heading'>Users View</h1>
                <div className="user-view-search-filter-con">
                    <div className="user-view-search-con">
                        <div className="user-view-search-button">
                            <IoSearchSharp className="search-icon" />
                        </div>
                        <input className="user-view-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} placeholder="Search" />
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
            </div>
            <Footer />
        </div>
    )
}

export default UsersPage