import OrderStore from './OrderStore';

const context = describe;

describe('OrderStore', () => {
  context('processOrder', () => {
    it('상품 주문 성공했을 때', async () => {
      const orderStore = new OrderStore();

      const productId = 1;
      const quantity = 1;
      const totalPrice = 10000;
      const receiver = '전제나';
      const address = '서울시 사랑구 행복동 888번지 7층';
      const message = '메리크리스마스!!';

      await orderStore.processOrder({
        productId, quantity, totalPrice, receiver, address, message,
      });

      expect(orderStore.isOrderSuccess).toBeTruthy();
    });

    it('상품 주문 실패했을 때', async () => {
      const orderStore = new OrderStore();

      const productId = 0;
      const quantity = 0;
      const totalPrice = -1000;
      const receiver = '';
      const address = '';
      const message = '';

      await orderStore.processOrder({
        productId, quantity, totalPrice, receiver, address, message,
      });

      expect(orderStore.isOrderFailed).toBeTruthy();
    });
  });
});
