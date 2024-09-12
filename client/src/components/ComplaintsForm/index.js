import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';


const ComplaintsForm = ({handleShowComplaintsForm}) => {
  const [formState, setFormState] = useState({ subject: '', message: '', attachmentLink: ''});
  const [attachment, setAttachment] = useState(null);
  const [attachmentName, setAttachmentName] = useState('');
  const { subject, message } = formState;
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const onChangeAttachment = (event) => {
    const { files } = event.target;
    setAttachment(files[0]);
    setAttachmentName(files[0].name);
  };

  function onChange(value) {
    setCaptchaValue(value);
  }

  const uploadImage = async (file) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, 'ComplaintImages/' + file.name + new Date());
    const uploadTask = uploadBytesResumable(storageRef, file);
    let imageURL = "";
  
    // Create a new promise to handle the upload task
    const promise = new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
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
            imageURL = downloadURL;
            resolve(imageURL);
            }
        );
        });
    
        // Wait for the promise to resolve, then return the result
        return await promise;
    };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if(subject.trim() === '') {
        setErrorMessage('Subject is required');
        return;
    } else if(message.trim() === '') {
        setErrorMessage('Message is required');
        return;
    } if (!captchaValue) {
        setErrorMessage('Please verify the captcha');
        return;
    } else {
        setErrorMessage('');
    }


    try {
        setLoading(true);
        let complaintData = {...formState};
        if(attachment) {
            const attachmentURL = await uploadImage(attachment);
            complaintData.attachmentLink = attachmentURL;
        }

        const url = process.env.REACT_APP_BACKEND_API_URL + '/api/users/complaints';
        const options = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('jwt_token')}`,
            },
            body: JSON.stringify(complaintData),
        };

        const response = await fetch(url, options);
        const result = await response.json();

        if (response.ok === true) {
            if(result.error) {
                setErrorMessage(result.error);
                return;
            } else {
                setSuccessMessage(result.success);
                setFormState({ message: '', subject: '', attachmentLink: ''});
                toast.success('Compliant sent successfully!');
                handleShowComplaintsForm();
            }
        } else {
            setErrorMessage('Something went wrong.');
        }
    } catch (err) {
        setErrorMessage('Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <>
    <div className='contact-popup-overlay' onClick={handleShowComplaintsForm}></div>
    <section className='contact-popup'>
        <button className='close-contact-popup' disabled={loading} onClick={handleShowComplaintsForm}>&times;</button>
        <h1 className='contact-heading'>Complaint</h1>
        <form id="contact-form" onSubmit={handleFormSubmit}>
            <label htmlFor="subject" className='contact-label'>Subject:</label>
            <input type="text" id='subject' name="subject" value={subject} onChange={handleChange} className='contact-input' placeholder='Subject' />

            <label htmlFor="message" className='contact-label'>Message:</label>
            <textarea name="message" id='message' value={message} onChange={handleChange} className='contact-input contact-textarea' placeholder='Your Message' />

            <label htmlFor='attachment' className='contact-label'>Attachment - Image (Optional):</label>
            <label htmlFor='attachment' className='attachment-label'>{attachmentName !== '' ? attachmentName : "Choose File"}</label>
            <input type='file' id='attachment' name='attachment' accept='image/jpeg, image/png' className='contact-input' onChange={onChangeAttachment} />

            {errorMessage && (
            <div>
                <p className="error-text">*{errorMessage}</p>
            </div>
            )}

            {successMessage && (
            <div>
                <p className="success-text">{successMessage}</p> 
            </div>
            )}
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={onChange}
              style={{marginTop: '20px', marginBottom: '10px'}}
            />
            <button type="submit" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} disabled={loading} className='login-button'>
                {loading ? 
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="#EB6A4D"
                        strokeWidth="4"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        secondaryColor="#fff"
                        wrapperClass=""
                    /> : 
                    'Submit'
                }
            </button>
        </form>
    </section>
    </>
  );
};

export default ComplaintsForm;