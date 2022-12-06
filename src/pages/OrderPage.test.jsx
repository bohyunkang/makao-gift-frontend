import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { productStore } from '../stores/ProductStore';

import theme from '../styles/theme';

import OrderPage from './OrderPage';

test('OrderPage', async () => {
  localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

  await productStore.fetchProduct({ id: 1 });

  render((
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <OrderPage />
      </MemoryRouter>
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/구매수량:/);
    screen.getByText(/총 상품금액:/);
    screen.getByRole('button', { name: '선물하기' });
  });
});
