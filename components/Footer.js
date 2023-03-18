import React from "react";
import styled from "styled-components";

const FooterStyleDiv = styled.div`
  position: absolute;
  background-color: #f25700;
  width: 100vw;
  height: 12.5rem;
  color: #fff;
  font-family: "Open Sans", sans-serif;
  font-family: "Roboto", sans-serif;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .Footer-container-text {
    text-align: center;
    font-weight: 100;
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
`;
export default function Footer() {
  return (
    <FooterStyleDiv>
      <div className="FooterStyleDiv-container">
        <div className="Footer-container-text">
          <p> Under Supervision of DR RAJEEB DEY</p>
          <p>Created by Vaishnavi , Nikita & Samyak</p>
        </div>
      </div>
    </FooterStyleDiv>
  );
}
