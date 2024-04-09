import { ImUsers } from "react-icons/im";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaUsers, FaUserPlus, FaFileCircleQuestion } from "react-icons/fa6";
import Popup from 'reactjs-popup';
import Cookie from 'js-cookie';
import { IoIosClose } from "react-icons/io";
import {v4 as uuid} from 'uuid'
import {addDays, format} from 'date-fns'
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import Cookies from "js-cookie";
import NavBar from '../NavBar'
import './style.css'
import { Link, Redirect } from "react-router-dom";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import Victaman_intern_offer_letter from "../../assets/Victaman_intern_offer_letter.pdf"


let hiringCategoryOptions = [
    { value: 'BPO', label: 'BPO' },
    { value: 'IT', label: 'IT' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Industry', label: 'Industry' },
    { value: 'Others', label: 'Others' }
];

const AdminPage = () => {
    const [createStatus, setCreateStatus] = useState(false)
    const [error, setError] = useState('')
    const [hiringManagersList, setHiringManagersList] = useState([])

    const [signUpDetails, setSignUpDetails] = useState({
        docId: "TBF",
        username: "",
        email: "",
        phone: "",
        password: uuid().slice(0, 8),
        role: '',
        hiringFor: '',
        location: 'TBF',
        assignHM: '',
        hiringCategory: [],
        hmType: '',
        resumeUrl: ''
    })

    useEffect(() => {
        const hiringFor = signUpDetails.role === 'AC' ? 'Fulltime Hiring Manager' : signUpDetails.role === 'HR' ? '' : signUpDetails.role === 'ADMIN' ? 'Admin' : signUpDetails.role === 'BDE' ? 'BDE' : ''
        const docId = (signUpDetails.role !== 'ADMIN' && signUpDetails.role !== 'BDE') ? "TBF" : "";
        setSignUpDetails({ ...signUpDetails, hiringFor, docId })
    }, [signUpDetails.role])

    useEffect(() => {
        fetchHiringManagers()
    }, [])

    const fetchHiringManagers = async () => {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/all/account-managers`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + Cookie.get('jwt_token')
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === true) {
            setHiringManagersList(data)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSignUpDetails({ ...signUpDetails, [name]: value })
    }

    const handleAddCategory = (e) => {
        if(e.target.value === "") return
        const category = signUpDetails.hiringCategory
        category.push(e.target.value)
        setSignUpDetails({ ...signUpDetails, hiringCategory: category })
        hiringCategoryOptions = hiringCategoryOptions.filter((option) => option.value !== e.target.value)
    }

    const handleCategoryRemove = (index, categoryLabel) => {
        const category = signUpDetails.hiringCategory
        category.splice(index, 1)
        setSignUpDetails({ ...signUpDetails, hiringCategory: category })
        hiringCategoryOptions.push({ value: categoryLabel, label: categoryLabel })
    }

    const sendEmail = async () => {
        const assignHMDetails = hiringManagersList.filter((hm) => hm.email === signUpDetails.assignHM)[0]
        let emailContent = ''
        if(signUpDetails.role === 'HR') {
            emailContent = `Hi ${signUpDetails.username},<br><br> your account for ${signUpDetails.hiringFor} has been created.<br> You can log in to the earlyjobs.in portal using the below credentials. <br> Your hiring manager is ${assignHMDetails.username} and the contact number is ${assignHMDetails.phone}. Please contact for the further process. <br><br> Login Email : ${signUpDetails.email}<br> Login Password: ${signUpDetails.password}<br><br> This Email contains confidential information about your account, so don't forward this mail to anyone.<br> If you received this email by mistake or without your concern contact hr@ealryjobs.in team immediately.<br><br> Thank you,<br> Regards,<br> earlyjobs.in team`
        } else {
            emailContent = `Hi ${signUpDetails.username},<br><br> your account for ${signUpDetails.hiringFor} has been created.<br> You can log in to the earlyjobs.in portal using the below credentials.<br><br> Login Email : ${signUpDetails.email}<br> Login Password: ${signUpDetails.password}<br><br> This Email contains confidential information about your account, so don't forward this mail to anyone.<br> If you received this email by mistake or without your concern contact hr@ealryjobs.in team immediately.<br><br> Thank you,<br> Regards,<br> earlyjobs.in team`
        }
        const encodedContent = encodeURIComponent(emailContent)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'EarlyJobs Signup',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Successfully created an account as a ${signUpDetails.hiringFor} in Earlyjobs.in portal`,
            recipients: `${signUpDetails.email},hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`

        const response = await fetch(url, {method: "GET", mode: "no-cors"})
        // const data = await response.json()
        if(response.ok === true) {
            // console.log(data)
        }
    }

    const getOfferLetterCount = async () => {
        const date = format(new Date(), 'yyyy-MM-dd')
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/offer-letter-count/${date}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + Cookie.get('jwt_token')
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        console.log(Object.keys(data).length === 0)
        let count = 0;
        if(response.ok === true) {
            if(Object.keys(data).length === 0) {
                count = 0
            } else {
                count = data.count.count
            }
            return count
        } else {
            setError(data.error)
            return false
        }
    }

    const updateOfferLetterCount = async () => {
        const date = format(new Date(), 'yyyy-MM-dd')
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/offer-letter-count/update/${date}`
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer ' + Cookie.get('jwt_token')
            }
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
                return false
            } else {
                setError("")
                console.log(data.message)
                return true
            }
        } else {
            setError(data.error)
            return false
        }
    }

    const uploadPdf = async (pdfFile) => {
        const result = await updateOfferLetterCount();
        if(!result) return;
        const storage = getStorage(app);
        const storageRef = ref(storage, `HROfferLetters/${signUpDetails.username}_${Date()}.pdf`);
        const uploadTask = uploadBytesResumable(storageRef, pdfFile);
        let pdfURL = '';
      
        // Create a new promise to handle the upload task
        const promise = new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              console.log(error);
              reject(error);
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              pdfURL = downloadURL;
              resolve(pdfURL);
            }
          );
        });
      
        return promise;
    }; 

    const generatePDF = async () => {
        const count = await getOfferLetterCount();
        if(count === false) return;
        try {
            // Load the existing PDF
            const response = await fetch(Victaman_intern_offer_letter); // Load the PDF bytes using your preferred method
            const arrayBuffer = await response.arrayBuffer();
            const existingPdfBytes = new Uint8Array(arrayBuffer);
      
            // Load the PDF document
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
            // Modify the PDF content as needed
            // Example: Add text to the first page
            const currDate = new Date();
            const day = currDate.getDate();
            const month = currDate.getMonth() + 1;
            const year = currDate.getFullYear();
            const currDateStr = `${day < 10 ? "0"+day : day}- ${month < 10 ? "0"+month : month}- ${year}`;
            const dateRefCount = `- Vic/${format(currDate, 'yy/MMM/dd')}/${(count+1).toString()}`;
            const dateAfter3Days = addDays(currDate, 3);
            const lastJoiningDate = format(dateAfter3Days, 'MMMM dd, yyyy');
            const pdfDate = pdfDoc.getPages()[0];
            pdfDate.drawText(currDateStr, {
                x: 82, 
                y: 743,
                size: 10,
            });
            const pdfRef = pdfDoc.getPages()[0];
            pdfRef.drawText(dateRefCount, {
                x: 472, 
                y: 743,
                size: 10.5,
            });
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
            const pdfName = pdfDoc.getPages()[0];
            pdfName.drawText(signUpDetails.username, { 
                x: 81,
                y: 717,
                size: 12,
                font: timesRomanFont,
            });
            const pdfAddress = pdfDoc.getPages()[0];
            pdfAddress.drawText(signUpDetails.location, { 
                x: 92, 
                y: 703,
                size: 12,
                font: timesRomanFont,
            });
            const pdfJoiningDate = pdfDoc.getPages()[0];
            pdfJoiningDate.drawText(`${lastJoiningDate}`, { 
                x: 430, 
                y: 603,
                size: 11,
            });
      
            // Save the modified PDF
            const modifiedPdfBytes = await pdfDoc.save();
      
            // Perform further actions (e.g., send the modified PDF to the server, download, etc.)
            console.log('PDF Modified:', modifiedPdfBytes);
            
            try {
                const pdfURL = await uploadPdf(modifiedPdfBytes);
                // setSignUpDetails({ ...signUpDetails, resumeUrl: pdfURL })
                // return modifiedPdfBytes;
                return pdfURL;
            } catch (error) {
                console.error('Error uploading PDF:', error);
            }

          } catch (error) {
            console.error('Error modifying PDF:', error);
          }
    }

    const onClickCreate = async (close) => {
        let pdfURL = '';
        if(signUpDetails.role === 'HR' && signUpDetails.hiringFor === 'Intern HR Recruiter') {
            pdfURL = await generatePDF();
            if(!pdfURL) return;
        }
        if(signUpDetails.role !== 'HR') {
            setSignUpDetails({ ...signUpDetails, location: 'TBF' })
        }
        console.log(signUpDetails)
        // return
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(signUpDetails.role === "") {
            setError('*Role is required')
            return
        }
        if(signUpDetails.username.trim() === "") {
            setError('*Username is required')
            return
        }
        if(regex.test(signUpDetails.email) === false) {
            setError('*Valid Email is required')
            return
        }
        if(signUpDetails.phone.length < 10 || signUpDetails.phone.length > 10) {
            setError('*Valid Phone Number is required')
            return
        }
        if(signUpDetails.hiringFor === "" && signUpDetails.role === 'HR') {
            setError('*Hiring For is required')
            return
        }
        if(signUpDetails.location === "" && signUpDetails.role === 'HR') {
            setError('*Location is required')
            return
        }
        if(signUpDetails.assignHM === "" && signUpDetails.role === 'HR') {
            setError('*Assign Hiring Manager is required')
            return
        }
        if(signUpDetails.hiringCategory.length === 0) {
            setError('*Select atleast one hiring category')
            return
        }
        setError('')
        
        let updatedSignUpDetails = signUpDetails
        if(signUpDetails.role === "AGENCY" || signUpDetails.role === "COLLEGE") {
            updatedSignUpDetails = { ...signUpDetails, role: 'AC', hiringFor: 'Fulltime Hiring Manager', hmType: '' }
        }
        if(signUpDetails.role === "AGENCY") {
            updatedSignUpDetails = { ...updatedSignUpDetails, docId: "AGY", hmType: 'AGY' }
        }
        if(signUpDetails.role === "COLLEGE") {
            updatedSignUpDetails = { ...updatedSignUpDetails, docId: "CLG", hmType: 'CLG'}
        }
        console.log(updatedSignUpDetails)
        setCreateStatus(true)
        
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const url = `${backendUrl}/api/users/register`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.get('jwt_token')
            },
            body: JSON.stringify({...updatedSignUpDetails, resumeUrl: pdfURL})
        }
        const response = await fetch(url, options) // create account in DB
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else {
                close()
                sendEmail()
                alert(data.success)
                setSignUpDetails({
                    docId: "TBF",
                    username: "",
                    email: "",
                    phone: "",
                    password: uuid().slice(0, 8),
                    role: '',
                    hiringFor: 'Fulltime Hiring Manager',
                    location: 'TBF',
                    assignHM: '',
                    hiringCategory: signUpDetails.hiringCategory,
                })
            }
        }
        setCreateStatus(false)
    }

    const renderCreateUserPopup = (close) => {
        
        return (
            <div className="modal-form">
                <button className="modal-close-button" style={{right: '10px', top: '10px'}} disabled={createStatus} onClick={close}>
                    &times;
                </button>
                <label className="homepage-label">Create new account for {signUpDetails.role === 'AC' ? "Hiring Manager" : signUpDetails.role === 'HR' ? "HR Recruiter" : signUpDetails.role === 'BDE' ? "BDE" : signUpDetails.role === "ADMIN" ? "Admin" : "User type"}</label>
                <label className="homepage-label">Credentials will be sent to {signUpDetails.email}</label>
                <label className="homepage-label" style={{marginTop: "10px"}}>User Type (Role)</label>
                <select className="homepage-input" id="role" name="role" required value={signUpDetails.role} onChange={handleInputChange} >
                    <option value="">select</option>
                    <option value="AC">Hiring Manager</option>
                    <option value="HR">HR Recruiter</option>
                    <option value="ADMIN">Admin</option>
                    <option value="BDE">BDE</option>
                    <option value="COLLEGE">College</option>
                    <option value="AGENCY">Agency</option>
                </select>
                <label className="homepage-label">{signUpDetails.role === 'AGENCY' ? 'Agency Name' : signUpDetails.role === 'COLLEGE' ? "College Name" : "Username"}</label>
                <input className="homepage-input" type="text" required name="username" value={signUpDetails.username} onChange={handleInputChange} />
                <label className="homepage-label">Login Email</label>
                <input className="homepage-input" type="text" name="email" value={signUpDetails.email} onChange={handleInputChange} />
                <label className="homepage-label">{(signUpDetails.role === 'AGENCY' || signUpDetails.role === 'COLLEGE') ? 'Office Phone' : "Phone"}</label>
                <input className="homepage-input" type="number" required name="phone" value={signUpDetails.phone} onChange={handleInputChange} />
                <label className="homepage-label">Login Password</label>
                <input className="homepage-input" type="text" disabled value={signUpDetails.password} />

                {/* <label className="homepage-label" htmlFor="location">Location</label>
                <input className="homepage-input" type="text" id="location" required name="location" value={signUpDetails.location} onChange={handleInputChange} />
                <label className="homepage-label" htmlFor="hiringCTC">Hiring CTC</label>
                <input className="homepage-input" type="number" id="hiringCTC" required name="hiringCTC" value={signUpDetails.hiringCTC} onChange={handleInputChange} /> */}
                
                {/* <label className="homepage-label" htmlFor="hiringFor">Hiring For</label>
                <select className="homepage-input" id="hiringFor" name="hiringFor" required value={signUpDetails.hiringFor} onChange={handleInputChange} >
                    <option value="">select</option>
                    <option value="Freelance HR Recruiter">Freelance HR Recruiter</option>
                    <option value="Intern HR Recruiter">Intern HR Recruiter</option> 
                    <option value="Fulltime HR Recruiter">Fulltime HR Recruiter</option> 
                </select> */}
                {
                    signUpDetails.role === 'HR' && (
                    <>
                        <label className="homepage-label" htmlFor="hiringFor">Hiring For</label>
                        <select className="homepage-input" id="hiringFor" name="hiringFor" required value={signUpDetails.hiringFor} onChange={handleInputChange} >
                            <option value="">select</option>
                            <option value="Fulltime HR Recruiter">Fulltime HR Recruiter</option>
                            <option value="Freelance HR Recruiter">Freelance HR Recruiter</option>
                            <option value="Intern HR Recruiter">Intern HR Recruiter</option>
                        </select>
                        <label className="homepage-label" htmlFor="assignHM">Assign Hiring Manager</label>
                        <select className="homepage-input" id="assignHM" name="assignHM" required value={signUpDetails.assignHM} onChange={handleInputChange} >
                            <option value="">select</option>
                            {
                                hiringManagersList.map((hm) => (
                                    <option key={hm.email} value={hm.email}>{hm.username} - {hm.phone}</option>
                                ))
                            }
                        </select>
                        <label className="homepage-label" htmlFor="location">Address</label>
                        <input className="homepage-input" type="text" id="location" required name="location" value={signUpDetails.location} onChange={handleInputChange} />
                    </>
                    )
                }

                <label className="homepage-label" htmlFor="hiringCategory">Hiring Category</label>
                <div className='hr-input-list-con'>
                    {
                        signUpDetails.hiringCategory.map((category, index) => (
                            <div className='hr-input-list' key={index}>
                                <p className='hr-input-list-item'>{category}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleCategoryRemove(index, category)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <select className="homepage-input" id="hiringCategory" name="hiringCategory" required onChange={handleAddCategory} >
                    <option value="">select</option>
                    {
                        hiringCategoryOptions.map((category) => (
                            <option key={category.value} value={category.value}>{category.label}</option>
                        ))
                    }
                </select>
                {error && <p className="error-message">{error}</p>}
                <div className='achieve-button-con create-user-btn-con'>
                    <button className='job-details-upload-candidate-button' disabled={createStatus} onClick={() => onClickCreate(close)}>CREATE</button>
                    <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={createStatus} onClick={close}>CANCEL</button>
                </div>
            </div>
        )
    }

    const token = Cookies.get('role')
    if (token !== 'ADMIN') {
        return <Redirect to='/' />
    }

    return (
        <div className='homepage-container'>
            {/* <NavBar /> */}
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
                            <Link to='/admin/recruiter-requests' className="admin-link">
                                <FaFileCircleQuestion className='admin-icon' />
                                <p className="button-text">Recruiter Requests </p>
                            </Link>
                        </button>

                        {/* <button className='admin-btn'>
                            <div className="admin-link">
                                <FaUserPlus className='admin-icon' />
                                <p className="button-text"> Signup New User </p>
                            </div>
                        </button> */}

                        <Popup
                            trigger={
                            <button className='admin-btn'>
                                <div className="admin-link">
                                    <FaUserPlus className='admin-icon' />
                                    <p className="button-text"> Signup New User </p>
                                </div>
                            </button>
                            }
                            modal
                        >
                            {close => (
                            <div className="modal create-user-modal overflow-modal">
                                
                                {renderCreateUserPopup(close)}
                            </div>
                            )}
                        </Popup>
                    </div>
                </div>
                <div className='admin-page-image-bg'>
                    <img src='/admin-bg.jpg' alt='admin vector' className='admin-image' />
                </div>
            </div>
            
            {/* <Footer /> */}
        </div>
    )
}

export default AdminPage