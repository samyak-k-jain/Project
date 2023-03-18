import React, { useState } from "react";
import img1 from "./basiccircuit.png";
import img from "./AC_CIRCUIT.jpeg";
import "./styles3.css";
import { useNavigate } from "react-router-dom";
import BasicTable from "./Table";
import Slider from "./Slider";
// import canvas from "../sinewave/sine"
import SineWaves from "../sinewave/SineWaves.js";
import OutputCurrent from "../sinewave/OutputCurrent.js";
// var sinew =require('../sinewave/sine.html');
import sinew from "../sinewave/sine.html";
import Graph from "./Graph";
export default function Output(props) {
  const navigate = useNavigate();

  function backToMain() {
    navigate("/Home", {
      replace: true
    });
  }
  return (
    <div>
      {" "}
      <button> view </button>{" "}
    </div>
  );
}
