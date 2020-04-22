import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Link } from "gatsby"

import styled from "styled-components"
import "../index.css"

const data = [
  {
    name: "test",
    code: "VNM",
    GDP: {
      "1990": 1452.87747911376,
      "1991": 1507.19172776076,
      "1992": 1603.9038221598,
      "1993": 1699.22215313303,
      "1994": 1815.27590521021,
      "1995": 1954.77675441082,
      "1996": 2104.50511173647,
      "1997": 2244.3108444328,
      "1998": 2343.44023905062,
      "1999": 2426.28247873729,
      "2000": 2562.10486507948,
      "2001": 2692.12509731393,
      "2002": 2833.77096342951,
      "2003": 3000.31115552546,
      "2004": 3196.29721493583,
      "2005": 3405.67919485849,
      "2006": 3609.68303701039,
      "2007": 3831.24321744876,
      "2008": 4009.95932073598,
      "2009": 34185.01979241841,
      "2010": 34408.16861192198,
      "2011": 34632.76596523658,
      "2012": 34821.13723082384,
      "2013": 35024.43890182073,
      "2014": 35264.82809971072,
      "2015": 35554.85805564661,
      "2016": 35837.62870356959,
      "2017": 36171.8841923362,
    },
  },
]
const IndexPage = () => {
  const [year, setYear] = useState(1990)
  const radius = 10

  useEffect(() => {
    if (year >= 2010) return
    let id = setTimeout(() => {
      setYear(year + 20)
    }, 1000)
    return () => clearTimeout(id)
  })

  useEffect(() => {
    drawLabels()
    drawCircles()
  }, [])

  useEffect(() => {
    createSimulation()
  }, [year])

  function createSimulation() {
    const forceX = d3
      .forceX()
      .x(d => findCenterOfGravity(d).x)
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => findCenterOfGravity(d).y)
      .strength(1)

    const simulation = d3
      .forceSimulation(data, d => d.code)
      .force("x", forceX)
      .force("y", forceY)
      .alpha(1)
      .on("tick", () => {
        d3.selectAll(`.circle`)
          .attr("cy", d => d.y)
          .attr("cx", d => {
            return d.x
          })
      })
    simulation.alpha(1).restart()
  }

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
        if (d.name === "test") {
          return "purple"
        }
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
