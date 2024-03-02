import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import './App.css';
import JobsPage from './components/JobsPage';
import SignUpPage from './components/SignUpPage';
import BDEPage from './components/BDEPage';
// import AccountManagerPage from './components/AccountManagerPage';
import AdminPage from './components/AdminPage';
import UsersPage from './components/UsersPage';
import CandidatesPage from './components/CandidatesPage';
import ProtectedRoute from './components/ProtectedRoute';
import JobDetailsPage from './components/JobDetailsPage';
import {HiringPartnerForm} from './components/HiringPartnerForm';
import AddJobVacanciesPage from './components/AddJobVacanciesPage';
import HiringPartnerReqPage from './components/HiringPartnerReqPage';
import HiringPartnerDetails from './components/HiringPartnerDetails';
import ScrollUp from './components/ScrollUp';


const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/apply-as-a-recruiter" component={HiringPartnerForm} />
      <Route exact path="/add-job-vacancies" component={AddJobVacanciesPage} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetailsPage} />
      <ProtectedRoute exact path='/signup' component={SignUpPage} />
      <ProtectedRoute exact path='/bde-portal' component={BDEPage} />
      {/* <ProtectedRoute exact path='/account-manager-portal' component={AccountManagerPage} /> */}
      <ProtectedRoute exact path='/admin' component={AdminPage} />
      <ProtectedRoute exact path="/admin/users" component={UsersPage} />
      <ProtectedRoute exact path="/admin/candidates" component={CandidatesPage} />
      <ProtectedRoute exact path="/admin/recruiter-requests" component={HiringPartnerReqPage} />
      <ProtectedRoute exact path="/admin/recruiter-requests/:id" component={HiringPartnerDetails} />
    </Switch>
  <ScrollUp />
  </>
)

export default App;
