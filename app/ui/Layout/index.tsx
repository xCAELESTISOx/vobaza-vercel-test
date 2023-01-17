import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { MobileBottomMenu } from 'templates/MobileBottomMenu';
import PhoneCallModal from 'shared/ui/PhoneCallModal';
import AuthModal from '../../../components/Auth';
import Footer from '../../../templates/Footer';
import Header from 'templates/Header';
import { MainHead } from './MainHead';

import styles from './styles.module.scss';
import store from 'src/store';

interface ILayoutChildren {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutChildren) {
  const [isPhoneCallOpen, setIsPhoneCallOpen] = useState(false);

  const toggleIsPhoneCall = () => setIsPhoneCallOpen((prev) => !prev);

  return (
    <Provider store={store}>
      <MainHead />
      <PhoneCallModal isActive={isPhoneCallOpen} onClose={toggleIsPhoneCall} />
      <AuthModal />
      <Header openPhoneCallModal={toggleIsPhoneCall} />
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
      <MobileBottomMenu />
      <Footer openPhoneCallModal={toggleIsPhoneCall} />
    </Provider>
  );
}
