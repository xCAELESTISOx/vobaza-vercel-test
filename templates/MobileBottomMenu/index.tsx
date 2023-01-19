import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

import { useSelector } from 'shared/lib/hooks/useSelector';
import { useDispatch } from 'shared/lib/hooks/useDispatch';
import { toogleMobCatalog } from 'src/store/goods';
import ProfileMenu from 'components/Profile/Menu';
import { toggleModal } from 'src/store/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import styles from './styles.module.scss';

export const MobileBottomMenu: FC = () => {
  const router = useRouter();
  const [isProfileMenuOpen, setIsProfileOpen] = useState(false);

  const favoriteIds = useSelector((state) => state.goods.favoriteIds);
  const cartSize = useSelector((state) => state.goods.cartSize);
  const compareIds = useSelector((state) => state.goods.compareIds);
  const [activeTab, setActiveTab] = useState('');
  const tab = router.asPath;

  const dispatch = useDispatch();

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

  const updateActiveTab = (tab) => {
    if (tab === '/') setActiveTab('MAIN');
    else if (tab.includes('/cart')) setActiveTab('CART');
    else if (tab.includes('/wishlist')) setActiveTab('WISHLIST');
    else if (tab.includes('/compare')) setActiveTab('COMPARE');
    else if (tab.includes('/profile')) setActiveTab('PROFILE');
    else setActiveTab('');
  };

  useEffect(() => {
    if (isProfileMenuOpen) setIsProfileOpen(false);
    updateActiveTab(tab);
  }, [router.asPath]);

  return (
    <>
      <ProfileMenu isOpen={isProfileMenuOpen} close={toggleProfileMenu} />
      <div className={styles.tabbar}>
        <Link href="/">
          <a className={`${styles.tab} ${activeTab === 'MAIN' ? styles.tabActive : ''}`} onClick={closeMenu}>
            <div className={styles.tabIcon}>
              <Icon name="SmallLogo" />
            </div>

            <div className={styles.tabTitle}>Главная</div>
          </a>
        </Link>
        <Link href="/cart">
          <a className={`${styles.tab} ${activeTab === 'CART' ? styles.tabActive : ''}`}>
            <div className={styles.tabIcon}>
              <Icon name="Cart" />
              {cartSize > 0 && <div className={styles.tabBadge}>{cartSize}</div>}
            </div>
            <div className={styles.tabTitle}>Корзина</div>
          </a>
        </Link>
        <Link href="/profile/wishlist">
          <a className={`${styles.tab} ${activeTab === 'WISHLIST' ? styles.tabActive : ''}`}>
            <div className={styles.tabIcon}>
              <Icon name="Favorite" />
              {favoriteIds?.length > 0 && <div className={styles.tabBadge}>{favoriteIds.length}</div>}
            </div>
            <div className={styles.tabTitle}>Избранное</div>
          </a>
        </Link>
        <Link href="/compare">
          <a className={`${styles.tab} ${activeTab === 'COMPARE' ? styles.tabActive : ''}`} onClick={closeMenu}>
            <div className={styles.tabIcon}>
              <Icon name="Compare" />
              {compareIds && compareIds.length > 0 && <span className={styles.tabBadge}>{compareIds.length}</span>}
            </div>
            <div className={styles.tabTitle}>Сравнение</div>
          </a>
        </Link>
        <div className={`${styles.tab} ${activeTab === 'PROFILE' ? styles.tabActive : ''}`} onClick={profileClickHandler}>
          <div className={styles.tabIcon}>
            <Icon name="Person" />
          </div>
          <div className={styles.tabTitle}>Профиль</div>
        </div>
      </div>
    </>
  );
};
