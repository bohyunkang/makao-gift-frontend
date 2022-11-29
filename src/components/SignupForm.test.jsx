import { render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import SignupForm from './SignupForm';

test('SignupForm', async () => {
  render((
    <ThemeProvider theme={theme}>
      <SignupForm />
    </ThemeProvider>
  ));

  screen.getByText(/SIGN UP/);
  screen.getByText(/이름:/);
  screen.getByText(/아이디:/);
  screen.getByText(/비밀번호:/);
  screen.getByText(/비밀번호 확인:/);
  screen.getByText(/회원가입/);
});
