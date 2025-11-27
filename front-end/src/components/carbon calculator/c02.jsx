import React, { useState } from "react";
import "./CarbonCalculator.css";
// Note: You may need to ensure Font Awesome icons (fa-bus, fa-car, fa-lightbulb)
// are available in your project for the icons to render correctly.

// Simplified placeholder function for CO2 calculation
const calculateCarbon = (distance, mode) => {
  // Simple emission factors (example units: kg CO2e per km)
  const factors = {
    "Bus / Coach": 0.05, // Low factor
    "Car (Petrol)": 0.21, // High factor
    // Add more modes (Train, Walk, etc.) and their factors here
  };

  const factor = factors[mode] || 0;
  // Ensures two decimal places
  return (distance * factor).toFixed(2);
};

const CarbonCalculator = () => {
  // State for the trip distance input
  const [distance, setDistance] = useState(100);
  // States for the two transport modes being compared
  const [mode1, setMode1] = useState("Bus / Coach");
  const [mode2, setMode2] = useState("Car (Petrol)");

  // Calculate carbon emissions for both modes
  const carbon1 = calculateCarbon(distance, mode1);
  const carbon2 = calculateCarbon(distance, mode2);

  // Determine which is higher for conditional styling (Red vs Green)
  const isMode1Higher = parseFloat(carbon1) > parseFloat(carbon2);

  return (
    <div className="carbon-calculator-container">
      <h1 className="title-text">Travel Carbon Calculator</h1>
      <p className="subtitle-text">
        Compare Your Journey, Reduce Your Footprint
      </p>

      {/* 1. Trip Distance Input Section */}
      <div className="input-section">
        <label htmlFor="distance-input">Trip Distance (in Kilometers)</label>
        <input
          id="distance-input"
          type="number"
          min="1"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="distance-input-field"
        />
      </div>

      {/* 2. Comparison Columns */}
      <div className="comparison-columns">
        {/* Column 1: Mode 1 - Dynamically colored based on comparison */}
        <div
          className="impact-card"
          style={{
            // Use the hexadecimal colors specified in the plan
            backgroundColor: isMode1Higher ? "#DB5375" : "#48E5C2",
          }}
        >
          <div className="transport-selector">
            {/* Placeholder icon */}
            <i className="fas fa-bus"></i> Transport Mode
            <select value={mode1} onChange={(e) => setMode1(e.target.value)}>
              <option value="Bus / Coach">Bus / Coach</option>
              <option value="Car (Petrol)">Car (Petrol)</option>
            </select>
          </div>
          <div className="impact-text">
            {isMode1Higher ? "HIGHER IMPACT" : "LOW CARBON CHOICE"}
          </div>
          <div className="carbon-result">
            {carbon1} <span className="co2-unit">kg CO₂e</span>
          </div>
          <div className="impact-footer">
            {isMode1Higher ? "HIGH IMPACT (Red)" : "LOW IMPACT (Green)"}
          </div>
        </div>

        {/* Column 2: Mode 2 - Dynamically colored based on comparison (Inverse of Mode 1) */}
        <div
          className="impact-card"
          style={{
            // Use the hexadecimal colors specified in the plan
            backgroundColor: !isMode1Higher ? "#DB5375" : "#48E5C2",
          }}
        >
          <div className="transport-selector">
            {/* Placeholder icon */}
            <i className="fas fa-car"></i> Transport Mode
            <select value={mode2} onChange={(e) => setMode2(e.target.value)}>
              <option value="Car (Petrol)">Car (Petrol)</option>
              <option value="Bus / Coach">Bus / Coach</option>
            </select>
          </div>
          <div className="impact-text">
            {!isMode1Higher ? "HIGHER IMPACT" : "LOW CARBON CHOICE"}
          </div>
          <div className="carbon-result">
            {carbon2} <span className="co2-unit">kg CO₂e</span>
          </div>
          <div className="impact-footer">
            {!isMode1Higher ? "HIGH IMPACT (Red)" : "LOW IMPACT (Green)"}
          </div>
        </div>
      </div>

      {/* 3. Educational Corner */}
      <div className="eco-education-corner">
        {/* Placeholder icon */}
        <i className="far fa-lightbulb"></i>
        <div className="tip-content">
          <strong>Eco-Education Corner</strong>
          <p>
            Comparison Tip: Choosing the Bus/Train over a Car for 100km can save
            ~16 kg of CO₂e!
          </p>
          <p className="small-print">Small changes, big impact!</p>
        </div>
      </div>
    </div>
  );
};

export default CarbonCalculator;
