Feature('기본 홈 페이지');

Scenario('로그인하지 않은 경우', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('회원가입');
  I.see('로그인');
});

// Scenario('로그인한 경우', ({ I }) => {
//   // Given
//   I.setupDatabase();

//   // When
//   I.amOnPage('/');
//   I.login();
//   I.amOnPage('/');

//   // Then
//   I.see('내 잔액: 50,000원');
//   I.see('로그아웃');
// });
