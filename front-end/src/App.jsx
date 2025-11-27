import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import Home from './components/home/home.jsx';
import Profile from './components/profile/profile.jsx';
import RegisterForm from './components/Register/register.jsx';
import LoginForm from './components/login/login.jsx';

function App() {
  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", true);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;