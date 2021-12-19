import { FC, useState } from 'react';

import { useAuth } from '../../src/context/auth';
import ModalLayout from '../../src/hoc/withModal';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthModal: FC = () => {
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

  return (
    <>
      {isModalOpen && (
        <ModalLayout onClose={onClose}>
          {isRegistration ? (
            <RegistrationForm goLogin={toggleIsRegistration} />
          ) : (
            <LoginForm goRegister={toggleIsRegistration} />
          )}
        </ModalLayout>
      )}
    </>
  );
};
export default AuthModal;
