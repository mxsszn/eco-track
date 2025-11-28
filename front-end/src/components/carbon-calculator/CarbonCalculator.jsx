import React, { useEffect, useMemo, useState } from "react";
import "./CarbonCalculator.css";

const EMISSION_FACTORS = {
  car: 0.21,
  motorbike: 0.12,
  bus: 0.05,
  train: 0.04,
  cycle: 0.01,
  walk: 0.0,
};

const MODE_LABEL = {
  car: "Car (petrol)",
  bus: "Bus / Coach",
  train: "Train",
  cycle: "Cycle",
  walk: "Walk",
  motorbike: "Motorcycle / Scooter",
};

export default function CarbonCalculator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState("");
  const [autoEstimated, setAutoEstimated] = useState(false);
  const [distanceError, setDistanceError] = useState(false);

  // Load journey data from Journey Logger when component mounts
  useEffect(() => {
    // Note: We are using localStorage as a temporary bridge for Sprint 2 logic
    const journeyData = localStorage.getItem('journeyData');
    if (journeyData) {
      const data = JSON.parse(journeyData);
      setFrom(data.from || "");
      setTo(data.to || "");
      setDistance(data.distance || "");
      // Clear the data after loading to prevent stale data on refresh
      localStorage.removeItem('journeyData');
    }
  }, []);

  function estimateDistanceKm(a, b) {
    if (!a || !b) return null;
    if (a.trim().toLowerCase() === b.trim().toLowerCase()) return 0;

    const la = a.trim().length;
    const lb = b.trim().length;
    // Simple heuristic for demo purposes (Sprint 2 Logic)
    const tokDiff = Math.abs(a.trim().split(/\s+/).length - b.trim().split(/\s+/).length);
    const charDiff = Math.abs(la - lb);

    let km = Math.max(1, Math.floor(charDiff * 2 + tokDiff * 3 + (la + lb) % 20));
    if (km < 3) km += Math.floor((la + lb) / 10);
    return km;
  }

  const distanceKm = useMemo(() => {
    const n = parseFloat(distance);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }, [distance]);

  const modes = useMemo(() => {
    return ["car", "bus", "train", "motorbike", "cycle", "walk"]
      .filter(m => isPractical(m, distanceKm))
      .map((m) => ({
        key: m,
        label: MODE_LABEL[m],
        factor: EMISSION_FACTORS[m],
        emission: +(distanceKm * EMISSION_FACTORS[m]).toFixed(3),
      }));
  }, [distanceKm]);

  const sortedByEmission = useMemo(
    () => [...modes].sort((a, b) => a.emission - b.emission),
    [modes]
  );

  const top4 = sortedByEmission.slice(0, 4);

  function isPractical(mode, km) {
    if (mode === "walk") return km <= 5; // Updated logic: Walks up to 5km are shown
    if (mode === "cycle") return km <= 20; // Updated logic: Cycles up to 20km are shown
    return true;
  }

  const recommended = useMemo(() => {
    for (const mode of sortedByEmission) {
      if (isPractical(mode.key, distanceKm)) return mode;
    }
    return sortedByEmission[0];
  }, [sortedByEmission, distanceKm]);

  function cardClass(index) {
    if (index === 0) return "cc-card best";
    if (index === top4.length - 1) return "cc-card worst";
    if (index === 1) return "cc-card neutral-1";
    if (index === 2) return "cc-card neutral-2"; 
    return "cc-card neutral";
  }

  const handleEstimate = (e) => {
    e.preventDefault();
    if (from.trim() && to.trim()) {
      // Logic requirement: Estimate based on string length if no API
      const est = estimateDistanceKm(from, to) ?? 0;
      setDistance(String(est));
      setAutoEstimated(true);
    }
  };

  const handleDistanceChange = (e) => {
    const newValue = e.target.value;
    const numericRegex = /^\d*\.?\d*$/; 

    if (newValue === "" || numericRegex.test(newValue)) {
      setDistance(newValue);
      setAutoEstimated(false);
      setDistanceError(false);
    } else {
      setDistanceError(true);
      setTimeout(() => {
        setDistanceError(false);
      }, 1500); 
    }
  };

  return (
    <div className="cc-wrap">
      <h2 className="cc-heading">🌱 Carbon Calculator</h2>

      <div className="cc-top-row">
        <div className="cc-field">
          <label className="cc-label">From</label>
          <input
            className="cc-input"
            placeholder="e.g. Home"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div> 

        <div className="cc-field">
          <label className="cc-label">To</label>
          <input
            className="cc-input"
            placeholder="e.g. University"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
      </div>

      <form onSubmit={handleEstimate}>
        <div className="cc-distance-row">
          <div style={{ position: 'relative', flex: 1 }}> 
            <label className="cc-label">Distance (km)</label>
            <input
              type="number" 
              className="cc-distance-input"
              value={distance}
              onChange={handleDistanceChange}
              placeholder="0.0"
            />
            
            {distanceError && (
              <div className="error-tooltip">
                ‼️ Please enter a valid number.
              </div>
            )}
          </div>

          <div className="cc-actions">
            <button
              className="cc-btn"
              disabled={!from.trim() || !to.trim()}
              type="submit" 
            >
              Auto-Estimate
            </button>
                 
            <button
              className="cc-btn cc-btn-clear"
              type="button" 
              onClick={() => {
                setFrom("");
                setTo("");
                setDistance("");
                setAutoEstimated(false); 
                setDistanceError(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>

      {distanceKm > 0 && (
        <div className="cc-grid">
          {top4.map((mode, index) => (
            <div className={cardClass(index)} key={mode.key}>
              <div className="cc-card-header">
                <div className="cc-card-title">{mode.label}</div>
                <div className="cc-card-emission">
                  {mode.emission.toFixed(2)} <span>kg CO₂e</span>
                </div>
              </div>

              <div className="cc-card-body">
                <div>Factor: {mode.factor} kg/km</div>
                
                {recommended && recommended.key === mode.key ? (
                  <div className="cc-recommended">Recommended</div>
                ) : (
                  <div className="cc-subtle">
                    {isPractical(mode.key, distanceKm) ? "Option" : "Less Practical"}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cc-tip">
        <div className="icon-container">
          💡 
        </div>

        <div className="content-area">
          <h3>Eco-Education Corner</h3> 
          <p className="para"> 
            {distanceKm <= 0
              ? "🌍 Enter your journey details to see which transport mode saves the most carbon."
              : `☘️ Smart Choice! The ${recommended?.label || 'Greenest'} option delivers the best sustainable value for this ${distanceKm} km route.`}
          </p>
          <span className="tagline">Small changes, big impact!</span> 
        </div>
      </div>
    </div>
  );
}