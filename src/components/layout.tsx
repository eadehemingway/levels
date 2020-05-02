// import React, { useState, useEffect } from "react"
// import styled from "styled-components"

// import Nav from "./Nav"

// interface Props {
//   children: any
//   style?: any
// }

// export default function Layout({ children, style }: Props) {
//   const [loaded, setLoaded] = useState(false)

//   useEffect(() => {
//     setTimeout(() => {
//       setLoaded(true)
//     }, 700)
//   }, [])
//   return (
//     <LayoutWrapper>
//       <Nav />

//       {children}
//     </LayoutWrapper>
//   )
// }
// interface LayoutWrapper {
//   loaded: boolean
// }
// const LayoutWrapper = styled.div`
//   display: flex;
// `
