import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import CompliantItem from "./CompliantItem";
import Pagination from 'rc-pagination';
import './style.css'

const apiStatusConstant = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
}

const ComplaintsPage = () => {

    const initialPage = parseInt(new URLSearchParams(window.location.search).get('page')) || 1;
    const view = new URLSearchParams(window.location.search).get('view') || 'INBOX';
    const [page, setPage] = useState(initialPage)
    const [complaintView, setComplaintView] = useState(view)
    const [complaints, setComplaints] = useState([])
    const [apiStatus, setApiStatus] = useState(apiStatusConstant.initial)
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if(complaintView === 'INBOX') {
            fetchUnReadCompliants()
        } else {
            fetchReadCompliants()
        }
        updateUrl(page, complaintView)
    }, [page])

    const handleComplaintView = (view) => {
        setComplaintView(view)
        if(view === 'INBOX') {
            setPage(1)
            fetchUnReadCompliants()
        } else {
            setPage(1)
            fetchReadCompliants()
        }
        updateUrl(page, view)
    }
    
    const updateUrl = (page, complaintView) => {
        const url = new URL(window.location.href);
        url.searchParams.set('view', complaintView);
        url.searchParams.set('page', page);
        window.history.pushState({}, '', url);
    };

    const fetchUnReadCompliants = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/complaints/unread?page=${page}`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            if(response.ok === true) {
                setComplaints(result.compliants)
                setTotalItems(result.count)
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
            }
        } catch (error) {
            setApiStatus(apiStatusConstant.failure)
        }
    }

    const fetchReadCompliants = async () => {
        setApiStatus(apiStatusConstant.inProgress)
        try {
            const url = `${process.env.REACT_APP_BACKEND_API_URL}/admin/complaints/read?page=${page}`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            }
            const response = await fetch(url, options)
            const result = await response.json()
            if(response.ok === true) {
                setComplaints(result.compliants)
                setTotalItems(result.count)
                setApiStatus(apiStatusConstant.success)
            } else {
                setApiStatus(apiStatusConstant.failure)
            }
        } catch (error) {
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

    const renderCompliants = () => (
        <>
            {complaints.length > 0 && complaints.map(compliant => (
                <CompliantItem key={compliant.id} compliant={compliant} />
            ))}
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

    const renderLoader = () => (
        <div data-testid="loader" className="compliants-loader-container">
          <ThreeCircles type="ThreeDots" color="#EB6A4D" height="50" width="50" />
        </div>
    )

    const renderNoCompliants = () => (
        <div className="compliants-no-compliants">
          <h3>No Complaints</h3>
        </div>
    )

    const renderFailure = () => (
        <div className="compliants-failure">
          <h3 className="compliants-failure-heading">Failed to load complaints</h3>
          <button onClick={complaintView === 'INBOX' ? fetchUnReadCompliants : fetchReadCompliants} className="compliants-failure-button">Try Again</button>
        </div>
    )

    const renderSwitchCase = () => {
        switch (apiStatus) {
          case apiStatusConstant.inProgress:
            return renderLoader()
          case apiStatusConstant.success:
            return complaints.length > 0 ? renderCompliants() : renderNoCompliants()
          case apiStatusConstant.failure:
            return renderFailure()
          default:
            return null
        }
    }

    return (
        <div className="complaints-page-con">
            <div className="complaints-page-button-con">
                <button className={`complaints-page-button ${complaintView === 'INBOX' ? 'active-button' : ''}`} onClick={() => handleComplaintView('INBOX')}>Inbox</button>
                <button className={`complaints-page-button ${complaintView === 'PREV' ? 'active-button' : ''}`} onClick={() => handleComplaintView('PREV')}>Previous</button>
            </div>
            <hr className='compliants-line' />
            <ul className="complaints-page-list">
                { renderSwitchCase() }
            </ul>
        </div>
    )
}

export default ComplaintsPage;