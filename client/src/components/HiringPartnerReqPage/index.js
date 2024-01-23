
import NavBar from '../NavBar'
import './style.css'

const HiringPartnerReqPage = () => {
    return (
        <div className='homepage-container'>
            <NavBar />
            <div className='hiring-partner-req-page-content-con'>
                <h1 className='hiring-partner-req-heading'>Hiring Partner Requests</h1>
                <div className='hiring-partner-req-page-content'>
                    <table className='users-table hiring-partner-req-table'>
                        <thead>
                            <tr className='users-table-heading-row'>
                                <th className="users-table-heading">Name</th>
                                <th className="users-table-heading">Email</th>
                                <th className="users-table-heading">Contact</th>
                                <th className="users-table-heading">More Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="users-table-data-row">
                                <td data-cell='Name' className="users-table-data">John Doe</td>
                                <td data-cell='Email' className="users-table-data">johndoe@gmail.com</td>
                                <td data-cell='Phone' className="users-table-data">9876543210</td>
                                <td data-cell='More Details' className="users-table-data"><button className='hiring-partner-req-btn hrp-button'>View</button></td>
                            </tr>
                            <tr className="users-table-data-row">
                                <td data-cell='Name' className="users-table-data">John Doe</td>
                                <td data-cell='Email' className="users-table-data">johndoe@gmail.com</td>
                                <td data-cell='Phone' className="users-table-data">9876543210</td>
                                <td data-cell='More Details' className="users-table-data"><button className='hiring-partner-req-btn hrp-button'>View</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HiringPartnerReqPage