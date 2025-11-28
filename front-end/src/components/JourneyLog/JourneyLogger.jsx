import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './JourneyLogger.css';

const JourneyLogger = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ start: '', end: '', transport: '' });
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'REMOVED_ORS_KEY';

  const transports = [
    { id: 'car', name: 'Car', icon: '🚗', profile: 'driving-car' },
    { id: 'bus', name: 'Bus', icon: '🚌', profile: 'driving-car' },
    { id: 'train', name: 'Train', icon: '🚆', profile: 'driving-car' },
    { id: 'walk', name: 'Walk', icon: '🚶', profile: 'foot-walking' }
  ];

  // Helper: Add context to search if missing
  const enhanceQuery = (query) => {
    if (!query.toLowerCase().includes('uk') && !query.toLowerCase().includes('london')) {
      return `${query}, London, UK`; // Default to London/UK context
    }
    return query;
  };

  const getCoords = async (location) => {
    try {
      const enhancedLoc = enhanceQuery(location);
      console.log(`Searching for: ${enhancedLoc}`); // Debug log

      const res = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${encodeURIComponent(enhancedLoc)}`
      );
      const data = await res.json();
      
      if (data.features && data.features.length > 0) {
        return data.features[0].geometry.coordinates;
      }
      throw new Error(`Could not find location: "${location}"`);
    } catch (err) {
      console.error(err);
      throw err; // Re-throw to be caught in submit
    }
  };

  const getDistance = async (startCoords, endCoords, profile) => {
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coordinates: [startCoords, endCoords] })
        }
      );
      const data = await res.json();
      
      if (!data.routes || data.routes.length === 0) {
         // Fallback: If driving route fails, try foot-walking (sometimes roads are blocked)
         if (profile === 'driving-car') {
            console.log("Driving route failed, trying walking fallback...");
            return getDistance(startCoords, endCoords, 'foot-walking');
         }
         throw new Error('No route found between these locations.');
      }

      // Return distance in miles
      return (data.routes[0].summary.distance * 0.000621371).toFixed(1);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.start || !form.end || !form.transport) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const selectedTransport = transports.find(t => t.id === form.transport);
      
      // 1. Get Coords
      const startCoords = await getCoords(form.start);
      const endCoords = await getCoords(form.end);
      
      // 2. Get Distance
      const distanceMiles = await getDistance(startCoords, endCoords, selectedTransport.profile);
      
      // 3. Calculate CO2 (Logic from Dashboard)
      // Factors (kg/km): Car=0.17, Bus=0.1, Train=0.04
      // Convert miles to km for calc: 1 mile = 1.60934 km
      const distanceKm = parseFloat(distanceMiles) * 1.60934;
      
      let factor = 0.17; 
      if(selectedTransport.id === 'bus') factor = 0.1;
      if(selectedTransport.id === 'train') factor = 0.04;
      if(selectedTransport.id === 'walk') factor = 0;
      
      const co2 = (distanceKm * factor).toFixed(2);

      // 4. Save to Firebase
      const journeyData = {
         userId: localStorage.getItem('userId') || 'guest',
         from: form.start,
         to: form.end,
         distance: distanceKm.toFixed(1),
         mode: selectedTransport.name,
         co2Saved: parseFloat(co2),
         date: new Date().toISOString()
      };

      await addDoc(collection(db, "journeys"), journeyData);

      // 5. Show Result
      setResult({
        from: form.start,
        to: form.end,
        mode: selectedTransport,
        distance: distanceMiles
      });

    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred. Try being more specific (e.g. "West Acton Station").');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!result) return;
    
    // Save for calculator page
    const distanceKm = (parseFloat(result.distance) * 1.60934).toFixed(1);
    const journeyData = {
      from: result.from,
      to: result.to,
      distance: distanceKm,
      transport: result.mode.id
    };
    localStorage.setItem('journeyData', JSON.stringify(journeyData));
    navigate('/calculator');
  };

  return (
    <div className="journey-logger-container">
      <div className="logger-card">
        <div className="logger-header">
          <h1>🌍 Journey Logger</h1>
          <p className="subtitle">Calculate your travel distance</p>
        </div>

        <div className="logger-content">
          <form onSubmit={handleSubmit} className="logger-form">
            {error && <div className="error-message">{error}</div>}

            <div className="input-group">
              <label>📍 From</label>
              <input
                type="text"
                value={form.start}
                onChange={(e) => setForm({...form, start: e.target.value})}
                placeholder="e.g. West Acton Station"
                disabled={loading}
              />
            </div>

            <div className="input-arrow">↓</div>

            <div className="input-group">
              <label>🎯 To</label>
              <input
                type="text"
                value={form.end}
                onChange={(e) => setForm({...form, end: e.target.value})}
                placeholder="e.g. West Ealing Broadway"
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Transport Mode</label>
              <div className="transport-grid">
                {transports.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    className={`transport-btn ${form.transport === t.id ? 'active' : ''}`}
                    onClick={() => setForm({...form, transport: t.id})}
                    disabled={loading}
                  >
                    <span className="icon">{t.icon}</span>
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-calculate" disabled={loading}>
              {loading ? 'Calculating...' : 'Calculate Distance'}
            </button>
          </form>

          {result && (
            <div className="result-card">
              <h2>Journey Details</h2>
              <div className="result-row">
                <span>Route:</span>
                <strong>{result.from} → {result.to}</strong>
              </div>
              <div className="result-row">
                <span>Transport:</span>
                <strong>{result.mode.icon} {result.mode.name}</strong>
              </div>
              <div className="result-row highlight">
                <span>Distance:</span>
                <strong>{result.distance} miles</strong>
              </div>
              <button 
                className="btn-continue" 
                onClick={handleContinue}
                type="button"
              >
                Continue to Carbon Calculation →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyLogger;