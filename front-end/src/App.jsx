import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import LoginForm from './components/login/login.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <LoginForm/>
    </>
  )
}

export default App
