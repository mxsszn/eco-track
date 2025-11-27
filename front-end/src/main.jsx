import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//import CarbonCalculator from "./carbon calculator/c02.jsx";
import Page from "./components/education/edu.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Page />
  </StrictMode>
);
