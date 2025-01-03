import Cookies from 'js-cookie'
import { useState, useEffect } from 'react'
import {ThreeCircles} from 'react-loader-spinner'
import Pagination from 'rc-pagination';
import { query, limit, collection, getFirestore, getDocs, orderBy, Timestamp, startAfter } from "firebase/firestore";
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
import { HiringManagerDetailsForm } from '../HiringManagerDetailsForm';
import MyHrRecruiters from '../MyHrRecruiters';
import CollegeAgencyForm from '../CollegeAgencyForm';
import app from "../../firebase";
import OfferStatusCandidates from '../ViewCandidates/OfferStatusCandidates';
import Applications from '../ViewCandidates/Applications';
import ViewCompanies from '../ViewCompanies';
import { TenureApprovedCandidates } from '../ViewCandidates/TenureApprovedCandidates';
import { RecommendedCandidates } from '../RecommendedCandidates';
import CreateSubJob from '../CreateSubJob';


const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}


const JobsSection = ({onShowCandidateDetails, onShowScheduleInterviewPopup, onShowSelectedOrJoinedPopup}) => {

    const backendUrl = process.env.REACT_APP_BACKEND_API_URL

    const initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
    const view = parseInt(new URLSearchParams(window.location.search).get('view')) || 0;

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
    const [showCandidateForm, setShowCandidateForm] = useState(view)
    const [page, setPage] = useState(initialPage)
    const [totalItems, setTotalItems] = useState(0);
    const [showFilter, setShowFilter] = useState(false)
    const [lastVisible, setLastVisible] = useState(null)
    const [companyList, setCompanyList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [titleList, setTitleList] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [title, setTitle] = useState('');


  useEffect(() => {
    if(showCandidateForm === 18) {
      getHRSubJobCards()
    }
    if(showCandidateForm === 4) {
      getHirignReqCard()
    } else if(showCandidateForm === 4 || showCandidateForm === 0) {
      getJobsCard()
      getCompanyTitleAndLocationList()
    }
    updateUrl(page, showCandidateForm);
    }, [employmentTypeList, minimumPackageList, page, showCandidateForm, companyName, location, title])

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
    setPage(1)
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

  const getHRSubJobCards = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    let apiUrl = `${backendUrl}/api/public/sub-jobs?page=${page}`
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
        alert(data.error)
      } else {
        const updatedData = data.jobs.map(eachItem => ({
          id: eachItem.id,
          companyLogoUrl: eachItem.company_logo_url,
          category: eachItem.category,
          compname: eachItem.company_name,
          currency: eachItem.currency,
          salaryMode: eachItem.salary_mode,
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
      alert(data.error)
    }
  }

  const getJobsCard = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const role = Cookies.get('role')
    let apiUrl = ""
    if (role === 'SHM') {
      apiUrl = `${backendUrl}/jobs/senior-hm/?company=${companyName}&location=${location}&title=${title}&page=${page}`
    } else if (role === 'AC') {
      apiUrl = `${backendUrl}/jobs/hm/?company=${companyName}&location=${location}&title=${title}&page=${page}`
    } else if (role === 'HR') {
      apiUrl = `${backendUrl}/jobs/hr/?company=${companyName}&location=${location}&title=${title}&page=${page}`
    } else if (role === 'BDE') {
      apiUrl = `${backendUrl}/jobs/master-bde/?company=${companyName}&location=${location}&title=${title}&page=${page}`
    } else if (role === 'FBDE') {
      apiUrl = `${backendUrl}/jobs/bde/?company=${companyName}&location=${location}&title=${title}&page=${page}`
    } else {
      apiUrl = `${backendUrl}/admin/get-jobs/all/?company=${companyName}&location=${location}&title=${title}&page=${page}`
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
        alert(data.error)
      } else {
        const updatedData = data.jobs.map(eachItem => ({
          id: eachItem.id,
          companyLogoUrl: eachItem.company_logo_url,
          category: eachItem.category,
          commissionType: eachItem.commission_type,
          commissionFee: eachItem.commission_fee,
          compname: eachItem.company_name,
          currency: eachItem.currency,
          salaryMode: eachItem.salary_mode,
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
      alert(data.error)
    }
  }

  const getHirignReqCard = async () => {
    setApiStatus(apiStatusConstant.inProgress)
    const db = getFirestore(app);
    
    let queryRef;
    if (page === 1) { // If it's the first page, no need to use startAfter
      queryRef = query(
        collection(db, "AddJobVacancies"),
        orderBy("postDateTime", "desc"),
        limit(10)
      );
    } else { // If it's not the first page, start after the last document from the previous page
      console.log('lastVisible', lastVisible)
      queryRef = query(
        collection(db, "AddJobVacancies"),
        orderBy("postDateTime", "desc"),
        startAfter(lastVisible),
        limit(10)
      );
    }

    const queryRefForCount = query(collection(db, "AddJobVacancies"));
    const querySnapForCount = await getDocs(queryRefForCount);
    setTotalItems(querySnapForCount.size);

    const querySnap = await getDocs(queryRef);
    if (!querySnap.empty) {
      setLastVisible(querySnap.docs[querySnap.docs.length - 1])
      const documents = querySnap.docs.map((doc) => {
          const timestamp = doc.data().postDateTime;
        
          // Check if AppliedDate is a Timestamp object:
          if (!(timestamp instanceof Timestamp)) {
            console.error("AppliedDate is not a valid Timestamp. Skipping conversion.");
            return doc.data();
          }
        
          // Convert Timestamp to human-readable format:
          const options = { // Configure formatting options as needed
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Use appropriate time format
            timeZone: 'Asia/Kolkata' // Replace with your preferred time zone
          };
          const formattedDate = timestamp.toDate().toLocaleString('en-US', options);
        
          return {
            // Original document data
            ...doc.data(),
            // Add `formattedDate` property with converted string
            formattedDate
          };
      });
      const formattedData = documents.map(eachItem => ({
        id: eachItem.docId,
        category: eachItem.category,
        commissionType: eachItem.commissionType,
        commissionFee: eachItem.commission,
        compname: eachItem.companyName,
        employmentType: eachItem.employmentType,
        hiringNeed: eachItem.hiringNeed,
        location: eachItem.location,
        currency: eachItem.currency,
        salaryMode: eachItem.salaryMode,
        minSalary: eachItem.salaryMax,
        maxSalary: eachItem.salaryMin,
        role: eachItem.title,
        workType: eachItem.workType,
        postedBy: eachItem.postedBy,
      })
      )
      setJobsList(formattedData)
      setApiStatus(apiStatusConstant.success)
      console.log('formatted data',formattedData)
    } else {
        console.log("No such documents!");
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

  const updateUrl = (page, view) => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('view', view);
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
                <JobsCard key={eachJob.id} jobsItem={eachJob} showCandidateForm={showCandidateForm} />
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
              showCandidateForm={showCandidateForm}
              pageType={'JOBS'}
              companyList={companyList}
              locationList={locationList}
              titleList={titleList}
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
        
        <div className={`job-section-search-card-con ${(showCandidateForm === 2 || showCandidateForm === 3) ? "job-section-view-candidate-con" : ""} ${showCandidateForm === 1 ? "job-section-candidate": ""}`}>
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
            : showCandidateForm===2 ? <ViewCandidates onShowCandidateDetails={onShowCandidateDetails} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} onShowSelectedOrJoinedPopup={onShowSelectedOrJoinedPopup} jobsList={jobsList} setShowCandidateForm={setShowCandidateForm}/> 
            : showCandidateForm===3 ? <MyHrRecruiters setShowCandidateForm={setShowCandidateForm} />
            : showCandidateForm===4 ? renderAllSections()
            : showCandidateForm >= 5 && showCandidateForm <= 12 ? <OfferStatusCandidates key={showCandidateForm} showCandidateForm={showCandidateForm} onShowCandidateDetails={onShowCandidateDetails} setShowCandidateForm={setShowCandidateForm} jobsList={jobsList} onShowScheduleInterviewPopup={onShowScheduleInterviewPopup} />
            : showCandidateForm===13 ? <Applications setShowCandidateForm={setShowCandidateForm} showCandidateForm={showCandidateForm} />
            : showCandidateForm===14 ? <ViewCompanies onShowCandidateDetails={onShowCandidateDetails} setShowCandidateForm={setShowCandidateForm} />
            : showCandidateForm===15 ? <TenureApprovedCandidates onShowCandidateDetails={onShowCandidateDetails} setShowCandidateForm={setShowCandidateForm}/>
            : showCandidateForm===16 ? <RecommendedCandidates onShowCandidateDetails={onShowCandidateDetails} setShowCandidateForm={setShowCandidateForm} />
            : showCandidateForm===17 ? <CreateSubJob setShowCandidateForm={setShowCandidateForm} />
            : showCandidateForm===18 ? renderAllSections()
            : showCandidateForm===19 ? <Applications setShowCandidateForm={setShowCandidateForm} showCandidateForm={showCandidateForm} />
            : renderAllSections()
          }
        </div>
      </div>
    )
}

export default JobsSection