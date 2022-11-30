import React, { useState } from 'react';
import { Provider } from 'react-redux';

import { MobileBottomMenu } from 'templates/MobileBottomMenu';
import PhoneCallModal from './PhoneCallModal';
import { MainHead } from './MainHead';
import AuthModal from '../Auth';
import store from 'src/store';
import Footer from '../../templates/Footer';

import styles from './styles.module.scss';
import Header from 'templates/Header';

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
