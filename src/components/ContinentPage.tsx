import React from "react"
import "../index.css"
import { Barchart } from "../components/barchart"

export const ContinentPage = ({
  continentData,
  levels,
  getLevel,
  calculateXScale,
}) => {
  return (
    <>
      {levels.map((level, i) => {
        const data = continentData
          .filter(d => getLevel(d.GDP[2017], level))
          .sort((a, b) => b.GDP[2017] - a.GDP[2017])

        return (
          <Barchart
            isLevelView={false}
            getXScale={calculateXScale}
            data={data}
            category={level}
            index={i}
            key={i}
          />
        )
      })}
    </>
  )
}
