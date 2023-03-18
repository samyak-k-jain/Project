import React, { useEffect } from "react";
export default function OutputCurrent(props) {
  useEffect(() => {
    window.requestAnimationFrame(draw);
    // spirograph();
  });

  // // initialize the canvas context
  // useEffect(() => {
  //   // dynamically assign the width and height to canvas
  //   const canvasEle = canvas.current;
  //   canvasEle.width = canvasEle.clientWidth;
  //   canvasEle.height = canvasEle.clientHeight;

  //   // get context of the canvas
  //   ctx = canvasEle.getContext("2d");
  // }, []);

  // useEffect(() => {
  //   drawLine({ x: 20, y: 20, x1: 20, y1: 100 });

  //   drawLine({ x: 50, y: 50, x1: 200, y1: 100 }, { color: 'red' });

  //   drawLine({ x: 300, y: 250, x1: 260, y1: 70 }, { color: 'green', width: 5 });

  //   drawLine({ x: 70, y: 240, x1: 160, y1: 120 }, { color: 'blue' });
  // }, []);

  // // draw a line
  // const drawLine = (info, style = {}) => {
  //   const { x, y, x1, y1 } = info;
  //   const { color = 'black', width = 1 } = style;

  //   ctx.beginPath();
  //   ctx.moveTo(x, y);
  //   ctx.lineTo(x1, y1);
  //   ctx.strokeStyle = color;
  //   ctx.lineWidth = width;
  //   ctx.stroke();
  // }
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
    ctx.strokeStyle = "rgb(666,44,5)";

    // console.log("Drawing point...");
    drawPoint(ctx, yOffset + step);

    var x = 4;
    var y = 0;
    var amplitude = props.amplitude * 5;
    var frequency = (6.28 * props.frequency) / 1000;
    //ctx.moveTo(x, y);
    ctx.moveTo(x, 50);
    while (x < width) {
      y =
        height / 2 +
        amplitude * Math.sin((x + xOffset) * frequency + props.phase_angle);
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

    // context.clearRect(0, 0, 500, 500);
    showAxes(context);
    context.save();

    plotSine(context, step, 5);
    context.restore();

    step += 4;
    window.requestAnimationFrame(draw);
  }

  var step = -4;
  return (
    <div>
      <canvas id="canvas" width="500" height="100"></canvas>

      <h3>{/* Input voltage Wave {props.amplitude} {props.frequency} */}</h3>
      <p>{}</p>
    </div>
  );
}
