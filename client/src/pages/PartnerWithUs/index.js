import { useState, useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { Oval } from 'react-loader-spinner';
import app from '../../firebase'
import './style.css'
import FormsFaqs from '../../components/FormsFaqs';
import { metaConstants } from '../../utils/metaConstants';


const servicePageAccordianData = [
    {
        label: 'How does EarlyJobs match candidates with job opportunities?',
        content: 'EarlyJobs uses a combination of advanced algorithms and personalized assessments to match candidates with job opportunities that align with their skills, experience, and career goals. Our team also conducts thorough interviews to ensure a good fit.'
    },
    {
        label: 'What industries does EarlyJobs specialize in?',
        content: 'EarlyJobs specializes in a wide range of industries including technology, BPO, finance, marketing, engineering, and more. Our diverse network allows us to cater to various sectors and provide specialized recruitment services.'
    },
    {
        label: 'What is the process for employers to start working with EarlyJobs?',
        content: 'Employers can start working with EarlyJobs by contacting our team through our website or directly reaching out to our sales department. We will discuss your hiring needs, provide a customized recruitment plan, and begin sourcing and screening candidates.'
    },
    {
        label: 'How does EarlyJobs ensure the quality of candidates?',
        content: 'EarlyJobs ensures the quality of candidates through a rigorous screening process that includes background checks, skills assessments, and in-depth interviews. We also consider cultural fit to ensure candidates will thrive in their new roles.'
    },
    {
        label: 'Is there a fee for candidates to use EarlyJobs services?',
        content: 'No, EarlyJobs does not charge candidates for using our recruitment services. Our fees are covered by the employers seeking to hire through our platform, allowing us to offer our services to job seekers at no cost.'
    },
];

const PartnerWithUs = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        currentlyWorking: 'yes',
        orgName: '',
        name: '',
        email: '',
        phone: '',
        resume: '',
        linkedIn: ''
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = metaConstants.partnerWithUs.title

        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const metaSubject = document.querySelector('meta[name="subject"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.partnerWithUs.description);
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.partnerWithUs.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.partnerWithUs.description);
        }

        return () => {
            document.title = metaConstants.title
            if (metaDescription) {
                metaDescription.setAttribute('content', metaConstants.description); // Replace with the original content if needed
            }
            if (metaKeywords) {
                metaKeywords.setAttribute('content', metaConstants.keywords);
            }
            if (metaSubject) {
                metaSubject.setAttribute('content', metaConstants.description);
            }
        };
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleFileChange = (e) => {
        const { files } = e.target
        if (!files.length) {
            return
        }
        setFormData({
            ...formData,
            resume: files[0]
        })
    }

    const uploadPdf = async (pdfFile) => {
        const storage = getStorage(app);
        const storageRef = ref(storage, `PartnerResume/${formData.resume}_${Date()}.pdf`);
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

    const sendEmail = async (resumeUrl) => {
        const message = `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Currently working:</strong> ${formData.currentlyWorking}</p>
            <p><strong>Organization name:</strong> ${formData.orgName}</p>
            <p><strong>LinkedIn profile:</strong> ${formData.linkedIn}</p>
            <p><strong>Resume URL:</strong> ${resumeUrl}</p>
        `
        const encodedContent = encodeURIComponent(message)
        const queryParameters = {
            method: 'EMS_POST_CAMPAIGN',
            userid: '2000702445',
            password: 'LEP9yt',
            v: '1.1',
            contentType: 'text/html',
            name: 'Partner with us request',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `New partner request from ${formData.name}`,
            recipients: `hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`
    
        await fetch(url, {method: "GET", mode: "no-cors"})
    } 

     const saveToFirestore = async (resumeUrl) => {
        const db = getFirestore(app);
        try {
            await addDoc(collection(db, 'PartnerWithUs'), {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                currentlyWorking: formData.currentlyWorking,
                orgName: formData.orgName,
                linkedIn: formData.linkedIn,
                resumeUrl: resumeUrl,
                createdAt: new Date()
            });
            console.log('Data saved to Firestore successfully!');
        } catch (error) {
            console.error('Error saving data to Firestore: ', error);
            setError('Failed to save your details. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (formData.currentlyWorking === 'yes' && formData.orgName === '') {
            setError('Please enter your organization name')
            return
        } else if (formData.name === '') {
            setError('Please enter your name')
            return
        } else if (formData.email === '' || !emailRegex.test(formData.email)) {
            setError('Please enter a valid email address')
            return
        } else if (formData.phone.length !== 10) {
            setError('Please enter a valid contact number')
            return
        } else if (formData.resume === "" && (formData.linkedIn === '' || !formData.linkedIn.startsWith('http'))) {
            setError('Please attach your resume or enter your LinkedIn profile URL')
            return
        }
        setError('')
        setLoading(true)
        let resumeUrl = ''
        if(formData.resume !== "") {
            resumeUrl = await uploadPdf(formData.resume)
        }
        setFormData({
            ...formData, resume: resumeUrl
        })
        await sendEmail(resumeUrl)
        await saveToFirestore(resumeUrl); // Save data to Firestore

        setFormData({
            currentlyWorking: 'yes',
            orgName: '',
            name: '',
            email: '',
            phone: '',
            resume: '',
            linkedIn: ''
        })
        setLoading(false)
        setSuccess(true)
    }

    const renderSuccess = () => {
        return (
            <div className='partner-success'>
                <p className='success-message'>Thank you for reaching out to us. We will get back to you soon.</p>
            </div>
        )
    }

    const renderForm = () => (
        <form className='partner-with-us-form' onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="currentlyWorking" className='partner-label'>Are you currently working? <span className='partner-required'> *</span></label>
                <select name="currentlyWorking" id="currentlyWorking" className='partner-input' value={formData.currentlyWorking} onChange={handleChange}>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="orgName" className='partner-label'>If yes, your current organization's name <span className='partner-required'> *</span></label>
                <input
                    type="text"
                    name="orgName"
                    id="orgName"
                    placeholder='Enter your organization name'
                    value={formData.orgName}
                    onChange={handleChange}
                    className={formData.currentlyWorking === 'yes' ? 'partner-input' : 'partner-input partner-input-disabled'}
                    disabled={formData.currentlyWorking === 'no'}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name" className='partner-label'>Please enter your name <span className='partner-required'> *</span></label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder='Enter your name'
                    value={formData.name}
                    onChange={handleChange}
                    className='partner-input'
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" className='partner-label'>Please enter your Email ID <span className='partner-required'> *</span></label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={handleChange}
                    className='partner-input'
                />
            </div>
            <div className="form-group">
                <label htmlFor="phone" className='partner-label'>Please enter your Contact number <span className='partner-required'> *</span></label>
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder='Enter your contact number'
                    value={formData.phone}
                    onChange={handleChange}
                    className='partner-input'
                />
            </div>
            <div className="form-group">
                <label htmlFor="resume" className='partner-label'>Please attach your Resume/LinkedIn profile for us to get in touch with you. <span className='partner-required'> *</span></label>
                <input
                    type="file"
                    name="resume"
                    id="resume"
                    onChange={handleFileChange}
                    className='partner-input'
                />
                <label htmlFor="resume" className='partner-file-label'>{formData.resume !== "" ? formData.resume.name : "SELECT RESUME"}</label>

                <label htmlFor="linkedIn" style={{textAlign: "center", marginBottom: "10px"}} className='partner-label'>OR</label>

                <input
                    type="text"
                    placeholder='LinkedIn Profile URL'
                    name="linkedIn"
                    id="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className='partner-input'
                />
            </div>
            {error && <p className='partner-error'>{error}</p>}
            <button type="submit" disabled={loading} className='partner-submit-button' >
                {loading ? 
                    <Oval
                        height={20}
                        width={20}
                        color="#ffffff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#ffffff"
                        strokeWidth={3}
                        strokeWidthSecondary={3}
                    />
                    :
                    "Send"
                }
            </button>
            <h2 className='partner-disclaimer'>Disclaimer</h2>
            <p className='partner-disclaimer-text'>*You are authorising EarlyJobs HR to contact you on the above details. Your details will not be shared with anyone outside EarlyJobs HR.</p>
        </form>
    )

    return (
        <div className="partner-with-us-con">
            <h1 className='partner-heading'>Partner with us</h1>
            <div className='bde-sub-container'>
                <div className='bde-content-con'>
                    <h2 className='bde-sub-heading'>Fill the form below to become a partner</h2>
                    <p className='bde-sub-text'>Please fill all the required fields to become a partner</p>
                    <FormsFaqs accordionData={servicePageAccordianData} />
                </div>
                <div className='bde-form-con'>
                    {success ? renderSuccess() : renderForm()}
                </div>
            </div>
        </div>
    )
}

export default PartnerWithUs