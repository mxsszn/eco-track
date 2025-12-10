import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // RESTORED
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function JourneyForm({ userId, onRouteCalculated, onJourneyAdded, selectedJourney }) {
  const navigate = useNavigate(); // RESTORED HOOK

  // --- 1. HELPER: LOAD SAVED STATE SAFELY ---
  const getSavedState = () => {
    try {
      const saved = sessionStorage.getItem('journeyFormState');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  };

  const savedData = getSavedState();

  // --- 2. STATE INITIALIZATION ---
  const [form, setForm] = useState(savedData ? savedData.form : {
    from: "",
    to: "",
    date: new Date().toISOString().split('T')[0],
    mode: "car"
  });

  const [result, setResult] = useState(savedData ? savedData.result : {
    distanceMiles: null,
    distanceKm: null,
    co2Kg: null
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const transportModes = [
    { value: "car", label: "Car (Petrol)", factor: 0.17 },
    { value: "bus", label: "Bus", factor: 0.10 },
    { value: "train", label: "Train", factor: 0.04 },
    { value: "bike", label: "Bicycle", factor: 0 },
    { value: "walk", label: "Walk", factor: 0 }
  ];

  // --- 3. RESTORE MAP ON LOAD ---
  useEffect(() => {
    if (savedData && savedData.routeCoords && onRouteCalculated) {
      onRouteCalculated(savedData.routeCoords);
    }
  }, []); 

  // --- 4. SAVE STATE ON EVERY CHANGE ---
  useEffect(() => {
    const stateToSave = {
      form,
      result,
      routeCoords: savedData?.routeCoords || [] 
    };
    sessionStorage.setItem('journeyFormState', JSON.stringify(stateToSave));
  }, [form, result]);

  // --- 5. OVERRIDE IF HISTORY ITEM CLICKED ---
  useEffect(() => {
    if (selectedJourney) {
      setForm({
        from: selectedJourney.from,
        to: selectedJourney.to,
        date: new Date().toISOString().split('T')[0],
        mode: selectedJourney.mode
      });
      // We reset results so they have to hit calculate again to get fresh route data
      setResult({ distanceMiles: null, distanceKm: null, co2Kg: null });
    }
  }, [selectedJourney]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // --- GEOCODING ---
  const isPostcode = (text) => {
    const cleaned = text.replace(/\s/g, '').toUpperCase();
    return /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/.test(cleaned);
  };

  const getCoordinates = async (location, fieldName) => {
    try {
      if (isPostcode(location)) {
        const response = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(location)}`);
        const data = await response.json();
        if (data.status === 200 && data.result) return [data.result.longitude, data.result.latitude];
      }

      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=gb&limit=3`;
      const response = await fetch(url);
      const data = await response.json();

      if (!data || data.length === 0) throw new Error(`Could not find "${location}"`);
      return [parseFloat(data[0].lon), parseFloat(data[0].lat)];

    } catch (err) {
      throw new Error(`Location not found: "${location}" (${fieldName}).`);
    }
  };

  // --- ROUTING ---
  const getRouteData = async (startCoords, endCoords, mode) => {
    let profile = 'driving'; 
    if (mode === 'bike') profile = 'cycling'; 
    if (mode === 'walk') profile = 'walking';

    const url = `https://router.project-osrm.org/route/v1/${profile}/${startCoords.join(',')};${endCoords.join(',')}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== "Ok" || !data.routes || data.routes.length === 0) throw new Error("No route found.");
    
    const route = data.routes[0];
    const rawCoords = route.geometry.coordinates;
    const flippedCoords = rawCoords.map(coord => [coord[1], coord[0]]); 

    return { distanceMeters: route.distance, flippedCoords };
  };

  const handleCalculate = async () => {
    if (!form.from || !form.to) {
      setError("Please enter both locations.");
      return;
    }

    setIsCalculating(true);
    setError("");
    setResult({ distanceMiles: null, distanceKm: null, co2Kg: null });

    try {
      const startCoords = await getCoordinates(form.from, "From");
      const endCoords = await getCoordinates(form.to, "To");
      const { distanceMeters, flippedCoords } = await getRouteData(startCoords, endCoords, form.mode);

      if (onRouteCalculated) onRouteCalculated(flippedCoords);

      const currentState = JSON.parse(sessionStorage.getItem('journeyFormState') || '{}');
      currentState.routeCoords = flippedCoords;
      sessionStorage.setItem('journeyFormState', JSON.stringify(currentState));

      const distanceKm = distanceMeters / 1000;
      const distanceMiles = distanceMeters * 0.000621371;
      const modeFactor = transportModes.find(m => m.value === form.mode).factor;
      
      setResult({
        distanceMiles: distanceMiles,
        distanceKm: distanceKm,
        co2Kg: distanceKm * modeFactor
      });

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = async () => {
    if (!result.distanceMiles) return;
    if (!userId) {
      setError("Please log in to save journeys.");
      return;
    }

    try {
      const carEmission = result.distanceKm * 0.17;
      let savings = carEmission - result.co2Kg;
      if (savings < 0) savings = 0;
      const pointsEarned = Math.floor(savings * 100);

      await addDoc(collection(db, "journeys"), {
        userId: userId,
        from: form.from,
        to: form.to,
        date: form.date,
        mode: form.mode,
        distanceMiles: parseFloat(result.distanceMiles.toFixed(2)),
        distanceKm: parseFloat(result.distanceKm.toFixed(2)),
        co2Saved: parseFloat(result.co2Kg.toFixed(2)),
        timestamp: new Date()
      });

      setSaveMessage("Saved!");

      const flashData = {
        points: pointsEarned,
        co2: savings.toFixed(2),
        timestamp: Date.now() 
      };
      localStorage.setItem('dashboardFlashMessage', JSON.stringify(flashData));
      
      setTimeout(() => {
         setSaveMessage("");
         setForm({ ...form, from: "", to: "" }); 
         setResult({ distanceMiles: null, distanceKm: null, co2Kg: null });
         if (onRouteCalculated) onRouteCalculated([]); 
         sessionStorage.removeItem('journeyFormState'); 
      }, 1000);

      if (onJourneyAdded) onJourneyAdded();

    } catch (e) {
      console.error("Error saving:", e);
      setError("Save failed.");
    }
  };

  const handleClear = () => {
    setForm({ ...form, from: "", to: "" });
    setResult({ distanceMiles: null, distanceKm: null, co2Kg: null });
    if (onRouteCalculated) onRouteCalculated([]);
    sessionStorage.removeItem('journeyFormState');
    setError("");
  };

  // --- NEW: NAVIGATE TO CALCULATOR ---
  const handleViewAlternatives = () => {
    navigate('/calculator', { 
      state: { 
        distanceKm: result.distanceKm, 
        from: form.from, 
        to: form.to,
        mode: form.mode 
      } 
    });
  };

  return (
    <div className="card journey-card">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2 className="card-title">Log a Journey</h2>
        {(form.from || form.to) && (
            <button onClick={handleClear} className="btn-clear">Clear Form</button>
        )}
      </div>
      
      <div className="form-grid">
        <div className="form-group">
          <label>From</label>
          <input name="from" value={form.from} onChange={handleChange} placeholder="e.g. Brunel University" />
        </div>
        <div className="form-group">
          <label>To</label>
          <input name="to" value={form.to} onChange={handleChange} placeholder="e.g. W12 7GF" />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mode</label>
          <select name="mode" value={form.mode} onChange={handleChange}>
            {transportModes.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
      </div>

      <div className="distance-row">
        <div className="distance-pill">
          <span className="distance-label">Distance</span>
          <span className="distance-value">{result.distanceMiles ? result.distanceMiles.toFixed(1) + " mi" : "-"}</span>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleCalculate} disabled={isCalculating}>
          {isCalculating ? "Calculating..." : "Calculate Route"}
        </button>
      </div>

      <div className="co2-row">
        <span className="co2-label">Emission</span>
        <span className="co2-value">{result.co2Kg ? result.co2Kg.toFixed(2) + " kg" : "-"}</span>
      </div>

      {/* --- ACTION BUTTONS (Save & View Alternatives) --- */}
      <div className="actions">
        {/* Only show this button if we have a calculated result */}
        {result.distanceMiles && (
           <button type="button" className="btn btn-teal" onClick={handleViewAlternatives}>
             View Alternatives
           </button>
        )}

        <button type="button" className="btn btn-blue" onClick={handleSave} disabled={!result.distanceMiles}>
          Save Journey
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {saveMessage && <div className="alert alert-success">{saveMessage}</div>}
    </div>
  );
}