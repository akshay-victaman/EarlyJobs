import Popup from 'reactjs-popup';
import { FaEdit } from "react-icons/fa";


const UsersItem = ({userDetails, renderBlockUnblockPopup, renderChangePasswordPopup, renderChangePhonePopup}) => {
    const {username, email, role, location, phone, hiringFor, hiringCategory, createdAt, isBlocked} = userDetails;
    return (
        <tr className="users-table-data-row">
            <td data-cell='username' className="users-table-data">{username}</td>
            <td data-cell='email' className="users-table-data">{email}</td>
            <td data-cell='hiring CTC' className="users-table-data">
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
            <td data-cell='role' className="users-table-data">{role}</td>
            <td data-cell='role' className="users-table-data">{hiringFor}</td>
            <td data-cell='location' className="users-table-data">{location}</td>
            <td data-cell='industry' className="users-table-data">{hiringCategory}</td>
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
        </tr>
    )
}

export default UsersItem;