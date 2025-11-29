import React, { useState } from "react";
import JourneyForm from "./components/JourneyForm";
import MapPanel from "./components/MapPanel";
import SavedJourneys from "./components/SavedJourneys";

const ORS_API_KEY =
  "REMOVED_ORS_KEY";

// emission factors (kg CO2 per mile)
const TRANSPORT_MODES = [
  { value: "", label: "Select mode", factor: 0 },
  { value: "car", label: "Car", factor: 0.275 },
  { value: "train", label: "Train", factor: 0.041 },
  { value: "bus", label: "Bus", factor: 0.103 },
];

async function geocode(place) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(
    place
  )}&size=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data.features || data.features.length === 0)
    throw new Error(`Could not find "${place}"`);
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
  const distanceMeters = feature.properties.summary.distance;
  const coords = feature.geometry.coordinates;

  return {
    distanceMeters,
    coordinates: coords.map(([lon, lat]) => [lat, lon]),
  };
}

export default function App() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    mode: "",
  });

  const [distanceMiles, setDistanceMiles] = useState(null);
  const [co2Kg, setCo2Kg] = useState(null);
  const [routeCoords, setRouteCoords] = useState(null);

  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const [journeys, setJourneys] = useState([]);

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

      const [fromLoc, toLoc] = await Promise.all([
        geocode(form.from),
        geocode(form.to),
      ]);

      const { distanceMeters, coordinates } = await getRoute(
        fromLoc,
        toLoc
      );

      const miles = distanceMeters / 1609.34;
      const roundedMiles = Math.round(miles * 100) / 100;
      setDistanceMiles(roundedMiles);
      setRouteCoords(coordinates);

      const selectedMode =
        TRANSPORT_MODES.find((m) => m.value === form.mode) || {
          factor: 0,
        };
      const co2 = roundedMiles * selectedMode.factor;
      const roundedCo2 = Math.round(co2 * 100) / 100;
      setCo2Kg(roundedCo2);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while calculating.");
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSaveJourney = () => {
    setError("");

    if (!distanceMiles || !co2Kg) {
      setError("Calculate the carbon for this journey before saving.");
      return;
    }

    const selectedMode =
      TRANSPORT_MODES.find((m) => m.value === form.mode) || {};

    const journey = {
      id: Date.now(),
      from: form.from,
      to: form.to,
      date: form.date,
      modeLabel: selectedMode.label,
      distanceMiles,
      co2Kg,
    };

    setJourneys((prev) => [journey, ...prev]);
    setSaveMessage("Journey saved successfully.");
  };

  const handleDeleteJourney = (id) => {
    setJourneys((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Journey Logger</h1>
        <p>Log your trips and estimate the carbon impact.</p>
      </header>

      <main className="layout">
        <section className="card form-card">
          <JourneyForm
            form={form}
            onFieldChange={handleFieldChange}
            transportModes={TRANSPORT_MODES}
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
          <SavedJourneys
            journeys={journeys}
            onDeleteJourney={handleDeleteJourney}
          />
        </section>
      </main>
    </div>
  );
}