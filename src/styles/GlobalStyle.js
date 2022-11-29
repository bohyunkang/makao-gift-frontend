import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    color: ${((props) => props.theme.colors.text)};
    background-color: ${((props) => props.theme.colors.background)};
  }
  a {
    color: ${((props) => props.theme.colors.text)};
    text-decoration: none;
  }
`;

export default GlobalStyle;
