import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon/dist';

const ProfileAddressEmpty: FC = () => {
  return (
    <Link href="/profile/address/add">
      <a className={`${styles.profileAddress} ${styles.empty}`}>
        <div className={styles.profileAddressAdd}>
          <Icon name="Plus" />
          Добавить новый адрес
        </div>
      </a>
    </Link>
  );
};
export default ProfileAddressEmpty;
