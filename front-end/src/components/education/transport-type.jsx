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
                  largest contributors within the transport sector. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eveniet veritatis
                  asperiores natus quod quaerat nesciunt deleniti earum
                  explicabo numquam rerum?
                </p>
                <p className="source-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis, animi a dolore numquam quam minus aspernatur atque
                  aliquid placeat commodi.
                </p>
              </div>
              <div className="source piechart-container">
                <MyPieChart />
              </div>
              <div className="source">
                <h3>Aviation Transport</h3>
                <p className="source-description">
                  Cars, trucks, and buses powered by gasoline and diesel are the
                  largest contributors within the transport sector. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eveniet veritatis
                  asperiores natus quod quaerat nesciunt deleniti earum
                  explicabo numquam rerum?
                </p>
                <p className="source-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis, animi a dolore numquam quam minus aspernatur atque
                  aliquid placeat commodi.
                </p>
              </div>
              <div className="source empty"></div>
              <div className="source rail">
                <h3>Rail And Public Transport</h3>
                <p className="source-description">
                  Cars, trucks, and buses powered by gasoline and diesel are the
                  largest contributors within the transport sector. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eveniet veritatis
                  asperiores natus quod quaerat nesciunt deleniti earum
                  explicabo numquam rerum?
                </p>
                <p className="source-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis, animi a dolore numquam quam minus aspernatur atque
                  aliquid placeat commodi.
                </p>
              </div>

              <div className="source">
                <h3>Shipping And Maritime Transport</h3>
                <p className="source-description">
                  Cars, trucks, and buses powered by gasoline and diesel are the
                  largest contributors within the transport sector. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Eveniet veritatis
                  asperiores natus quod quaerat nesciunt deleniti earum
                  explicabo numquam rerum?
                </p>
                <p className="source-description">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Corporis, animi a dolore numquam quam minus aspernatur atque
                  aliquid placeat commodi.
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
