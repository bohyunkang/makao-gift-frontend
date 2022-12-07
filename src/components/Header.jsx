import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';

import { numberFormat } from '../utils/format';

export default function Header() {
  const userStore = useUserStore();

  const { amount } = userStore;

  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const handleLogout = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <Nav>
        <List>
          <li>
            <h1>
              <Link to="/">선물하기</Link>
            </h1>
          </li>
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/products">스토어</Link>
          </li>
          <li>
            <Link to="/orders">주문조회</Link>
          </li>
        </List>
        {accessToken ? (
          <List>
            <li>
              <p>
                내 잔액:
                {' '}
                {numberFormat(amount)}
                원
              </p>
            </li>
            <li>
              <Button type="button" onClick={handleLogout}>로그아웃</Button>
            </li>
          </List>
        ) : (
          <List>
            <li>
              <Link to="/signup">회원가입</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </List>
        )}
      </Nav>
    </Container>
  );
}

const Container = styled.header`
  height: 64px;

  border-bottom: 1px solid ${((props) => props.theme.colors.border)};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 100%;

  padding-inline: 10em;

  font-size: 1em;
  font-weight: 700;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: 1.5em;

  h1 {
    font-size: 1.5em;
  }
`;

const Button = styled.button`
  color: ${((props) => props.theme.text.primary)};
  background-color: inherit;
  border: none;
  cursor: pointer;

  font-size: 1em;
  font-weight: 700;
`;
