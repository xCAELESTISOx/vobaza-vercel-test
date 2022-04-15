import React, { FC, useEffect } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';
import ProfileSidebar from '../Sidebar';

type Props = {
  isOpen?: boolean;
  close: () => void;
};

const ProfileMenu: FC<Props> = ({ isOpen, close }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.profileMobileMenu} ${isOpen ? styles.active : ''}`}
    >
      <div className={`${styles.profileMobileMenuHeader}`}>
        <button className={styles.profileMobileMenuClose} onClick={close}>
          <Icon name="Cross" />
        </button>
        <Link href="/">
          <a className={styles.profileMobileMenuLogo}>
            <Icon name="VobazaLogo" />
          </a>
        </Link>
        <a className={styles.profileMobileMenuPhone} href="tel:+74951725625">
          <Icon name="Phone" />
        </a>
      </div>
      <div>
        <div className={styles.profileMobileMenuTitle}>Профиль</div>
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default ProfileMenu;
