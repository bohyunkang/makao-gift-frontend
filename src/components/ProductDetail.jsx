import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';
import useOrderStore from '../hooks/useOrderStore';

import numberFormat from '../utils/numberFormat';

import Button from './common/Button';

export default function ProductDetail() {
  const userStore = useUserStore();
  const productStore = useProductStore();
  const orderStore = useOrderStore();

  const { product } = productStore;
  const {
    title, price, maker, description, imageUrl,
  } = product;

  const [accessToken] = useLocalStorage('accessToken', '');

  const [quantity, setQuantity] = useState(1);
  const totalPrice = price * quantity;

  const handleClickDecrease = () => {
    if (quantity <= 1) {
      return;
    }

    setQuantity((prev) => prev - 1);
  };

  const handleClickIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const navigate = useNavigate();

  const handleClickOrder = () => {
    if (!accessToken) {
      navigate('/login', { state: { previousPage: 'productDetail' } });

      return;
    }

    if (!userStore.isAffordable(totalPrice)) {
      return;
    }

    orderStore.setQuantityAndTotalPrice({ quantity, totalPrice });
    navigate('/order');
  };

  return (
    <Container>
      <ImageWrapper>
        <img src={imageUrl} alt={title} />
      </ImageWrapper>
      <DescWrapper>
        <h2>{title}</h2>
        <h3>
          {numberFormat(price)}
          원
        </h3>
        <table>
          <tbody>
            <tr>
              <th>제조사</th>
              <td>{maker}</td>
            </tr>
            <tr>
              <th>구매수량</th>
              <td>
                <div>
                  <button
                    type="button"
                    onClick={handleClickDecrease}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={handleClickIncrease}
                  >
                    +
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th>상품설명</th>
              <td>{description}</td>
            </tr>
          </tbody>
        </table>
        <h3>
          총 상품금액:
          <strong>
            {numberFormat(totalPrice)}
            원
          </strong>
        </h3>
        <Button
          type="button"
          onClick={handleClickOrder}
        >
          선물하기
        </Button>
        {!userStore.isAffordable(totalPrice)
        && <Warning>❌ 잔액이 부족하여 선물하기가 불가합니다 ❌</Warning>}
      </DescWrapper>
    </Container>
  );
}

const Container = styled.article`

`;

const ImageWrapper = styled.div`
  
`;

const DescWrapper = styled.div`

`;

const Warning = styled.p`
  
`;
