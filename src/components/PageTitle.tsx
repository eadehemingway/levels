import React from "react"
import styled from "styled-components"
import "../index.css"

import { Title, svgWidth } from "../pages/levels"

export const PageTitle = ({ title }) => {
  return (
    <TitleWrapper>
      <div style={{ width: svgWidth }}>
        <Title>{title}</Title>
      </div>
      <div style={{ width: svgWidth }}></div>
    </TitleWrapper>
  )
}

const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
