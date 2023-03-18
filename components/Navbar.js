import React from "react";

import styled from "styled-components";
import nitslogo from "../src/NIT_Silchar_logo.png";

const NavStyledDiv = styled.div`
  width: 100vw;
  font-family: "Cinzel", serif;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  .Nav-container {
    display: flex;
    justify-self: center;
    align-items: center;
  }
  .Nav-container-left {
    display: flex;
    justify-self: center;
    align-items: center;
  }
  .nav-logo {
    height: 6rem;
    margin: 0.5rem;
  }
  .nav-left-text {
    font-family: "Cinzel", serif;
    font-size: 2rem;
    padding-right: 2rem;
    color: #f25700;
  }
  .Nav-container-color {
    background-color: #f25700;
    width: 0.2rem;
    height: 8rem;

    margin: 0.4rem;
  }
  .Nav-container-right {
    padding: 2rem;
  }
  .Nav-container-right-text {
    padding: 1rem 0rem;
    font-size: 2rem;
    color: #f25700;
  }
  .Nav-container-right-text1 {
    font-size: 1.5rem;
  }
  .nav-color-div {
    margin-top: 1rem;
    height: 0.8rem;
    background-color: #f25700;
  }
`;
export default function Navbar() {
  return (
    <NavStyledDiv>
      <div className="Nav-container">
        <div className="Nav-container-left">
          <div className="Nav-conatiner-left-logo">
            <img src={nitslogo} alt="nitslogo" className="nav-logo" />
          </div>
          <div className="Nav-container-left-text">
            <p className="nav-left-text">
              NIT <br></br>SILCHAR
            </p>
          </div>
        </div>
        <div className="Nav-container-color"></div>
        <div className="Nav-container-right">
          <div className="Nav-container-right-text">VIRTUAL LABS</div>
          <div className="Nav-container-right-text1">
            Department of Electrical Engineering
          </div>
        </div>
      </div>
      <div className="nav-color-div"></div>
    </NavStyledDiv>
  );
}
