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
  const [selectedJourney, setSelectedJourney] = useState(null); // New State for "Click to Fill"

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

  // NEW: Handler for clicking a saved journey
  const handlePopulateForm = (journeyData) => {
    setSelectedJourney(journeyData);
    // Scroll to top on mobile so they see the form
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
            selectedJourney={selectedJourney} // Pass the data down
          />
        </div>
        <div className="journey-right">
          <MapPanel routeCoords={currentRoute} />
          {/* Pass the handler down */}
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