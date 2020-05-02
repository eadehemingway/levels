import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import "../index.css"
import { svgHeight, svgWidth } from "../pages/levelone"

const Barchart = ({ data, getXScale, getYScale, continent, level }) => {
  if (data.length === 0) return null

  const xScale = getXScale()
  const yScale = getYScale()
  const topPadding = 70
  const sidePadding = 50

  useEffect(() => {
    const svg = d3
      .select(`#svg-${level}`)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
    drawRect(svg)
    drawTitle(svg)
    drawLables(svg)
  }, [])

  function getYValue(i) {
    return yScale(i) + yScale.bandwidth() / 2 + topPadding
  }

  function drawRect(svg) {
    const groups = svg.selectAll(`g`).data(data).enter().append("g")

    groups
      .append("rect")
      .attr("width", d => xScale(d.GDP[2017]))
      .attr("height", (d, i) => yScale.bandwidth())
      .attr("class", `rect`)
      .attr("x", sidePadding)
      .attr("y", (d, i) => getYValue(i))
      .attr("stroke", "coral")
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .attr("fill", "transparent")
  }
  function drawTitle(svg) {
    svg
      .append("text")
      .text(continent)
      .attr("y", 60)
      .attr("x", sidePadding)
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("fill", "black")
      .attr("font-family", "Major Mono")
  }

  function drawLables(svg) {
    svg
      .selectAll(`g`)
      .append("text")
      .text(d => d.name)
      .attr("x", svgWidth - sidePadding)
      .attr("class", "labels")
      .attr("y", (d, i) => getYValue(i))
      .style("font-size", "8")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "hanging")
      .attr("fill", "black")
      .attr("font-family", "Major Mono")
  }
  return <StyledSVG id={`svg-${level}`} />
}

const StyledSVG = styled.svg``

export default Barchart
