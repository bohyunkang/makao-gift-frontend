import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  describe('signup', () => {
    context('제대로 된 정보로 회원가입을 시도할 때', () => {
      it('회원가입 성공', async () => {
        const userStore = new UserStore();

        await userStore.signup({
          name: '강보니',
          username: 'boni1234',
          password: 'Test1234!',
          confirmPassword: 'Test1234!',
        });

        expect(userStore.isSignupSuccess).toBeTruthy();
      });
    });

    context('잘못된 정보로 회원가입을 시도할 때', () => {
      it('로그인 실패', async () => {
        const userStore = new UserStore();

        await userStore.signup({
          name: 'xxx',
          username: 'xxx',
          password: 'xxx',
          confirmPassword: 'xxx',
        });

        expect(userStore.isSignupFailed).toBeTruthy();
      });
    });
  });

  describe('login', () => {
    context('제대로 된 정보로 로그인을 시도할 때', () => {
      it('로그인 성공', async () => {
        const userStore = new UserStore();

        await userStore.login({ username: 'boni1234', password: 'Test1234!' });

        expect(userStore.isLoginSuccess).toBeTruthy();
        expect(userStore.name).toBe('강보니');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('잘못된 정보로 로그인을 시도할 때', () => {
      it('로그인 실패', async () => {
        const userStore = new UserStore();

        await userStore.login({ username: 'xxxx', password: 'xxxx' });

        expect(userStore.isLoginFailed).toBeTruthy();
        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBe(0);
      });
    });
  });

  describe('fetchUser', () => {
    it('잔액 업데이트', async () => {
      const userStore = new UserStore();

      userStore.setAmount(0);

      await userStore.fetchUser();

      expect(userStore.amount).toBe(50000);
    });
  });
});
