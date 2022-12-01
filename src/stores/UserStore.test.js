import UserStore from './UserStore';

const context = describe;

describe('UserStore', () => {
  describe('로그인', () => {
    context('제대로 된 정보로 로그인을 시도할 때', () => {
      it('계좌 정보 불러오기', () => {
        const userStore = new UserStore();

        userStore.login({ username: 'boni1234', password: 'Test1234!' });

        expect(userStore.name).toBe('강보니');
        expect(userStore.amount).toBe(50_000);
      });
    });

    context('잘못된 정보로 로그인을 시도할 때', () => {
      it('계좌 정보 불러오기', () => {
        const userStore = new UserStore();

        userStore.login({ username: 'xxxx', password: 'xxxx' });

        expect(userStore.name).toBeFalsy();
        expect(userStore.amount).toBe(0);
      });
    });
  });
});
