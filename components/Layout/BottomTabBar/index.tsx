import React, { FC, useState } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { useAuth } from '../../../src/context/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import ProfileMenu from '../../Profile/Menu';

const BottomTabBar: FC = () => {
  const [isProfileMenuOpen, setIsProfileOpen] = useState(false);
  const { state, dispatch } = useAuth();
  const { user } = state;

  const openMenu = () => {
    //TODO openMenu
  };
  const profileClickHandler = () => {
    if (user) {
      toggleProfileMenu();
    } else {
      dispatch({ type: 'toggleModal' });
    }
  };
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileMenuOpen);
  };

  return (
    <>
      <ProfileMenu isOpen={isProfileMenuOpen} close={toggleProfileMenu} />
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
        <Link href="/profile/wishlist">
          <a className={styles.tab}>
            <Icon name="Favorite" />
            <div className={styles.tabTitle}>Избранное</div>
          </a>
        </Link>
        <div className={styles.tab} onClick={profileClickHandler}>
          <Icon name="Person" />
          <div className={styles.tabTitle}>Профиль</div>
        </div>
      </div>
    </>
  );
};

export default BottomTabBar;
