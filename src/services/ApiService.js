/* eslint-disable class-methods-use-this */

import axios from 'axios';

import config from '../config';

const baseUrl = config.apiBaseUrl;

export default class ApiService {
  async fetchProducts() {
    const url = `${baseUrl}/products`;

    const { data } = await axios.get(url);

    const { product: products } = data;

    return products;
  }
}

export const apiService = new ApiService();
