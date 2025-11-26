import { useState } from 'react';
import './JourneyLogger.css';

const JourneyLogger = () => {
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
    const res = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${location}`
    );
    const data = await res.json();
    if (data.features?.[0]) return data.features[0].geometry.coordinates;
    throw new Error('Location not found');
  };

  const getDistance = async (start, end, profile) => {
    const res = await fetch(
      `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates: [start, end] })
      }
    );
    const data = await res.json();
    return (data.routes[0].summary.distance * 0.000621371).toFixed(1);
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
      setError('Could not calculate distance. Check locations.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🌍 Journey Logger</h1>
        <p className="subtitle">Calculate your travel distance</p>

        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <label>📍 From</label>
            <input
              type="text"
              value={form.start}
              onChange={(e) => setForm({...form, start: e.target.value})}
              placeholder="London, UK"
              disabled={loading}
            />
          </div>

          <div className="arrow">↓</div>

          <div className="input-group">
            <label>🎯 To</label>
            <input
              type="text"
              value={form.end}
              onChange={(e) => setForm({...form, end: e.target.value})}
              placeholder="Manchester, UK"
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Transport</label>
            <div className="transport-grid">
              {transports.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={form.transport === t.id ? 'active' : ''}
                  onClick={() => setForm({...form, transport: t.id})}
                  disabled={loading}
                >
                  <span className="icon">{t.icon}</span>
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Calculating...' : 'Calculate Distance'}
          </button>
        </form>

        {result && (
          <div className="result">
            <h2>Journey Details</h2>
            <div className="detail">
              <span>Route:</span>
              <strong>{result.from} → {result.to}</strong>
            </div>
            <div className="detail">
              <span>Transport:</span>
              <strong>{result.mode.icon} {result.mode.name}</strong>
            </div>
            <div className="detail highlight">
              <span>Distance:</span>
              <strong>{result.distance} miles</strong>
            </div>
            <button className="btn-next">Continue to Carbon Calculation →</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneyLogger;