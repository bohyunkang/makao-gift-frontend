import styled from 'styled-components';

import useOrderStore from '../hooks/useOrderStore';
import useProductStore from '../hooks/useProductStore';

import numberFormat from '../utils/numberFormat';

import OrderForm from './OrderForm';

export default function Order() {
  const productStore = useProductStore();
  const { product } = productStore;
  const { title, maker, imageUrl } = product;

  const orderStore = useOrderStore();
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
