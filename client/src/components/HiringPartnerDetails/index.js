import { useParams, useHistory } from "react-router-dom"
import Popup from 'reactjs-popup';
import {v4 as uuid} from 'uuid'
import { useEffect, useState } from "react"
import { IoIosClose } from "react-icons/io";
import emailjs from '@emailjs/browser';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import app from "../../firebase"
import NavBar from "../NavBar"
import './style.css'
import Footer from "../Footer";
import Cookie from "js-cookie";
import ScrollUp from "../ScrollUp";


let hiringCategoryOptions = [
    { value: 'BPO', label: 'BPO' },
    { value: 'IT', label: 'IT' },
    { value: 'Banking', label: 'Banking' },
    { value: 'Insurance', label: 'Insurance' },
    { value: 'Industry', label: 'Industry' },
    { value: 'Others', label: 'Others' }
];

const HiringPartnerDetails = () => {

    const [hiringPartnerReqDetails, setHiringPartnerReqDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [rejectApproveStatus, setRejectApproveStatus] = useState(false)
    const [error, setError] = useState('')
    const { id } = useParams()
    const history = useHistory()
    const [signUpDetails, setSignUpDetails] = useState({
        docId: id,
        username: "",
        email: "",
        phone: "",
        password: uuid().slice(0, 8),
        role: 'HR',
        hiringFor: '',
        location: '',
        hiringCategory: [],
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
                location: hiringPartnerReqDetails.formData.personalDetails.currAddress,
                phone: hiringPartnerReqDetails.formData.personalDetails.phone
            })
        }
    }, [hiringPartnerReqDetails])

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

    const onClickReject = async () => {
        setRejectApproveStatus(true)
        const db = getFirestore(app);
        const docRef = await addDoc(collection(db, "RejectedHiringPartnerReq"), { hiringPartnerReqDetails });
        const docId = docRef.id;
        const RejectedDate = new Date();
        await setDoc(doc(db, "RejectedHiringPartnerReq", docId), { formData: {...hiringPartnerReqDetails.formData, RejectedDate, docId} });

        await deleteDoc(doc(db, "HiringPartnerRequests", id));
        history.replace('/admin/hiring-partner-requests')
        setRejectApproveStatus(false)
    }

    const sendEmail = (formData) => {
        const hiringCategory = signUpDetails.hiringCategory.join(', ')
        const formData1 = {...formData, hiringCategory}

        emailjs.send('service_fnv4y5p', 'template_op0us5b', formData1, 'KzUehMbovr5UfqKRr')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
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

        if(signUpDetails.hiringCategory === "" || signUpDetails.hiringFor === "") {
            setError("All fields are required")
            return
        }

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
            body: JSON.stringify(signUpDetails)
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
                    history.replace('/admin/hiring-partner-requests') // redirect to hiring partner requests page
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
                <label className="homepage-label">Login Email</label>
                <input className="homepage-input" type="text" disabled value={signUpDetails.email} />
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
                <p className="error-message">{error}</p>
                <div className='achieve-button-con'>
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
                        <p className="hiring-partner-value">{personalDetails.currAddress}a</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Permanent Address:</p>
                        <p className="hiring-partner-value">{personalDetails.permAddress}</p>
                    </div>
                    <div className="hiring-partner-details-con">
                        <p className="hiring-partner-label">Languages:</p>
                        <p className="hiring-partner-value">
                            {personalDetails.languages.map((language) => language.value).join(', ')}
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
                        <div className="modal">
                            
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
            <NavBar />
            <div className="job-details-container hrp-details-con">
                <h1 className='hiring-partner-req-heading'>Hiring Partner Details</h1>
                {
                    loading ? <h1>Loading...</h1> : renderHiringPartnerReqDetails()
                }
            </div>
            <ScrollUp />
            <Footer />
        </div>
    )
}

export default HiringPartnerDetails