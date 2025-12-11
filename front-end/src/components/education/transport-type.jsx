import LineRevealText from "./text-reveal";
import MyPieChart from "./piechart";
export default function TransportType() {
  return (
    <div>
      <div>
        <div className="emission-sources">
          <div>
            <h2>Sources of CO2 Emissions</h2>
            <p>
              {" "}
              Transportation is a major contributor, contributing over 20% to
              global CO2 emissions. Key sources include:
            </p>
            <div className="source-grid">
              <div className="source">
                <h3>Road Transport</h3>
                <p className="source-description">
                  Cars, trucks, and buses powered by gasoline and diesel are the
                  largest contributors within the transport sector. Cars emit
                  more GHGs per passenger mile than trains and coaches that
                  convey more people, making them less efficient in terms of
                  CO2e emissions.
                </p>
                <br />
                <p className="source-description">
                  An example of a journey between London and Glasgow, a journey
                  via the average petrol car emits over 4 times more CO2e per
                  passenger than the equivalent journey by coach, or 3 times
                  more CO2e per passenger than an electric car (taking into
                  account emissions from electricity generation and
                  distribution)(Department For Transport, 2023).
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
                  more than in 2021 where aviation was responsible for much of
                  the increase(IEA).
                </p>
                <br />
                <p className="source-description">
                  In 2023, aviation accounted for 2.5% of global energy-related
                  CO2 emissions (IEA). Although aviation accounts for a small
                  share of CO2 emissions, it remains one of the hardest to
                  reduce.
                </p>
              </div>
              <div className="source empty"></div>
              <div className="source rail">
                <h3>Rail And Public Transport</h3>
                <p className="source-description">
                  Rail is the least emissions-intensive mode of passenger
                  transport. Electric rail, which accounts for over 85% of
                  passenger rail activity and 55% of freight movements, does not
                  emit any direct CO2 emissions (IEA).
                </p>
                <br />
                <p className="source-description">
                  Expanding rail networks and their use will be important for
                  achieving emission reductions to get on track with the NZE
                  Scenario (IEA).
                </p>
              </div>
              <div className="source">
                <h3>Shipping And Maritime Transport</h3>
                <p className="source-description">
                  In 2022 international shipping accounted for about 2% of
                  global energy-related CO2 emissions. While shipping emissions
                  declined during the COVID-19 pandemic, they have rebounded
                  strongly as global trade has recovered (IEA).
                </p>
                <br />
                <p className="source-description">
                  Scaling up low-emission fuels is the key to decarbonising
                  international shipping. Innovation is vital to ensure that
                  zero-emission oceangoing vessels are made commercially
                  available by 2030 (IEA).
                </p>
              </div>
            </div>
          </div>
        </div>
        <LineRevealText selector="p, h2" />
      </div>
    </div>
  );
}
