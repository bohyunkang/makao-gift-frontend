import styled from 'styled-components';

import useProductStore from '../hooks/useProductStore';

import ProductItem from './ProductItem';

export default function ProductsList() {
  const productStore = useProductStore();

  const { products } = productStore;

  return (
    <Container>
      {products.length ? (
        <>
          <Title>인기선물을 한 자리에 모았어요</Title>
          <Items>
            {/* TODO: 페이지네이션 기능 구현 필요!(slice 제거) */}
            {products.slice(0, 8).map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))}
          </Items>
        </>
      ) : (
        <NoContent>상품이 존재하지 않습니다</NoContent>
      )}
    </Container>
  );
}

const Container = styled.article`
  padding-inline: 10em;
`;

const Title = styled.h2`
  padding-block: 80px 40px;

  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
`;

const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  padding-bottom: 80px;
`;

const NoContent = styled.p`
  margin-top: 80px;

  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
  text-align: center;
`;
