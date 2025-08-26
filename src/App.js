import './App.css';
import './Assets/css/style.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Home from './Components/Home';
import Navbar from './Components/header/Navbar';
import { AlertProvider } from "./Components/alert/Alert_message";

const AppContent = () => {
  return (
    <div className="App">
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<Home />} />
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
