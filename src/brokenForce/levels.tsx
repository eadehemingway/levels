import React, { useState } from "react"
import * as d3 from "d3"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"
import Nav from "../components/Nav"
import { LevelPage } from "../components/LevelPage"
import { ContinentPage } from "../components/ContinentPage"
import { colors } from "../colors"

export const svgWidth = 420

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
      <PageContents>
        {levelOrContinent === "level" ? (
          <LevelPage
            continents={continents}
            levelData={levelData}
            activePage={activePage}
          />
        ) : (
          <ContinentPage
            getLevel={getLevel}
            continentData={continentData}
            levels={levels}
            activePage={activePage}
          />
        )}
      </PageContents>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
`
const PageContents = styled.div`
  padding: 20px 70px;
  display: flex;
  height: fit-content;
`

export const Title = styled.h1`
  color: ${colors.midGrey};
  font-family: Major Mono;
  font-size: 28px;
  margin-bottom: 26px;
  border-bottom: 1px solid coral;
  width: fit-content;
  padding-bottom: 17px;
`

export default IndexPage
