import Link from 'next/link';

import styles from '../../styles/Profile.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileUpdateForm from '../../components/Profile/UpdateForm';

export default function ProfileWishlist() {
  return (
    <div>
      <div className="container">
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>Профиль</h2>
          <div className={styles.profileContent}>
            <div className={styles.profileSidebarBlock}>
              <ProfileSidebar />
            </div>
            <div className={styles.profileContentBlock}>
              <div className={styles.profileTop}>
                <Link href="/profile">
                  <a className={styles.profileBack}>
                    <Icon name="ArrowLeft" /> Назад
                  </a>
                </Link>
              </div>
              <h2 className={styles.profileSubtitle}>Личные данные </h2>
              <ProfileUpdateForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
