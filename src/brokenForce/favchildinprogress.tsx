import React from "react"
import * as d3 from "d3"
import styled from "styled-components"

export class ForceOne extends React.Component {
  svgWidth = 1000
  svgHeight = 500
  state = {
    data: [
      {
        name: "a",
        code: "one",
        xVal: {
          1: 200,
          2: 800,
        },
      },
    ],
    value: 1,
  }

  componentDidMount() {
    const { data, value } = this.state
    const svg = d3
      .select("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight)
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

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 10)
      // .attr('cy', 400)
      // .attr('cx', d=> d.xVal[value])
      .attr("class", "bubble")
      .attr("fill", "white")
      .attr("stroke", "coral")

    this.createSimulation()

    setTimeout(() => {
      this.setState({ value: value + 1 })
    }, 1000)

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.createSimulation()
  }

  // this takes a data point and works out which category it should be in
  centerOfGravityForDatum = d => {
    const { value } = this.state
    return d.xVal[value]
  }

  createSimulation = () => {
    const { data } = this.state

    const forceX = d3
      .forceX()
      .x(d => this.centerOfGravityForDatum(d))
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => 300)
      .strength(1)

    const sim = d3
      .forceSimulation(data)
      .force("collision", d3.forceCollide().radius(12))
      .force("x", forceX)
      .force("y", forceY)
      .alpha(0.1) // small alpha to have the elements move at a slower pace
      .on("tick", () => {
        // call the tick function running the simulation
        d3.selectAll(".bubble").attr(
          "transform",
          d => `translate(${d.x} ${d.y})`
        )
      })
    // sim.alpha(1).restart()
  }

  render() {
    return (
      <section className="page-excl-nav">
        <div className="force-directed-page">
          <svg></svg>
        </div>
      </section>
    )
  }
}

const StyledSelect = styled.select`
  padding: 20px;
  width: 200px;
  font-size: 20px;
  margin: 70px;
`


