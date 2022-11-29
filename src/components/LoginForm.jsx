import { Link } from 'react-router-dom';

export default function LoginForm() {
  return (
    <form>
      <h2>USER LOGIN</h2>
      <div>
        <div>
          <label htmlFor="input-username">아이디</label>
          <input id="input-username" type="text" />
        </div>
        <div>
          <label htmlFor="input-password">비밀번호</label>
          <input id="input-password" type="password" />
        </div>
      </div>
      <button type="submit">로그인하기</button>
      <Link to="/signup">회원가입</Link>
    </form>
  );
}
