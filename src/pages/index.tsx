import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "../index.css"
import Nav from "../components/Nav"
import { Footer } from "../components/Footer"
import { PageContents } from "../components/PageContents"
import { desktopSvgWidth, mobileSvgWidth } from "../components/sharedVariables"

const IndexPage = () => {
  const [activePage, setActivePage] = useState("Level One")
  const [levelOrContinent, setLevelOrContinent] = useState("level")
  const [svgWidth, setSvgWidth] = useState(desktopSvgWidth)

  useEffect(() => {
    setSvgWidth(window.innerWidth > 800 ? desktopSvgWidth : mobileSvgWidth)
  }, [])

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

      <PageContents
        activePage={activePage}
        levelOrContinent={levelOrContinent}
        continents={continents}
        levels={levels}
        svgWidth={svgWidth}
      />
      <Footer />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

export default IndexPage
