import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage() {
  const productStore = useProductStore();

  const { id } = useParams();

  useEffect(() => {
    productStore.fetchProduct({ id });
  }, []);

  return (
    <ProductDetail />
  );
}
