import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.quantity = 1;
    this.totalPrice = 0;
    this.receiver = '';
    this.address = '';
    this.message = '';

    this.orders = [];
  }

  setOrderInformation({
    quantity,
    totalPrice,
  }) {
    this.quantity = quantity;
    this.totalPrice = totalPrice;

    this.publish();
  }
}

export const orderStore = new OrderStore();
