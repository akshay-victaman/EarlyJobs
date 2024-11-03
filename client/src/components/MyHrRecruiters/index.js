import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {Oval} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import { IoSearchSharp } from 'react-icons/io5';
import './style.css'
import ExcelDownloadButton from "../ExcelDownloadButton";

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const MyHrRecruiters = ({setShowCandidateForm}) => {
    const [hmOrRecruiterList, setHmOrRecruiterList] = useState([])
    const [hrRoleType, setHrRoleType] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [page, setPage] = useState(1)
    const [blockStatus, setBlockStatus] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [hiringFor, setHiringFor] = useState('Intern HR Recruiter');
    const [shmOrHmEmails, setShmOrHmEmails] = useState([]);
    const [newHmEmail, setNewHmEmail] = useState('');
    const today = new Date();
    const date = today.toISOString().split('T')[0];
    const [assignedDate, setAssignedDate] = useState(date);
    const [passwordDetails, setPasswordDetails] = useState({
      password: '',
      confirmPassword: ''
    });

    const role = Cookies.get('role');

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    useEffect(() => {
      if(role === 'AC') {
        getHrRecruiters()
        getHiringManagers();
      } else {
        getSeniorHiringManagers();
        getHiringMangersForSeniorHm();
      }
    }, [hrRoleType, page])

    const handleSelectHrRoleType = (event) => {
        setHrRoleType(event.target.value)
    }

    const handleChangePasswordDetails = (event) => {
      setPasswordDetails({...passwordDetails, [event.target.name]: event.target.value});
    }

    const handleChangeSearchInput = (event) => {
      setSearchInput(event.target.value);
    }

    const handleHiringFor = (event) => {
      setHiringFor(event.target.value);
    }

    const handleChangeHMEmail = (event) => {
      setNewHmEmail(event.target.value);
    }

    const formatDate = (date) => {
      const dbDate = parseISO(date);
      const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
      return formattedDate;
    }

    const getHrRecruiters = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `${backendUrl}/api/users/v2/hrs-for-hm?hiringFor=${hrRoleType}&search=${searchInput}&page=${page}`
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          },
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if (response.ok === true) {
          if(data.error) {
            setApiStatus(apiStatusConstant.failure)
            toast.error(data.error)
          } else {
            const formattedData = data.users.map(eachItem => ({
              name: eachItem.username,
              email: eachItem.email,
              phone: eachItem.phone,
              createdAt: formatDate(eachItem.created_at),
              hiringFor: eachItem.hiring_for,
              lastLogin: eachItem.last_login ? formatDate(eachItem.last_login) : '--',
              isBlocked: eachItem.is_blocked
            }))
            console.log(data)
            setTotalItems(data.count)
            setHmOrRecruiterList(formattedData)
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          toast.error(data.error)
          setApiStatus(apiStatusConstant.failure)
        }
    }

    const getHrRecruitersForExcel = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `${backendUrl}/api/users/v2/hrs-for-hm/excel?hiringFor=${hrRoleType}&search=${searchInput}`
      console.log(apiUrl)
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        if(data.error) {
          toast.error(data.error)
        } else {
          const formattedData = data.map(eachItem => ({
            name: eachItem.username,
            email: eachItem.email,
            phone: eachItem.phone,
            createdAt: formatDate(eachItem.created_at),
            hiringFor: eachItem.hiring_for,
            lastLogin: eachItem.last_login ? formatDate(eachItem.last_login) : '--',
            isBlocked: eachItem.is_blocked
          }))
          return formattedData;
        }
      } else {
        toast.error(data.error)
      }
  }

  const getHiringMangersForSeniorHm = async () => {
    setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `${backendUrl}/api/users/v2/hm-for-shm/?search=${searchInput}&page=${page}`
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          },
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if (response.ok === true) {
          if(data.error) {
            setApiStatus(apiStatusConstant.failure)
            toast.error(data.error)
          } else {
            console.log(data)
            const formattedData = data.users.map(eachItem => ({
              name: eachItem.username,
              email: eachItem.email,
              phone: eachItem.phone,
              createdAt: formatDate(eachItem.created_at),
              hiringFor: eachItem.hiring_for,
              lastLogin: eachItem.last_login ? formatDate(eachItem.last_login) : '--',
              isBlocked: eachItem.is_blocked
            }))
            console.log(data)
            setTotalItems(data.count)
            setHmOrRecruiterList(formattedData)
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          toast.error(data.error)
          setApiStatus(apiStatusConstant.failure)
        }
    }

    const getHiringMangersForSeniorHmForExcel = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const apiUrl = `${backendUrl}/api/users/v2/hm-for-shm/excel?search=${searchInput}`
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        if(data.error) {
          toast.error(data.error)
        } else {
          const formattedData = data.map(eachItem => ({
            name: eachItem.username,
            email: eachItem.email,
            phone: eachItem.phone,
            createdAt: formatDate(eachItem.created_at),
            hiringFor: eachItem.hiring_for,
            lastLogin: eachItem.last_login ? formatDate(eachItem.last_login) : '--',
            isBlocked: eachItem.is_blocked
          }))
          return formattedData;
        }
      } else {
        toast.error(data.error)
      }
  }

    const getHiringManagers = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const email = Cookies.get('email')
      const apiUrl = `${backendUrl}/api/users/all/hms`
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
      }

      try {
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if (response.ok === true) {
          if(data.error) {
            toast.error(data.error)
          } else {
            console.log(data)
            const emails = data.filter(eachItem => eachItem.email !== email);
            console.log(emails)
            setShmOrHmEmails(emails)
          }
        } else {
          toast.error(data.error)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    const getSeniorHiringManagers = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const email = Cookies.get('email')
      const apiUrl = `${backendUrl}/api/users/all/senior-hms`
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
      }

      try {
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if (response.ok === true) {
          if(data.error) {
            toast.error(data.error)
          } else {
            console.log(data)
            const emails = data.filter(eachItem => eachItem.email !== email);
            console.log(emails)
            setShmOrHmEmails(emails)
          }
        } else {
          toast.error(data.error)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }


    const onClickEnter = (event) => {
      if (event.key === 'Enter') {
        if(role === 'AC') {
          getHrRecruiters()
        } else {
          getHiringMangersForSeniorHm();
        }
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
              toast.error(data.error);
          } else {
            setHmOrRecruiterList(hmOrRecruiterList.map(eachItem => {
                  if(eachItem.email === email) {
                      return {...eachItem, isBlocked: 1}
                  } else {
                      return eachItem;
                  }
              }))
              toast.success(data.message);
              close();
          }
      } else {
          toast.error(data.error);
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
                toast.error(data.error);
            } else {
              setHmOrRecruiterList(hmOrRecruiterList.map(eachItem => {
                    if(eachItem.email === email) {
                        return {...eachItem, isBlocked: 0}
                    } else {
                        return eachItem;
                    }
                }))
                toast.success(data.message);
                close();
            }
        } else {
            toast.error(data.error);
        }
        setBlockStatus(false);
    }

    const changePassword = async (close, email) => {
      if(passwordDetails.password.trim().length < 6) {
          toast.warn('Password should be atleast 6 characters long');
          return;
      } else if(passwordDetails.password !== passwordDetails.confirmPassword) {
          toast.warn('Passwords do not match');
          return;
      }
      
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
              toast.error(data.error);
          } else {
              toast.success(data.message);
              setPasswordDetails({
                  password: '',
                  confirmPassword: ''
              });
              close();
          }
      } else {
          toast.error(data.error);
      }
    }

    const handleChangeHiringFor = async (close, email) => {
      const url = `${backendUrl}/api/users/change-hiring-for`;
      const options = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt_token')}`
          },
          body: JSON.stringify({email, hiringFor})
      };
      const response = await fetch(url, options);
      const data = await response.json();
      try {
        if(response.ok === true) {
            if(data.error) {
              toast.error(data.error);
            } else {
                toast.success(data.success);
                setHmOrRecruiterList(hmOrRecruiterList.map(eachItem => {
                  if(eachItem.email === email) {
                      return {...eachItem, hiringFor}
                  } else {
                      return eachItem;
                  }
                }))
                close();
            }
        } else {
            toast.error(data.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }

    const handleMigrateHr = async (close, hrEmail) => {

      if(newHmEmail === '') {
        toast.error('Please select a hiring manager');
        return;
      }
      if(assignedDate === '') {
        toast.error('Please select a date');
        return;
      }

      const url = `${backendUrl}/api/users/migrate-hr-assigned-hm`;
      const options = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt_token')}`
          },
          body: JSON.stringify({hrEmail, newHmEmail, assignedDate})
      };

      console.log(hrEmail, newHmEmail)

      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if(response.ok === true) {
            if(data.error) {
              toast.error(data.error);
            } else {
                toast.success(data.success);
                setHmOrRecruiterList(hmOrRecruiterList.filter(eachItem => eachItem.email !== hrEmail));
                setTotalItems(totalItems - 1);
                close();
            }
        } else {
            toast.error(data.error);
        }
      } catch(error) {
          toast.error(error.message);
        }
      }

      const handleMigrateHm = async (close, hrEmail) => {

        if(newHmEmail === '') {
          toast.error('Please select a senior hiring manager');
          return;
        }
        if(assignedDate === '') {
          toast.error('Please select a date');
          return;
        }
  
        const url = `${backendUrl}/api/users/migrate-hm-assigned-shm`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({hrEmail, newHmEmail, assignedDate})
        };
  
        console.log(hrEmail, newHmEmail)
  
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if(response.ok === true) {
              if(data.error) {
                toast.error(data.error);
              } else {
                  toast.success(data.success);
                  setHmOrRecruiterList(hmOrRecruiterList.filter(eachItem => eachItem.email !== hrEmail));
                  setTotalItems(totalItems - 1);
                  close();
              }
          } else {
              toast.error(data.error);
          }
        } catch(error) {
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
            {'<<'}
          </button>
        );
      }
  
      if (type === 'next') {
        return (
          <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
            {'>>'}
          </button>
        );
      }
  
      if (type === 'jump-prev' || type === 'jump-next') {
        return <span className="pagination-dots" title='more'>...</span>;
      }
  
      return element;
    };

    const renderNoCandidates = () => {
      if (apiStatus === apiStatusConstant.inProgress) {
        return (
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#EB6A4D"
            strokeWidth="4"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            secondaryColor="#EB6A4D"
            wrapperClass=""
          />
        )
      }
      else return "no records found!"
    }

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

    const renderChangeRole = (close, email, name) => (
      <div className="modal-form">
          <button className="modal-close-button" onClick={close}>&times;</button>
          <label className="homepage-label" style={{marginBottom: '15px'}}>Change role for {name} - ({email})</label>
          <label className="homepage-label">Select new role</label>
          <select className="homepage-input" name='hiringFor' id='hiringFor' value={hiringFor} onChange={handleHiringFor} >
              <option value='Intern HR Recruiter'>Intern HR Recruiter</option>
              <option value='Fulltime HR Recruiter'>Fulltime HR Recruiter</option>
              <option value='Freelance HR Recruiter'>Freelance HR Recruiter</option>
          </select>
          <div className='achieve-button-con' style={{marginTop: '0px'}}>
              <button className='job-details-upload-candidate-button' onClick={() => handleChangeHiringFor(close, email)}>Change</button>
              <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>Cancel</button>
          </div>
      </div>
    )

    const renderMigrateHr = (close, email, name) => (
      <div className="modal-form">
          <button className="modal-close-button" onClick={close}>&times;</button>
          <label className="homepage-label" style={{marginBottom: '15px'}}>Migrate {role === "SHM" ? "Hiring Manger" : "HR"} {name} to {newHmEmail}</label>
          <label className="homepage-label">Select new {role === "SHM" ? "Senior" : ""} Hiring Manager</label>
          <select className="homepage-input" name='hiringFor' id='hiringFor' value={newHmEmail} onChange={handleChangeHMEmail} >
              <option value=''>Select {role === "SHM" ? "senior" : ""} hiring manager</option>
              {
                shmOrHmEmails.map(eachItem => (
                  <option key={eachItem.email} value={eachItem.email}>{eachItem.username} - {eachItem.email}</option>
                ))
              }
          </select>
          <label className="homepage-label">Migration Date</label>
          <input className="homepage-input" type="date" name='migrationDate' value={assignedDate} onChange={(e) => setAssignedDate(e.target.value)} />
          <div className='achieve-button-con' style={{marginTop: '0px'}}>
              <button className='job-details-upload-candidate-button' onClick={() => role === "AC" ? handleMigrateHr(close, email) : handleMigrateHm(close, email)}>Change</button>
              <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={close}>Cancel</button>
          </div>
      </div>
    )

    return (
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>My {role === "AC" ? "HR Recruiters" : "Hiring Managers"}</span></h1>
            <div className="job-section-select-filter-container my-hr-recruiters-filter-con">
              { role === 'AC' && 
                <div className="job-section-select-container"> 
                  <label className="homepage-label" htmlFor='resume'>Hiring For</label>
                  <select className="homepage-input" name='jobId' id='jobId' value={hrRoleType} onChange={handleSelectHrRoleType}>
                      <option value=''>All Roles</option>
                      <option value='Intern HR Recruiter'>Intern HR Recruiter</option>
                      <option value='Fulltime HR Recruiter'>Fulltime HR Recruiter</option>
                      <option value='Freelance HR Recruiter'>Freelance HR Recruiter</option>
                  </select>
                </div>
              }
              <div className="user-view-search-con my-hr-recruiters-search-con">
                  <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, or phone" />
                  <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={role === "AC" ? getHrRecruiters : getHiringMangersForSeniorHm}>
                      <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
                  </div>
              </div>
              {hmOrRecruiterList.length > 0 && 
                <div className="excel-download-button"> 
                  <ExcelDownloadButton  getData={role === "AC" ? getHrRecruitersForExcel : getHiringMangersForSeniorHmForExcel} /> 
                </div>
              }
              <div className="rows-count-con">
                  <span className="rows-count-text">Total Results:</span>
                  <span className="rows-count-number">`{totalItems}`</span>
              </div>
            </div>
            <div className='table-candidate-container'>
               <table className={`job-details-candidates-table candidate-table-job-section ${hmOrRecruiterList.length === 0 && "empty-candidates"}`}>
                  <tr className="job-details-candidates-table-heading">
                    <th className="job-details-candidates-table-heading-cell">Name</th>
                    <th className="job-details-candidates-table-heading-cell">Email</th>
                    <th className="job-details-candidates-table-heading-cell">Phone</th>
                    { role === 'AC' && <th className="job-details-candidates-table-heading-cell">Hiring For</th>}
                    <th className="job-details-candidates-table-heading-cell">Last Login</th>
                    <th className="job-details-candidates-table-heading-cell">Created At</th>
                    <th className="job-details-candidates-table-heading-cell">Change Password</th>
                    <th className="job-details-candidates-table-heading-cell">Block/Unblock {role === "SHM" ? "HM" : "HR"}</th>
                    { role === 'AC' && <th className="job-details-candidates-table-heading-cell">Change Role</th>}
                    <th className="job-details-candidates-table-heading-cell">Migrate {role === "SHM" ? "HM" : "HR"}</th>
                  </tr>
                  {
                      hmOrRecruiterList.length > 0 && hmOrRecruiterList.map(eachItem => (
                        <tr key={eachItem.email} className="job-details-candidates-table-row">
                            <td className="job-details-candidates-table-cell">{eachItem.name}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                            { role === 'AC' && <td className="job-details-candidates-table-cell">{eachItem.hiringFor}</td>}
                            <td className="job-details-candidates-table-cell">{eachItem.lastLogin}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.createdAt}</td>
                            <td className="job-details-candidates-table-cell">
                              <Popup
                                  trigger={<button className="block-user-button">Change</button>}
                                  modal
                              >
                                  {close => (
                                  <div className="modal">
                                      {renderChangePasswordPopup(close, eachItem.email)}
                                  </div>
                                  )}
                              </Popup>
                            </td>
                            <td className="job-details-candidates-table-cell">
                                <Popup
                                    trigger={<button className="block-user-button">{eachItem.isBlocked === 0 ? "Block" : "Unblock"}</button>}
                                    modal
                                >
                                    {close => (
                                    <div className="modal">
                                        {renderBlockUnblockPopup(close, eachItem.email, eachItem.isBlocked)}
                                    </div>
                                    )}
                                </Popup>
                            </td>
                            { role === 'AC' &&
                              <td className="job-details-candidates-table-cell">
                                <Popup
                                    trigger={<button className="block-user-button">Change</button>}
                                    modal
                                >
                                    {close => (
                                    <div className="modal">
                                        {renderChangeRole(close, eachItem.email, eachItem.name)}
                                    </div>
                                    )}
                                </Popup>
                              </td>
                            }
                            <td className="job-details-candidates-table-cell">
                              <Popup
                                  trigger={<button className="block-user-button">Migrate</button>}
                                  modal
                              >
                                  {close => (
                                  <div className="modal">
                                      {renderMigrateHr(close, eachItem.email, eachItem.name)}
                                  </div>
                                  )}
                              </Popup>
                            </td>
                        </tr>
                    ))
                  }
                </table>
                {hmOrRecruiterList.length === 0 &&
                <p className='no-candidates-error'>
                    { renderNoCandidates() }
                </p>}
            </div>
            <div className="job-details-candidates-pagination-con">
              <button className="login-button candidate-button" type="button" onClick={() => setShowCandidateForm(0)}>Back</button>
              <Pagination
                current={page}
                total={totalItems}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                className="pagination-class pagination-class-candidates"
                itemRender={itemRender}
                showSizeChanger
              />
            </div>
          </div>
    )
}

export default MyHrRecruiters