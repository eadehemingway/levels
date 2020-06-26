import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "../index.css"

import { colors } from "../colors"

export const PageTitle = ({ title }) => {
  return <Title>{title}</Title>
}

export const Title = styled.h1`
  color: ${colors.midGrey};
  font-family: Major Mono;
  font-size: 28px;
  border-bottom: 1px solid coral;
  width: fit-content;
  padding-bottom: 17px;
  margin-bottom: 0;
  margin-left: 20px;
  margin-top: 40px;
  @media only screen and (max-width: 500px) {
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 5px;
  }
`
