import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home.jsx'
import Profile from './components/profile/profile.jsx'
import RegisterForm from './components/Register/register.jsx'
import LoginForm from './components/login/login.jsx'




function App() {

  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", true)
  }

  return (
    <>
      <Navbar/>
    </>
  )
}

export default App
