import LiveChart from "./live-charts";
import LineRevealText from "./text-reveal";

function LiveData() {
  return (
    <div className="Live-data-section">
      <h2>Live Data on Transportation Emissions</h2>
      <p className="width-fix">
        Explore real-time statistics and trends in transportation emissions
        worldwide. Understand the impact of various modes of transport on our
        environment.
      </p>
      <div className="live-chart-container">
        <LiveChart />
      </div>
      <div className="live-data">
        {/* area chart showing total amount of CO2 the app helped reduce */}
        {/* line/area chart showing live co2 footprint trend in the world and transport emissions(starting with daily, users can switch to yearly, monthly, daily,hourly)*/}
        {/* pie chart showing how much transport and UK contributes to overall carbon footprint */}

        {/* <div className="data-card">
          <h3>Global CO2 Emissions from Transport Today</h3>
          <p>1.9 billion tonnes</p>
        </div>
        <div className="data-card">
          <h3>Total Emissions in the UK Today</h3>
          <p>24% of global CO2 emissions</p>
        </div>
        <div className="data-card">
          <h3>World Average Carbon Footprint Compared to UK Average </h3>
          <p>Road transport emissions increased by 2.5% in 2023</p>
        </div> */}
        <LineRevealText selector="p, h2" />
      </div>
      <button className="timeframe">HOURLY</button>
      <button className="timeframe">DAILY</button>
      <button className="timeframe">MONTHLY</button>
      <button className="timeframe">YEARLY</button>
    </div>
  );
}
export default LiveData;
