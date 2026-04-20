import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Home from './components/home/home.jsx'
import Profile from './components/profile/profile.jsx'
import RegisterForm from './components/register/register.jsx'
import LoginForm from './components/login/login.jsx'


function loadTestData()
{
  localStorage.setItem("userData", {
    username : "placeholder30",
    registerDate : "18-Mar-2025",
    ecorank: "4",
    description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In commodo consequat convallis. Quisque et lorem ut quam interdum feugiat id nec sem. Sed vitae massa non mauris placerat gravida. Fusce volutpat est vitae tortor vehicula tempor vel non massa. In varius eros diam, eu laoreet sapien luctus sit amet. Aliquam pellentesque, magna sed placerat lobortis, est eros sollicitudin felis, quis scelerisque felis diam vitae dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    badges: {
      1: "coolbadge",
      2: "awesomebadge",
      3: "nicebadge",
      4: "ecobadge",
    }

  })
}






function App() {

  if (!localStorage.getItem("loggedIn")) {
    localStorage.setItem("loggedIn", false)
  }

  return (
    <>
      <Navbar/>
    </>
  )
}

export default App
