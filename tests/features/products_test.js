Feature('스토어(상품 목록) 페이지');

Scenario('로그인하지 않고 상품 목록을 확인하는 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('스토어');

  // then
  I.see('인기선물을 한 자리에 모았어요');
  I.see('회원가입');
  I.see('로그인');
});

// Scenario('로그인하고 상품 목록을 확인하는 경우', ({ I }) => {
//   // Given
//   I.setupDatabase();
//   I.amOnPage('/');

//   // When
//   I.login();
//   I.click('스토어');

//   // then
//   I.see('인기선물을 한 자리에 모았어요');
//   I.see('내 잔액: 50,000원');
//   I.see('로그아웃');
// });

Scenario('상품이 존재하지 않는 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('스토어');

  // then
  I.see('상품이 존재하지 않습니다');
});
