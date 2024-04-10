import { Route, Switch, Redirect } from 'react-router-dom';
import React, { lazy, Suspense } from "react";
import ProtectedRoute from '../components/ProtectedRoute';
import PrivacyPolicyPage from '../components/PrivacyPolicyPage/index.js';

const HomePage = lazy(() => import("../components/HomePage"));
const JobsPage = lazy(() => import("../components/JobsPage"));
const SignUpPage = lazy(() => import("../components/SignUpPage"));
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


const EachRoute = () => {
    return (
        <Switch>
            
            <Route exact path="/"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <HomePage />
                    </Suspense>
                }
            />

            <Route exact path="/privacy-policy"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <PrivacyPolicyPage />
                    </Suspense>
                }
            />

            <Route exact path="/apply-as-a-recruiter"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <HiringPartnerForm />
                    </Suspense>
                }
            />

            <Route exact path="/add-job-vacancies"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AddJobVacanciesPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/jobs"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <JobsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/jobs/:id"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <JobDetailsPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path='/signup'
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SignUpPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path='/bde-portal'
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <BDEPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path='/admin'
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AdminPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/users"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <UsersPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/candidates"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <CandidatesPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/recruiter-requests"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <HiringPartnerReqPage />
                    </Suspense>
                }
            />

            <ProtectedRoute exact path="/admin/recruiter-requests/:id"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <HiringPartnerDetails />
                    </Suspense>
                }
            />

            <Route path="/not-found"
                render={() =>
                    <Suspense fallback={<div>Loading...</div>}>
                        <NotFoundPage />
                    </Suspense>
                }
            />

            <Redirect to="/not-found" />
        </Switch>
    );
}

export default EachRoute;