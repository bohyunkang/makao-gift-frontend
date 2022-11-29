export default function SignupForm() {
  return (
    <form>
      <h2>SIGN UP</h2>
      <div>
        <div>
          <label htmlFor="input-name">이름:</label>
          <input id="input-name" type="text" />
          <p>3~7자까지 한글만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-username">아이디:</label>
          <input id="input-username" type="text" />
          <p>영문소문자/숫자, 4~16자만 사용 가능</p>
        </div>
        <div>
          <label htmlFor="input-password">비밀번호:</label>
          <input id="input-password" type="password" />
          <p>8글자 이상의 영문(대소문자), 숫자, 특수문자가 모두 포함되어야 함</p>
        </div>
        <div>
          <label htmlFor="input-confirm-password">비밀번호 확인:</label>
          <input id="input-confirm-password" type="password" />
        </div>
      </div>
      <button type="submit">회원가입</button>
    </form>
  );
}
