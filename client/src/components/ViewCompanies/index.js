import React, { useState, useEffect } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import Pagination from 'rc-pagination';
import { Oval, ThreeCircles } from 'react-loader-spinner';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import ExcelDownloadButton from '../ExcelDownloadButton';
import JobsCard from '../JobsCard';
import './style.css';

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const ViewCompanies = ({ setShowCandidateForm }) => {
    const [searchInput, setSearchInput] = useState('');
    const [companiesList, setCompaniesList] = useState([]);
    const [companyJobList, setCompanyJobList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [page, setPage] = useState(1);
    const [showCompanyPopup, setShowCompanyPopup] = useState(false)
    const [popupError, setPopupError] = useState('')
    const [popupLoading, setPopupLoading] = useState(false)
    const [companyPopupType, setCompanyPopupType] = useState('add')
    const [showCompanyJobs, setShowCompanyJobs] = useState(false)
    const [showCompanyDetailsPopup, setShowCompanyDetailsPopup] = useState(false)
    const [companyId, setCompanyId] = useState('')
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial);
    const [file, setFile] = useState(null);

    const id = new URLSearchParams(window.location.search).get('id');
    

    const updateUrl = (id) => {
        const url = new URL(window.location.href);
        url.searchParams.set('view', 14);
        url.searchParams.set('page', 1);
        url.searchParams.set('id', id);
        window.history.pushState({}, '', url);
    };

    const [companyDetails, setCompanyDetails] = useState({
        name: '',
        companyLogoUrl: '',
        registeredAddress: '',
        address: '',
        phone: '',
        email: '',
        gstNo: '',
        spocName: '',
        spocEmail: '',
        spocPhone: ''
    })

    useEffect(() => {
        getCompanies()
        if(id !== null) {
            setShowCompanyJobs(true)
            getCompanyJobs(id)
        } else {
            setShowCompanyJobs(false)
        }
    }, [page, id])

    const s3Client = new S3Client({
        region: process.env.REACT_APP_AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY_ID,
        },
    });

    const itemsPerPage = 10; 

    const handlePageChange = (page) => {
      setPage(page)
    };

    async function handleFileChange(event) {
        const file = event.target.files[0];
        if (!file) return;
        setFile(file);
        console.log('File selected:', file);
    }

    const handleCompanyInputChange = (e) => {
        const {name, value} = e.target
        setCompanyDetails({...companyDetails, [name]: value})
    }

    const handleShowCompanyPopup = (id, type) => {
        setPopupError("")
        const company = companiesList.find(eachItem => eachItem.id === id)
        if(company) {
            setCompanyDetails(company)
        }
        console.log('type', type)
        if (type !== undefined && type === 'update') {
            setCompanyPopupType('update')
        } else {
            setCompanyPopupType('add')
            setCompanyDetails({
                name: '',
                companyLogoUrl: '',
                registeredAddress: '',
                address: '',
                phone: '',
                email: '',
                gstNo: '',
                spocName: '',
                spocEmail: '',
                spocPhone: ''
            })
            console.log('add')
        }
        setShowCompanyPopup(true)
    }

    const handleShowCompanyJobs = (id) => {
        setShowCompanyJobs(true)
        getCompanyJobs(id)
    }

    const handleHideCompanyJobs = () => {
        setShowCompanyJobs(false)
        const url = new URL(window.location.href);
        url.searchParams.delete('id');
        window.history.pushState({}, '', url);
    }

    const handleShowCompanyDetailsPopup = (id) => {
        setShowCompanyDetailsPopup(true)
        setCompanyId(id);
    }

    const handleChangeSearchInput = (event) => {
        setSearchInput(event.target.value);
    };

    const onClickEnter = (event) => {
        if (event.key === 'Enter') {
            getCompanies();
            setPage(1);
        }
    };

    const getCompanies = async () => {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/companies?search=${searchInput}&page=${page}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        try {
            setApiStatus(apiStatusConstant.inProgress);
            const response = await fetch(url, options)
            const data = await response.json()
            console.log('data', data)
            if(response.ok === true) {
                if(data.error) {
                    setApiStatus(apiStatusConstant.failure);
                } else {
                    const updatedData = data.companies.map(eachItem => ({
                        id: eachItem.id,
                        name: eachItem.name,
                        companyLogoUrl: eachItem.logo_url,
                        registeredAddress: eachItem.registered_address,
                        address: eachItem.address,
                        phone: eachItem.phone,
                        email: eachItem.email,
                        createdAt: formatDate(eachItem.created_at),
                        gstNo: eachItem.gst_no,
                        spocName: eachItem.spoc_name,
                        spocEmail: eachItem.spoc_email,
                        spocPhone: eachItem.spoc_phone,
                    }))
                    setCompaniesList(updatedData);
                    setTotalItems(data.count);
                    setApiStatus(apiStatusConstant.success);
                }
            } else {
                setApiStatus(apiStatusConstant.failure);
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure);
        }
    }

    const getCompaniesForExcel = async () => {
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/companies/excel?search=${searchInput}`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        try {
        const response = await fetch(url, options)
        const data = await response.json()
        console.log('data', data)
        if(response.ok === true) {
            if(data.error) {
                toast.error(data.error);
            } else {
                console.log(data)
                const updatedData = data.map(eachItem => ({
                    id: eachItem.id,
                    'Company Name': eachItem.name,
                    'Registered Address': eachItem.registered_address,
                    'Address': eachItem.address,
                    'Phone': eachItem.phone,
                    'Email': eachItem.email,
                    'GST No': eachItem.gst_no,
                    'SPOC Name': eachItem.spoc_name,
                    'SPOC Email': eachItem.spoc_email,
                    'SPOC Phone': eachItem.spoc_phone,
                    'Created At': formatDate(eachItem.created_at),
                    'updated At': formatDate(eachItem.updated_at),
                }))
                return updatedData;
            }
        } else {
            toast.error("Failed to download excel");
        }
        } catch (error) {
          toast.error("Failed to download excel");
        }
    }

    const getCompanyJobs = async (id) => {
        updateUrl(id)
        const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/companies/${id}/jobs`
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        try {
            setApiStatus(apiStatusConstant.inProgress);
            const response = await fetch(url, options)
            const data = await response.json()
            console.log('data', data)
            if(response.ok === true) {
                if(data.error) {
                    setApiStatus(apiStatusConstant.failure);
                } else {
                    const updatedData = data.map(eachItem => ({
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
                    setCompanyJobList(updatedData);
                    setApiStatus(apiStatusConstant.success);
                }
            } else {
                setApiStatus(apiStatusConstant.failure);
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure);
        }
    }
  
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
            {'<<'}
          </button>
        );
      }
  
      if (type === 'next') {
        return (
          <button className={`pagination-button ${totalItems/itemsPerPage <= page ? "endPage" : ""}`} title="Next" key="next" onClick={() => handlePageChange(current + 1)}>
            {'>>'}
          </button>
        );
      }
  
      if (type === 'jump-prev' || type === 'jump-next') {
        return <span className="pagination-dots" title='more'>...</span>;
      }
  
      return element;
    };

    const validateCompanyDetails = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if(companyDetails.name.trim() === '') {
            setPopupError("*Please enter company name")
            return false
        } else if(!file && companyPopupType === 'add') {
            setPopupError("*Please upload company logo")
            return
        } else if(companyPopupType === 'update' && !companyDetails.companyLogoUrl && !file) {
            setPopupError("*Please upload company logo")
            return
        } else if(companyDetails.registeredAddress.trim() === '') {
            setPopupError("*Please enter registered address")
            return false
        } else if(companyDetails.address.trim() === '') {
            setPopupError("*Please enter address")
            return false
        } else if(companyDetails.phone.trim().length !== 10) {
            setPopupError("*Please enter valid phone number")
            return false
        } else if(companyDetails.email.trim() === '' || !emailRegex.test(companyDetails.email)) {
            setPopupError("*Please enter valid email")
            return false
        } else if(companyDetails.gstNo.trim() === '') {
            setPopupError("*Please enter GST No")
            return false
        } else if(companyDetails.spocName.trim() === '') {
            setPopupError("*Please enter SPOC Name")
            return false
        } else if(companyDetails.spocEmail.trim() === '' || !emailRegex.test(companyDetails.spocEmail)) {
            setPopupError("*Please enter valid SPOC Email")
            return false
        } else if(companyDetails.spocPhone.trim().length !== 10) {
            setPopupError("*Please enter valid SPOC Phone")
            return false
        }
        setPopupError("")
        return true
    }

    const uploadImage = async () => {
        setPopupLoading(true)
        if(!file) return;
        try {
            const timestamp = Date.now();
            const params = {
                Bucket: process.env.REACT_APP_AWS_COMPANY_LOGO_BUCKET,
                Key: `${file.name}-${timestamp}`,
                Body: file,
                ContentType: file.type,
            };

            const command = new PutObjectCommand(params);

            await s3Client.send(command);

            const imageUrl = `https://${process.env.REACT_APP_AWS_COMPANY_LOGO_BUCKET}.s3.${process.env.REACT_APP_AWS_BUCKET_REGION}.amazonaws.com/${params.Key}`;
            console.log("Image uploaded to S3:", imageUrl);
            return imageUrl;
        } catch (error) {
            setPopupLoading(false)
            console.error("Error uploading file to S3:", error);
            toast.error('Failed to upload image');
        }
    };

    const handleAddCompany = async () => {
        if(!validateCompanyDetails()) {
            return
        }
        console.log(companyDetails)
        const imageUrl = await uploadImage()
        console.log(imageUrl)

        const url = process.env.REACT_APP_BACKEND_API_URL + '/api/companies/'
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify({...companyDetails, companyLogoUrl: imageUrl})
        }
        try {
            setPopupLoading(true)
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data)
            if(response.ok) {
                if(data.error) {
                    setPopupError(data.error)
                    toast.error(data.error)
                } else {
                    setShowCompanyPopup(false)
                    setCompanyDetails({
                        name: '',
                        companyLogoUrl: '',
                        registeredAddress: '',
                        address: '',
                        phone: '',
                        email: '',
                        gstNo: '',
                        spocName: '',
                        spocEmail: '',
                        spocPhone: ''
                    })
                    toast.success(data.message)
                    getCompanies()
                }
            } else {
                setPopupError(data.error)
                toast.error(data.error)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
        setPopupLoading(false)
        setFile(null);
    }

    const handleUpdateCompany = async () => {
        if(!validateCompanyDetails()) {
            return
        }
        console.log(companyDetails)
        let imageUrl = null;
        if(file) {
            imageUrl = await uploadImage()
        }
        console.log(imageUrl)

        const url = process.env.REACT_APP_BACKEND_API_URL + '/api/companies/' + companyDetails.id 
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            },
            body: JSON.stringify(file ? {...companyDetails, companyLogoUrl: imageUrl} : companyDetails)
        }
        try {
            setPopupLoading(true)
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(data)
            if(response.ok) {
                if(data.error) {
                    setPopupError(data.error)
                    toast.error(data.error)
                } else {
                    setShowCompanyPopup(false)
                    setCompanyDetails({
                        name: '',
                        registeredAddress: '',
                        address: '',
                        phone: '',
                        email: '',
                        gstNo: '',
                        spocName: '',
                        spocEmail: '',
                        spocPhone: ''
                    })
                    toast.success(data.message)
                    getCompanies()
                }
            } else {
                setPopupError(data.error)
                toast.error(data.error)
            }
        } catch (error) {
            toast.error(error)
            console.log(error)
        }
        setPopupLoading(false)
        setFile(null);
    }

    let imageUrl = null
    if(file) {
        imageUrl = URL.createObjectURL(file)
    } else {
        imageUrl = companyDetails.companyLogoUrl
    }

    const renderAddCompanyPopup = () => (
        <div className='bde-add-company-popup'>
            <div className='bde-add-company-popup-overlay'></div>
            <div className='bde-add-company-popup-content'>
                <button className='bde-add-company-popup-close' disabled={popupLoading} onClick={() => {setShowCompanyPopup(false); setFile(null)}}>&times;</button>
                <h1 className='bde-add-company-popup-heading'>{companyPopupType === 'update' ? "Update" : "Add"} Company</h1>
                <label className='bde-form-label' htmlFor='name'>Company Name<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='name'  onChange={handleCompanyInputChange} value={companyDetails.name} name='name' type='text' placeholder='Enter Company Name' />
                <label className='bde-form-label' htmlFor='companyLogo'>Company Logo<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='companyLogo' type='file' accept='image/png, image/jpeg' onChange={handleFileChange} />
                {file || companyPopupType === 'update' ?


                    <div className='bde-form-image-con'>
                        <img src={imageUrl} alt='company-logo' className='bde-form-image' />
                        <label className='bde-form-image-replace-btn' htmlFor='companyLogo'>Replace</label>
                    </div>
                    
                    :
                    <label className='bde-from-image-label' htmlFor='companyLogo'>Upload Company Logo</label>
                }
                <label className='bde-form-label' htmlFor='registeredAddress'>Registered Address<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='registeredAddress'  onChange={handleCompanyInputChange} value={companyDetails.registeredAddress} name='registeredAddress' type='text' placeholder='Enter Registered Address' />
                <label className='bde-form-label' htmlFor='address'>Address<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='address'  onChange={handleCompanyInputChange} value={companyDetails.address} name='address' type='text' placeholder='Enter Address' />
                <label className='bde-form-label' htmlFor='phone'>Phone<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='phone'  onChange={handleCompanyInputChange} value={companyDetails.phone} name='phone' type='number' placeholder='Enter Phone' />
                <label className='bde-form-label' htmlFor='email'>Email<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='email'  onChange={handleCompanyInputChange} value={companyDetails.email} name='email' type='text' placeholder='Enter Email' />
                <label className='bde-form-label' htmlFor='gstNo'>GST No<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='gstNo'  onChange={handleCompanyInputChange} value={companyDetails.gstNo} name='gstNo' type='text' placeholder='Enter GST No' />
                <label className='bde-form-label' htmlFor='spocName'>SPOC Name<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='spocName'  onChange={handleCompanyInputChange} value={companyDetails.spocName} name='spocName' type='text' placeholder='Enter SPOC Name' />
                <label className='bde-form-label' htmlFor='spocEmail'>SPOC Email<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='spocEmail'  onChange={handleCompanyInputChange} value={companyDetails.spocEmail} name='spocEmail' type='text' placeholder='Enter SPOC Email' />
                <label className='bde-form-label' htmlFor='spocPhone'>SPOC Phone<span className='hr-form-span'> *</span></label>
                <input className='bde-form-input' id='spocPhone'  onChange={handleCompanyInputChange} value={companyDetails.spocPhone} name='spocPhone' type='number' placeholder='Enter SPOC Phone' />
                { popupError && <p className='hr-error'>{popupError}</p> }
                <div className='bde-add-company-popup-btn-con'>
                    <button className='bde-add-company-popup-btn' disabled={popupLoading} onClick={() => setShowCompanyPopup(false)}>Cancel</button>
                    <button className='bde-add-company-popup-btn' disabled={popupLoading} onClick={companyPopupType === 'update' ? handleUpdateCompany : handleAddCompany}>
                    {popupLoading ? 
                        <Oval
                            height={20}
                            width={20}
                            color="#ffffff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#ffffff"
                            strokeWidth={3}
                            strokeWidthSecondary={3}
                        />
                        :
                        companyPopupType === 'update' ? "Update" : "Add Company"
                    }
                    </button>
                </div>
            </div>
        </div>
    )

    const renderNoCompanies = () => {
        if (apiStatus === apiStatusConstant.inProgress) {
          return (
            <Oval
              visible={true}
              height="20"
              width="20"
              color="#EB6A4D"
              strokeWidth="4"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              secondaryColor="#EB6A4D"
              wrapperClass=""
            />
          )
        }
        else return "no records found!"
    }

    const formatDate = (date) => {
      const dbDate = parseISO(date);
      const formattedDate = format(dbDate, 'dd MMM yyyy hh:mm a');
      return formattedDate;
    }

    const renderCompanyDetailsPopup = () => {
        const company = companiesList.find(eachItem => eachItem.id === companyId)
        console.log('company', company)
        return (
        <div className='bde-add-company-popup'>
            <div className='bde-add-company-popup-overlay'></div>
            <div className='bde-add-company-popup-content' style={{height: 'fit-content'}}>
                <button className='bde-add-company-popup-close' onClick={() => setShowCompanyDetailsPopup(false)}>&times;</button>
                <h1 className='bde-add-company-popup-heading'>Company Details</h1>
                
                <div className="candidate-details-sub-con">
                    <img src={company.companyLogoUrl ? company.companyLogoUrl : "/company-logo-placeholder.png"} alt="company logo" className="company-logo-img" />
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">Company Name: </p>
                    <p className="candidate-details-sub-text">{company.name}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">Registered Address: </p>
                    <p className="candidate-details-sub-text">{company.registeredAddress}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">Address: </p>
                    <p className="candidate-details-sub-text">{company.address}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">Phone: </p>
                    <p className="candidate-details-sub-text">{company.phone}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">Email: </p>
                    <p className="candidate-details-sub-text">{company.email}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">GST No: </p>
                    <p className="candidate-details-sub-text">{company.gstNo}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">SPOC Name: </p>
                    <p className="candidate-details-sub-text">{company.spocName}</p>
                </div>
                
                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">SPOC Email: </p>
                    <p className="candidate-details-sub-text">{company.spocEmail}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">SPOC Phone: </p>
                    <p className="candidate-details-sub-text">{company.spocPhone}</p>
                </div>

                <div className="candidate-details-sub-con">
                    <p className="candidate-details-sub-heading">Created At: </p>
                    <p className="candidate-details-sub-text">{company.createdAt}</p>
                </div>

                <div className="bde-add-company-popup-btn-con">
                    <button className="bde-add-company-popup-btn" onClick={() => setShowCompanyDetailsPopup(false)}>Close</button>
                </div>
            </div>
        </div>
        )
    }

    const renderCompanies = () => (
        <>
        <h1 className='bde-heading' style={{textAlign: "center"}}><span className='head-span'>Companies</span></h1>

        <div className="job-section-select-filter-container">
        <div className="user-view-search-con my-hr-recruiters-search-con view-candidates-search-input-con">
            <input className="user-view-search-input my-hr-recruiter-search-input" type="search" value={searchInput} onChange={handleChangeSearchInput} onKeyDown={onClickEnter} placeholder="Search by name, email, phone or company" />
            <div className="user-view-search-button my-hr-recruiters-search-btn" onClick={getCompanies} >
                <IoSearchSharp className="search-icon my-hr-recruiter-search-icon" />
            </div>
        </div>
        <button className="login-button company-button" type="button" onClick={handleShowCompanyPopup}>Add Company</button>
        {companiesList.length > 0 && 
            <div className="excel-download-button" style={{marginTop: "0px", marginBottom: "10px"}}> 
                <ExcelDownloadButton getData={getCompaniesForExcel} /> 
            </div>
        }
        <div className="rows-count-con">
            <span className="rows-count-text">Total Results:</span>
            <span className="rows-count-number">`{totalItems}`</span>
        </div>
        </div>

        <div className='table-candidate-container'>
        <table className={`job-details-candidates-table candidate-table-job-section ${companiesList.length === 0 ? "empty-candidates" : ""}`}>
            <tr className="job-details-candidates-table-heading">
                <th className="job-details-candidates-table-heading-cell">Company Name</th>
                <th className="job-details-candidates-table-heading-cell">Address</th>
                <th className="job-details-candidates-table-heading-cell">Email</th>
                <th className="job-details-candidates-table-heading-cell">SPOC Email</th>
                <th className="job-details-candidates-table-heading-cell">Created At</th>
                <th className="job-details-candidates-table-heading-cell">Openings</th>
                <th className="job-details-candidates-table-heading-cell">Actions</th>
            </tr>
            {
                companiesList.length > 0 && companiesList.map(eachItem => {
                return (
                    <tr key={eachItem.id} className="job-details-candidates-table-row">
                        <td className="job-details-candidates-table-cell job-details-candidates-table-cell-hover" onClick={() => handleShowCompanyDetailsPopup(eachItem.id)}>
                            {eachItem.name}
                        </td>
                        <td className="job-details-candidates-table-cell">{eachItem.registeredAddress}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.email}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.spocEmail}</td>
                        <td className="job-details-candidates-table-cell">{eachItem.createdAt}</td>
                        <td className="job-details-candidates-table-cell">
                            <button className='block-user-button' onClick={() => handleShowCompanyJobs(eachItem.id)}>View</button>
                        </td>
                        <td className="job-details-candidates-table-cell">
                            <button className='block-user-button' onClick={() => handleShowCompanyPopup(eachItem.id, 'update')}>Update</button>
                        </td>
                    </tr>
                )})
            }
            </table>
            {companiesList.length === 0 &&
            <p className='no-candidates-error'>
                { renderNoCompanies() }
            </p>}
        </div>
        <div className="job-details-candidates-pagination-con">
        <Pagination
            current={page}
            total={totalItems}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            className="pagination-class pagination-class-candidates"
            itemRender={itemRender}
            showSizeChanger
        />
        </div>
        {showCompanyPopup && renderAddCompanyPopup()}
        {showCompanyDetailsPopup && renderCompanyDetailsPopup()}
        </>
    )

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

    const renderJobsCards = () => {
        const noJobs = companyJobList.length === 0
    
        return (
            <div className="company-job-list-con">
                {noJobs ? (
                    renderNoJobFound()
                ) : (
                    <>
                        <h1 className="company-jobs-heading">{companyJobList[0].compname}</h1>
                        <ul className="jobs-card-list">
                            {/* {companyJobList.map(eachJob => (
                                <PublicJobsCard key={eachJob.id} jobsItem={eachJob} />
                            ))} */}
                            {companyJobList.map(eachJob => (
                                <JobsCard key={eachJob.id} jobsItem={eachJob} />
                            ))}
                        </ul>
                    </>
                )}
                <button className="login-button candidate-button" type="button" onClick={handleHideCompanyJobs}>Back</button>
            </div>
        )
      }

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
            onClick={getCompanyJobs}
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
        <div style={{width: "100%"}} className="job-details-candidates-container jobs-section-candidate-container">
            {showCompanyJobs ? renderAllSections() : renderCompanies()}
        </div>
    )
}

export default ViewCompanies;