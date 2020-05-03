import React from "react"
import styled from "styled-components"
import "../index.css"
import { Barchart } from "../components/barchart"
import * as d3 from "d3"

export const svgWidth = 420

export const LevelPage = ({ continents, levelData }) => {
  function calculateXScale() {
    const levelDataVals = levelData.map(d => d.GDP[2017])
    return d3
      .scaleLinear()
      .domain([0, d3.max(levelDataVals) * 3])
      .range([0, svgWidth])
  }

  return (
    <Container>
      {continents.map((c, i) => {
        const data = levelData
          .filter(d => d.continent === c)
          .sort((a, b) => b.GDP[2017] - a.GDP[2017])

        return (
          <Barchart
            getXScale={calculateXScale}
            data={data}
            category={c}
            index={i}
            key={i}
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
