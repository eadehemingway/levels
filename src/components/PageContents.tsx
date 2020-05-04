import React from "react"
import { data } from "../data/data"
import * as d3 from "d3"

import styled from "styled-components"
import "../index.css"
import { LevelPage } from "../components/LevelPage"
import { ContinentPage } from "../components/ContinentPage"
import { PageTitle } from "./PageTitle"
import { svgWidth } from "../pages"

export const PageContents = ({
  activePage,
  levelOrContinent,
  continents,
  levels,
}) => {
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

  function calculateXScale(dataArr) {
    const values = dataArr.map(d => d.GDP[2017])
    return d3
      .scaleLinear()
      .domain([0, d3.max(values) * 3])
      .range([0, svgWidth])
  }

  const levelData = data.filter(d => getLevel(d.GDP[2017], activePage))
  const continentData = data.filter(d => d.continent === activePage)

  return (
    <Container>
      <PageTitle title={activePage} />
      <SvgWrapper>
        {levelOrContinent === "level" ? (
          <LevelPage
            continents={continents}
            levelData={levelData}
            calculateXScale={calculateXScale}
          />
        ) : (
          <ContinentPage
            getLevel={getLevel}
            continentData={continentData}
            levels={levels}
            calculateXScale={calculateXScale}
          />
        )}
      </SvgWrapper>
    </Container>
  )
}

const SvgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  padding-left: 140px;
  padding-right: 40px;
  @media only screen and (max-width: 1100px) {
    padding: 0;
    padding-left: 50px;
    padding-top: 20px;
  }
`
