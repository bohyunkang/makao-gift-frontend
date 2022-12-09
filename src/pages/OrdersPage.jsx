import { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import useOrderStore from '../hooks/useOrderStore';

import OrderList from '../components/OrderList';

export default function OrdersPage() {
  const orderStore = useOrderStore();

  const [searchParams] = useSearchParams();

  const page = searchParams.get('page') ?? 1;

  useEffect(() => {
    orderStore.fetchOrders({ page, size: 8 });
  }, [page]);

  return (
    <OrderList />
  );
}
