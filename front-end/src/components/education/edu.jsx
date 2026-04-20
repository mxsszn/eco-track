import "./edu-styles.css";
import Navbar from "../navbar/navbar";
import Hero from "./hero";
import LiveData from "./live-data";
import LiveNews from "./live-news";
import TransportType from "./transport-type";
import Impacts from "./impacts";
import Solutions from "./solutions";
import CTA from "./cta";

function Page() {
  return (
    <div className="edu-page">
      <Navbar />
      <Hero />
      <LiveData />
      <LiveNews />
      <TransportType />
      <Impacts />
      <Solutions />
      <CTA />
    </div>
  );
}

export default Page;
