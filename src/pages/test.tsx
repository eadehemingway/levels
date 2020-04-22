import React, { useEffect, useState } from "react"
import * as d3 from "d3"
import { Link } from "gatsby"
import { data } from "../data/data"
import styled from "styled-components"
import "../index.css"

const IndexPage = () => {
  useEffect(() => {})

  return (
    <div>
      <Text>
        <PlayBar></PlayBar>
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
export default IndexPage
