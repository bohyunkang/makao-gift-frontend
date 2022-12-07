import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import OrdersPage from './OrdersPage';

test('OrdersPage', async () => {
  render((
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <OrdersPage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText(/내가 주문한 내역이 없습니다/);

  await waitFor(() => {
    screen.getByText(/내가 주문한 내역입니다/);
  });
});
