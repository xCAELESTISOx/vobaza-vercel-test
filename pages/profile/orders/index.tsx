import styles from '../../../styles/Profile.module.scss';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileEmptyField from '../../../components/Profile/EmptyField';
import ProfileOrderItem from '../../../components/Profile/Order/Item';

const tmpItems = [
  {
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
  },
  {
    id: '000003993',
    date: 'от 23 ноября 2021',
    price: '51 990',
    status: 'не оплачен',
    delivery: [
      {
        title: 'Доставка ВоБаза ',
        status: 'аннулирован',
        items: [{}],
      },
    ],
  },
];

export default function ProfileOrders() {
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
              <h2 className={styles.profileSubtitle}>Мои заказы</h2>

              {tmpItems && tmpItems.length > 0 ? (
                <div>
                  {tmpItems.map((item) => (
                    <ProfileOrderItem key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <ProfileEmptyField text="Заказы не найдены" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
