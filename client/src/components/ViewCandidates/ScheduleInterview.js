import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { formatISO, differenceInDays, parseISO, sub, parse, format, set } from 'date-fns';
import { ThreeCircles } from 'react-loader-spinner'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const ScheduleInterview = ({interviewDetails, onShowScheduleInterviewPopup}) => {
    const { jobId, candidateDetails, setCandidateList, candidateList, jobsList } = interviewDetails
    const [jobDetails, setJobDetails] = useState({})
    const [hmHrData, setHmHrData] = useState({})
    const [interviewDate, setInterviewDate] = useState('')
    const [interviewTime, setInterviewTime] = useState('')
    const [companyName, setCompanyName] = useState('')
    // const [location, setLocation] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const [loading, setLoading] = useState(false)

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    useEffect(() => {
        getHrAssignedHm()
        getJobDetails()
    }, [])


    const getJobDetails = async () => {
        const url = `${backendUrl}/jobs/details/${jobId}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        setApiStatus(apiStatusConstant.inProgress)
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
                setApiStatus(apiStatusConstant.failure)
            } else {
                setJobDetails(data)
                setCompanyName(data.id)
                setApiStatus(apiStatusConstant.success)
            }
        } else {
            alert(data.error)
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const getHrAssignedHm = async () => {
        const url = `${backendUrl}/api/users/hr-assigned-hm/${Cookies.get('email')}?role=${Cookies.get('role')}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        setApiStatus(apiStatusConstant.inProgress)
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                setApiStatus(apiStatusConstant.failure)
                alert(data.error)
            } else {
                setApiStatus(apiStatusConstant.success)
                setHmHrData(data)
            }
        } else {
            setApiStatus(apiStatusConstant.failure)
            alert(data.error)
        }
    }

    const sendEmailAck = async () => {
        const username = Cookies.get('username')
        const jobName = jobDetails.title
        const companyName = jobDetails.company_name
        const location = jobDetails.location
        // const interviewDateTime = new Date(`${candidateDetails.interviewDate}T${candidateDetails.interviewTime}`);
        const interviewDateTime = parse(`${interviewDate} ${interviewTime}`, "yyyy-M-d HH:mm", new Date());
        const formattedDateTime = format(interviewDateTime, 'EEE MMM dd yyyy hh:mm aa');

        let emailContent = `
            Hi ${candidateDetails.candidateName},
            <br>
            <br>
            Your interview for the position of ${jobName} with ${companyName} is scheduled for <b>${formattedDateTime}</b>. Please ensure you arrive on time. The interview will be held at ${location}. Best of luck!
            <br>
            <br>
            If you need any help, please coordinate with ${hmHrData.hr !== undefined ? `${username} Victaman, at ${hmHrData.hr[0].phone} or ` : ""}${hmHrData.hm[0].username}, Victaman at ${hmHrData.hm[0].phone}.
            <br>
            <br>
            Regards,
            <br> 
            earlyjobs.in team
            <br> 
            Victaman Enterprises
        `
        const encodedContent = encodeURIComponent(emailContent)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'Interview Scheduled Acknowledgement Mail',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Interview Scheduled by Earlyjobs Victaman`,
            recipients: `${candidateDetails.candidateEmail}`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`
        await fetch(url, {method: "GET", mode: "no-cors"})
    }

    const sendEmailDayBeforeRem = async () => {
        const username = Cookies.get('username')
        const jobName = jobDetails.title
        const companyName = jobDetails.company_name
        const location = jobDetails.location
        const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);
        const yesterday = sub(interviewDateTime, { days: 1 });
        const yesterdayDate = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

        const formattedDateTime = format(interviewDateTime, 'EEE MMM dd yyyy hh:mm aa');
        let emailContent = `
            Hi ${candidateDetails.fullName},
            <br>
            <br>
            Just a friendly reminder that your interview for the position of ${jobName} with ${companyName} is scheduled for tomorrow, <b>${formattedDateTime}</b>. Please ensure you arrive on time. The interview will be held at ${location}. Best of luck!
            <br>
            <br>
            If you need any help, please coordinate with ${hmHrData.hr !== undefined ? `${username}, Victaman at ${hmHrData.hr[0].phone} or ` : ""}${hmHrData.hm[0].username}, Victaman at ${hmHrData.hm[0].phone}.
            <br>
            <br>
            Regards,
            <br> 
            earlyjobs.in team
            <br> 
            Victaman Enterprises
        `
        const encodedContent = encodeURIComponent(emailContent)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'EarlyJobs Signup',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `A reminder about your interview scheduled by Earlyjobs Victaman`,
            recipients: `${candidateDetails.candidateEmail}`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in',
            scheduledAt: encodeURIComponent(yesterdayDate + '18:00:00')
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}&scheduled_at=${queryParameters.scheduledAt}`
        
        await fetch(url, {method: "GET", mode: "no-cors"})
    }

    const sendEmailOnDay = async () => {
        const username = Cookies.get('username')
        const jobName = jobDetails.title
        const companyName = jobDetails.company_name
        const location = jobDetails.location
        const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);

        // const interviewDateTime = parse(`${candidateDetails.interviewDate} ${candidateDetails.interviewTime}`, new Date());
        const formattedDateTime = format(interviewDateTime, 'EEE MMM dd yyyy hh:mm aa');

        let emailContent = `
            Good morning ${candidateDetails.fullName},
            <br>
            <br>
            This is a gentle reminder that your interview for the position of ${jobName} with ${companyName} is scheduled for today, <b>${formattedDateTime}</b>. Please ensure you arrive on time. The interview will be held at ${location}. Best of luck!
            <br>
            <br>
            If you need any help, please coordinate with ${hmHrData.hr !== undefined ? `${username}, Victaman at ${hmHrData.hr[0].phone} or ` : ""}${hmHrData.hm[0].username}, Victaman at ${hmHrData.hm[0].phone}.
            <br>
            <br>
            Regards,
            <br> 
            earlyjobs.in team
            <br> 
            Victaman Enterprises
        `
        const encodedContent = encodeURIComponent(emailContent)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'EarlyJobs Signup',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `A reminder about your interview scheduled by Earlyjobs Victaman`,
            recipients: `${candidateDetails.candidateEmail}`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in',
            scheduledAt: encodeURIComponent(interviewDate + '07:00:00')
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}&scheduled_at=${queryParameters.scheduledAt}`
        
        await fetch(url, {method: "GET", mode: "no-cors"})
    }

    const sendInterviewEmails = async () => {
        const currentDateTime = new Date();
        const interviewDateTime = new Date(interviewDate);
        const currentDate = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')}`;
        const interviewDate2 = `${interviewDateTime.getFullYear()}-${String(interviewDateTime.getMonth() + 1).padStart(2, '0')}-${String(interviewDateTime.getDate()).padStart(2, '0')}`;
        const diff = differenceInDays(parseISO(interviewDate2), parseISO(currentDate));
        if(diff === 0) {
            sendEmailAck()
        } else if(diff === 1) {
            sendEmailAck()
            sendEmailOnDay()
        } else if(diff >= 2) {
            sendEmailAck()
            sendEmailDayBeforeRem()
            sendEmailOnDay()
        }
    }

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
        return formattedDate;
    }

    const scheduleInterview = async () => {
        if(interviewDate === '' || interviewTime === '' || companyName === '') {
            alert('Please fill all the fields to reschedule the interview')
            return;
        }
        const interviewDateTime = new Date(`${interviewDate}T${interviewTime}`);
        const formattedDateTime = formatISO(interviewDateTime);
        
        const candidateData = {
            candidateId: candidateDetails.candidateId,
            jobId: companyName,
            hrEmail: Cookies.get('email'),
            offerStatus: 'Ongoing',
            interviewDate: formattedDateTime
        }
        console.log(candidateData)
        // return
        setLoading(true)
        const url = `${backendUrl}/jobs/candidate/interview/`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(candidateData)
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                alert(data.error)
            } else {
                sendInterviewEmails()
                if(jobId === companyName) {
                    setCandidateList(candidateList.map(eachItem => {
                        if(eachItem.candidateId === candidateDetails.candidateId) {
                        return {
                            ...eachItem,
                            interviewDate: formatDate(formattedDateTime)
                        }
                        }
                        return eachItem
                    }))
                }
                onShowScheduleInterviewPopup()
            }
        } else {
            alert(data.error)
        }
        setLoading(false)
    }

    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const renderRescheduleInterview = () => (
        <>
            <label htmlFor="companyName" className="homepage-label">Company Name</label>
            <select id="companyName" name="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="homepage-input">
                {
                    jobsList.map((eachJob) => (
                        <option key={eachJob.id} value={eachJob.id}>{eachJob.role} - {eachJob.compname}</option>
                    ))
                }
            </select>
            {/* <label htmlFor="location" className="homepage-label">Location</label>
            <input type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="homepage-input" /> */}
            <label htmlFor="interviewDate" className="homepage-label">Interview Date</label>
            <input type="date" id="interviewDate" name="interviewDate" value={interviewDate} min={dateString} onChange={(e) => setInterviewDate(e.target.value)} className="homepage-input" required />
            <label htmlFor="interviewTime" className="homepage-label">Interview Time</label>
            <input type="time" id="interviewTime" name="interviewTime" value={interviewTime} onChange={(e) => setInterviewTime(e.target.value)} className="homepage-input" required />
            <button className="login-button" onClick={scheduleInterview} disabled={loading}>Reschedule</button>
            <button className="candidate-details-close-btn" onClick={onShowScheduleInterviewPopup} disabled={loading}>
                &times;
            </button>
        </>
    )

    const renderFailure = () => (
        <div className="candidate-failure-con">
            <p className="candidate-failure-text">Something went wrong!</p>
            <button className="candidate-try-agian-btn" onClick={getJobDetails}>Try Again</button>
            <button className="candidate-details-close-btn" onClick={onShowScheduleInterviewPopup}>
                &times;
            </button>
        </div>
    )

    const renderInProgress = () => (
        <div data-testid="loader" className="candidate-loader-container">
            <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderSwitchCase = () => {
        switch(apiStatus) {
            case apiStatusConstant.inProgress:
                return renderInProgress();
            case apiStatusConstant.success:
                return renderRescheduleInterview();
            case apiStatusConstant.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="candidate-details-modal-con">
            <h1 className="candidate-details-heading">Reschedule Interview</h1>
            {renderSwitchCase()}
        </div>
    )
}

export default ScheduleInterview;