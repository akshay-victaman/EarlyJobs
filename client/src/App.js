import { useEffect, useState } from "react";
import React from "react";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import EachRoute from "./routes/EachRoute";
import ScrollUp from "./components/ScrollUp";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ContactForm from "./components/ContactForm";
import ComplaintsForm from "./components/ComplaintsForm";
import SubNavBar from "./components/SubNavBar";
import FooterScroll from "./components/Footer/FooterScroll";
import "react-toastify/dist/ReactToastify.min.css";
import "./components/AddJobsPage/style.css";
import "./components/AddJobVacanciesPage/style.css";
import "./components/AdminPage/style.css";
import "./components/BDEPage/style.css";
import "./components/CompliantDetails/style.css";
import "./components/CompliantsPage/style.css";
import "./components/ContactForm/style.css";
import "./components/EmploymentTypeList/style.css";
import "./components/FilterJobs/style.css";
import "./components/Footer/style.css";
import "./components/HiringPartnerDetails/style.css";
import "./components/HiringPartnerForm/style.css";
import "./components/HiringPartnerReqPage/style.css";
import "./components/HomePage/style.css";
import "./components/IndustryTypeList/style.css";
import "./components/JobDetailsPage/style.css";
import "./components/JobsCard/style.css";
import "./components/JobsPage/style.css";
import "./components/JobsSection/style.css";
import "./components/Loader/style.css";
import "./components/LocationTypeList/style.css";
import "./components/MyHrRecruiters/style.css";
import "./components/NavBar/style.css";
import "./components/NotFoundPage/style.css";
import "./components/PrivacyPolicyPage/style.css";
import "./components/Profile/style.css";
import "./components/PublicJobsCard/style.css";
import "./components/SalaryRangeList/style.css";
import "./components/ScrollUp/style.css";
import "./components/ShareButton/style.css";
import "./components/SignUpPage/style.css";
import "./components/SubNavBar/style.css";
import "./components/UploadCandidatePage/style.css";
import "./components/UsersPage/style.css";
import "./components/ViewCandidates/style.css";
import "./components/WorkPlaceTypeList/style.css";
import "./pages/ControlTeamPage/style.css";
import "./pages/OpeningsPage/style.css";
import "./pages/PartnerWithUs/style.css";
import "./pages/PublicApplicationForm/style.css";
import "./pages/PublicJobDetailsPage/style.css";
import "./pages/TeamPage/style.css";
import "./pages/HomePage/style.css";
import "./pages/WhyEarlyjobs/style.css";
import "./pages/OurServicesPages/style.css";
import "./App.css";

const App = ({ initialState }) => {
  console.log(initialState);

  const [showContactForm, setShowContactForm] = useState(false);
  const [showComplaintsForm, setShowComplaintsForm] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleShowContactForm = () => {
    setShowContactForm(!showContactForm);
  };

  const handleShowComplaintsForm = () => {
    setShowComplaintsForm(!showComplaintsForm);
  };

  return (
    isMounted && (
      <>
        <NavBar handleShowComplaintsForm={handleShowComplaintsForm} />
        {/* {Cookies.get('jwt_token') === undefined && <SubNavBar handleShowContactForm={handleShowContactForm} />} */}
        {showContactForm && (
          <ContactForm handleShowContactForm={handleShowContactForm} />
        )}
        {Cookies.get("jwt_token") === undefined && (
          <button
            className="sticky-side-contact-button"
            onClick={handleShowContactForm}
          >
            Contact Us
          </button>
        )}
        {showComplaintsForm && (
          <ComplaintsForm handleShowComplaintsForm={handleShowComplaintsForm} />
        )}
        <EachRoute initialState={initialState} />
        <Footer handleShowContactForm={handleShowContactForm} />
        {Cookies.get("jwt_token") === undefined && <FooterScroll />}
        <ScrollUp />
        <ToastContainer autoClose={4000} />
      </>
    )
  );
};

export default App;
