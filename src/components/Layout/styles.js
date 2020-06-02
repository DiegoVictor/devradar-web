import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0px;
    outline: 0px;
    padding: 0px;
  }

  body {
    background-color: #E5E6F0;
    -webkit-font-smoothing: antialiased;
    background: #e5e3df;
  }

  html, body, #root {
    height: 100%;
  }

  body, input, button, textarea {
    font-family: Roboto, sans-serif;
  }
`;
