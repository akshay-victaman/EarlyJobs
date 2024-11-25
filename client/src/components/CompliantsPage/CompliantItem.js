import { IoMdMailUnread, IoMdMailOpen } from 'react-icons/io';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';
import React from 'react';

const CompliantItem = ({ compliant }) => {

    const formatDate = (date) => {
        const dbDate = parseISO(date);
        const formattedDate = format(dbDate, 'dd-MMM-yyyy hh:mm a');
        return formattedDate;
    }

    return (
        <li className="complaints-page-list-item">
            <Link to={`/admin/compliants/${compliant.id}`} className="complaints-page-list-item-link">
                {
                    compliant.is_read === 0 ? 
                    <IoMdMailUnread className="complaints-page-list-item-icon" /> : 
                    <IoMdMailOpen className="complaints-page-list-item-icon" />
                }
                <div className="complaints-page-list-item-con">
                    <h3 className="complaints-page-list-item-title">{compliant.subject}</h3>
                    <p className="complaints-page-list-item-text">By {compliant.username}</p>
                    <p className="complaints-page-list-item-date">on {formatDate(compliant.created_at)}</p>
                </div>
            </Link>
        </li>
    );
}

export default CompliantItem;