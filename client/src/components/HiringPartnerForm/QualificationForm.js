import { IoIosClose } from "react-icons/io";
import React from 'react';

const QualificationForm = (props) => {
    const { 
        handleQualificationInputChange,
        workExperience,
        certification,
        qualification,
        onChangeCertification,
        onChangeWorkExperience,
        handleCertificationChange,
        handleWorkExperienceChange,
        handleCertificationRemove,
        handleWorkExperienceRemove,
        onSubmitQualification,
        handleCurrentStep,
        error
    } = props;
    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>Qualification</h1>
            <form className='hr-form' onSubmit={onSubmitQualification}>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label htmlFor='qualification' className='hr-label'>Highest Qualification<span className='hr-form-span'> *</span></label>
                <select className='hr-input' id='qualification' name='highestQualification' required value={qualification.highestQualification} onChange={handleQualificationInputChange}>
                    <option value=''>Select</option>
                    <option value='10th'>10th</option>
                    <option value='12th/Intermediate'>12th</option>
                    <option value="ITI">ITI</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Graduation (10 + 2 + 3)">Graduation (10 + 2 + 3)</option>
                    <option value="Graduation (10 + 2 + 4)">Graduation (10 + 2 + 4)</option>
                    <option value='Post Graduation'>Post Graduation</option>
                    <option value='PhD'>PhD</option>
                </select>

                {/* <label htmlFor='certification' className='hr-label' >Certification<span className='hr-form-span'> *</span></label>
                <div className='hr-input-list-con'>
                    {
                        qualification.certification.map((certification) => (
                            <div className='hr-input-list' key={certification.id}>
                                <p className='hr-input-list-item'>{certification.value}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleCertificationRemove(certification.id)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <div className='hr-input-con'>
                    <input type='text' placeholder="Certificate name" className='hr-input-sub' id='certification' name='certification' required={qualification.certification.length === 0} value={certification} onChange={onChangeCertification} />
                    <button type='button' className='hr-form-btn-add' onClick={handleCertificationChange}>+Add</button>
                </div> */}

                <label htmlFor='experience' className='hr-label' >Work Experience</label>
                <div className='hr-input-list-con'>
                    {
                        qualification.workExperience.map((experience) => (
                            <div className='hr-input-list' key={experience.id}>
                                <p className='hr-input-list-item'>{experience.value}</p>
                                <button type='button' className='hr-remove-item-button' onClick={() => handleWorkExperienceRemove(experience.id)}><IoIosClose className='hr-close-icon' /></button>
                            </div>
                        ))
                    }
                </div>
                <div className='hr-input-con'>
                    <input type='text' placeholder="Ex: MicroSoft" className='hr-input-sub' id='experience' name='experience' value={workExperience} onChange={onChangeWorkExperience} />
                    <button type='button' className='hr-form-btn-add' onClick={handleWorkExperienceChange}>+Add</button>
                </div>
                <p className='hr-size'>Type company name and click 'Add' button to add it to the list</p>

                <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn' onClick={() => handleCurrentStep(0)}>Back</button>
                    <button type='submit' className='hr-form-btn'>Save & Next</button>
                </div>
                <p className='hr-main-error'>{error}</p>
            </form>
        </div>
    )
}

export default QualificationForm;