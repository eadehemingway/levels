import React from "react"
import styled from "styled-components"
import "../index.css"
import { Barchart } from "../components/barchart"
import * as d3 from "d3"
import { colors } from "../colors"
import { Title, svgWidth } from "../pages/levels"
import { PageTitle } from "./PageTitle"

export const LevelPage = ({ continents, levelData, activePage }) => {
  function calculateXScale() {
    const levelDataVals = levelData.map(d => d.GDP[2017])
    return d3
      .scaleLinear()
      .domain([0, d3.max(levelDataVals) * 3])
      .range([0, svgWidth])
  }

  return (
    <Container>
      <PageTitle title={activePage} />
      <SvgWrapper>
        {continents.map((c, i) => {
          const data = levelData
            .filter(d => d.continent === c)
            .sort((a, b) => b.GDP[2017] - a.GDP[2017])

          return (
            <Barchart
              isLevelView={true}
              getXScale={calculateXScale}
              data={data}
              category={c}
              index={i}
              key={i}
            />
          )
        })}
      </SvgWrapper>
    </Container>
  )
}
const SvgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* border: 1px solid green; */
  justify-content: space-around;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`
