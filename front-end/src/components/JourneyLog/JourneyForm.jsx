import React from "react";

export default function JourneyForm({
  form,
  onFieldChange,
  transportModes,
  distanceMiles,
  co2Kg,
  co2Saved,
  isCalculating,
  error,
  saveMessage,
  onCalculate,
  onSaveJourney,
}) {
  return (
    <>
      <h2 className="card-title">Journey Details</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>From <span style={{color:'#ef4444'}}>*</span></label>
          <input
            type="text"
            name="from"
            placeholder="e.g. London, UK"
            value={form.from}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-group">
          <label>To <span style={{color:'#ef4444'}}>*</span></label>
          <input
            type="text"
            name="to"
            placeholder="e.g. Manchester, UK"
            value={form.to}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-group">
          <label>Date <span style={{color:'#ef4444'}}>*</span></label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-group">
          <label>Transport Mode <span style={{color:'#ef4444'}}>*</span></label>
          <select name="mode" value={form.mode} onChange={onFieldChange}>
            {transportModes.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="distance-row">
        <div className="distance-pill">
          <span className="distance-label">Distance</span>
          <span className="distance-value">
            {distanceMiles != null ? `${distanceMiles.toFixed(2)} mi` : "—"}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onCalculate}
          disabled={isCalculating}
          style={{width:'auto', padding:'12px 24px'}}
        >
          {isCalculating ? "Calculating..." : "Calculate Carbon"}
        </button>
      </div>

      {co2Kg !== null && (
        <div className="co2-row">
          <div>
            <span className="co2-label">CO₂ Emitted</span>
            <div className="co2-value">{co2Kg.toFixed(2)} kg</div>
          </div>
          {co2Saved !== null && (
            <div style={{textAlign:'right'}}>
              <span className="co2-label">CO₂ Saved vs Car</span>
              <div className="co2-value">+{co2Saved.toFixed(2)} kg</div>
            </div>
          )}
        </div>
      )}

      <div className="actions" style={{marginTop: '1.5rem'}}>
        <button
          type="button"
          className="btn btn-teal"
          onClick={onSaveJourney}
          disabled={co2Kg === null}
          style={{width:'100%', padding:'16px', fontSize:'1.05rem'}}
        >
          💾 Save Journey
        </button>
      </div>

      {error && <div className="alert alert-error" style={{marginTop:'1rem'}}>{error}</div>}
      {saveMessage && <div className="alert alert-success" style={{marginTop:'1rem'}}>{saveMessage}</div>}
    </>
  );
}