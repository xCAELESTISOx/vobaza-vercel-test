import { GetServerSideProps } from 'next';

import type { IOrderItemFull } from 'src/models/IOrder';

import ProfileSidebar from '../../../components/Profile/Sidebar';
import ProfileOrder from '../../../components/Profile/Order';

import checkAuth from '../../../assets/api/auth';
import { api } from '../../../assets/api';

import styles from '../../../styles/Profile.module.scss';

type Props = {
  order: IOrderItemFull;
};

export default function ProfileOrderInfo({ order }) {
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
              <ProfileOrder order={order} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, query }) => {
  let order = null;

  try {
    await checkAuth(req);
    const orderRes = await api.getOrder(query.id);

    order = { ...orderRes.data.data };
  } catch (error: any) {
    return {
      redirect: {
        destination: '/profile/orders',
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
