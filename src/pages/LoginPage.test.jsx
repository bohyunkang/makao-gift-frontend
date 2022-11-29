import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import LoginPage from './LoginPage';

test('LoginPage', async () => {
  render((
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/USER LOGIN/);
    screen.getByText(/로그인하기/);
  });
});
