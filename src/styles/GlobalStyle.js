import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    color: ${((props) => props.theme.text.primary)};
    background-color: ${((props) => props.theme.colors.background)};
    font-size: 16px;
  }
  a {
    color: ${((props) => props.theme.text.primary)};
    text-decoration: none;
  }
`;

export default GlobalStyle;
