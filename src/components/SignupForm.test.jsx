import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import { userStore } from '../stores/UserStore';

import theme from '../styles/theme';

import SignupForm from './SignupForm';

jest.mock('react-router-dom', () => ({
  Link({ children, to }) {
    return (
      <a href={to}>
        {children}
      </a>
    );
  },
}));

const context = describe;

describe('SignupForm', () => {
  beforeEach(() => {
    userStore.resetSignupStatus();
  });

  function renderSignupForm() {
    render((
      <ThemeProvider theme={theme}>
        <SignupForm />
      </ThemeProvider>
    ));
  }

  context('회원가입 성공했을 때', () => {
    it('회원가입 완료 페이지로 화면이 바뀐다', async () => {
      renderSignupForm();

      screen.getByRole('heading', { name: 'SIGN UP' });

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: { value: '강보니' },
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: 'boni1234' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: 'Test1234!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: 'Test1234!' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        screen.getByText('회원가입 완료');
        screen.getByText('로그인하기');
      });
    });
  });

  context('회원가입 실패했을 때', () => {
    it('모든 항목이 입력되지 않은 경우', async () => {
      renderSignupForm();

      fireEvent.change(screen.getByLabelText('이름:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('아이디:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호:'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
        target: { value: '' },
      });

      fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

      await waitFor(() => {
        screen.getByText('이름을 다시 확인해주세요');
        screen.getByText('아이디를 다시 확인해주세요');
        expect(screen.getAllByText('비밀번호를 다시 확인해주세요')[0]).toBeInTheDocument();
        expect(screen.getAllByText('비밀번호를 다시 확인해주세요')[1]).toBeInTheDocument();
      });
    });
  });
});
