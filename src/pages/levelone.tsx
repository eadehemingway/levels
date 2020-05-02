import React from "react"
import * as d3 from "d3"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"
import Barchart from "../components/barchart"

export const svgWidth = 420
export const svgHeight = 500
const IndexPage = () => {
  const levelOneData = data.filter(d => {
    return d.GDP[2017] < 4000
  })
  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "South America",
    "North America",
    "Oceania",
  ]

  const data2017Vals = data.map(d => d.GDP[2017])
  const levelOne = data2017Vals.filter(d => d < 4000)

  function calculateXScale() {
    return d3
      .scaleLinear()
      .domain([0, d3.max(levelOne) * 3])
      .range([0, svgWidth])
  }
  function calculateYScale() {
    return d3
      .scaleBand()
      .domain(d3.range(levelOne.length))
      .rangeRound([0, svgHeight])
      .paddingInner(0.6)
  }

  return (
    <Container>
      {continents.map((c, i) => {
        const data = levelOneData
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
