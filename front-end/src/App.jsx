import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.jsx'; 
// Import the new JourneyLogging component
import JourneyLogging from './components/JourneyLogging.jsx';
// Note: Dashboard is currently unused, but we keep the file in the project.
// import Dashboard from './components/Dashboard.jsx'; 

function App() {
  return (
    <>
      {/* Keep the Navbar so it looks real */}
      <Navbar />
      
      {/* --- TEST ZONE: Swapped components here --- */}
      {/* Showing JourneyLogging instead of Dashboard for visual testing */}
      <JourneyLogging /> 
    </>
  );
}

export default App;