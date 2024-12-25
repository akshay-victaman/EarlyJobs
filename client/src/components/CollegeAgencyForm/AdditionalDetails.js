import { Oval } from 'react-loader-spinner';
import React from 'react';
const AdditionalDetails = (props) => {
    const { 
        handlePerson1InputChange,
        handlePerson2InputChange,
        additionalDetails,
        onSubmitAdditionalDetails,
        handleCurrentStep,
        loading,
        error
    } = props;
    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>Additional Details</h1>
            <form className='hr-form' onSubmit={onSubmitAdditionalDetails}>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label className='hr-label'>List any two contact persons related to your organization.<span className='hr-form-span'> *</span></label>

                <p className='person-label'>Contact Person 1</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name' required value={additionalDetails.person1.name} onChange={handlePerson1InputChange} name='name' />

                <label htmlFor='phone-number' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 9876543210" className='hr-input' id='phone-number' required value={additionalDetails.person1.phone} onChange={handlePerson1InputChange} name='phone' />

                <label htmlFor='email' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' placeholder="Ex: hr@earlyjobs.in" className='hr-input' id='email' required value={additionalDetails.person1.email} onChange={handlePerson1InputChange} name='email' />

                <p className='person-label'>Contact Person 2</p>

                <label htmlFor='name2' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name2' required value={additionalDetails.person2.name} onChange={handlePerson2InputChange} name='name' />

                <label htmlFor='phone-number2' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 9876543210" className='hr-input' id='phone-number2' required value={additionalDetails.person2.phone} onChange={handlePerson2InputChange} name='phone' />

                <label htmlFor='email2' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' placeholder="Ex: hr@earlyjobs.in" className='hr-input' id='email2' required value={additionalDetails.person2.email} onChange={handlePerson2InputChange} name='email' />

                <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn'  onClick={() => handleCurrentStep(0)}>Back</button>
                    <button type='submit' className='hr-form-btn' disabled={loading} >
                        {loading &&
                            <span className='hr-oval'>
                                <Oval
                                    visible={true}
                                    height="20"
                                    width="20"
                                    color="#ffffff"
                                    strokeWidth="4"
                                    ariaLabel="oval-loading"
                                    wrapperStyle={{}}
                                    secondaryColor="#ffffff"
                                    wrapperClass=""
                                    className='hr-oval'
                                />
                            </span>
                        }
                        Submit
                    </button>
                </div>

                <p className='hr-main-error'>{error}</p>
            </form>
        </div>
    )
}

export default AdditionalDetails;