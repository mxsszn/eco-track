import React, { useEffect, useState } from "react";
import JourneyForm from "./JourneyForm";
import MapPanel from "./MapPanel";
import SavedJourneys from "./SavedJourneys";

const ORS_API_KEY = "REMOVED_ORS_KEY";
const API_BASE_URL = "http://localhost:8080/api";

async function geocode(place) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(place)}&size=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
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
  const data = await res.json();
  const feature = data.features[0];
  return {
    distanceMeters: feature.properties.summary.distance,
    coordinates: feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  };
}

function kmToMiles(km) { return km / 1.60934; }
function milesToKm(miles) { return miles * 1.60934; }

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
    distanceMiles: Math.round(kmToMiles(Number(journey.distance_km)) * 100) / 100,
    co2Kg: Number(journey.selected_mode_emission),
  };
}

export default function JourneyPage() {
  const userId = parseInt(localStorage.getItem('userId')) || 1;

  const [form, setForm] = useState({ from: "", to: "", date: "", mode: "" });
  const [distanceMiles, setDistanceMiles] = useState(null);
  const [co2Kg, setCo2Kg] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [transportModes, setTransportModes] = useState([{ value: "", label: "Select mode", factor: 0, transportModeId: null }]);
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    loadTransportModes();
    loadJourneys();
  }, []);

  const loadTransportModes = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/transport-modes`);
      if (!res.ok) throw new Error("Failed to load transport modes.");
      const data = await res.json();
      setTransportModes(formatTransportModes(data));
    } catch (err) {
      setError("Could not load transport modes from the backend.");
    }
  };

  const loadJourneys = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/journeys/user/${userId}`);
      if (!res.ok) throw new Error("Failed to load saved journeys.");
      const data = await res.json();
      setJourneys(data.map(formatJourneyFromApi));
    } catch (err) {
      setError("Could not load saved journeys from the backend.");
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSaveMessage("");
  };

  const handleCalculate = async () => {
    setError("");
    setSaveMessage("");
    setCo2Kg(null);
    setDistanceMiles(null);
    if (!form.from || !form.to || !form.date || !form.mode) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setIsCalculating(true);
      const [fromLoc, toLoc] = await Promise.all([geocode(form.from), geocode(form.to)]);
      const { distanceMeters, coordinates } = await getRoute(fromLoc, toLoc);
      const miles = Math.round((distanceMeters / 1609.34) * 100) / 100;
      setDistanceMiles(miles);
      setRouteCoords(coordinates);
      const selectedMode = transportModes.find((m) => m.value === form.mode) || { factor: 0 };
      const co2 = Math.round(milesToKm(miles) * selectedMode.factor * 100) / 100;
      setCo2Kg(co2);
    } catch (err) {
      setError(err.message || "Something went wrong while calculating.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSaveJourney = async () => {
    setError("");
    setSaveMessage("");
    if (!distanceMiles || !co2Kg) { setError("Calculate the carbon for this journey before saving."); return; }
    const selectedMode = transportModes.find((m) => m.value === form.mode) || null;
    if (!selectedMode?.transportModeId) { setError("Please select a valid transport mode."); return; }

    const journeyPayload = {
      user_id: userId,
      transport_mode_id: selectedMode.transportModeId,
      start_location: form.from,
      destination: form.to,
      journey_date: form.date,
      distance_km: Math.round(milesToKm(distanceMiles) * 100) / 100,
      route_geometry: JSON.stringify(routeCoords || []),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/journeys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(journeyPayload),
      });
      if (!res.ok) throw new Error(await res.text() || "Failed to save journey.");
      const saved = await res.json();
      setJourneys((prev) => [formatJourneyFromApi(saved), ...prev]);
      setSaveMessage("Journey saved successfully.");
    } catch (err) {
      setError(err.message || "Something went wrong while saving.");
    }
  };

  const handleDeleteJourney = async (id) => {
    setError("");
    setSaveMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/journeys/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text() || "Failed to delete journey.");
      setJourneys((prev) => prev.filter((j) => j.id !== id));
    } catch (err) {
      setError(err.message || "Something went wrong while deleting.");
    }
  };

  return (
    <div className="app-root">
      <main className="layout">
        <section className="card form-card">
          <JourneyForm
            form={form}
            onFieldChange={handleFieldChange}
            transportModes={transportModes}
            distanceMiles={distanceMiles}
            co2Kg={co2Kg}
            isCalculating={isCalculating}
            error={error}
            saveMessage={saveMessage}
            onCalculate={handleCalculate}
            onSaveJourney={handleSaveJourney}
          />
        </section>
        <section className="right-column">
          <MapPanel routeCoords={routeCoords} />
          <SavedJourneys journeys={journeys} onDeleteJourney={handleDeleteJourney} />
        </section>
      </main>
    </div>
  );
}