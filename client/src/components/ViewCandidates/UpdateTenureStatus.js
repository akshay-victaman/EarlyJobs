
const UpdateTenureStatus = ({ candidate, onUpdate }) => {

  const handleUpdate = (e) => {
    onUpdate(candidate.applicationId, e.target.value);
  };

  return (
    <select className="homepage-input candidate-input-select" onChange={handleUpdate}>
        <option value=''>Select Tenure Status</option>
        <option value='Eligible'>Eligible</option>
        <option value='Not Eligible'>Not Eligible</option>
        <option value='Unknown'>Unknown</option>
    </select>
  );
}

export default UpdateTenureStatus;