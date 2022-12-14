Feature('주문 내역 페이지');

Scenario('주문한 내역이 하나도 없는 경우', ({ I }) => {
  // Given
  I.resetDatabase();
  I.signup();
  I.login();
  I.amOnPage('/');
  I.click('주문조회');

  // When
  I.amOnPage('/orders');

  // Then
  I.see('내가 주문한 내역이 없습니다');
});

Scenario('주문한 내역이 있는 경우', ({ I }) => {
  // When
  I.setupDatabase();
  I.makeOrder();
  I.amOnPage('/');
  I.click('주문조회');

  // Then
  I.see('내가 주문한 내역입니다');
  I.see('To. 전제나');
});

Scenario('로그인하지 않은 경우', ({ I }) => {
  // When
  I.amOnPage('/orders');

  // Then
  I.amOnPage('/login');
});
