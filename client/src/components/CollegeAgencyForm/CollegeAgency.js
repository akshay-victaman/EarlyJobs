import Cookies from 'js-cookie';
import Select from 'react-select'

const countryOptions = [
    { value: '+91', label: '+91'},
    { value: '+1', label: '+1'},
    { value: '+44', label: '+44'},
    { value: '+237', label: '+237'},
];

const defaultSelectedValue = countryOptions[0].value;

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #EB6A4D',
        borderRadius: '5px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
        borderLeft: '1px',
        boxShadow: null,
        '&:hover': {
            borderColor: '#EB6A4D',
        },
        width: '70px',
        height: '35px',
        minHeight: '35px',
        fontSize: '14px',
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

const CollegeAgency = ({handleInputChange, collegeAgencyDetails, handleCurrentStep, onSubmitOrganisationDetails, error}) => {
    const userDetailsId = Cookies.get('user_details_id');
    return (
        <div className='hiring-partner-container' style={{marginTop: "0px"}}>
            <div className='hr-form-container'>
                <h1 className='form-title'>Organisation Details</h1>
                <form onSubmit={onSubmitOrganisationDetails} className='hr-form'>
                    <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                    <label htmlFor='orgName' className='hr-label'>{userDetailsId === 'CLG' ? 'College Name' : 'Agency Name'}<span className='hr-form-span'> *</span></label>
                    <input type='text' placeholder="Organisation Name" disabled={userDetailsId === "CLG" || userDetailsId === "AGY"} onChange={handleInputChange} value={collegeAgencyDetails.orgName} required className='hr-input' id='orgName' name='orgName' />

                    <label htmlFor='officePhone' className='hr-label'>Office Phone Number<span className='hr-form-span'> *</span></label>
                    <div className="hr-input phone-select">
                        <Select
                            options={countryOptions}
                            defaultValue={{ value: defaultSelectedValue, label: countryOptions[0].label }}
                            isSearchable={true}
                            // onChange={handleInputChange}
                            styles={customStyles}
                        />
                        <input type='number' placeholder="Ex: 9876543210" disabled={userDetailsId === "CLG" || userDetailsId === "AGY"} onChange={handleInputChange} value={collegeAgencyDetails.officePhone} required className='hr-input-select' id='officePhone' name='officePhone' />
                    </div>

                    <label htmlFor='officeEmail' className='hr-label'>Office Email<span className='hr-form-span'> *</span></label>
                    <input type='email' placeholder="Ex: hr@earlyjobs.in" disabled={userDetailsId === "CLG" || userDetailsId === "AGY"} onChange={handleInputChange} value={collegeAgencyDetails.officeEmail} required className='hr-input' id='officeEmail' name='officeEmail' />

                    {
                        (userDetailsId === "CLG" || userDetailsId === "AGY") ?
                        <>
                            <label htmlFor='password' className='hr-label'>New Password<span className='hr-form-span'> *</span></label>
                            <input type='password' placeholder="New password" onChange={handleInputChange} value={collegeAgencyDetails.password} required className='hr-input' id='password' name='password' />
                            
                            <label htmlFor='confirm-password' className='hr-label'>Confirm Password<span className='hr-form-span'> *</span></label>
                            <input type='password' placeholder="Confirm password" onChange={handleInputChange} value={collegeAgencyDetails.confirmPassword} required className='hr-input' id='confirm-password' name='confirmPassword' />
                        </>
                    : null
                    }
                    
                    <label htmlFor='officeAddress' className='hr-label'>Office Address<span className='hr-form-span'> *</span></label>
                    <input type='text' placeholder="Address" onChange={handleInputChange} value={collegeAgencyDetails.officeAddress} required className='hr-input' id='officeAddress' name='officeAddress' />

                    {
                        userDetailsId === "AGY" ?
                        <>
                            <label htmlFor='panNum' className='hr-label'>Company Pan Number<span className='hr-form-span'> *</span></label>
                            <input type='text' placeholder="Ex: AAAAA1111A" onChange={handleInputChange} value={collegeAgencyDetails.panNum} required className='hr-input' id='panNum' name='panNum' />
                            
                            <label htmlFor='GSTNum' className='hr-label'>GST Number</label>
                            <input type='text' placeholder="Enter GST Number" onChange={handleInputChange} value={collegeAgencyDetails.GSTNum} className='hr-input' id='GSTNum' name='GSTNum' />
                        </>
                    : null
                    }

                    <p className='hr-main-error'>{error}</p>

                    <button type='submit' className='hr-form-btn'>Save & Next</button>
                </form>
            </div>
        </div>
    )
}

export default CollegeAgency