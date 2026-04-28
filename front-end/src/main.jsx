import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Clear stale session on app start by verifying userId still exists in backend
const userId = localStorage.getItem('userId');

if (userId) {
  fetch(`http://localhost:8080/api/profile/${userId}`)
    .then((res) => {
      if (!res.ok) {
        localStorage.clear();
      }
    })
    .catch(() => {
      localStorage.clear();
    });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);