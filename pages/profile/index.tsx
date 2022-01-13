import { useRouter } from 'next/router';

import styles from '../../styles/Profile.module.scss';

import { Icon } from '@nebo-team/vobaza.ui.icon';
import ProfileSidebar from '../../components/Profile/Sidebar';
import ProfileData from '../../components/Profile/Data';
import ProfileOrderLast from '../../components/Profile/Order/Last';

const tmpItem = {
  id: '000005518',
  date: 'от 13 января 2022 ',
  price: ' 99 680',
  status: 'не оплачен',
  delivery: [
    {
      title: 'Доставка ВоБаза ',
      status: 'открыт',
      items: [{}],
    },
  ],
};
export default function Profile() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
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
                <div className={styles.profileBack} onClick={goBack}>
                  <Icon name="ArrowLeft" /> Назад
                </div>
              </div>
              <h2 className={styles.profileSubtitle}>Здравствуйте, Имя! </h2>
              <ProfileData />
              <ProfileOrderLast item={tmpItem} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
