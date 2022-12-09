import { render, screen, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';

import { productStore } from '../stores/ProductStore';

import theme from '../styles/theme';

import ProductItem from './ProductItem';

test('ProductItem', async () => {
  await productStore.fetchProducts({ page: 1, size: 12 });

  render((
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <ProductItem product={productStore.products[0]} />
      </ThemeProvider>
    </MemoryRouter>
  ));

  await waitFor(() => {
    screen.getByRole('heading', { level: 3, name: '상품1' });
    screen.getByRole('heading', { level: 4, name: '제조사1' });
  });
});
