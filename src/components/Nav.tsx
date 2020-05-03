import React from "react"
import styled from "styled-components"
import { colors } from "../colors"

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
      <StickyWrapper>
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
      </StickyWrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100px;
  min-height: 100%;
  border: 1px solid coral;
`
const StickyWrapper = styled.div`
  width: 100px;
  min-height: 100vh;
  position: sticky;
  top: 0;
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
  color: ${colors.darkGrey};
  cursor: pointer;
  margin: 15px;
  text-align: center;
  ${({ isActive }) => {
    return isActive ? "background:  #f09c80; color:white;" : null
  }}
  &:hover {
    background: #fae0d8;
    color: white;
  }
`

const LevelWrapper = styled.div``
const ContinentWrapper = styled.div``
