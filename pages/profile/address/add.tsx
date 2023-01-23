import styles from 'app/styles/Profile.module.scss';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import { AuthorizedAddressForm } from 'widgets/profile';

export default function ProfileAddressAdd() {
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
              <h2 className={styles.profileSubtitle}>Мои адреса</h2>
              <AuthorizedAddressForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
