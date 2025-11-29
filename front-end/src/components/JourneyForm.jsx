// src/components/JourneyForm.jsx
import React from "react";

export default function JourneyForm({
  form,
  onFieldChange,
  transportModes,
  distanceMiles,
  co2Kg,
  isCalculating,
  error,
  saveMessage,
  onCalculate,
  onSaveJourney,
}) {
  return (
    <>
      <h2 className="card-title">Log a journey</h2>

      <div className="form-grid">
        <div className="form-group">
          <label>
            From<span className="required">*</span>
          </label>
          <input
            type="text"
            name="from"
            placeholder="e.g. London, UK"
            value={form.from}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-group">
          <label>
            To<span className="required">*</span>
          </label>
          <input
            type="text"
            name="to"
            placeholder="e.g. Manchester, UK"
            value={form.to}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-group">
          <label>
            Date<span className="required">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={onFieldChange}
          />
        </div>

        <div className="form-group">
          <label>
            Transport mode<span className="required">*</span>
          </label>
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
            {distanceMiles != null
              ? `${distanceMiles.toFixed(2)} miles`
              : "-"}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-primary full-radius"
          onClick={onCalculate}
          disabled={isCalculating}
        >
          {isCalculating ? "Calculating..." : "Calculate carbon"}
        </button>
      </div>

      <div className="co2-row">
        <span className="co2-label">Estimated CO₂</span>
        <span className="co2-value">
          {co2Kg != null
            ? `${co2Kg.toFixed(2)} kg CO₂ for this journey`
            : "-"}
        </span>
      </div>

      <div className="actions">
        <button
          type="button"
          className="btn btn-blue"
          onClick={onSaveJourney}
        >
          Save journey
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {saveMessage && (
        <div className="alert alert-success">{saveMessage}</div>
      )}
    </>
  );
}