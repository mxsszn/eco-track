import React from 'react';
import './Dashboard.css'; // Import the styling for this page

function Dashboard() {
  // Mock Data: This mimics what the database will eventually send us
  // We use this "fake" data so the UI looks real for your presentation
  const userStats = {
    co2Saved: 12.5,
    journeys: 8,
    points: 450
  };

  return (
    <div className="dashboard-container">
      
      {/* 1. Header Section */}
      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, Mekael</h1>
          <p>Here is your daily eco-impact.</p>
        </div>
        <div className="user-badge">🌱 Eco-Warrior Lvl 3</div>
      </header>

      {/* 2. Key Stats Grid */}
      <div className="stats-grid">
        {/* Card 1: CO2 Saved */}
        <div className="stat-card green">
          <h3>CO₂ Saved</h3>
          <div className="stat-value">{userStats.co2Saved} kg</div>
          <p>▼ 15% from last week</p>
        </div>

        {/* Card 2: Total Journeys */}
        <div className="stat-card blue">
          <h3>Total Journeys</h3>
          <div className="stat-value">{userStats.journeys}</div>
          <p>3 logged this week</p>
        </div>

        {/* Card 3: Gamification Points */}
        <div className="stat-card yellow">
          <h3>Eco Points</h3>
          <div className="stat-value">{userStats.points}</div>
          <p>50 pts to next reward</p>
        </div>
      </div>

      {/* 3. Recent Activity Section */}
      <div className="content-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          
          {/* Activity Item 1 */}
          <div className="activity-item">
            <span className="icon">🚌</span>
            <div className="details">
              <h4>Bus to Campus</h4>
              <p>Today, 09:30 AM</p>
            </div>
            <span className="save-badge">+1.2kg Saved</span>
          </div>

          {/* Activity Item 2 */}
          <div className="activity-item">
            <span className="icon">🚶</span>
            <div className="details">
              <h4>Walk to Tesco</h4>
              <p>Yesterday, 18:45 PM</p>
            </div>
            <span className="save-badge">+0.8kg Saved</span>
          </div>

          {/* Activity Item 3 */}
          <div className="activity-item">
            <span className="icon">🚗</span>
            <div className="details">
              <h4>Car Ride (Carpool)</h4>
              <p>Mon, 08:15 AM</p>
            </div>
            <span className="neutral-badge">High Impact</span>
          </div>

        </div>
      </div>

      {/* 4. Map Placeholder (For "Coming Soon") */}
      <div className="map-section">
        <h3>🗺️ Live Route Map</h3>
        <div className="map-placeholder">
          <p>Interactive Map Module Loading...</p>
          <small>(Coming in Sprint 2)</small>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;