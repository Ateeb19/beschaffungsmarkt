import './App.css';
import './Assets/css/style.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './Components/Home';
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
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AlertProvider>
        <Navbar />
        <AppContent />
      </AlertProvider>
    </Router>
  );
}

export default App;
