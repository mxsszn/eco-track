import React from 'react';
import './App.css';

// 1. Temporarily comment out the Navbar import
// import Navbar from './components/navbar/navbar.jsx'; 

import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <>
      {/* 2. Temporarily comment out the Navbar component */}
      {/* <Navbar /> */}

      {/* 3. Only render YOUR Dashboard */}
      <Dashboard />
    </>
  );
}

export default App;