import styles from '../../styles/Profile.module.scss';

import ProfileSidebar from '../../components/Profile/Sidebar';

export default function Profile() {
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
              <h1>Профиль</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
