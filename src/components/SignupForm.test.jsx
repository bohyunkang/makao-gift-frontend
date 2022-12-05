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

  // TODO: 회원가입 예외처리 후 테스트 통과 필요!
  // context('회원가입 실패했을 때', () => {
  //   it('회원가입 완료 페이지가 보이지 않는다', async () => {
  //     renderSignupForm();

  //     screen.getByRole('heading', { name: 'SIGN UP' });

  //     fireEvent.change(screen.getByLabelText('이름:'), {
  //       target: { value: 'xxx' },
  //     });

  //     fireEvent.change(screen.getByLabelText('아이디:'), {
  //       target: { value: 'xxx' },
  //     });

  //     fireEvent.change(screen.getByLabelText('비밀번호:'), {
  //       target: { value: 'xxx' },
  //     });

  //     fireEvent.change(screen.getByLabelText('비밀번호 확인:'), {
  //       target: { value: 'xxx' },
  //     });

  //     fireEvent.click(screen.getByRole('button', { name: '회원가입' }));

  //     await waitFor(() => {
  //       expect(userStore.isSignupFailed).toBeTruthy();
  //     });
  //   });
  // });
});
