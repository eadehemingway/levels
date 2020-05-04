import React, { useState } from "react"
import * as d3 from "d3"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"
import Nav from "../components/Nav"
import { LevelPage } from "../components/LevelPage"
import { ContinentPage } from "../components/ContinentPage"
import { colors } from "../colors"
import { Footer } from "../components/Footer"

export const svgWidth = window.innerWidth < 500 ? 270 : 420

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
      <Column>
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
        <Footer />
      </Column>
    </Container>
  )
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
`
const Container = styled.div`
  display: flex;
  max-width: 100%;
  position: relative;
`
const PageContents = styled.div`
  padding: 20px 70px;
  display: flex;
  height: fit-content;
  overflow: scroll;
  @media only screen and (max-width: 1100px) {
    padding-left: 70px;
    padding-right: 30px;
  }
`

export default IndexPage
