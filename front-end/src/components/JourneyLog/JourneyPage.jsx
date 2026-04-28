import React, { useEffect, useState } from "react";
import JourneyForm from "./JourneyForm";
import MapPanel from "./MapPanel";
import SavedJourneys from "./SavedJourneys";
import "./JourneyLog.css";

const ORS_API_KEY = "REMOVED_ORS_KEY";
const API_BASE_URL = "http://localhost:8080/api";

async function safeJson(res) {
  const text = await res.text();
  try { return JSON.parse(text); }
  catch { throw new Error("Invalid JSON from server"); }
}

async function geocode(place) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(place)}&size=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await safeJson(res);
  if (!data.features || data.features.length === 0) throw new Error(`Could not find "${place}"`);
  const [lon, lat] = data.features[0].geometry.coordinates;
  return { lat, lon };
}

async function getRoute(start, end) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car/geojson?api_key=${ORS_API_KEY}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ coordinates: [[start.lon, start.lat], [end.lon, end.lat]] }),
  });
  if (!res.ok) throw new Error("Route request failed");
  const data = await safeJson(res);
  const feature = data.features[0];
  return {
    distanceMeters: feature.properties.summary.distance,
    coordinates: feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  };
}

function milesToKm(miles) { return miles * 1.60934; }

function getModeEmoji(mode) {
  if (!mode) return "🚶";
  const m = mode.toLowerCase();
  if (m.includes("car")) return "🚗";
  if (m.includes("bus")) return "🚌";
  if (m.includes("train")) return "🚆";
  if (m.includes("bicycle") || m.includes("bike")) return "🚲";
  return "🚶";
}

function formatTransportModes(apiModes) {
  return [
    { value: "", label: "Select mode", factor: 0, transportModeId: null },
    ...apiModes.map((mode) => ({
      value: mode.mode_name.toLowerCase(),
      label: mode.mode_name,
      factor: Number(mode.co2_factor_per_km),
      transportModeId: mode.transport_mode_id,
    })),
  ];
}

function formatJourneyFromApi(journey) {
  return {
    id: journey.journey_id,
    from: journey.start_location,
    to: journey.destination,
    date: journey.journey_date,
    modeLabel: journey.transport_mode_name,
    distanceKm: Number(journey.distance_km),
    co2Kg: Number(journey.selected_mode_emission),
    co2Saved: Number(journey.co2_saved),
    points: journey.points_awarded,
  };
}

export default function JourneyPage() {
  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState({ from: "", to: "", date: "", mode: "" });
  const [distanceMiles, setDistanceMiles] = useState(null);
  const [co2Kg, setCo2Kg] = useState(null);
  const [co2Saved, setCo2Saved] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [transportModes, setTransportModes] = useState([
    { value: "", label: "Select mode", factor: 0, transportModeId: null }
  ]);
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        const [modesRes, journeysRes] = await Promise.all([
          fetch(`${API_BASE_URL}/transport-modes`),
          fetch(`${API_BASE_URL}/journeys/user/${userId}`)
        ]);
        if (!modesRes.ok) throw new Error("Transport modes failed");
        if (!journeysRes.ok) throw new Error("Journeys failed");
        const modesData = await safeJson(modesRes);
        const journeysData = await safeJson(journeysRes);
        if (!cancelled) {
          setTransportModes(formatTransportModes(modesData));
          setJourneys(journeysData.map(formatJourneyFromApi));
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load data. Check backend is running.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (userId) loadData();
    return () => { cancelled = true; };
  }, [userId]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
    setSaveMessage("");
  };

  const handleCalculate = async () => {
    setError("");
    if (!form.from || !form.to || !form.date || !form.mode) {
      setError("Please fill in all fields.");
      return;
    }
    setIsCalculating(true);
    try {
      const [fromLoc, toLoc] = await Promise.all([geocode(form.from), geocode(form.to)]);
      const { distanceMeters, coordinates } = await getRoute(fromLoc, toLoc);
      const miles = distanceMeters / 1609.34;
      const km = milesToKm(miles);
      setDistanceMiles(miles);
      setRouteCoords(coordinates);
      const selectedMode = transportModes.find(m => m.value === form.mode);
      if (!selectedMode) throw new Error("Invalid transport mode");
      setCo2Kg(km * selectedMode.factor);
      setCo2Saved(Math.max(0, (0.17 - selectedMode.factor) * km));
    } catch (err) {
      setError(err.message || "Could not calculate route.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSaveJourney = async () => {
    setError("");
    setSaveMessage("");
    if (distanceMiles === null || co2Kg === null) {
      setError("Please calculate the carbon first.");
      return;
    }
    const selectedMode = transportModes.find(m => m.value === form.mode);
    if (!selectedMode?.transportModeId) {
      setError("Please select a valid transport mode.");
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/journeys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(userId),
          transport_mode_id: selectedMode.transportModeId,
          start_location: form.from,
          destination: form.to,
          journey_date: form.date,
          distance_km: Math.round(milesToKm(distanceMiles) * 100) / 100,
          route_geometry: JSON.stringify(routeCoords || []),
        }),
      });
      if (!res.ok) throw new Error("Failed to save journey.");
      const saved = await safeJson(res);
      setJourneys(prev => [formatJourneyFromApi(saved), ...prev]);
      setSaveMessage(`✅ Journey saved! +${saved.points_awarded} points, ${saved.co2_saved?.toFixed(2)} kg CO₂ saved.`);
      setForm({ from: "", to: "", date: "", mode: "" });
      setDistanceMiles(null);
      setCo2Kg(null);
      setCo2Saved(null);
      setRouteCoords(null);
    } catch (err) {
      setError(err.message || "Something went wrong while saving.");
    }
  };

  const handleDeleteJourney = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/journeys/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete.");
      setJourneys(prev => prev.filter(j => j.id !== id));
    } catch {
      setError("Could not delete journey.");
    }
  };

  const handleSelectJourney = (j) => {
    const modeMatch = transportModes.find(
      m => m.label.toLowerCase() === j.modeLabel?.toLowerCase()
    );
    setForm({
      from: j.from || "",
      to: j.to || "",
      date: j.date ? new Date(j.date).toISOString().split('T')[0] : "",
      mode: modeMatch?.value || "",
    });
    setDistanceMiles(null);
    setCo2Kg(null);
    setCo2Saved(null);
    setRouteCoords(null);
    setSaveMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!userId) return <p style={{padding:'2rem'}}>Please log in again.</p>;
  if (loading) return <p style={{padding:'2rem'}}>Loading...</p>;

  return (
    <div className="journey-page-container">
      <h1 className="page-main-title">🗺️ Log a Journey</h1>
      <p className="page-subtitle">Track your travel and see your carbon impact in real time.</p>

      <div className="journey-grid">
        <div className="card">
          <JourneyForm
            form={form}
            onFieldChange={handleFieldChange}
            transportModes={transportModes}
            distanceMiles={distanceMiles}
            co2Kg={co2Kg}
            co2Saved={co2Saved}
            isCalculating={isCalculating}
            error={error}
            saveMessage={saveMessage}
            onCalculate={handleCalculate}
            onSaveJourney={handleSaveJourney}
            getModeEmoji={getModeEmoji}
          />
        </div>

        <div className="journey-right">
          <MapPanel routeCoords={routeCoords} />
          <SavedJourneys
            journeys={journeys}
            onDeleteJourney={handleDeleteJourney}
            onSelectJourney={handleSelectJourney}
            getModeEmoji={getModeEmoji}
          />
        </div>
      </div>
    </div>
  );
}