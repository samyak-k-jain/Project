import React, { useState } from "react";
import img1 from "./basiccircuit.png";
import { useNavigate } from "react-router-dom";
import BasicTable from "./Table";
import Slider from "./Slider";
import Graph from "./Graph";
import "./styles2.css";
export default function Home() {
  const navigate = useNavigate();

  var [currentState, setState] = useState({
    graphPlot: false,
    graphValidity: true,
    resistance: 0,
    voltage: 0,
    current: "NOT DEFINED",
    varray: [],
    carray: [],
    rarray: [],
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
        Header: "resistance",
        accessor: "resistance"
      }
    ]
  });

  function handleUpdateVoltage(event) {
    var voltage = Number(event);
    setState((prevState) => {
      return {
        ...prevState,
        voltage: event,
        current: isNaN(event / currentState.resistance)
          ? voltage === 0
            ? "NOT DEFINED"
            : "INFINITE"
          : event / currentState.resistance
      };
    });
  }
  function handleUpdateResistance(event) {
    var voltage = Number(currentState.voltage);
    if (event === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          graphValidity: false
        };
      });
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          resistance: event,
          current: isNaN(currentState.voltage / event)
            ? voltage === 0
              ? "NOT DEFINED"
              : "INFINITE"
            : currentState.voltage / event
        };
      });
    }
  }

  function handleChange(event) {
    var { name, value } = event.target;
    var new_current = currentState.current;
    if (name === "voltage") {
      new_current = value / currentState.resistance;
    } else {
      new_current = currentState.voltage / value;
    }
    setState((prevState) => {
      return { ...prevState, [name]: value, current: new_current };
    });
  }

  function resetData() {
    setState(() => {
      return {
        graphPlot: false,
        graphValidity: true,
        resistance: 0,
        voltage: 0,
        current: 0,
        varray: [],
        carray: [],
        rarray: [],
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
            Header: "resistance",
            accessor: "resistance"
          }
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
    if (resistance === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          graphValidity: false
        };
      });
    } else {
      let current = voltage / resistance;
      let carray = [...currentState.carray, current];
      let varray = [...currentState.varray, voltage];
      let rarray = [...currentState.rarray, resistance];
      let data = [
        ...currentState.data,
        {
          current: current,
          voltage: voltage,
          resistance: resistance
        }
      ];
      setState((prevState) => {
        return {
          ...prevState,
          current: current,
          carray: [...carray],
          varray: [...varray],
          rarray: [...rarray],
          data: [...data]
        };
      });
      sortDataAscending(data);
    }
  }

  if (!currentState.graphPlot) {
    if (!currentState.graphValidity) {
      return (
        <div>
          <h1> INVALID DATA </h1>
          <button
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
        <div className="ohms-home-styled-container ">
          <button
            className="button"
            onClick={() => {
              backToMain();
            }}
            className="button-42"
            role="button"
          >
            {" "}
            BACK TO MAIN PAGE{" "}
          </button>
          <div className="dropdown">
            <button class="dropbtn">INSTRUCTIONS </button>
            <div class="dropdown-content">
              <li>
                {" "}
                Do the steps as follows
                <ul> 1.set the value of resistance </ul>
                <ul>2. take the input volatage</ul>
              </li>
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              color: "rgb(10, 54, 59)",
              boxShadow: "rgba(0, 0, 0, 0.15) 0px 15px 25px",
              width: "400px",
              marginLeft: "500px"
            }}
          >
            <h1> OHM'S LAW </h1>
            <img src={img1} />
            <h6 style={{ padding: "6px" }}> Circuit Diagram </h6>
          </div>
          <div className="container box">
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
              Inputs
            </h2>
            <h1>VOLTAGE</h1>
            <Slider
              presentVal={currentState.voltage}
              handleUpdate={handleUpdateVoltage}
            />
            <h1>RESISTANCE</h1>
            <Slider
              presentVal={currentState.resistance}
              handleUpdate={handleUpdateResistance}
            />
          </div>
          <h3 style={{ fontFamily: "verdana" }}>
            {" "}
            KEEP RESISTANCE CONSTANT IN OHM'S LAW{" "}
          </h3>
          <h1></h1>
          <h1></h1>
          <div>
            <div className="input-table">
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
          <div
            style={{
              padding: "3px",

              marginTop: "5px",
              textAlign: "left",
              marginLeft: "900px",
              color: "rgb(8, 31, 73)",
              fontFamily: "Trebuchet MS"
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
              <h1> VOLTAGE={currentState.voltage} V</h1>
              <h1> RESISTANCE={currentState.resistance} Ohm</h1>
              <h1>
                CURRENT=
                {currentState.current} A
              </h1>
            </div>
          </div>
          <div className="table">
            <h1 style={{ color: "", textAlign: "", fontFamily: "verdana" }}>
              TABLE
            </h1>
            <BasicTable
              style={{ color: "", textAlign: "", fontFamily: "verdana" }}
              columns={currentState.columns}
              data={currentState.data}
            />
            <div className="table-btn">
              {" "}
              <button
                className="button-85 btn"
                role="button"
                onClick={() => {
                  plotGraph();
                }}
              >
                {" "}
                Plot Data{" "}
              </button>
              <button
                className="button-85 btn "
                role="button"
                onClick={() => {
                  resetData();
                }}
              >
                {" "}
                Reset Data{" "}
              </button>
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
          className="button button-85 graph-btn"
          role="button"
        >
          Home
        </button>
      </div>
    );
  }
}
