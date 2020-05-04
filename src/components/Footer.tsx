import React from "react"
import { colors } from "../colors"
import styled from "styled-components"

export const Footer = () => (
  <P>
    data from the world bank from the year 2017. it refers to GDP per capita PPP
  </P>
)
export const P = styled.p`
  color: ${colors.midGrey};
  font-family: Major Mono;
  font-size: 10px;
  border-top: 1px solid ${colors.midGrey};
  max-width: 100%;
  padding: 5px 10px;
  text-align: right;

  @media only screen and (max-width: 500px) {
    height: 20px;
    padding: 5px 30px;
    width: calc(100vw - 60px);
  }
`
