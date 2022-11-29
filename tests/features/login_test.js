Feature('로그인 페이지');

Scenario('로그인 페이지에 접속한 경우', ({ I }) => {
  // Given
  I.amOnPage('/');

  // When
  I.click('로그인');

  // Then
  I.see('USER LOGIN');
  I.see('아이디');
  I.see('비밀번호');
  I.see('3~7자까지 한글만 사용 가능');
  I.see('영문 소문자/숫자, 4~16자만 사용 가능');
  I.see('8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함');
  I.see('로그인하기');
  I.see('회원가입');
});

Scenario('잘못된 아이디나 비밀번호를 입력한 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('로그인');
  I.amOnPage('/login');

  I.fillField('아이디', 'xxx');
  I.fillField('비밀번호', 'xxx');

  I.click('[type=submit]');

  // Then
  I.see('아이디 혹은 비밀번호가 맞지 않습니다');
});

Scenario('아이디를 입력하지 않은 채 로그인을 시도하는 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('로그인');
  I.amOnPage('/login');

  I.fillField('비밀번호', 'Test1234!');

  I.click('[type=submit]');

  // Then
  I.see('아이디를 입력해주세요');
});

Scenario('비밀번호를 입력하지 않은 채 로그인을 시도하는 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('로그인');
  I.amOnPage('/login');

  I.fillField('아이디', 'boni1234');

  I.click('[type=submit]');

  // Then
  I.see('비밀번호를 입력해주세요');
});

Scenario('회원가입 버튼을 클릭한 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('로그인');
  I.amOnPage('/login');
  I.click('회원가입');

  // Then
  I.amOnPage('/signup');
});

Scenario('로그인에 성공한 경우', ({ I }) => {
  // Given
  I.setupDatabase();
  I.amOnPage('/');

  // When
  I.click('로그인');
  I.amOnPage('/login');

  I.fillField('아이디', 'boni1234');
  I.fillField('비밀번호', 'Test1234!');

  I.click('[type=submit]');

  // Then
  I.amOnPage('/');
  I.see('내 잔액: 50,000원');
  I.see('로그아웃');
});
