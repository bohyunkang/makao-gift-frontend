/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';

    this.instance = axios.create({
      baseURL: baseUrl,
    });
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;

    if (accessToken) {
      this.instance = axios.create({
        baseURL: baseUrl,
        headers: { Authorization: `Bearer ${this.accessToken}` },
      });
    }
  }

  async postUser({
    name, username, password, confirmPassword,
  }) {
    const { data } = await this.instance.post('/users', {
      name, username, password, confirmPassword,
    });

    return {
      id: data.id,
    };
  }

  async postSession({ username, password }) {
    const { data } = await this.instance.post('/session', {
      username, password,
    });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async postOrder({
    productId, quantity, receiver, address, message,
  }) {
    const { data } = await this.instance.post('/orders', {
      productId, quantity, receiver, address, message,
    });

    return {
      id: data.id,
    };
  }

  async fetchUser() {
    const { data } = await this.instance.get('/users/me');

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchProducts() {
    const { data } = await this.instance.get('/products');

    const { products } = data;

    return products;
  }

  async fetchProduct(id) {
    const { data } = await this.instance.get(`/products/${id}`);

    return data;
  }
}

export const apiService = new ApiService();
