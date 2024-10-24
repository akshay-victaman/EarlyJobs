import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { Oval } from 'react-loader-spinner';
import { format } from 'date-fns';

function RoleHistory({email}) {

    const [roleHistoryList, setRoleHistoryList] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getRoleHistory()
    }, [])

    const formatDate = (date) => {
        return format(new Date(date), 'dd-MMM-yyyy')
    }

    const getRoleHistory = async () => {
        try {
            setLoading(true)
            const url = process.env.REACT_APP_BACKEND_API_URL + `/admin/role-history/${email}`
            const options = {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Cookies.get('jwt_token')}`
                }
            };
            const response = await fetch(url, options)
            if(response.ok === true) {
                const data = await response.json()
                console.log(data)
                setRoleHistoryList(data)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <>
        <table className="users-table">
            <tr className="users-table-heading-row">
                <th className="users-table-heading">Role</th>
                <th className="users-table-heading">Start Date</th>
                <th className="users-table-heading">End Date</th>
            </tr>
            {
                roleHistoryList?.map(eachItem => (
                    <tr className="users-table-data-row">
                        <td data-cell='Role' className="users-table-data">{eachItem.role}</td>
                        <td data-cell='Start Date' className="users-table-data">{formatDate(eachItem.start_date)}</td>
                        <td data-cell='End Date' className="users-table-data">{eachItem.end_date ? formatDate(eachItem.end_date) : 'Current'}</td>
                    </tr>
                ))
            }
        </table>
        {
            roleHistoryList.length === 0 && 
            <p className='user-view-table-no-data'>
                {loading ? 
                <Oval
                visible={true}
                height="20"
                width="20"
                color="#EB6A4D"
                strokeWidth="4"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                secondaryColor="#fff"
                wrapperClass=""
                /> : 
                'No data available'}
            </p>
        }
        </>
    )
}

export default RoleHistory