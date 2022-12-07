/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      name, username, password, confirmPassword,
    } = await req.json();

    if (name === '강보니'
    && username === 'boni1234'
    && password === 'Test1234!'
    && confirmPassword === 'Test1234!') {
      return res(
        ctx.json({
          id: 1,
          name: '강보니',
          username: 'boni1234',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),
  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const { username, password } = await req.json();

    if (username === 'boni1234' && password === 'Test1234!') {
      return res(
        ctx.json({
          accessToken: 'ACCESS.TOKEN',
          name: '강보니',
          amount: 50000,
        }),
      );
    }

    return res(ctx.status(400));
  }),
  rest.post(`${baseUrl}/orders`, async (req, res, ctx) => {
    const {
      productId, quantity, receiver, address, message,
    } = await req.json();

    if (productId && quantity > 0 && receiver && address) {
      return res(
        ctx.json({
          id: 1,
          productId: 1,
          quantity: 1,
        }),
      );
    }

    return res(ctx.status(400));
  }),
  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(
    ctx.json({
      accessToken: 'ACCESS.TOKEN',
      name: '강보니',
      amount: 50000,
    }),
  )),
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(
    ctx.json({
      products: [
        {
          id: 1,
          title: '상품1',
          price: 10000,
          maker: '제조사1',
          description: '이 상품1은 이러이러합니다',
          imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
        {
          id: 2,
          title: '상품2',
          price: 30000,
          maker: '제조사2',
          description: '이 상품2은 이러이러합니다',
          imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
        },
      ],
    }),
  )),
  rest.get(`${baseUrl}/products/1`, async (req, res, ctx) => res(
    ctx.json({
      id: 1,
      title: '상품1',
      price: 10000,
      maker: '제조사1',
      description: '이 상품1은 이러이러합니다',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    }),
  )),
  rest.get(`${baseUrl}/orders`, async (req, res, ctx) => res(
    ctx.json({
      orders: [
        {
          id: 1,
          quantity: 1,
          totalPrice: 10000,
          receiver: '전제나',
          address: '서울시 사랑구 행복동',
          message: '제나야 메리 크리스마스!',
          product: {
            id: 1,
            title: '상품1',
            price: 10000,
            maker: '제조사1',
            description: '이 상품1은 이러이러합니다',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          },
          createdAt: '2021-08-01T17:57:23.929359',
          updatedAt: '2021-08-01T17:57:23.929359',
        },
        {
          id: 2,
          quantity: 1,
          totalPrice: 10000,
          receiver: '최쥬쥬',
          address: '서울시 행복구 사랑동',
          message: '쥬쥬야 메리 크리스마스!',
          product: {
            id: 1,
            title: '상품1',
            price: 10000,
            maker: '제조사1',
            description: '이 상품1은 이러이러합니다',
            imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          },
          createdAt: '2021-08-01T17:57:23.929359',
          updatedAt: '2021-08-01T17:57:23.929359',
        },
      ],
    }),
  )),
  rest.get(`${baseUrl}/orders/1`, async (req, res, ctx) => res(
    ctx.json({
      id: 1,
      quantity: 1,
      totalPrice: 10000,
      receiver: '전제나',
      address: '서울시 사랑구 행복동',
      message: '제나야 메리 크리스마스!',
      product: {
        id: 1,
        title: '상품1',
        price: 10000,
        maker: '제조사1',
        description: '이 상품1은 이러이러합니다',
        imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      },
      createdAt: '2021-08-01T17:57:23.929359',
      updatedAt: '2021-08-01T17:57:23.929359',
    }),
  )),
);

export default server;
