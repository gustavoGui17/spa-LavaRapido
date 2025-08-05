import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
    scroll-behavior: smooth;
  }
`;

export default GlobalStyle;