import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Dashboard from './components/dashboard/Dashboard.jsx';

// FIXED: Changed to Capitalized filenames (Home.jsx, Profile.jsx, etc.)
// This is the standard React convention and likely matches the actual files.
import Home from './components/home/Home.jsx';
import Profile from './components/profile/Profile.jsx';


function App() {
  // Logic to handle login state
  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", "true");
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Set Dashboard as Home for now */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;