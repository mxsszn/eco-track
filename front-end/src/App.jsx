import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

// Temporarily commenting out other components to focus on Dashboard & Navbar
// import Home from './components/home/Home.jsx';
// import Profile from './components/profile/Profile.jsx';
// import RegisterForm from './components/register/Register.jsx';
// import LoginForm from './components/login/Login.jsx';

function App() {
  // Logic to handle login state (keeping this as requested)
  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", "true");
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* PRIORITY: Dashboard is now the main view */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Temporarily disabled routes */}
          {/* <Route path="/home" element={<Home />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/register" element={<RegisterForm />} /> */}
          {/* <Route path="/login" element={<LoginForm />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;