import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import "../index.css"
import { svgWidth, svgHeight } from "./LevelPage"

const Barchart = ({ data, getXScale, getYScale, continent, index }) => {
  if (data.length === 0) return null

  const xScale = getXScale()
  const yScale = getYScale()
  const topPadding = 70
  const sidePadding = 50

  useEffect(() => {
    const svg = d3
      .select(`#svg-${index}`)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
    drawGraph()
    drawTitle(svg)
  }, [])

  useEffect(() => {
    drawGraph()
  }, [data])

  function drawGraph() {
    const svg = d3.select(`#svg-${index}`)
    const groups = svg.selectAll(`.rect-group`).data(data, d => d.code)

    const enteringGroups = groups
      .enter()
      .append("g")
      .attr("class", `rect-group`)

    drawRects(svg, groups, enteringGroups)
    drawLabels(svg, groups, enteringGroups)
    onmouseover(svg, groups, enteringGroups)

    groups.exit().remove()
  }
  function onmouseover(svg, groups, enteringGroups) {
    const tooltipGroup = svg
      .append("g")
      .attr("class", "tooltip")
      .attr("visibility", "hidden")

    tooltipGroup
      .append("rect")
      .attr("width", 370)
      .attr("height", 25)
      .attr("fill", "white")
    // .attr("stroke", "black")
    // .attr("stroke-width", 1)

    tooltipGroup
      .append("rect")
      .attr("class", "tooltip-bar")
      .attr("width", 0)
      .attr("height", 10)
      .attr("fill", "white")
      .attr("stroke", "coral")
      .attr("stroke-width", 1)
      .attr("transform", "translate(0, 7)")

    tooltipGroup
      .append("text")
      .text("")
      .attr("fill", "black")
      .style("z-index", "100")
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .attr("dx", "350")
      .attr("dy", "16")
      .attr("font-family", "Major Mono")

    const allGroups = groups
      .merge(enteringGroups)
      .on("mouseover", function (d, i) {
        tooltipGroup.style("visibility", "visible")
        const gdpRounded = Math.round(d.GDP[2017])
        const label = `${d.name}: $${gdpRounded}`
        tooltipGroup.select("text").text(label)
        tooltipGroup
          .select(".tooltip-bar")
          .attr("width", () => xScale(d.GDP[2017]) * 1.2)
        tooltipGroup.attr(
          "transform",
          `translate(${sidePadding - 7},${getYValue(i) - 15})`
        )
      })
      .on("mouseout", function () {
        tooltipGroup.style("visibility", "hidden")
      })

    tooltipGroup
      .on("mouseover", function (d, i) {
        tooltipGroup.style("visibility", "visible")
      })
      .on("mouseout", function () {
        tooltipGroup.style("visibility", "hidden")
      })
  }
  function drawRects(svg, groups, enteringGroups) {
    const enteringRects = enteringGroups
      .append("rect")
      .attr("class", `rect`)
      .attr("x", sidePadding)
      .attr("stroke", "coral")
      .attr("stroke-width", 1)
      .attr("opacity", 1)
      .attr("fill", "transparent")
      .attr("y", (d, i) => getYValue(i))
      .attr("height", (d, i) => yScale.bandwidth())

    const rects = svg.selectAll(".rect")
    const allRects = rects.merge(enteringRects)

    allRects
      .transition()
      .delay(500)
      .duration(500)
      .attr("width", d => xScale(d.GDP[2017]))

    groups
      .exit()
      .selectAll("rect")
      .transition()
      .duration(500)
      .attr("width", 0)
      .remove()
  }
  function drawLabels(svg, groups, enteringGroups) {
    const enteringLabels = enteringGroups
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

    const labels = svg.selectAll(".labels")
    const allLabels = labels.merge(enteringLabels)

    allLabels
      .transition()
      .delay(400)
      .duration(200)
      .text(d => d.name)
      .attr("opacity", 1)

    groups
      .exit()
      .selectAll(".labels")
      .transition()
      .duration(400)
      .attr("opacity", 0)
      .remove()
  }

  function getYValue(i) {
    return yScale(i) + yScale.bandwidth() / 2 + topPadding
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
  return <StyledSVG id={`svg-${index}`} />
}

const StyledSVG = styled.svg``

export default Barchart