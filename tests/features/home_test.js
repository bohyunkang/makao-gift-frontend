Feature('기본 홈 페이지');

Scenario('Visit the home page', ({ I }) => {
  // When
  I.amOnPage('/');

  // then
  I.see('Hello, world!');
});
