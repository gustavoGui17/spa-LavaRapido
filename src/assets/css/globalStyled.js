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

  body {
    background-color: var(--color-background);
    color: var(--color-dark);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-dark);
  }

  input, select, textarea, button {
    font-family: inherit;
  }
`;

export default GlobalStyle;