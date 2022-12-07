import { useEffect } from 'react';

import useOrderStore from '../hooks/useOrderStore';

import OrderList from '../components/OrderList';

export default function OrdersPage() {
  const orderStore = useOrderStore();

  useEffect(() => {
    orderStore.fetchOrders();
  }, []);

  return (
    <OrderList />
  );
}
