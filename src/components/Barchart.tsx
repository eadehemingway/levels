import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import styled from "styled-components"
import "../index.css"

import { colors } from "../colors"

export const Barchart = ({
  data,
  getXScale,
  category,
  index,
  isLevelView,
  svgWidth,
}) => {
  if (isLevelView && data.length === 0) return null

  const xScale = getXScale(data)
  const topPadding = 70
  const transition = 500
  const rectHeight = 4

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

    groups.exit().transition().delay(transition).remove()
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
      .attr("width", svgWidth)
      .attr("height", tooltipHeight)
      .attr("fill", "white")

    const tooltipBarHeight = 10
    const yOffset = (tooltipHeight - tooltipBarHeight) / 2
    tooltipGroup
      .append("rect")
      .attr("class", "tooltip-bar")
      .attr("width", 0)
      .attr("height", tooltipBarHeight)
      .attr("fill", "white")
      .attr("stroke", "coral")
      .attr("stroke-width", 1)
      .attr("transform", `translate(0, ${yOffset})`)

    tooltipGroup
      .append("rect")
      .attr("class", "text-background")
      .attr("width", 0)
      .attr("height", tooltipHeight)
      .attr("fill", "white")

    tooltipGroup
      .append("text")
      .attr("class", "tooltip-text")
      .attr("fill", colors.darkGrey)
      .attr("text-anchor", "end")
      .style("font-size", "14px")
      .attr("dominant-baseline", "hanging")
      .attr("dx", svgWidth)
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
          .attr("transform", `translate(${-3},${getYValue(i) - 10})`)
          .style("visibility", "visible")

        const gdpRounded = Math.round(d.GDP[2017])
        const label = `${d.name}: $${gdpRounded}`
        tooltipText.text(label).attr("cursor", "default")

        tooltipBar.attr("width", () => xScale(d.GDP[2017]) * 1.2)

        const textBackgroundWidth = label.length * 10.5

        textBackground
          .attr("width", textBackgroundWidth)
          .attr("transform", `translate(${svgWidth - textBackgroundWidth}, 0)`)
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
      .attr("x", 0)
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
      .delay(transition)
      .duration(transition)
      .attr("width", d => xScale(d.GDP[2017]))

    groups
      .exit()
      .selectAll("rect")
      .transition()
      .duration(transition)
      .attr("width", 0)
      .remove()
  }
  function drawLabels(svg, groups, enteringGroups) {
    const enteringLabels = enteringGroups
      .append("text")
      .attr("y", (d, i) => getYValue(i))
      .attr("class", "labels")
      .style("font-size", "10")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "end")
      .attr("dominant-baseline", "hanging")
      .attr("fill", colors.darkGrey)
      .attr("font-family", "Major Mono")
      .attr("x", svgWidth)

    const labels = svg.selectAll(".labels")
    const allLabels = labels.merge(enteringLabels)

    labels.attr("x", svgWidth)

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

    const title = svg
      .append("text")
      .text(category)
      .attr("y", 60)
      .attr("x", 0)
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("fill", colors.darkGrey)
      .attr("font-family", "Major Mono")
      .attr("cursor", "default")

    if (!isLevelView) {
      const tooltipGroup = svg
        .append("g")
        .attr("class", "title-tooltip")
        .attr("visibility", "hidden")
      tooltipGroup
        .append("rect")
        .attr("width", 300)
        .attr("height", 50)
        .attr("fill", "white")
        .attr("stroke", "coral")
        .attr("stroke-width", 1)

      tooltipGroup
        .append("text")
        .text(() => getTitleTooltipText()[0])
        .attr("fill", colors.darkGrey)
        .attr("font-family", "Major Mono")
        .attr("font-size", 12)
        .attr("dx", 20)
        .attr("dy", 20)
      tooltipGroup
        .append("text")
        .text(() => getTitleTooltipText()[1])
        .attr("fill", colors.darkGrey)
        .attr("font-family", "Major Mono")
        .attr("font-size", 12)
        .attr("dx", 20)
        .attr("dy", 40)

      title
        .on("mouseover", d => {
          tooltipGroup
            .attr("visibility", "visible")
            .attr("transform", `translate(${0},${-10})`)
        })
        .on("mouseout", () => tooltipGroup.attr("visibility", "hidden"))
    }
  }
  function getTitleTooltipText() {
    switch (category) {
      case "Level One":
        return ["gdp ppp is less than $2800"]
      case "Level Two":
        return ["gdp ppp is greater than $2800", " but less than $8000"]
      case "Level Three":
        return ["gdp ppp is greater than $8000,", "but less than $25,000"]
      case "Level Four":
        return ["gdp ppp is greater than $25,000"]
    }
  }

  return <StyledSVG id={`svg-${index}`} />
}

const StyledSVG = styled.svg`
  overflow: visible;
  margin: 30px 50px;
  @media only screen and (max-width: 500px) {
    margin: 0;
  }
`
