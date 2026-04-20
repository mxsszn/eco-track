import MyPieChart from "./piechart";

export default function TransportType() {
  return (
    <div>
      <div className="emission-sources">
        <h2>Sources of CO2 Emissions</h2>
        <p>
          Transportation is a major contributor, contributing over 20% to global
          CO2 emissions. Key sources include:
        </p>
        <div className="source-grid">
          <div className="source">
            <h3>Road Transport</h3>
            <p className="source-description">
              Cars, trucks, and buses powered by gasoline and diesel are the
              largest contributors within the transport sector.
            </p>
            <br />
            <p className="source-description">
              An example of a journey between London and Glasgow, a journey via
              the average petrol car emits over 4 times more CO2e per passenger
              than the equivalent journey by coach(Department For Transport,
              2023).
            </p>
          </div>
          <div className="source piechart-container">
            <h3>
              Emissions in % for cars, vans, HGVs, Buses and Coaches in 2021
            </h3>
            <MyPieChart />
          </div>
          <div className="source">
            <h3>Aviation Transport</h3>
            <p className="source-description">
              In 2022 global CO2 emissions from the transport sector grew 3%
              more than in 2021 where aviation was responsible for much of the
              increase(IEA).
            </p>
            <br />
            <p className="source-description">
              In 2023, aviation accounted for 2.5% of global energy-related CO2
              emissions (IEA).
            </p>
          </div>
          <div className="source empty"></div>
          <div className="source rail">
            <h3>Rail And Public Transport</h3>
            <p className="source-description">
              Rail is the least emissions-intensive mode of passenger transport.
              Electric rail, which accounts for over 85% of passenger rail
              activity, does not emit any direct CO2 emissions (IEA).
            </p>
          </div>
          <div className="source">
            <h3>Shipping And Maritime Transport</h3>
            <p className="source-description">
              In 2022 international shipping accounted for about 2% of global
              energy-related CO2 emissions (IEA).
            </p>
            <br />
            <p className="source-description">
              Scaling up low-emission fuels is the key to decarbonising
              international shipping (IEA).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
