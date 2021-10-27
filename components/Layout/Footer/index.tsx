import React, { FC } from 'react';

import styles from './styles.module.scss';

import Subscription from './Subscription';
import MainFooter from './Main';
import Credentials from './Credentials';

const MainHeader: FC = () => {
  return (
    <footer className={styles.footer}>
      <Subscription />
      <MainFooter />
      <Credentials />
    </footer>
  );
};

export default MainHeader;
