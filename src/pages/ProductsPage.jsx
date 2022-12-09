import { useEffect } from 'react';

import styled from 'styled-components';

import { useSearchParams } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import ProductList from '../components/ProductList';
import ProductBanner from '../components/ProductBanner';

export default function ProductsPage() {
  const productStore = useProductStore();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    productStore.fetchProducts({ page, size: 12 });
  }, [page]);

  return (
    <Container>
      <ProductBanner />
      <ProductList />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
`;
