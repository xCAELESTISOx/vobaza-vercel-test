import React from 'react';

import styles from './styles.module.scss';
import { AuthProvider } from '../../src/context/auth';

import { MainHead } from './MainHead';
import Header from './Header';
import Footer from './Footer';
import BottomTabBar from './BottomTabBar';
import AuthModal from '../Auth';

interface ILayoutChildren {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutChildren) {
  return (
    <AuthProvider>
      <AuthModal />
      <MainHead />
      <Header />
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
      <BottomTabBar />
    </AuthProvider>
  );
}
