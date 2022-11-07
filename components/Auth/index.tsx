import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { useDispatch } from 'src/hooks/useDispatch';
import { useSelector } from 'src/hooks/useSelector';
import { login, toggleModal } from 'src/store/auth';

import ModalLayout from '../../src/hoc/withModal';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthModal: FC = () => {
  const [isRegistration, setIsRegistration] = useState(false);

  const isModalOpen = useSelector((state) => state.auth.isModalOpen);
  const dispatch = useDispatch();

  const router = useRouter();

  const toggleIsRegistration = () => {
    setIsRegistration(!isRegistration);
  };
  const onClose = () => {
    dispatch(toggleModal());
    setIsRegistration(false);
  };

  const onSuccess = () => {
    dispatch(login());
    if (
      router.pathname.includes('profile') ||
      router.pathname.includes('cart') ||
      router.pathname.includes('checkout')
    ) {
      router.replace(router.asPath);
    } else {
      router.push('/profile');
    }
    dispatch(toggleModal());
  };

  return (
    <>
      {isModalOpen && (
        <ModalLayout onClose={onClose}>
          {isRegistration ? (
            <RegistrationForm goLogin={toggleIsRegistration} onSuccess={onSuccess} />
          ) : (
            <LoginForm goRegister={toggleIsRegistration} onSuccess={onSuccess} />
          )}
        </ModalLayout>
      )}
    </>
  );
};
export default AuthModal;
