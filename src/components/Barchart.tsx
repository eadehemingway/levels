import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import "../index.css"
import { svgWidth } from "./LevelPage"
import { colors } from "../colors"

export const Barchart = ({ data, getXScale, category, index, isLevelView }) => {
  if (isLevelView && data.length === 0) return null

  const xScale = getXScale()
  const topPadding = 70
  const sidePadding = 50
  const rectHeight = 4
  const graphWidth = svgWidth - sidePadding

  useEffect(() => {
    drawGraph()
    drawTitle()
  }, [])

  useEffect(() => {
    drawGraph()
  }, [data])

  function drawGraph() {
    const svg = d3
      .select(`#svg-${index}`)
      .attr("width", svgWidth)
      .attr("height", getSvgHeight())

    const groups = svg.selectAll(`.rect-group`).data(data, d => d.code)

    const enteringGroups = groups
      .enter()
      .append("g")
      .attr("class", `rect-group`)

    drawRects(svg, groups, enteringGroups)
    drawLabels(svg, groups, enteringGroups)
    drawInitialTooltip()
    addTooltipFunctionality(svg, groups, enteringGroups)

    groups.exit().remove()
  }

  function drawInitialTooltip() {
    const svg = d3.select(`#svg-${index}`)
    const tooltipGroup = svg
      .append("g")
      .attr("class", "tooltip")
      .attr("visibility", "hidden")

    const tooltipHeight = 25

    tooltipGroup
      .append("rect")
      .attr("width", graphWidth)
      .attr("height", tooltipHeight)
      .attr("fill", "white")
    // .attr("stroke", "lightslategrey")
    // .attr("stroke-width", 1)

    const tooltipBarHeight = 10
    const yOffset = (tooltipHeight - tooltipBarHeight) / 2
    const tooltipBar = tooltipGroup
      .append("rect")
      .attr("class", "tooltip-bar")
      .attr("width", 0)
      .attr("height", tooltipBarHeight)
      .attr("fill", "white")
      .attr("stroke", "coral")
      .attr("stroke-width", 1)
      .attr("transform", `translate(0, ${yOffset})`)

    const textBackground = tooltipGroup
      .append("rect")
      .attr("class", "text-background")
      .attr("width", 0)
      .attr("height", tooltipHeight)
      .attr("fill", "white")
    // .attr("stroke", "black")
    // .attr("stroke-width", 1)
    // .attr("transform", `translate(${graphWidth}, ${yOffset})`)

    const tooltipText = tooltipGroup
      .append("text")
      .attr("class", "tooltip-text")
      .attr("fill", colors.darkGrey)
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .attr("dominant-baseline", "hanging")
      .attr("dx", graphWidth)
      .attr("dy", yOffset)
      .attr("font-family", "Major Mono")
  }

  function addTooltipFunctionality(svg, groups, enteringGroups) {
    const tooltipGroup = svg.selectAll(".tooltip")
    const textBackground = svg.selectAll(".text-background")
    const tooltipText = svg.selectAll(".tooltip-text")
    const tooltipBar = svg.selectAll(".tooltip-bar")

    const allGroups = groups.merge(enteringGroups)

    allGroups
      .on("mouseover", function (d, i) {
        tooltipGroup
          .attr(
            "transform",
            `translate(${sidePadding - 3},${getYValue(i) - 10})`
          )
          .style("visibility", "visible")

        const gdpRounded = Math.round(d.GDP[2017])
        const label = `${d.name}: $${gdpRounded}`
        tooltipText.text(label).attr("cursor", "default")

        tooltipBar.attr("width", () => xScale(d.GDP[2017]) * 1.2)

        const textBackgroundWidth = label.length * 10.5

        textBackground
          .attr("width", textBackgroundWidth)
          .attr(
            "transform",
            `translate(${graphWidth - textBackgroundWidth}, 0)`
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
      .attr("height", rectHeight)

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
      .style("font-size", "10")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "hanging")
      .attr("fill", colors.darkGrey)
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

  const barpadding = 8
  function getYValue(i) {
    const position = (barpadding + rectHeight) * i
    const yVal = position + topPadding + 20
    return yVal
  }
  function getSvgHeight() {
    const rectHeights = data.length * (barpadding + rectHeight)
    const minHeight = 200
    const svgHeight = d3.max([rectHeights + topPadding + 50, minHeight])
    return svgHeight
  }

  function drawTitle() {
    const svg = d3.select(`#svg-${index}`)

    svg
      .append("text")
      .text(category)
      .attr("y", 60)
      .attr("x", sidePadding)
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("fill", colors.darkGrey)
      .attr("font-family", "Major Mono")
  }
  return <StyledSVG id={`svg-${index}`} />
}

const StyledSVG = styled.svg`
  /* border: 2px solid lavender; */
`
