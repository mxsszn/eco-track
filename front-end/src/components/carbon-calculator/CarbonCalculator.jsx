import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CarbonCalculator.css";

const EMISSION_FACTORS = {
  car: 0.17, bus: 0.10, train: 0.04, motorbike: 0.12, cycle: 0.0, walk: 0.0,
};

const MODE_ICONS = {
  car: "🚗", bus: "🚌", train: "🚆", cycle: "🚲", walk: "🚶", motorbike: "🛵",
};

const MODE_LABEL = {
  car: "Car (Petrol)", bus: "Bus", train: "Train", cycle: "Bicycle", walk: "Walk", motorbike: "Motorbike",
};

export default function CarbonCalculator() {
  const navigate = useNavigate();
  const location = useLocation();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-fill logic
  useEffect(() => {
    if (location.state) {
      const { from, to, distanceKm } = location.state;
      if (from) setFrom(from);
      if (to) setTo(to);
      if (distanceKm) setDistance(String(distanceKm));
    } else {
      const journeyData = localStorage.getItem('journeyData');
      if (journeyData) {
        try {
          const data = JSON.parse(journeyData);
          if(data.from) setFrom(data.from);
          if(data.to) setTo(data.to);
          if(data.distance) setDistance(String(data.distance));
        } catch (e) { console.error(e); }
      }
    }
  }, [location.state]);

  // --- RE-ADDED API LOGIC FOR MANUAL UPDATE ---
  const isPostcode = (text) => {
    const cleaned = text.replace(/\s/g, '').toUpperCase();
    return /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/.test(cleaned);
  };

  const getCoordinates = async (loc) => {
    if (isPostcode(loc)) {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(loc)}`);
      const data = await res.json();
      if (data.status === 200 && data.result) return [data.result.longitude, data.result.latitude];
    }
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(loc)}&countrycodes=gb&limit=1`);
    const data = await res.json();
    if (!data || data.length === 0) throw new Error("Location not found");
    return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
  };

  const getRouteDistance = async (start, end) => {
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${start.join(',')};${end.join(',')}?overview=false`);
    const data = await res.json();
    if (data.code !== "Ok" || !data.routes || !data.routes.length) throw new Error("No route found");
    return data.routes[0].distance / 1000;
  };

  const handleManualCalculate = async (e) => {
    e.preventDefault();
    if (!from || !to) { setError("Please enter locations"); return; }
    setLoading(true); setError("");
    try {
      const start = await getCoordinates(from);
      const end = await getCoordinates(to);
      const km = await getRouteDistance(start, end);
      setDistance(km.toFixed(2));
    } catch (err) { setError("Could not calculate. Check locations."); } 
    finally { setLoading(false); }
  };
  // ---------------------------------------------

  // Calculations
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

  const sortedByEmission = useMemo(
    () => [...modes].sort((a, b) => a.emission - b.emission),
    [modes]
  );

  const suggestionText = useMemo(() => {
    if (distanceKm === 0) return null;
    const miles = distanceKm * 0.621371;
    if (miles < 3) {
      return (
        <div className="cc-suggestion walk-suggestion">
          <strong>🌿 Eco Tip:</strong> Only {miles.toFixed(1)} miles. 
          Consider <strong>Walking</strong> or <strong>Cycling</strong>!
        </div>
      );
    } else {
      return (
        <div className="cc-suggestion transit-suggestion">
          <strong>🚆 Eco Tip:</strong> For {miles.toFixed(1)} miles, 
          try <strong>Trains</strong> or <strong>Buses</strong>.
        </div>
      );
    }
  }, [distanceKm]);

  const cardsToShow = useMemo(() => {
    if (distanceKm === 0) return [];
    const miles = distanceKm * 0.621371;
    const car = modes.find(m => m.key === 'car');
    let best, middle;

    if (miles < 3) {
      best = modes.find(m => m.key === 'walk');
      middle = modes.find(m => m.key === 'cycle');
    } else {
      best = sortedByEmission[0]; 
      middle = sortedByEmission.find(m => 
        (m.key === 'train' || m.key === 'bus') && m.key !== best.key
      ) || sortedByEmission[1];
    }
    return [best, middle, car].filter((item, index, self) => 
      item && self.findIndex(t => t.key === item.key) === index
    );
  }, [sortedByEmission, modes, distanceKm]);

  function getCardStyle(modeKey) {
    if (modeKey === 'car') return "cc-card worst";
    if (modeKey === sortedByEmission[0].key) return "cc-card best";
    return "cc-card neutral";
  }

  function getBadgeLabel(modeKey) {
    if (modeKey === 'car') return "BASELINE";
    const miles = distanceKm * 0.621371;
    if (miles < 3 && modeKey === 'walk') return "HEALTHY";
    if (modeKey === sortedByEmission[0].key) return "ECO CHOICE";
    return "OPTION";
  }

  const handleClear = () => {
    setFrom(""); setTo(""); setDistance("");
    navigate(location.pathname, { replace: true, state: {} });
  };

  return (
    <div className="cc-page-container">
      <div className="cc-header">
         <h1 className="page-main-title">Carbon Calculator</h1>
         <p className="page-subtitle">Compare your impact across different modes.</p>
      </div>

      <div className="cc-content-grid">
        {/* Left Column: Input Card */}
        <div className="cc-card-container">
            <h3 className="card-title">Journey Details</h3>
            <div className="cc-inputs-container">
                <div className="cc-input-group">
                    <label className="cc-label">From</label>
                    <input className="cc-input" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Origin" />
                </div> 
                <div className="cc-input-group">
                    <label className="cc-label">To</label>
                    <input className="cc-input" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Destination" />
                </div>

                <form onSubmit={handleManualCalculate}>
                  <div className="cc-input-group">
                      <label className="cc-label">Distance (km)</label>
                      <input type="number" className="cc-input" value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="0.0" />
                  </div>

                  {/* RESTORED UPDATE BUTTON */}
                  <button className="btn btn-primary" type="submit" disabled={loading} style={{marginBottom: '1rem'}}>
                    {loading ? "Calculating..." : "Update Distance"}
                  </button>

                  <div className="cc-actions">
                      <button className="btn btn-clear" type="button" onClick={handleClear}>Reset Form</button>
                      <button className="btn btn-secondary" type="button" onClick={() => navigate('/log-journey')}>← Back to Logger</button>
                  </div>
                  {error && <div className="alert-error">{error}</div>}
                </form>
            </div>
        </div>

        {/* Right Column: Results */}
        <div className="cc-results-container">
             {distanceKm > 0 ? (
                <>
                {suggestionText}
                <div className="cc-results-grid">
                    {cardsToShow.map((mode) => (
                    <div className={getCardStyle(mode.key)} key={mode.key}>
                        <div className="cc-badge">{getBadgeLabel(mode.key)}</div>
                        <div className="cc-card-icon">{mode.icon}</div>
                        <div className="cc-card-details">
                            <div className="cc-card-title">{mode.label}</div>
                            <div className="cc-card-emission">
                                {mode.emission.toFixed(2)} <small>kg CO₂</small>
                            </div>
                        </div>
                        {mode.key !== 'car' && (
                            <div className="cc-savings">
                                Saves <strong>{(EMISSION_FACTORS.car * distanceKm - mode.emission).toFixed(2)} kg</strong>
                            </div>
                        )}
                    </div>
                    ))}
                </div>
                </>
             ) : (
                 <div className="cc-empty-state">
                     <p>Enter details to compare emissions.</p>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
}