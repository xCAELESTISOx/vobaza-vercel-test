import { FC } from 'react';
import Link from 'next/link';

import styles from './styles.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';

const ProfileData: FC = () => {
  return (
    <div className={styles.profileDataBlock}>
      <div className={styles.profileDataTitle}>Личные данные </div>
      <div>
        <div className={styles.profileDataItem}>
          <div className={styles.profileDataItemTitle}>Имя и Фамилия</div>
          <div className={styles.profileDataItemValue}>Анастасия ф</div>
        </div>
        <div className={styles.profileDataItem}>
          <div className={styles.profileDataItemTitle}>E-mail</div>
          <div className={styles.profileDataItemValue}>
            fadeeva1@immelman.ru
          </div>
        </div>
        <div className={styles.profileDataItem}>
          <div className={styles.profileDataItemTitle}>Телефон</div>
          <div className={styles.profileDataItemValue}>+7(999)999-99-99</div>
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
