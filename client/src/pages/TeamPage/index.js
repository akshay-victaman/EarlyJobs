import React, { useEffect, useState } from 'react'
import { FaLinkedin } from "react-icons/fa";
import './style.css'
import { MutatingDots } from 'react-loader-spinner';

const apiStatusConstants = {
    initial: 'INITIAL',
    loading: 'LOADING',
    success: 'SUCCESS',
    failure: 'FAILURE'
}

const TeamPage = () => {

    const [teamMembers, setTeamMembers] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

    useEffect(() => {
        fetchMemberCards();
        window.scrollTo(0, 0)
        document.title = 'EarlyJobs | Team'
    }, [])

    const fetchMemberCards = async () => {
        try {
            setApiStatus(apiStatusConstants.loading);
            const url = process.env.REACT_APP_BACKEND_API_URL + '/admin/teams';
            const response = await fetch(url);
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
                setTeamMembers(formattedData);
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

    const renderTeamCards = () => { 
        const seniorRecruiters = teamMembers.filter(member => member.category === 'Senior Recruiter');
        const leadRecruiters = teamMembers.filter(member => member.category === 'Lead Recruiter');
        const freelanceRecruiters = teamMembers.filter(member => member.category === 'Freelance Recruiter');
        const agency = teamMembers.filter(member => member.category === 'Agency');
        const operatingTeam = teamMembers.filter(member => member.category === 'Operating Team');
        return (
            <div className="team-page__content">
                {seniorRecruiters.length > 0 &&
                <>
                    <h1 className='team-page-subheading'>Senior Recruiters</h1>
                    <ul className='team-page-list'>
                        {seniorRecruiters.map(member => (
                            <li className='team-page-item' key={member.id}>
                                <img src={member.imageUrl} alt="Team Member 1" draggable='false' className='team-member-image' />
                                <div className='team-member-content'>
                                    <h3 className='team-member-name'>{member.name}</h3>
                                    <p className='team-member-role'>{member.designation}</p>
                                    <p className='team-member-experience'>{member.experience}+ years of experience</p>
                                    <hr className='team-member-hr-line' />
                                    <p className='team-member-experience'>Certified By - <span className='team-member-certified-span'>{member.certifiedBy}</span></p>
                                    <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className='team-member-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className='team-page-hr-line' />
                </>
                }

                {leadRecruiters.length > 0 &&
                <>
                    <h1 className='team-page-subheading'>Lead Recruiters</h1>
                    <ul className='team-page-list'>
                        {leadRecruiters.map(member => (
                            <li className='team-page-item' key={member.id}>
                                <img src={member.imageUrl} alt="Team Member 1" draggable='false' className='team-member-image' />
                                <div className='team-member-content'>
                                    <h3 className='team-member-name'>{member.name}</h3>
                                    <p className='team-member-role'>{member.designation}</p>
                                    <p className='team-member-experience'>{member.experience}+ years of experience</p>
                                    <hr className='team-member-hr-line' />
                                    <p className='team-member-experience'>Certified By - <span className='team-member-certified-span'>{member.certifiedBy}</span></p>
                                    <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className='team-member-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className='team-page-hr-line' />
                </>
                }

                {freelanceRecruiters.length > 0 &&
                <>
                    <h1 className='team-page-subheading'>Freelance Recruiters</h1>
                    <ul className='team-page-list'>
                        {freelanceRecruiters.map(member => (
                            <li className='team-page-item' key={member.id}>
                                <img src={member.imageUrl} alt="Team Member 1" draggable='false' className='team-member-image' />
                                <div className='team-member-content'>
                                    <h3 className='team-member-name'>{member.name}</h3>
                                    <p className='team-member-role'>{member.designation}</p>
                                    <p className='team-member-experience'>{member.experience}+ years of experience</p>
                                    <hr className='team-member-hr-line' />
                                    <p className='team-member-experience'>Certified By - <span className='team-member-certified-span'>{member.certifiedBy}</span></p>
                                    <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className='team-member-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className='team-page-hr-line' />
                </>
                }

                {agency.length > 0 &&
                <>
                    <h1 className='team-page-subheading'>Agency</h1>
                    <ul className='team-page-list'>
                        {agency.map(member => (
                            <li className='team-page-item' key={member.id}>
                                <img src={member.imageUrl} alt="Team Member 1" draggable='false' className='team-member-image' />
                                <div className='team-member-content'>
                                    <h3 className='team-member-name'>{member.name}</h3>
                                    <p className='team-member-role'>{member.designation}</p>
                                    <p className='team-member-experience'>{member.experience}+ years of experience</p>
                                    <hr className='team-member-hr-line' />
                                    <p className='team-member-experience'>Certified By - <span className='team-member-certified-span'>{member.certifiedBy}</span></p>
                                    <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className='team-member-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <hr className='team-page-hr-line' />
                </>
                }

                {operatingTeam.length > 0 &&
                <>
                    <h1 className='team-page-subheading'>Operating Team</h1>
                    <ul className='team-page-list'>
                        {operatingTeam.map(member => (
                            <li className='team-page-item' key={member.id}>
                                <img src={member.imageUrl} alt="Team Member 1" draggable='false' className='team-member-image' />
                                <div className='team-member-content'>
                                    <h3 className='team-member-name'>{member.name}</h3>
                                    <p className='team-member-role'>{member.designation}</p>
                                    <p className='team-member-experience'>{member.experience}+ years of experience</p>
                                    <hr className='team-member-hr-line' />
                                    <p className='team-member-experience'>Certified By - <span className='team-member-certified-span'>{member.certifiedBy}</span></p>
                                    <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className='team-member-linkedin'><FaLinkedin className='linkedin-icon' /></a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
                }
            </div>
        )
    }

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
                return teamMembers.length > 0 ? renderTeamCards() : renderNoMembers();
            case apiStatusConstants.failure:
                return renderFailure();
            default:
                return null;
        }
    }

    return (
        <div className="privacy-policy-page">
            <div className="privacy-policy-page__background">
                <h1 className='privacy-policy-heading'>Meet Our Team</h1>
            </div>
            {renderSwitch()}
        </div>
    )
}

export default TeamPage