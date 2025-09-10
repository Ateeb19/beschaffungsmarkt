import './App.css';
import './Assets/css/style.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './Components/Home';
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Navbar from './Components/header/Navbar';
import { AlertProvider } from "./Components/alert/Alert_message";
import Service from './Components/Service';
import Register from './Components/Register';
import Companies from './Components/Companies';
import Posting from './Components/Posting';
import Pricing from './Components/Pricing';
import Contact from './Components/Contact';
import Career from './Components/Career';
import Faq from './Components/Faq';
import Imprint from './Components/Imprint';
import Privacy from './Components/Privacy';
import Terms from './Components/Terms';
import Login from './Components/Login';
import Dashboard_layout from './Components/Dashboard/Dashboard_layout';
import Das_Home from './Components/Dashboard/Das_Home';
import Das_Message from './Components/Dashboard/Das_Message';
import Das_Profile from './Components/Dashboard/Das_Profile';
const AppContent = () => {
  return (
    <div className="App">
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/career" element={<Career />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms-of-service" element={<Terms />} />
        <Route path="/login" element={<Login />} />


        <Route path='/dashboard' element={<Dashboard_layout />}>
          <Route index element={<Das_Home />} />
          <Route path='home' element={<Das_Home />} />
          <Route path='message' element={<Das_Message />} />
          <Route path='profile' element={<Das_Profile />} />
        </Route>

      </Routes>
    </div>
  );
};

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}>
      <Router>
        <AlertProvider>
          <Navbar />
          <AppContent />
        </AlertProvider>
      </Router>
    </GoogleReCaptchaProvider>

  );
}

export default App;
