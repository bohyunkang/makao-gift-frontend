import { useEffect } from 'react';

import useUserStore from '../hooks/useUserStore';

import SignupForm from '../components/SignupForm';

export default function SignupPage() {
  const userStore = useUserStore();

  useEffect(() => () => {
    userStore.resetSignupStatus();
  }, []);

  return (
    <SignupForm />
  );
}
