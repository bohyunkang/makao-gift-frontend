import { useLocation } from 'react-router-dom';

import styled from 'styled-components';

import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/numberFormat';

import OrderForm from './OrderForm';

// TODO: 로그인하지 않은 경우 접근 못하는 처리 필요!
export default function Order() {
  const { state } = useLocation();
  const orderStore = useOrderStore();

  const { title, maker, imageUrl } = state;
  const { quantity, totalPrice } = orderStore;

  return (
    <div>
      <Product>
        <ImageWrapper>
          <img src={imageUrl} alt={title} />
        </ImageWrapper>
        <DescWrapper>
          <em>{maker}</em>
          <strong>{title}</strong>
          <p>
            구매수량:
            {' '}
            {quantity}
          </p>
          <p>
            총 상품금액:
            {' '}
            {numberFormat(totalPrice)}
            원
          </p>
        </DescWrapper>
      </Product>
      <OrderForm />
    </div>
  );
}

const Product = styled.article`
  
`;

const ImageWrapper = styled.div`
  
`;

const DescWrapper = styled.div`

`;
