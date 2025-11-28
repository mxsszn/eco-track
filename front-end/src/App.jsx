import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

import Navbar from './components/navbar/navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';
import JourneyLogger from './components/JourneyLog/JourneyLogger.jsx';
import Profile from './components/profile/profile.jsx';
import RegisterForm from './components/register/register.jsx';
import LoginForm from './components/login/login.jsx';
import CarbonCalculator from './components/carbon-calculator/CarbonCalculator.jsx';
// import Education from './components/education/edu.jsx'; 

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false); 
      
      if (currentUser) {
        localStorage.setItem("loggedIn", "true");
      } else {
        localStorage.removeItem("loggedIn");
      }
    });
    return () => unsubscribe();
  }, []);

  if (authLoading) {
    return <div className="loading-screen">Loading App...</div>; 
  }

  return (
    <>
      <Navbar user={user} />
      
      <Routes>
        {/* Public Routes - Redirect to Dashboard if already logged in */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <RegisterForm />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterForm />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginForm />} />

        {/* Protected Routes - Only accessible if logged in */}
        <Route path="/dashboard" element={<RequireAuth user={user}><Dashboard /></RequireAuth>} />
        <Route path="/log-journey" element={<RequireAuth user={user}><JourneyLogger /></RequireAuth>} />
        <Route path="/calculator" element={<RequireAuth user={user}><CarbonCalculator /></RequireAuth>} />
        {/* <Route path="/education" element={<RequireAuth user={user}><Education /></RequireAuth>} /> */}
        <Route path="/profile" element={<RequireAuth user={user}><Profile /></RequireAuth>} />
      </Routes>
    </>
  );
}

// Gatekeeper Component
function RequireAuth({ user, children }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;