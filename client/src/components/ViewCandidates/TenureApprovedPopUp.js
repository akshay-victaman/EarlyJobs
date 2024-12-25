import { useState } from "react";
import React from 'react';
import { toast } from "react-toastify";
import Cookies from "js-cookie";

export const TenureApprovedPopUp = ({applicationId, setShowTenureApprovedPopUp}) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [employmentDetails, setEmploymentDetails] = useState({
        employeeId: "",
        positionName: "",
        salary: "",
        commissionReceived: "",
        commissionPaid: ""
    });

    const handleInputChange = (e) => {
        setEmploymentDetails({
            ...employmentDetails,
            [e.target.name]: e.target.value
        });
    }

    const submitEmploymentDetails = async () => {
        if(employmentDetails.employeeId==="" || employmentDetails.positionName==="" || employmentDetails.salary==="" || employmentDetails.commissionReceived==="" || employmentDetails.commissionPaid==="") {
            setError("Please fill all the fields");
            return;
        }
        if (employmentDetails.salary < 0 || employmentDetails.commissionReceived < 0 || employmentDetails.commissionPaid < 0) {
            setError("Salary and Commission cannot be negative");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/jobs/candidate/employment-details`;
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("jwt_token")}`
                },
                body: JSON.stringify({
                    ...employmentDetails,
                    applicationId
                })
            }
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            if(response.ok === true) {
                toast.success("Employment details submitted successfully");
                setEmploymentDetails({
                    employeeId: "",
                    positionName: "",
                    salary: "",
                    commissionReceived: "",
                    commissionPaid: ""
                });
                setShowTenureApprovedPopUp(false);
            } else {
                setError(data.error);
                toast.error(data.error);
            }
        } catch (error) {
            setError("Something went wrong. Please try again later.");
            toast.error("Something went wrong. Please try again later.");
            console.error("Error occurred while submitting employment details: ", error);
        }
        setLoading(false);
    }

    return (
        <div className="view-candidate-details-modal">
            <div className='view-candidate-details-modal-overlay' onClick={() => setShowTenureApprovedPopUp(false)}></div>
            <div className="candidate-details-modal-con">
                <h1 className="candidate-details-heading">Employment Details</h1>
                <label htmlFor="employeeId" className="homepage-label">Employee Id<span className='hr-form-span'> *</span></label>
                <input type="text" id="employeeId" name="employeeId" className="homepage-input" placeholder="Enter Employee Id" required value={employmentDetails.employeeId} onChange={handleInputChange} />
                <label htmlFor="positionName" className="homepage-label">Position Name<span className='hr-form-span'> *</span></label>
                <input type="text" id="positionName" name="positionName" className="homepage-input" placeholder="Enter Position Name" required value={employmentDetails.positionName} onChange={handleInputChange} />
                <label htmlFor="salary" className="homepage-label">Salary<span className='hr-form-span'> *</span></label>
                <input type="number" id="salary" name="salary" className="homepage-input" placeholder="Enter Salary" required value={employmentDetails.salary} onChange={handleInputChange} />
                <label htmlFor="commissionReceived" className="homepage-label">Commission<span className='hr-form-span'> *</span></label>
                <input type="number" id="commissionReceived" name="commissionReceived" className="homepage-input" placeholder="Enter Commission" required value={employmentDetails.commissionReceived} onChange={handleInputChange} />
                <label htmlFor="commissionPaid" className="homepage-label">Commission Paid<span className='hr-form-span'> *</span></label>
                <input type="number" id="commissionPaid" name="commissionPaid" className="homepage-input" placeholder="Enter Commission Paid" required value={employmentDetails.commissionPaid} onChange={handleInputChange} />
                <div className='achieve-button-con' style={{marginTop: '0px'}}>
                    <button className='job-details-upload-candidate-button' onClick={submitEmploymentDetails}>Submit</button>
                    <button className='job-details-upload-candidate-button archieve-cancel-btn' onClick={() => setShowTenureApprovedPopUp(false)} disabled={loading}>Cancel</button>
                </div>
                {error!=="" && <p className="hr-main-error">*{error}</p>}
                <button className="candidate-details-close-btn" onClick={() => setShowTenureApprovedPopUp(false)} disabled={loading}>
                    &times;
                </button>
            </div>
        </div>
    )
}

