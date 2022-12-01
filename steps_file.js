/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  resetDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/reset-database`);
  },
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },
  login() {
    this.amOnPage('/login');

    this.fillField('아이디', 'boni1234');
    this.fillField('비밀번호', 'Test1234!');
    this.click('[type=submit]');

    this.waitForText('로그아웃');
  },
  changeUserAmount({ userId, amount }) {
    this.amOnPage([
      `${backdoorBaseUrl}/change-user-amount`,
      `?userId=${userId}&amount=${amount}`,
    ].join(''));
  },
  makeOrder() {
    this.setupDatabase();
    this.amOnPage('/');
    this.login();
    this.click('스토어');
    this.click('10,000원');
    this.amOnPage('/products/1');
    this.click('선물하기');
    this.amOnPage('/order');

    this.fillField('받는 분 성함', '전제나');
    this.fillField('받는 분 주소', '서울시 사랑구 행복동 888번지 8층');
    this.fillField('받는 분께 보내는 메시지', '내 소소한 마음이다 잘 받아라');
    this.click('선물하기');

    this.amOnPage('/orders');
    this.see('내가 주문한 내역입니다');
    this.see('To. 전제나');
  },
});
