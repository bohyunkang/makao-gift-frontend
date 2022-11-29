import { render, screen, waitFor } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import HomePage from './HomePage';

test('HomePage', async () => {
  render((
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/무얼 선물할 지 고민이라면/);
    screen.getByText(/마카오 선물하기에서만 볼 수 있는 특별한 아이템/);
  });
});
