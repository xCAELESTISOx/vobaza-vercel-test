import { GetServerSideProps } from 'next';

import type { IOrderItem } from '../../../src/models/IOrder';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileEmptyField from '../../../components/Profile/EmptyField';
import ProfileOrderItem from '../../../components/Profile/Order/Item';

import checkAuth from '../../../assets/api/auth';
import { api } from '../../../assets/api';

import styles from '../../../styles/Profile.module.scss';

type Props = {
  orders: IOrderItem[];
};

export default function ProfileOrders({ orders }) {
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

              {orders && orders.length > 0 ? (
                <div>
                  {orders.map((order) => (
                    <ProfileOrderItem key={order.id} order={order} />
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

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  let orders = [];

  try {
    await checkAuth(req);
    const ordersRes = await api.getOrders();

    orders = ordersRes.data.data.map((order: IOrderItem) => {
      return {
        ...order,
        price: order.price / 100,
      };
    });
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      orders,
    },
  };
};
