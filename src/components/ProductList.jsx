import { useLocation, useSearchParams } from 'react-router-dom';

import styled from 'styled-components';

import useProductStore from '../hooks/useProductStore';

import ProductItem from './ProductItem';
import Pagination from './Pagination';

export default function ProductsList() {
  const productStore = useProductStore();

  const { products } = productStore;

  const location = useLocation();

  const [searchParams] = useSearchParams();

  return (
    <Container>
      {products.length ? (
        <>
          <Title>인기선물을 한 자리에 모았어요</Title>
          <List>
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
              />
            ))}
          </List>
          <Pagination
            url={location.pathname}
            total={productStore.totalPages}
            current={searchParams.get('page') ?? 1}
          />
        </>
      ) : (
        <NoContent>상품이 존재하지 않습니다</NoContent>
      )}
    </Container>
  );
}

const Container = styled.article`
  width: 1180px;

  margin: 0 auto;
`;

const Title = styled.h2`
  padding-block: 80px 40px;

  font-weight: 700;
  font-size: ${((props) => props.theme.size.h4)};
`;

const List = styled.ul`
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
