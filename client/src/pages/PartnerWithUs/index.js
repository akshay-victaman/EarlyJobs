import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import './style.css'

const PartnerWithUs = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        currentlyWorking: 'yes',
        orgName: '',
        name: '',
        email: '',
        phone: '',
        resume: '',
        linkedIn: ''
    })

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
        let resumeUrl = ''
        if(formData.resume !== "") {
            resumeUrl = await uploadPdf(formData.resume)
        }
        setFormData({
            ...formData, resume: resumeUrl
        })
        await sendEmail(resumeUrl)

        setFormData({
            currentlyWorking: 'yes',
            orgName: '',
            name: '',
            email: '',
            phone: '',
            resume: '',
            linkedIn: ''
        })

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
            <button type="submit" className='partner-submit-button' >Submit</button>
        </form>
    )

    return (
        <div className="partner-with-us-con">
            <h1 className='partner-heading'>Partner with us</h1>
            {success ? renderSuccess() : renderForm()}
        </div>
    )
}

export default PartnerWithUs