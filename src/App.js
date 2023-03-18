import "./styles.css";
import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./Home";
import HomeExample from "../AC_Ohm/Home";
// import TheoryThevenin from "../Thevenin/Theory";
import HomeOhm from "../Ohm/Home";
import GraphOhm from "../Ohm/Graph";
import HomeRLC from "../Thevenin/Home";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/HomeExample" element={<HomeExample />} />
          <Route path="/HomeRLC" element={<HomeRLC />} />
          <Route path="/HomeOhm" element={<HomeOhm />} />
          <Route path="/GraphOhm" element={<GraphOhm />} />
          <Route path="/" element={<Navigate replace to="/Home" />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
