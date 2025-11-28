import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import JourneyLogger from './components/JourneyLog/JourneyLogger.jsx'; 
import Profile from './components/profile/profile.jsx';
import RegisterForm from './components/register/register.jsx';
import LoginForm from './components/login/login.jsx';
import CarbonCalculator from './components/carbon-calculator/CarbonCalculator.jsx';

function App() {
  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", "true");
  }

  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/log-journey" element={<JourneyLogger />} />
        <Route path="/calculator" element={<CarbonCalculator />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Placeholder for education page - comment out if not ready */}
        <Route path="/education" element={<div style={{padding: '20px'}}>Education page coming soon!</div>} />
      </Routes>
    </>
  );
}

export default App;