import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

/**
 * DASHBOARD COMPONENT
 * Displays real-time stats fetched from Firebase.
 */
const Dashboard = () => {

  // State to hold the data (starts with default 0s)
  const [userStats, setUserStats] = useState({
    co2Saved: 0,
    journeys: 0,
    points: 0
  });

  // EFFECT: Fetch data when the page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: In Sprint 2, we will fetch real data here.
        // Example logic for later:
        // const q = query(collection(db, "journeys"), where("userId", "==", "current_user_id"));
        // const querySnapshot = await getDocs(q);
        // Calculate totals from snapshot...

        console.log("Dashboard connected to DB. Waiting for Journey Data.");
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Destructure values for clean usage
  const { co2Saved, journeys, points } = userStats;

  return (
    <div className="dashboard-container">

      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, Mekael</h1>
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
          {/* Mock Items for UI Demo - Will map() this later */}
          <ActivityItem icon="🚌" title="Bus to Campus" time="Today, 09:30 AM" impact="+1.2kg Saved" />
          <ActivityItem icon="🚶" title="Walk to Tesco" time="Yesterday, 18:45 PM" impact="+0.8kg Saved" />
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