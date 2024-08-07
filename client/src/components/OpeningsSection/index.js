import { useState, useEffect } from 'react'
import {ThreeCircles} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import {BsSearch} from 'react-icons/bs'
import { FaFilter } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import FilterJobs from '../FilterJobs'
import SalaryRangeList from '../SalaryRangeList'
import PublicJobsCard from '../PublicJobsCard';


const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}


const OpeningsSection = () => {

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
    const initialCompanyName = new URLSearchParams(window.location.search).get('company') || "";
    const initialJobTitle = new URLSearchParams(window.location.search).get('title') || "";
    const initialLocation = new URLSearchParams(window.location.search).get('location') || "";

    const [jobsList, setJobsList] = useState([])
    const [employmentTypeList, setEmploymentTypeList] = useState([])
    const [minimumPackageList, setMinimumPackageList] = useState([])
    const [industryTypeList, setIndustryTypeList] = useState([])
    const [locationTypeList, setLocationTypeList] = useState([])
    const [workPlaceType, setWorkPlaceType] = useState([])
    const [searchInput, setSearchInput] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [toggleFilter, setToggleFilter] = useState(false)
    const [page, setPage] = useState(initialPage)
    const [totalItems, setTotalItems] = useState(0);
    const [showFilter, setShowFilter] = useState(false)
    const [companyList, setCompanyList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [titleList, setTitleList] = useState([]);
    const [companyName, setCompanyName] = useState(initialCompanyName);
    const [location, setLocation] = useState(initialLocation);
    const [title, setTitle] = useState(initialJobTitle);
  

  useEffect(() => {
    setCompanyName(initialCompanyName)
    setLocation(initialLocation)
    setTitle(initialJobTitle)
  }, [initialCompanyName, initialLocation, initialJobTitle])


  useEffect(() => {
      getJobsCard()
      getCompanyTitleAndLocationList()
      updateUrl(page, companyName, location, title)
  }, [employmentTypeList, minimumPackageList, page, companyName, location, title])

  const onClickFilter = () => {
    setShowFilter(!showFilter)
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

  const onChangecompanyName = companyName => {
    const value = companyName.split('&').join('%26')
    setCompanyName(value)
    console.log(companyName)
    setPage(1)
  }

  const onChangelocation = location => {
    const value = location.split('&').join('%26')
    setLocation(value)
    console.log(location)
    setPage(1)
  }

  const onChangetitle = title => {
    const value = title.split('&').join('%26')
    setTitle(value)
    console.log(title)
    setPage(1)
  }

  const getCompanyTitleAndLocationList = async () => {
    const url = `${backendUrl}/api/public/companies-and-locations`;
    try {
      const response = await fetch(url);
      if(response.ok === true) {
        const data = await response.json();
        let options = data.companyList.map(company => ({ value: company.company_name, label: `${company.company_name} - ${company.count} opening(s)`}))
        setCompanyList(options);
        options = data.locationList.map(location => ({ value: location.city, label: `${location.city} - ${location.count} opening(s)`}))
        setLocationList(options);
        options = data.titleList.map(title => ({ value: title.title, label: `${title.title} - ${title.count} opening(s)`}))
        setTitleList(options);
        console.log(data)
      } else {
        console.error('Failed to fetch company list');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getJobsCard = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    let apiUrl = `${backendUrl}/api/public/jobs?company=${companyName}&location=${location}&title=${title}&search=${searchInput}&page=${page}`
    
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log('api data', data)
    
    if (response.ok === true) {
      if(data.error) {
        setApiStatus(apiStatusConstant.failure)
        alert(data.error)
      } else {
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
          street: eachItem.street,
          area: eachItem.area,
          city: eachItem.city,
          pincode: eachItem.pincode,
          location: eachItem.location,
          role: eachItem.title,
          workType: eachItem.work_type,
          hiringNeed: eachItem.hiring_need,
          postedBy: eachItem.posted_by,
          skills: eachItem.skills,
          status: eachItem.status,
          createdAt: eachItem.created_at,
          keywords: eachItem.keywords,
        }))
        console.log('updated data',updatedData)

        setJobsList(updatedData)
        setTotalItems(data.count)
        setApiStatus(apiStatusConstant.success)
      }
    } else {
      setApiStatus(apiStatusConstant.failure)
      alert(data.error)
    }
  }


  const itemsPerPage = 20; 

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

  const updateUrl = (page, companyName, location, title) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page);
    url.searchParams.set('company', companyName);
    url.searchParams.set('location', location);
    url.searchParams.set('title', title);
    window.history.pushState({ path: url.href }, '', url.href);
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
                    <PublicJobsCard key={eachJob.id} jobsItem={eachJob} />
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
              onSelectEmploymentType={onSelectEmploymentType}
              onChangeSalaryRange={onChangeSalaryRange}
              onSelectIndustryType={onSelectIndustryType}
              onSelectLocataionType={onSelectLocataionType}
              onSelectWorkPlaceType={onSelectWorkPlaceType}
              onChangeInput={onChangeInput}
              onKeyEnter={onKeyEnter}
              onClickButton={onClickButton}
              onClickFilter={onClickFilter}
              pageType={'OPENINGS'}
              companyList={companyList}
              locationList={locationList}
              titleList={titleList}
              companyName={companyName}
              location={location}
              title={title}
              onChangecompanyName={onChangecompanyName}
              onChangelocation={onChangelocation}
              onChangetitle={onChangetitle}
            />
            <button type='button' className='job-section-filter-close-button' onClick={onClickFilter}><MdKeyboardDoubleArrowLeft className='job-section-filter-close-icon' /></button>
        </div>
          
        <button type='button' className='job-section-filter-button' onClick={onClickFilter}>
          <IoFilter className='filter-icon' />
          <span className='filter-text-btn'>Filter Jobs</span>
        </button>
        
        <div className="public-job-section-search-card-con">
          <div className="public-job-section-search-con">
            <BsSearch className="public-job-section-search-icon" />
            <input
              type="search"
              className="public-job-section-search-input"
              placeholder="Job title, keywords, company or location"
              value={searchInput}
              onChange={onChangeInput}
              onKeyDown={onKeyEnter}
            />
            <button
              type="button"
              className="public-job-section-search-button"
              onClick={onClickButton}
            >
              Search
            </button>
          </div>
          {
            renderAllSections()
          }
        </div>
      </div>
    )
}

export default OpeningsSection