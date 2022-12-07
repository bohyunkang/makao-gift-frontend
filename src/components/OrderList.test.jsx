import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { orderStore } from '../stores/OrderStore';

import theme from '../styles/theme';

import OrderList from './OrderList';

test('OrderList', async () => {
  orderStore.fetchOrders();

  render((
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <OrderList />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText(/내가 주문한 내역이 없습니다/);

  await waitFor(() => {
    screen.getByText(/내가 주문한 내역입니다/);
  });
});
