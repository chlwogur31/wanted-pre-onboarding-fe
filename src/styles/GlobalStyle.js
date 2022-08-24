import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box; 
  }

  html {
    font-family: 'Karla', sans-serif; 
  }

`;

export default GlobalStyle;
