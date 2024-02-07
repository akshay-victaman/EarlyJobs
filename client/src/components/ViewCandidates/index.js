import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import {Oval} from 'react-loader-spinner'
import './style.css'
import UpdateCandidateStatus from "./UpdateCandidateStatus"

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

const ViewCandidates = ({jobsList, setShowCandidateForm}) => {
    const [candidateList, setCandidateList] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [jobId, setJobId] = useState('')

    useEffect(() => {
        if(jobId !== '') {
            getCandidates()
        } else {
            setCandidateList([])
        }
    }, [jobId])

    const handleJobIdChange = (event) => {
        setJobId(event.target.value)
    }

    const getCandidates = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `http://localhost:5000/jobs/candidate/${jobId}`
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        if (response.ok === true) {
          if(data.error) {
            setApiStatus(apiStatusConstant.failure)
          } else {
            const email = Cookies.get('email')
            const role = Cookies.get('role')
            if(role === 'HR') {
              const filteredData = data.filter(eachItem => eachItem.applied_by === email)
              const formattedData = filteredData.map(eachItem => ({
                candidateId: eachItem.candidate_id,
                candidateName: eachItem.name,
                candidateEmail: eachItem.email,
                candidatePhone: eachItem.phone,
                offerStatus: eachItem.offer_status,
                offeredDate: eachItem.offered_date,
                appliedBy: eachItem.applied_by
              }))

              setCandidateList(formattedData)
            } else {
              const formattedData = data.map(eachItem => ({
                candidateId: eachItem.candidate_id,
                candidateName: eachItem.name,
                candidateEmail: eachItem.email,
                candidatePhone: eachItem.phone,
                offerStatus: eachItem.offer_status,
                offeredDate: eachItem.offered_date,
                appliedBy: eachItem.applied_by
              }))
              setCandidateList(formattedData)
            }
            console.log(data)
            setApiStatus(apiStatusConstant.success)
          }
        } else {
          setApiStatus(apiStatusConstant.failure)
        }
    }


    return (
        // offeredDate: eachItem.offered_date
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading'><span className='head-span'>Candidates</span></h1>
            <div className="job-section-select-container">
                <label className="homepage-label" htmlFor='resume'>Select Job<span className='hr-form-span'> *</span></label>
                <select className="homepage-input" name='jobId' id='jobId' value={jobId} onChange={handleJobIdChange}>
                    <option value=''>Select Job</option>
                    {
                        jobsList.map(job => (
                            <option key={job.id} value={job.id}>{job.role} - {job.compname}</option>
                        ))
                    }
                </select>
            </div>
            <div className='table-candidate-container'>
               <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 && "empty-candidates"}`}>
                  <tr className="job-details-candidates-table-heading">
                    <th className="job-details-candidates-table-heading-cell">
                      Name
                    </th>
                    <th className="job-details-candidates-table-heading-cell">
                      Email
                    </th>
                    <th className="job-details-candidates-table-heading-cell">
                      Phone
                    </th>
                    <th className="job-details-candidates-table-heading-cell">
                      Offer Status
                    </th>
                    {
                      Cookies.get('role') !== 'HR' &&
                      <th className="job-details-candidates-table-heading-cell">
                        Shortlisted By
                      </th>
                    }
                    
                    {
                      Cookies.get('role') !== 'ADMIN' && (
                        <th className="job-details-candidates-table-heading-cell">
                          Update Status
                        </th>
                      )
                    }
                    
                  </tr>
                  
                  {
                    candidateList.length > 0 && candidateList.map(eachItem => (
                    
                    <UpdateCandidateStatus key={eachItem.candidateId} candidateDetails={eachItem} jobId={jobId} candidateList={candidateList} setCandidateList={setCandidateList} />
                    ))                    
                  }
                </table>
                {candidateList.length === 0 && 
                <p className='no-candidates-error'>
                    {
                        apiStatus === apiStatusConstant.inProgress ?
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
                        :
                        jobId === '' ? "Select a job to view candidates" :
                        "no records found!"
                    }
                </p>}
            </div>
            <button className="login-button candidate-button" type="button" onClick={() => setShowCandidateForm(0)}>Back</button>
        </div>
    )
}

export default ViewCandidates