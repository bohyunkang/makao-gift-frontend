import { Link } from 'react-router-dom';
import styled from 'styled-components';

// TODO: props 수정되어야 함
export default function ProductItem({
  id, image, maker, title, price,
}) {
  return (
    <Container>
      <Link to={`products/${id}`}>
        <div>
          <div className="img" />
          <em>{maker}</em>
          <p>{title}</p>
          <strong>{price}</strong>
        </div>
      </Link>
    </Container>
  );
}

const Container = styled.article`
  border: 1px solid red;

  .img {
    background-color: #ddd;

    width: 280px;
    height: 280px;

    border-radius: .5em;
  }
`;
