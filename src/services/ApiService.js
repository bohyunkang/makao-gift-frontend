/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async postUser({
    name, username, password, confirmPassword,
  }) {
    const url = `${baseUrl}/users`;

    const { data } = await axios.post(url, {
      name, username, password, confirmPassword,
    });

    return {
      id: data.id,
    };
  }

  async postSession({ username, password }) {
    const url = `${baseUrl}/session`;

    const { data } = await axios.post(url, { username, password });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchUser() {
    const url = `${baseUrl}/users/me`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return {
      accessToken: data.accessToken,
      name: data.name,
      amount: data.amount,
    };
  }

  async fetchProducts() {
    const url = `${baseUrl}/products`;

    const { data } = await axios.get(url);

    const { product: products } = data;

    return products;
  }

  async fetchProduct(id) {
    const url = `${baseUrl}/products/${id}`;

    const { data } = await axios.get(url);

    return data;
  }
}

export const apiService = new ApiService();
