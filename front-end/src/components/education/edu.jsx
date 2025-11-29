import "./edu-styles.css";
import Navbar from "../navbar/navbar";
import Hero from "./hero";
import LiveData from "./live-data";
import LiveNews from "./live-news";
import TransportType from "./transport-type";
import Impacts from "./impacts";
import Solutions from "./solutions";
import CTA from "./cta";
import LineRevealText from "./text-reveal";

function Page() {
  return (
    <div className="edu-page">
      <Navbar />
      <Hero />
      {/* what is carbon footprint and transport emissions */}
      {/* why transport emissions matter */}
      <LiveData />
      <LiveNews />
      {/* how much transport contributes to overall carbon footprint (piechart showing how much transport contributes in comparison to other sources) */}
      <TransportType />
      {/* Impacts of COs (environmental, economical, health, social) */}
      <Impacts />
      {/* Solutions */}
      <Solutions />
      {/* conclusion (cta and footer) */}
      <CTA />
    </div>
  );
}

export default Page;
