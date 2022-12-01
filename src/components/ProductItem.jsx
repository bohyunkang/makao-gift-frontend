import { Link } from 'react-router-dom';

import styled from 'styled-components';

export default function ProductItem({ product }) {
  const {
    id, imageUrl, maker, title, price,
  } = product;

  return (
    <Container>
      <Link to={`products/${id}`}>
        <div>
          <div className="image-wrapper">
            <img className="image" src={imageUrl} alt="상품 이미지" />
          </div>
          <h4>{maker}</h4>
          <h3>{title}</h3>
          <strong>{price}</strong>
        </div>
      </Link>
    </Container>
  );
}

const Container = styled.article`
  width: 280px;

  // TODO: 상품 레이아웃 추가 스타일링 필요!
  border: 1px solid #fcbe2c;

  .image-wrapper {
    overflow: hidden;

    border-radius: .5em;

    .image {
      width: 100%;
      height: 100%;
    }
  }
`;
