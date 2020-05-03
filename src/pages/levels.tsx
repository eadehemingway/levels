import React, { useState } from "react"
import * as d3 from "d3"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"
import Nav from "../components/Nav"
import { LevelPage } from "../components/LevelPage"
import { ContinentPage } from "../components/ContinentPage"

export const svgWidth = 420
export const svgHeight = 500

const IndexPage = () => {
  const [activePage, setActivePage] = useState("Level One")
  const [levelOrContinent, setLevelOrContinent] = useState("level")

  function getLevel(val, level) {
    switch (level) {
      case "Level One":
        return val < 2800
      case "Level Two":
        return val > 2800 && val < 8000
      case "Level Three":
        return val > 8000 && val < 25000
      case "Level Four":
        return val > 25000
    }
  }

  const levelData = data.filter(d => getLevel(d.GDP[2017], activePage))
  const continentData = data.filter(d => d.continent === activePage)

  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "South America",
    "North America",
    "Oceania",
  ]
  const levels = ["Level One", "Level Two", "Level Three", "Level Four"]

  return (
    <Container>
      <Nav
        setActivePage={setActivePage}
        activePage={activePage}
        continents={continents}
        setLevelOrContinent={setLevelOrContinent}
        levels={levels}
      />
      {levelOrContinent === "level" ? (
        <LevelPage
          continents={continents}
          levelData={levelData}
          allData={data}
        />
      ) : (
        <ContinentPage
          getLevel={getLevel}
          continentData={continentData}
          allData={data}
          levels={levels}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`

export default IndexPage
