import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "../index.css"
import { Force } from "../brokenForce"

const IndexPage = () => {
    return (
      <Container>
        <Force/>
      </Container>
    )
  }
  
  const Container = styled.div`
    position: relative;
  `
  
  export default IndexPage
  