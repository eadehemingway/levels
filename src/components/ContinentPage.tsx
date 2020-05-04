import React from "react"
import styled from "styled-components"
import "../index.css"
import { Barchart } from "../components/barchart"
import * as d3 from "d3"
import { PageTitle } from "./PageTitle"

export const svgWidth = 420
export const svgHeight = 500

export const ContinentPage = ({
  continentData,
  levels,
  getLevel,
  activePage,
}) => {
  function calculateXScale() {
    const levelDataVals = continentData.map(d => d.GDP[2017])
    return d3
      .scaleLinear()
      .domain([0, d3.max(levelDataVals) * 3])
      .range([0, svgWidth])
  }

  return (
    <Container>
      <PageTitle title={activePage} />
      <SvgWrapper>
        {levels.map((level, i) => {
          const data = continentData
            .filter(d => getLevel(d.GDP[2017], level))
            .sort((a, b) => b.GDP[2017] - a.GDP[2017])

          return (
            <Barchart
              isLevelView={false}
              getXScale={calculateXScale}
              data={data}
              category={level}
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
