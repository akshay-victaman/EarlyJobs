

const CandidateItem = ({ candidate }) => {
    const { name, email, phone, createdAt } = candidate;
    return (
        <tr className="job-details-candidates-table-row">
            <td className="job-details-candidates-table-cell">
            {name}
            </td>
            <td className="job-details-candidates-table-cell">
            {email}
            </td>
            <td className="job-details-candidates-table-cell">
            {phone}
            </td>
            <td className="job-details-candidates-table-cell">
            {createdAt}
            </td>
        </tr>
    )
}

export default CandidateItem