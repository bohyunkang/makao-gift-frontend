/* eslint-disable react/prop-types */

import { fireEvent, render, screen } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import Header from './Header';

import theme from '../styles/theme';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
  useNavigate() {
    return navigate;
  },
}));

const context = describe;

describe('Header', () => {
  function renderHeader() {
    render((
      <ThemeProvider theme={theme}>
        <Header />
      </ThemeProvider>
    ));
  }

  it('네비게이션', () => {
    renderHeader();

    screen.getByText(/선물하기/);
    screen.getByText(/홈/);
    screen.getByText(/스토어/);
    screen.getByText(/주문조회/);
    screen.getByText(/회원가입/);
    screen.getByText(/로그인/);
  });

  // context('로그인 된 경우', () => {
  //   beforeEach(() => {
  //     localStorage.removeItem('accessToken');
  //   });

  //   it('로그인 버튼', () => {
  //     renderHeader();

  //     screen.getByText(/로그인/);
  //   });
  // });

  // context('로그인 안 된 경우', () => {
  //   beforeEach(() => {
  //     localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));
  //   });

  //   it('로그아웃 버튼', () => {
  //     renderHeader();

  //     screen.getByText(/로그아웃/);
  //   });
  // });

  // context('로그아웃 버튼이 눌릴 경우', () => {
  //   it('홈으로 리다이렉트된다.', () => {
  //     renderHeader();

  //     fireEvent.click(screen.getByText(/로그아웃/));

  //     expect(navigate).toBeCalledWith('/');
  //   });
  // });
});
