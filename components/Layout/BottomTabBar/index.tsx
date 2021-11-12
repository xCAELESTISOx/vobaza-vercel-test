import React, { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

const BottomTabBar: FC = () => {
  const openMenu = () => {
    //TODO openMenu
  };
  const openProfile = () => {
    //TODO check token and openProfile
  };

  return (
    <div className={styles.tabbar}>
      <Link href="/">
        <a className={styles.tab}>
          <Icon name="SmallLogo" />
          <div className={styles.tabTitle}>Главная</div>
        </a>
      </Link>
      <div className={styles.tab} onClick={openMenu}>
        <Icon name="Catalog" />
        <div className={styles.tabTitle}>Каталог</div>
      </div>
      <Link href="/cart">
        <a className={styles.tab}>
          <Icon name="Cart" />
          <div className={styles.tabTitle}>Корзина</div>
        </a>
      </Link>
      <Link href="/wishlist">
        <a className={styles.tab}>
          <Icon name="Favorite" />
          <div className={styles.tabTitle}>Избранное</div>
        </a>
      </Link>
      <div className={styles.tab} onClick={openProfile}>
        <Icon name="Person" />
        <div className={styles.tabTitle}>Профиль</div>
      </div>
    </div>
  );
};

export default BottomTabBar;
