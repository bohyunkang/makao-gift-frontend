Feature('상품 상세 페이지');

Before(({ I }) => {
  I.setupDatabase();
  I.amOnPage('/');
  I.click('스토어');
});

Scenario('상품 세부 정보를 확인하기 위해 아이템을 클릭한 경우', ({ I }) => {
  // When
  I.click('10,000원');

  // Then
  I.amOnPage('/products/1');
  I.see('제조사');
  I.see('10,000원');
  I.see('구매수량');
  I.see('상품설명');
  I.see('총 상품금액');
});

Scenario('로그인하지 않고 선물하기를 클릭하는 경우', ({ I }) => {
  // When
  I.click('10,000원');
  I.amOnPage('/products/1');
  I.click('선물하기');

  // Then
  I.amOnPage('/login');
});

Scenario('로그인하고 선물하기를 클릭할 때 잔액이 충분한 경우', ({ I }) => {
  // Given
  I.changeUserAmount({ userId: 1, amount: 0 });
  I.click('10,000원');

  // When
  I.amOnPage('/products/1');
  I.click('선물하기');

  // Then
  I.see('❌잔액이 부족하여 선물하기가 불가합니다❌');
});
