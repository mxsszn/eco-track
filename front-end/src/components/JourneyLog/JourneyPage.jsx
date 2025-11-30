import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; 
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import JourneyForm from './JourneyForm.jsx';
import MapPanel from './MapPanel.jsx';
import SavedJourneys from './SavedJourneys.jsx';
import './JourneyLog.css';

const JourneyPage = () => {
  const [journeys, setJourneys] = useState([]);
  const [user, setUser] = useState(null);
  const [currentRoute, setCurrentRoute] = useState([]); 
  const [selectedJourney, setSelectedJourney] = useState(null); // Holds the data to fill
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setJourneys([]);
      return;
    }
    const q = query(
      collection(db, "journeys"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setJourneys(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [user]);

  const handleRouteCalculated = (routeData) => {
    setCurrentRoute(routeData);
  };

  const handlePopulateForm = (journeyData) => {
    // 1. Set the state that the Form listens to
    setSelectedJourney(journeyData);
    // 2. Scroll to top so user sees the form filled
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="journey-page-container">
      <h1>Journey Logger</h1>
      <div className="journey-grid">
        <div className="journey-left">
          <JourneyForm 
            userId={user?.uid} 
            onRouteCalculated={handleRouteCalculated}
            selectedJourney={selectedJourney} 
          />
        </div>
        <div className="journey-right">
          <MapPanel routeCoords={currentRoute} />
          <SavedJourneys 
            journeys={journeys} 
            onSelectJourney={handlePopulateForm} 
          />
        </div>
      </div>
    </div>
  );
};

export default JourneyPage;