import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { orderStore } from '../stores/OrderStore';

import theme from '../styles/theme';

import OrderItem from './OrderItem';

test('OrderItem', async () => {
  await orderStore.fetchOrders();

  render((
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <OrderItem order={orderStore.orders[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByRole('heading', { level: 4, name: '제조사1' });
    screen.getByRole('heading', { level: 3, name: '상품1' });
    screen.getByText(/To./);
    screen.getByText(/전제나/);
  });
});
