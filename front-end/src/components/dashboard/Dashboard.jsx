import React, { useState } from 'react';
import './Dashboard.css';
// We keep these imports so they are ready for Sprint 2 integration
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';


const Dashboard = () => {

  // Mock Data: Based on average UK transport emissions (Gov.uk 2023 figures)
  // Car (avg) = 0.17 kg/km | Bus = 0.10 kg/km | Train = 0.035 kg/km
  const [userStats] = useState({
    co2Saved: 24.5, // kg (Cumulative)
    journeys: 12,   // Total trips
    points: 1250    // 10 points per 0.2kg saved
  });

  const { co2Saved, journeys, points } = userStats;

  return (
    <div className="dashboard-container">

      {/* --- HEADER --- */}
      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, Mekael</h1>
          <p>Your daily eco-impact summary.</p>
        </div>
        <div className="user-badge">🌱 Eco-Warrior Lvl 3</div>
      </header>

      {/* --- KEY METRICS GRID --- */}
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

      {/* --- CHARTS SECTION --- */}
      <div className="charts-section">
        <div className="chart-header">
          <h2>📊 Weekly Impact</h2>
          <span className="chart-subtitle">Points earned per day based on CO₂ savings</span>
        </div>
        <div className="chart-container">
          {/* Visual representation of daily points */}
          <SimpleBarChart />
        </div>
      </div>

      {/* --- RECENT ACTIVITY --- */}
      <div className="content-section">
        <h2>Recent Journeys</h2>
        <div className="activity-list">
          {/* Calculated using: (Car Emission - Bus Emission) * Distance */}
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

      {/* --- INSPIRATIONAL QUOTE FOOTER --- */}
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

/**
 * Helper: Individual Activity Item
 */
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

/**
 * Helper: Simple CSS Bar Chart
 * Represents points earned over the last 7 days
 */
const SimpleBarChart = () => (
  <div className="simple-chart">
    {/* Day 1: 200 pts */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '40%'}}>
        <span className="tooltip">200 pts</span>
      </div>
      <span className="bar-label">Mon</span>
    </div>
    
    {/* Day 2: 350 pts */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '70%'}}>
        <span className="tooltip">350 pts</span>
      </div>
      <span className="bar-label">Tue</span>
    </div>

    {/* Day 3: 150 pts */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '40%'}}>
        <span className="tooltip">150 pts</span>
      </div>
      <span className="bar-label">Wed</span>
    </div>

    {/* Day 4: 450 pts (High activity) */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '90%'}}>
        <span className="tooltip">450 pts</span>
      </div>
      <span className="bar-label">Thu</span>
    </div>

    {/* Day 5: 300 pts */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '60%'}}>
        <span className="tooltip">300 pts</span>
      </div>
      <span className="bar-label">Fri</span>
    </div>

    {/* Day 6: 100 pts */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '20%'}}>
        <span className="tooltip">100 pts</span>
      </div>
      <span className="bar-label">Sat</span>
    </div>

    {/* Day 7: 0 pts */}
    <div className="chart-col">
      <div className="chart-bar" style={{height: '5%'}}>
        <span className="tooltip">0 pts</span>
      </div>
      <span className="bar-label">Sun</span>
    </div>
  </div>
);

export default Dashboard;