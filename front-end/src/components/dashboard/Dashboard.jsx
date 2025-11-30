import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { db } from '../../firebase';
import { collection, query, where, orderBy, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("Eco-Warrior"); // Default name
  
  const [stats, setStats] = useState({
    co2Saved: 0,
    journeysCount: 0,
    points: 0
  });
  const [recentJourneys, setRecentJourneys] = useState([]);
  const [dailyPoints, setDailyPoints] = useState([0,0,0,0,0,0,0]); 
  const auth = getAuth();

  // 1. Fetch User & Name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Option A: Use Google Display Name
        if (currentUser.displayName) {
          setUserName(currentUser.displayName.split(' ')[0]); // First name only
        } 
        // Option B: Fetch from Firestore (if registered via form)
        else {
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

  // 2. Fetch Dashboard Data (Same as before)
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
      const pointsPerDay = [0,0,0,0,0,0,0];

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
      <header className="dash-header">
        <div>
          {/* ✅ UPDATED WELCOME MESSAGE */}
          <h1>👋 Good Evening, {userName}</h1>
          <p>Your weekly eco-impact summary.</p>
        </div>
        <div className="user-badge">🌱 Eco-Traveler</div>
      </header>

      <div className="stats-grid">
        <div className="stat-card green">
          <h3>CO₂ Saved (Week)</h3>
          <div className="stat-value">{stats.co2Saved} kg</div>
          <p>Vs. Driving a car 🚗</p>
        </div>
        <div className="stat-card blue">
          <h3>Journeys (Week)</h3>
          <div className="stat-value">{stats.journeysCount}</div>
          <p>Trips logged</p>
        </div>
        <div className="stat-card yellow">
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
             <ChartBar key={day} label={day} value={dailyPoints[i]} max={Math.max(...dailyPoints, 100)} />
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

const ChartBar = ({ label, value, max }) => {
  const height = max > 0 ? `${(value / max) * 100}%` : '5%';
  return (
    <div className="chart-col">
      <div className="chart-bar" style={{ height: height, backgroundColor: value > 0 ? '#27ae60' : '#e0e0e0' }}></div>
      <span className="bar-label">{label}</span>
    </div>
  );
}

export default Dashboard;