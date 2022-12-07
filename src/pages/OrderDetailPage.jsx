import { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import OrderDetail from '../components/OrderDetail';

import useOrderStore from '../hooks/useOrderStore';

export default function OrderDetailPage() {
  const orderStore = useOrderStore();

  const { id } = useParams();

  useEffect(() => {
    orderStore.fetchOrder({ id });
  }, []);

  return (
    <OrderDetail />
  );
}
