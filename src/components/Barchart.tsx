import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import "../index.css"
import { svgWidth, svgHeight } from "./LevelPage"

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
  useEffect(() => {
    const svg = d3.select(`#svg-${level}`)
    drawRect(svg)
    drawLables(svg)
  }, [data])

  function getYValue(i) {
    return yScale(i) + yScale.bandwidth() / 2 + topPadding
  }

  function drawRect(svg) {
    const rects = svg.selectAll(`rect`).data(data, d => d.code)

    const enteringRects = rects
      .enter()
      .append("rect")
      .attr("class", `rect`)
      .attr("x", sidePadding)
      .attr("stroke", "coral")
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .attr("fill", "transparent")

    const mergedLabelSelection = rects.merge(enteringRects)

    mergedLabelSelection
      .transition()
      .duration(1000)
      .attr("width", d => xScale(d.GDP[2017]))
      .attr("height", (d, i) => yScale.bandwidth())
      .attr("y", (d, i) => getYValue(i))

    rects.exit().transition().remove()
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
    const labels = svg.selectAll(`.labels`).data(data, d => d.code)

    const enteringLabels = labels
      .enter()
      .append("text")
      .attr("x", svgWidth - sidePadding)
      .attr("y", (d, i) => getYValue(i))
      .attr("class", "labels")
      .style("font-size", "8")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "hanging")
      .attr("fill", "black")
      .attr("font-family", "Major Mono")

    const mergedLabelSelection = labels.merge(enteringLabels)

    mergedLabelSelection
      .transition()
      .duration(1000)
      .text(d => d.name)
      .attr("y", (d, i) => getYValue(i))

    labels.exit().transition().remove()
  }
  return <StyledSVG id={`svg-${level}`} />
}

const StyledSVG = styled.svg``

export default Barchart
