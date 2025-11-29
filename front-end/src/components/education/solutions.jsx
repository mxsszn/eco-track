import LineRevealText from "./text-reveal";
function Solutions() {
  return (
    <div className="solutions-section">
      <h2 className="width-fix">
        Solutions to Reduce CO2 Emissions from Transport
      </h2>
      <p className="width-fix">
        Adopting sustainable transportation methods and technologies can
        significantly reduce carbon emissions and mitigate climate change.
      </p>
      <div className="solution-cards">
        <div className="solution-card">
          <h3>Electric Vehicles (EVs)</h3>
          <p className="width-fix">
            Transitioning to electric vehicles reduces reliance on fossil fuels
            and lowers greenhouse gas emissions.
          </p>
        </div>
        <div className="solution-card">
          <h3>Public Transportation</h3>
          <p className="width-fix">
            Investing in efficient public transit systems decreases the number
            of individual car journeys, reducing overall emissions.
          </p>
        </div>
        <div className="solution-card">
          <h3>Cycling and Walking</h3>
          <p className="width-fix">
            Promoting active transportation options like cycling and walking not
            only cuts emissions but also improves public health.
          </p>
        </div>
        <div className="solution-card">
          <h3>Renewable Fuels</h3>
          <p className="width-fix">
            Utilizing biofuels and hydrogen as alternatives to traditional
            fossil fuels can lower the carbon footprint of transport.
          </p>
        </div>
        <LineRevealText selector="p, h2" />
      </div>
    </div>
  );
}

export default Solutions;
