import "./styles.css";
import React from "react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home-div">
      <h1 className="home-heading"> LIST OF EXPERIMENTS </h1>
      <h1 className="home-heading-1 sub-heading">
        1.<Link to="/HomeOhm">OHM'S LAW</Link>
      </h1>
      <h1 className="home-heading-1 sub-heading">
        2.<Link to="/HomeExample">R-L-C Circuit</Link>
      </h1>
      <h1 className="home-heading-1 sub-heading">
        3.<Link to="/Thevenin">Thevenin Theorem</Link>
      </h1>
    </div>
  );
}
