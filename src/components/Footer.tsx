import React from "react"
import { colors } from "../colors"
import styled from "styled-components"

export const Footer = () => (
  <Container>
    <P>
      data from the world bank from the year 2017. it refers to GDP per capita
      PPP
    </P>
  </Container>
)
export const P = styled.p`
  color: ${colors.midGrey};
  font-family: Major Mono;
  font-size: 10px;
  padding: 5px 10px;
  text-align: right;
  @media only screen and (max-width: 500px) {
    padding: 5px 30px;
    width: calc(100vw - 60px);
  }
`
const Container = styled.div`
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
  background: white;
  padding-left: 60px;
  position: fixed;
  bottom: 0;
  width: calc(100vw - 100px);
  right: 0;
  @media only screen and (max-width: 500px) {
    max-width: calc(100vw - 60px);
  }
`
