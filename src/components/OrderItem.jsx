import { Link } from 'react-router-dom';

import styled from 'styled-components';

const Container = styled.li`
  width: 280px;
  height: 100%;

  h4 {
    font-size: ${((props) => props.theme.size.h6)};
    color: ${((props) => props.theme.text.tertiary)};
  }

  h3 {
    display: -webkit-box;
    overflow: hidden;

    margin-block: 8px;
    
    text-overflow: ellipsis;
    font-size:  ${((props) => props.theme.size.default)};
    line-height: 1.1;

    color: ${((props) => props.theme.text.secondary)};

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  strong {
    font-size:  ${((props) => props.theme.size.default)};
    font-weight: 700;
    color: ${((props) => props.theme.text.secondary)};
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;

  margin-bottom: 14px;

  border-radius: 0.6em;

  img {
    width: 100%;
    height: 100%;
  }
`;

export default function OrderItem({ order }) {
  const {
    id, product, receiver,
  } = order;

  return (
    <Link to={`/orders/${id}`}>
      <Container>
        <ImageWrapper>
          <img src={product.imageUrl} alt={product.title} />
        </ImageWrapper>
        <h4>{product.maker}</h4>
        <h3>{product.title}</h3>
        <strong>
          To.
          {' '}
          {receiver}
        </strong>
      </Container>
    </Link>
  );
}
