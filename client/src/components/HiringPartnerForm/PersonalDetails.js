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

                <label htmlFor='gender' className='contact-label'>Gender<span className='hr-form-span'> *</span></label>
                <select className='contact-input' name="gender" onChange={handleInputChange} value={personalDetails.gender}>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                </select>
                
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

                <label htmlFor='currBuildingNo' className='hr-label address-label'>Current Address</label>

                <div className='hr-address-input-con'>
                    <div className="hr-address-input">
                        <label htmlFor='currBuildingNo' className='hr-label'>Building/Flat No.<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="building number" onChange={handleInputChange} value={personalDetails.currBuildingNo} required className='hr-input' id='currBuildingNo' name='currBuildingNo' />
                    </div>
                    <div className="hr-address-input">
                        <label htmlFor='currStreet' className='hr-label'>Street<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="street" onChange={handleInputChange} value={personalDetails.currStreet} required className='hr-input' id='currStreet' name='currStreet' />
                    </div>
                </div>

                <div className='hr-address-input-con'>
                    <div className="hr-address-input">
                        <label htmlFor='currArea' className='hr-label'>Area/Village<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="city" onChange={handleInputChange} value={personalDetails.currArea} required className='hr-input' id='currArea' name='currArea' />
                    </div>
                    <div className="hr-address-input">
                        <label htmlFor='currCity' className='hr-label'>City/Town/Block<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="city" onChange={handleInputChange} value={personalDetails.currCity} required className='hr-input' id='currCity' name='currCity' />
                    </div>
                </div>

                <div className='hr-address-input-con'>
                    <div className="hr-address-input">
                        <label htmlFor='currState' className='hr-label'>State<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="state" onChange={handleInputChange} value={personalDetails.currState} required className='hr-input' id='currState' name='currState' />
                    </div>
                    <div className="hr-address-input">
                        <label htmlFor='currPin' className='hr-label'>Pincode<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="Ex: 123456" onChange={handleInputChange} value={personalDetails.currPin} required className='hr-input' id='currPin' name='currPin' />
                    </div>
                </div>

                <label htmlFor='permBuildingNo' className='hr-label address-label'>Permanent Address</label>

                <div className='hr-address-input-con'>
                    <div className="hr-address-input">
                        <label htmlFor='permBuildingNo' className='hr-label'>Building/Flat No.<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="building number" onChange={handleInputChange} value={personalDetails.permBuildingNo} required className='hr-input' id='permBuildingNo' name='permBuildingNo' />
                    </div>
                    <div className="hr-address-input">
                        <label htmlFor='permStreet' className='hr-label'>Street<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="street" onChange={handleInputChange} value={personalDetails.permStreet} required className='hr-input' id='permStreet' name='permStreet' />
                    </div>
                </div>

                <div className='hr-address-input-con'>
                    <div className="hr-address-input">
                        <label htmlFor='permArea' className='hr-label'>Area/Village<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="city" onChange={handleInputChange} value={personalDetails.permArea} required className='hr-input' id='permArea' name='permArea' />
                    </div>
                    <div className="hr-address-input">
                        <label htmlFor='permCity' className='hr-label'>City/Town/Block<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="city" onChange={handleInputChange} value={personalDetails.permCity} required className='hr-input' id='permCity' name='permCity' />
                    </div>
                </div>

                <div className='hr-address-input-con'>
                    <div className="hr-address-input">
                        <label htmlFor='permState' className='hr-label'>State<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="state" onChange={handleInputChange} value={personalDetails.permState} required className='hr-input' id='permState' name='permState' />
                    </div>
                    <div className="hr-address-input">
                        <label htmlFor='permPin' className='hr-label'>Pincode<span className='hr-form-span'> *</span></label>
                        <input type='text' placeholder="Ex: 123456" onChange={handleInputChange} value={personalDetails.permPin} required className='hr-input' id='permPin' name='permPin' />
                    </div>
                </div>

                <label htmlFor='languages' className='hr-label'>Languages you speak<span className='hr-form-span'> *</span></label>
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