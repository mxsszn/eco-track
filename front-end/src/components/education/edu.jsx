import "./edu-styles.css";
import Navbar from "../navbar/navbar";
import Hero from "./hero";
import LiveData from "./live-data";
import LiveNews from "./live-news";
import EmissionSources from "./sources";

function Education() {
  return (
    <div className="edu-page">
      <Navbar />
      <Hero />
      {/* what is carbon footprint and transport emissions */}
      {/* why transport emissions matter */}
      <LiveData />
      <LiveNews />
      <EmissionSources />
      {/* how much transport contributes to overall carbon footprint (piechart showing how much transport contributes in comparison to other sources) */}
      {/* Impacts of COs (environmental, economical, health, social) */}
      {/* Solutions */}
      {/* challenges */}
    </div>
  );
}

export default Education;