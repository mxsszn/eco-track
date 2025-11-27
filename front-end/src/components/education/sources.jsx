function EmissionSources() {
  return (
    <div className="emission-sources">
      <h2>Sources of CO2 Emissions</h2>
      <p>
        {" "}
        Transportation is a major contributor, contributing over 20% to global
        CO2 emissions. Key sources include:
      </p>
      <ul className="sources-list">
        <li className="sources-item">Road Transport: Cars, Trucks, Buses</li>
        <li className="sources-item">
          Air Travel: Domestic and International Flights
        </li>
        <li className="sources-item">
          Maritime Shipping: Cargo and Passenger Ships
        </li>
        <li className="sources-item">Rail Transport: Trains and Subways</li>
        <li className="sources-item">
          Public Transit: Buses, Trams, and Metros
        </li>
      </ul>
    </div>
  );
}

export default EmissionSources;
