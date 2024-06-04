import { useState } from 'react'
import OpeningsSection from '../../components/OpeningsSection'
import './style.css'

const OpeningsPage = () => {

  return (
      <div className="jobs-container openings-page-container">
        <OpeningsSection />
      </div>
  )
}

export default OpeningsPage