import { useEffect } from 'react'
import OpeningsSection from '../../components/OpeningsSection'
import './style.css'
import { metaConstants } from '../../utils/metaConstants'

const OpeningsPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = metaConstants.viewOpenings.title

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', metaConstants.viewOpenings.description);
    }
    if (metaKeywords) {
        metaKeywords.setAttribute('content', metaConstants.viewOpenings.keywords);
    }

    return () => {
        document.title = metaConstants.title
        if (metaDescription) {
            metaDescription.setAttribute('content', metaConstants.description); // Replace with the original content if needed
        }
        if (metaKeywords) {
            metaKeywords.setAttribute('content', metaConstants.keywords);
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