import {Oval} from 'react-loader-spinner'
import React from 'react';

const IdentityProofForm = (props) => {
    const { 
        handleIdentityProofInputChange,
        handleIdentityProofMember1InputChange,
        handleIdentityProofMember2InputChange,
        handleIdentityProofMember3InputChange,
        identityProof, 
        handleAadharFrontChange, 
        handleAadharBackChange, 
        handlePanFrontChange, 
        handlePanBackChange, 
        handlePhotoChange, 
        handleCurrentStep, 
        onSubmitIdentityProof,
        loading,
        error
    } = props;
    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>Idenetification</h1>
            <form onSubmit={onSubmitIdentityProof} className='hr-form'>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>
                <button type='submit' className='hr-form-btn skip-button' disabled={loading}>
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

                <label htmlFor='aadhar' className='hr-label'>Aadhar Number<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 123456789012" className='hr-input' id='aadhar' value={identityProof.aadharNumber} onChange={handleIdentityProofInputChange} name='aadharNumber' />
                <div className='aadhar-con'>
                    <input type='file' id='aadhar-front' className='aadhar-input' accept='image/*' onChange={handleAadharFrontChange} />
                    <label htmlFor='aadhar-front' className='aadhar-label'> {identityProof.aadharFront !== "" ? identityProof.aadharFront.name : "FRONT"}</label>

                    <input type='file' id='aadhar-back' className='aadhar-input' accept='image/*' onChange={handleAadharBackChange}/>
                    <label htmlFor='aadhar-back' className='aadhar-label'>{identityProof.aadharBack !== "" ? identityProof.aadharBack.name : "BACK"}</label>
                </div>
                <p className='hr-size'>(JPEG & PNG format only) & File size should be less than 100KB</p>

                <label htmlFor='pan' className='hr-label'>PAN Number<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: AAAAA1111A" className='hr-input' value={identityProof.panNumber} onChange={handleIdentityProofInputChange} id='pan' name='panNumber' />
                <div className='aadhar-con'>
                    <input type='file' id='pan-front' accept='image/*' onChange={handlePanFrontChange} className='aadhar-input' />
                    <label htmlFor='pan-front' className='aadhar-label'>{identityProof.panFront !== "" ? identityProof.panFront.name : "FRONT"}</label>

                    <input type='file' id='pan-back' accept='image/*' onChange={handlePanBackChange} className='aadhar-input' />
                    <label htmlFor='pan-back' className='aadhar-label'>{identityProof.panBack !== "" ? identityProof.panBack.name : "BACK"}</label>
                </div>
                <p className='hr-size'>(JPEG & PNG format only) & File size should be less than 100KB</p>

                <label htmlFor='photo' className='hr-label'>Photo</label>
                <div className='aadhar-con'>
                    <input type='file' id='photo' className='aadhar-input' accept='image/*' onChange={handlePhotoChange} />
                    <label htmlFor='photo' className='aadhar-label'>{identityProof.photo !== "" ? identityProof.photo.name : "PHOTO"}</label>
                </div>
                <p className='hr-size'>(JPEG & PNG format only) & File size should be less than 100KB</p>
                
                <label htmlFor='emergency-number' className='hr-label'>Emergency Contact<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 9876543210" className='hr-input' id='emergency-number' value={identityProof.emergencyNumber} onChange={handleIdentityProofInputChange} name='emergencyNumber' />


                <label className='hr-label'>Details of 3 Family Members.</label>

                <p className='person-label'>Member 1</p>


                <label htmlFor='name1' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name1' value={identityProof.familyMembers.member1.name} onChange={handleIdentityProofMember1InputChange} name='name' />

                <label htmlFor='relationship1' className='hr-label'>Relationship<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Brother" className='hr-input' id='relationship1' value={identityProof.familyMembers.member1.relationship} onChange={handleIdentityProofMember1InputChange} name='relationship' />
                
                <label htmlFor='organization1' className='hr-label'>Occupation/Organization<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: MicroSoft" className='hr-input' id='organization1' value={identityProof.familyMembers.member1.organization} onChange={handleIdentityProofMember1InputChange} name='organization' />

                <label htmlFor='age1' className='hr-label'>Age<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 25" className='hr-input' id='age1' value={identityProof.familyMembers.member1.age} onChange={handleIdentityProofMember1InputChange} name='age' />
                
                <label htmlFor='know' className='hr-label'>Dependent on you?<span className='hr-form-span'> *</span></label>
                <div className='hr-checkbox-con'>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="dependentOnYou1" value="yes" checked={identityProof.familyMembers.member1.dependentOnYou1==='yes'} onChange={handleIdentityProofMember1InputChange} />
                        Yes
                    </label>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="dependentOnYou1" value="no" checked={identityProof.familyMembers.member1.dependentOnYou1==='no'} onChange={handleIdentityProofMember1InputChange} />
                        No
                    </label>
                </div>


                <p className='person-label'>Member 2</p>

                <label htmlFor='name2' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name2' value={identityProof.familyMembers.member2.name} onChange={handleIdentityProofMember2InputChange} name='name' />

                <label htmlFor='relationship2' className='hr-label'>Relationship<span className='hr-form-span'> *</span></label>
                <input type='tel' placeholder="Ex: Brother" className='hr-input' id='relationship2' value={identityProof.familyMembers.member2.relationship} onChange={handleIdentityProofMember2InputChange} name='relationship' />
                
                <label htmlFor='organization2' className='hr-label'>Occupation/Organization<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: MicroSoft" className='hr-input' id='organization2' value={identityProof.familyMembers.member2.organization} onChange={handleIdentityProofMember2InputChange} name='organization' />

                <label htmlFor='age2' className='hr-label'>Age<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 25" className='hr-input' id='age2' value={identityProof.familyMembers.member2.age} onChange={handleIdentityProofMember2InputChange} name='age' />
                
                <label htmlFor='know' className='hr-label'>Dependent on you?<span className='hr-form-span'> *</span></label>
                <div className='hr-checkbox-con'>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="dependentOnYou2" value="yes" checked={identityProof.familyMembers.member2.dependentOnYou2==='yes'} onChange={handleIdentityProofMember2InputChange}/>
                        Yes
                    </label>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="dependentOnYou2" value="no" checked={identityProof.familyMembers.member2.dependentOnYou2==='no'} onChange={handleIdentityProofMember2InputChange}/>
                        No
                    </label>
                </div>


                <p className='person-label'>Member 3</p>

                <label htmlFor='name3' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Jonh Doe" className='hr-input' id='name3' value={identityProof.familyMembers.member3.name} onChange={handleIdentityProofMember3InputChange} name='name' />

                <label htmlFor='relationship3' className='hr-label'>Relationship<span className='hr-form-span'> *</span></label>
                <input type='tel' placeholder="Ex: Brother" className='hr-input' id='relationship3' value={identityProof.familyMembers.member3.relationship} onChange={handleIdentityProofMember3InputChange} name='relationship' />
                
                <label htmlFor='organization3' className='hr-label'>Occupation/Organization<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: MicroSoft" className='hr-input' id='organization3' value={identityProof.familyMembers.member3.organization} onChange={handleIdentityProofMember3InputChange} name='organization' />

                <label htmlFor='age3' className='hr-label'>Age<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 25" className='hr-input' id='age3' value={identityProof.familyMembers.member3.age} onChange={handleIdentityProofMember3InputChange} name='age' />
                
                <label htmlFor='know' className='hr-label'>Dependent on you?<span className='hr-form-span'> *</span></label>
                <div className='hr-checkbox-con'>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="dependentOnYou3" value="yes" checked={identityProof.familyMembers.member3.dependentOnYou3==='yes'} onChange={handleIdentityProofMember3InputChange}/>
                        Yes
                    </label>
                    <label className='hr-checkbox-label'>
                        <input type="radio" className='hr-checkbox' name="dependentOnYou3" value="no" checked={identityProof.familyMembers.member3.dependentOnYou3==='no'} onChange={handleIdentityProofMember3InputChange}/>
                        No
                    </label>
                </div>

                <p className='hr-main-error'>{error}</p>

                <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn' onClick={() => handleCurrentStep(3)}>Back</button>
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
            </form>
        </div>
    )
}

export default IdentityProofForm;