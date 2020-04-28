import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Link } from "gatsby"

import styled from "styled-components"
import "../index.css"

const data = [
  {
    name: "a",
    code: "one",
    xVal: {
      1: 200,
      2: 800,
    },
  },
]

const forceX = d3
  .forceX()
  .x(d => {
    return d.xVal[1]
  })
  .strength(1)

const forceY = d3
  .forceY()
  .y(d => 300)
  .strength(1)

const collision = d3.forceCollide(10 * 2).strength(0.2)

const simulation = d3
  .forceSimulation(data, d => d.code)
  .force("collision", collision)
  .force("x", forceX)
  .force("y", forceY)

simulation.on("tick", () => {
  d3.selectAll(`.circle`)
    .attr("cy", d => d.y)
    .attr("cx", d => {
      return d.x
    })
})
const IndexPage = () => {
  const [number, setNumber] = useState(1)
  const radius = 10

  function createSim() {
    simulation.alpha(1).restart()
  }
  function setTimeoutYear() {
    if (number >= 2) return
    let id = setTimeout(() => {
      setNumber(number + 1)
    }, 1000)
    return () => clearTimeout(id)
  }

  useEffect(() => {
    drawCircles()
    setTimeoutYear()
  }, [])

  useEffect(() => {
    createSim()
  }, [number])

  function drawCircles() {
    const svg = d3.select("svg")
    svg
      .append("line")
      .attr("x1", 800)
      .attr("x2", 800)
      .attr("y1", 0)
      .attr("y2", 800)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
    svg
      .append("line")
      .attr("x1", 200)
      .attr("x2", 200)
      .attr("y1", 0)
      .attr("y2", 800)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
    const circles = svg.selectAll(`.circle`).data(data, d => d.code)
    circles
      .enter()
      .append("circle")
      .attr("r", radius)
      .attr("class", `circle`)
      .attr("stroke", "coral")
      .attr("stroke-width", 2)
      .attr("opacity", 1)
      .attr("fill", d => {
        if (d.name === "a") {
          return "purple"
        }
        return "white"
      })
  }

  return <StyledSVG />
}

const StyledSVG = styled.svg`
  width: 1000px;
  height: 700px;
`
export default IndexPage
