import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';
import useProductStore from '../hooks/useProductStore';
import useOrderStore from '../hooks/useOrderStore';

import { numberFormat } from '../utils/format';

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

  const [isClicked, setIsClicked] = useState(false);
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
      setIsClicked(true);
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
        <Title>{title}</Title>
        <Price>
          {numberFormat(price)}
          원
        </Price>
        <Table>
          <tbody>
            <tr>
              <th>제조사</th>
              <td>{maker}</td>
            </tr>
            <tr>
              <th>구매수량</th>
              <td>
                <div>
                  {/* TODO: 버튼 마크업 추가! */}
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
        </Table>
        <TotalPrice>
          총 상품금액:
          {'  '}
          <strong>
            {numberFormat(totalPrice)}
            원
          </strong>
        </TotalPrice>
        <Button
          type="button"
          onClick={handleClickOrder}
        >
          선물하기
        </Button>
        {isClicked && !userStore.isAffordable(totalPrice)
        && <Warning>❌ 잔액이 부족하여 선물하기가 불가합니다 ❌</Warning>}
      </DescWrapper>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding-inline: 10em;
  padding-top: 80px;

  color: ${((props) => props.theme.text.secondary)};
`;

const ImageWrapper = styled.div`
  width: 600px;
  height: 600px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const DescWrapper = styled.div`
  width: 500px;

`;

const Title = styled.h3`
  margin-bottom: 24px;

  font-size: ${((props) => props.theme.size.h3)};
  font-weight: 500;
`;

const Price = styled.h2`
  margin-bottom: 40px;

  font-size: ${((props) => props.theme.size.h1)};
  font-weight: 700;
`;

const Table = styled.table`
  width: 100%;

  tr {
    border-top: 1px solid ${((props) => props.theme.colors.border)};
    border-bottom: 1px solid ${((props) => props.theme.colors.border)};
  }

  th {
    padding-right: 60px;

    color: #666666;

    font-size: ${((props) => props.theme.size.default)};
    font-weight: 500;
    text-align: left;
  }

  td {
    font-size: ${((props) => props.theme.size.h5)};
  }

  th, td {
    padding-block: 20px;
  }
`;

const TotalPrice = styled.h3`
  margin-block: 30px;

  font-size: ${((props) => props.theme.size.default)};
  font-weight: 500;
  text-align: right;

  strong {
    vertical-align: middle;

    font-size: ${((props) => props.theme.size.h1)};
    font-weight: 700;
  }
`;

const Warning = styled.p`
  margin-top: 20px;

  color: ${((props) => props.theme.text.red)};
  text-align: center;
`;
