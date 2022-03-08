import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useAuth } from '../../src/context/auth';
import ModalLayout from '../../src/hoc/withModal';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthModal: FC = () => {
  const router = useRouter();
  const [isRegistration, setIsRegistration] = useState(false);
  const { state, dispatch } = useAuth();
  const { isModalOpen } = state;

  const toggleIsRegistration = () => {
    setIsRegistration(!isRegistration);
  };
  const onClose = () => {
    dispatch({ type: 'toggleModal' });
    setIsRegistration(false);
  };

  const onSuccess = async () => {
    await dispatch({ type: 'login' });
    if (
      router.pathname.includes('profile') ||
      router.pathname.includes('cart') ||
      router.pathname.includes('checkout')
    ) {
      router.replace(router.asPath);
    } else {
      router.push('/profile');
    }
  };

  return (
    <>
      {isModalOpen && (
        <ModalLayout onClose={onClose}>
          {isRegistration ? (
            <RegistrationForm
              goLogin={toggleIsRegistration}
              onSuccess={onSuccess}
            />
          ) : (
            <LoginForm
              goRegister={toggleIsRegistration}
              onSuccess={onSuccess}
            />
          )}
        </ModalLayout>
      )}
    </>
  );
};
export default AuthModal;
