import './style.css'

const WorkPlaceTypeList = ({workplaceTypeItem, onSelectWorkPlaceType}) => {
  const {workplaceTypeId, label} = workplaceTypeItem
  return (
    <li key={workplaceTypeId} className="job-filter-employment-type-con">
      <input
        type="checkbox"
        id={workplaceTypeId}
        className="job-filter-input-checkbox"
        value={workplaceTypeId}
        onChange={onSelectWorkPlaceType}
      />
      <label htmlFor={workplaceTypeId} className="job-filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default WorkPlaceTypeList