import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

export interface IProfile {
  name: string;
  surname: string;
  phone: string;
  email: string;
}
export interface Props {
  user: IProfile;
}

const ProfileData: FC<Props> = ({ user }) => {
  return (
    <div className={styles.profileDataBlock}>
      <div className={styles.profileDataTitle}>Личные данные </div>
      <div>
        <div className={styles.profileDataItem}>
          <div className={styles.profileDataItemTitle}>Имя и Фамилия</div>
          <div className={styles.profileDataItemValue}>
            {user.name} {user.surname}
          </div>
        </div>
        <div className={styles.profileDataItem}>
          <div className={styles.profileDataItemTitle}>E-mail</div>
          <div className={styles.profileDataItemValue}>{user.email || '—'}</div>
        </div>
        <div className={styles.profileDataItem}>
          <div className={styles.profileDataItemTitle}>Телефон</div>
          <div className={styles.profileDataItemValue}>{user.phone}</div>
        </div>
      </div>
      <Link href="/profile/update">
        <a className={styles.profileDataLink}>
          Изменить личные данные <Icon name="ArrowRight" />
        </a>
      </Link>
    </div>
  );
};
export default ProfileData;
