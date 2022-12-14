Feature('주문 상세 페이지');

Scenario('주문 상세 정보를 확인하는 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.makeOrder();

  // When
  I.click('To. 전제나');

  // Then
  I.see('구매수량');
  I.see('총 상품금액');
  I.see('구매일');
  I.see('받는 분');
  I.see('받는 분 주소');
  I.see('받는 분께 보내는 메세지');
});

Scenario('로그인하지 않은 경우', ({ I }) => {
  // When
  I.amOnPage('/order/1');

  // Then
  I.amOnPage('/login');
});
