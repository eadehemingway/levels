import React from "react"
import * as d3 from "d3"
import styled from "styled-components"

export class ForceOne extends React.Component {
  svgWidth = 1000
  svgHeight = 500
  state = {
    data: [
      {
        x: 200,
        y:300
      },
    ]
  }


  componentDidMount() {
    const { data } = this.state
    this.svg = d3
      .select("svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight)
    this.svg
      .append("line")
      .attr("x1", 800)
      .attr("x2", 800)
      .attr("y1", 0)
      .attr("y2", 800)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
    this.svg
      .append("line")
      .attr("x1", 200)
      .attr("x2", 200)
      .attr("y1", 0)
      .attr("y2", 800)
      .attr("stroke", "black")
      .attr("stroke-width", 2)

    this.svg
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
      this.setState({ data: [{
          x: 800,
          y:300
        }]
    })
    }, 1000)

  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.createSimulation()
  }

  // this takes a data point and works out which category it should be in
  createSimulation = () => {
    const { data } = this.state

    this.svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("class", "bubble")
      .attr("fill", "white")
      .attr("stroke", "coral")

    const forceX = d3
      .forceX()
      .x(d => d.x)
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => d.y)
      .strength(1)

    const sim = d3
      .forceSimulation(data)
      // .force("collide", d3.forceCollide().radius(12))
      .force("x", forceX)
      .force("y", forceY)
      .alpha(0.1) // small alpha to have the elements move at a slower pace

      sim.on('tick',tick);

      function tick(){
        d3.selectAll(".bubble")
          .attr("transform", d => `translate(${d.x} ${d.y})`);
      }

    sim.restart();
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
