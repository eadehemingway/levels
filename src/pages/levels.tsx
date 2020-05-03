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

  return (
    <Container>
      <Nav setActivePage={setActivePage} activePage={activePage} />
      <LevelPage
        continents={continents}
        levelData={levelData}
        allData={data}
        activePage={activePage}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

export default IndexPage
