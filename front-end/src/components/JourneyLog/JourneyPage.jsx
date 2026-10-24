
import React, { useEffect, useState } from "react";
import JourneyForm from "./JourneyForm";
import MapPanel from "./MapPanel";
import SavedJourneys from "./SavedJourneys";
import "./JourneyLog.css";

const ORS_API_KEY = import.meta.env.VITE_ORS_API_KEY;
const API_BASE_URL = "http://localhost:8080/api";

async function geocode(place) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(place)}&size=1`;
  const res = await fetch(url);

  if (!res.ok) throw new Error("Geocoding failed");

  const data = await res.json();

  if (!data.features || data.features.length === 0) {
    throw new Error(`Could not find "${place}"`);
  }

  const [lon, lat] = data.features[0].geometry.coordinates;
  return { lat, lon };
}

async function getRoute(start, end) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car/geojson?api_key=${ORS_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      coordinates: [
        [start.lon, start.lat],
        [end.lon, end.lat],
      ],
    }),
  });

  if (!res.ok) throw new Error("Route request failed");

  const data = await res.json();
  const feature = data.features[0];

  return {
    distanceMeters: feature.properties.summary.distance,
    coordinates: feature.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
  };
}

function milesToKm(miles) {
  return miles * 1.60934;
}

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
  const userId = parseInt(localStorage.getItem("userId"), 10) || 1;

  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    mode: "",
  });

  const [distanceMiles, setDistanceMiles] = useState(null);
  const [co2Kg, setCo2Kg] = useState(null);
  const [co2Saved, setCo2Saved] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const [transportModes, setTransportModes] = useState([
    { value: "", label: "Select mode", factor: 0, transportModeId: null },
  ]);

  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    loadTransportModes();
    loadJourneys();
  }, []);

  const loadTransportModes = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/transport-modes`);

      if (!res.ok) {
        throw new Error("Could not load transport modes.");
      }

      const data = await res.json();
      setTransportModes(formatTransportModes(data));
    } catch (err) {
      setError(err.message || "Could not load transport modes.");
    }
  };

  const loadJourneys = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/journeys/user/${userId}`);

      if (!res.ok) {
        throw new Error("Could not load journeys.");
      }

      const data = await res.json();
      setJourneys(data.map(formatJourneyFromApi));
    } catch {
      setJourneys([]);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSaveMessage("");
  };

  const handleCalculate = async () => {
    setError("");
    setSaveMessage("");
    setCo2Kg(null);
    setDistanceMiles(null);
    setCo2Saved(null);

    if (!form.from || !form.to || !form.date || !form.mode) {
      setError("Please fill in all fields before calculating.");
      return;
    }

    try {
      setIsCalculating(true);

      const [fromLoc, toLoc] = await Promise.all([
        geocode(form.from),
        geocode(form.to),
      ]);

      const { distanceMeters, coordinates } = await getRoute(fromLoc, toLoc);

      const miles = Math.round((distanceMeters / 1609.34) * 100) / 100;
      const km = milesToKm(miles);

      setDistanceMiles(miles);
      setRouteCoords(coordinates);

      const selectedMode =
        transportModes.find((m) => m.value === form.mode) || { factor: 0 };

      const emission = Math.round(km * selectedMode.factor * 100) / 100;
      setCo2Kg(emission);

      const baselineFactor = 0.17;
      const saved = Math.max(
        0,
        Math.round((baselineFactor - selectedMode.factor) * km * 100) / 100
      );

      setCo2Saved(saved);
    } catch (err) {
      setError(err.message || "Could not calculate route. Check your locations.");
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

    const selectedMode = transportModes.find((m) => m.value === form.mode);

    if (!selectedMode?.transportModeId) {
      setError("Please select a valid transport mode.");
      return;
    }

    const payload = {
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
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error((await res.text()) || "Failed to save journey.");
      }

      const saved = await res.json();

      setJourneys((prev) => [formatJourneyFromApi(saved), ...prev]);

      setSaveMessage(
        `Journey saved! You earned ${saved.points_awarded} points and saved ${saved.co2_saved?.toFixed(2)} kg CO₂.`
      );

      localStorage.setItem(
        "dashboardFlashMessage",
        JSON.stringify({
          co2: saved.co2_saved,
          points: saved.points_awarded,
          timestamp: Date.now(),
        })
      );

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
    setError("");
    setSaveMessage("");

    if (!id) {
      setError("Could not delete journey because no journey ID was found.");
      return;
    }

    const confirmDelete = window.confirm("Delete this journey?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_BASE_URL}/journeys/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error((await res.text()) || "Could not delete journey.");
      }

      setJourneys((prev) => prev.filter((j) => j.id !== id));
      setSaveMessage("Journey deleted successfully.");
    } catch (err) {
      setError(err.message || "Could not delete journey.");
    }
  };

  const handleSelectJourney = (j) => {
    const modeMatch = transportModes.find(
      (m) => m.label.toLowerCase() === j.modeLabel?.toLowerCase()
    );

    setForm({
      from: j.from || "",
      to: j.to || "",
      date: j.date ? new Date(j.date).toISOString().split("T")[0] : "",
      mode: modeMatch?.value || "",
    });

    setDistanceMiles(null);
    setCo2Kg(null);
    setCo2Saved(null);
    setRouteCoords(null);
    setSaveMessage("");
    setError("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="journey-page-container">
      <h1 className="page-main-title">🗺️ Log a Journey</h1>
      <p className="page-subtitle">
        Track your travel and see your carbon impact in real time.
      </p>

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