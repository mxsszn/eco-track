import Imgwalk from "./edu-assets/walk.png";
import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <div className="cta-section">
      <div className="logger-card">
        <div>
          <img src={Imgwalk} alt="Walking illustration" />
        </div>
      </div>

      <div className="cta">
        <h2 className="cta width-fix">Start measuring your impact Today</h2>

        <p className="cta">
          Knowledge is the first step toward change. Calculate your footprint now
        </p>

        <button
          className="cta-button"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}