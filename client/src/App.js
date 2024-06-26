import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import EachRoute from './routes/EachRoute';
import ScrollUp from './components/ScrollUp';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import ComplaintsForm from './components/ComplaintsForm';
import GenderForm from './components/GenderForm';
import SubNavBar from './components/SubNavBar';
import 'react-toastify/dist/ReactToastify.min.css';
import './components/AddJobsPage/style.css'
import './components/AddJobVacanciesPage/style.css'
import './components/AdminPage/style.css'
import './components/BDEPage/style.css'
import './components/CompliantDetails/style.css'
import './components/CompliantsPage/style.css'
import './components/ContactForm/style.css'
import './components/EmploymentTypeList/style.css'
import './components/FilterJobs/style.css'
import './components/Footer/style.css'
import './components/HiringPartnerDetails/style.css'
import './components/HiringPartnerForm/style.css'
import './components/HiringPartnerReqPage/style.css'
import './components/HomePage/style.css'
import './components/IndustryTypeList/style.css'
import './components/JobDetailsPage/style.css'
import './components/JobsCard/style.css'
import './components/JobsPage/style.css'
import './components/JobsSection/style.css'
import './components/Loader/style.css'
import './components/LocationTypeList/style.css'
import './components/MyHrRecruiters/style.css'
import './components/NavBar/style.css'
import './components/NotFoundPage/style.css'
import './components/PrivacyPolicyPage/style.css'
import './components/Profile/style.css'
import './components/PublicJobsCard/style.css'
import './components/SalaryRangeList/style.css'
import './components/ScrollUp/style.css'
import './components/ShareButton/style.css'
import './components/SignUpPage/style.css'
import './components/SubNavBar/style.css'
import './components/UploadCandidatePage/style.css'
import './components/UsersPage/style.css'
import './components/ViewCandidates/style.css'
import './components/WorkPlaceTypeList/style.css'
import './pages/ControlTeamPage/style.css'
import './pages/OpeningsPage/style.css'
import './pages/PartnerWithUs/style.css'
import './pages/PublicApplicationForm/style.css'
import './pages/PublicJobDetailsPage/style.css'
import './pages/TeamPage/style.css'
import './App.css';


const App = () => {

  const [showContactForm, setShowContactForm] = useState(false)
  const [showComplaintsForm, setShowComplaintsForm] = useState(false)
  const [showGenderForm, setShowGenderForm] = useState(false)

  const handleShowContactForm = () => {
    setShowContactForm(!showContactForm)
  }

  const handleShowComplaintsForm = () => {
    setShowComplaintsForm(!showComplaintsForm)
  }

  const handleShowGenderForm = () => {
    setShowGenderForm(!showGenderForm)
  }

  return (
    <>
      <NavBar handleShowComplaintsForm={handleShowComplaintsForm} handleShowGenderForm={handleShowGenderForm} />
      {Cookies.get('jwt_token') === undefined && <SubNavBar handleShowContactForm={handleShowContactForm} />}
      { showContactForm && <ContactForm handleShowContactForm={handleShowContactForm} /> }
      { showComplaintsForm && <ComplaintsForm handleShowComplaintsForm={handleShowComplaintsForm} /> }
      { showGenderForm && <GenderForm handleShowGenderForm={handleShowGenderForm} /> }
      <EachRoute />
      <Footer handleShowContactForm={handleShowContactForm} />
      <ScrollUp />
      <ToastContainer autoClose={4000} />
    </>
)}

export default App;
