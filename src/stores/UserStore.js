import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.amount = 0;
  }

  login({ username, password }) {
    // TODO: 서버에서 가져와야 함
    if (username !== 'boni1234') {
      return;
    }

    this.name = '강보니';
    this.amount = 50000;
  }
}

export const userStore = new UserStore();
