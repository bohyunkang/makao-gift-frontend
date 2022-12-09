Feature('주문 페이지');

Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.login();
  I.click('스토어');
  I.click('25,900원');
  I.amOnPage('/products/4');
  I.click('선물하기');
});

Scenario('선물하기 주문 페이지로 이동한 경우', ({ I }) => {
  // When
  I.amOnPage('/order');

  // Then
  I.see('구매수량');
  I.see('총 상품금액');
  I.see('받는 분 성함');
  I.see('받는 분 주소');
  I.see('받는 분께 보내는 메시지');
  I.see('선물하기');
});

Scenario('주문에 성공한 경우', ({ I }) => {
  // When
  I.fillField('받는 분 성함', '전제나');
  I.fillField('받는 분 주소', '서울시 사랑구 행복동 888번지 8층');
  I.fillField('받는 분께 보내는 메시지', '내 소소한 마음이다 잘 받아라');
  I.submit();

  // Then
  I.see('내가 주문한 내역입니다');
  I.see('To.');
});

Scenario('아무 입력 값도 입력하지 않은 경우', ({ I }) => {
  // Given
  I.amOnPage('/order');

  // When
  I.submit();

  // Then
  I.see('성함을 입력해주세요');
  I.see('주소를 입력해주세요');
});

Scenario('성함만 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/order');

  // When
  I.fillField('받는 분 성함', '전제나');
  I.submit();

  // Then
  I.see('주소를 입력해주세요');
});

Scenario('주소만 입력한 경우', ({ I }) => {
  // Given
  I.amOnPage('/order');

  // When
  I.fillField('받는 분 주소', '서울시 사랑구 행복동 888번지 8층');
  I.submit();

  // Then
  I.see('성함을 입력해주세요');
});
