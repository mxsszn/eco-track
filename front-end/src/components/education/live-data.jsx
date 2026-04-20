import LiveChart from "./live-charts";

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
      <div className="live-data"></div>
      <button className="timeframe">HOURLY</button>
      <button className="timeframe">DAILY</button>
      <button className="timeframe">MONTHLY</button>
      <button className="timeframe">YEARLY</button>
    </div>
  );
}

export default LiveData;
