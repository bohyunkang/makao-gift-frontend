import { apiService } from '../services/ApiService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.signupStatus = '';
    this.loginStatus = '';

    this.accessToken = '';
    this.name = '';
    this.amount = 0;
  }

  async signup({
    name, username, password, confirmPassword,
  }) {
    this.changeSignupStatus('processing');

    try {
      const { id } = await apiService.postUser({
        name, username, password, confirmPassword,
      });

      this.changeSignupStatus('success');
      this.publish();

      return id;
    } catch (e) {
      this.changeSignupStatus('failed');
      this.publish();

      return '';
    }
  }

  async login({ username, password }) {
    this.changeLoginStatus('processing');
    this.publish();

    try {
      const { accessToken, name, amount } = await apiService.postSession({
        username, password,
      });

      this.accessToken = accessToken;
      this.name = name;
      this.amount = amount;

      this.changeLoginStatus('success');
      this.publish();

      return accessToken;
    } catch (e) {
      this.changeLoginStatus('failed');
      this.publish();

      return '';
    }
  }

  async fetchUser() {
    const { name, amount } = await apiService.fetchUser();

    this.name = name;
    this.amount = amount;

    this.publish();
  }

  isAffordable(amount) {
    return this.amount >= amount;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  payAmount(amount) {
    this.amount -= amount;
  }

  changeSignupStatus(status) {
    this.signupStatus = status;
    this.publish();
  }

  resetSignupStatus() {
    this.signupStatus = '';
    this.publish();
  }

  changeLoginStatus(status) {
    this.loginStatus = status;
    this.publish();
  }

  resetLoginStatus() {
    this.loginStatus = '';
    this.publish();
  }

  get isSignupSuccess() {
    return this.signupStatus === 'success';
  }

  get isSignupFailed() {
    return this.signupStatus === 'failed';
  }

  get isLoginSuccess() {
    return this.loginStatus === 'success';
  }

  get isLoginFailed() {
    return this.loginStatus === 'failed';
  }
}

export const userStore = new UserStore();
