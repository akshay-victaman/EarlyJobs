import { query, where, collection, getFirestore, getDocs, orderBy, Timestamp } from "firebase/firestore";
import app from "../../firebase";
import { useEffect, useState } from "react";
import { IoSearchSharp } from 'react-icons/io5'
import './style.css'
import { Link } from "react-router-dom";

const HiringPartnerReqPage = () => {

    const [hiringPartnerReqList, setHiringPartnerReqList] = useState([])
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        const getHiringPartnerReqList = async () => {
            const db = getFirestore(app);
            const queryRef = query(
                collection(db, "HiringPartnerRequests"),
                where("formData.isApproved", "==", false),
                orderBy("formData.AppliedDate", "desc"),
            );

            const querySnap = await getDocs(queryRef);

            if (!querySnap.empty) {
                const documents = querySnap.docs.map((doc) => {
                    const timestamp = doc.data().formData.AppliedDate;
                  
                    // Check if AppliedDate is a Timestamp object:
                    if (!(timestamp instanceof Timestamp)) {
                      console.error("AppliedDate is not a valid Timestamp. Skipping conversion.");
                      return doc.data();
                    }
                  
                    // Convert Timestamp to human-readable format:
                    const options = { // Configure formatting options as needed
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true, // Use appropriate time format
                      timeZone: 'Asia/Kolkata' // Replace with your preferred time zone
                    };
                    const formattedDate = timestamp.toDate().toLocaleString('en-US', options);
                  
                    return {
                      // Original document data
                      ...doc.data(),
                      // Add `formattedDate` property with converted string
                      formattedDate
                    };
                  });
                console.log(documents)
                setHiringPartnerReqList(documents)
            } else {
                console.log("No such documents!");
            }
        }
        getHiringPartnerReqList()
    }, [])

    const handleChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const filteredHrList = hiringPartnerReqList.filter(eachItem => 
        eachItem.formData.personalDetails.fullName.toLowerCase().includes(searchInput.toLowerCase()) || 
        eachItem.formData.personalDetails.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        eachItem.formData.personalDetails.phone.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
        <div className='homepage-container'>
            {/* <NavBar /> */}
            <div className='hiring-partner-req-page-content-con'>
                <h1 className='hiring-partner-req-heading'>Recruiter Requests</h1>
                <div className="user-view-search-con" style={{marginBottom: "20px"}}>
                    <div className="user-view-search-button">
                        <IoSearchSharp className="search-icon" />
                    </div>
                    <input className="user-view-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} placeholder="Search by name, email, or phone" />
                </div>
                <div className='hiring-partner-req-page-content'>
                    <table className='users-table hiring-partner-req-table'>
                        <thead>
                            <tr className='users-table-heading-row'>
                                <th className="users-table-heading">Name</th>
                                <th className="users-table-heading">Email</th>
                                <th className="users-table-heading">Contact</th>
                                <th className="users-table-heading">Applied Date</th>
                                <th className="users-table-heading">More Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredHrList.map((hiringPartnerReq) => {
                                    return (
                                        <tr className="users-table-data-row" key={hiringPartnerReq.formData.docId}>
                                            <td data-cell='Name' className="users-table-data">{hiringPartnerReq.formData.personalDetails.fullName}</td>
                                            <td data-cell='Email' className="users-table-data">{hiringPartnerReq.formData.personalDetails.email}</td>
                                            <td data-cell='Phone' className="users-table-data">{hiringPartnerReq.formData.personalDetails.phone}</td>
                                            <td data-cell='Applied Date' className="users-table-data">{hiringPartnerReq.formattedDate}</td>
                                            <td data-cell='More Details' className="users-table-data">
                                                <Link to={`/admin/recruiter-requests/${hiringPartnerReq.formData.docId}`} className='link'>
                                                    <button className='hiring-partner-req-btn hrp-button'>View</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default HiringPartnerReqPage