import './style.css'

const EmploymentTypeList = ({employmentTypeItem, onSelectEmploymentType}) => {
  const {employmentTypeId, label} = employmentTypeItem
  return (
    <li key={employmentTypeId} className="job-filter-employment-type-con">
      <input
        type="checkbox"
        id={employmentTypeId}
        className="job-filter-input-checkbox"
        value={employmentTypeId}
        onChange={onSelectEmploymentType}
      />
      <label htmlFor={employmentTypeId} className="job-filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeList