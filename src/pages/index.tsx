import React, { useState } from "react"
import styled from "styled-components"
import "../index.css"
import Nav from "../components/Nav"
import { Footer } from "../components/Footer"
import { PageContents } from "../components/PageContents"

export const svgWidth = 300

const IndexPage = () => {
  const [activePage, setActivePage] = useState("Level One")
  const [levelOrContinent, setLevelOrContinent] = useState("level")

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
        <PageContents
          activePage={activePage}
          levelOrContinent={levelOrContinent}
          continents={continents}
          levels={levels}
        />
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

export default IndexPage
