import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import OrderDetailPage from './OrderDetailPage';

test('OrderDetailPage', async () => {
  render((
    <MemoryRouter initialEntries={['/orders/1']}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/orders/:id" element={<OrderDetailPage />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByText('구매수량');
    screen.getByText('총 상품금액');
    screen.getByText('구매일');
    screen.getByText('받는 분');
    screen.getByText('받는 분 주소');
    screen.getByText('받는 분께 보내는 메세지');
  });
});
