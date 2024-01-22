import { IoIosClose } from "react-icons/io";
import React, { useState } from 'react';
import Select from 'react-select';
import { customStyles } from ".";

const countryOptions = [
    { value: '+91', label: '+91'},
    { value: '+1', label: '+1'},
    { value: '+44', label: '+44'},
    { value: '+237', label: '+237'},
];

const defaultSelectedValue = countryOptions[0].value;

const PersonalDetailsForm = (props) => {
    const {
        handleInputChange,
        languages,
        onChangeLanguage,
        personalDetails,
        handleLanguageChange, 
        handleLanguageRemove, 
        onSubmitPersonalDetails, 
        error 
    } = props;

    // const [selectedOption, setSelectedOption] = useState(null);

    // const handleSelectChange = (option) => {
    //     setSelectedOption(option.value);
    // };

    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>Personal Details</h1>
            <form onSubmit={onSubmitPersonalDetails} className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='fullname' className='hr-label'>Full Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" onChange={handleInputChange} value={personalDetails.fullName} required className='hr-input' id='fullname' name='fullName' />

                <label htmlFor='date-of-birth' className='hr-label'>Date of Birth<span className='hr-form-span'> *</span></label>
                <input type='date' onChange={handleInputChange} value={personalDetails.dob} required className='hr-input' id='date-of-birth' name='dob' />
                
                <label htmlFor='phone-number' className='hr-label'>Phone Number<span className='hr-form-span'> *</span></label>

                <div className="hr-input phone-select">
                    <Select
                        options={countryOptions}
                        defaultValue={{ value: defaultSelectedValue, label: countryOptions[0].label }}
                        isSearchable={true}
                        // onChange={handleInputChange}
                        styles={customStyles}
                    />
                    <input type='number' placeholder="Ex: 9876543210" onChange={handleInputChange} value={personalDetails.phone} required className='hr-input-select' id='phone-number' name='phone' />
                </div>

                <label htmlFor='whatsapp-number' className='hr-label'>Whatsapp Number<span className='hr-form-span'> *</span></label>
                <div className="hr-input phone-select">
                    <Select
                        options={countryOptions}
                        defaultValue={{ value: defaultSelectedValue, label: countryOptions[0].label }}
                        isSearchable={true}
                        // onChange={handleInputChange}
                        styles={customStyles}
                    />
                    <input type='number' placeholder="Ex: 9876543210" onChange={handleInputChange} value={personalDetails.wtspNum} required className='hr-input-select' id='whatsapp-number' name='wtspNum' />
                </div>
                <label htmlFor='email' className='hr-label'>Email<span className='hr-form-span'> *</span></label>
                <input type='email' placeholder="Ex: johndoe@gmail.com" onChange={handleInputChange} value={personalDetails.email} required className='hr-input' id='email' name='email' />
                
                <label htmlFor='current-address' className='hr-label'>Current Address<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Address" onChange={handleInputChange} value={personalDetails.currAddress} required className='hr-input' id='current-address' name='currAddress' />

                <label htmlFor='permanent-address' className='hr-label'>Permanent Address<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Address" onChange={handleInputChange} value={personalDetails.permAddress} required className='hr-input' id='permanent-address' name='permAddress' />
                
                <label htmlFor='languages' className='hr-label'>Languages you speak<span className='hr-form-span'> *</span></label>
                <div className='hr-input-list-con'>
                    {
                        personalDetails.languages.map((language) => (
                            <div className='hr-input-list' key={language.id}>
                                <p className='hr-input-list-item'>{language.value}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleLanguageRemove(language.id)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <div className='hr-input-con'>
                    <input type='text' placeholder="Ex: English" className='hr-input-sub' id='languages' name='languages' required={personalDetails.languages.length === 0} value={languages} onChange={onChangeLanguage} />
                    <button type='button' className='hr-form-btn-add' onClick={handleLanguageChange}>+Add</button>
                </div>

                <p className='hr-error'>{error}</p>

                <button type='submit' className='hr-form-btn'>Save & Next</button>
            </form>
        </div>
    )
}

export default PersonalDetailsForm;