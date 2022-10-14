import React, { useState } from 'react';

import { AuthProvider } from '../../src/context/auth';
import { GoodsProvider } from '../../src/context/goods';

import { MobileBottomMenu } from './MobileBottomMenu';
import PhoneCallModal from './PhoneCallModal';
import { MainHead } from './MainHead';
import AuthModal from '../Auth';
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
    <AuthProvider>
      <MainHead />
      <PhoneCallModal isActive={isPhoneCallOpen} onClose={toggleIsPhoneCall} />
      <GoodsProvider>
        <AuthModal />
        <Header openPhoneCallModal={toggleIsPhoneCall} />
        <div className={styles.layout}>
          <div className={styles.content}>{children}</div>
        </div>
        <MobileBottomMenu />
      </GoodsProvider>
      <Footer openPhoneCallModal={toggleIsPhoneCall} />
    </AuthProvider>
  );
}
