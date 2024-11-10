import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import ExcelDownloadButton from "../ExcelDownloadButton";
import { format, parseISO } from "date-fns";
import { Oval } from "react-loader-spinner";

export const RecommendedCandidates = ({onShowCandidateDetails, setShowCandidateForm}) => {

    const [candidateList, setCandidateList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getRecommededCandidates();
    }, []);

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd MMM yyyy');
        return formattedDate;
    }

    const getRecommededCandidates = async () => {
        setLoading(true);
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/recommendations/candidates`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                const formatData = data.map(candidate => ({
                    id: candidate.id,
                    name: candidate.name,
                    email: candidate.email,
                    phone: candidate.phone,
                    dob: candidate.date_of_birth ? formatDate(candidate.date_of_birth) : '--',
                }))
                setCandidateList(formatData);
                return formatData;
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const renderNoCandidates = () => {
        if (loading) {
          return (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#EB6A4D"
              strokeWidth="4"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              secondaryColor="#EB6A4D"
              wrapperClass=""
            />
          )
        }
        else return "no records found!"
    }

    return (
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            <h1 className='bde-heading' style={{textAlign: "center", marginBottom: "20px"}}><span className='head-span'>Candidates of the Day</span></h1>

            <div className="job-section-select-filter-container">
                {candidateList.length > 0 && 
                    <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                        <ExcelDownloadButton getData={getRecommededCandidates} /> 
                    </div>
                }
            </div>


            <div className='table-candidate-container'>
                <table className={`job-details-candidates-table candidate-table-job-section ${candidateList.length === 0 ? "empty-candidates" : ""}`}>
                    <tr className="job-details-candidates-table-heading">
                        <th className="job-details-candidates-table-heading-cell">Name</th>
                        <th className="job-details-candidates-table-heading-cell">Email</th>
                        <th className="job-details-candidates-table-heading-cell">Phone</th>
                        <th className="job-details-candidates-table-heading-cell">Date of Birth</th>
                    </tr>
                    {
                        candidateList.length > 0 && candidateList.map(eachItem => {
                        return (
                            <tr key={eachItem.tenureId} className="job-details-candidates-table-row">
                                <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => onShowCandidateDetails(eachItem.id)}>
                                    {eachItem.name}
                                </td>
                                <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.phone}</td>
                                <td className="job-details-candidates-table-cell">{eachItem.dob}</td>
                            </tr>
                        )})
                    }
                </table>
                {candidateList.length === 0 &&
                <p className='no-candidates-error'>
                    { renderNoCandidates() }
                </p>}
            </div>
            <div className="job-details-candidates-pagination-con">
                <button className="login-button candidate-button" type="button" onClick={() => setShowCandidateForm(0)}>Back</button>
            </div>
        </div>
    )
}

