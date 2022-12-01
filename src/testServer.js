/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/products`, async (req, res, ctx) => res(
    ctx.json({
      product: [
        {
          id: 1,
          title: '상품1',
          price: 10000,
          maker: '제조사1',
          description: '이 상품1은 이러이러합니다',
          imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          createdAt: '2021-02-25T16:10:45.8306309',
          updatedAt: '2021-02-25T16:10:45.8306309',
        },
        {
          id: 2,
          title: '상품2',
          price: 30000,
          maker: '제조사2',
          description: '이 상품2은 이러이러합니다',
          imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
          createdAt: '2021-02-25T16:10:45.8306309',
          updatedAt: '2021-02-25T16:10:45.8306309',
        },
      ],
    }),
  )),
);

export default server;
