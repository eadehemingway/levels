import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Link } from "gatsby"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"

const IndexPage = () => {
  useEffect(() => {
    const radius = 6

    const collision = d3.forceCollide(radius * 2).strength(0.8)
    interface dataWithCoordinates {
      x: number
      y: number
    }

    function findLevel(GDP: number) {
      switch (true) {
        case GDP < 2300:
          return "levelOne"
        case GDP < 8000:
          return "levelTwo"
        case GDP < 21000:
          return "levelThree"
        case GDP > 21000:
          return "levelFour"
      }
    }

    function findCenterOfGravity(data) {
      const level = findLevel(data.GDP[2011])

      const centersOfGravity = {
        levelOne: {
          x: 200,
          y: 300,
        },
        levelTwo: {
          x: 400,
          y: 300,
        },
        levelThree: {
          x: 600,
          y: 300,
        },
        levelFour: {
          x: 800,
          y: 300,
        },
      }
      return centersOfGravity[level]
    }

    const position = "pos-one"

    const forceX = d3
      .forceX()
      .x(d => findCenterOfGravity(d).x)
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => findCenterOfGravity(d).y)
      .strength(1)

    d3.forceSimulation(data)
      .force("collision", collision)
      .force("x", forceX)
      .force("y", forceY)
      .on("tick", () => {
        // call the tick function running the simulation
        d3.selectAll(`.circle-${position}`)
          .attr("cy", (d: dataWithCoordinates) => d.y)
          .attr("cx", (d: dataWithCoordinates) => d.x)
      })

    const svg = d3.select(`svg`).attr("width", 1000).attr("height", 600)

    const circles = svg.selectAll(`.circle-${position}`).data(data)
    circles
      .enter()
      .append("circle")
      .attr("r", radius)
      .attr("class", `circle-${position}`)
      .attr("stroke", "coral")
      .attr("stroke-width", 2)
      .attr("opacity", 1)
      .attr("fill", "white")

    drawLabels()
  }, [])

  function drawLabels() {
    const labels = [
      { text: "level one", x: 200, y: 100 },
      { text: "level two", x: 400, y: 100 },
      { text: "level three", x: 600, y: 100 },
      { text: "level four", x: 800, y: 100 },
    ]

    const labelSelection = d3.select("svg").selectAll("text").data(labels)

    labelSelection
      .enter()
      .append("text")
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .text(d => d.text)
      .attr("x", d => d.x)
      .attr("fill", "lightslategray")
      .attr("font-family", "Major Mono")
      .attr("y", d => d.y)
  }

  return (
    <div>
      <svg />
    </div>
  )
}

const StyledTitle = styled.h1`
  font-family: "Major Mono";
`
export default IndexPage
