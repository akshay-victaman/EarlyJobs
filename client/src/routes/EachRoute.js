import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy, Suspense } from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import Loader from '../components/Loader/index.js';
import RequestJobDetailsPage from '../components/RequestJobDetailsPage/index.js';
import ComplaintDetails from '../components/CompliantDetails/index.js';

const HomePage = lazy(() => import("../components/HomePage"));
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

            <Route exact path="/add-job-vacancies"
                render={() =>
                    <Suspense fallback={<Loader />}>
                        <AddJobVacanciesPage />
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