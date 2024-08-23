import Popup from "reactjs-popup";


const CandidateItem = ({ candidate, updateCandidateIsJoined, onShowCandidateDetails, onShowCandidateApplications }) => {
    const { id, name, fatherName, isJoined, email, phone, createdAt } = candidate;

    const onClickIsJoined = async () => {
        const newIsJoined = isJoined === 1 ? 0 : 1;
        await updateCandidateIsJoined(id, newIsJoined);
    }

    return (
        <tr className="users-table-data-row">
            <td data-cell='name' className="users-table-data users-active-col" onClick={() => onShowCandidateDetails(id)}>
            {name}
            </td>
            <td data-cell='father name' className="users-table-data">
            {fatherName}
            </td>
            <td data-cell='email' className="users-table-data">
            {email}
            </td>
            <td data-cell='phone' className="users-table-data">
            {phone}
            </td>
            <td data-cell='created at' className="users-table-data">
            {createdAt}
            </td>
            <td data-cell='is joined' className="users-table-data">
                <button className="block-user-button" onClick={onClickIsJoined}>Set as {isJoined === 1 ? 'Open' : 'Joined'}</button>
            </td>
            <td data-cell='applications' className="users-table-data">
                <button className="block-user-button" onClick={() => onShowCandidateApplications(id)}>View</button>
            </td>
            {/* <td data-cell='actions' className="users-table-data">
                <Popup
                    trigger={<button className="block-user-button">Edit</button>}
                    modal
                >
                    {close => (
                    <div className="modal">
                        {renderChangePasswordPopup(close, email)}
                    </div>
                    )}
                </Popup>
            </td> */}
        </tr>
    )
}

export default CandidateItem