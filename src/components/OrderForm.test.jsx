import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import { productStore } from '../stores/ProductStore';

import theme from '../styles/theme';

import OrderForm from './OrderForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

describe('OrderForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderOrderForm() {
    render((
      <ThemeProvider theme={theme}>
        <OrderForm />
      </ThemeProvider>
    ));
  }

  const context = describe;

  it('Order', async () => {
    await productStore.fetchProduct({ id: 1 });

    renderOrderForm();

    await waitFor(() => {
      screen.getByText(/구매수량/);
      screen.getByText(/총 상품금액/);
      screen.getByRole('button', { name: '선물하기' });
    });
  });

  context('주문에 성공했을 때', () => {
    it('주문 목록 페이지로 리다이렉트', async () => {
      await productStore.fetchProduct({ id: 1 });

      renderOrderForm();

      fireEvent.change(screen.getByLabelText(/받는 분 성함/), {
        target: { value: '전제나' },
      });

      fireEvent.change(screen.getByLabelText(/받는 분 주소/), {
        target: { value: '서울시 사랑구 행복동 888번지 7층' },
      });

      fireEvent.click(screen.getByRole('button', { name: '선물하기' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/orders');
      });
    });
  });

  // TODO: 예외처리 후 테스트 통과 확인 필요!
  // context('주문에 실패했을 때', () => {
  //   it('주문 실패', async () => {
  //     renderOrderForm();

  //     fireEvent.change(screen.getByPlaceholderText('아이디'), {
  //       target: { value: '' },
  //     });

  //     fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
  //       target: { value: '' },
  //     });

  //     fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

  //     await waitFor(() => {
  //       expect(orderStore.isOrderFailed).toBeTruthy();
  //     });
  //   });
  // });
});
