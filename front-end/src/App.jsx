import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/navbar/navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import JourneyPage from './components/JourneyLog/JourneyPage.jsx';
import Profile from './components/profile/profile.jsx';
import RegisterForm from './components/register/register.jsx';
import LoginForm from './components/login/login.jsx';
import CarbonCalculator from './components/carbon-calculator/CarbonCalculator.jsx';
import Education from './components/education/edu.jsx';

function App() {
  // Check if user is logged in via localStorage
  // This works with Patrick's backend login which stores userId in localStorage
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  // Listen for storage changes so login/logout updates the UI automatically
  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedIn(!!localStorage.getItem('userId'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RegisterForm />} />
        <Route path="/register" element={loggedIn ? <Navigate to="/dashboard" /> : <RegisterForm />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <LoginForm />} />

        {/* Protected Routes - Only accessible if logged in */}
        <Route path="/dashboard" element={<RequireAuth loggedIn={loggedIn}><Dashboard /></RequireAuth>} />
        <Route path="/log-journey" element={<RequireAuth loggedIn={loggedIn}><JourneyPage /></RequireAuth>} />
        <Route path="/calculator" element={<RequireAuth loggedIn={loggedIn}><CarbonCalculator /></RequireAuth>} />
        <Route path="/education" element={<RequireAuth loggedIn={loggedIn}><Education /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth loggedIn={loggedIn}><Profile /></RequireAuth>} />
      </Routes>
    </>
  );
}

// Gatekeeper — redirects to login if not logged in
function RequireAuth({ loggedIn, children }) {
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default App;