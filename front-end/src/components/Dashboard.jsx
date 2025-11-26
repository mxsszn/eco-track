import React, { useEffect, useState } from 'react'; // ✅ FIXED: Added useState
import './Dashboard.css';
import { db } from '../firebase'; 
import { collection, addDoc } from 'firebase/firestore'; 

/**
 * DASHBOARD COMPONENT
 */
const Dashboard = () => {
  
  // Status State
  const [status, setStatus] = useState("⏳ Connecting to Firebase...");

  // Connection Test
  useEffect(() => {
    const testConnection = async () => {
      try {
        await addDoc(collection(db, "test_connection"), {
          message: "Mekael's Visual Test",
          timestamp: new Date()
        });
        setStatus("✅ SUCCESS: Connected to Database!"); 
      } catch (e) {
        console.error(e);
        setStatus("❌ ERROR: " + e.message);
      }
    };

    testConnection(); 
  }, []);

  const userStats = {
    co2Saved: 12.5,
    journeys: 8,
    points: 450
  };

  const { co2Saved, journeys, points } = userStats;

  return (
    <div className="dashboard-container">

      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, Mekael</h1>
          
          {/* --- VISUAL STATUS BOX --- */}
          <div style={{ 
            marginTop: '10px', 
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: status.includes("SUCCESS") ? '#d4edda' : '#fff3cd',
            color: status.includes("SUCCESS") ? '#155724' : '#856404',
            border: '1px solid currentColor',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            maxWidth: 'fit-content' // Keeps the box neat
          }}>
            {status}
          </div>

          <p>Here is your daily eco-impact.</p>
        </div>
        <div className="user-badge">🌱 Eco-Warrior Lvl 3</div>
      </header>

      <div className="stats-grid">
        <div className="stat-card green">
          <h3>CO₂ Saved</h3>
          <div className="stat-value">{co2Saved} kg</div>
          <p>▼ 15% from last week</p>
        </div>

        <div className="stat-card blue">
          <h3>Total Journeys</h3>
          <div className="stat-value">{journeys}</div>
          <p>3 logged this week</p>
        </div>

        <div className="stat-card yellow">
          <h3>Eco Points</h3>
          <div className="stat-value">{points}</div>
          <p>50 pts to next reward</p>
        </div>
      </div>

      <div className="content-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <ActivityItem icon="🚌" title="Bus to Campus" time="Today, 09:30 AM" impact="+1.2kg Saved" />
          <ActivityItem icon="🚶" title="Walk to Tesco" time="Yesterday, 18:45 PM" impact="+0.8kg Saved" />
          <ActivityItem icon="🚗" title="Car Ride" time="Mon, 08:15 AM" impact="High Impact" isNegative={true} />
        </div>
      </div>

      <div className="map-section">
        <h3>🗺️ Live Route Map</h3>
        <div className="map-placeholder">
          <p>Interactive Map Module Loading...</p>
          <small>(Coming in Sprint 2)</small>
        </div>
      </div>

    </div>
  );
};

const ActivityItem = ({ icon, title, time, impact, isNegative }) => (
  <div className="activity-item">
    <span className="icon">{icon}</span>
    <div className="details">
      <h4>{title}</h4>
      <p>{time}</p>
    </div>
    <span className={isNegative ? "neutral-badge" : "save-badge"}>
      {impact}
    </span>
  </div>
);

export default Dashboard;