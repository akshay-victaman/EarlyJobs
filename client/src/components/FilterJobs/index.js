import {BsSearch} from 'react-icons/bs'
import Profile from '../Profile'
import EmploymentTypeList from '../EmploymentTypeList'
import SalaryRangeList from '../SalaryRangeList'
import './style.css'
import IndustryTypeList from '../IndustryTypeList'
import LocationTypeList from '../LocationTypeList'
import WorkPlaceTypeList from '../WorkPlaceTypeList'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
  {
    label: 'Contract',
    employmentTypeId: 'CONTRACT',
  }
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationList = [
  {
    locationId: '0-100',
    label: '0-100km',
  },
  {
    locationId: '100-200',
    label: '100-200km',
  },
  {
    locationId: '200-300',
    label: '200-300km',
  },
  {
    locationId: '300-400',
    label: '300-400km',
  },
  {
    locationId: '400+',
    label: '400+km',
  },
]

const industryList = [
  {
    industryId: 'IT',
    label: 'IT',
  },
  {
    industryId: 'NON-IT',
    label: 'NON-IT',
  },
]

const workplaceTypeList = [
  {
    workplaceTypeId: 'REMOTE',
    label: 'Remote',
  },
  {
    workplaceTypeId: 'ONSITE',
    label: 'On-site',
  },
  {
    workplaceTypeId: 'HYBRID',
    label: 'Hybrid',
  },
  {
    workplaceTypeId: 'ANYWHERE',
    label: 'Anywhere',
  },
]

const FilterJobs = props => {
  const {
    onSelectArchieve,
    archieve,
    onSelectEmploymentType,
    onChangeSalaryRange,
    onSelectIndustryType,
    onSelectLocataionType,
    onSelectWorkPlaceType,
    onKeyEnter,
    onChangeInput,
    onClickButton,
    onShowCandidateForm,
    onClickFilter
  } = props
  return (
    <div className="profile-filters-container">
      {/* <div className="search-box-mobile-con">
        <input
          type="search"
          placeholder="Search"
          className="search-box"
          onChange={onChangeInput}
          onKeyDown={onKeyEnter}
        />
        <button
          type="button"
          className="search-icon-con"
          onClick={onClickButton}
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div> */}
      <Profile onShowCandidateForm={onShowCandidateForm} onClickFilter={onClickFilter} />
      <hr className="line" />
      <h1 className="filter-jobs-heading">Archieve</h1>
      <ul className="filter-jobs-employment-type-list">
        <li className="job-filter-employment-type-con">
          <input
            type="checkbox"
            id='ARCHIEVED'
            className="job-filter-input-checkbox"
            checked={archieve}
            onChange={onSelectArchieve}
          />
          <label htmlFor='ARCHIEVED' className="job-filter-input-label">Archieved</label>
        </li>
      </ul>
      <hr className="line" />
      <h1 className="filter-jobs-heading">Type of Employment</h1>
      <ul className="filter-jobs-employment-type-list">
        {employmentTypesList.map(eachItem => (
          <EmploymentTypeList
            key={eachItem.employmentTypeId}
            employmentTypeItem={eachItem}
            onSelectEmploymentType={onSelectEmploymentType}
          />
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filter-jobs-heading">Salary Range</h1>
      <ul className="filter-jobs-employment-type-list">
        {salaryRangesList.map(eachItem => (
          <SalaryRangeList
            key={eachItem.salaryRangeId}
            onChangeSalaryRange={onChangeSalaryRange}
            salaryRangeItem={eachItem}
          />
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filter-jobs-heading">Industry Type</h1>
      <ul className="filter-jobs-employment-type-list">
        {industryList.map(eachItem => (
          <IndustryTypeList
            key={eachItem.industryId}
            onSelectIndustryType={onSelectIndustryType}
            industryItem={eachItem}
          />
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filter-jobs-heading">Location Range</h1>
      <ul className="filter-jobs-employment-type-list">
        {locationList.map(eachItem => (
          <LocationTypeList
            key={eachItem.locationId}
            onSelectLocataionType={onSelectLocataionType}
            locationTypeItem={eachItem}
          />
        ))}
      </ul>
      <hr className="line" />
      <h1 className="filter-jobs-heading">Work Place Type</h1>
      <ul className="filter-jobs-employment-type-list">
        {workplaceTypeList.map(eachItem => (
          <WorkPlaceTypeList
            key={eachItem.workplaceTypeId}
            onSelectWorkPlaceType={onSelectWorkPlaceType}
            workplaceTypeItem={eachItem}
          />
        ))}
      </ul>
    </div>
  )
}

export default FilterJobs