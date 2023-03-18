import React, { useEffect } from "react";
export default function SineWaves(props) {
  useEffect(() => {
    window.requestAnimationFrame(draw);
    // spirograph();
  });
  function showAxes(ctx, axes) {
    var width = ctx.canvas.width / 2;
    var height = ctx.canvas.height;
    var xMin = 0;

    ctx.beginPath();
    ctx.strokeStyle = "rgb(128,128,128)";

    // X-Axis
    ctx.moveTo(xMin, height / 2);
    ctx.lineTo(width, height / 2);

    // Y-Axis
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);

    // Starting line
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height);

    ctx.stroke();
  }
  function drawPoint(ctx, y) {
    y = -1 * y;
    var radius = 3;
    ctx.beginPath();

    // Hold x constant at 4 so the point only moves up and down.
    ctx.arc(4, y, radius, 0, 2 * Math.PI, false);

    ctx.fillStyle = "black";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  function plotSine(ctx, xOffset, yOffset) {
    var width = ctx.canvas.width / 2;
    var height = ctx.canvas.height;
    var scale = 20;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "darkgreen";

    // console.log("Drawing point...");
    drawPoint(ctx, yOffset + step);

    var x = 4;
    var y = 0;
    var amplitude = props.amplitude / 2;
    var frequency = (2 * 3.14 * props.frequency) / 1000;
    //ctx.moveTo(x, y);
    ctx.moveTo(x, 50);
    while (x < width) {
      y = height / 2 + amplitude * Math.sin((x + xOffset) * frequency);
      ctx.lineTo(x, y);
      x++;
      // console.log("x="+x+" y="+y);
    }
    ctx.stroke();
    ctx.save();

    // console.log("Drawing point at y=" + y);
    drawPoint(ctx, y);
    ctx.stroke();
    ctx.restore();
  }
  function draw() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    context.clearRect(0, 0, 500, 500);
    showAxes(context);
    context.save();

    plotSine(context, step, 0.5);
    context.restore();

    step += 4;
    window.requestAnimationFrame(draw);
  }

  var step = -4;
  return (
    <div>
      <div
        style={{
          marginRight: "0px",
          marginLeft: "170px",
          marginBottom: "30px"
        }}
      >
        {/* <h3> {props.frequency}</h3> */}
        {/* <h3> {props.amplitude}</h3> */}

        <h6 style={{ color: "darkgreen" }}> Input_Voltage </h6>
        <h6 style={{ color: "rgb(666,44,5)" }}>
          {" "}
          Output_current(Multiplication_factor=10){" "}
        </h6>
      </div>
      <div>
        <canvas id="canvas" width="500" height="100"></canvas>
      </div>

      {/* <h3>Input voltage & Output current Wave</h3> */}
    </div>
  );
}
