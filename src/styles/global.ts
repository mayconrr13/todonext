import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    --green: #6D9C62;
    --red: #E54B4B;
    --yellow: #E5CC4B;

    --background: #181818;
    --gray-700: #201E1E;
    --gray-300: #525252;

    --text: #ffffff;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1rem;
    transition: all 0.5s;
  }

  html {
    /* @media (max-width: 1080px) {
      font-size: 93.75%;
    } */
    @media (max-width: 720px) {
      font-size: 87.5%;
      }
  }

  body {
    background: var(--background);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default GlobalStyle