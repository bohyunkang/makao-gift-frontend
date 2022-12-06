import { render, screen, waitFor } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import { productStore } from '../stores/ProductStore';

import theme from '../styles/theme';

import Order from './Order';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('Order', async () => {
  await productStore.fetchProduct({ id: 1 });

  render((
    <ThemeProvider theme={theme}>
      <Order />
    </ThemeProvider>
  ));

  await waitFor(() => {
    screen.getByText(/구매수량/);
    screen.getByText(/총 상품금액/);
    screen.getByRole('button', { name: '선물하기' });
  });
});
