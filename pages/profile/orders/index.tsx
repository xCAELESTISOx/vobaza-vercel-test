import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import type { IOrder } from '../../../src/models/IOrder';
import { Icon } from '@nebo-team/vobaza.ui.icon';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileEmptyField from '../../../components/Profile/EmptyField';
import ProfileOrderItem from '../../../components/Profile/Order/Item';
import Warning from 'shared/ui/Warning';

import checkAuth from '../../../app/api/auth';
import { api } from '../../../app/api';
import styles from 'app/styles/Profile.module.scss';

type IProps = {
  orders: IOrder[];
};

export default function ProfileOrders({ orders }: IProps) {
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
              <h2 className={styles.profileSubtitle}>Мои заказы</h2>
              <Warning>
                <p>Вы находитесь на новой версии сайта.</p>
                <br />
                <p>
                  Ранее заполненные вами данные профиля могут отсутствовать. Пожалуйста, заполните их снова. Узнать
                  статус активных заказов вы можете по телефону: <a href="tel:+74958990909">+7 (495) 899-09-09</a>.
                </p>
                <br />
                <p>Приносим извинения за доставленные неудобства!</p>
              </Warning>
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
    await checkAuth(req);
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
