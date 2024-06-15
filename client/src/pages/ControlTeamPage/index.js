import { useState, useEffect } from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { Redirect } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";
import Cookies from 'js-cookie';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import Popup from 'reactjs-popup';
import {toast} from 'react-toastify';
import './style.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const ControlTeamPage = () => {

    const [memberCards, setMemberCards] = useState([]);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const [error, setError] = useState('');
    const [editFormType, setEditFormType] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [successUpload, setSuccessUpload] = useState(false);
    const [editMember, setEditMember] = useState({
        id: '',
        name: '',
        designation: '',
        category: '',
        position: '',
        imageUrl: '',
        linkedInUrl: '',
        experience: '',
        certifiedBy: ''
    });

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const s3Client = new S3Client({
        region: process.env.REACT_APP_AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
        },
    });

    useEffect(() => {
        fetchMemberCards();
    }, []);

    async function handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;
        setFile(file);
        console.log('File selected:', file);
    }

    const uploadImage = async () => {
        console.log(process.env.REACT_APP_AWS_BUCKET_NAME, process.env.REACT_APP_AWS_BUCKET_REGION)
        console.log(process.env.REACT_APP_AWS_ACCESS_KEY_ID, process.env.REACT_APP_AWS_SECRET_KEY_ID)
        if(!file) return;
        try {
            const timestamp = Date.now();
            const params = {
                Bucket: process.env.REACT_APP_AWS_BUCKET_NAME,
                Key: `${file.name}-${timestamp}`,
                Body: file,
                ContentType: file.type,
            };
        
            const command = new PutObjectCommand(params);
        
            await s3Client.send(command);
        
            const imageUrl = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_BUCKET_REGION}.amazonaws.com/${params.Key}`;
            console.log("Image uploaded to S3:", imageUrl)
            setImageUrl(imageUrl);
            setSuccessUpload(true);
            setFile(null);
        } catch (error) {
            console.error("Error uploading file to S3:", error);
            toast.error('Failed to upload image');
        }
    };

    const fetchMemberCards = async () => {
        try {
            setApiStatus(apiStatusConstants.loading);
            const url = backendUrl + '/admin/teams';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data)
            if (response.ok) {
                const formattedData = data.map(member => ({
                    id: member.id,
                    name: member.name,
                    designation: member.designation,
                    category: member.category,
                    position: member.position,
                    imageUrl: member.image_url,
                    linkedInUrl: member.linkedIn_url,
                    experience: member.experience_in_years,
                    certifiedBy: member.certified_by
                }));
                setMemberCards(formattedData);
                setApiStatus(apiStatusConstants.success);
            } else {
                console.error('Error fetching member cards:', data);
                setApiStatus(apiStatusConstants.failure);
            }

        } catch (error) {
            setApiStatus(apiStatusConstants.failure);
            console.error('Error fetching member cards:', error);
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setEditMember({
            ...editMember,
            [name]: value
        });
    }

    const handleEditMember = async (close) => {
        if (!editMember.name || !editMember.designation || !editMember.position || !editMember.imageUrl || !editMember.experience || !editMember.certifiedBy || !editMember.linkedInUrl || !editMember.category) {
            setError('Please fill all fields');
            return;
        } else if (editMember.position < 1) {
            setError('Position should be greater than 0');
            return;
        } else if (!editMember.imageUrl.startsWith('http')) {
            setError('Invalid image URL, should start with http or https');
            return;
        } else if (!editMember.linkedInUrl.startsWith('http')) {
            setError('Invalid LinkedIn URL, should start with http or https');
            return;
        }
        setError('');

        try {
            const url = backendUrl + '/admin/teams';
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                },
                body: JSON.stringify(editMember)
            }
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                fetchMemberCards();
                toast.success('Member updated successfully');
                close();
            } else {
                setError('Failed to update member');
                toast.error('Failed to update member');
            }

        } catch (error) {
            console.error('Error updating member:', error);
            setError('Failed to update member');
            toast.error('Failed to update member');
        }
    }

    const handleDeleteMember = async (id) => {
        try {
            const url = backendUrl + `/admin/teams/${id}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                fetchMemberCards();
                toast.success('Member deleted successfully');
            } else {
                setError('Failed to delete member');
                toast.error('Failed to delete member');
            }

        } catch (error) {
            console.error('Error deleting member:', error);
            setError('Failed to delete member');
            toast.error('Failed to delete member');
        }
    }

    const handleAddMember = async (close) => {

        if (!editMember.name || !editMember.designation || !editMember.position || !editMember.imageUrl || !editMember.experience || !editMember.certifiedBy || !editMember.linkedInUrl || !editMember.category) {
            setError('Please fill all fields');
            return;
        } else if (editMember.position < 1) {
            setError('Position should be greater than 0');
            return;
        } else if (!editMember.imageUrl.startsWith('http')) {
            setError('Invalid image URL, should start with http or https');
            return;
        } else if (!editMember.linkedInUrl.startsWith('http')) {
            setError('Invalid LinkedIn URL, should start with http or https');
            return;
        }
        setError('');

        try {
            const url = backendUrl + '/admin/teams';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                },
                body: JSON.stringify(editMember)
            }
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
                fetchMemberCards();
                toast.success('Member added successfully');
                setEditMember({
                    name: '',
                    designation: '',
                    category: '',
                    position: '',
                    imageUrl: '',
                    linkedInUrl: '',
                    experience: '',
                    certifiedBy: ''
                });
                close();
            } else {
                setError('Failed to add member');
                toast.error(data.error);
            }

        } catch (error) {
            console.error('Error adding member:', error);
            setError('Failed to add member');
            toast.error('Failed to add member');
        }
    }

    const closeUploadFilePopup = (close) => () => {
        close();
        setSuccessUpload(false);
        setImageUrl('');
    }

    const renderUploadFilePopUp = (close) => {
        return (
            <div className='faculty-popup'>
                <button className='faculty-popup-close' onClick={closeUploadFilePopup(close)}>&times;</button>
                <h1 className='faculty-popup-heading'>Upload Image</h1>
                {
                    successUpload ? 
                    <p className='member-image-url'>{imageUrl}</p>
                    :
                    <div className='faculty-popup-form'>
                        <label className='faculty-image-label' htmlFor='file'>{file !== null ? file.name : "Choose File"}</label>
                        <input type='file' id='file' accept='image/*' onChange={handleFileChange} />
                        <button className='faculty-popup-button' type='button' onClick={() => uploadImage(file)}>Upload</button>
                    </div>
                }
            </div>
        )
    }

    const renderEditMemberPopUp = (close) => {
        return (
            <div className='faculty-popup'>
                <button className='faculty-popup-close' onClick={close}>&times;</button>
                <h1 className='faculty-popup-heading'>{editFormType ? "Edit" : "Add"} Member</h1>
                <div className='faculty-popup-form'>
                    <label className='faculty-popup-label' htmlFor='name'>Name</label>
                    <input className='faculty-popup-input' type='text' id='name' name='name' placeholder='your answer' value={editMember.name} onChange={handleInputChange} />
                    <label className='faculty-popup-label' htmlFor='designation'>Designation</label>
                    <input className='faculty-popup-input' type='text' id='designation' name='designation'  placeholder='your answer' value={editMember.designation} onChange={handleInputChange}/>
                    <label className='faculty-popup-label' htmlFor='category'>Category</label>
                    <select className='faculty-popup-input' id='category' name='category' value={editMember.category} onChange={handleInputChange}>
                        <option value=''>Select Category</option>
                        <option value='Senior Recruiter'>Senior Recruiter</option>
                        <option value='Lead Recruiter'>Lead Recruiter</option>
                        <option value='Freelance Recruiter'>Freelance Recruiter</option>
                        <option value='Agency'>Agency</option>
                        <option value='Operating Team'>Operating Team</option>
                    </select>
                    <label className='faculty-popup-label' htmlFor='experience'>Experience In Years</label>
                    <input className='faculty-popup-input' type='number' id='experience' name='experience'  placeholder='your answer' value={editMember.experience} onChange={handleInputChange}/>
                    <label className='faculty-popup-label' htmlFor='position'>Order</label>
                    <input className='faculty-popup-input' type='number' id='position' name='position'  placeholder='your answer' value={editMember.position} onChange={handleInputChange}/>
                    <label className='faculty-popup-label' htmlFor='certifiedBy'>Certified By</label>
                    <input className='faculty-popup-input' type='text' id='certifiedBy' name='certifiedBy'  placeholder='your answer' value={editMember.certifiedBy} onChange={handleInputChange}/>
                    <label className='faculty-popup-label' htmlFor='image'>Image URL</label>
                    <input className='faculty-popup-input' type='text' id='image' name='imageUrl'  placeholder='your answer' value={editMember.imageUrl} onChange={handleInputChange}/>
                    <label className='faculty-popup-label' htmlFor='linkedIn'>LinkedIn URL</label>
                    <input className='faculty-popup-input' type='text' id='linkedIn' name='linkedInUrl'  placeholder='your answer' value={editMember.linkedInUrl} onChange={handleInputChange}/>
                    {error && <p className='faculty-popup-error'>{error}</p>}
                    <button className='faculty-popup-button' type='button'  onClick={editFormType ? () => handleEditMember(close) : () => handleAddMember(close)}>{editFormType ? "Save" : "Add"}</button>
                </div>
            </div>
        )
    }

    const renderDeleteMemberPopUp = (close, id) => (
        <div className='faculty-popup'>
            <button className='faculty-popup-close' onClick={close}>&times;</button>
            <h1 className='faculty-popup-heading'>Delete Member</h1>
            <div className='faculty-popup-form'>
                <p className='team-popup-text'>Are you sure you want to delete this member?</p>
                <div className='team-delete-popup-buttons-con'>
                    <button className='faculty-popup-button' type='button' onClick={close}>Cancel</button>
                    <button className='faculty-popup-button' type='button' onClick={() => handleDeleteMember(id)}>Delete</button>
                </div>
            </div>
        </div>
    )

    const renderTeamCards = () => (
        <>
        <ul className='team-list'>
            {
                memberCards.map(member => (
                    <li className='team-item' key={member.id}>
                        <img src={member.imageUrl} alt='team' className='team-image' />
                        <div className='team-details'>
                            <p className='member-name'>{member.name}</p>
                            <p className='member-designation'><span className='member-span'>Designation: </span> {member.designation}</p>
                            <p className='member-designation'><span className='member-span'>Experience: </span> {member.experience}</p>
                            <p className='member-designation'><span className='member-span'>Certified By: </span> {member.certifiedBy}</p>
                            <p className='member-designation'><span className='member-span'>Order: </span> {member.position}</p>
                            <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className='member-linkedin'><FaLinkedin className='linkedin-iconn' /></a>
                            <div className='faculty-buttons-con'>
                                <Popup
                                    trigger={<button className='faculty-button'>Edit</button>}
                                    modal
                                    onOpen={() => {
                                        setEditMember(member)
                                        setEditFormType(true)
                                    }}
                                >
                                    {close => (
                                    <div className="modal">
                                        {renderEditMemberPopUp(close)}
                                    </div>
                                    )}
                                </Popup>
                                <Popup
                                    trigger={<button className='faculty-button'>Delete</button>}
                                    modal
                                >
                                    {close => (
                                    <div className="modal">
                                        {renderDeleteMemberPopUp(close, member.id)}
                                    </div>
                                    )}
                                </Popup>
                                
                            </div>
                        </div>
                    </li>
                ))
            }
            
        </ul>
        </>
    )

    const renderNoMembers = () => (
        <div className='no-members-con'>
            <p className='no-members-text'>No team members available</p>
        </div>
    )

    const renderLoading = () => (
        <div className="no-members-con">
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#EB6A4D"
                secondaryColor="#EB6A4D"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )

    const renderFailure = () => (
        <div className="no-members-con">
            <p className='no-members-text'>Failed to load the page. Please try again later.</p>
            <button className='retry-button' onClick={fetchMemberCards}>Try Again</button>
        </div>
    )

    const renderSwitch = () => {
        switch (apiStatus) {
            case apiStatusConstants.loading:
                return renderLoading();
            case apiStatusConstants.success:
                return memberCards.length > 0 ? renderTeamCards() : renderNoMembers();
            case apiStatusConstants.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    if(Cookies.get('role') !== 'ADMIN') return (<Redirect to='/' />);

    return (
        <div className="control-homepage-con">
            <div className='admin-test-page-content faculty-head-con'>
                <h1 className='team-heading' style={{marginBottom: "0px"}}>Team</h1>
                <div className='faculty-head-buttons-con'>
                    <Popup
                        trigger={<button className='add-team-button'>Add New Member</button>}
                        modal
                        onOpen={() => {
                                setEditMember({
                                name: '',
                                designation: '',
                                position: '',
                                imageUrl: '',
                                linkedInUrl: '',
                                experience: '',
                                certifiedBy: ''
                            })
                            setEditFormType(false)
                            }
                        }
                    >
                        {close => (
                        <div className="modal">
                            {renderEditMemberPopUp(close)}
                        </div>
                        )}
                    </Popup>
                    <Popup
                        trigger={<button className='add-team-button gen-img-btn'>Upload Image</button>}
                        modal
                    >
                        {close => (
                        <div className="modal">
                            {renderUploadFilePopUp(close)}
                        </div>
                        )}
                    </Popup>
                </div>
            </div>
            {renderSwitch()}
        </div>
    );
}

export default ControlTeamPage;