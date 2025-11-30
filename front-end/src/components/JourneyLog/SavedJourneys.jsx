import React from "react";
import { db } from '../../firebase';
import { doc, deleteDoc } from 'firebase/firestore';

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

  return (
    <div className="card saved-card">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
        <h2 className="card-title" style={{margin:0}}>Recent Activity</h2>
        <span style={{fontSize: '0.8rem', color: '#888'}}>{journeys.length} saved</span>
      </div>
      
      <p style={{fontSize: '0.85rem', color: '#666', marginBottom: '15px'}}>
        Tap a journey to load it into the form.
      </p>

      {journeys.length === 0 ? (
        <div style={{padding: '20px', textAlign: 'center', color: '#999', background: '#f8f9fa', borderRadius: '8px'}}>
          <p>No journeys saved yet.</p>
        </div>
      ) : (
        /* SCROLLABLE CONTAINER START */
        <div className="saved-list-container" style={{
          maxHeight: '400px', // Matches the Map height roughly
          overflowY: 'auto',  // Adds scrollbar when needed
          paddingRight: '5px' // Space for scrollbar
        }}>
          <div className="saved-list">
            {journeys.map((j) => (
              <div 
                key={j.id} 
                className="saved-item" 
                onClick={() => onSelectJourney && onSelectJourney(j)}
                style={{cursor: 'pointer', transition: 'background 0.2s'}}
                title="Click to fill form"
              >
                <div className="saved-main">
                  <div className="saved-header">
                    <span className="saved-route">
                      {j.from} <span className="arrow">→</span> {j.to}
                    </span>
                  </div>
                  <div className="saved-meta">
                    <span className="mode-badge">{j.mode}</span>
                    <span>{j.distanceMiles?.toFixed(1)} miles</span>
                    <span className="saved-date">{j.date}</span>
                  </div>
                </div>
                
                <div className="saved-right">
                  <div className="saved-co2">
                    {j.co2Saved?.toFixed(2)} kg
                  </div>
                  <button
                    className="btn-delete"
                    onClick={(e) => handleDelete(e, j.id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        /* SCROLLABLE CONTAINER END */
      )}
    </div>
  );
}