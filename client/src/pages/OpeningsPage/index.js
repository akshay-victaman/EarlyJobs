import { useEffect } from 'react'
import React from 'react';
import OpeningsSection from '../../components/OpeningsSection'
import './style.css'
import { metaConstants } from '../../utils/metaConstants'

const OpeningsPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = metaConstants.viewOpenings.title

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaSubject = document.querySelector('meta[name="subject"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', metaConstants.viewOpenings.description);
    }
    if (metaKeywords) {
        metaKeywords.setAttribute('content', metaConstants.viewOpenings.keywords);
    }
    if (metaSubject) {
        metaSubject.setAttribute('content', metaConstants.viewOpenings.description);
    }

    return () => {
        document.title = metaConstants.title
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.description); // Replace with the original content if needed
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.keywords);
        }
        if (metaSubject) {
            metaSubject.setAttribute('content', metaConstants.description);
        }
    };
}, [])

  return (
      <div className="jobs-container openings-page-container">
        <OpeningsSection />
      </div>
  )
}

export default OpeningsPage