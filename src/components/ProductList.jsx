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
          <h2>인기선물을 한 자리에 모았어요</h2>
          <Wrapper>
            {/* TODO: 페이지네이션 기능 구현 필요!(slice 제거) */}
            {products.slice(0, 8).map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))}
          </Wrapper>
        </>
      ) : (<p>상품이 존재하지 않습니다</p>)}
    </Container>
  );
}

const Container = styled.article`
  padding-inline: 320px;

  h2 {
    padding-block: 80px 40px;

    font-weight: 700;
    font-size: ${((props) => props.theme.size.h4)};
  }
`;

const Wrapper = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
