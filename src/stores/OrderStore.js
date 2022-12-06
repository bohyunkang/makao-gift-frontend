import { apiService } from '../services/ApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.orderStatus = '';

    this.quantity = 1;
    this.totalPrice = 0;
    this.receiver = '';
    this.address = '';
    this.message = '';

    this.orders = [];
  }

  async processOrder({
    productId, quantity, receiver, address, message,
  }) {
    this.changeOrderStatus('processing');

    try {
      const { id } = await apiService.postOrder({
        productId,
        quantity,
        receiver,
        address,
        message,
      });

      this.receiver = receiver;
      this.address = address;
      this.message = message;

      this.changeOrderStatus('success');
      this.publish();

      return id;
    } catch (e) {
      this.changeOrderStatus('failed');
      this.publish();

      return '';
    }
  }

  setQuantityAndTotalPrice({
    quantity,
    totalPrice,
  }) {
    this.quantity = quantity;
    this.totalPrice = totalPrice;

    this.publish();
  }

  changeOrderStatus(status) {
    this.orderStatus = status;
    this.publish();
  }

  resetOrderStatus() {
    this.orderStatus = '';
    this.publish();
  }

  get isOrderSuccess() {
    return this.orderStatus === 'success';
  }

  get isOrderFailed() {
    return this.orderStatus === 'failed';
  }
}

export const orderStore = new OrderStore();
