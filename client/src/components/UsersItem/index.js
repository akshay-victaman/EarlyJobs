import Popup from 'reactjs-popup';


const UsersItem = ({userDetails, renderBlockUnblockPopup}) => {
    const {username, email, role, location, hiringCtc, industry, createdAt, isBlocked} = userDetails;
    return (
        <tr className="users-table-data-row">
            <td data-cell='username' className="users-table-data">{username}</td>
            <td data-cell='email' className="users-table-data">{email}</td>
            <td data-cell='role' className="users-table-data">{role}</td>
            <td data-cell='location' className="users-table-data">{location}</td>
            <td data-cell='hiring CTC' className="users-table-data">{hiringCtc}</td>
            <td data-cell='industry' className="users-table-data">{industry}</td>
            <td data-cell='created At' className="users-table-data">{createdAt}</td>
            <td data-cell='block/Unblock' className="users-table-data">
            <Popup
                trigger={<button className="block-user-button">{isBlocked === 0 ? "Block" : "Unblock"}</button>}
                modal
            >
                {close => (
                <div className="modal">
                    <button className="modal-close-button" onClick={close}>
                    &times;
                    </button>
                    {renderBlockUnblockPopup(close, email, isBlocked)}
                </div>
                )}
            </Popup>
            </td>
        </tr>
    )
}

export default UsersItem;