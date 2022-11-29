import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import LoginForm from './LoginForm';

test('Home', async () => {
  render((
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    </ThemeProvider>
  ));

  screen.getByText(/USER LOGIN/);
  screen.getByText(/로그인하기/);
  screen.getByText(/회원가입/);
});
