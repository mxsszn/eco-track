import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const getCoords = async (location) => {
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${location}`
      );
      const data = await res.json();
      if (data.features?.[0]) return data.features[0].geometry.coordinates;
      throw new Error('Location not found');
    } catch (err) {
      throw new Error('Failed to fetch coordinates');
    }
  };

  const getDistance = async (start, end, profile) => {
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ coordinates: [start, end] })
        }
      );
      const data = await res.json();
      if (!data.routes) throw new Error('No route found');
      return (data.routes[0].summary.distance * 0.000621371).toFixed(1);
    } catch (err) {
      throw new Error('Failed to calculate distance');
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

    try {
      const selectedTransport = transports.find(t => t.id === form.transport);
      const startCoords = await getCoords(form.start);
      const endCoords = await getCoords(form.end);
      const distance = await getDistance(startCoords, endCoords, selectedTransport.profile);
      
      setResult({
        from: form.start,
        to: form.end,
        mode: selectedTransport,
        distance
      });
    } catch (err) {
      setError('Could not calculate distance. Please check your location spellings.');
    }
    setLoading(false);
  };

  const handleContinue = () => {
    if (!result) {
      console.error("No result available");
      return;
    }
    
    // Convert miles to km
    const distanceKm = (parseFloat(result.distance) * 1.60934).toFixed(1);
    
    // Save to localStorage
    const journeyData = {
      from: result.from,
      to: result.to,
      distance: distanceKm,
      transport: result.mode.id
    };
    
    localStorage.setItem('journeyData', JSON.stringify(journeyData));
    
    // Navigate to calculator
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
                placeholder="e.g. London, UK"
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
                placeholder="e.g. Manchester, UK"
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