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
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('userId'));

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  // Re-check login state whenever localStorage changes
  // This handles cases where login happens in another tab
  useEffect(() => {
    const checkLogin = () => {
      setLoggedIn(!!localStorage.getItem('userId'));
    };
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  return (
    <>
      {loggedIn && <Navbar loggedIn={loggedIn} onLogout={handleLogout} />}

      <Routes>
        {/* Default route — send to register if not logged in */}
        <Route path="/" element={
          loggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/register" />
        } />

        {/* Public Routes */}
        <Route path="/register" element={
          loggedIn ? <Navigate to="/dashboard" /> : <RegisterForm onLogin={handleLogin} />
        } />
        <Route path="/login" element={
          loggedIn ? <Navigate to="/dashboard" /> : <LoginForm onLogin={handleLogin} />
        } />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <RequireAuth loggedIn={loggedIn}>
            <Dashboard />
          </RequireAuth>
        } />
        <Route path="/log-journey" element={
          <RequireAuth loggedIn={loggedIn}>
            <JourneyPage />
          </RequireAuth>
        } />
        <Route path="/calculator" element={
          <RequireAuth loggedIn={loggedIn}>
            <CarbonCalculator />
          </RequireAuth>
        } />
        <Route path="/education" element={
          <RequireAuth loggedIn={loggedIn}>
            <Education />
          </RequireAuth>
        } />
        <Route path="/profile" element={
          <RequireAuth loggedIn={loggedIn}>
            <Profile />
          </RequireAuth>
        } />

        {/* Catch all — redirect to register */}
        <Route path="*" element={<Navigate to="/register" />} />
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