import './style.css'

const LocationTypeList = ({locationTypeItem, onSelectLocataionType}) => {
  const {locationId, label} = locationTypeItem
  return (
    <li key={locationId} className="job-filter-employment-type-con">
      <input
        type="checkbox"
        id={locationId}
        className="job-filter-input-checkbox"
        value={locationId}
        onChange={onSelectLocataionType}
      />
      <label htmlFor={locationId} className="job-filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default LocationTypeList