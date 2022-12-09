import styled from 'styled-components';
import useOrderStore from '../hooks/useOrderStore';

import { numberFormat, dateFormat } from '../utils/format';

const Container = styled.div`
  position: relative;
`;

const Background = styled.div`
  height: 300px;

  background-color: ${((props) => props.theme.colors.yellow)};
`;

const Detail = styled.article`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);

  padding-bottom: 80px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 40px;
`;

const Image = styled.div`
  width: 400px;
  height: 400px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const DescWrapper = styled.div`
  width: 780px;

  color: ${((props) => props.theme.text.secondary)};

  h3 {
    margin-top: 14px;

    font-size: ${((props) => props.theme.size.h4)};
    font-weight: 700;
  }

  h4 {
    color: ${((props) => props.theme.text.tertiary)};

    font-size: ${((props) => props.theme.size.h5)};
  }

  h3, h4 {
    text-align: center;
  }
`;

const Table = styled.table`
  width: 100%;

  margin-top: 40px;

  tr {
    border-top: 1px solid ${((props) => props.theme.colors.border)};
    border-bottom: 1px solid ${((props) => props.theme.colors.border)};
  }

  th {
    padding-right: 60px;

    font-size: ${((props) => props.theme.size.default)};
    font-weight: 500;
    text-align: left;
  }

  td {
    color: #666666;

    font-size: ${((props) => props.theme.size.h5)};
    text-align: right
  }

  th, td {
    padding-block: 30px;
  }
`;

export default function OrderDetail() {
  const orderStore = useOrderStore();

  const { order } = orderStore;

  const {
    quantity, totalPrice, receiver, address, message, product, createdAt,
  } = order;

  if (!product) {
    return <p>Now Loading...</p>;
  }

  return (
    <Container>
      <Background />
      <Detail>
        <ImageWrapper>
          <Image>
            <img src={product.imageUrl} alt={product.title} />
          </Image>
        </ImageWrapper>
        <DescWrapper>
          <h4>{product.maker}</h4>
          <h3>{product.title}</h3>
          <Table>
            <tbody>
              <tr>
                <th>구매수량</th>
                <td>{quantity}</td>
              </tr>
              <tr>
                <th>총 상품금액</th>
                <td>
                  {numberFormat(totalPrice)}
                  원
                </td>
              </tr>
              <tr>
                <th>구매일</th>
                <td>{dateFormat(createdAt)}</td>
              </tr>
              <tr>
                <th>받는 분</th>
                <td>{receiver}</td>
              </tr>
              <tr>
                <th>받는 분 주소</th>
                <td>{address}</td>
              </tr>
              <tr>
                <th>받는 분께 보내는 메세지</th>
                <td>{message}</td>
              </tr>
            </tbody>
          </Table>
        </DescWrapper>
      </Detail>
    </Container>
  );
}
