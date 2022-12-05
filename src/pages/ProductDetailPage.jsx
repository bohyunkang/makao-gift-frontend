import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import ProductDetail from '../components/ProductDetail';

export default function ProductDetailPage() {
  const productStore = useProductStore();

  const { pathname } = useLocation();
  const productId = pathname.split('/')[2];

  useEffect(() => {
    productStore.fetchProduct({ id: productId });
  }, []);

  return (
    <ProductDetail />
  );
}
