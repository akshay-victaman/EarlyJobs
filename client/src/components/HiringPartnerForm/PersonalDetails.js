import { IoIosClose } from "react-icons/io";
import React, { useState } from 'react';
import Cookies from "js-cookie";
import Select from 'react-select';
import { customStyles } from ".";

const countryOptions = [
    { value: '+91', label: '+91'},
    { value: '+1', label: '+1'},
    { value: '+44', label: '+44'},
    { value: '+237', label: '+237'},
];

const customStyles2 = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #EB6A4D',
        borderRadius: '5px',
        boxShadow: null,
        '&:hover': {
            borderColor: '#EB6A4D',
        },
        marginBottom: '16px',
        width: '100%',
        height: '35px',
        minHeight: '35px',
        fontSize: '14px'
    }),
    menu: (provided, state) => ({
        ...provided,
        marginTop: '0px',
        paddingTop: '0px',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#EB6A4D',
        '&:hover': {
            color: '#EB6A4D',
        },
        width: '15px',
        padding: '0px',
        margin: '0px',
        border: '0px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#EB6A4D' : null,
        color: state.isSelected ? 'white' : 'black',
    }),
};

const defaultSelectedValue = countryOptions[0].value;

const PersonalDetailsForm = (props) => {
    const {
        handleInputChange,
        onChangeLanguage,
        personalDetails,
        handleLanguageRemove, 
        onSubmitPersonalDetails, 
        languageOptions,
        error 
    } = props;

    // const [selectedOption, setSelectedOption] = useState(null);

    // const handleSelectChange = (option) => {
    //     setSelectedOption(option.value);
    // };

    const userDetailsId = Cookies.get('user_details_id');

    const today = new Date();
    const validYear = today.getFullYear() - 18;
    const validMonth = String(today.getMonth() + 1).padStart(2, '0');
    const validDate = String(today.getDate()).padStart(2, '0');
    const validDateString = `${validYear}-${validMonth}-${validDate}`;

    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>Personal Details</h1>
            <form onSubmit={onSubmitPersonalDetails} className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='fullname' className='hr-label'>Full Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" disabled={userDetailsId === "TBF"} onChange={handleInputChange} value={personalDetails.fullName} required className='hr-input' id='fullname' name='fullName' />

                <label htmlFor='date-of-birth' className='hr-label'>Date of Birth<span className='hr-form-span'> *</span></label>
                <input type='date' onChange={handleInputChange} max={validDateString} value={personalDetails.dob} required className='hr-input' id='date-of-birth' name='dob' />
                
                <label htmlFor='phone-number' className='hr-label'>Phone Number<span className='hr-form-span'> *</span></label>

                <div className="hr-input phone-select">
                    <Select
                        options={countryOptions}
                        defaultValue={{ value: defaultSelectedValue, label: countryOptions[0].label }}
                        isSearchable={true}
                        // onChange={handleInputChange}
                        styles={customStyles}
                    />
                    <input type='number' placeholder="Ex: 9876543210" disabled={userDetailsId === "TBF"} onChange={handleInputChange} value={personalDetails.phone} required className='hr-input-select' id='phone-number' name='phone' />
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
                <input type='email' placeholder="Ex: hr@earlyjobs.in" disabled={userDetailsId === "TBF"} onChange={handleInputChange} value={personalDetails.email} required className='hr-input' id='email' name='email' />

                {
                    userDetailsId === "TBF" ?
                    <>
                        <label htmlFor='password' className='hr-label'>New Password<span className='hr-form-span'> *</span></label>
                        <input type='password' placeholder="New password" onChange={handleInputChange} value={personalDetails.password} required className='hr-input' id='password' name='password' />
                        
                        <label htmlFor='confirm-password' className='hr-label'>Confirm Password<span className='hr-form-span'> *</span></label>
                        <input type='password' placeholder="Confirm password" onChange={handleInputChange} value={personalDetails.confirmPassword} required className='hr-input' id='confirm-password' name='confirmPassword' />
                    </>
                : null
                }
                
                <label htmlFor='current-address' className='hr-label'>Current Address<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Address" onChange={handleInputChange} value={personalDetails.currAddress} required className='hr-input' id='current-address' name='currAddress' />

                <label htmlFor='currPincode' className='hr-label'>Current Address Pincode<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: 123456" onChange={handleInputChange} value={personalDetails.currPincode} required className='hr-input' id='currPincode' name='currPincode' />

                <label htmlFor='permanent-address' className='hr-label'>Permanent Address<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Address" onChange={handleInputChange} value={personalDetails.permAddress} required className='hr-input' id='permanent-address' name='permAddress' />

                <label htmlFor='permPincode' className='hr-label'>Permanent Address Pincode<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: 123456" onChange={handleInputChange} value={personalDetails.permPincode} required className='hr-input' id='permPincode' name='permPincode' />
                
                <label htmlFor='languages' className='hr-label'>Languages you speak<span className='hr-form-span'> *</span></label>
                {/* <div className='hr-input-list-con'>
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
                <p className='hr-size'>Type a language and click 'Add' button to add it to the list</p> */}
                <div className='hr-input-list-con'>
                        {
                        personalDetails.languages.map((language, index) => (
                            <div className='hr-input-list' key={index}>
                                <p className='hr-input-list-item'>{language}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleLanguageRemove(index, language)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <Select
                    options={languageOptions}
                    defaultValue={languageOptions.length !== 0 && { label: languageOptions[0].label }}
                    isSearchable={true}
                    onChange={onChangeLanguage}
                    styles={customStyles2}
                />


                {
                    userDetailsId === undefined ? 
                    <>
                        <label className='hr-label'>Apply for<span className='hr-form-span'> *</span></label>
                        <div className='hr-checkbox-con hr-radio'>
                            <label className='hr-checkbox-label hr-radio-label'>
                                <input type="radio" className='hr-checkbox' name="applyFor" value="Freelance HR Recruiter" checked={personalDetails.applyFor === 'Freelance HR Recruiter'} onChange={handleInputChange}/>
                                Freelance HR Recruiter (Remote)
                            </label>
                            <label className='hr-checkbox-label hr-radio-label'>
                                <input type="radio" className='hr-checkbox' name="applyFor" value="Intern HR Recruiter" checked={personalDetails.applyFor === 'Intern HR Recruiter'} onChange={handleInputChange}/>
                                Intern HR Recruiter (Remote)
                            </label>
                            <label className='hr-checkbox-label hr-radio-label'>
                                <input type="radio" className='hr-checkbox' name="applyFor" value="Fulltime HR Recruiter" checked={personalDetails.applyFor === 'Fulltime HR Recruiter'} onChange={handleInputChange}/>
                                Fulltime HR Recruiter (Onsite only)
                            </label>
                        </div>
                    </>
                    : null
                }

                <p className='hr-main-error'>{error}</p>

                <button type='submit' className='hr-form-btn'>Save & Next</button>
            </form>
        </div>
    )
}

export default PersonalDetailsForm;