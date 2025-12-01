import React from 'react';
import "./edu-styles.css";

// We remove the local Navbar import because App.jsx provides a global one.
// import Navbar from "../navbar/navbar"; 

import Hero from "./hero.jsx";
import LiveData from "./live-data.jsx";
import LiveNews from "./live-news.jsx";
import TransportType from "./transport-type.jsx";
import Impacts from "./impacts.jsx";
import Solutions from "./solutions.jsx";
import CTA from "./cta.jsx";
// import LineRevealText from "./text-reveal.jsx"; // Uncomment if available

function Page() {
  return (
    <div className="edu-page">
      {/* <Navbar />  <-- Removed to prevent double navbar */}
      
      <Hero />
      
      {/* Live Data Section */}
      <LiveData />
      
      {/* Live News Feed */}
      <LiveNews />
      
      {/* Transport Breakdown (Pie Chart) */}
      <TransportType />
      
      {/* Environmental & Social Impacts */}
      <Impacts />
      
      {/* Solutions Section */}
      <Solutions />
      
      {/* Call to Action & Footer */}
      <CTA />
    </div>
  );
}

export default Page;