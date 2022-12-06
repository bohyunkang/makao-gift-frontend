import { useEffect } from 'react';

import useOrderStore from '../hooks/useOrderStore';

import OrderForm from '../components/OrderForm';

export default function OrderPage() {
  const orderStore = useOrderStore();

  useEffect(() => () => {
    orderStore.resetOrderStatus();
  }, []);

  return (
    <OrderForm />
  );
}
