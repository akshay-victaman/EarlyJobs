

const ReferencesForm = (props) => {
    const { 
        handlePerson1InputChange,
        handlePerson2InputChange,
        handlePerson3InputChange,
        references,
        onSubmitReferences,
        handleCurrentStep,
        error
    } = props;
    return(
        <div className='hr-form-container'>
            <h1 className='form-title'>References</h1>
            <form className='hr-form' onSubmit={onSubmitReferences}>
                <p className='hr-form-subtitle'>( <span className='hr-form-span'>*</span> ) Indicates required field</p>

                <label className='hr-label'>List any three persons not related (Blood relation) to you, who are professionally, known to you.<span className='hr-form-span'> *</span></label>

                <p className='person-label'>Person 1</p>

                <label htmlFor='name' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name' required value={references.person1.name} onChange={handlePerson1InputChange} name='name' />

                <label htmlFor='phone-number' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 9876543210" className='hr-input' id='phone-number' required value={references.person1.phone} onChange={handlePerson1InputChange} name='phone' />

                <label htmlFor='email' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' placeholder="Ex: hr@earlyjobs.in" className='hr-input' id='email' required value={references.person1.email} onChange={handlePerson1InputChange} name='email' />
                
                <label htmlFor='organization' className='hr-label'>Organization<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: MicroSoft" className='hr-input' id='organization' required value={references.person1.organization} onChange={handlePerson1InputChange} name='organization' />

                <label htmlFor='designation' className='hr-label'>Designation<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Hiring Manager" className='hr-input' id='designation' required value={references.person1.designation} onChange={handlePerson1InputChange} name='designation' />
                
                <label htmlFor='know' className='hr-label'>How they know you?<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Colleague" className='hr-input' id='know' required value={references.person1.know} onChange={handlePerson1InputChange} name='know' />


                <p className='person-label'>Person 2</p>

                <label htmlFor='name2' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name2' required value={references.person2.name} onChange={handlePerson2InputChange} name='name' />

                <label htmlFor='phone-number2' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 9876543210" className='hr-input' id='phone-number2' required value={references.person2.phone} onChange={handlePerson2InputChange} name='phone' />

                <label htmlFor='email2' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' placeholder="Ex: hr@earlyjobs.in" className='hr-input' id='email2' required value={references.person2.email} onChange={handlePerson2InputChange} name='email' />
                
                <label htmlFor='organization2' className='hr-label'>Organization<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: MicroSoft" className='hr-input' id='organization2' required value={references.person2.organization} onChange={handlePerson2InputChange} name='organization' />

                <label htmlFor='designation2' className='hr-label'>Designation<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Hiring Manager" className='hr-input' id='designation2' required value={references.person2.designation} onChange={handlePerson2InputChange} name='designation' />
                
                <label htmlFor='know2' className='hr-label'>How they know you?<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Colleague" className='hr-input' id='know2' required value={references.person2.know} onChange={handlePerson2InputChange} name='know' />


                <p className='person-label'>Person 3</p>

                <label htmlFor='name3' className='hr-label'>Name<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: John Doe" className='hr-input' id='name3' required value={references.person3.name} onChange={handlePerson3InputChange} name='name' />

                <label htmlFor='phone-number3' className='hr-label'>Contact Number<span className='hr-form-span'> *</span></label>
                <input type='number' placeholder="Ex: 9876543210" className='hr-input' id='phone-number3' required value={references.person3.phone} onChange={handlePerson3InputChange} name='phone' />

                <label htmlFor='email3' className='hr-label'>Mail ID<span className='hr-form-span'> *</span></label>
                <input type='email' placeholder="Ex: hr@earlyjobs.in" className='hr-input' id='email3' required value={references.person3.email} onChange={handlePerson3InputChange} name='email' />
                
                <label htmlFor='organization3' className='hr-label'>Organization<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: MicroSoft" className='hr-input' id='organization3' required value={references.person3.organization} onChange={handlePerson3InputChange} name='organization' />

                <label htmlFor='designation3' className='hr-label'>Designation<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Hiring Manager" className='hr-input' id='designation3' required value={references.person3.designation} onChange={handlePerson3InputChange} name='designation' />
                
                <label htmlFor='know3' className='hr-label'>How they know you?<span className='hr-form-span'> *</span></label>
                <input type='text' placeholder="Ex: Colleague" className='hr-input' id='know3' required value={references.person3.know} onChange={handlePerson3InputChange} name='know' />

                <div className='hr-submit-con'>
                    <button type='button' className='hr-form-btn'  onClick={() => handleCurrentStep(2)}>Back</button>
                    <button type='submit' className='hr-form-btn'>Save & Next</button>
                </div>

                <p className='hr-main-error'>{error}</p>
            </form>
        </div>
    )
}

export default ReferencesForm;