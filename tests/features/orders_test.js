Feature('주문 내역 페이지');

Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
});

Scenario('주문한 내역이 하나도 없는 경우', ({ I }) => {
  // Given
  I.login();
  I.click('주문조회');

  // When
  I.amOnPage('/order');

  // Then
  I.see('내가 주문한 내역이 없습니다');
});

Scenario('주문한 내역이 있는 경우', ({ I }) => {
  // When
  I.makeOrder();
  I.click('주문조회');

  // Then
  I.amOnPage('/orders');
  I.see('내가 주문한 내역입니다');
  I.see('To. 전제나');
});

Scenario('로그인하지 않은 경우', ({ I }) => {
  // When
  I.amOnPage('/order');

  // Then
  I.amOnPage('/login');
});
