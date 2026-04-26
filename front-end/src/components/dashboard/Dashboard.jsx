import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Gets userId from localStorage after Patrick's login stores it.
// Falls back to 1 if not found — so dashboard still works during testing.
const HARDCODED_USER_ID = localStorage.getItem('userId') || 1;
const API_BASE = 'http://localhost:8080';

const Dashboard = () => {

  // -- STATE VARIABLES --
  // Each useState is a box that holds a piece of data.
  // When updated, React automatically re-renders the page with the new value.
  const [userName, setUserName] = useState('Eco-Warrior');
  const [tierName, setTierName] = useState('Eco Traveler');
  const [flashMsg, setFlashMsg] = useState(null);

  const [stats, setStats] = useState({
    weeklyCo2Saved: 0,
    weeklyJourneys: 0,
    weeklyPoints: 0,
  });

  const [recentJourneys, setRecentJourneys] = useState([]);
  const [weeklyPointsChart, setWeeklyPointsChart] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ─── EFFECT 1: Check for flash message ──────────────────────────────────────
  // Runs once on page load.
  // Journey logging page stores a message in localStorage after saving a journey.
  // We read it here, show a green banner, then clear it.
  useEffect(() => {
    const storedMsg = localStorage.getItem('dashboardFlashMessage');
    if (storedMsg) {
      const parsedMsg = JSON.parse(storedMsg);
      if (Date.now() - parsedMsg.timestamp < 3600000) {
        setFlashMsg(parsedMsg);
        setTimeout(() => setFlashMsg(null), 6000);
      }
      localStorage.removeItem('dashboardFlashMessage');
    }
  }, []);

  // ─── EFFECT 2: Fetch main dashboard data ────────────────────────────────────
  // Calls GET /api/dashboard/{userId}
  // Returns: displayName, tierName, weeklyCo2Saved, weeklyJourneys,
  //          weeklyPoints, weeklyPointsChart, recentJourneys
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/dashboard/${HARDCODED_USER_ID}`);

        if (!response.ok) {
          throw new Error(`Backend returned an error (status ${response.status})`);
        }

        const data = await response.json();

        // Unpack response fields into state — names match DashboardDTO.java
        if (data.displayName) setUserName(data.displayName);
        if (data.tierName) setTierName(data.tierName);

        setStats({
          weeklyCo2Saved: data.weeklyCo2Saved ?? 0,
          weeklyJourneys: data.weeklyJourneys ?? 0,
          weeklyPoints:   data.weeklyPoints   ?? 0,
        });

        setRecentJourneys(data.recentJourneys ?? []);

        // Backend sends day names as "Mon", "Tue" etc (short format)
        // so we match against those exact strings — not uppercase full names
        if (data.weeklyPointsChart && Array.isArray(data.weeklyPointsChart)) {
          const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
          const pointsArray = dayOrder.map(day => {
            const entry = data.weeklyPointsChart.find(wp => wp.day === day);
            return entry ? entry.points : 0;
          });
          setWeeklyPointsChart(pointsArray);
        }

      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Could not load dashboard. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ─── EFFECT 3: Fetch user achievements ──────────────────────────────────────
  // Calls GET /api/achievements/user/{userId}
  // Returns list of unlocked achievements with badge icon, name, description, points
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setAchievementsLoading(true);
        const response = await fetch(`${API_BASE}/api/achievements/user/${HARDCODED_USER_ID}`);

        if (!response.ok) {
          throw new Error(`Failed to load achievements (status ${response.status})`);
        }

        const data = await response.json();
        setAchievements(data);
      } catch (err) {
        console.error('Achievements fetch error:', err);
        // Don't crash the whole dashboard if achievements fail — just show empty
        setAchievements([]);
      } finally {
        setAchievementsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // ─── HELPER: Transport mode emoji ────────────────────────────────────────────
  // Returns an emoji based on the transport mode name from the backend
  const getModeIcon = (mode) => {
    if (!mode) return '🚶';
    const m = mode.toLowerCase();
    if (m.includes('car'))                         return '🚗';
    if (m.includes('bus'))                         return '🚌';
    if (m.includes('train') || m.includes('rail')) return '🚆';
    if (m.includes('bike') || m.includes('cycle')) return '🚲';
    return '🚶';
  };

  if (loading) return <div className="loading">Loading your dashboard...</div>;
  if (error)   return <div className="loading" style={{ color: '#c0392b' }}>{error}</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        {/* FLASH BANNER - appears after a journey is logged */}
        {flashMsg && (
          <div className="flash-banner">
            <div className="flash-content">
              <span className="flash-icon">🎉</span>
              <div>
                <h4>Journey Saved!</h4>
                <p>
                  You saved <strong>{flashMsg.co2} kg</strong> CO₂ and earned{' '}
                  <strong>{flashMsg.points} Points</strong>!
                </p>
              </div>
            </div>
            <button onClick={() => setFlashMsg(null)} className="flash-close">×</button>
          </div>
        )}

        {/* HEADER - user greeting and tier badge */}
        <header className="dash-header">
          <div>
            <h1>👋 Good Evening, {userName}</h1>
            <p>Your weekly eco-impact summary.</p>
          </div>
          <div className="user-badge">🌱 {tierName}</div>
        </header>

        {/* STATS GRID - three summary cards */}
        <div className="stats-grid">
          <div className="stat-card maroon">
            <h3>CO₂ Saved (Week)</h3>
            <div className="stat-value">{Number(stats.weeklyCo2Saved).toFixed(2)} kg</div>
            <p>Vs. Driving a car 🚗</p>
          </div>
          <div className="stat-card black">
            <h3>Journeys (Week)</h3>
            <div className="stat-value">{stats.weeklyJourneys}</div>
            <p>Trips logged</p>
          </div>
          <div className="stat-card red">
            <h3>Eco Points</h3>
            <div className="stat-value">{stats.weeklyPoints}</div>
            <p>Earned this week</p>
          </div>
        </div>

        {/* WEEKLY POINTS CHART - bar chart Mon through Sun */}
        <div className="card">
          <div className="card-header">
            <h2>📊 Weekly Points</h2>
          </div>
          <div className="simple-chart">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <ChartBar
                key={day}
                label={day}
                value={weeklyPointsChart[i]}
                max={Math.max(...weeklyPointsChart, 100)}
              />
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY - last 3 journeys logged */}
        <div className="card">
          <div className="card-header">
            <h2>🗺️ Recent Activity</h2>
          </div>
          <div className="activity-list">
            {recentJourneys.length === 0 ? (
              <p className="empty-msg">No journeys yet. Go log one!</p>
            ) : (
              recentJourneys.map((j, index) => (
                <div key={index} className="activity-item">
                  <span className="icon">{getModeIcon(j.transportMode)}</span>
                  <div className="details">
                    <h4>{j.startLocation} <small>→</small> {j.destination}</h4>
                    <p>{j.journeyDate ? new Date(j.journeyDate).toLocaleDateString() : ''}</p>
                  </div>
                  <span className="save-badge">{j.distanceKm} km</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ACHIEVEMENTS - badges the user has unlocked */}
        <div className="card">
          <div className="card-header">
            <h2>🏅 My Achievements</h2>
          </div>
          {achievementsLoading ? (
            <p className="empty-msg">Loading achievements...</p>
          ) : achievements.length === 0 ? (
            <p className="empty-msg">No achievements yet. Start logging journeys to unlock badges!</p>
          ) : (
            <div className="achievements-grid">
              {achievements.map((ua, index) => (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">{ua.achievement.badge_icon}</div>
                  <div className="achievement-details">
                    <h4>{ua.achievement.achievement_name}</h4>
                    <p>{ua.achievement.description}</p>
                    <div className="achievement-meta">
                      <span className="achievement-points">+{ua.achievement.points_reward} pts</span>
                      <span className="achievement-date">
                        Earned: {new Date(ua.earned_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// ─── CHART BAR COMPONENT ─────────────────────────────────────────────────────
// Renders one bar in the weekly points chart.
// Height is calculated as a percentage of the tallest bar.
const ChartBar = ({ label, value, max }) => {
  const height = max > 0 ? `${(value / max) * 100}%` : '5%';
  return (
    <div className="chart-col">
      <div className="tooltip">{value} pts</div>
      <div
        className="chart-bar"
        style={{
          height,
          background: value > 0 ? 'linear-gradient(to top, #800000, #c0392b)' : '#e0e0e0',
        }}
      />
      <span className="bar-label">{label}</span>
    </div>
  );
};

export default Dashboard;