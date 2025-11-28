import React, { useState } from 'react';
import './Dashboard.css';
// Imports for future database connection (Sprint 2)
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {

  // 1. STATE: Mock Data with realistic UK values
  // Car: 0.17kg/km | Bus: 0.10kg/km | Train: 0.035kg/km
  const [userStats] = useState({
    co2Saved: 24.5, // Total kg saved so far
    journeys: 12,   // Total number of trips logged
    points: 1250    // 10 points awarded per 0.2kg saved
  });

  // Destructure for cleaner HTML
  const { co2Saved, journeys, points } = userStats;

  return (
    <div className="dashboard-container">

      {/* HEADER */}
      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, Mekael</h1>
          <p>Your daily eco-impact summary.</p>
        </div>
        <div className="user-badge">🌱 Eco-Warrior Lvl 3</div>
      </header>

      {/* METRICS GRID */}
      <div className="stats-grid">
        <div className="stat-card green">
          <h3>CO₂ Saved</h3>
          <div className="stat-value">{co2Saved} kg</div>
          <p>Equivalent to 2 trees planted 🌳</p>
        </div>
        <div className="stat-card blue">
          <h3>Total Journeys</h3>
          <div className="stat-value">{journeys}</div>
          <p>4 logged this week</p>
        </div>
        <div className="stat-card yellow">
          <h3>Eco Points</h3>
          <div className="stat-value">{points}</div>
          <p>Only 250 pts to next Reward!</p>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="charts-section">
        <div className="chart-header">
          <h2>📊 Weekly Impact</h2>
          <span className="chart-subtitle">Points earned per day based on CO₂ savings</span>
        </div>
        <div className="chart-container">
          <SimpleBarChart />
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="content-section">
        <h2>Recent Journeys</h2>
        <div className="activity-list">
          <ActivityItem 
            icon="🚌" 
            title="Bus to Brunel Uni (5km)" 
            time="Today, 09:30 AM" 
            impact="+0.35kg Saved" 
          />
          <ActivityItem 
            icon="🚶" 
            title="Walk to Tesco (1.2km)" 
            time="Yesterday, 18:45 PM" 
            impact="+0.20kg Saved" 
          />
          <ActivityItem 
            icon="🚆" 
            title="Train to Central London (25km)" 
            time="Mon, 08:15 AM" 
            impact="+3.40kg Saved" 
          />
        </div>
      </div>

      {/* QUOTE FOOTER */}
      <footer className="quote-section">
        <div className="quote-container">
          <span className="quote-icon">❝</span>
          <blockquote>
            The Earth is what we all have in common.
          </blockquote>
          <cite>— Wendell Berry</cite>
        </div>
      </footer>

    </div>
  );
};

// --- HELPER COMPONENTS ---

const ActivityItem = ({ icon, title, time, impact, isNegative }) => (
  <div className="activity-item">
    <span className="icon">{icon}</span>
    <div className="details">
      <h4>{title}</h4>
      <p>{time}</p>
    </div>
    <span className={isNegative ? "neutral-badge" : "save-badge"}>{impact}</span>
  </div>
);

const SimpleBarChart = () => (
  <div className="simple-chart">
    {/* Visual-only bars for Sprint 1 Demo */}
    <ChartBar height="40%" label="Mon" />
    <ChartBar height="70%" label="Tue" />
    <ChartBar height="30%" label="Wed" />
    <ChartBar height="90%" label="Thu" />
    <ChartBar height="60%" label="Fri" />
    <ChartBar height="20%" label="Sat" />
    <ChartBar height="5%" label="Sun" />
  </div>
);

const ChartBar = ({ height, label }) => (
  <div className="chart-col">
    <div className="chart-bar" style={{ height }}></div>
    <span className="bar-label">{label}</span>
  </div>
);

export default Dashboard;