import React from "react";

export default function SavedJourneys({ journeys, onDeleteJourney }) {
  return (
    <div className="card saved-card">
      <h2 className="card-title">Saved journeys</h2>

      {journeys.length === 0 && (
        <p className="muted">No journeys saved yet.</p>
      )}

      {journeys.map((j) => (
        <div key={j.id} className="saved-item">
          <div className="saved-main">
            <div>
              <div className="saved-route">
                {j.from} <span className="arrow">→</span> {j.to}
              </div>
              <div className="saved-meta">
                Mode: {j.modeLabel},{" "}
                {j.distanceMiles.toFixed(2)} miles
              </div>
              <div className="saved-date">{j.date}</div>
            </div>
            <div className="saved-co2">
              {j.co2Kg.toFixed(2)} kg CO₂
            </div>
          </div>

          <button
            className="btn btn-danger small"
            onClick={() => onDeleteJourney(j.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}