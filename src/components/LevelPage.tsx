import React from "react"
import "../index.css"
import { Barchart } from "../components/Barchart"

export const LevelPage = ({ continents, levelData, calculateXScale }) => {
  return (
    <>
      {continents.map((c, i) => {
        const data = levelData
          .filter(d => d.continent === c)
          .sort((a, b) => b.GDP[2017] - a.GDP[2017])

        return (
          <Barchart
            isLevelView={true}
            getXScale={calculateXScale}
            data={data}
            category={c}
            index={i}
            key={i}
          />
        )
      })}
    </>
  )
}
