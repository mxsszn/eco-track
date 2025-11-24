import React from 'react';
import './Dashboard.css';

/**
 * DASHBOARD COMPONENT
 * This is the main view for the user after login.
 * It displays key metrics (CO2 saved) and recent activity.
 * * Tech Note: Using ES6 Arrow Function syntax as per module best practices.
 */
const Dashboard = () => {
  
  // MOCK DATA OBJECT
  // Currently hardcoded for Sprint 1 UI validation.
  // In Sprint 2, this will be replaced by a fetch() call to the Firebase 'users' collection.
  const userStats = {
    co2Saved: 12.5,
    journeys: 8,
    points: 450
  };

  // ES6 DESTRUCTURING
  // We unpack these values so we can use 'co2Saved' directly instead of 'userStats.co2Saved'.
  // This makes the JSX cleaner and easier to read.
  const { co2Saved, journeys, points } = userStats;

  return (
    <div className="dashboard-container">
      
      {/* --- HEADER SECTION --- */}
      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, Mekael</h1>
          <p>Here is your daily eco-impact.</p>
        </div>
        <div className="user-badge">🌱 Eco-Warrior Lvl 3</div>
      </header>

      {/* --- KEY METRICS GRID --- */}
      <div className="stats-grid">
        
        {/* Card 1: The Primary Goal */}
        <div className="stat-card green">
          <h3>CO₂ Saved</h3>
          <div className="stat-value">{co2Saved} kg</div>
          <p>▼ 15% from last week</p>
        </div>

        {/* Card 2: Engagement Metric */}
        <div className="stat-card blue">
          <h3>Total Journeys</h3>
          <div className="stat-value">{journeys}</div>
          <p>3 logged this week</p>
        </div>

        {/* Card 3: Gamification */}
        <div className="stat-card yellow">
          <h3>Eco Points</h3>
          <div className="stat-value">{points}</div>
          <p>50 pts to next reward</p>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="content-section">
        <h2>Recent Activity</h2>
        
        {/* List of recent trips. Later, we will .map() over an array from the database here. */}
        <div className="activity-list">
          <ActivityItem 
            icon="🚌" 
            title="Bus to Campus" 
            time="Today, 09:30 AM" 
            impact="+1.2kg Saved" 
          />
          <ActivityItem 
            icon="🚶" 
            title="Walk to Tesco" 
            time="Yesterday, 18:45 PM" 
            impact="+0.8kg Saved" 
          />
          {/* Example of a negative impact journey */}
          <ActivityItem 
            icon="🚗" 
            title="Car Ride (Carpool)" 
            time="Mon, 08:15 AM" 
            impact="High Impact" 
            isNegative={true} 
          />
        </div>
      </div>

      {/* --- MAP MODULE --- */}
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

/**
 * HELPER COMPONENT: ActivityItem
 * Breaking this out into a small sub-component makes the main Dashboard cleaner.
 * It accepts props for the icon, title, and impact score.
 */
const ActivityItem = ({ icon, title, time, impact, isNegative }) => (
  <div className="activity-item">
    <span className="icon">{icon}</span>
    <div className="details">
      <h4>{title}</h4>
      <p>{time}</p>
    </div>
    {/* Conditional Class: If 'isNegative' is true, use red color, otherwise green */}
    <span className={isNegative ? "neutral-badge" : "save-badge"}>
      {impact}
    </span>
  </div>
);

export default Dashboard;