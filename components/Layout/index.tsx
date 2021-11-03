import React from 'react';

import styles from './styles.module.scss';

import { MainHead } from './MainHead';
import Header from './Header';
import Footer from './Footer';
import BottomTabBar from './BottomTabBar';

interface ILayoutChildren {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutChildren) {
  return (
    <>
      <MainHead />
      <Header />
      <div className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
      <Footer />
      <BottomTabBar />
    </>
  );
}
