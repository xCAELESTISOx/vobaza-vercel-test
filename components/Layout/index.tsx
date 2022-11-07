import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { MobileBottomMenu } from './MobileBottomMenu';
import PhoneCallModal from './PhoneCallModal';
import { MainHead } from './MainHead';
import AuthModal from '../Auth';
import store from 'src/store';
import Header from './Header';
import Footer from './Footer';

import styles from './styles.module.scss';

interface ILayoutChildren {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutChildren) {
  const [isPhoneCallOpen, setIsPhoneCallOpen] = useState(false);

  const toggleIsPhoneCall = () => {
    setIsPhoneCallOpen(!isPhoneCallOpen);
  };

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
