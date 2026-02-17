import './App.css';
import './Assets/css/style.css';
import { lazy, Suspense, useCallback } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Navbar from './Components/header/Navbar';
import { AlertProvider } from "./Components/alert/Alert_message";
import { useDispatch } from 'react-redux';
import { setDroper_open } from './redux/Close_droper';


// import Home from './Components/Home';
// import Service from './Components/Service';
// import Register from './Components/Register';
// import Companies from './Components/Companies';
// import Posting from './Components/Posting';
// import Pricing from './Components/Pricing';
// import Contact from './Components/Contact';
// import Career from './Components/Career';
// import Faq from './Components/Faq';
// import Imprint from './Components/Imprint';
// import Privacy from './Components/Privacy';
// import Terms from './Components/Terms';
// import Login from './Components/Login';

// Public pages
const Home = lazy(() => import('./Components/Home'));
const Service = lazy(() => import('./Components/Service'));
const Register = lazy(() => import('./Components/Register'));
const Companies = lazy(() => import('./Components/Companies'));
const Company_details = lazy(() => import('./Components/Company_details'));
const Posting = lazy(() => import('./Components/Posting'));
const Posting_details = lazy(() => import('./Components/Posting_details'));
const Pricing = lazy(() => import('./Components/Pricing'));
const Contact = lazy(() => import('./Components/Contact'));
const Career = lazy(() => import('./Components/Career'));
const Faq = lazy(() => import('./Components/Faq'));
const Imprint = lazy(() => import('./Components/Imprint'));
const Privacy = lazy(() => import('./Components/Privacy'));
const Terms = lazy(() => import('./Components/Terms'));
const Login = lazy(() => import('./Components/Login'));
const Forgot_password = lazy(() => import('./Components/Forgot_password'));

// Payment
const PaymentSuccess = lazy(() => import('./Components/Payment/PaymentSuccess'));
const PaymentCancel = lazy(() => import('./Components/Payment/PaymentCancel'));

// Dashboard
const Dashboard_layout = lazy(() => import('./Components/Dashboard/Dashboard_layout'));
const Das_Home = lazy(() => import('./Components/Dashboard/Das_Home'));
const Das_Message = lazy(() => import('./Components/Dashboard/Das_Message'));
const Das_Profile = lazy(() => import('./Components/Dashboard/Settings/Das_Profile'));
const Das_co_general = lazy(() => import('./Components/Dashboard/Company/Das_co_general'));
const Das_co_contact = lazy(() => import('./Components/Dashboard/Company/Das_co_contact'));
const Das_co_product = lazy(() => import('./Components/Dashboard/Company/Das_co_product'));
const Das_co_certificates = lazy(() => import('./Components/Dashboard/Company/Das_co_certificates'));
const Das_myPost = lazy(() => import('./Components/Dashboard/Post/Das_myPost'));
const Das_newPost = lazy(() => import('./Components/Dashboard/Post/Das_newPost'));
const Das_likePost = lazy(() => import('./Components/Dashboard/Post/Das_likePost'));
const Das_my_plane = lazy(() => import('./Components/Dashboard/Settings/Das_my_plan'));
const Das_notifications = lazy(() => import('./Components/Dashboard/Settings/Dash_notifications'));


// import Dashboard_layout from './Components/Dashboard/Dashboard_layout';
// import Das_Home from './Components/Dashboard/Das_Home';
// import Das_Message from './Components/Dashboard/Das_Message';
// import Das_Profile from './Components/Dashboard/Settings/Das_Profile';
// import Das_co_general from './Components/Dashboard/Company/Das_co_general';
// import Das_co_contact from './Components/Dashboard/Company/Das_co_contact';
// import Das_co_product from './Components/Dashboard/Company/Das_co_product';
// import Das_co_certificates from './Components/Dashboard/Company/Das_co_certificates';
// import Das_myPost from './Components/Dashboard/Post/Das_myPost';
// import Das_newPost from './Components/Dashboard/Post/Das_newPost';
// import Das_likePost from './Components/Dashboard/Post/Das_likePost';
// import Das_my_plane from './Components/Dashboard/Settings/Das_my_plan';
// import Das_notifications from './Components/Dashboard/Settings/Dash_notifications';
// // import Company_details from './Components/Company_details';
// import PaymentSuccess from './Components/Payment/PaymentSuccess';
// import PaymentCancel from './Components/Payment/PaymentCancel';
// // import Posting_details from './Components/Posting_details';

// import Forgot_password from './Components/Forgot_password';

const AppContent = () => {

  return (
    <div className="App" >
      <Suspense fallback={<div className="page-loader">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/company/:companyId" element={<Company_details />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/posting/:postID" element={<Posting_details />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/career" element={<Career />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path='forgot-password' element={<Forgot_password />} />


        <Route path='/dashboard' element={<Dashboard_layout />}>
          <Route index element={<Das_Home />} />
          <Route path='home' element={<Das_Home />} />
          <Route path='message' element={<Das_Message />} />
          <Route path='company/general-settings' element={<Das_co_general />} />
          <Route path='company/contact-settings' element={<Das_co_contact />} />
          <Route path='company/product-management' element={<Das_co_product />} />
          <Route path='company/certificates' element={<Das_co_certificates />} />
          <Route path='post/my-posts' element={<Das_myPost />} />
          <Route path='post/new-post' element={<Das_newPost />} />
          <Route path='post/like-posts' element={<Das_likePost />} />
          <Route path='profile' element={<Das_Profile />} />
          <Route path='my-plan' element={<Das_my_plane />} />
          <Route path='notifications' element={<Das_notifications />} />
        </Route>

      </Routes>
      </Suspense>
    </div>
  );
};

function App() {
  const dispatch = useDispatch();

  const closeDropdown = useCallback(() => {
    dispatch(setDroper_open(false));
  }, [dispatch]);
  
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
      <Router>
        <ScrollToTop />
        <AlertProvider>
          <div className="app-wrapper" onClick={closeDropdown}>
            <Navbar />
            <AppContent />
          </div>
        </AlertProvider>
      </Router>
    </GoogleReCaptchaProvider>

  );
}

export default App;
