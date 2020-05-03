import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

export default function Nav({
  setActivePage,
  activePage,
  continents,
  setLevelOrContinent,
  levels,
}) {
  function nav(endpoint, levelOrContinent) {
    setLevelOrContinent(levelOrContinent)
    setActivePage(endpoint)
  }

  const continentDics = {
    Africa: "AF",
    Asia: "AS",
    Europe: "EU",
    "South America": "SA",
    "North America": "NA",
    Oceania: "OC",
  }
  return (
    <Container>
      <LevelWrapper>
        {levels.map((l, i) => {
          const isActive = activePage === l
          return (
            <Tab key={i} onClick={() => nav(l, "level")} isActive={isActive}>
              {i + 1}
            </Tab>
          )
        })}
      </LevelWrapper>
      <ContinentWrapper>
        {continents.map((c, i) => {
          const isActive = activePage === c
          return (
            <Tab
              key={i}
              onClick={() => nav(c, "continent")}
              isActive={isActive}
            >
              {continentDics[c]}
            </Tab>
          )
        })}
      </ContinentWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100px;
  height: 100vh;
  border: 1px solid coral;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const Tab = styled.p`
  border: 1px solid coral;
  padding: 15px;
  font-size: 20px;
  font-weight: 1000;
  font-family: Major Mono;
  cursor: pointer;
  margin: 15px;
  text-align: center;
  ${({ isActive }) => {
    return isActive ? "background: #ff9999; color:white;" : null
  }}
`

const LevelWrapper = styled.div``
const ContinentWrapper = styled.div``
