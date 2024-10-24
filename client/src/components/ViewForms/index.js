import React, { useState, useEffect } from 'react';
import { query, collection, getFirestore, getDocs, orderBy } from "firebase/firestore";
import { Oval } from 'react-loader-spinner'; 
import app from "../../firebase";
import './style.css';

const db = getFirestore(app);

const ViewForm = () => {
  const [currentForm, setCurrentForm] = useState('contactUs');
  const [contactUsData, setContactUsData] = useState([]);
  const [prachiseWithUsData, setPrachiseWithUsData] = useState([]);
  const [partnerWithUsData, setPartnerWithUsData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  // Fetch Contact Us Data
  const fetchContactUsData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "ContactForms"), orderBy("postDateTime", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContactUsData(data);
    } catch (error) {
      console.error("Error fetching Contact Us data:", error);
    }
    setLoading(false);
  };

  // Fetch Franchise Requests Data
  const fetchPrachiseWithUsData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "FranchiseRequests"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPrachiseWithUsData(data);
    } catch (error) {
      console.error("Error fetching Franchise Requests data:", error);
    }
    setLoading(false);
  };

  // Fetch Partner With Us Data
  const fetchPartnerWithUsData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "PartnerWithUs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPartnerWithUsData(data);
    } catch (error) {
      console.error("Error fetching Partner With Us data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentForm === 'contactUs') {
      fetchContactUsData();
    } else if (currentForm === 'frachiseWithUs') {
      fetchPrachiseWithUsData();
    } else if (currentForm === 'partnerWithUs') {
      fetchPartnerWithUsData();
    }
  }, [currentForm]);

  const handleNameClick = (entry) => {
    setSelectedEntry(entry);
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedEntry(null);
  };

  return (
    <div className="admin-dashboard-view-form">
      <h1>View Forms</h1>

      <div className="form-selection-buttons">
        <button onClick={() => setCurrentForm('contactUs')}>Contact Us</button>
        <button onClick={() => setCurrentForm('frachiseWithUs')}>Franchise Requests</button>
        <button onClick={() => setCurrentForm('partnerWithUs')}>Partner With Us</button>
      </div>

      {loading ? (
        <div className="loading-container">
          <Oval
            visible={true}
            height="20"
            width="20"
            color="#ffffff"
            strokeWidth="4"
            ariaLabel="oval-loading"
            secondaryColor="#ffffff"
          />
        </div>
      ) : (
        <div className="form-container">
          {currentForm === 'contactUs' && contactUsData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {contactUsData.map((entry) => (
                  <tr key={entry.id} onClick={() => handleNameClick(entry)} style={{ cursor: 'pointer' }}>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.phone}</td>
                    <td>{entry.subject}</td>
                    <td>{entry.message ? entry.message.substring(0, 30) : "No message"}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentForm === 'frachiseWithUs' && prachiseWithUsData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Franchise Location</th>
                </tr>
              </thead>
              <tbody>
                {prachiseWithUsData.map((entry) => (
                  <tr key={entry.id} onClick={() => handleNameClick(entry)} style={{ cursor: 'pointer' }}>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.phone}</td>
                    <td>{entry.franchiseLocation ? entry.franchiseLocation.substring(0, 30) : "No location"}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {currentForm === 'partnerWithUs' && partnerWithUsData.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Organization Name</th>
                </tr>
              </thead>
              <tbody>
                {partnerWithUsData.map((entry) => (
                  <tr key={entry.id} onClick={() => handleNameClick(entry)} style={{ cursor: 'pointer' }}>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.phone}</td>
                    <td>{entry.orgName ? entry.orgName.substring(0, 30) : "No organization"}...</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && currentForm === 'contactUs' && contactUsData.length === 0 && <p>No Contact Us submissions found.</p>}
          {!loading && currentForm === 'frachiseWithUs' && prachiseWithUsData.length === 0 && <p>No Franchise With Us submissions found.</p>}
          {!loading && currentForm === 'partnerWithUs' && partnerWithUsData.length === 0 && <p>No Partner With Us submissions found.</p>}
        </div>
      )}

     
      {popupVisible && selectedEntry && (
  <div className="popup-overlay">
    <div className="candidate-details-modal-con">
      <h1 className="candidate-details-heading">{currentForm === 'contactUs' ? 'Contact Us Details' : currentForm === 'frachiseWithUs' ? 'Franchise Details' : 'Partner Details'}</h1>

      <div className="candidate-details-sub-con">
        <p className="candidate-details-sub-heading">Email: </p>
        <p className="candidate-details-sub-text">{selectedEntry.email}</p>
      </div>

      <div className="candidate-details-sub-con">
        <p className="candidate-details-sub-heading">Phone: </p>
        <p className="candidate-details-sub-text">{selectedEntry.phone}</p>
      </div>

      <div className="candidate-details-sub-con">
        <p className="candidate-details-sub-heading">Name: </p>
        <p className="candidate-details-sub-text">{selectedEntry.name}</p>
      </div>

      {currentForm === 'contactUs' && (
        <>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Subject: </p>
            <p className="candidate-details-sub-text">{selectedEntry.subject}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Message: </p>
            <p className="candidate-details-sub-text">{selectedEntry.message}</p>
          </div>
        </>
      )}

      {currentForm === 'frachiseWithUs' && (
        <>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Franchise Location: </p>
            <p className="candidate-details-sub-text">{selectedEntry.franchiseLocation}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Full Time: </p>
            <p className="candidate-details-sub-text">{selectedEntry.fullTime}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Office Setup: </p>
            <p className="candidate-details-sub-text">{selectedEntry.officeSetup}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Previous Business: </p>
            <p className="candidate-details-sub-text">{selectedEntry.previousBusiness}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Project Lead Role: </p>
            <p className="candidate-details-sub-text">{selectedEntry.plRole}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Team Experience: </p>
            <p className="candidate-details-sub-text">{selectedEntry.teamExp}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Currently Working: </p>
            <p className="candidate-details-sub-text">{selectedEntry.currentlyWorking}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Expectation: </p>
            <p className="candidate-details-sub-text">{selectedEntry.expectation}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">LinkedIn: </p>
            <p className="candidate-details-sub-text">{selectedEntry.linkedIn || "N/A"}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Resume: </p>
            <p className="candidate-details-sub-text">
              <a href={selectedEntry.resume} target="_blank" rel="noopener noreferrer">Download Resume</a>
            </p>
          </div>
        </>
      )}

      {currentForm === 'partnerWithUs' && (
        <>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Organization Name: </p>
            <p className="candidate-details-sub-text">{selectedEntry.orgName}</p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">Resume URL: </p>
            <p className="candidate-details-sub-text">
              <a href={selectedEntry.resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume</a>
            </p>
          </div>
          <div className="candidate-details-sub-con">
            <p className="candidate-details-sub-heading">LinkedIn: </p>
            <p className="candidate-details-sub-text">{selectedEntry.linkedIn || "N/A"}</p>
          </div>
        </>
      )}

      {/* Display submitted date at the end */}
      <div className="candidate-details-sub-con">
        <p className="candidate-details-sub-heading">Submitted Date: </p>
        <p className="candidate-details-sub-text">
          {
            new Date(selectedEntry.createdAt?.toDate() || selectedEntry.postDateTime?.toDate()).toLocaleString() || "N/A"
          }
        </p>
      </div>

      <button className="candidate-details-close-btn" onClick={handleClosePopup}>
        &times;
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewForm;
