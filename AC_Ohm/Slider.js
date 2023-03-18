import React, { useState, useEffect } from "react";
// import "./styles2.css";
export default function App(props) {
  // console.log(props.presentVal);
  const [value, onChange] = useState(props.presentVal);
  /*useEffect(() => {
    const ele = document.querySelector(".buble");
    if (ele) {
      ele.style.left = `${Number(value / 4)}px`;
    }
  });*/
  return (
    <div className="slider-parent">
      <div className="buble">{value}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={({ target: { value: radius } }) => {
          onChange(radius);
          props.handleUpdate(radius);
        }}
      />
    </div>
  );
}
