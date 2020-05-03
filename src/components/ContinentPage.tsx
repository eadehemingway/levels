import React from "react"
import styled from "styled-components"
import "../index.css"
import Barchart from "../components/barchart"
import * as d3 from "d3"

export const svgWidth = 420
export const svgHeight = 500

export const ContinentPage = ({ continentData, allData, levels, getLevel }) => {
  const levelOneData = allData.filter(d => d.GDP[2017] < 4000)
  const levelDataVals = continentData.map(d => d.GDP[2017])

  function calculateXScale() {
    return d3
      .scaleLinear()
      .domain([0, d3.max(levelDataVals) * 3])
      .range([0, svgWidth])
  }
  function calculateYScale() {
    const rangeArr = levelOneData.length - 8 // todo make this not a magic number...

    return d3
      .scaleBand()
      .domain(d3.range(rangeArr)) // using levelone data because it is the one with the most amount of countries in one continent category
      .rangeRound([0, svgHeight])
      .paddingInner(0.6)
  }

  return (
    <Container>
      {levels.map((level, i) => {
        const data = continentData
          .filter(d => getLevel(d.GDP[2017], level))
          .sort((a, b) => b.GDP[2017] - a.GDP[2017])

        return (
          <Barchart
            getXScale={calculateXScale}
            getYScale={calculateYScale}
            data={data}
            category={level}
            index={i}
            key={i}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`
