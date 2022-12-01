import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FC } from 'react';

import { useDispatch } from 'src/hooks/useDispatch';
import { useSelector } from 'src/hooks/useSelector';
import { setCartSize, setCompare, setFavorites } from 'src/store/goods';
import { logout as logoutUser } from 'src/store/auth';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

import { api } from '../../../assets/api';
import styles from './styles.module.scss';

const ProfileSidebar: FC = () => {
  const favoriteIds = useSelector((state) => state.goods.favoriteIds);
  const dispatch = useDispatch();

  const router = useRouter();

  const logout = () => {
    try {
      if (Cookies.get('token')) {
        api.logout();
        Cookies.remove('token');
      }
      dispatch(logoutUser());
      Cookies.remove('guestToken');
      dispatch(setFavorites([]));
      dispatch(setCartSize(0));
      dispatch(setCompare([]));
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.profileSidebar}>
      <Link href="/profile">
        <a className={`${styles.profileSidebarItem} ${router.pathname === '/profile' ? styles.active : ''}`}>
          <Icon name="Home" />
          Главная
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/address">
        <a className={`${styles.profileSidebarItem} ${router.pathname === '/profile/address' ? styles.active : ''}`}>
          <Icon name="Geoposition" />
          Мои адреса
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/wishlist">
        <a className={`${styles.profileSidebarItem} ${router.pathname === '/profile/wishlist' ? styles.active : ''}`}>
          <Icon name="Favorite" />
          Избранное
          {favoriteIds?.length > 0 && <div className={styles.profileSidebarBadge}>{favoriteIds.length}</div>}
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/update">
        <a className={`${styles.profileSidebarItem} ${router.pathname === '/profile/update' ? styles.active : ''}`}>
          <Icon name="Identification" />
          Личные данные
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/orders">
        <a className={`${styles.profileSidebarItem} ${router.pathname === '/profile/orders' ? styles.active : ''}`}>
          <Icon name="Box" />
          Мои заказы
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <div className={`${styles.profileSidebarItem} ${styles.gray}`} onClick={logout}>
        <Icon name="Exit" />
        Выйти
        <div className={styles.profileSidebarIcons}>
          <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
        </div>
      </div>
    </div>
  );
};
export default ProfileSidebar;
