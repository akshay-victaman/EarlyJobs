import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {Oval} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { format, parseISO } from 'date-fns';

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

const MyHrRecruiters = ({setShowCandidateForm}) => {
    const [recruiterList, setRecruiterList] = useState([])
    const [hrRoleType, setHrRoleType] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [page, setPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0);

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL;

    useEffect(() => {
        getHrRecruiters()
    }, [hrRoleType, page])

    const handleSelectHrRoleType = (event) => {
        setHrRoleType(event.target.value)
    }

    const formatDate = (date) => {
      const dbDate = parseISO(date);
      const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
      return formattedDate;
    }

    const getHrRecruiters = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const email = Cookies.get('email')
        const apiUrl = `${backendUrl}/api/users/hr-for-hm/${email}?hiringFor=${hrRoleType}&page=${page}`
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
          } else {
            const formattedData = data.users.map(eachItem => ({
              name: eachItem.username,
              email: eachItem.email,
              phone: eachItem.phone,
              createdAt: formatDate(eachItem.created_at),
              hiringFor: eachItem.hiring_for,
              lastLogin: eachItem.last_login ? formatDate(eachItem.last_login) : 'N/A'
            }))
            console.log(data)
            setTotalItems(data.count)
            setRecruiterList(formattedData)
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          setApiStatus(apiStatusConstant.failure)
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

    return (
        // offeredDate: eachItem.offered_date
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>My HR Recruiters</span></h1>
            <div className="job-section-select-filter-container">
              <div className="job-section-select-container"> 
                <label className="homepage-label" htmlFor='resume'>Hiring For</label>
                <select className="homepage-input" name='jobId' id='jobId' value={hrRoleType} onChange={handleSelectHrRoleType}>
                    <option value=''>All Roles</option>
                    <option value='Intern HR Recruiter'>Intern HR Recruiter</option>
                    <option value='Fulltime HR Recruiter'>Fulltime HR Recruiter</option>
                    <option value='Freelance HR Recruiter'>Freelance HR Recruiter</option>
                </select>
              </div>
            </div>
            <div className='table-candidate-container'>
               <table className={`job-details-candidates-table candidate-table-job-section ${recruiterList.length === 0 && "empty-candidates"}`}>
                  <tr className="job-details-candidates-table-heading">
                    <th className="job-details-candidates-table-heading-cell">Name</th>
                    <th className="job-details-candidates-table-heading-cell">Email</th>
                    <th className="job-details-candidates-table-heading-cell">Phone</th>
                    <th className="job-details-candidates-table-heading-cell">Hiring For</th>
                    <th className="job-details-candidates-table-heading-cell">Last Login</th>
                    <th className="job-details-candidates-table-heading-cell">Created At</th>
                  </tr>
                  {
                    recruiterList.length > 0 && recruiterList.map(eachItem => (
                        <tr key={eachItem.email} className="job-details-candidates-table-row">
                            <td className="job-details-candidates-table-cell">{eachItem.name}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.hiringFor}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.lastLogin}</td>
                            <td className="job-details-candidates-table-cell">{eachItem.createdAt}</td>
                        </tr>
                    ))
                  }
                </table>
                {recruiterList.length === 0 &&
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