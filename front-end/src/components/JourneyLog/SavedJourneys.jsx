import React from 'react';
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

const MODE_ICONS = {
  car: "🚗",
  bus: "🚌",
  train: "🚆",
  bike: "🚲",
  walk: "🚶",
  cycle: "🚲"
};

export default function SavedJourneys({ journeys = [], onJourneyDeleted, onSelectJourney }) {
  
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm("Delete this journey?")) {
      try {
        await deleteDoc(doc(db, "journeys", id));
        if (onJourneyDeleted) onJourneyDeleted();
      } catch (e) {
        console.error("Error removing document: ", e);
      }
    }
  };

  // Helper to format date nicely
  const formatDate = (dateVal) => {
    if (!dateVal) return '';
    const date = dateVal.toDate ? dateVal.toDate() : new Date(dateVal);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="card saved-card">
      <div className="saved-header">
        <h3 className="card-title">Recent Activity</h3>
        <span className="saved-badge">{journeys.length} Saved</span>
      </div>

      <div className="saved-list-wrapper">
        {journeys.length === 0 ? (
          <div className="empty-state">
            <p>No journeys saved yet.</p>
            <small style={{display:'block', marginTop:'5px'}}>Your history will appear here.</small>
          </div>
        ) : (
          <div className="saved-list">
            {journeys.map((j) => (
              <div 
                key={j.id} 
                className="saved-item-card" 
                onClick={() => onSelectJourney && onSelectJourney(j)}
                title="Tap to load details"
              >
                {/* 1. Icon Avatar (Matches CSS .mode-avatar) */}
                <div className={`mode-avatar ${j.mode}`}>
                  {MODE_ICONS[j.mode] || "📍"}
                </div>

                {/* 2. Content Info (Matches CSS .saved-content) */}
                <div className="saved-content">
                  <div className="route-line">
                    <span className="location">{j.from ? j.from.split(',')[0] : 'Unknown'}</span>
                    <span className="arrow">→</span>
                    <span className="location">{j.to ? j.to.split(',')[0] : 'Unknown'}</span>
                  </div>
                  <div className="meta-line">
                    <span className="date">{formatDate(j.date || j.timestamp)}</span>
                    <span className="dot">•</span>
                    <span className="dist">{j.distanceMiles?.toFixed(1)} miles</span>
                  </div>
                </div>

                {/* 3. Action Side (CO2 Tag + Delete) */}
                <div className="saved-action" style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'5px'}}>
                  <div className="co2-tag">
                    +{j.co2Saved?.toFixed(1)} <small>kg</small>
                  </div>
                  
                  <button
                    className="btn-delete"
                    onClick={(e) => handleDelete(e, j.id)}
                    title="Delete entry"
                    style={{fontSize:'0.8rem', padding:'2px 6px', marginTop:'2px'}}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="hint-text">Tap a journey to load it into the form.</p>
    </div>
  );
}