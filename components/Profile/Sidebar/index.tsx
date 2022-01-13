import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';
import { Icon } from '@nebo-team/vobaza.ui.icon';
import { useRouter } from 'next/router';

const ProfileSidebar: FC = () => {
  const router = useRouter();

  return (
    <div className={styles.profileSidebar}>
      <Link href="/profile">
        <a
          className={`${styles.profileSidebarItem} ${
            router.pathname === '/profile' ? styles.active : ''
          }`}
        >
          <Icon name="Home" />
          Главная
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/address">
        <a
          className={`${styles.profileSidebarItem} ${
            router.pathname === '/profile/address' ? styles.active : ''
          }`}
        >
          <Icon name="Geoposition" />
          Мои адреса
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/wishlist">
        <a
          className={`${styles.profileSidebarItem} ${
            router.pathname === '/profile/wishlist' ? styles.active : ''
          }`}
        >
          <Icon name="Favorite" />
          Избранное
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/update">
        <a
          className={`${styles.profileSidebarItem} ${
            router.pathname === '/profile/update' ? styles.active : ''
          }`}
        >
          <Icon name="Identification" />
          Личные данные
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile/orders">
        <a
          className={`${styles.profileSidebarItem} ${
            router.pathname === '/profile/orders' ? styles.active : ''
          }`}
        >
          <Icon name="Box" />
          Мои заказы
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
      <Link href="/profile">
        <a className={`${styles.profileSidebarItem} ${styles.gray}`}>
          <Icon name="Exit" />
          Выйти
          <div className={styles.profileSidebarIcons}>
            <Icon name="SmallArrowUp" style={{ transform: 'rotate(90deg)' }} />
          </div>
        </a>
      </Link>
    </div>
  );
};
export default ProfileSidebar;
