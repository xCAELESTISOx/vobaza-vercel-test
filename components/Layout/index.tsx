import React, { useState } from 'react';

import styles from './styles.module.scss';
import { AuthProvider } from '../../src/context/auth';

import { MainHead } from './MainHead';
import Header from './Header';
import Footer from './Footer';
import BottomTabBar from './BottomTabBar';
import AuthModal from '../Auth';
import PhoneCallModal from './PhoneCallModal';

interface ILayoutChildren {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutChildren) {
  const [isPhoneCallOpen, setIsPhoneCallOpen] = useState(false);

  const toggleIsPhoneCall = () => {
    setIsPhoneCallOpen(!isPhoneCallOpen);
  };

  return (
    <AuthProvider>
      <AuthModal />
      <PhoneCallModal isActive={isPhoneCallOpen} onClose={toggleIsPhoneCall} />
      <MainHead />
      <Header openPhoneCallModal={toggleIsPhoneCall} />
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer openPhoneCallModal={toggleIsPhoneCall} />
      <BottomTabBar />
    </AuthProvider>
  );
}
