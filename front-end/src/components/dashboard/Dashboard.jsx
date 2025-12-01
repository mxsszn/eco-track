import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { db } from '../../firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Eco-Warrior"); 
  
  // State for the "Flash Message" banner
  const [flashMsg, setFlashMsg] = useState(null);

  const [stats, setStats] = useState({
    co2Saved: 0,
    journeysCount: 0,
    points: 0
  });
  const [recentJourneys, setRecentJourneys] = useState([]);
  const [dailyPoints, setDailyPoints] = useState([0,0,0,0,0,0,0]); 
  const auth = getAuth();

  // 1. CHECK FOR FLASH MESSAGE IN LOCAL STORAGE
  useEffect(() => {
    const storedMsg = localStorage.getItem('dashboardFlashMessage');
    if (storedMsg) {
      const parsedMsg = JSON.parse(storedMsg);
      
      // Show if less than 1 hour old
      if (Date.now() - parsedMsg.timestamp < 3600000) {
        setFlashMsg(parsedMsg);
        
        // Auto-hide banner after 6 seconds
        const timer = setTimeout(() => {
          setFlashMsg(null);
        }, 6000);
      }
      
      // Clear message so it doesn't persist on refresh
      localStorage.removeItem('dashboardFlashMessage');
    }
  }, []);

  // 2. AUTHENTICATION LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (currentUser.displayName) {
          setUserName(currentUser.displayName.split(' ')[0]); 
        } else {
          try {
            const userDocRef = doc(db, "users", currentUser.uid);
            const userSnap = await getDoc(userDocRef);
            if (userSnap.exists()) {
              setUserName(userSnap.data().firstName || "Eco-Warrior");
            }
          } catch (err) {
            console.error("Error fetching user name:", err);
          }
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // 3. DATA FETCHING LOGIC (Weekly Reset)
  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const q = query(
        collection(db, "journeys"),
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );

      const querySnapshot = await getDocs(q);
      const allData = querySnapshot.docs.map(doc => doc.data());

      let totalCo2 = 0;
      let count = 0;
      let totalPoints = 0;
      const pointsPerDay = [0,0,0,0,0,0,0]; // Mon=0, Sun=6

      const thisWeekData = allData.filter(journey => {
        const jDate = journey.timestamp.toDate ? journey.timestamp.toDate() : new Date(journey.timestamp);
        return jDate >= sevenDaysAgo;
      });

      thisWeekData.forEach(j => {
        const carEmission = j.distanceKm * 0.17;
        const actualEmission = j.co2Saved; 
        let savedAmount = carEmission - actualEmission; 
        if (savedAmount < 0) savedAmount = 0; 

        totalCo2 += savedAmount;
        count += 1;
        const pts = Math.floor(savedAmount * 100);
        totalPoints += pts;

        const dayIndex = (j.timestamp.toDate().getDay() + 6) % 7;
        pointsPerDay[dayIndex] += pts;
      });

      setStats({
        co2Saved: totalCo2.toFixed(2),
        journeysCount: count,
        points: totalPoints
      });
      
      setDailyPoints(pointsPerDay);
      setRecentJourneys(allData.slice(0, 3)); 
    };

    fetchDashboardData();
  }, [user]);

  if (!user) return <div className="loading">Please log in to view dashboard...</div>;

  return (
    <div className="dashboard-container">
      
      {/* --- FLASH MESSAGE BANNER --- */}
      {flashMsg && (
        <div className="flash-banner">
          <div className="flash-content">
            <span className="flash-icon">🎉</span>
            <div>
              <h4>Journey Saved!</h4>
              <p>You saved <strong>{flashMsg.co2} kg</strong> CO₂ and earned <strong>{flashMsg.points} Points</strong>!</p>
            </div>
          </div>
          <button onClick={() => setFlashMsg(null)} className="flash-close">×</button>
        </div>
      )}

      <header className="dash-header">
        <div>
          <h1>👋 Good Evening, {userName}</h1>
          <p>Your weekly eco-impact summary.</p>
        </div>
        <div className="user-badge">🌱 Eco-Traveler</div>
      </header>

      <div className="stats-grid">
        {/* Clean White Cards with Accents */}
        <div className="stat-card maroon">
          <h3>CO₂ Saved (Week)</h3>
          <div className="stat-value">{stats.co2Saved} kg</div>
          <p>Vs. Driving a car 🚗</p>
        </div>
        <div className="stat-card black">
          <h3>Journeys (Week)</h3>
          <div className="stat-value">{stats.journeysCount}</div>
          <p>Trips logged</p>
        </div>
        <div className="stat-card red">
          <h3>Eco Points</h3>
          <div className="stat-value">{stats.points}</div>
          <p>Earned this week</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-header">
          <h2>📊 Weekly Points</h2>
        </div>
        <div className="simple-chart">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => (
             <ChartBar 
               key={day} 
               label={day} 
               value={dailyPoints[i]} 
               max={Math.max(...dailyPoints, 100)} 
             />
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {recentJourneys.length === 0 ? <p>No journeys yet. Go log one!</p> : (
            recentJourneys.map((j, index) => (
              <div key={index} className="activity-item">
                <span className="icon">
                  {j.mode === 'car' ? '🚗' : j.mode === 'bus' ? '🚌' : j.mode === 'train' ? '🚆' : '🚶'}
                </span>
                <div className="details">
                  <h4>{j.from} <small>→</small> {j.to}</h4>
                  <p>{new Date(j.timestamp?.toDate ? j.timestamp.toDate() : j.timestamp).toLocaleDateString()}</p>
                </div>
                <span className="save-badge">{j.distanceKm} km</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Helper for Chart Bars with Tooltip
const ChartBar = ({ label, value, max }) => {
  const height = max > 0 ? `${(value / max) * 100}%` : '5%';
  
  return (
    <div className="chart-col">
      <div className="tooltip">{value} pts</div>
      <div 
        className="chart-bar" 
        style={{ 
          height: height, 
          // Maroon Gradient for bars
          background: value > 0 ? 'linear-gradient(to top, #800000, #c0392b)' : '#e0e0e0' 
        }}
      ></div>
      <span className="bar-label">{label}</span>
    </div>
  );
}

export default Dashboard;