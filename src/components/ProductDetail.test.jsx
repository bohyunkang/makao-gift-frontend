import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import { productStore } from '../stores/ProductStore';
import { userStore } from '../stores/UserStore';

import theme from '../styles/theme';

import ProductDetail from './ProductDetail';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function renderProductDetail() {
    render((
      <ThemeProvider theme={theme}>
        <ProductDetail />
      </ThemeProvider>
    ));
  }

  it('첫 번째 상품 조회', async () => {
    await productStore.fetchProduct({ id: 1 });

    renderProductDetail();

    screen.getByText('상품1');
    screen.getAllByText('10,000원');
    screen.getByText('제조사1');
    screen.getByText(1);
    screen.getByText('이 상품1은 이러이러합니다');
    screen.getByText('선물하기');
  });

  context('선물하기 버튼 클릭', () => {
    context('로그인이 안 되어있을 경우', () => {
      it('로그인 페이지로 이동', async () => {
        await productStore.fetchProduct({ id: 1 });

        renderProductDetail();

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith(
          '/login',
          { state: { previousPage: 'productDetail' } },
        );

        expect(navigate).not.toBeCalledWith('/order');
      });
    });

    context('로그인이 되어 있는 경우', () => {
      it('주문 페이지로 이동', async () => {
        localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
        userStore.setAmount(50000);

        await productStore.fetchProduct({ id: 1 });

        renderProductDetail();

        fireEvent.click(screen.getByText('선물하기'));

        expect(navigate).toBeCalledWith(
          '/order',
          {
            state: {
              imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
              maker: '제조사1',
              title: '상품1',
            },
          },
        );
      });
    });
  });
});
