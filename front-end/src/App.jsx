import Dashboard from './components/Dashboard.jsx'
import Navbar from './components/navbar/navbar.jsx'
import './App.css'

function App() {
  return (
    <div className="App">

      <Navbar/>
      
      {/* Show the Dashboard by default */}
      <Dashboard />
      
    
    </div>
  )
}

export default App