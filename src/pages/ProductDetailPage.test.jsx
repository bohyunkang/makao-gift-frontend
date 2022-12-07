import {
  act, render, screen, waitFor,
} from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import ProductDetailPage from './ProductDetailPage';

test('ProductDetailPage', async () => {
  await act(() => {
    render((
      <MemoryRouter initialEntries={['/products/1']}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/products/:id" element={<ProductDetailPage />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>
    ));
  });

  await waitFor(() => {
    screen.getByRole('button', { name: '선물하기' });
  });
});
