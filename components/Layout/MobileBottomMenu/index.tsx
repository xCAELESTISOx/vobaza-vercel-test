import React, { FC, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { useSelector } from 'src/hooks/useSelector';
import { useDispatch } from 'src/hooks/useDispatch';
import { toogleMobCatalog } from 'src/store/goods';
import { toggleModal } from 'src/store/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import ProfileMenu from '../../Profile/Menu';

import styles from './styles.module.scss';

export const MobileBottomMenu: FC = () => {
  const [isProfileMenuOpen, setIsProfileOpen] = useState(false);

  const activeMobCatalog = useSelector((state) => state.goods.activeMobCatalog);
  const favoriteIds = useSelector((state) => state.goods.favoriteIds);
  const cartSize = useSelector((state) => state.goods.cartSize);

  const dispatch = useDispatch();

  const openMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();

    dispatch(toogleMobCatalog(!activeMobCatalog));
  };
  const closeMenu = () => {
    dispatch(toogleMobCatalog(false));
  };
  const profileClickHandler = () => {
    if (Cookies.get('token')) {
      toggleProfileMenu();
    } else {
      dispatch(toggleModal());
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
          <a className={styles.tab} onClick={closeMenu}>
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
            <div className={styles.tabIcon}>
              <Icon name="Cart" />
              {cartSize > 0 && <div className={styles.tabBadge}>{cartSize}</div>}
            </div>
            <div className={styles.tabTitle}>Корзина</div>
          </a>
        </Link>
        <Link href="/profile/wishlist">
          <a className={styles.tab}>
            <div className={styles.tabIcon}>
              <Icon name="Favorite" />
              {favoriteIds.length > 0 && <div className={styles.tabBadge}>{favoriteIds.length}</div>}
            </div>
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
