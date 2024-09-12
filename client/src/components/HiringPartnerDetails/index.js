import { useParams, useHistory } from "react-router-dom"
import Popup from 'reactjs-popup';
import {v4 as uuid} from 'uuid'
import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io";
import {addDays, format} from 'date-fns'
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import './style.css'
import Cookie from "js-cookie";
import Victaman_intern_offer_letter from "../../assets/Victaman_intern_offer_letter.pdf"


let hiringCategoryOptions = [
    { value: 'BPO', label: 'BPO' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Aviation', label: 'Aviation' },
    { value: 'Oil And Gas', label: 'Oil And Gas' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Education', label: 'Education' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Consumer Goods', label: 'Consumer Goods' },
    { value: 'Health Care', label: 'Health Care' },
    { value: 'ITES', label: 'ITES' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Textile', label: 'Textile' },
    { value: 'Media and news', label: 'Media and news' },
    { value: 'Food processing', label: 'Food processing' },
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Law', label: 'Law' },
    { value: 'Advertising', label: 'Advertising' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Other', label: 'Other' },
];

const HiringPartnerDetails = () => {

    const [hiringPartnerReqDetails, setHiringPartnerReqDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [rejectApproveStatus, setRejectApproveStatus] = useState(false)
    const [error, setError] = useState('')
    const { id } = useParams()
    const history = useHistory()
    const [hiringManagersList, setHiringManagersList] = useState([])
    const [signUpDetails, setSignUpDetails] = useState({
        docId: id,
        username: "",
        gender: "",
        email: "",
        phone: "",
        password: uuid().slice(0, 8),
        role: 'HR',
        hiringFor: '',
        assignHM: '',
        location: '',
        hiringCategory: [],
        resumeUrl: ''
    })

    useEffect(() => {
        const getHiringPartnerReqList = async () => {
            const db = getFirestore(app);
            const queryRef = query(
                collection(db, "HiringPartnerRequests"),
                where("formData.docId", "==", id)
            );

            const querySnap = await getDocs(queryRef);

            if (!querySnap.empty) {
                const documents = querySnap.docs.map((doc) => doc.data());
                setHiringPartnerReqDetails(documents[0])
                console.log(documents[0])
                
            } else {
                console.log("No such documents!");
                return;
            }
            setLoading(false)
        }
        getHiringPartnerReqList()
    }, [id])

    useEffect(() => {
        if(hiringPartnerReqDetails.formData) {
            setSignUpDetails({
                ...signUpDetails, 
                username: hiringPartnerReqDetails.formData.personalDetails.fullName, 
                email: hiringPartnerReqDetails.formData.personalDetails.email, 
                location: hiringPartnerReqDetails.formData.personalDetails.currAddress ? hiringPartnerReqDetails.formData.personalDetails.currAddress : `${hiringPartnerReqDetails.formData.personalDetails.currBuildingNo}, ${hiringPartnerReqDetails.formData.personalDetails.currStreet}, ${hiringPartnerReqDetails.formData.personalDetails.currArea}, ${hiringPartnerReqDetails.formData.personalDetails.currCity}, ${hiringPartnerReqDetails.formData.personalDetails.currState}, ${hiringPartnerReqDetails.formData.personalDetails.currPin}`,
                phone: hiringPartnerReqDetails.formData.personalDetails.phone,
                hiringFor: hiringPartnerReqDetails.formData.personalDetails.applyFor,
                gender: hiringPartnerReqDetails.formData.personalDetails.gender
            })
        }
    }, [hiringPartnerReqDetails])

    useEffect(() => {
        fetchHiringManagers();
    }, [])

    const fetchHiringManagers = async () => {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/users/all/hms`
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
        if(response.ok === true) {
            setHiringManagersList(data)
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

    const sendRejectionMail = async () => {
        const content = `Hi ${signUpDetails.username}, <br><br> We are sorry to inform you that your application for ${signUpDetails.hiringFor} has been rejected. <br> If you have any queries, please contact hr@earlyjobs.in team. <br><br> Thank you,<br> Regards,<br> earlyjobs.in team`
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'EarlyJobs Application Update',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Status of your application as a ${signUpDetails.hiringFor} in Earlyjobs`,
            recipients: `${signUpDetails.email},hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodeURIComponent(content),
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        console.log(queryParameters)
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}&attachment1=${queryParameters.attachment1}`

        const response = await fetch(url, {method: "GET", mode: "no-cors"})
        // const data = await response.json()
        if(response.ok === true) {
            // console.log(data)
        }
    };

    const onClickReject = async () => {
        setRejectApproveStatus(true)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "RejectedHiringPartnerReq"), { hiringPartnerReqDetails });
        const docId = docRef.id;
        const RejectedDate = new Date();
        await setDoc(doc(db, "RejectedHiringPartnerReq", docId), { formData: {...hiringPartnerReqDetails.formData, RejectedDate, docId} });

        await deleteDoc(doc(db, "HiringPartnerRequests", id));
        sendRejectionMail();
        history.replace('/admin/recruiter-requests')
        setRejectApproveStatus(false)
    }

    const uploadPdf = async (pdfFile) => {
        const result = await updateOfferLetterCount();
        if(!result) return;
        const storage = getStorage(app);
        const storageRef = ref(storage, `HROfferLetters/${hiringPartnerReqDetails.formData.personalDetails.fullName}_${Date()}.pdf`);
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
        console.log("count inside pdf function" ,count)
        if(count === false) return;
        console.log("triggered")
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
            const currAddress = hiringPartnerReqDetails.formData.personalDetails.currAddress ? hiringPartnerReqDetails.formData.personalDetails.currAddress : `${hiringPartnerReqDetails.formData.personalDetails.currBuildingNo}, ${hiringPartnerReqDetails.formData.personalDetails.currStreet}, ${hiringPartnerReqDetails.formData.personalDetails.currArea}, ${hiringPartnerReqDetails.formData.personalDetails.currCity}, ${hiringPartnerReqDetails.formData.personalDetails.currState}, ${hiringPartnerReqDetails.formData.personalDetails.currPin}`;
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
            pdfName.drawText(hiringPartnerReqDetails.formData.personalDetails.fullName, { 
                x: 81,
                y: 717,
                size: 12,
                font: timesRomanFont,
            });
            const pdfAddress = pdfDoc.getPages()[0];
            pdfAddress.drawText(currAddress, { 
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

    const sendEmail = async () => {
        const assignHMDetails = hiringManagersList.filter((hm) => hm.email === signUpDetails.assignHM)[0]
        const content = `Hi ${signUpDetails.username},<br><br> your application for ${signUpDetails.hiringFor} has been approved.<br> You can log in to the earlyjobs.in portal using the below credentials. <br> Your hiring manager is ${assignHMDetails.username} and the contact number is ${assignHMDetails.phone}. Please contact for the further process. <br><br> Login Email : ${signUpDetails.email}<br> Login Password: ${signUpDetails.password}<br><br> This Email contains confidential information about your account, so don't forward this mail to anyone.<br> If you received this email by mistake or without your concern contact hr@ealryjobs.in team immediately.<br><br> Thank you,<br> Regards,<br> earlyjobs.in team`
        // const pdfURL = await generatePDF();
        console.log(signUpDetails)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'EarlyJobs Application Approved',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `Successfully approved your application as a ${signUpDetails.hiringFor} in Earlyjobs.in portal`,
            recipients: `${signUpDetails.email},${hiringPartnerReqDetails.formData.personalDetails.email},hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodeURIComponent(content),
            replyToEmailID: 'no-reply@earlyjobs.in',
            // attachment1: pdfFile
        }
        console.log(queryParameters)
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}&attachment1=${queryParameters.attachment1}`

        const response = await fetch(url, {method: "GET", mode: "no-cors"})
        // const data = await response.json()
        if(response.ok === true) {
            // console.log(data)
        }
    };

    const updateDocId = async (docId, email) => {
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const url = `${backendUrl}/api/users/update-doc-id`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.get('jwt_token')
            },
            body: JSON.stringify({docId, email})
        }
        const response = await fetch(url, options) // update docId in users table in DB
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
                return false
            } else if(data.success) {
                setError("");
                return true
            }
        } else {
            setError(data.error)
            return false
        }
    }

    const addToFirebase = async () => {
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "ApprovedHiringPartners"), { hiringPartnerReqDetails }); // add hiring partner details in ApprovedHiringPartners collection
        const docId = docRef.id;
        const approvedDate = new Date();
        const isApproved = true;
        await setDoc(doc(db, "ApprovedHiringPartners", docId), { formData: {...hiringPartnerReqDetails.formData, approvedDate, isApproved, docId} }); // update docId in ApprovedHiringPartners collection
        return docId
    }

    const onClickApprove = async () => {
        console.log(signUpDetails)
        // return;
        const pdfURL = await generatePDF();
        if(signUpDetails.hiringCategory.length === 0 || signUpDetails.hiringFor === "" || signUpDetails.assignHM === "") {
            setError("All fields are required")
            return
        }
        setError("");
        setRejectApproveStatus(true)
        console.log(signUpDetails)
        const backendUrl = process.env.REACT_APP_BACKEND_API_URL
        const url = `${backendUrl}/api/users/register`
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + Cookie.get('jwt_token')
            },
            body: JSON.stringify({...signUpDetails, resumeUrl: pdfURL})
        }
        const response = await fetch(url, options) // create account in DB
        const data = await response.json()
        if(response.ok === true) {
            if(data.error) {
                setError(data.error)
            } else if(data.success) {  
                setError("");
                const docId = await addToFirebase() // if account created successfully then add user data in to firebase in ApprovedHiringPartners collection
                const db = getFirestore(app);
                if(await updateDocId(docId, signUpDetails.email)) { // update docId in users table in DB
                    await deleteDoc(doc(db, "HiringPartnerRequests", id)); // if docId updated successfully then delete the hiring partner request from HiringPartnerRequests collection from firebase
                    sendEmail();
                    history.replace('/admin/recruiter-requests') // redirect to hiring partner requests page
                    setRejectApproveStatus(false)
                }
            }
        } else {
            setError(data.error)
        }
        setRejectApproveStatus(false)
    }

    const renderRejectPopup = (close) => {
        return (
            <div className="modal-form">
                <button className="modal-close-button" disabled={rejectApproveStatus} onClick={close}>
                    &times;
                </button>
                <label className="homepage-label">Do you want to Reject {hiringPartnerReqDetails.formData.personalDetails.fullName}'s Application?</label>
                <div className='achieve-button-con'>
                    <button className='job-details-upload-candidate-button' disabled={rejectApproveStatus} onClick={() => onClickReject(close)}>YES</button>
                    <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={rejectApproveStatus} onClick={close}>NO</button>
                </div>
            </div>
        )
    }

    const renderApprovePopup = (close) => {
        
        return (
            <div className="modal-form">
                <button className="modal-close-button" disabled={rejectApproveStatus} onClick={close}>
                    &times;
                </button>
                <label className="homepage-label">Create credentials for {hiringPartnerReqDetails.formData.personalDetails.fullName}'s Application?</label>
                <label className="homepage-label">Credentials will be sent to {hiringPartnerReqDetails.formData.personalDetails.email}</label>
                <label className="homepage-label" htmlFor="email">Login Email</label>
                <input className="homepage-input" type="text" id="email" name="email" required value={signUpDetails.email} onChange={handleInputChange} />
                <label className="homepage-label">Login Password</label>
                <input className="homepage-input" type="text" disabled value={signUpDetails.password} />

                {/* <label className="homepage-label" htmlFor="location">Location</label>
                <input className="homepage-input" type="text" id="location" required name="location" value={signUpDetails.location} onChange={handleInputChange} />
                <label className="homepage-label" htmlFor="hiringCTC">Hiring CTC</label>
                <input className="homepage-input" type="number" id="hiringCTC" required name="hiringCTC" value={signUpDetails.hiringCTC} onChange={handleInputChange} /> */}
                
                <label className="homepage-label" htmlFor="hiringFor">Hiring For</label>
                <select className="homepage-input" id="hiringFor" name="hiringFor" required value={signUpDetails.hiringFor} onChange={handleInputChange} >
                    <option value="">select</option>
                    <option value="Freelance HR Recruiter">Freelance HR Recruiter</option>
                    <option value="Intern HR Recruiter">Intern HR Recruiter</option> 
                    <option value="Fulltime HR Recruiter">Fulltime HR Recruiter</option> 
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
                    <button className='job-details-upload-candidate-button' disabled={rejectApproveStatus} onClick={onClickApprove}>CREATE</button>
                    <button className='job-details-upload-candidate-button archieve-cancel-btn' disabled={rejectApproveStatus} onClick={close}>CANCEL</button>
                </div>
            </div>
        )
    }

    const renderHiringPartnerReqDetails = () => {
        const { personalDetails, qualification, about, references, newIdentityProof } = hiringPartnerReqDetails.formData
        return (
            <div className="job-details-card">
                <p className="hiring-partner-heading">Personal Details</p>
                <hr className="hiring-partner-hr" />
                <div className="hiring-partner-details-sub">
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{personalDetails.fullName}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Date of Birth:</p>
                        <p className="hiring-partner-value">{personalDetails.dob}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Gender:</p>
                        <p className="hiring-partner-value">{personalDetails.gender}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Phone Number:</p>
                        <p className="hiring-partner-value">{personalDetails.phone}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Whatsapp Number:</p>
                        <p className="hiring-partner-value">{personalDetails.wtspNum}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Email:</p>
                        <p className="hiring-partner-value">{personalDetails.email}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Current Address:</p>
                        <p className="hiring-partner-value">{personalDetails.currAddress ? personalDetails.currAddress : `${personalDetails.currBuildingNo}, ${personalDetails.currStreet}, ${personalDetails.currArea}, ${personalDetails.currCity}, ${personalDetails.currState}, ${personalDetails.currPin}`}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Permanent Address:</p>
                        <p className="hiring-partner-value">{personalDetails.permAddress ? personalDetails.permAddress : `${personalDetails.permBuildingNo}, ${personalDetails.permStreet}, ${personalDetails.permArea}, ${personalDetails.permCity}, ${personalDetails.permState}, ${personalDetails.permPin}`}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Languages:</p>
                        <p className="hiring-partner-value">
                            {
                                (typeof personalDetails.languages[0] === 'object') ? 
                                personalDetails.languages.map(language => language.value).join(', ') : 
                                personalDetails.languages.map((language) => language).join(', ')
                            }
                        </p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Apply For:</p>
                        <p className="hiring-partner-value">{personalDetails.applyFor}</p>
                    </div>
                </div>


                <p className="hiring-partner-heading">Qualification/Certification</p>
                <hr className="hiring-partner-hr" />
                <div className="hiring-partner-details-sub">
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Highest Qualification:</p>
                        <p className="hiring-partner-value">{qualification.highestQualification}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        {/* <p className="hiring-partner-label">Certifications:</p>
                        <p className="hiring-partner-value">
                            {qualification.certification.map((certification) => certification.value).join(', ')}
                        </p> */}
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Work Experience:</p>
                        <p className="hiring-partner-value">
                            {qualification.workExperience.map((workExperience) => workExperience.value).join(', ')}
                        </p>
                    </div>
                </div>

                <p className="hiring-partner-heading">About</p>
                <hr className="hiring-partner-hr" />
                <div className="hiring-partner-details-sub">
                    <p className="hiring-partner-label hrp-sub-head">Tell us about yourself?</p>
                    <p className="hiring-partner-value hrp-desc">{about.aboutYou}</p>
                    <p className="hiring-partner-label hrp-sub-head">Why you want to join us as HR Recruiter?</p>
                    <p className="hiring-partner-value hrp-desc">{about.WhyJoinUs}</p>
                    <p className="hiring-partner-label hrp-sub-head">How you can contribute to society as a recruiter?</p>
                    <p className="hiring-partner-value hrp-desc">{about.YourContribution}</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">How many hours you can contribute daily as a recruiter:</p>
                        <p className="hiring-partner-value">{about.hours} Hours</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Which category you are interested to hire:</p>
                        <p className="hiring-partner-value">
                            {about.hiringDept.map((dept) => dept).join(', ')}
                        </p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">How soon you can join:</p>
                        <p className="hiring-partner-value">{about.joiningDate} Days</p>
                    </div>
                </div>

                <p className="hiring-partner-heading">References</p>
                <hr className="hiring-partner-hr" />
                <div className="hiring-partner-details-sub">
                    <p className="hiring-partner-label hpd-label">Reference 1:</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{references.person1.name}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Contact Number:</p>
                        <p className="hiring-partner-value">{references.person1.phone}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Mail ID:</p>
                        <p className="hiring-partner-value">{references.person1.email}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Organization:</p>
                        <p className="hiring-partner-value">{references.person1.organization}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Designation:</p>
                        <p className="hiring-partner-value">{references.person1.designation}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">How they know you? :</p>
                        <p className="hiring-partner-value">{references.person1.know}</p>
                    </div>
                    <p className="hiring-partner-label hpd-label">Reference 2:</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{references.person2.name}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Contact Number:</p>
                        <p className="hiring-partner-value">{references.person2.phone}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Mail ID:</p>
                        <p className="hiring-partner-value">{references.person2.email}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Organization:</p>
                        <p className="hiring-partner-value">{references.person2.organization}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Designation:</p>
                        <p className="hiring-partner-value">{references.person2.designation}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">How they know you? :</p>
                        <p className="hiring-partner-value">{references.person2.know}</p>
                    </div>
                    <p className="hiring-partner-label hpd-label">Reference 3:</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{references.person3.name}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Contact Number:</p>
                        <p className="hiring-partner-value">{references.person3.phone}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Mail ID:</p>
                        <p className="hiring-partner-value">{references.person3.email}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Organization:</p>
                        <p className="hiring-partner-value">{references.person3.organization}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Designation:</p>
                        <p className="hiring-partner-value">{references.person3.designation}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">How they know you? :</p>
                        <p className="hiring-partner-value">{references.person3.know}</p>
                    </div>
                </div>

                <p className="hiring-partner-heading">Identification</p>
                <hr className="hiring-partner-hr" />
                <div className="hiring-partner-details-sub">
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Aadhar Number:</p>
                        <p className="hiring-partner-value">{newIdentityProof.aadharNumber}</p>
                    </div>
                    {
                        (newIdentityProof.aadharFront || newIdentityProof.aadharBack) && (
                        <div className="hiring-partner-aadhar-con">
                            <img className="hiring-partner-img" src={newIdentityProof.aadharFront} alt="aadhar-front" />
                            <img className="hiring-partner-img" src={newIdentityProof.aadharBack} alt="aadhar-back" />
                        </div>
                        )
                    }
                    
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Pan Number:</p>
                        <p className="hiring-partner-value">{newIdentityProof.panNumber}</p>
                    </div>
                    {
                        (newIdentityProof.panFront || newIdentityProof.panBack) && (
                        <div className="hiring-partner-aadhar-con">
                            <img className="hiring-partner-img" src={newIdentityProof.panFront} alt="pan-front" />
                            <img className="hiring-partner-img" src={newIdentityProof.panBack} alt="pan-back" />
                        </div>
                        )
                    }
                    
                    {
                        newIdentityProof.photo && (
                            <>
                                <p className="hiring-partner-label">Photo:</p>
                                <img className="hiring-partner-photo" src={newIdentityProof.photo} alt="user-img" />
                            </>
                        )
                    }
                    

                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Emergency Contact:</p>
                        <p className="hiring-partner-value">{newIdentityProof.emergencyNumber}</p>
                    </div>

                    <p className="hiring-partner-label details">Details of 3 Family Members:</p>
                    <p className="hiring-partner-label hpd-label">Member 1:</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member1.name}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Relationship:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member1.relationship}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Organization/Occupation:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member1.organization}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Age:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member1.age}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Dependent on you? :</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member1.dependentOnYou1}</p>
                    </div>
                    <p className="hiring-partner-label hpd-label">Member 2:</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member2.name}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Relationship:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member2.relationship}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Organization/Occupation:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member2.organization}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Age:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member2.age}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Dependent on you? :</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member2.dependentOnYou2}</p>
                    </div>
                    <p className="hiring-partner-label hpd-label">Member 3:</p>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Name:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member3.name}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Relationship:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member3.relationship}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Organization/Occupation:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member3.organization}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Age:</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member3.age}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Dependent on you? :</p>
                        <p className="hiring-partner-value">{newIdentityProof.familyMembers.member3.dependentOnYou3}</p>
                    </div>
                </div>
                <div className="hiring-partner-details-button-con">
                    <Popup
                        trigger={<button className="hiring-partner-btn reject-btn">Reject</button>}
                        modal
                    >
                        {close => (
                        <div className="modal">
                            {renderRejectPopup(close)}
                        </div>
                        )}
                    </Popup>

                    <Popup
                        trigger={<button className="hiring-partner-btn">Approve</button>}
                        modal
                    >
                        {close => (
                        <div className="modal create-user-modal">
                            
                            {renderApprovePopup(close)}
                        </div>
                        )}
                    </Popup>
                    
                </div>
            </div>
        )
    }

    

    return (
        <div className="homepage-container">
            <div className="job-details-container hrp-details-con">
                <h1 className='hiring-partner-req-heading'>Recruiter Details</h1>
                {
                    loading ? <h1>Loading...</h1> : renderHiringPartnerReqDetails()
                }
            </div>
        </div>
    )
}

export default HiringPartnerDetails