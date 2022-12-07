import { render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import { orderStore } from '../stores/OrderStore';

import theme from '../styles/theme';

import OrderDetail from './OrderDetail';

describe('OrderDetail', () => {
  function renderOrderDetail() {
    render((
      <ThemeProvider theme={theme}>
        <OrderDetail />
      </ThemeProvider>
    ));
  }

  it('첫 번째 주문 내역 조회', async () => {
    await orderStore.fetchOrder({ id: 1 });

    renderOrderDetail();

    screen.getByText('제조사1');
    screen.getByText('상품1');
    screen.getByText('구매수량');
    screen.getByText(1);
    screen.getByText('총 상품금액');
    screen.getByText('10,000원');
    screen.getByText('구매일');
    screen.getByText('2021-08-01');
    screen.getByText('받는 분');
    screen.getByText('전제나');
    screen.getByText('받는 분 주소');
    screen.getByText('서울시 사랑구 행복동');
    screen.getByText('받는 분께 보내는 메세지');
    screen.getByText('제나야 메리 크리스마스!');
  });
});
