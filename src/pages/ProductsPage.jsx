import { useEffect } from 'react';

import styled from 'styled-components';

import useProductStore from '../hooks/useProductStore';

import ProductList from '../components/ProductList';
import ProductBanner from '../components/ProductBanner';

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

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
