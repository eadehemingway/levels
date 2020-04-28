import React, { useState, useEffect } from "react"
import * as d3 from "d3"
import styled from "styled-components"

const Force = () => {
  const [value, setValue] = useState("role")
  const data = [
    // {
    //   id: 2,
    //   value: 2,
    //   campus: "khaleel",
    //   gender: "female",
    //   role: "student",
    // },
    // { id: 3, value: 3, campus: "khaleel", gender: "male", role: "student" },
    // { id: 4, value: 4, campus: "khaleel", gender: "male", role: "student" },
    // { id: 6, value: 6, campus: "khaleel", gender: "female", role: "mentor" },
    // { id: 7, value: 7, campus: "khaleel", gender: "female", role: "mentor" },
    // {
    //   id: 8,
    //   value: 8,
    //   campus: "khaleel",
    //   gender: "female",
    //   role: "student",
    // },
    // { id: 10, value: 10, campus: "gaza", gender: "female", role: "student" },
    // { id: 11, value: 11, campus: "gaza", gender: "male", role: "student" },
    // { id: 12, value: 12, campus: "gaza", gender: "male", role: "student" },
    // { id: 14, value: 14, campus: "gaza", gender: "female", role: "mentor" },
    // { id: 15, value: 15, campus: "khaleel", gender: "female", role: "mentor" },
    { id: 16, value: 16, campus: "khaleel", gender: "female", role: "student" },
  ]
  const categories = {
    role: ["student", "mentor"],
    campus: ["gaza", "khaleel"],
    gender: ["male", "female"],
  }

  useEffect(() => {
    const svg = d3.select("svg").attr("width", 700).attr("height", 700)

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", d => d.value * 2)
      .attr("class", "bubble")
      .attr("fill", d => (d.gender === "male" ? "coral" : "#c4c3d0"))

    updateLabels()
    createSimulation()
  }, [])

  useEffect(() => {
    updateLabels()
    createSimulation()
  }, [value])

  // works out the coordinates of the groups, and adds 'group' property which can be read later to use for the labels of each group
  function centerOfGravityForGroups(categories) {
    const firstCenter = 700 / 4
    const secondCenter = firstCenter * 3
    const yVal = 700 / 2
    const [groupOne, groupTwo] = categories
    return [
      { x: firstCenter, y: yVal, group: groupOne },
      { x: secondCenter, y: yVal, group: groupTwo },
    ]
  }

  // this takes a data point and works out which category it should be in
  function centerOfGravityForDatum(d) {
    const dataGroupArr = categories[value]
    const dataGroup = d[value]
    return centerOfGravityForGroups(dataGroupArr).find(
      e => e.group === dataGroup
    )
  }

  function createSimulation() {
    const forceX = d3
      .forceX()
      .x(d => {
        console.log(centerOfGravityForDatum(d).x)
        return centerOfGravityForDatum(d).x
      })
      .strength(1)

    const forceY = d3
      .forceY()
      .y(d => centerOfGravityForDatum(d).y)
      .strength(1)

    d3.forceSimulation(data)
      .force(
        "collision",
        d3.forceCollide().radius(d => d.value * 2)
      )
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
  }

  function updateLabels() {
    const dataGroupArr = categories[value]
    const updatedCategoriesCenter = centerOfGravityForGroups(dataGroupArr)

    const labelSelection = d3
      .select("svg")
      .selectAll("text")
      .data(updatedCategoriesCenter)

    labelSelection.exit().remove()

    const entering = labelSelection
      .enter()
      .append("text")
      .style("font-size", "20")
      .style("letter-spacing", "0.1rem")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")

    const updatedAndEnter = labelSelection.merge(entering)

    updatedAndEnter
      .text(d => d.group)
      .attr("x", d => d.x)
      .attr("opacity", "0.4")
      .attr("font-family", "futura")
      .attr("fill", "lightslategray")
      .attr("y", 100)
  }

  const selectCategories = Object.keys(categories)
  return (
    <section className="page-excl-nav">
      <div className="force-directed-page">
        <StyledSelect onChange={e => setValue(e.target.value)}>
          {selectCategories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </StyledSelect>
        <svg></svg>
      </div>
    </section>
  )
}

const StyledSelect = styled.select`
  padding: 20px;
  width: 200px;
  font-size: 20px;
  margin: 70px;
`

export default Force
