import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CarbonCalculator.css";

const EMISSION_FACTORS = {
  car: 0.17, // Using your updated UK factor
  bus: 0.10,
  train: 0.04,
  motorbike: 0.12,
  cycle: 0.0,
  walk: 0.0,
};

const MODE_ICONS = {
  car: "🚗",
  bus: "🚌",
  train: "🚆",
  cycle: "🚲",
  walk: "🚶",
  motorbike: "🛵",
};

const MODE_LABEL = {
  car: "Car (Petrol)",
  bus: "Bus",
  train: "Train",
  cycle: "Bicycle",
  walk: "Walk",
  motorbike: "Motorbike",
};

export default function CarbonCalculator() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. Auto-fill if coming from Journey Logger
  useEffect(() => {
    const journeyData = localStorage.getItem('journeyData');
    if (journeyData) {
      try {
        const data = JSON.parse(journeyData);
        if(data.from) setFrom(data.from);
        if(data.to) setTo(data.to);
        if(data.distance) setDistance(String(data.distance));
        
        // We do NOT clear it immediately anymore, so it persists if they refresh
        // localStorage.removeItem('journeyData'); 
      } catch (e) {
        console.error("Error parsing data", e);
      }
    }
  }, []);

  // --- API LOGIC (COPIED FROM JOURNEY FORM) ---
  
  const isPostcode = (text) => {
    const cleaned = text.replace(/\s/g, '').toUpperCase();
    return /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/.test(cleaned);
  };

  const getCoordinates = async (location) => {
    // Strategy A: Postcode
    if (isPostcode(location)) {
      const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(location)}`);
      const data = await response.json();
      if (data.status === 200 && data.result) {
        return [data.result.longitude, data.result.latitude];
      }
    }
    // Strategy B: Place Name
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=gb&limit=1`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data || data.length === 0) throw new Error("Location not found");
    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  };

  const getRouteDistance = async (startCoords, endCoords) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${startCoords.join(',')};${endCoords.join(',')}?overview=false`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) throw new Error("No route found");
    return data.routes[0].distance / 1000; // Convert meters to km
  };

  const handleManualCalculate = async (e) => {
    e.preventDefault();
    if (!from || !to) {
      setError("Please enter both locations");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const startCoords = await getCoordinates(from);
      const endCoords = await getCoordinates(to);
      const km = await getRouteDistance(startCoords, endCoords);
      setDistance(km.toFixed(2));
    } catch (err) {
      console.error(err);
      setError("Could not calculate distance. Try being more specific.");
    } finally {
      setLoading(false);
    }
  };

  // --- CALCULATIONS ---

  const distanceKm = useMemo(() => {
    const n = parseFloat(distance);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [distance]);

  const modes = useMemo(() => {
    return ["cycle", "walk", "train", "bus", "motorbike", "car"]
      .map((m) => ({
        key: m,
        label: MODE_LABEL[m],
        icon: MODE_ICONS[m],
        emission: +(distanceKm * EMISSION_FACTORS[m]).toFixed(3),
      }));
  }, [distanceKm]);

  // Sort: Lowest emission first
  const sortedByEmission = useMemo(
    () => [...modes].sort((a, b) => a.emission - b.emission),
    [modes]
  );

  const bestOption = sortedByEmission[0];
  const worstOption = sortedByEmission[sortedByEmission.length - 1];

  function getCardStyle(modeKey) {
    if (modeKey === bestOption?.key) return "cc-card best";
    if (modeKey === "car") return "cc-card worst"; // Highlight car as bad usually
    return "cc-card neutral";
  }

  return (
    <div className="cc-wrap">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 className="cc-heading">Travel Carbon Calculator</h2>
        <button onClick={() => navigate('/log-journey')} className="btn-text">
          ← Back to Logger
        </button>
      </div>
      
      <p className="cc-subheading">Compare your journey options and reduce your footprint.</p>

      {/* Input Section */}
      <div className="cc-inputs-container">
        <div className="cc-top-row">
          <div className="cc-field">
            <label className="cc-label">From</label>
            <input className="cc-input" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="e.g. Brunel University" />
          </div> 
          <div className="cc-field">
            <label className="cc-label">To</label>
            <input className="cc-input" value={to} onChange={(e) => setTo(e.target.value)} placeholder="e.g. Wembley Stadium" />
          </div>
        </div>

        <form onSubmit={handleManualCalculate}>
          <div className="cc-distance-row">
            <label className="cc-label">Trip Distance (Kilometers)</label>
            <input
              type="number" 
              className="cc-distance-input"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="0.0 km"
            />
          </div>

          <div className="cc-actions">
            <button className="cc-btn" disabled={loading} type="submit">
              {loading ? "Calculating..." : "Calculate Distance (Exact)"}
            </button>
            <button className="cc-btn cc-btn-clear" type="button" onClick={() => { setFrom(""); setTo(""); setDistance(""); }}>
              Clear
            </button>
          </div>
          {error && <p style={{color:'red', marginTop:'10px', textAlign:'center'}}>{error}</p>}
        </form>
      </div>

      {/* Results Grid - Only show if distance > 0 */}
      {distanceKm > 0 && (
        <>
          <h3 style={{marginTop: '30px', color: '#2c3e50'}}>Travel Alternatives</h3>
          <div className="cc-grid">
            {sortedByEmission.slice(0, 3).map((mode) => (
              <div className={getCardStyle(mode.key)} key={mode.key}>
                <div className="cc-badge">
                   {mode.key === bestOption.key ? "ECO CHOICE" : "ALTERNATIVE"}
                </div>
                
                <div className="cc-card-icon">{mode.icon}</div>
                
                <div className="cc-card-content">
                  <div className="cc-card-title">{mode.label}</div>
                  <div className="cc-card-emission">
                    {mode.emission.toFixed(2)} <span>kg CO₂e</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}