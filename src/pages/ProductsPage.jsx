import { useEffect } from 'react';

import useProductStore from '../hooks/useProductStore';

import ProductList from '../components/ProductList';
import ProductBanner from '../components/ProductBanner';

export default function ProductsPage() {
  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  return (
    <div>
      <ProductBanner />
      <ProductList />
    </div>
  );
}
