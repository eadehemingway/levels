import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Link } from "gatsby"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"

export const Force = () => {
  const [year, setYear] = useState(1990)

  const radius = 6

  useEffect(() => {
    if (year >= 2017) return
    let id = setTimeout(() => {
      setYear(year + 1)
    }, 700)
    return () => clearTimeout(id)
  })

  useEffect(() => {
    createSimulation()
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

    const collision = d3.forceCollide(radius * 2).strength(0.2)

    d3.forceSimulation(data, d => d.code)
      .force("collision", collision)
      .force("x", forceX)
      .force("y", forceY)
      .alpha(0.04) // small alpha to have the elements move at a slower pace
      .alphaDecay(0)
      .on("tick", () => {
        // console.log("tickin")
        // call the tick function running the simulation
        d3.selectAll(`.circle`)
          .attr("cy", d => d.y)
          .attr("cx", d => {
            return d.x
          })
      })
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

    if (!level) return { x: 0, y: -100 }
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
    const circles = svg.selectAll(`.circle`).data(data, d => d.code)
    circles
      .enter()
      .append("circle")
      .attr("r", radius)
      .attr("class", `circle`)
      .attr("stroke", "coral")
      .attr("stroke-width", 2)
      .attr("opacity", 1)
      .attr("fill", "white")
  }

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

  const yearsAdded = year - 1990
  const left = 7.4 * yearsAdded
  return (
    <div>
      <Text>
        <YearTitle>{year}</YearTitle>
        <PlayBar>
          <PlayHandle left={left} />
        </PlayBar>
      </Text>
      <StyledSVG />
    </div>
  )
}

const StyledSVG = styled.svg`
  width: 1000px;
  height: 700px;
`
const YearTitle = styled.h1`
  font-family: "Major Mono";
  font-size: 50px;
  text-align: right;
  margin-right: 50px;
  color: lightslategray;
`

const Text = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 50px;
  opacity: 0.5;
`
const PlayBar = styled.div`
  width: 200px;
  margin-top: 20px;
  height: 0;
  border-bottom: 2px solid lightslategray;
  text-align: right;
  margin-right: 50px;
  position: relative;
`

const PlayHandle = styled.div`
  height: 16px;
  width: 0;
  border-right: 7px solid lightslategray;
  position: absolute;
  left: ${({ left }) => left}px;

  top: -6px;
`

