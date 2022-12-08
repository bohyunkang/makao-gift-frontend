import { useForm } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';

import useUserStore from '../hooks/useUserStore';

import Button from './common/Button';
import Input from './common/Input';

export default function LoginForm({ location }) {
  const userStore = useUserStore();

  const [, setAccessToken] = useLocalStorage('accessToken', '');

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, password } = data;

    const accessToken = await userStore.login({ username, password });

    if (userStore.isLoginSuccess) {
      setAccessToken(accessToken);

      if (location.state?.previousPage === 'productDetail') {
        navigate(-1);

        return;
      }

      navigate('/');
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>USER LOGIN</Title>
        <Inputs>
          <Input
            id="input-username"
            type="text"
            name="username"
            placeholder="아이디"
            error={(errors.username && errors.password)
              || errors.username || userStore.isLoginFailed}
            {...register('username', { required: true })}
          />
          <Input
            id="input-password"
            type="password"
            name="password"
            placeholder="비밀번호"
            error={(errors.username && errors.password)
              || errors.password || userStore.isLoginFailed}
            {...register('password', { required: true })}
          />
        </Inputs>
        <Error>
          {errors.username && errors.password && <p>아이디와 비밀번호를 입력해주세요</p>}
          {errors.username && !errors.password && (<p>아이디를 입력해주세요</p>)}
          {!errors.username && errors.password && (<p>비밀번호를 입력해주세요</p>)}
          {userStore.isLoginFailed && (<p>아이디 혹은 비밀번호가 맞지 않습니다</p>)}
        </Error>
        <Button type="submit">로그인하기</Button>
        <Link to="/signup">회원가입</Link>
      </form>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  a {
    display: block;

    margin-top: 60px;

    text-align: center;
  }
`;

const Title = styled.h2`
  padding-block: 4px;

  border-bottom: 1px solid ${((props) => props.theme.colors.primary)};

  font-size: ${((props) => props.theme.size.h1)};
  font-weight: 700;
  text-align: center;
`;

const Inputs = styled.div`
  margin-top: 60px;
`;

const Error = styled.div`
  height: 60px;
  
  p {
    padding-top: 20px;
    
    font-size: 15px;
    color: ${((props) => props.theme.text.red)};
  }
`;
