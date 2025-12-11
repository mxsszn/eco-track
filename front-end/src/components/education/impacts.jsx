import LineRevealText from "./text-reveal";
function Impacts() {
  return (
    <section className="impacts-section">
      <h2>Impacts of CO₂ Emissions from Transport</h2>
      <p className="impacts-description">
        Carbon emissions from transport contribute significantly to climate
        change, affecting the environment, human health, and economic stability
        worldwide.
      </p>

      <div className="impact-cards">
        <div className="impact-card one">
          <h3 className="impact-header">Environmental Impact</h3>
          <p>
            Increased greenhouse gases lead to global warming, extreme weather
            events, and loss of biodiversity.
          </p>
        </div>

        <div className="impact-card two">
          <h3 className="impact-header">Health Impact</h3>
          <p>
            Air pollution from vehicle emissions causes respiratory diseases,
            cardiovascular problems, and premature deaths. Over 4000 premature
            deaths were contributed by Air pollution in 2019(London Assembly,
            2020).
          </p>
        </div>

        <div className="impact-card three">
          <h3 className="impact-header">Economic Impact</h3>
          <p>
            Climate change–related disasters result in significant economic
            losses, affecting infrastructure, agriculture, and livelihoods.
          </p>
        </div>

        <div className="impact-card four">
          <h3 className="impact-header">Social Impact</h3>
          <p>
            Vulnerable communities are disproportionately affected, leading to
            displacement and increased inequality.
          </p>
        </div>
      </div>
      <LineRevealText selector="p, h2" />
    </section>
  );
}

export default Impacts;
