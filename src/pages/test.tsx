import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Link } from "gatsby"

import styled from "styled-components"
import "../index.css"

const data = [
  {
    name: "a",
    code: "one",
    GDP: {
      "1990": 1452.87747911376,
      "2010": 34408.16861192198,
    },
  },
  // {
  //   name: "b",
  //   code: "two",
  //   GDP: {
  //     "1990": 1452.87747911376,
  //     "2010": 34408.16861192198,
  //   },
  // },
  // {
  //   name: "c",
  //   code: "three",
  //   GDP: {
  //     "1990": 1452.87747911376,
  //     "2010": 34408.16861192198,
  //   },
  // },
  // {
  //   name: "d",
  //   code: "four",
  //   GDP: {
  //     "1990": 1452.87747911376,
  //     "2010": 34408.16861192198,
  //   },
  // },
]
const IndexPage = () => {
  const [year, setYear] = useState(1990)

  const radius = 10

  function createSim() {
    const forceX = d3
      .forceX()
      .x(d => findCenterOfGravity(d).x)
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => findCenterOfGravity(d).y)
      .strength(1)

    const collision = d3.forceCollide(radius * 2).strength(0.2)

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

    simulation.alpha(1).restart()
  }
  function setTimeoutYear() {
    if (year >= 2010) return
    let id = setTimeout(() => {
      setYear(year + 20)
    }, 1000)
    return () => clearTimeout(id)
  }

  useEffect(() => {
    drawLabels()
    drawCircles()
    createSim()
    setTimeoutYear()
  }, [])

  useEffect(() => {
    // console.log(simulation)
    createSim()
    // simulation.alpha(1).restart()
  }, [year])

  function findCenterOfGravity(data) {
    const level = findLevel(data.GDP[year])

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

  function drawLabels() {
    const labels = [
      { text: "level one", x: 200, y: 100 },
      { text: "level four", x: 800, y: 100 },
    ]
    const labelSelection = d3.select("svg").selectAll("text").data(labels)
    labelSelection
      .enter()
      .append("text")
      .text(d => d.text)
      .attr("y", d => d.y)
      .attr("x", d => d.x)
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "lightslategray")
      .attr("font-family", "Major Mono")
  }

  return <StyledSVG />
}

const StyledSVG = styled.svg`
  width: 1000px;
  height: 700px;
`
export default IndexPage
