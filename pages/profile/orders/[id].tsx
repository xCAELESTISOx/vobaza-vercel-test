import styles from '../../../styles/Profile.module.scss';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileOrder from '../../../components/Profile/Order';

const tmpItem = {
  id: '000005518',
  date: 'от 13 января 2022 ',
  price: ' 99 680',
  status: 'не оплачен',
  delivery: [
    {
      title: 'Доставка ВоБаза ',
      status: 'открыт',
      items: [{}, {}],
    },
    {
      title: 'Доставка ВоБаза ',
      status: 'открыт',
      items: [{}],
    },
  ],
};

export default function ProfileOrderInfo() {
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
              <ProfileOrder item={tmpItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
