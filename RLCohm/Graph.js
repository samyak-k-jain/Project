import React, { Component, useState } from "react";
// var sinew =require('../sinewave/sine.html');
// import sinew from "../sinewave/sine.html";
import { useNavigate, useLocation } from "react-router-dom";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Graph(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const voltageData = [0];
  const currentData = [0];
  const validData = [{ x: 0, y: 0 }];
  //const data = location.state.data;
  const data = props.data;
  console.log("data");
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    voltageData.push(data[i].voltage);
    currentData.push(data[i].current);
    validData.push({ x: data[i].voltage, y: data[i].current });
  }
  const data01 = [...validData];
  console.log(voltageData);
  console.log(currentData);

  return (
    <div>
      {/* <div style={{ textAlign: "center" }}> */}
      <ScatterChart width={600} height={600}>
        <CartesianGrid />
        <XAxis type="number" dataKey="x" label="voltage" />
        <YAxis type="number" dataKey="y" label="current" />
        <Scatter data={data01} fill="green" line="true" />
      </ScatterChart>
      {/* </div> */}
    </div>
  );
}
