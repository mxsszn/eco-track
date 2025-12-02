import Imgwalk from "./edu-assets/walk.png";
import LineRevealText from "./text-reveal";

export default function CTA() {
  return (
    <div className="cta-section">
      <div className="logger-card">
        <div>
          <img src={Imgwalk} alt="" />
        </div>
        <p className="logger-solution animate-lines">
          Our carbon-footprint logger offers a practical and impactful way to
          reduce transport-related emissions. This application provides
          real-time data on the amount of carbon produced by a person's mode of
          transport, allowing users to clearly understand their emission levels.
          By increasing awareness, the logger encourages more sustainable
          behaviours, such as eco-driving, carpooling, or choosing
          lower-emission routes. Additionally, the data it collects can support
          wider strategies such as improving emission standards and informing
          urban planning. As a result, the carbon-emission logger strengthens
          several of the solutions outlined and acts as an essential tool in
          reducing the environmental impact of transport.
        </p>
        <LineRevealText selector=".animate-lines" />
      </div>
      <div className="cta">
        <h2 className="cta width-fix">Start measuring your impact Today</h2>

        <p className="cta">
          Knowledge is the first step toward change. Calculate your footprint
          now
        </p>

        <button className="cta-button">Go to Dashboard</button>
      </div>
    </div>
  );
}
