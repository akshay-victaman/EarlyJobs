import React from 'react';
import Select from 'react-select';
import Profile from '../Profile'
import EmploymentTypeList from '../EmploymentTypeList'
import SalaryRangeList from '../SalaryRangeList'
import IndustryTypeList from '../IndustryTypeList'
import WorkPlaceTypeList from '../WorkPlaceTypeList'
import './style.css'

const customStyles = {
  control: (provided, state) => ({
      ...provided,
      border: '1px solid #EB6A4D',
      borderRadius: '5px',
      boxShadow: null,
      '&:hover': {
          borderColor: '#EB6A4D',
      },
      marginBottom: '16px',
      width: '100%',
      height: '35px',
      minHeight: '35px',
      fontSize: '14px'
  }),
  menu: (provided, state) => ({
      ...provided,
      marginTop: '0px',
      paddingTop: '0px',
  }),
  dropdownIndicator: (provided) => ({
      ...provided,
      color: '#EB6A4D',
      '&:hover': {
          color: '#EB6A4D',
      },
      width: '15px',
      padding: '0px',
      margin: '0px',
      border: '0px',
  }),
  option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#EB6A4D' : null,
      color: state.isSelected ? 'white' : 'black',
  }),
};

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

const industryList = [
  {
    industryId: 'IT',
    label: 'IT',
  },
  {
    industryId: 'NON-IT',
    label: 'NON-IT',
  },
  {
    industryId: 'BPO',
    label: 'BPO',
  }
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
  }
]

const FilterJobs = props => {
  const {
    onSelectArchieve,
    archieve,
    onSelectEmploymentType,
    onChangeSalaryRange,
    onSelectIndustryType,
    onSelectWorkPlaceType,
    onShowCandidateForm,
    onClickFilter,
    showCandidateForm,
    pageType,
    companyList,
    locationList,
    titleList,
    companyName,
    location,
    title,
    onChangecompanyName,
    onChangelocation,
    onChangetitle
  } = props

  const handleCompanyChange = (value) => {
    if(value === null) {
      value = {value: ''}
    }
    onChangecompanyName(value.value)
  };

  const handleLocationChange = (value) => {
    if(value === null) {
      value = {value: ''}
    }
    onChangelocation(value.value)
  }

  const handleTitleChange = (value) => {
    if(value === null) {
      value = {value: ''}
    }
    onChangetitle(value.value)
  }

  const companyObj = companyList.find(eachItem => eachItem.value === companyName)
  const locationObj = locationList.find(eachItem => eachItem.value === location)
  const titleObj = titleList.find(eachItem => eachItem.value === title)

  return (
    <div className="profile-filters-container">
      {
        pageType === 'JOBS' && (
          <>
            <Profile onShowCandidateForm={onShowCandidateForm} onClickFilter={onClickFilter} showCandidateForm={showCandidateForm} />
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
          </>
        )
      }

      <h1 className="filter-jobs-heading-search">Company</h1>
      <Select
          isClearable
          onChange={handleCompanyChange}
          options={companyList}
          placeholder="Search Company"
          styles={customStyles}
          value={companyObj}
      />

      <h1 className="filter-jobs-heading-search">Location</h1>
      <Select
          isClearable
          onChange={handleLocationChange}
          options={locationList}
          placeholder="Search Location"
          styles={customStyles}
          value={locationObj}
      />

      <h1 className="filter-jobs-heading-search">Job Title</h1>
      <Select
          isClearable
          onChange={handleTitleChange}
          options={titleList}
          placeholder="Search Job Title"
          styles={customStyles}
          value={titleObj}
      />
      
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
      {/* <h1 className="filter-jobs-heading">Location Range</h1>
      <ul className="filter-jobs-employment-type-list">
        {locationList.map(eachItem => (
          <LocationTypeList
            key={eachItem.locationId}
            onSelectLocataionType={onSelectLocataionType}
            locationTypeItem={eachItem}
          />
        ))}
      </ul>
      <hr className="line" /> */}
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