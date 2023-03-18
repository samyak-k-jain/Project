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
export default function Home() {
  const navigate = useNavigate();

  var [currentState, setState] = useState({
    graphPlot: false,
    graphValidity: true,
    resistance: 0,
    voltage: 0,
    current: "NOT DEFINED",
    frequency: 0,
    inductance: 0,
    capacitance: 0,
    impedance: 0,
    phase: "NOT DEFINED",
    varray: [],
    carray: [],
    rarray: [],
    iarray: [],
    caparray: [],
    frearray: [],
    pharray: [],
    data: [],
    columns: [
      {
        Header: "current",
        accessor: "current" // accessor is the "key" in the data
      },
      {
        Header: "voltage",
        accessor: "voltage"
      },
      {
        Header: "impedance",
        accessor: "impedance"
      }
      // {
      //   Header: "frequency",
      //   accessor: "frequency"
      // },
      // {
      //   Header: "inductance",
      //   accessor: "inductance"
      // },
      // {
      //   Header: "capacitance",
      //   accessor: "capacitance"
      // },
      // {
      //   Header: "phase",
      //   accessor: "phase"
      // }
    ]
  });

  function handleUpdateVoltage(event) {
    var voltage = Number(event);
    var k =
      1 / (2 * Math.PI * currentState.frequency * currentState.capacitance) -
      2 * Math.PI * currentState.frequency * currentState.inductance;

    if (currentState.capacitance == 0)
      k = 2 * Math.PI * currentState.frequency * currentState.inductance;
    setState((prevState) => {
      return {
        ...prevState,
        voltage: event,
        current:
          voltage /
          Math.sqrt(currentState.resistance * currentState.resistance + k * k),
        impedance: Math.sqrt(
          currentState.resistance * currentState.resistance + k * k
        ),
        phase: Math.atan((-1 * k) / currentState.resistance)
      };
    });
  }
  function handleUpdatefrequency(event) {
    var frequency = Number(event);
    var k =
      1 / (2 * Math.PI * frequency * currentState.capacitance) -
      2 * Math.PI * frequency * currentState.inductance;

    if (currentState.capacitance === 0)
      k = 2 * Math.PI * frequency * currentState.inductance;
    setState((prevState) => {
      return {
        ...prevState,
        frequency: event,
        current:
          currentState.voltage /
          Math.sqrt(currentState.resistance * currentState.resistance + k * k),
        impedance: Math.sqrt(
          currentState.resistance * currentState.resistance + k * k
        ),
        phase: Math.atan((-1 * k) / currentState.resistance)
      };
    });
  }

  function handleUpdateinductance(event) {
    var inductance = Number(event) / 1000;
    var k =
      1 / (2 * Math.PI * currentState.frequency * currentState.capacitance) -
      2 * Math.PI * currentState.frequency * inductance;
    // console.log(
    //   currentState.voltage /
    //     Math.sqrt(currentState.resistance * currentState.resistance + k * k)
    // );
    if (currentState.capacitance == 0)
      k = 2 * Math.PI * currentState.frequency * inductance;
    setState((prevState) => {
      return {
        ...prevState,
        inductance: event / 1000,
        // current: isNaN(event / currentState.inductance)
        //   ? inductance === 0
        //     ? "NOT DEFINED"
        //     : "INFINITE"
        //   : event / currentState.inductance
        current:
          currentState.voltage /
          Math.sqrt(currentState.resistance * currentState.resistance + k * k),
        impedance: Math.sqrt(
          currentState.resistance * currentState.resistance + k * k
        ),
        phase: Math.atan((-1 * k) / currentState.resistance)
      };
    });
  }

  function handleUpdatecapacitance(event) {
    var capacitance = Number(event) / 1000000;

    var k =
      1 / (2 * Math.PI * currentState.frequency * capacitance) -
      2 * Math.PI * currentState.frequency * currentState.inductance;
    // console.log(
    //   currentState.voltage /
    //     Math.sqrt(currentState.resistance * currentState.resistance + k * k)
    // );
    if (capacitance == 0)
      k = 2 * Math.PI * currentState.frequency * currentState.inductance;
    setState((prevState) => {
      return {
        ...prevState,
        capacitance: event / 1000000,
        current:
          currentState.voltage /
          Math.sqrt(currentState.resistance * currentState.resistance + k * k),
        impedance: Math.sqrt(
          currentState.resistance * currentState.resistance + k * k
        ),
        phase: Math.atan((-1 * k) / currentState.resistance)
        // isNaN(event / currentState.capacitance)
        //   ? capacitance === 0
        //     ? "NOT DEFINED"
        //     : "INFINITE"
        //   : event / currentState.capacitance
      };
    });
  }

  function handleUpdateResistance(event) {
    var voltage = Number(currentState.voltage);
    // var capacitance = ;
    var resistance = Number(event);

    var k =
      1 / (2 * Math.PI * currentState.frequency * currentState.capacitance) -
      2 * Math.PI * currentState.frequency * currentState.inductance;
    // console.log(
    //   currentState.voltage /
    //     Math.sqrt(currentState.resistance * currentState.resistance + k * k)
    // );
    if (currentState.capacitance == 0)
      k = 2 * Math.PI * currentState.frequency * currentState.inductance;
    // if (event === 0) {
    //   setState((prevState) => {
    //     return {
    //       ...prevState,
    //       graphValidity: false
    //     };
    //   });
    // } else {
    setState((prevState) => {
      return {
        ...prevState,
        resistance: event,
        // current: isNaN(currentState.voltage / event)
        //   ? voltage === 0
        //     ? "NOT DEFINED"
        //     : "INFINITE"
        //   : currentState.voltage / event
        current:
          currentState.voltage / Math.sqrt(resistance * resistance + k * k),
        impedance: Math.sqrt(resistance * resistance + k * k),
        phase: Math.atan((-1 * k) / resistance)
      };
    });
    // }
  }

  function handleChange(event) {
    var { name, value } = event.target;
    var new_current = currentState.current;
    var ind = currentState.inductance;
    var cap = currentState.capacitance;
    var f = currentState.frequency;
    var new_phase = currentState.phase;
    var voltage = currentState.voltage;
    var resistance = currentState.resistance;
    if (name === "frequency") {
      // f = currentState.frequency;
      f = value;
    }
    if (name === "inductance") {
      //  ind = f*(currentState.inductance);
      ind = value;
    }
    if (name === "capacitance") {
      // cap = f*(currentState.capacitance);
      cap = value;
    }
    // new_phase = Math.atan(ind - cap / currentState.resistance);
    if (name === "voltage") {
      // new_current = value / currentState.impedance;
      voltage = value;
    }
    if (name === "resitance") {
      resistance = value;
    } else {
      new_current = currentState.voltage / value;
    }
    // var voltage = Number(currentState.voltage);
    // var capacitance = ;
    // var resistance = Number(event);

    var k = 1 / (2 * Math.PI * f * cap) - 2 * Math.PI * f * ind;
    // console.log(
    //   currentState.voltage /
    //     Math.sqrt(currentState.resistance * currentState.resistance + k * k)
    // );
    if (cap == 0) k = 2 * Math.PI * f * ind;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        // current: new_current,
        // phase: new_phase
        current: voltage / Math.sqrt(resistance * resistance + k * k),
        impedance: Math.sqrt(resistance * resistance + k * k),
        phase: Math.atan((-1 * k) / resistance)
      };
    });
  }

  function resetData() {
    setState(() => {
      return {
        graphPlot: false,
        graphValidity: true,
        resistance: 0,
        voltage: 0,
        current: "NOT DEFINED",
        frequency: 0,
        inductance: 0,
        capacitance: 0,
        impedance: 0,
        phase: "NOT DEFINED",
        varray: [],
        carray: [],
        rarray: [],
        iarray: [],
        caparray: [],
        frearray: [],
        pharray: [],
        data: [],
        columns: [
          {
            Header: "current",
            accessor: "current" // accessor is the "key" in the data
          },
          {
            Header: "voltage",
            accessor: "voltage"
          },
          {
            Header: "impedance",
            accessor: "impedance"
          }
          // {
          //   Header: "resistance",
          //   accessor: "resistance"
          // },
          // {
          //   Header: "frequency",
          //   accessor: "frequency"
          // },
          // {
          //   Header: "inductance",
          //   accessor: "inductance"
          // },
          // {
          //   Header: "capacitance",
          //   accessor: "capacitance"
          // },
          // {
          //   Header: "phase",
          //   accessor: "phase"
          // }
        ]
      };
    });
  }

  function plotGraph() {
    // console.log(currentState.varray);
    // console.log(currentState.carray);
    /* navigate("/Graph", {
      state: {
        voltageData: [...currentState.varray],
        currentData: [...currentState.carray],
        data: [...currentState.data]
      },
      replace: true
    });*/
    setState((prevState) => {
      return {
        ...prevState,
        graphPlot: true
      };
    });
  }

  function backToHome() {
    setState((prevState) => {
      return {
        ...prevState,
        graphPlot: false
      };
    });
  }

  function backToMain() {
    navigate("/Home", {
      replace: true
    });
  }

  function outputresults(data) {
    navigate("/Output", {
      replace: true
    });
  }

  function sortDataAscending(data) {
    data.sort((a, b) => (a.voltage > b.voltage ? 1 : -1));
    setState((prevValue) => {
      return {
        ...prevValue,
        data: [...data]
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let voltage = Number(currentState.voltage);
    let resistance = Number(currentState.resistance);
    let current = Number(currentState.current);
    let frequency = Number(currentState.frequency);
    let capacitance = Number(currentState.capacitance);
    let inductance = Number(currentState.inductance);
    let impedance = Number(currentState.impedance);
    // let phase = Number(currentState.phase);

    if (impedance === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          graphValidity: false
        };
      });
    } else {
      // let current = voltage / resistance;
      let carray = [...currentState.carray, current];
      let varray = [...currentState.varray, voltage];
      let iarray = [...currentState.iarray, impedance];
      // let caparray = [...currentState.caparray, capacitance];
      // let frearray = [...currentState.frearray, frequency];
      // let iarray = [...currentState.iarray, inductance];
      // let pharray = [...currentState.pharray, phase];
      let data = [
        ...currentState.data,
        {
          current: current,
          voltage: voltage,
          impedance: impedance
        }
      ];
      setState((prevState) => {
        return {
          ...prevState,
          current: current,
          carray: [...carray],
          varray: [...varray],
          iarray: [...iarray],
          // caparray: [...caparray],
          // frearray: [...frearray],
          // iarray: [...iarray],
          // pharray: [...pharray],

          data: [...data]
        };
      });
      sortDataAscending(data);
    }
  }
  var k =
    1 / (2 * Math.PI * currentState.frequency * currentState.capacitance) -
    2 * Math.PI * currentState.frequency * currentState.inductance;
  var Xc =
    1 / (2 * Math.PI * currentState.frequency * currentState.capacitance);

  if (currentState.capacitance == 0) {
    k = 2 * Math.PI * currentState.frequency * currentState.inductance;
    Xc = 0;
  }
  var phase_angle = Math.atan((-1 * k) / currentState.resistance);

  if (!currentState.graphPlot) {
    if (!currentState.graphValidity) {
      return (
        <div style={{ textAlign: "center" }}>
          <h1> INVALID DATA </h1>
          <div
            className="fas fa-exclamation-triangle"
            style={{ fontsize: "48px", color: "red" }}
          ></div>
          <h1 style={{ color: "red", fontsize: "100px" }}>
            {" "}
            PLEASE UPDATE THE VALUE OF RESISTANCE (RESISTANCE CANNOT BE EQUAL TO
            ZERO){" "}
          </h1>

          <button
            style={{ marginBottom: "185px", marginTop: "10px" }}
            className="button button-85 "
            role="button"
            onClick={() => {
              resetData();
            }}
          >
            Home
          </button>
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="main-btn">
            <button
              className="button"
              onClick={() => {
                backToMain();
              }}
              className="button-85"
              role="button"
            >
              {" "}
              BACK TO MAIN PAGE{" "}
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <div className="dropdown ">
              <button class="dropbtn">INSTRUCTIONS </button>
              <div class="dropdown-content">
                <li>
                  {" "}
                  Do the steps as follows:
                  <ul>1. Set the input volatage and Frequency</ul>
                  <ul>
                    2. Set the value of resistance, Inductance and Capacitance
                  </ul>
                  <ul>
                    3. Check the output changes according to the input change
                    input Voltage and frequency.
                  </ul>
                  <ul>4. Add the Values to the Table.</ul>
                  <ul>
                    5. Change The value of volatage for taking more Values to
                    the table.
                  </ul>
                  <ul>6. Plot the Graph. </ul>
                </li>
              </div>
            </div>{" "}
          </div>
          {/* <div src={sinew} className="sinewave"> */}
          {/* to be completed */}
          {/* </div> */}
          <div className="main-container ">
            {/* <h1>  {Math.atan(1)} </h1> */}
            <h1> OHM'S LAW (R-L-C Circuit) </h1>

            <img src={img} />
          </div>
          <div className="wavecontainer box2">
            <div>
              <div className="sinewavenik">
                <SineWaves
                  amplitude={currentState.voltage}
                  frequency={currentState.frequency}
                />
              </div>
              <div className="outputwave">
                <OutputCurrent
                  amplitude={currentState.current}
                  frequency={currentState.frequency}
                  phase_angle={currentState.phase}
                />
              </div>

              <div
                style={{
                  marginTop: "150px",
                  marginLeft: "30px",
                  padding: "10px"
                }}
              >
                <h4 style={{ fontWeight: "bold", color: "darkblack" }}>
                  {" "}
                  VOLTAGE(V(t))=VmSin(wt)(volts) :: Vm = peak voltage{" "}
                </h4>
                <Slider
                  presentVal={currentState.voltage}
                  handleUpdate={handleUpdateVoltage}
                />
              </div>
              <div style={{ marginLeft: "30px", padding: "10px" }}>
                <h4 className="slide"> Frequency(hertz) </h4>
                <Slider
                  presentVal={currentState.frequency}
                  handleUpdate={handleUpdatefrequency}
                />
              </div>
            </div>
          </div>
          <>
            <div
              style={{
                marginLeft: "1010px",
                marginTop: "-480px",
                marginBottom: "-100px"
              }}
            >
              <h2
                style={{
                  backgroundColor: "initial",
                  backgroundImage: "linear-gradient(-180deg, #ff7e31, #e62c03)",

                  boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px",
                  color: "#ffffff",
                  textAlign: "center"
                }}
              >
                {" "}
                {/* Input Parameters */}
              </h2>
              <div className="inputs">
                {/* <h3 className="slide">Voltage(peak)</h3>
              <Slider
                presentVal={currentState.voltage}
                handleUpdate={handleUpdateVoltage}
              /> */}
                <div style={{ marginLeft: "10px", padding: "11px" }}>
                  <h3 className="slide">Resistance(ohm) </h3>
                  <Slider
                    presentVal={currentState.resistance}
                    handleUpdate={handleUpdateResistance}
                  />{" "}
                </div>

                <div style={{ marginLeft: "10px", padding: "11px" }}>
                  <h3 className="slide"> Inductance(mH)</h3>
                  <Slider
                    presentVal={currentState.Inductance}
                    handleUpdate={handleUpdateinductance}
                  />{" "}
                </div>
                <div style={{ marginLeft: "10px", padding: "11px" }}>
                  <h3 className="slide"> Capacitance(uF) </h3>
                  <Slider
                    presentVal={currentState.Capacitance}
                    handleUpdate={handleUpdatecapacitance}
                  />
                </div>
              </div>
            </div>
          </>
          {/* {/* <p> KEEP RESISTANCE CONSTANT IN OHM'S LAW </p> */}
          <div className="outputs"></div>
          <div>
            <div className="input-table tbl">
              <form
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
              >
                <div className="input-tags">
                  <label for="name" style={{ fontFamily: "verdana " }}>
                    VOLTAGE
                  </label>
                  <input
                    placeholder="voltage"
                    type="number"
                    name="voltage"
                    value={currentState.voltage}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div>
                <div className="input-tags">
                  <label for="name" style={{ fontFamily: "verdana " }}>
                    RESISTANCE
                  </label>
                  <input
                    placeholder="resistance"
                    type="number"
                    name="resistance"
                    value={currentState.resistance}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div>
                {/* <div className="input-tags">
                  <label for="name" style={{ fontFamily: "verdana " }}>
                    CAPACITANCE
                  </label>
                  <input
                    placeholder="voltage"
                    type="number"
                    name="voltage"
                    value={currentState.capacitance}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div> */}
                {/* <div className="input-tags">
                  <label for="name" style={{ fontFamily: "verdana " }}>
                    INDUCTANCE
                  </label>
                  <input
                    placeholder="voltage"
                    type="number"
                    name="voltage"
                    value={currentState.inductance}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                  />
                </div> */}

                <button
                  type="submit"
                  className="button button-85 "
                  role="button"
                >
                  {" "}
                  ADD TO TABLE{" "}
                </button>
              </form>
            </div>
          </div>

          <div className="containercal box2">
            <h2
              style={{
                backgroundColor: "initial",
                backgroundImage: "linear-gradient(-180deg, #ff7e31, #e62c03)",

                boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px",
                color: "#ffffff",
                textAlign: "center"
              }}
            >
              {" "}
              Calculations{" "}
            </h2>
            <div className="outputs">
              <h5 style={{ padding: "5px" }}>
                {" "}
                Voltage(rms)(V(peak)/sqrt(2))=
                {currentState.voltage / Math.sqrt(2)} V
              </h5>
              {/* <h4> Resistance={currentState.resistance} Ohm</h4> */}
              <h5 style={{ padding: "5px" }}>
                {" "}
                Angular Frequency(2*pi*f) ={" "}
                {2 * Math.PI * currentState.frequency} rad/s
              </h5>
              <h5 style={{ padding: "5px" }}>
                Inductive Reactance(XL) ={" "}
                {2 * Math.PI * currentState.frequency * currentState.inductance}{" "}
                Ohm
              </h5>
              <h5 style={{ padding: "5px" }}>
                Capacitive Reactance(XC) = {Xc} Ohm
              </h5>

              <h5 style={{ padding: "5px" }}>
                Impedance ={" "}
                {Math.sqrt(
                  currentState.resistance * currentState.resistance + k * k
                )}{" "}
                Ohm
              </h5>
              <h5 style={{ padding: "5px" }}>
                {" "}
                Phase Angle ={phase_angle} radian
              </h5>
            </div>
          </div>
          <div
            style={{
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
              width: "400px",
              padding: "3px",
              marginTop: "30px",
              textAlign: "left",
              marginLeft: "900px",
              color: "rgb(8, 31, 73)"
            }}
          >
            <h2
              style={{
                backgroundColor: "initial",
                backgroundImage: "linear-gradient(-180deg, #ff7e31, #e62c03)",

                boxShadow: "rgba(0, 0, 0, 0.1) 0 2px 4px",
                color: "#ffffff",
                textAlign: "center"
              }}
            >
              {" "}
              Outputs{" "}
            </h2>
            <div className="outputs">
              <h4 style={{ padding: "3px" }}>
                {" "}
                Current(peak)={currentState.current} A
              </h4>
              <h4 style={{ padding: "3px" }}>
                {" "}
                Current(rms)={currentState.current / Math.sqrt(2)} A
              </h4>
            </div>
          </div>
          {/* <div className="table-btn">
            <button
              onClick={() => {
                outputresults(currentState.current, currentState.frequency);
              }}
              className="button-85 btn "
            >
              {" "}
              View Results{" "}
            </button>
          </div> */}
          <div className="plot-table">
            <h1 style={{ color: "", textAlign: "", fontFamily: "verdana" }}>
              TABLE
            </h1>
            <div className="table">
              <BasicTable
                columns={currentState.columns}
                data={currentState.data}
              />
              <div className="table-btn">
                <button
                  onClick={() => {
                    plotGraph();
                  }}
                  className="button-85 btn "
                >
                  {" "}
                  Plot Data{" "}
                </button>
                <button
                  onClick={() => {
                    resetData();
                  }}
                  className="button-85 btn"
                >
                  {" "}
                  Reset Data{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <Graph
          voltageData={currentState.varray}
          currentData={currentState.carray}
          data={currentState.data}
        />
        <button
          onClick={() => {
            backToHome();
          }}
          className="button button-85 graph-btn "
          role="button"
        >
          Home
        </button>
      </div>
    );
  }
}
