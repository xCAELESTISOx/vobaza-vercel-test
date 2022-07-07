import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

import styles from './styles.module.scss';
import { useAuth } from '../../../../src/context/auth';
import { useGoods } from '../../../../src/context/goods';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import Search from '../Search';
import HeaderMobileMenu from '../MobileMenu';
import CitySelect from '../CitySelect';

type Props = {
  mobileCategories: any[];
  openPhoneCallModal: () => void;
};

const MainHeader: FC<Props> = ({ mobileCategories, openPhoneCallModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { state, dispatch } = useAuth();
  const useGoodsObj = useGoods();
  const { favoriteIds, compareIds, cartSize, activeMobCatalog } = useGoodsObj.state;

  const openAuthModal = () => {
    dispatch({ type: 'toggleModal' });
  };
  const toggleMenu = () => {
    useGoodsObj.dispatch({ type: 'toogleMobCatalog', payload: !activeMobCatalog });
  };

  useEffect(() => {
    if (!state.isLoggedIn) {
      setIsLoggedIn(!!Cookies.get('token'));
    } else {
      setIsLoggedIn(state.isLoggedIn);
    }
  }, [state.isLoggedIn]);

  return (
    <div className="container">
      <HeaderMobileMenu
        isOpen={activeMobCatalog}
        rootMenu={mobileCategories}
        close={toggleMenu}
      />
      <div className={`${styles.mainHeader}`}>
        <div className={styles.mainHeaderMobile}>
          <button className={styles.burgerMenu} onClick={toggleMenu}>
            <Icon name="MenuBurger" />
          </button>
          <Link href="/">
            <a className={styles.logo}>
              <Icon name="VobazaLogo" />
            </a>
          </Link>
          <a href="tel:+74951725578" className={styles.phoneButton}>
            <Icon name="Phone" />
          </a>
        </div>
        <div className={styles.headerCity}>
          <CitySelect />
        </div>
        <div className={styles.headerSearch}>
          <Search />
        </div>
        <div className={styles.phoneWraper}>
          <div className={styles.phone}>+7(495) 172-57-64</div>
          <div className={styles.phoneLink} onClick={openPhoneCallModal}>
            Заказать звонок
          </div>
        </div>
        <div className={styles.headerButtons}>
          {isLoggedIn ? (
            <div className={styles.headerButton}>
              <Link href="/profile">
                <a className={styles.headerButton}>
                  <Icon name="Person"></Icon>
                  <span>Профиль</span>
                </a>
              </Link>
            </div>
          ) : (
            <div className={styles.headerButton} onClick={openAuthModal}>
              <Icon name="Person"></Icon>
              <span>Войти</span>
            </div>
          )}
          <Link href="/profile/wishlist">
            <a className={styles.headerButton}>
              <Icon name="Favorite"></Icon>
              <span>Избранное</span>
              {favoriteIds && favoriteIds.length > 0 && (
                <span className={styles.headerButtonBadge}>
                  {favoriteIds.length}
                </span>
              )}
            </a>
          </Link>
          <Link href="/compare">
            <a className={styles.headerButton}>
              <Icon name="Compare"></Icon>
              <span>Сравнение</span>
              {compareIds && compareIds.length > 0 && (
                <span className={styles.headerButtonBadge}>
                  {compareIds.length}
                </span>
              )}
            </a>
          </Link>
          <Link href="/cart">
            <a className={styles.headerButton}>
              <Icon name="Cart"></Icon>
              <span>Корзина</span>
              {cartSize > 0 && (
                <span className={styles.headerButtonBadge}>{cartSize}</span>
              )}
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.headerSearchFull}>
        <Search />
      </div>
    </div>
  );
};

export default MainHeader;
