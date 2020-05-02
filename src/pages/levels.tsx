import React, { useState } from "react"
import * as d3 from "d3"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"
import Nav from "../components/Nav"
import { LevelPage } from "../components/LevelPage"

export const svgWidth = 420
export const svgHeight = 500
const IndexPage = () => {
  const [activePage, setActivePage] = useState("levelone")

  const levelData = data.filter(d => {
    switch (activePage) {
      case "levelone":
        return d.GDP[2017] < 4000
      case "leveltwo":
        return d.GDP[2017] > 4000 && d.GDP[2017] < 16000
      case "levelthree":
        return d.GDP[2017] > 16000 && d.GDP[2017] < 32000
      case "levelfour":
        return d.GDP[2017] > 32000
    }
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
  console.log("data2017Vals:", d3.max(data2017Vals))

  function calculateXScale() {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data2017Vals)])
      .range([0, svgWidth])
  }
  function calculateYScale() {
    return d3
      .scaleBand()
      .domain(d3.range(data2017Vals.length))
      .rangeRound([0, svgHeight])
      .paddingInner(0.6)
  }

  return (
    <Container>
      <Nav setActivePage={setActivePage} />
      <LevelPage
        calculateXScale={calculateXScale}
        calculateYScale={calculateYScale}
        continents={continents}
        levelData={levelData}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

export default IndexPage
