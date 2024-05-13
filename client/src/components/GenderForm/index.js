import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';


const GenderForm = ({handleShowGenderForm}) => {
  const [gender, setGender] = useState('Male');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
        const url = process.env.REACT_APP_BACKEND_API_URL + '/api/users/gender'
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({gender})
        };

        const response = await fetch(url, options);
        const result = await response.json();
        if(response.ok === true) {
            toast.success(result.success);
            handleShowGenderForm();
        } else {
            toast.error(result.error);
        }
    } catch (err) {
      setErrorMessage('Something went wrong.');
    }
  };

  return (
    <>
    <div className='contact-popup-overlay' onClick={handleShowGenderForm}></div>
    <section className='contact-popup'>
        <button className='close-contact-popup' onClick={handleShowGenderForm}>&times;</button>
        <h1 className='contact-heading'>Update Gender</h1>
        <form id="contact-form" onSubmit={handleFormSubmit}>
            <label htmlFor='gender' className='contact-label'>Gender</label>
            <select className='contact-input' onChange={handleChange} value={gender}>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
                <option value='Other'>Other</option>
            </select>
            {errorMessage && (
            <div>
                <p className="error-text">*{errorMessage}</p>
            </div>
            )}
            <button type="submit" className='login-button'>Submit</button>
        </form>
    </section>
    </>
  );
};

export default GenderForm;