import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "../index.css"
import { ForceOne } from "../brokenForce/favchildinprogress"

const IndexPage = () => {


  return (
    <Container>
      <ForceOne/>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
`

export default IndexPage
