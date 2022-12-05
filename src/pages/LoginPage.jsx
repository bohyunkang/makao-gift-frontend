import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import useUserStore from '../hooks/useUserStore';

import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const userStore = useUserStore();

  const location = useLocation();

  useEffect(() => () => {
    userStore.resetLoginStatus();
  }, []);

  return (
    <LoginForm location={location} />
  );
}
