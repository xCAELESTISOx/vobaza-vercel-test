import React, { FC } from 'react';

import styles from './styles.module.scss';

import UpBlock from './Up';
import Contacts from './Contacts';
import Subscription from './Subscription';
import Socials from './Socials';
import MainFooter from './Main';
import Credentials from './Credentials';

const MainHeader: FC = () => {
  return (
    <footer className={styles.footer}>
      <UpBlock />
      <Contacts />
      <Subscription />
      <Socials />
      <MainFooter />
      <Credentials />
    </footer>
  );
};

export default MainHeader;
