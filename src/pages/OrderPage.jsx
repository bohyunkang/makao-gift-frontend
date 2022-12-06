import { useEffect } from 'react';

import useOrderStore from '../hooks/useOrderStore';

import Order from '../components/Order';

export default function OrderPage() {
  const orderStore = useOrderStore();

  useEffect(() => () => {
    orderStore.resetOrderStatus();
  }, []);

  return (
    <Order />
  );
}
