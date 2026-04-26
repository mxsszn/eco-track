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
  // Check if user is logged in based on userId in localStorage
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));
 
  // This function is passed to Navbar so logout can update the state
  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };
 
  // Re-check login state whenever localStorage changes
  useEffect(() => {
    const checkLogin = () => {
      setLoggedIn(!!localStorage.getItem('userId'));
    };
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);
 
  return (
    <>
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
 
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={loggedIn ? <Navigate to="/dashboard" /> : <RegisterForm />} />
        <Route path="/register" element={loggedIn ? <Navigate to="/dashboard" /> : <RegisterForm onLogin={() => setLoggedIn(true)} />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={() => setLoggedIn(true)} />} />
 
        {/* Protected Routes */}
        <Route path="/dashboard" element={<RequireAuth loggedIn={loggedIn}><Dashboard /></RequireAuth>} />
        <Route path="/log-journey" element={<RequireAuth loggedIn={loggedIn}><JourneyPage /></RequireAuth>} />
        <Route path="/calculator" element={<RequireAuth loggedIn={loggedIn}><CarbonCalculator /></RequireAuth>} />
        <Route path="/education" element={<RequireAuth loggedIn={loggedIn}><Education /></RequireAuth>} />
        <Route path="/profile" element={<RequireAuth loggedIn={loggedIn}><Profile /></RequireAuth>} />
      </Routes>
    </>
  );
}
 
function RequireAuth({ loggedIn, children }) {
  const location = useLocation();
  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}
 
export default App;