import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { navigate } from "gatsby"

export default function Nav({ setActivePage, activePage }) {
  function nav(endpoint) {
    // navigate(endpoint)
    setActivePage(endpoint)
  }

  const levels = ["levelone", "leveltwo", "levelthree", "levelfour"]
  return (
    <Container>
      {levels.map((l, i) => {
        const isActive = activePage === l
        return (
          <Tab key={i} onClick={() => nav(l)} isActive={isActive}>
            {i + 1}
          </Tab>
        )
      })}
    </Container>
  )
}

const Container = styled.div`
  width: 100px;
  height: 100vh;
  border: 1px solid coral;
`
const Tab = styled.p`
  border: 1px solid coral;
  padding: 15px;
  font-size: 20px;
  font-weight: 1000;
  font-family: Major Mono;
  cursor: pointer;
  margin: 15px;
  text-align: center;
  ${({ isActive }) => {
    return isActive ? "background: #ff9999; color:white;" : null
  }}
`
