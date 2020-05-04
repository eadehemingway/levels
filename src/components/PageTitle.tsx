import React from "react"
import styled from "styled-components"
import "../index.css"

import { svgWidth } from "../pages/index"
import { colors } from "../colors"

export const PageTitle = ({ title }) => {
  const isDesktop = window.innerWidth > 1100
  if (isDesktop) {
    return (
      <TitleWrapper>
        <div style={{ width: svgWidth }}>
          <Title>{title}</Title>
        </div>
        <div style={{ width: svgWidth }}></div>
      </TitleWrapper>
    )
  }
  return (
    <TitleWrapper>
      <Title>{title}</Title>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
  @media only screen and (max-width: 1100px) {
  }
  @media only screen and (max-width: 500px) {
    justify-content: center;
    width: fit-content;
  }
`

export const Title = styled.h1`
  color: ${colors.midGrey};
  font-family: Major Mono;
  font-size: 28px;
  border-bottom: 1px solid coral;
  width: fit-content;
  padding-bottom: 17px;
  margin-bottom: 26px;
  @media only screen and (max-width: 1100px) {
  }
  @media only screen and (max-width: 500px) {
  }
`
