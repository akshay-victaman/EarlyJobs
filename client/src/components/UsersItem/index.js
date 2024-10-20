import Popup from 'reactjs-popup';
import { FaEdit } from "react-icons/fa";


const UsersItem = ({userDetails, renderBlockUnblockPopup, renderChangePasswordPopup, renderChangePhonePopup, renderRoleHistoryPopup, renderChangeUserRolePopup}) => {
    const {username, email, role, location, phone, hiringFor, hiringCategory, shmEmail, hmEmail, createdAt, isBlocked} = userDetails;
    return (
        <tr className="users-table-data-row">
            <td data-cell='username' className="users-table-data">{username}</td>
            <td data-cell='email' className="users-table-data">{email}</td>
            <td data-cell='phone' className="users-table-data">
                {phone}
                <Popup
                    trigger={<button className="change-phone-button"><FaEdit className='change-phone-edit-icon' /></button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderChangePhonePopup(close, email)}
                    </div>
                    )}
                </Popup>
            </td>
            <td data-cell='role' className="users-table-data">
                <Popup
                    trigger={<button className="role-button">{role}</button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderRoleHistoryPopup(close, email)}
                    </div>
                    )}
                </Popup>
            </td>
            <td data-cell='hiring for' className="users-table-data">{hiringFor}</td>
            <td data-cell='location' className="users-table-data">{location}</td>
            <td data-cell='hiring category' className="users-table-data">{hiringCategory}</td>
            <td data-cell='Led by (SHM)' className="users-table-data">{shmEmail ? shmEmail : 'N/A'}</td>
            <td data-cell='Led by (HM)' className="users-table-data">{hmEmail ? hmEmail : 'N/A'}</td>
            <td data-cell='created At' className="users-table-data">{createdAt}</td>
            <td data-cell='change password' className="users-table-data">
                <Popup
                    trigger={<button className="block-user-button">Change</button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderChangePasswordPopup(close, email)}
                    </div>
                    )}
                </Popup>
            </td>
            <td data-cell='block/Unblock' className="users-table-data">
                <Popup
                    trigger={<button className="block-user-button">{isBlocked === 0 ? "Block" : "Unblock"}</button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderBlockUnblockPopup(close, email, isBlocked)}
                    </div>
                    )}
                </Popup>
            </td>
            <td data-cell='change role' className="users-table-data">
                <Popup
                    trigger={<button className="block-user-button">Change</button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderChangeUserRolePopup(close, email)}
                    </div>
                    )}
                </Popup>
            </td>
        </tr>
    )
}

export default UsersItem;