import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';

import ProductsPage from './ProductsPage';

test('ProductsPage', async () => {
  render((
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ProductsPage />
      </ThemeProvider>
    </MemoryRouter>
  ));

  screen.getByText(/상품이 존재하지 않습니다/);

  await waitFor(() => {
    screen.getByText(/인기선물을 한 자리에 모았어요/);
  });
});
