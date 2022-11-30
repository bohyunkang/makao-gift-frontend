import { useEffect } from 'react';

import useProductStore from '../hooks/useProductStore';

import ProductItem from '../components/ProductItem';
import ProductsBanner from '../components/ProductsBanner';

export default function ProductsPage() {
  const productStore = useProductStore();

  const { products } = productStore;

  useEffect(() => {
    productStore.fetchProducts();
  }, []);

  return (
    <div>
      <ProductsBanner />
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
