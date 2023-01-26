import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';

import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { useSelector } from 'shared/lib/hooks/useSelector';
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isModalOpen]);

  return (
    <div style={!isModalOpen ? { display: 'none' } : {}}>
      <ModalLayout onClose={onClose} isFloat>
        {isRegistration ? (
          <RegistrationForm goLogin={toggleIsRegistration} onSuccess={onSuccess} />
        ) : (
          <LoginForm goRegister={toggleIsRegistration} onSuccess={onSuccess} />
        )}
      </ModalLayout>
    </div>
  );
};
export default AuthModal;
