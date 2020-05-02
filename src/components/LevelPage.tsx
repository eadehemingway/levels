import React from "react"
import styled from "styled-components"
import "../index.css"
import Barchart from "../components/barchart"

export const svgWidth = 420
export const svgHeight = 500
export const LevelPage = ({
  continents,
  calculateXScale,
  calculateYScale,
  levelData,
}) => {
  return (
    <Container>
      {continents.map((c, i) => {
        const data = levelData
          .filter(d => d.continent === c)
          .sort((a, b) => b.GDP[2017] - a.GDP[2017])

        return (
          <Barchart
            getXScale={calculateXScale}
            getYScale={calculateYScale}
            data={data}
            continent={c}
            level={i}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
