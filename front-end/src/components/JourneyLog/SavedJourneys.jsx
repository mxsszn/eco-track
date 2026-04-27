import React from "react";

export default function SavedJourneys({ journeys, onDeleteJourney, onSelectJourney, getModeEmoji }) {
  return (
    <div className="card saved-card">
      <div className="saved-header">
        <h2 className="card-title" style={{margin:0}}>Recent Journeys</h2>
        <span className="saved-badge">{journeys.length} logged</span>
      </div>

      {journeys.length === 0 ? (
        <p style={{color:'#94a3b8', textAlign:'center', padding:'2rem 0'}}>
          No journeys yet. Log your first one above!
        </p>
      ) : (
        <div className="saved-list-wrapper">
          <div className="saved-list">
            {journeys.map((j) => {
              const modeKey = j.modeLabel?.toLowerCase() || "";
              const avatarClass = modeKey.includes("train") ? "train"
                : modeKey.includes("car") ? "car"
                : modeKey.includes("bus") ? "bus"
                : "walk";

              return (
                <div
                  key={j.id}
                  className="saved-item-card"
                  onClick={() => onSelectJourney && onSelectJourney(j)}
                  title="Click to reuse this journey"
                  style={{cursor:'pointer'}}
                >
                  <div className={`mode-avatar ${avatarClass}`}>
                    {getModeEmoji(j.modeLabel)}
                  </div>
                  <div className="saved-content">
                    <div className="route-line">
                      {j.from} <span className="arrow">→</span> {j.to}
                    </div>
                    <div className="meta-line">
                      {j.modeLabel} · {j.distanceKm?.toFixed(1)} km
                      {j.points ? ` · +${j.points} pts` : ""}
                    </div>
                    <div className="meta-line">
                      {j.date ? new Date(j.date).toLocaleDateString('en-GB') : ""}
                    </div>
                  </div>
                  <span className="co2-tag">
                    {j.co2Saved?.toFixed(2) ?? j.co2Kg?.toFixed(2)} kg CO₂
                  </span>
                  <button
                    className="btn-delete"
                    onClick={(e) => { e.stopPropagation(); onDeleteJourney(j.id); }}
                    title="Delete journey"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <p style={{fontSize:'0.75rem', color:'#94a3b8', textAlign:'center', marginTop:'0.75rem'}}>
        💡 Click a journey to reuse it
      </p>
    </div>
  );
}