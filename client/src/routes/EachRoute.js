import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy, Suspense } from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader/index.js';
import TopExecutiveServicePage from '../pages/OurServicesPages/TopExecutiveServicePage.jsx';
import HrExecutiveServicePage from '../pages/OurServicesPages/HrExecutiveServicePage.jsx';

const JobsPage = lazy(() => import("../components/JobsPage"));
const BDEPage = lazy(() => import("../components/BDEPage"));
const AdminPage = lazy(() => import("../components/AdminPage"));
const UsersPage = lazy(() => import("../components/UsersPage"));
const CandidatesPage = lazy(() => import("../components/CandidatesPage"));
const JobDetailsPage = lazy(() => import("../components/JobDetailsPage"));
const HiringPartnerForm = lazy(() => import("../components/HiringPartnerForm/index.js").then(module => ({ default: module.HiringPartnerForm })));
const AddJobVacanciesPage = lazy(() => import("../components/AddJobVacanciesPage"));
const HiringPartnerReqPage = lazy(() => import("../components/HiringPartnerReqPage"));
const HiringPartnerDetails = lazy(() => import("../components/HiringPartnerDetails"));
const NotFoundPage = lazy(() => import("../components/NotFoundPage"));
const PrivacyPolicyPage = lazy(() => import("../components/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("../components/TermsPage"));
const ComplaintsPage = lazy(() => import("../components/CompliantsPage"));
const ComplaintDetails = lazy(() => import("../components/CompliantDetails"));
const RequestJobDetailsPage = lazy(() => import("../components/RequestJobDetailsPage"));
const PartnerWithUs = lazy(() => import("../pages/PartnerWithUs"));
const FranchiseWithUs = lazy(() => import("../pages/FranchiseWithUs"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const OpeningsPage = lazy(() => import("../pages/OpeningsPage"));
const PublicJobDetailsPage = lazy(() => import("../pages/PublicJobDetailsPage"));
const TeamPage = lazy(() => import("../pages/TeamPage"));
const ControlTeamPage = lazy(() => import("../pages/ControlTeamPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const WhyEarlyjobs = lazy(() => import("../pages/WhyEarlyjobs"));
const ITRecruitmentServicePage = lazy(() => import("../pages/OurServicesPages/ITRecruitmentServicePage.jsx"));
const FinanceAccountingServicePage = lazy(() => import("../pages/OurServicesPages/FinanceAccountingServicePage.jsx"));
const SalesMarketingServicePage = lazy(() => import("../pages/OurServicesPages/SalesMarketingServicePage.jsx"));


const EachRoute = () => {
    return (
        <Switch>

            <Route exact path="/"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <HomePage />
                    </Suspense>
                }
            />
            
            <Route exact path="/login"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        {/* <HomePage /> */}
                        <LoginPage />
                    </Suspense>
                }
            />

            <Route exact path='/why-earlyjobs'
                render={() => 
                    <Suspense fallback={<Loader />}>
                        <WhyEarlyjobs />
                    </Suspense>
                }
            />

            <Route exact path='/it-recruitment'
                render={() => 
                    <Suspense fallback={<Loader />}>
                        <ITRecruitmentServicePage />
                    </Suspense>
                }
            />

            <Route exact path='/finance-and-accounting-recruitment'
                render={() => 
                    <Suspense fallback={<Loader />}>
                        <FinanceAccountingServicePage />
                    </Suspense>
                }
            />

            <Route exact path='/sales-marketing-services'
                render={() => 
                    <Suspense fallback={<Loader />}>
                        <SalesMarketingServicePage />
                    </Suspense>
                }
            />

            <Route exact path='/top-executive-recruitment-firm'
                render={() => 
                    <Suspense fallback={<Loader />}>
                        <TopExecutiveServicePage />
                    </Suspense>
                }
            />

            <Route exact path='/hr-executive-recruitment-services'
                render={() => 
                    <Suspense fallback={<Loader />}>
                        <HrExecutiveServicePage />
                    </Suspense>
                }
            />

            <Route exact path="/privacy-policy"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <PrivacyPolicyPage />
                    </Suspense>
                }
            />

            <Route exact path="/terms-and-conditions"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <TermsPage />
                    </Suspense>
                }
            />

            <Route exact path="/apply-as-a-recruiter"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <HiringPartnerForm />
                    </Suspense>
                }
            />

            <Route exact path="/free-job-posting"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <AddJobVacanciesPage />
                    </Suspense>
                }
            />

            <Route exact path="/partner-with-us"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <PartnerWithUs />
                    </Suspense>
                }
            />

            <Route exact path="/franchise-with-us"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <FranchiseWithUs />
                    </Suspense>
                }
            />

            <Route exact path="/about"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <AboutUs />
                    </Suspense>
                }
            />

            <Route exact path="/team"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <TeamPage />
                    </Suspense>
                }
            />

            <Route exact path="/view-openings"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <OpeningsPage />
                    </Suspense>
                }
            />

            <Route exact path="/view-openings/:id"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <PublicJobDetailsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/jobs"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <JobsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/jobs/:id"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <JobDetailsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path='/job-request-details/:id'
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <RequestJobDetailsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path='/bde-portal'
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <BDEPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path='/admin'
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <AdminPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/users"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <UsersPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/candidates"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <CandidatesPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/recruiter-requests"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <HiringPartnerReqPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/compliants"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <ComplaintsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/compliants/:id"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <ComplaintDetails />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/recruiter-requests/:id"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <HiringPartnerDetails />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/team"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <ControlTeamPage />
                    </Suspense>
                }
            />

            <Route path="/not-found"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <NotFoundPage />
                    </Suspense>
                }
            />

            <Redirect to="/not-found" />
        </Switch>
    );
}

export default EachRoute;