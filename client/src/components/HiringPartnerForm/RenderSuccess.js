import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const RenderSuccess = () => {
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        if(counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [counter]);

    Cookies.remove('user_details_id')
    return(
        <div className='hr-form-container hr-success-container'>
            <p className='hr-form-subtitle hr-success'>Your profile has been updated successfully.</p>
            {counter === 0 ? (
                <button className='hr-form-btn' onClick={() => window.location.reload()}>View Assigned Jobs</button>
            ) : (
                <p className='success-counter-message'>Please wait while we create your profile in <span className='counter-span'> {counter} </span> seconds, don't refresh the page.</p>
            )}
        </div>
    )
}

export default RenderSuccess;