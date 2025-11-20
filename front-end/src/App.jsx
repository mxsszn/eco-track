import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import LoginForm from './components/login/login.jsx'
import RegisterForm from './components/Register/register.jsx'
import Profile from './components/profile/profile.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {


  return (
    <>
    <Navbar/>
    </>
  )
}

export default App
