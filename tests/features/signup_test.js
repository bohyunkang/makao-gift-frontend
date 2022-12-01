Feature('회원가입 페이지');

// Before(({ I }) => {
//   I.amOnPage('/');
//   I.click('회원가입');
// });

// Scenario('회원가입 페이지에 접속한 경우', ({ I }) => {
//   // When
//   I.amOnPage('/signup');

//   // Then
//   I.see('SIGN UP');
//   I.see('이름');
//   I.see('아이디');
//   I.see('비밀번호');
//   I.see('비밀번호 확인');
//   I.see('3~7자까지 한글만 사용 가능');
//   I.see('영문 소문자/숫자, 4~16자만 사용 가능');
//   I.see('8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함');
//   I.see('회원가입');
// });

// Scenario('회원 가입 폼을 하나도 입력하지 않고 회원 가입을 시도한 경우', ({ I }) => {
//   // When
//   I.amOnPage('/signup');
//   I.click('회원가입');

//   // Then
//   I.see('이름을 입력해주세요');
//   I.see('아이디를 입력해주세요');
//   I.see('비밀번호를 입력해주세요');
//   I.see('비밀번호를 입력해주세요');
// });

// Scenario('작성한 아이디가 중복된 아이디의 경우', ({ I }) => {
//   // Given
//   I.setupDatabase();

//   // When
//   I.amOnPage('/signup');
//   I.fillField('이름', '강보니');
//   I.fillField('아이디', 'boni1234');
//   I.fillField('비밀번호', 'Test1234!');
//   I.fillField('비밀번호 확인', 'Test1234!');
//   I.click('회원가입');

//   // Then
//   I.see('해당 아이디는 사용할 수 없습니다');
// });

// Scenario('작성한 이름의 글자 수가 3~7자가 아닌 경우', ({ I }) => {
//   // When
//   I.amOnPage('/signup');
//   I.fillField('이름', '강보니미미미미미미치고싶어');
//   I.fillField('아이디', 'boni1234');
//   I.fillField('비밀번호', 'Test1234!');
//   I.fillField('비밀번호 확인', 'Test1234!');
//   I.click('회원가입');

//   // Then
//   I.see('회원가입 성공한 경우');
// });

// Scenario('작성한 아이디의 형식이 영문소문자/숫자, 4~16자가 아닌 경우', ({ I }) => {
//   // When
//   I.amOnPage('/signup');
//   I.fillField('이름', '강보니');
//   I.fillField('아이디', '한국어로아이디가되려나');
//   I.fillField('비밀번호', 'Test1234!');
//   I.fillField('비밀번호 확인', 'Test1234!');
//   I.click('회원가입');

//   // Then
//   I.see('아이디를 다시 확인해주세요');
// });

// Scenario('작성한 비밀번호의 형식이 8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되지 않은 경우', ({ I }) => {
//   // When
//   I.amOnPage('/signup');
//   I.fillField('이름', '강보니');
//   I.fillField('아이디', 'boni1234');
//   I.fillField('비밀번호', 'test');
//   I.fillField('비밀번호 확인', 'test');
//   I.click('회원가입');

//   // Then
//   I.see('비밀번호를 다시 확인해주세요');
// });

// Scenario('비밀번호와 비밀번호 확인란의 내용이 일치하지 않는 경우', ({ I }) => {
//   // When
//   I.amOnPage('/signup');
//   I.fillField('이름', '강보니');
//   I.fillField('아이디', 'boni1234');
//   I.fillField('비밀번호', 'Test1234!');
//   I.fillField('비밀번호 확인', 'xxxx');
//   I.click('회원가입');

//   // Then
//   I.see('비밀번호가 일치하지 않습니다');
// });

// Scenario('회원가입 성공한 경우', ({ I }) => {
//   // Given
//   I.amOnPage('/signup');

//   // When
//   I.fillField('이름', '강보니');
//   I.fillField('아이디', 'boni1234');
//   I.fillField('비밀번호', 'Test1234!');
//   I.fillField('비밀번호 확인', 'Test1234!');
//   I.click('회원가입');

//   // Then
//   I.see('회원가입 완료');
//   I.see('로그인하기');
// });
