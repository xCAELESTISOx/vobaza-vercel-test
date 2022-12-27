import { GetServerSideProps } from 'next';

import type { IOrder } from '../../../src/models/IOrder';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileEmptyField from '../../../components/Profile/EmptyField';
import ProfileOrderItem from '../../../components/Profile/Order/Item';

import checkAuth from '../../../app/api/auth';
import { api } from '../../../app/api';
import styles from 'app/styles/Profile.module.scss';

type IProps = {
  orders: IOrder[];
};

export default function ProfileOrders({ orders }: IProps) {
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

export const getServerSideProps: GetServerSideProps<IProps> = async ({ req }) => {
  let orders = [];

  try {
    const authorized = await checkAuth(req);
    if (!authorized)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    const ordersRes = await api.getOrders();

    orders = ordersRes.data.data.map((order: IOrder) => {
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
