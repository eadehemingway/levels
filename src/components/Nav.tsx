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
  height: 100vh;
  top: 0;
  border: 1px solid coral;
  position: fixed;
  @media only screen and (max-width: 768px) {
    width: 50px;
  }
`
const StickyWrapper = styled.div`
  width: 100px;
  min-height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    width: 60px;
  }
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
  @media only screen and (max-width: 768px) {
    padding: 3px;
    font-size: 14px;
    margin: 6px 3px;
    width: 36px;
  }
`

const LevelWrapper = styled.div``
const ContinentWrapper = styled.div``
