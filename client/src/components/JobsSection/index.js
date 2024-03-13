import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import {ThreeCircles} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import {BsSearch} from 'react-icons/bs'
import { FaFilter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import JobsCard from '../JobsCard'
import FilterJobs from '../FilterJobs'
import './style.css'
import SalaryRangeList from '../SalaryRangeList'
import UploadCandidatePage from '../UploadCandidatePage';
import ViewCandidates from '../ViewCandidates';
import Footer from '../Footer';
import { HiringManagerDetailsForm } from '../HiringManagerDetailsForm';
import MyHrRecruiters from '../MyHrRecruiters';
import CollegeAgency from '../CollegeAgencyForm/CollegeAgency';
import CollegeAgencyForm from '../CollegeAgencyForm';

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}


const JobsSection = ({onShowCandidateDetails}) => {

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;

    const [jobsList, setJobsList] = useState([])
    const [employmentTypeList, setEmploymentTypeList] = useState([])
    const [minimumPackageList, setMinimumPackageList] = useState([])
    const [industryTypeList, setIndustryTypeList] = useState([])
    const [locationTypeList, setLocationTypeList] = useState([])
    const [workPlaceType, setWorkPlaceType] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [archieve, setArchieve] = useState(false)
    const [showCandidateForm, setShowCandidateForm] = useState(0)
    const [page, setPage] = useState(initialPage)
    const [totalItems, setTotalItems] = useState(0);
    const [showFilter, setShowFilter] = useState(false)


  useEffect(() => {
    getJobsCard()
    updateUrl(page);
    }, [employmentTypeList, minimumPackageList, page])

  const archieveJobs = () => {
    console.log(archieve)
    if(archieve) {
      setJobsList(jobsList.filter(eachJob => eachJob.status === 'ARCHIVED'))
    } else {
      getJobsCard()
    }
  }

  const onShowCandidateForm = (status) => {
    setShowCandidateForm(status)
  }

  const onClickFilter = () => {
    setShowFilter(!showFilter)
  }

  const onSelectArchieve = async () => {
    await setArchieve(!archieve, archieveJobs())
    // archieveJobs()
  }

  const onSelectEmploymentType = event => {
    if (employmentTypeList.includes(event.target.value)) {
      const newEmploymentTypeList = employmentTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setEmploymentTypeList(newEmploymentTypeList)
    } else {
      setEmploymentTypeList([...employmentTypeList, event.target.value])
    }
  }

  const onSelectIndustryType = event => {
    if (industryTypeList.includes(event.target.value)) {
      const newIndustryTypeList = industryTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setIndustryTypeList(newIndustryTypeList)
    } else {
      setIndustryTypeList([...industryTypeList, event.target.value])
    }
  }

  const onSelectLocataionType = event => {
    if (locationTypeList.includes(event.target.value)) {
      const newLocationTypeList = locationTypeList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setLocationTypeList(newLocationTypeList)
    } else {
      setLocationTypeList([...locationTypeList, event.target.value])
    }
  }

  const onSelectWorkPlaceType = event => {
    if (workPlaceType.includes(event.target.value)) {
      const newWorkPlaceTypeList = workPlaceType.filter(
        eachItem => eachItem !== event.target.value,
      )
      setWorkPlaceType(newWorkPlaceTypeList)
    } else {
      setWorkPlaceType([...workPlaceType, event.target.value])
    }
  }

  const onChangeSalaryRange = event => {
    if (minimumPackageList.includes(event.target.value)) {
      const newMinimumPackageList = minimumPackageList.filter(
        eachItem => eachItem !== event.target.value,
      )
      setMinimumPackageList(newMinimumPackageList)
    } else {
      setMinimumPackageList([...minimumPackageList, event.target.value])
    }
  }

  const onToggleFilter = () => {
    setToggleFilter(!toggleFilter)
  }

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const onKeyEnter = event => {
    if (event.key === 'Enter') {
      getJobsCard()
    }
  }

  const onClickButton = () => {
    getJobsCard()
  }

  const getJobsCard = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const username = Cookies.get('username') 
    const email = Cookies.get('email')
    const role = Cookies.get('role')
    let apiUrl = ""
    if (role === 'AC') {
      apiUrl = `${backendUrl}/jobs/account-manager/${email}/?page=${page}`
    } else if (role === 'HR') {
      apiUrl = `${backendUrl}/jobs/hr/${email}/?page=${page}`
    } else if (role === 'BDE') {
      apiUrl = `${backendUrl}/jobs/bde/${email}/?page=${page}`
    } else {
      apiUrl = `${backendUrl}/admin/get-jobs/all/?page=${page}`
    }
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log('api data', data)
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
      } else {
        /*
        assigned_to
        category
        commission_fee
        commission_type
        company_name
        created_at
        description
        employment_type
        hiring_need
        id
        location
        max_salary
        min_salary
        no_of_openings
        posted_by
        skills
        status
        title
        updated_at
        work_type
        */
        const updatedData = data.jobs.map(eachItem => ({
          id: eachItem.id,
          companyLogoUrl: eachItem.company_logo_url,
          category: eachItem.category,
          commissionType: eachItem.commission_type,
          commissionFee: eachItem.commission_fee,
          compname: eachItem.company_name,
          minSalary: eachItem.min_salary,
          maxSalary: eachItem.max_salary,
          noOfOpenings: eachItem.no_of_openings,
          employmentType: eachItem.employment_type,
          jobDescription: eachItem.description,
          location: eachItem.location,
          role: eachItem.title,
          workType: eachItem.work_type,
          hiringNeed: eachItem.hiring_need,
          postedBy: eachItem.posted_by,
          skills: eachItem.skills,
          status: eachItem.status,
          createdAt: eachItem.created_at,
        }))
        console.log('updated data',updatedData)

        setJobsList(updatedData)
        setTotalItems(data.count)
        setApiStatus(apiStatusConstant.success)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
    }
  }

  const itemsPerPage = 10; 

  const handlePageChange = (page) => {
    setPage(page)
  };

  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return (
        <button className={`pagination-button ${current === page ? "activePage" : ""}`} key={current} onClick={() => handlePageChange(current)}>
          {current}
        </button>
      );
    }

    if (type === 'prev') {
      return (
        <button className={`pagination-button ${page === 1 ? "endPage" : ""}`} title="Previous" key="prev" onClick={() => handlePageChange(current - 1)}>
          {'< Prev'}
        </button>
      );
    }

    if (type === 'next') {
      return (
        <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
          {'Next >'}
        </button>
      );
    }

    if (type === 'jump-prev' || type === 'jump-next') {
      return <span className="pagination-dots" title='more'>...</span>;
    }

    return element;
  };

  const updateUrl = (page) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    window.history.pushState({}, '', url);
  };

  const renderJobsCards = () => {
    const noJobs = jobsList.length === 0

    return (
      <>
        <div className="jobs-section-container">
          {noJobs ? (
            renderNoJobFound()
          ) : (
            <ul className="jobs-card-list">
              {jobsList.map(eachJob => (
                <JobsCard key={eachJob.id} jobsItem={eachJob} />
              ))}
            </ul>
          )}
        </div>
        <Pagination
          current={page}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          className="pagination-class"
          itemRender={itemRender}
          showSizeChanger
        />
      </>
    )
  }

  const renderNoJobFound = () => (
    <div className="jobs-failure-container">
      <img
        src="/no-data-found.jpg"
        alt="no jobs"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">No Jobs Found</h1>
      <p className="jobs-failure-desc">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  const renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="/failure-img.avif"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="jobs-failure-retry-button"
        onClick={getJobsCard}
      >
        Retry
      </button>
    </div>
  )

  const renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
    </div>
  )

  const renderAllSections = () => {
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return renderLoader()
      case apiStatusConstant.success:
        return renderJobsCards()
      case apiStatusConstant.failure:
        return renderJobsFailure()
      default:
        return null
    }
  }

    const role = Cookies.get('role')
    const userDetailsId = Cookies.get('user_details_id')
    return (
      <div className="jobs-section-container">
        {/* <div className='filter-button-con'>
          <button className='filter-button' onClick={onToggleFilter}>
            {
              toggleFilter ? 
              (
                <IoClose className='close-icon' />
              ) : (
                <FaFilter className='filter-icon' />
              )
            }
            <span className='filter-text'>{toggleFilter ? 'Close' : 'Filter'}</span>
          </button>
        </div> */}
        {/* {
          toggleFilter ? 
          (
            <div className="jobs-section-profile-filter-con">
              <FilterJobs
              onSelectEmploymentType={onSelectEmploymentType}
              onChangeSalaryRange={onChangeSalaryRange}
              onSelectIndustryType={onSelectIndustryType}
              onSelectLocataionType={onSelectLocataionType}
              onSelectWorkPlaceType={onSelectWorkPlaceType}
              onChangeInput={onChangeInput}
              onKeyEnter={onKeyEnter}
              onClickButton={onClickButton}
            />
            </div>
          ) : (
            ""
          )
        } */}

        <div className={`jobs-section-filter-mobile-overlay ${showFilter===false ? "jobs-section-filter-mobile-hidden" : ""}`} onClick={onClickFilter}></div>
        <div className={`jobs-section-profile-filter-con jobs-section-filter-mobile ${showFilter===false ? "jobs-section-filter-mobile-hidden" : ""}`}>
              <FilterJobs
              onSelectArchieve={onSelectArchieve}
              archieve={archieve}
              onSelectEmploymentType={onSelectEmploymentType}
              onChangeSalaryRange={onChangeSalaryRange}
              onSelectIndustryType={onSelectIndustryType}
              onSelectLocataionType={onSelectLocataionType}
              onSelectWorkPlaceType={onSelectWorkPlaceType}
              onChangeInput={onChangeInput}
              onKeyEnter={onKeyEnter}
              onClickButton={onClickButton}
              onShowCandidateForm={onShowCandidateForm}
              onClickFilter={onClickFilter}
            />
            <button type='button' className='job-section-filter-close-button' onClick={onClickFilter}><MdKeyboardDoubleArrowLeft className='job-section-filter-close-icon' /></button>
        </div>
          
        <button type='button' className='job-section-filter-button' onClick={onClickFilter}>
          <IoFilter className='filter-icon' />
          <span className='filter-text-btn'>Filter Jobs</span>
        </button>
        
        <div className={`job-section-search-card-con ${showCandidateForm === 1 ? "job-section-candidate": ""}`}>
          {/* <div className="search-box-desk-con">
            <input
              type="search"
              placeholder="Search"
              className="search-box"
              onChange={onChangeInput}
              //   value={searchInput}
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
          {
            userDetailsId === 'TBF' ? <HiringManagerDetailsForm />
            : (userDetailsId === 'CLG' || userDetailsId === 'AGY') ? <CollegeAgencyForm />
            : showCandidateForm===1 ? <UploadCandidatePage setShowCandidateForm={setShowCandidateForm} jobsList={jobsList} /> 
            : showCandidateForm===2 ? <ViewCandidates onShowCandidateDetails={onShowCandidateDetails} jobsList={jobsList} setShowCandidateForm={setShowCandidateForm}/> 
            : showCandidateForm===3 ? <MyHrRecruiters setShowCandidateForm={setShowCandidateForm} />
            : renderAllSections()
          }
          {/* <Footer /> */}
        </div>
      </div>
    )
}

export default JobsSection