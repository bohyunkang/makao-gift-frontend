import { render, screen, waitFor } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import SignupPage from './SignupPage';

test('SignupPage', async () => {
  render((
    <ThemeProvider theme={theme}>
      <SignupPage />
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/SIGN UP/);
    screen.getByText(/회원가입/);
  });
});
