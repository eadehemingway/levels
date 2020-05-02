import React from "react"
import * as d3 from "d3"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"
import Barchart from "../components/barchart"

export const svgWidth = 420
export const svgHeight = 500
const IndexPage = () => {
  const levelFourData = data.filter(d => {
    return d.GDP[2017] > 32000
  })

  const data2017Vals = data.map(d => d.GDP[2017])
  const levelFour = data2017Vals.filter(d => d > 32000)

  function calculateXScale() {
    return d3
      .scaleLinear()
      .domain([0, d3.max(levelFour) * 3])
      .range([0, svgWidth])
  }
  function calculateYScale() {
    return d3
      .scaleBand()
      .domain(d3.range(levelFour.length))
      .rangeRound([0, svgHeight])
      .paddingInner(0.6)
  }
  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "South America",
    "North America",
    "Oceania",
  ]
  return (
    <Container>
      {continents.map((c, i) => {
        const data = levelFourData
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

export default IndexPage
