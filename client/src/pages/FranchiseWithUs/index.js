import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'

const FranchiseWithUs = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        franchiseLocation: '',
        expectation: '',
        previousBusiness: '',
        plRole: '',
        fullTime: '',
        b2bExp: '',
        HrExp: '',
        teamExp: '',
        officeSetup: '',
        finance: '',
        name: '',
        email: '',
        phone: '',
        resume: '',
        linkedIn: ''
    })

    useEffect(() => {
        window.scrollTo(0, 0)
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
            <p><strong>Franchise location:</strong> ${formData.franchiseLocation}</p>
            <p><strong>Expectation:</strong> ${formData.expectation}</p>
            <p><strong>Previous business:</strong> ${formData.previousBusiness}</p>
            <p><strong>P&L role:</strong> ${formData.plRole}</p>
            <p><strong>Full time:</strong> ${formData.fullTime}</p>
            <p><strong>B2B experience:</strong> ${formData.b2bExp}</p>
            <p><strong>HR experience:</strong> ${formData.HrExp}</p>
            <p><strong>Team management experience:</strong> ${formData.teamExp}</p>
            <p><strong>Office setup:</strong> ${formData.officeSetup}</p>
            <p><strong>Financial resources:</strong> ${formData.finance}</p>
            <h2>Contact details</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
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
            name: 'Franchise with us request',
            fromEmailId: 'no-reply@earlyjobs.in',
            subject: `New Franchise request from ${formData.name}`,
            recipients: `hr@earlyjobs.in,no-reply@earlyjobs.in`,
            content: encodedContent,
            replyToEmailID: 'no-reply@earlyjobs.in'
        }
        const url = `https://enterprise.webaroo.com/GatewayAPI/rest?method=${queryParameters.method}&userid=${queryParameters.userid}&password=${queryParameters.password}&v=${queryParameters.v}&content_type=${queryParameters.contentType}&name=${queryParameters.name}&fromEmailId=${queryParameters.fromEmailId}&subject=${queryParameters.subject}&recipients=${queryParameters.recipients}&content=${queryParameters.content}&replyToEmailID=${queryParameters.replyToEmailID}`
    
        await fetch(url, {method: "GET", mode: "no-cors"})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (formData.franchiseLocation === '') {
            setError('Please enter the location you are planning to own up a franchisee for')
            return
        } else if (formData.expectation === '') {
            setError('Please enter your expectation out of this partnership')
            return
        } else if (formData.previousBusiness === '') {
            setError('Please enter if you are currently running a business or ever ran a business')
            return
        } else if (formData.plRole === '') {
            setError('Please enter if you have handled a P&L role in your career')
            return
        } else if (formData.fullTime === '') {
            setError('Please enter if you would manage it on a full time basis')
            return
        } else if (formData.b2bExp === '') {
            setError('Please enter if you have any B2B sales experience')
            return
        } else if (formData.HrExp === '') {
            setError('Please enter if you have any form of experience in HR')
            return
        } else if (formData.teamExp === '') {
            setError('Please enter your experience of managing a team currently or in the past')
            return
        } else if (formData.officeSetup === '') {
            setError('Please enter if you are willing to take an office / few seats in a business centre & recruit few people to start this business')
            return
        } else if (formData.finance === '') {
            setError('Please enter if you have enough financial resources to sustain till you break-even')
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

        setFormData({
            franchiseLocation: '',
            expectation: '',
            previousBusiness: '',
            plRole: '',
            fullTime: '',
            b2bExp: '',
            HrExp: '',
            teamExp: '',
            officeSetup: '',
            finance: '',
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
                <label htmlFor="franchiseLocation" className='partner-label'>Location, you are planning to own up a franchisee for <span className='partner-required'> *</span></label>
                <input
                    type="text"
                    name="franchiseLocation"
                    id="franchiseLocation"
                    placeholder='Enter Franchise location'
                    value={formData.franchiseLocation}
                    onChange={handleChange}
                    className='partner-input'
                />
            </div>
            <div className="form-group">
                <label htmlFor="expectation" className='partner-label'>Your expectation out of this partnership. <span className='partner-required'> *</span></label>
                <textarea
                    name="expectation"
                    id="expectation"
                    placeholder='Enter your expectation'
                    value={formData.expectation}
                    onChange={handleChange}
                    className='partner-textarea'
                />
            </div>
            <div className="form-group">
                <label htmlFor="previousBusiness" className='partner-label'>Are you currently running a business or ever ran a business? Please elaborate. <span className='partner-required'> *</span></label>
                <textarea
                    name="previousBusiness"
                    id="previousBusiness"
                    placeholder='Enter your business details'
                    value={formData.previousBusiness}
                    onChange={handleChange}
                    className='partner-textarea'
                />
            </div>
            <div className="form-group">
                <label htmlFor="plRole" className='partner-label'>Please elaborate if you have handled a P&L role in your career. <span className='partner-required'> *</span></label>
                <textarea
                    name="plRole"
                    id="plRole"
                    placeholder='Enter your P&L role details'
                    value={formData.plRole}
                    onChange={handleChange}
                    className='partner-textarea'
                />
            </div>
            <div className="form-group">
                <label htmlFor="fullTime" className='partner-label'>If you become a EarlyJobs partner, would you manage it on a full time basis? <span className='partner-required'> *</span></label>
                <select name="fullTime" id="fullTime" className='partner-input' value={formData.fullTime} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="b2bExp" className='partner-label'>Please elaborate if you have any B2B sales experience. <span className='partner-required'> *</span></label>
                <textarea
                    name="b2bExp"
                    id="b2bExp"
                    placeholder='Enter your B2B sales experience'
                    value={formData.b2bExp}
                    onChange={handleChange}
                    className='partner-textarea'
                />
            </div>
            <div className="form-group">
                <label htmlFor="HrExp" className='partner-label'>Please elaborate if you have any form of experience in HR (internal HR) or HR services (staffing/consulting/ recruitment)? <span className='partner-required'> *</span></label>
                <textarea
                    name="HrExp"
                    id="HrExp"
                    placeholder='Enter your HR experience'
                    value={formData.HrExp}
                    onChange={handleChange}
                    className='partner-textarea'
                />
            </div>
            <div className="form-group">
                <label htmlFor="teamExp" className='partner-label'>Please elaborate your experience of managing a team currently or in the past. <span className='partner-required'> *</span></label>
                <textarea
                    name="teamExp"
                    id="teamExp"
                    placeholder='Enter your team management experience'
                    value={formData.teamExp}
                    onChange={handleChange}
                    className='partner-textarea'
                />
            </div>
            <div className="form-group">
                <label htmlFor="officeSetup" className='partner-label'>Are you willing to take an office / few seats in a business centre & recruit few people to start this business? <span className='partner-required'> *</span></label>
                <select name="officeSetup" id="officeSetup" className='partner-input' value={formData.officeSetup} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="finance" className='partner-label'>Do you have enough financial resources to sustain till you break-even (typically 6 months) <span className='partner-required'> *</span></label>
                <textarea
                    name="finance"
                    id="finance"
                    placeholder='Enter your financial resources'
                    value={formData.finance}
                    onChange={handleChange}
                    className='partner-textarea'
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
            <h1 className='partner-heading'>Franchise with us</h1>
            {success ? renderSuccess() : renderForm()}
        </div>
    )
}

export default FranchiseWithUs