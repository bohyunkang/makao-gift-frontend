import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';

import { userStore } from '../stores/UserStore';

import theme from '../styles/theme';

import LoginForm from './LoginForm';

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

describe('LoginForm', () => {
  function renderLoginForm(location) {
    render((
      <ThemeProvider theme={theme}>
        <LoginForm location={location} />
      </ThemeProvider>
    ));
  }

  context('로그인에 성공했을 때', () => {
    it('홈페이지로 리다이렉트되는 경우', async () => {
      renderLoginForm({ state: {} });

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'boni1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Test1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith('/');
      });
    });

    it('주문 페이지로 리다이렉트되는 경우', async () => {
      renderLoginForm({ state: { previousPage: 'productDetail' } });

      screen.getByRole('heading', { name: 'USER LOGIN' });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'boni1234' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'Test1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        expect(navigate).toBeCalledWith(-1);
      });
    });
  });

  context('로그인에 실패했을 때', () => {
    it('로그인 실패', async () => {
      renderLoginForm({ state: {} });

      fireEvent.change(screen.getByPlaceholderText('아이디'), {
        target: { value: 'xxx' },
      });

      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'xxx' },
      });

      fireEvent.click(screen.getByRole('button', { name: '로그인하기' }));

      await waitFor(() => {
        expect(userStore.isLoginFailed).toBeTruthy();
      });
    });
  });
});
